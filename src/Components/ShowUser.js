import React, {Component} from 'react';
import {getUser} from '../Modules/User';
import {updatePlant} from '../Modules/Plants'
import {Input, Button} from 'reactstrap'
import EventEmitter from '../Modules/EventEmitter';

class ShowUser extends Component {
    constructor() {
        super();
        this.state = {user: [], isLoading: true, chosenFrequency: ''}
    }

    componentWillMount() {
        getUser().then(response => {
            this.setState({user: response.data, isLoading: false});
        });
        EventEmitter.subscribe('plant.added', this.fetchUser.bind(this))
    }

    fetchUser() {
        EventEmitter.unsubscribe('plant.added', '');
        getUser().then(response => {
            this.setState({user: response.data, isLoading: false});
            EventEmitter.subscribe('plant.added', this.fetchUser.bind(this))
        })
    }

    handleFrequencyInput(event) {
        this.setState({chosenFrequency: event.target.value})
    }

    addFrequency(plant) {
        updatePlant(plant, this.state.chosenFrequency).then((response) => {
            console.log(response);
            EventEmitter.publish('frequency.updated', null);
            this.setState({chosenFrequency: ''})
        })

    }


    render() {

        const user = this.state.user;


        if (this.state.isLoading) {
            return <div>Loading</div>
        } else {
            const plantList = user.relationships.plants.data.map(plant => {
                let frequency;
                if (plant.frequency) {
                    frequency = <p>Watering frequency: every {plant.frequency} days</p>

                } else {
                    frequency = <p>Watering frequency not set up yet</p>
                }

                return (
                    <li key={plant.id} className={'no-bullets'} value="plant">
                        <h4>{plant.plant.name}</h4>
                        <p>{plant.plant.description}</p>
                        {frequency}
                        <Input placeholder={plant.frequency ? 'Change frequency' : 'Add frequency'} onChange={this.handleFrequencyInput.bind(this)}/>
                        <Button onClick={this.addFrequency.bind(this, plant)}>Add</Button>
                    </li>

                )
            });
            return (
                <div>
                    <div className="container">
                        {plantList}
                    </div>
                </div>
            );
        }

    }
}

export default ShowUser;
