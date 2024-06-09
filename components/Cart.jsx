import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Checkbox, DatePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../src/redux/itemSlice"; // Adjust the path to your remove action
import moment from 'moment';

const guides = ["John", "David", "Oliver", "Krishna", "Ravi", "Gokul", "Balu", "Adam", "James", "Nirmal"];

function Cart() {
    const cartItems = useSelector((state) => state.itemShop.cartItems);
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp += item.price * 1;
        });
        setSubTotal(temp);
    }, [cartItems]);

    console.log(subTotal);

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleGuideChange = (itemId, checked) => {
        const randomGuide = checked ? guides[Math.floor(Math.random() * guides.length)] : 'Add Guide';
        dispatch(updateCartItem({ itemId, guide: randomGuide }));
    };

    const handleDateChange = (itemId, date) => {
        const updatedCartItems = cartItems.map(item => item._id === itemId ? { ...item, selectedSchedule: date } : item);
        dispatch(updateCartItem(updatedCartItems));
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <div className="d-flex justify-content-between align-items-center">
                    {text}
                    <Button
                        onClick={() => handleRemove(record._id)}>
                        Remove
                    </Button>
                </div>
            ),
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image) => <img src={image} height="100" width="100" alt="item" />,
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Guide",
            dataIndex: "guide",
            render: (text, record) => (
                <Checkbox
                    unchecked
                    onChange={(e) => handleGuideChange(record._id, e.target.checked)}
                >
                    {text !== 'Add Guide' ? text : 'Add Guide'}
                </Checkbox>
            ),
        },
        {
            title: "Date",
            dataIndex: "selectedSchedule",
            render: (date, record) => (
                <DatePicker
                    value={date ? moment(date) : null}
                    onChange={(date) => handleDateChange(record._id, date)}
                />
            ),
        },
    ];

    const onFinish = (values) => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            selectedSchedule: item.selectedSchedule || null
        }));

        const reqObject = {
            ...values,
            subTotal,
            cartItems: updatedCartItems,
            tax: Number(((subTotal / 100) * 2).toFixed(2)),
            totalAmount: Number(subTotal + (subTotal / 100) * 2),
            userId: JSON.parse(localStorage.getItem("user_data")).user._id,
        };

        axios.post(`https://wildtours-backend.onrender.com/bookings/charge-bill`, reqObject).then(() => {
            message.success("Bills added successfully");
            navigate("/bills");
        });
    };

    return (
        <div>
            <h1>List of Items in your Cart</h1>
            <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                rowKey="_id"
                bordered
            />
            <div className="d-flex justify-content-end">
                <div>
                    <h3>
                        SUB TOTAL: <b>Rs.{subTotal}</b>
                    </h3>
                </div>
            </div>
            <div className="d-flex justify-content-around">
                <Button type="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Charge Bill
                </Button>
            </div>

            <Modal
                title="Charge Bill"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={false}
            >
                <Form onFinish={onFinish}>
                    <Form.Item label="Customer Name" name="customerName">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Customer Phone Number" name="customerPhoneNumber">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Payment Mode" name="paymentMode">
                        <Select>
                            <Select.Option value="cash">CASH</Select.Option>
                            <Select.Option value="card">CARD</Select.Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <h3>
                            SUB TOTAL: <b>Rs.{subTotal}</b>
                        </h3>
                        <h3>
                            TAX: <b>Rs.{((subTotal / 100) * 2).toFixed(2)}</b>
                        </h3>
                        <h3>
                            GRAND TOTAL: <b>Rs.{subTotal + (subTotal / 100) * 2}</b>
                        </h3>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit">
                            Generate Bill
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Cart;
