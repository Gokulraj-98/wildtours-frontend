import axios from "axios";
import { useState, useEffect } from "react";
import Item from "./Item";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, Layout, Row, Col, Input } from "antd";
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Search } = Input;

function TourDetailsPage() {
    const [itemData, setItemData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [category, setCategory] = useState('');
    const [priceFilter, setPriceFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.itemShop.cartItems);

    useEffect(() => {
        axios.get(`https://wildtours-backend.onrender.com/tours/`).then((res) => {
            setItemData(res.data);
        });
    }, []);

    useEffect(() => {
        let filteredItems = itemData;

        if (category) {
            filteredItems = filteredItems.filter(item => item.category === category);
        }

        if (priceFilter) {
            filteredItems = filteredItems.filter(item => item.price <= priceFilter);
        }

        if (searchTerm) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filteredItems);
    }, [category, priceFilter, searchTerm, itemData]);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const menu = (
        <Menu>
            <Menu.Item>
                <Button type="link" onClick={() => setPriceFilter(1500)}>Under 1500</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={() => setPriceFilter(2000)}>Under 2000</Button>
            </Menu.Item>
            <Menu.Item>
                <Button type="link" onClick={() => { setPriceFilter(null); setCategory(''); setSearchTerm(''); }}>Clear Filters</Button>
            </Menu.Item>
        </Menu>
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor: '#001529' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Dropdown overlay={menu}>
                            <Button icon={<MenuOutlined />} type="link" style={{ color: 'white' }}>Filters</Button>
                        </Dropdown>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
                        Wild Tours
                    </div>
                    <div>
                        <Button type="primary" onClick={() => navigate("/cart")} icon={<ShoppingCartOutlined />}>
                            Cart <span className="badge bg-danger">{cartItems.length}</span>
                        </Button>
                    </div>
                </div>
            </Header>
            <Content style={{ padding: '50px 50px 0', marginTop: 64 }}>
                <Input
                    placeholder="Search tours by name or location"
                    size="large"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ marginBottom: 16 }}
                />
                <Row gutter={[16, 16]}>
                    {filteredData.map((item) => (
                        <Col key={item._id} xs={24} sm={12} md={8}>
                            <Item item={item} />
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
}

export default TourDetailsPage;
