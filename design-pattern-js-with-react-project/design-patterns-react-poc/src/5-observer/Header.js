import React, { useState, useEffect } from "react";
import loginObserverInstance from "./LoginObserver";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginStateChanged = (value) => {
    console.log(value);
    setIsLoggedIn(value);
  };

  /**
   * subscribe the component when the component mounts, so that it can be notified of changes
   */
  useEffect(() => {
    loginObserverInstance.subscribe(onLoginStateChanged);

    return () => {
      loginObserverInstance.unsubscribe(onLoginStateChanged);
    };
  });

  return (
    <div>
      {isLoggedIn ? (
        <button
          className="btn-add-todo"
          onClick={() => loginObserverInstance.notify(false)}
        >
          Logout
        </button>
      ) : (
        <button
          className="btn-add-todo"
          onClick={() => loginObserverInstance.notify(true)}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
