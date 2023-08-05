import React, { createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
  selectedCharacter: null // Add selectedCharacter to initialState
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
    selectedCharacter: null, // Include selectedCharacter here
    login: (userData) => {},
    logout: () => {},
    selectCharacter: (characterId) => {} // Add a new function to handle selecting a character
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
          selectCharacter: null 
        };
      case 'SELECT_CHARACTER':
        return {
          ...state,
          selectedCharacter: action.payload
        };
      default:
        return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = React.useReducer(authReducer, {user: null, selectedCharacter: null});

    function login(userData){
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }
    function logout(){
        dispatch({ type: 'LOGOUT' });
    }
    function selectCharacter(characterId){
        dispatch({
            type: 'SELECT_CHARACTER',
            payload: characterId
        });
    }
    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout, selectedCharacter: state.selectedCharacter, selectCharacter }}
            {...props}
        />
    );
}
    
export { AuthContext, AuthProvider };