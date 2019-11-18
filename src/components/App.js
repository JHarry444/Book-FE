import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import BookNav from './BookNav';
import Browse from './Browse';
import Register from './Register';
import Login from './Login';
import Search from './Search';
import Details from './Details';
import { ROOT_URL, BROWSE_URL, REGISTER_URL, LOGIN_URL, SEARCH_URL, UPDATE_URL } from './Consts.js';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  handleChangeUser = (username) => {
    console.log('user: ', username);
    this.setState({ user: username });
  }

  render() {
    return (
      <Router>
        <Route path={ROOT_URL} render={(props) => <BookNav {...props} user={this.state.user} changeUserFunc={this.handleChangeUser} />} />
        <Route exact path={ROOT_URL} render={(props) => <Home {...props} />} />
        <Route exact path={BROWSE_URL} render={(props) => <Browse {...props} />} />
        <Route path={REGISTER_URL} render={(props) => <Register {...props} changeUserFunc={this.handleChangeUser} />} />
        <Route path={LOGIN_URL} render={(props) => <Login {...props} changeUserFunc={this.handleChangeUser} />} />
        <Route path={UPDATE_URL} render={(props) => <Details {...props} currUser={this.state.user} />} />
        <Route path={`${SEARCH_URL}/:search`} render={(props) => <Search {...props} />} />
      </Router >
    );
  }
}

export default App;
