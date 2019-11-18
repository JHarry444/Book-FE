import React from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Home.css';
import * as mom from 'moment';
import { BASE_URL, BOOK_URL, FEATURED_URL, DATE_FORMAT, LARGE, JPG } from './Consts';
import BookButton from './BookButton';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {
                cover: '',
                title: '',
                author: [],
                released: ''
            }
        }
    }

    componentDidMount() {
        axios.get(`${BASE_URL}${BOOK_URL}${FEATURED_URL}`, { headers: { Authorization: 'JWT ' + localStorage.getItem('JWT') } })
            .then(res => {
                this.setState({ book: res.data });
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className='m-auto featured '>
                <Card bg='dark' text='white' className='ml-auto mr-auto mt-1'>
                    <Card.Header as='h3'>
                        Featured
                    <BookButton />
                    </Card.Header>
                    <Card.Title className='p-1 m-auto'>{this.state.book.title}
                    </Card.Title>
                    <Card.Img className='p-3' variant="top" src={`${this.state.book.cover}${LARGE}${JPG}`} />
                    <Card.Body>
                        <Card.Text>
                            Author: {this.state.book.author}
                            <br />
                            Released: {mom(this.state.book.released).format(DATE_FORMAT)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}