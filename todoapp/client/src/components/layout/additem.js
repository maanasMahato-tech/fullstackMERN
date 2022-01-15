import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import todoContext from '../context/context';


const Additem = () => {
    const [formdata, setformdata] = useState({ title: "", desc: "" });

    const context = useContext(todoContext);
    const { AddItem } = context;

    const onchange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const eventHandler = (e) => {
        e.preventDefault();
        AddItem(formdata.title, formdata.desc);
        setformdata({ title: "", desc: "" });
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control id="title" name="title" type="text" value={formdata.title || ''} placeholder="Enter title of the task" onChange={onchange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="desc">Description</Form.Label>
                <Form.Control id="desc" name="desc" as="textarea" rows={5} value={formdata.desc || ''} placeholder="Describe the task" onChange={onchange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={eventHandler}>
                Submit
            </Button>
        </Form>
    )
}

export default Additem;
