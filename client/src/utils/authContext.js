import React, { createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
      case 'LOGIN':
        // Store the token in local storage
        localStorage.setItem('jwtToken', action.payload.token);
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT':
        // Remove the token from local storage
        localStorage.removeItem('jwtToken');
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  }

function AuthProvider(props){
    const [state, dispatch] = React.useReducer(authReducer, {user: null});

    function login(userData){
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }
    function logout(){
        dispatch({ type: 'LOGOUT' });
    }
    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}
    
export { AuthContext, AuthProvider };