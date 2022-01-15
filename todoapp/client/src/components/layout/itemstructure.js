import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import todoContext from '../context/context';

const Item = (props) => {
    const { itemdata, updateitem } = props;
    const context = useContext(todoContext);
    const { DeleteItem } = context;
    return (
        <div className=" flex flex-row my-4">
            <Card>
                <Card.Header as="h5">{itemdata.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {itemdata.desc}
                    </Card.Text>
                    <div>
                        <Button className="mx-2" onClick={() => { DeleteItem(itemdata._id) }}>Delete</Button>
                        <Button className="mx-2" onClick={() => { updateitem(itemdata) }}>Edit</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Item;
