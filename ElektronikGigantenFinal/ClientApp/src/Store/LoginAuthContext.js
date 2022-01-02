import React, { useEffect, useState } from "react";

const LoginAuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  address: null,
  postal: null,
  firstName: null,
  lastName: null,
  customerId: null,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [address, setAddress] = useState("");
  const [postal, setPostal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [customerId, setCustomerId] = useState("");
  

  /*
  const adminUser = {
    email: "admin@admin.com",
    password: "admin12345"
  };
  */

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
  }, [address, postal, firstName, lastName, customerId]);

  const loginHandler = async (email, password) => {
      let url = "http://localhost:13978/api/Customers/Login";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({email: email, password: password}),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });
        if(response.ok){
        const data = await response.json();
        console.log("Logged in!");
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("mail", email);
        localStorage.setItem("userId", data.id);
        setCustomerId(data.id);
        setAddress(data.addressline);
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setPostal(data.postal);
        setIsLoggedIn(true);
        }
        else{
          console.log("Wrong info!");
        }
      } catch (error) {
        console.log(error.message);
      }
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <LoginAuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        address: address,
        postal: postal,
        firstName: firstName,
        lastName: lastName,
        customerId: customerId,
      }}
    >
      {props.children}
    </LoginAuthContext.Provider>
  );
};

export default LoginAuthContext;
