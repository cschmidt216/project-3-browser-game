import './App.css';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
const google = window.google;
//probably going to get rid of this google stuff 
function App() {
  const [user, setUser] = useState({});

  function handleCredentialResponse(response){
    console.log("Encoded JWT ID" + response.credential);
    var userObj = jwt_decode(response.credential);
    console.log(userObj)
    setUser(userObj);
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "723905300252-vgttpra8e38ggo2hdfjrl6u5q0a6tjk5.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    //google.accounts.id.renderButton(
      //document.getElementById('signInDiv'),
      //{theme: 'outline', size: 'large'}
    //);

    google.accounts.id.prompt();
  });
  //no user, show log in
  //if user, show log out
  return (
    <div className="App">
      {/*<div id="signInDiv"></div>*/}
      { Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
        
      }
      
      { Object.keys(user).length !== 0 &&
        <div>
          <img src={user.picture} alt="user profile"/>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
