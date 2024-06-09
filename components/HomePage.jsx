import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const HomePage = () => {
    return (
        <div>
            <h1>Wildlife Tours</h1>
            <div className="home-container">
                <header className="home-header">
                    <h1>Wild Tours</h1>
                    <nav>
                        <Link to="/login" className="nav-link"> Login</Link>
                        <Link to="/register" className="nav-link">  Register</Link>
                    </nav>
                </header>

                <section className="home-description">
                    <h2>Explore the Wild with Us</h2>
                    <h3>Please Login or register to Book places</h3>
                    <p>Welcome to Wild Tours, your gateway to the most exciting wildlife tours and adventures around the globe. Discover breathtaking destinations, plan your tours, and create unforgettable memories with us.</p>
                </section>

                <section className="tour-plans">
                    <h2>Popular Tour Plans</h2>
                    <div className="tour-cards">
                        <div className="tour-card">
                            <img src="images/jungle_safari.jfif" alt="Tourist Place" className="tour-image" />
                            <h3>Safari Adventure</h3>
                            <p>Experience the thrill of a safari adventure in Africa. See the Big Five and explore the wild savannah.</p>
                        </div>
                        <div className="tour-card">
                            <img src="images/rain forest.jfif" alt="Tourist Place" className="tour-image" />
                            <h3>Amazon Rainforest</h3>
                            <p>Journey through the Amazon Rainforest and discover the incredible biodiversity and vibrant wildlife.</p>
                        </div>
                        <div className="tour-card">
                            <img src="images/arctic.jfif" alt="Tourist Place" className="tour-image" />
                            <h3>Arctic Expedition</h3>
                            <p>Embark on an Arctic expedition and witness the stunning landscapes and unique wildlife of the polar region.</p>
                        </div>
                    </div>
                </section>

                <footer className="home-footer">
                    <div className="footer-content">
                        <div className="footer-section about">
                            <h2>About Wild Tours</h2>
                            <p>Wild Tours is dedicated to providing the best wildlife tour experiences. Our mission is to bring you closer to nature and help you create unforgettable memories.</p>
                        </div>
                        <div className="footer-section contact">
                            <h2>Contact Us</h2>
                            <p>Email: info@wildtours.com</p>
                            <p>Phone: +123 456 7890</p>
                            <p>Address: 123 Wildlife Ave, Nature City, Earth</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Wild Tours. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
