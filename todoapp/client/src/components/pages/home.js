import React, { useContext, useEffect, useRef, useState } from 'react'
import todoContext from '../context/context';
import Additem from '../layout/additem';
import Item from '../layout/itemstructure';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';


const Home = () => {
    const context = useContext(todoContext);
    const { items, GetItem, UpdateItem } = context;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const openRef = useRef();
    const closeRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [eitem, seteitem] = useState({ id: "", etitle: "", edesc: "" });

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            GetItem();
        }
        else if (!localStorage.getItem('auth-token')) {
            navigate('/signup');
        }
        else {
            alert("error fetching data!");
            console.log("error token not found!");
        }

        // eslint-disable-next-line
    }, [])

    const updateitem = (currentItem) => {
        openRef.current.click();
        seteitem({
            id: currentItem._id,
            etitle: currentItem.title,
            edesc: currentItem.desc
        })
    }

    const onupdatechange = (f) => {
        seteitem({ ...eitem, [f.target.name]: f.target.value })
    }

    const submitUpdatedData = () => {
        UpdateItem(eitem.id, eitem.etitle, eitem.edesc);
        closeRef.current.click();
    }

    return (
        <div className="container mx-auto p-4">
            <Additem />
            <div>
                {items.map((data) => {
                    return <Item itemdata={data} updateitem={updateitem} key={data._id} />
                })}
            </div>

            <div>
                <div variant="primary" ref={openRef} onClick={handleShow} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="etitle" id="etitle" type="text" value={eitem.etitle || ''} placeholder="Enter title" onChange={onupdatechange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="edesc" id="edesc" as="textarea" value={eitem.edesc || ''} rows={5} onChange={onupdatechange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" ref={closeRef} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitUpdatedData}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    )
}

export default Home;
