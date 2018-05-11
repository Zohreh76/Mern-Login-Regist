import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class profileButton extends Component {
    render(){
        return (
            <div>
                <p> { this.props.name } </p>
                <Link to={`/profile/${this.props.email}`}>View Profile</Link>  
            </div>
        )
    }
}