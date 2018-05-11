import React, {Component} from 'react';
import xhr from 'xhr';

export default class Logout extends Component {
    componentDidMount (){
        xhr.get('/api/logout', (err, res) => {
            if(res.statusCode === 200) window.location = "/login";
        })
    }
    render() {
        return(
        <p>Logging out...</p>
        )
    }
}