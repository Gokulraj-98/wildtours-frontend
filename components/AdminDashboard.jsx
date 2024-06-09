import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        const fetchTours = async () => {
            const response = await axios.get('https://wildtours-backend.onrender.com/tours');
            setTours(response.data);
        };

        fetchTours();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://wildtours-backend.onrender.com/tours/${id}`);
            setTours(tours.filter(tour => tour._id !== id));
        } catch (error) {
            console.error('Error deleting tour:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Tours</h2>
            <ul>
                {tours.map(tour => (
                    <li key={tour._id}>
                        {tour.name}
                        <button onClick={() => handleDelete(tour._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
