import axios from 'axios'

import {apiUrl, getAuthHeaders} from './Auth'

const getPlants = () => {
    const path = apiUrl + '/plants';
    return new Promise((resolve, reject) => {
        axios.get(path, {headers: getAuthHeaders()})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    })
};
const getPlant = (plant) => {
    const path = apiUrl + '/plants/' + plant;
    return new Promise((resolve, reject) => {
        axios.get(path, {headers: getAuthHeaders()})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    })
};

const updatePlant = (plant, frequency) => {
    const current_user = JSON.parse(sessionStorage.getItem('current_user'));
    const path = apiUrl + `/users/${current_user.id}/user_plants/${plant.id}`;
    return new Promise((resolve, reject) => {
        axios.put(path, {frequency: frequency},  {headers: getAuthHeaders()})
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            });
    })
};

export {getPlants, getPlant, updatePlant}
