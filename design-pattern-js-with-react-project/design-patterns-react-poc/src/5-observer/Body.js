import React, { useState, useEffect } from "react";
import loginObserverInstance from "./LoginObserver";

const Body = () => {
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
        <p>I am loggedIn content in Body</p>
      ) : (
        <p>I am not loggedIn content in Body</p>
      )}
    </div>
  );
};

export default Body;
