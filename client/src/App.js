import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';//function that deconde JWT
import './App.css';

function App() {
  //ONLY WORKS BC OF SCRIPT IN PUBLIC INDEX.HTML

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    //response.credential returns JWT ID token from google - why need jwt_decode npm package
    console.log('Enconded JWT ID token: ' + response.credential)
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject); // great for state on one page - wouldn't work for multi component applications - think redux state for large scale app

    document.getElementById('signInDiv').hidden = true; //hide sign in w google button
  };

  function handleSignOut(e) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }


  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:"136021921497-f24462sf6i90ok83pre9krv1q09jdgh7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    //renders sign in with google button and assigns it
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: 'outline', size: 'large'}
    );

    google.accounts.id.prompt();//one touch logic
  }, []);

  return (
    <div className="App">
      <div id='signInDiv'></div>
      { Object.keys(user).length != 0 && // && means if said condition is true ...
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      { user && 
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
