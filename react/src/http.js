const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'ellie';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'];

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbGxpZSIsIm5hbWUiOiJFbGxpbm9yIn0.SHnx7vcTH97UnJzd6sFzd65hVhrJEyo8EUOJ4QCi1PQ';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const body = JSON.parse(config.data);
    if (body.username === username && body.password === password) {
        return [200, {token}]
    } else {
        return [401, { error : 'invalid login credentials'}]
    }
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers
    } = config;

    if (!headers) {
        return [400, {error: 'No Authorization Header'}]
    } else if (headers.Authorization === `Bearer ${token}`){
        return [200, {friends}]
    } else {
        return [401, {error: 'Unauthorized token'}]
    }

});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;