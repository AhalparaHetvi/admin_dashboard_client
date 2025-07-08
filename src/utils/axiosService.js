import axios from 'axios';
const API = {
    // API_URL: "http://localhost:5000"
    API_URL: "https://admin-dashboard-server-1.onrender.com"
}
var axiosservice = (method, url, paylaod) => {
    url = API.API_URL + url;
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    };
    return new Promise((resolve, rejects) => {
        switch (method) {
            case 'POST':
                axios.post(url, paylaod, config).then((res) => {
                    resolve(res.data);
                }).catch(err => {
                    rejects(err)
                })
                break;
            case 'GET':
                axios.get(url, config).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    rejects(err)
                });
                break;
            case 'PUT':
                axios.put(url, paylaod, config).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    rejects(err)
                });
                break;
            case 'PATCH':
                axios.patch(url, paylaod, config).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    rejects(err)
                });
                break;
            case 'DELETE':
                axios.delete(url, config).then(res => {
                    resolve(res.data);
                }).catch(err => {
                    rejects(err)
                });
                break;
            default:
                break;
        }
    });
}


export default {
    apis: axiosservice
}


