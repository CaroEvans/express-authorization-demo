import React from 'react'

const Bookmark = (props) => (
<div>
    <p>Bookmark for { props.title }</p>
    <button><a href={ props.url } target="_blank">Visit</a> </button>
    <button onClick={ () => props.remove(props._id) }>Delete</button>
</div>
)

export default Bookmark;
