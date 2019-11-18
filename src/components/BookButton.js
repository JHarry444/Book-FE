import React from 'react';
import {Button} from 'react-bootstrap';

export default class BookButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Button className='ml-auto' variant="success">Add to my books</Button>
        );
    }
}