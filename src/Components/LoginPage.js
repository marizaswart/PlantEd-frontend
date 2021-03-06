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
                               placeholder="with a placeholder"
                               value={this.state.email}
                               onChange={(e) => this.setState( {email: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword"
                               placeholder="password placeholder"
                               value={this.state.password}
                               onChange={(e) => this.setState( {password: e.target.value})}/>
                    </FormGroup>
                    <Button onClick={() => this.handleLogin()}>Login</Button>
                </Form>
            )
        } else {
            form = (
                <h1>Show registration form</h1>
            )
        }

        return (
            <div className='row jusify-content-center'>
                <div className='col-10 col-sm-7 col-md-5 col-lg-4'>
                    {form}

                    <Button onClick={this.toggleRegistrationForm.bind(this)}>
                        {this.state.showRegistrationForm ? 'Sign in' : 'Create Account' }
                    </Button>

                </div>
            </div>

        );
    }
}

export default Login;
