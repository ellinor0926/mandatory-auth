// import axios with the alias 'http'. 
import http from './http';

const jwt_decode = require('jwt-decode');

// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;


    constructor() {
        // perform any logic upon application startup here...
        this.token = localStorage.getItem('accessToken');

        if (this.token) {
            this.user = jwt_decode(this.token);
        }
    }

    // use this method to catch http errors. 
    handleError(error) {
        throw error.response.data;
    }

    // convenience method to get authentication state for a user, which should include the 'user' class property;
    // this method is used in the <App> component.
    getAuthState() {
        return this.user;
    }

    login(credentials) {
        return http.post("/api/auth", {...credentials})
            .then(res => {
                this.user = jwt_decode(res.data.token);
                localStorage.setItem('accessToken', res.data.token);
            })
            .catch(error => {
                this.handleError(error)
            })
    }

    logout() {
        // logout the current user by removing the corresponding token.
        localStorage.removeItem('accessToken');
        this.token = undefined;
        this.user = undefined;
    }

    getResource(resource) {
        return http.get(`/api/${resource}`, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })
            .then(res => {
                console.log(res.data.friends);
            })
            .catch(error => {
                this.handleError(error)
            })
    }
}

export default new AuthService();