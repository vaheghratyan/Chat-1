import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../../resources/AppLogo.png";
import GoogleLogo from "../../resources/GoogleLogo.png";
import { GoogleLogin } from "react-google-login";
import "./Join.css";

const Join = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const failToLogIn = () => {
    alert("Failed to log in!");
  };

  const responseGoogle = (response) => {
    setIsLoggedIn(true);
    setPhoto(response.profileObj.imageUrl);
    setName(response.profileObj.name);
  };

  return (
    <div className="cont">
      <div className="sign-in">
        <h2>Chattify</h2>
        <img className="appLogo" src={AppLogo} alt="Chattify" />
        {isLoggedIn && (
          <div className="block">
            <div className="join">
              <input
                placeholder="Room"
                className="textInput"
                type="text"
                onChange={(event) => setRoom(event.target.value)}
              />
              <input
                placeholder="Password"
                className="textInput"
                type="password"
              />
              <Link
                onClick={(event) =>
                  !name || !room ? event.preventDefault() : null
                }
                to={`/chat?name=${name}&room=${room}&photo=${photo}`}
              >
                <input
                  className="signinButton mt-20"
                  type="submit"
                  value="Join"
                />
              </Link>
            </div>
          </div>
        )}
        {isLoggedIn === false && (
          <div className="signInBlock">
            <div>
              <img src={GoogleLogo} alt="Google Login" />
            </div>
            <GoogleLogin
              render={(renderProps) => (
                <input
                  onClick={renderProps.onClick}
                  className="signinButton"
                  type="submit"
                  value="Sign In"
                />
              )}
              clientId="849423915979-g5giubl8fb8reqhuj8og28n6fvtkdbqd.apps.googleusercontent.com"
              onSuccess={responseGoogle}
              onFailure={failToLogIn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
