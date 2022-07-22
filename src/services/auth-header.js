// service for create header (token) request by the axios

export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return { 
            'Content-type': 'application/json',
            'authorization': 'Bearer ' + token,
            'X-Custom-Header': 'header value'
        }
    } else { 
        return {};
    }
}