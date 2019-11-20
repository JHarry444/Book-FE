import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import * as mom from 'moment';
import { DATE_FORMAT, JPG, MEDIUM, BOOK_URL, GET_ALL_URL, BASE_URL } from './Consts';

export default class Browse extends React.Component {

    constructor(props) {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        axios.get(`${BASE_URL}${BOOK_URL}${GET_ALL_URL}`)
            .then(res => {
                console.log(res);
                this.setState({ books: res.data });
            })
            .catch(err => console.warn(err));
    }

    render() {
        return (
            <div className='container'>
                <div className='row no-gutters card-deck'>
                    {this.state.books.map(book => (
                        <div className='browseCard pt-1 col-3'>
                            <Card bg='dark' text='white'>
                                <Card.Title className='m-auto'>{book.title}</Card.Title>
                                <Card.Img variant="top" src={`${book.cover}${MEDIUM}${JPG}`} />
                                <Card.Body>
                                    <Card.Text>
                                        Author: {book.author}
                                        <br />
                                        Released: {mom(book.released).format(DATE_FORMAT)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>)
                    )}
                </div>
            </div>
        );
    }
}