const axios = require('axios').default;

const baseUrl = 'http://192.168.1.7:5000';

const url ={
    login: `${baseUrl}/user/login`,
    saveTopology: `${baseUrl}/api/topology/saveTopology`,
    getTopology: `${baseUrl}/api/topology/getTopology`
}

const login = data => {
    return new Promise(resolve => {
        const req = {
            method: 'post',
            url: url.login,
            data: {
                username: data.username,
                password: data.password
            }
        }
        axios(req)
            .then(response => { resolve(response) })
            .catch(error => { resolve(error.response) });
    });
}

const saveTopology = data => {
    return new Promise(resolve => {
        const req = {
            method: 'post',
            url: url.saveTopology,
            headers: { 'auth-token': data.token },
            data: {
                nodes: data.nodes 
            }

        }
        axios(req)
            .then(response => { resolve(response) })
            .catch(error => { resolve(error.response) });
    })
}

const getTopology = data => {
    return new Promise(resolve => {
        const req = {
            method: 'get',
            url: url.getTopology,
            headers: { 'auth-token': data.token},
            params: {
                id: data.id
            }
        }
        axios(req)
            .then(response => { resolve(response) })
            .catch(error => { resolve(error.response) });
    })
}

module.exports.loginRequest = login;
module.exports.saveTopologyRequest = saveTopology;
module.exports.getTopologyRequest = getTopology;