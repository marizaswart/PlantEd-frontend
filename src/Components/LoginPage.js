import React, {Component} from 'react';
import {authenticate} from '../Modules/Auth'
import EventEmitter from '../Modules/EventEmitter'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            authenticated: false,
            showRegistrationForm: false
        }
    }


    handleLogin() {
        authenticate(this.state.email, this.state.password).then(resp => {
            this.setState(resp);
            console.log(this.state);
            EventEmitter.publish('authenticate.update', this.state.authenticated);
        });
    }

    toggleRegistrationForm() {
        if (this.state.showRegistrationForm) {
            this.setState({showRegistrationForm: false})
        } else {
            this.setState({showRegistrationForm: true})

        }
    }


    render() {

        let form;

        if (this.state.showRegistrationForm === false) {
            form = (
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail"
                               placeholder="email"
                               value={this.state.email}
                               onChange={(e) => this.setState( {email: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword"
                               placeholder="password"
                               value={this.state.password}
                               onChange={(e) => this.setState( {password: e.target.value})}/>
                    </FormGroup>
                    <Button onClick={() => this.handleLogin()} id="button-login" size="md" block>Login</Button>
                </Form>
            )
        } else {
            form = (
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail"
                               placeholder="email"
                               value={this.state.email}
                               onChange={(e) => this.setState( {email: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword"
                               placeholder="password"
                               value={this.state.password}
                               onChange={(e) => this.setState( {password: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePasswordConfirmation">Password Confirmation</Label>
                        <Input type="password" name="password-confirmation" id="examplePasswordConfirmation"
                               placeholder="password confirmation"
                               value={this.state.password.confirmation}
                               onChange={(e) => this.setState( {password: e.target.value})}/>
                    </FormGroup>
                    <Button onClick={() => this.handleLogin()} id="button-login" size="md" block>Sign up</Button>
                </Form>
            )
        }

        return (
            <div>
                <div className='col-10 col-sm-7 col-md-5 col-lg-4' id="login">
                    {form}
                    <Button onClick={this.toggleRegistrationForm.bind(this)} id="button-signup" size="sm" block>
                        {this.state.showRegistrationForm ? 'Login' : 'Create Account' }
                    </Button>

                </div>
            </div>

        );
    }
}

export default Login;
