import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL, USER_URL, UPDATE_URL } from './Consts';

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // username: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: 'Passwords do not match' });
            return;
        }
        axios.put(`${BASE_URL}${USER_URL}${UPDATE_URL}?user=${this.props.currUser}`, { password: this.state.password })
            .then((res) => {
                this.props.history.push('');

            })
            .catch(err => {
                console.warn(err);
                this.setState({ error: err.message })
            });
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    render() {
        return (
            <Form className='m-auto pt-3 w-50' onSubmit={this.handleSubmit}>
                {/* <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' type="text" placeholder="Enter username" onChange={this.handleChange} />
                </Form.Group> */}
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name='confirmPassword' type="password" placeholder="Password" onChange={this.handleChange} />
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