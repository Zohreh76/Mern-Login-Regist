import React, { Component } from 'react';
import xhr from 'xhr';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            loginErrors: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            jobTitle: "",
        }
        this.changeName = this.changeName.bind(this);
        this.updateInputField = this.updateInputField.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.sendLoginForm = this.sendLoginForm.bind(this);
    }
    changeName(event) {
        console.log("The event", event.target.value)
        this.setState({ name: event.target.value });
    }

    updateInputField(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    sendForm(event) {
        event.preventDefault();
        this.setState({ errors: "" });
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errors: "Passwords do not match" })
        } else {
            xhr.post('/api/register', { json: true, body: this.state }, (err, res) => {
                console.log('The response: ', res);
                if (res.body.ok) {
                    window.location = "/members";
                } else {
                    this.setState({ erros: "Sever error" })
                }
            })
        };
    }

    sendLoginForm(e) {
        e.preventDefault();
        this.setState({loginErrors: ""});
        //console.log('Send the login request'); //here we should access to data
        const requestBody = {json: true, body: {
            email: this.state.loginEmail,
            password: this.state.loginPassword,
        }};
        xhr.post('/api/login', requestBody, (err, res) => {
            if(res.statusCode === 200){
                window.location = "/members";
            } else {
                const message = this.body && this.body.message || "Server error";
                this.setState({loginErrors: message});
            };
        })
    }

    render() {
        const errorTextColor = '#9a0202';
        return (
            <div >
                <h1>Rigister</h1>
                <h3 style={{color: errorTextColor}}>{this.state.errors}</h3>
                <form>
                    <p>name</p>
                    <input type="text" name="name" value={this.state.name} onChange={this.changeName} />
                    <p>email</p>
                    <input type="email" name="email" value={this.state.email} onChange={this.updateInputField} />
                    <p>Password</p>
                    <input type="password" name="password" value={this.state.password} onChange={this.updateInputField} />
                    <p>Password Confirmation</p>
                    <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateInputField} />
                    <p>Job Title</p>
                    <input type="text" name="jobTitle" value={this.state.jobTitle} onChange={this.updateInputField} />
                    <br />
                    <input type="submit" value="Register" onClick={this.sendForm} />
                </form>
                <h1>Login</h1>
                <h3 style={{color: errorTextColor}}>{ this.state.loginErrors }</h3>
                <form>
                    <p>Email</p>
                    <input type="email" name="loginEmail" value={this.state.loginEmail} onChange={this.updateInputField} />
                    <p>Password</p>
                    <input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.updateInputField} />
                    <br />
                    <input type="submit" value="Login" onClick={this.sendLoginForm}/>
                </form>
            </div>
        );
    }
}

export default App;
