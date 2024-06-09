import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Rate, message } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

function Bill() {
    const componentRef = React.useRef(null);
    const [billData, setBillData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

    const getAllBills = () => {
        axios.get(`https://wildtours-backend.onrender.com/bookings/get-bill`)
            .then((res) => {
                console.log(res.data);
                setBillData(res.data);
            });
    };

    useEffect(() => {
        getAllBills();
    }, []);

    console.log("billData", billData);

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
                    {billData.map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.customerName}</td>
                                <td>{item.customerPhoneNumber}</td>
                                <td>Rs. {item.subTotal}</td>
                                <td>
                                    {item.cartItems.map((cartItem, index) => (
                                        <div key={index}>{cartItem.name} - {cartItem.guide ? cartItem.guide : "No Guide"}</div>
                                    ))}
                                </td>
                                <td>
                                    {item.cartItems.map((cartItem, index) => (
                                        <div key={index}>{cartItem.selectedSchedule ? new Date(cartItem.selectedSchedule).toLocaleDateString() : 'No Date selected'}</div>
                                    ))}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-around" style={{ marginTop: "20px" }}>
                <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
                <Button type="primary" onClick={handlePrintClick}>Print Bill</Button>
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
