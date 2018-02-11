import React, {Component} from 'react';
import EventEmitter from './Modules/EventEmitter'
import AddPlant from './Components/AddPlant';
import ShowUser from './Components/ShowUser'
import Login from './Components/LoginPage';
import {ToastContainer, toast} from 'react-toastify'
import {Jumbotron, Container, Row, Col, Button} from 'reactstrap';
import ActionCable from 'actioncable'

import './App.css';
import {deAuthenticate} from "./Modules/Auth";

 const cable = ActionCable.createConsumer("ws://localhost:3001/cable");


class App extends Component {

    static notify() {
        let email = JSON.parse(sessionStorage.getItem('credentials')).uid;
        toast(`Logged in as ${email}`, {autoClose: 8000});
    }

    constructor() {
        super();
        this.state = {
            user: '',
            authenticated: App.checkSessionStorage(),
            notifications: []
        }

    }

    static checkSessionStorage() {
        const credentials = JSON.parse(sessionStorage.getItem('credentials'));

        return !(credentials === null || credentials.length === 0);
    }

    componentWillMount() {

        if (sessionStorage.getItem('current_user')) {
            cable.subscriptions.create({
                channel: 'NotificationChannel',
                user_id: JSON.parse(sessionStorage.getItem('current_user')).id
            }, {
                received: (data) => {
                    console.log('received message')
                    return toast(data.notification, {autoClose: 8000})
                },
            });
        }

        EventEmitter.subscribe('authenticate.update', this.updateAuthState.bind(this));
        EventEmitter.subscribe('frequency.updated', this.flash.bind(this, 'Frequency has been added!'));
    }

    flash(text){
        EventEmitter.unsubscribe('frequency.updated', null);
        toast(text, {autoClose: 8000});
        EventEmitter.subscribe('frequency.updated', this.flash.bind(this, 'Frequency has been added!'));
    }

    updateAuthState() {
        this.setState({authenticated: true});
        App.notify();
        this.forceUpdate.bind(this);
    }

    resetAuthState() {
        EventEmitter.unsubscribe('authenticate.update', null);
        deAuthenticate().then(() => {
            this.setState({authenticated: false});
            EventEmitter.subscribe('authenticate.update', this.updateAuthState.bind(this));
        })

    }


    render() {
        let logOutButton;

        if (this.state.authenticated === true) {
            logOutButton = <Button onClick={this.resetAuthState.bind(this)} id="button-logout">Log out</Button>
        }


        const header = (
            <div className="App">
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Welcome to PlantEd</h1>
                        <p className="lead">Keeping your plants alive</p>
                        {logOutButton}
                    </Container>
                </Jumbotron>
            </div>
        );


        if (this.state.authenticated === false) {
            return (
                <div>
                    {header}
                    <Container id="auth-form">
                        <Login/>
                    </Container>
                </div>

            )
        } else {
            return (
                <div>
                    {header}
                        <ToastContainer/>
                        <Container>
                            <AddPlant/>
                        </Container>
                        <Container>
                            <ShowUser/>
                        </Container>
                </div>

            )
        }
    }
}

export default App;
