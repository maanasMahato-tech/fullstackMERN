import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Login = () => {
    const [show, setShow] = useState(false);
    const [data, setdata] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        handleShow();
    }, [])

    const onchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }
    const submitdata = async () => {
        try {
            const formdata = {
                email: data.email,
                password: data.password
            }
            const response = await axios.post('/api/auth/login', formdata)
            const resjson = response.data;
            if (resjson.success) {
                localStorage.setItem('auth-token', resjson.authtoken);
            }
            else {
                console.log("token was not sent!");
            }
            navigate('/');
            window.location.reload(false);

        } catch (error) {
            console.log(error);
            alert("invalid data or server error please reload and try again!")
        }
    }


    return (
        <div>
            <div>
                <div variant="primary" onClick={handleShow} />
                <Modal show={show}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" id="email" type="email" placeholder="Enter email" onChange={onchange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" id="password" type="password" placeholder="Password" onChange={onchange} minLength={8} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={submitdata}>
                            Submit
                        </Button>
                        <Button variant="primary" onClick={() => { navigate('/signup')}}>
                            Don't have an account? Click me.
                        </Button>
                        <Button variant="secondary" ref={closeRef} onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Login;
