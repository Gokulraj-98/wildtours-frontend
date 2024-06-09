import { Card, Button, Checkbox } from 'antd';
import { addToCart } from "../src/redux/itemSlice";
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const { Meta } = Card;

function Item({ item }) {
    const dispatch = useDispatch();
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const handleAddCart = (item) => {
        console.log("Added to Cart");
        dispatch(addToCart({ ...item, selectedSchedule }));
    };

    const handleScheduleChange = (e, schedule) => {
        if (e.target.checked) {
            setSelectedSchedule(schedule);
        } else {
            setSelectedSchedule(null);
        }
    };

    return (
        <div>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt={item.name} src={item.image} />}
            >
                <Meta title={item.name} />
                <h4>Price: Rs. {item.price}</h4>
                <p>{item.description}</p>
                <p>Location: {item.location}</p>
                <h5>Schedules:</h5>
                <ul>
                    {item.schedules && item.schedules.length > 0 ? (
                        item.schedules.map((schedule, index) => (
                            <li key={index}>
                                <Checkbox
                                    checked={selectedSchedule === schedule}
                                    onChange={(e) => handleScheduleChange(e, schedule)}
                                >
                                    {new Date(schedule).toLocaleDateString()}
                                </Checkbox>
                            </li>
                        ))
                    ) : (
                        <li>No schedules available</li>
                    )}
                </ul>
                <Button type="primary" onClick={() => handleAddCart(item)} disabled={!selectedSchedule}>
                    Add to Cart
                </Button>
            </Card>
        </div>
    );
}

export default Item;
