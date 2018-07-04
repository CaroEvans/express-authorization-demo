import React, { Component, Fragment } from 'react';
import './App.css';
import Bookmarks from './components/Bookmarks'
import Bookmark from './components/Bookmark'
import SignIn from './components/SignIn'
import { api, setJwt } from './api/init'
import decodeJWT from 'jwt-decode'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {  
  state = {
    bookmarks: [],
    token: localStorage.getItem("token"),
    loginError: null
  }

  // get token() {
  //   return localStorage.getItem('token')
  // }

  // set token() {
  //   localStorage.setItem('token', value)
  // }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.setState({ token: response.data.token })
      localStorage.setItem("token", this.state.token)
      setJwt(response.data.token)
    } catch (error) {
      this.setState({ loginError: error.message})
    }
  }

  async componentDidMount() {
    try {
        const bookmarks = await api.get(
        '/bookmarks'
    )
    this.setState( { 
        bookmarks: bookmarks.data,
        loading: false
    } )
    }
    catch(error) {
    alert('Can\'t get bookmarks')
    }
}

  remove = (id) => {
    const index = this.state.bookmarks.findIndex(bookmark => bookmark._id === id)
    if (index >= 0) {
      api.delete(`/bookmarks/${id}`).then( () => {
        const bookmarks = [...this.state.bookmarks]
        bookmarks.splice(index, 1)
        this.setState( { bookmarks })
        }
      )
    }
  }

  render() {
    const tokenDetails = this.state.token && decodeJWT(this.state.token)
    // const { bookmarks } = this.state
      return (
        <Router>
        <div className= "App">
            <nav className= "nav-bar">
              <Link to="/"> Home</Link>&nbsp;&nbsp;
              <Link to="/bookmarks">Bookmarks</Link>&nbsp;&nbsp;
              <Link to="/bookmarks/google"> Google </Link>&nbsp;&nbsp;
              <Link to="/bookmarks/dilbert"> Dilbert </Link>&nbsp;&nbsp;
              <Link to="/bookmarks/google"> Google </Link>&nbsp;&nbsp;
            </nav> 

            <button onClick={() => {
                this.setState({token:null})
                localStorage.setItem("token", '') 
              }}>Log out 
            </button>

        { 
          this.state.token ? (
            <div>
            <h4>Welcome { tokenDetails.email }</h4>
            <p>You logged in on: {new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
            <p>Your token expires on: {new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
            </ div>
          ) : (
            <SignIn loginError={this.state.loginError} handleSignIn={this.handleSignIn} />
          )
        }
        <Fragment>

            <Route exact path="/" component={ Home } />

            <Route exact path="/bookmarks" render={() => ( <Bookmarks app={this} /> )} />

          <Route path="/bookmarks/:title" render={(routerProps) => {
            console.log(routerProps.match.params)
            const index = this.state.bookmarks.findIndex(bookmark => bookmark.title.toUpperCase() === routerProps.match.params.title.toUpperCase())
            if (index >= 0) {
              const bm = this.state.bookmarks[index]
              return ( <Bookmark key={bm._id} {...bm} remove={ this.remove } /> )
            }
            return <p>Bookmark not found</p>
          }} />
      </ Fragment>
        </div>
        </ Router>
 
    )
  }
}

export default App;