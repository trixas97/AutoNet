const axios = require('axios').default;

const baseUrl = 'http://192.168.1.7:5000';

const url ={
    login: `${baseUrl}/user/login`
}

const loginRequest = data => {
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

module.exports.loginRequest = loginRequest;