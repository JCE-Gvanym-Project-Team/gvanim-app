import Login from "../../LoginPage/LoginPage";
import "firebase/compat/auth";
import { useEffect, useState } from "react"
import RecruiterMainPage from "../../RecruiterMainPage";
import { loginRecruiter, loguotRecruiter } from "../../../Firebase/FirebaseFunctions/Authentication";
import firebase from "../../../Firebase/FirebaseConfig/firebase";
import { createTheme } from "@mui/material";
import MyLoading from "../../../Components/MyLoading/MyLoading";

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [validated, setValidated] = useState(true);
  const [alertHidden, setAlertHidden] = useState(true);


  const clearInputs = () => {
    setAlertHidden(true);
  };

  const clearErrors = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const handleLogin = async (event) => {
    clearInputs();
    clearErrors();
    event.preventDefault();

    if (email.length === 0 && password.length === 0) {
      setEmailError(true);
      setPasswordError(true);
    }
    else if (email.length === 0) {
      setEmailError(true);
    }
    else if (password.length === 0) {
      setPasswordError(true);
    }
    else {
      try{
        await loginRecruiter(email, password);
      }
      catch{
        setValidated(false);
        return;
      }
    }

  };


  useEffect(() => {
    const authListener = () => {
      firebase.auth().onAuthStateChanged((user: any) => {
        if (user) {
          clearInputs();
          setUser(user);
        }
        // else {
        //   return <RecruiterMainPage handlelogout={loguotRecruiter} />;
        // }
        setLoading(false);
      });
    };

    authListener();
  }, []);


  return (
    <>
      {user ? (
        <>
          {loading ? (
            <MyLoading loading={loading} setLoading={setLoading} />
          )
            : (
              <RecruiterMainPage handlelogout={loguotRecruiter} />
            )}
        </>

      ) : (
        <>
          {loading ? (
            <MyLoading loading={loading} setLoading={setLoading} />
          )
            : (
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                emailError={emailError}
                passwordError={passwordError}
                setValidated ={setValidated}
                validated={validated}
                alertHidden={alertHidden}
              />
            )}
        </>

      )
      }
    </>

  );
}


