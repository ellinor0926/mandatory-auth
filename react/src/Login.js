import React, {Component} from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {
        // update the component state with a change to either the username or password.
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        // calls the passed callback from the parent <App> component.
        this.props.onLogin(e.target.username.value, e.target.password.value);
    };

    render() {
        // render a login form and perform manual validation.
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                           id="username"
                           className="form-control"
                           name="username"

                           onChange={this.onChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           className="form-control"
                           name="password"

                           onChange={this.onChange}
                    />
                </div>
                <button type="submit"
                        className="btn btn-primary"
                >
                    Log in
                </button>
            </form>
        )
    }
}

export default Login;