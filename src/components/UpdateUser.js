import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL, USER_URL, UPDATE_URL } from './Consts';

export default class Register extends React.Component {

    constructor(props) {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}${USER_URL}${UPDATE_URL}`, this.state)
            .then(() => this.props.history.push('/'))
            .catch(err => this.setState({ error: 'Username already taken' }));
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Form className='m-auto pt-3 w-50' onSubmit={this.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required={true} name='username' type="text" placeholder="Enter username" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required={true} name='password' type="password" placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                 </Button>
                {
                    this.state.error && (
                        <Alert className='mt-2' variant='danger'>
                            {this.state.error.toString()}
                        </Alert>
                    )
                }
            </Form>
        );
    }
}