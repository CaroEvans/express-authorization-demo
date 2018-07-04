import React, { Component, Fragment }  from 'react'
import axios from 'axios';

class Form extends Component {
    state = {
        title:'',
        url:''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/bookmarks', this.state)
            .catch(function (error) {
            console.log(error);
          }
    )
        //default is page reloading
    }

    handleChangeTitle = (e) => {
        this.setState({title: e.target.value})
    }

    handleChangeUrl = (e) => {
        this.setState({url: e.target.value})
    }

    render() {
        return (
            <Fragment>
            <h3>Submit a bookmark</h3>
            <form onSubmit={this.handleSubmit}>
            <label>
              Title:&nbsp;
              <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />&nbsp;
              Link:&nbsp;
              <input type="text" value={this.state.url} onChange={this.handleChangeUrl} />&nbsp;
            </label>
            <input type="submit" value="Submit" />
          </form>    
          </ Fragment>    
        )
    }

}

export default Form;