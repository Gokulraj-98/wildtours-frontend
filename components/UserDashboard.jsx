import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';

function UserDashboard() {
    const [cartItems, setCartItems] = useState([]);
    const userName = JSON.parse(localStorage.getItem("user_data")).user.name;
    console.log(userName)
    useEffect(() => {
        axios.get(`https://wildtours-backend.onrender.com/bookings/get-bill`)
            .then((res) => {
                // Filter the data to include only the items that belong to the specific user
                const userCartItems = res.data.filter(item => item.customerName === userName)

                setCartItems(userCartItems);
            })
            .catch((error) => {
                console.error("There was an error fetching the cart items!", error);
            });
    }, [userName]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome to the User Dashboard</h1>
            <p style={{ textAlign: "center", fontSize: "16px", marginBottom: "40px" }}>
                Here you can find the details of your selected tour packages.
            </p>
            <Row gutter={[16, 16]}>
                {cartItems.map((entry, index) => (
                    <Col key={entry._id} xs={24} sm={12} md={8}>
                        <Card
                            hoverable
                            key={index}
                            style={{
                                width: 300,
                                border: "1px solid #f0f0f0",
                                borderRadius: "10px",
                            }}
                        >
                            <h3 style={{ textAlign: "center", color: "#1890ff" }}> {entry.customerName}</h3>
                            <div>
                                <h4>Cart Items:</h4>
                                {entry.cartItems.map((item, itemIndex) => (
                                    <div key={itemIndex} style={{ marginBottom: "10px", padding: "10px", borderBottom: "1px solid #f0f0f0" }}>
                                        <p><strong>Name:</strong> {item.name}</p>
                                        <p><strong>Price:</strong> Rs. {item.price}</p>
                                        <p><strong>Location:</strong> {item.location}</p>
                                        <p><strong>Guide:</strong> {item.guide ? item.guide : "No Guide"}</p>
                                        <p><strong>Scheduled Date:</strong> {item.selectedSchedule ? new Date(item.selectedSchedule).toLocaleDateString() : "No Date Selected"}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default UserDashboard;
