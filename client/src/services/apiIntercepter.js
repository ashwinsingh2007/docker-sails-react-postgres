const ENDPOINT = 'http://localhost:1337/api'
export const requestAPI = {
    post: (data) => {
        const { url, body } = data;
        const parameters = {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify(body)
        };
        return fetch(`${ENDPOINT}/${url}`, parameters)
    },
    get: (data) => {
        const { url, body } = data;
        const parameters = {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
        };
        return fetch(`${ENDPOINT}/${url}`, parameters)
    }

};