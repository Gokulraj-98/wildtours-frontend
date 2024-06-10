import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Rate, message, Spin } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

function Bill() {
    const componentRef = React.useRef(null);
    const [billData, setBillData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    const getLatestBill = () => {
        axios.get(`https://wildtours-backend.onrender.com/bookings/get-bill`)
            .then((res) => {
                console.log(res.data);
                // Sort bills by date and get the latest one
                if (res.data.length > 0) {
                    const latestBill = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
                    setBillData(latestBill);
                } else {
                    setBillData(null);
                }
                setLoading(false); // Hide loading spinner after data is fetched
            })
            .catch(error => {
                console.error("There was an error fetching the bill data!", error);
                setLoading(false); // Hide loading spinner in case of an error
            });
    };

    useEffect(() => {
        getLatestBill();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrintClick = () => {
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        setIsModalOpen(false);
        message.success('Thank you for your feedback!');
        handlePrint();
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="d-flex justify-content-between" style={{ marginBottom: "20px" }}>
                <Button type="primary" onClick={() => navigate('/admin')}>Admin Dashboard</Button>
                <Button type="primary" onClick={() => navigate('/user')}>User Dashboard</Button>
            </div>
            <h1>Invoice Details for WildTours</h1>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Spin size="large" />
                </div>
            ) : billData ? (
                <table className='table table-bordered' ref={componentRef}>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Customer Phone Number</th>
                            <th>Sub Total</th>
                            <th>Guide</th>
                            <th>Scheduled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={billData._id}>
                            <td>{billData.customerName}</td>
                            <td>{billData.customerPhoneNumber}</td>
                            <td>Rs. {billData.subTotal}</td>
                            <td>
                                {billData.cartItems.map((cartItem, index) => (
                                    <div key={index}>{cartItem.name} - {cartItem.guide ? cartItem.guide : "No Guide"}</div>
                                ))}
                            </td>
                            <td>
                                {billData.cartItems.map((cartItem, index) => (
                                    <div key={index}>{cartItem.selectedSchedule ? new Date(cartItem.selectedSchedule).toLocaleDateString() : 'No Date selected'}</div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>No bills found.</p>
            )}
            <div className="d-flex justify-content-around" style={{ marginTop: "20px" }}>
                <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
                <Button type="primary" onClick={handlePrintClick} disabled={!billData}>Print Bill</Button>
            </div>

            <Modal
                title="Rate Your Experience"
                visible={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form>
                    <Form.Item label="Rating">
                        <Rate onChange={value => setRating(value)} value={rating} />
                    </Form.Item>
                    <Form.Item label="Comments">
                        <Input.TextArea onChange={e => setComments(e.target.value)} value={comments} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Bill;
