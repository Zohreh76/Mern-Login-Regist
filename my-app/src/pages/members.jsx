import React, {Component} from 'react';
import xhr from 'xhr';
import { Link } from 'react-router-dom';
import ProfileButton from '../components/profileButton';

export default class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            users: [],
        }
    }

    componentDidMount() {
        xhr.get('/api/users', {json: true}, (err,res)=>{
            if(res.statusCode === 401) return window.location = "/login"; // we redirecting 
            // console.log("The body of response: ", res.body);
            this.setState({users: res.body});
        })
        xhr.get('/api/user', {json: true}, (err,res) =>{
            if (res.statusCode === 401) return window.location = "/login";
            this.setState({userName: res.body.name});
        })
    }

    render(){
        return (
            <div>
                <p>Welcome, { this.state.userName } </p>
                <Link to="/logout"> Log Out</Link>
                <div>
                    <h1>Member List</h1>
                    {this.state.users.map((user) =>{
                        return (
                            <ProfileButton name= {user.name} email= {user.email} key= {user._id} />
                        )
                    })}
                </div>
            </div>

        )
    }
}