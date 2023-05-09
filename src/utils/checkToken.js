import jwt_decode from 'jwt-decode';

const token = localStorage.getItem('token');
export default function checkToken() {
    if (token) {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Divide by 1000 to get the current time in seconds
        if (decodedToken.exp < currentTime) {
          // The token has expired
          // Do something, like redirect the user to the login page
          return false;
        }
      } else {
        // There is no token, so the user is not logged in
        // Do something, like redirect the user to the login page
        return false;
      }
        return true;

    }







