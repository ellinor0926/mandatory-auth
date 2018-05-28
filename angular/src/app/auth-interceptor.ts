import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username = 'ellie';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends = ['alice', 'bob'];

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbGxpZSIsIm5hbWUiOiJFbGxpbm9yIn0.SHnx7vcTH97UnJzd6sFzd65hVhrJEyo8EUOJ4QCi1PQ';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
  return Observable.throw(
    new HttpErrorResponse({
      status,
      error
    })
  );
};

const makeResponse = body => {
  return of(
    new HttpResponse({
      status: 200,
      body
    })
  );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const {
      body,       // object
      headers,    // object
      method,     // string
      url,        // string
    } = req;


    // implement logic for handling API requests, as defined in the exercise instructions.
    switch (url) {
      case '/api/auth':
        if (body.credentials.username === username && body.credentials.password === password) {
          return makeResponse(token)
        } else {
          return makeError(401, 'Invalid user credentials')
        }
      case '/api/friends':
        if (!headers) {
          return makeError(400, 'No authorization header');
        } else if (headers.get('Authorization') === `Bearer ${token}`) {
          return makeResponse(friends);
        } else {
          return makeError(401, 'Unauthorized token');
        }
      default:
        return makeError(404, 'Not found');
    }


  }
}
