import React, { Component, Fragment } from 'react';
import Bookmark from './Bookmark'
import Form from './Form';

class Bookmarks extends Component {
    state = {
        loading: true,
    }
      render() {
        const { app } = this.props
        return (
            <Fragment>
                {/* const { bookmarks, loading } = this.state; */}
                <h1>Bookmarks</h1>
                    { app.state.loading ? <p>Loading....</p> : (     
                    <div>
                    {
                        app.state.bookmarks.map(
                        bookmark => <Bookmark key={ bookmark._id } {...bookmark} remove={ app.remove } />
                        )
                    }
                    </div>             
                )}
                <Form />
            </ Fragment>
            )
        }

            
}

export default Bookmarks;