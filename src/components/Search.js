import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import * as mom from 'moment';
import { BASE_URL, BOOK_URL, DATE_FORMAT, SEARCH_URL } from './Consts';

export default class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        console.log(this.props);
        axios.get(`${BASE_URL}${BOOK_URL}${SEARCH_URL}/${this.props.match.params.search}`)
            .then(res => {
                console.log(res);
                this.setState({ books: res.data });
            })
            .catch(err => console.warn(err));
    }

    render() {
        return (
            <div className='container'>
                {this.state.books.map(book => (
                    <div className='browseCard pt-1'>
                        <Card bg='dark' text='white' >
                            <Card.Title className='m-auto'>{book.title}</Card.Title>
                            <Card.Img variant="top" src={book.cover} />
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
        );
    }
}