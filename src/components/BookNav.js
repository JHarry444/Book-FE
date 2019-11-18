import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { ROOT_URL, LOGIN_URL, REGISTER_URL, BROWSE_URL, SEARCH_URL, LOG_OUT_URL, BASE_URL, USER_URL, UPDATE_URL, JWT } from './Consts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookNav.css';

export default class BookNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push(`${SEARCH_URL}/${this.state.search}`);
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ search: value });
    }

    handleClick = () => {
        this.props.history.push(ROOT_URL);
    }

    handleLogOut = () => {
        axios.get(`${BASE_URL}${USER_URL}${LOG_OUT_URL}`)
            .then((res) => {
                this.props.changeUserFunc('');
                localStorage.removeItem({ JWT });
                this.props.history.push('');
            })
            .catch(err => {
                console.warn(err);
            });
    }

    handleChangeDetails = () => {
        this.props.history.push(UPDATE_URL);
    }

    render() {
        let userOptions;
        if (this.props.user) {
            userOptions = (
                <Nav className="ml-auto">
                    <NavDropdown title={this.props.user} id="nav-dropdown">
                        <NavDropdown.Item onClick={this.handleChangeDetails} eventKey="4.1">Manage user</NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleLogOut} eventKey="4.2">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Nav >
            );
        } else if (this.props.location.pathname !== LOGIN_URL &&
            this.props.location.pathname !== REGISTER_URL) {
            userOptions = (
                <Nav className="ml-auto">
                    <Link className='nav-link' to={LOGIN_URL}>Sign In</Link>
                    <Link className='nav-link' to={REGISTER_URL}>Sign Up</Link>
                </Nav >
            );
        }
        return (
            <Navbar bg="dark" variant='dark' sticky='top' expand="lg">
                <Navbar.Brand onClick={this.handleClick}>Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className='nav-link' to={BROWSE_URL}>Browse</Link>
                    </Nav>
                    {userOptions}
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.handleChange} />
                        <Button type='submit' variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}