import React, { Component } from 'react';


class AddPlant extends Component {
    constructor() {
      super();
      this.state = {plants: []}
    }

    componentDidMount() {
        apiUrl().then(data => {
            this.setState({plants: data.entity.data})
        })
    }

    render() {
      const plantOptions = this.state.plants.map(plant => {
          return <option key={plant.id} value="plant">{plant.attributes.name}</option>
      });
        return (
            <div>
                <h3>Add your Plant:</h3>
                <select ref="plant">
                    {plantOptions}
                </select>
            </div>
        );
    }
}
export default AddPlant;
