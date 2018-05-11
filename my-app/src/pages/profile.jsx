import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import xhr from 'xhr';

export default class Profile extends Component {
    constructor(props){
    super(props);
    this.state ={
        email: "",
        jobTitle: "",
        name: "",
        }
    }
    componentDidMount (){
        const profileEmail = this.props.match.params.email;
        // console.log("the props: ", this.props.match.params.email);
        xhr.get(`/api/users/${profileEmail}`, {json: true}, (req, res) => {
            if(res.statusCode === 401) return window.location = "/login";
            this.setState(res.body);
            // console.log("the response: ", res);
        })
    }
    render() {
        return (
            <div>
                <h1>Name: { this.state.name }</h1>
                <p>Job Title: { this.state.jobTitle }</p>
                <p>Email: { this.state.email }</p>
                <Link to="/members"> Back to Member List </Link>
            </div>
        )
    }
}