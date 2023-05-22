import Login from "../../LoginPage/LoginPage";
import firebase1 from "../../../Firebase/FirebaseConfig/firebase";
import "firebase/compat/auth";
import  { useEffect, useState } from "react"
import RecruiterMainPage from "../../RecruiterMainPage";
import NavBar from "../NavBar/NavBar";
import { loginAdmin } from "../../../Firebase/FirebaseFunctions/Authentication";


export default function Auth () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alertHidden, setAlertHidden] = useState(true);


  const clearInputs = () => {
    setAlertHidden(true);
  };

  const clearErrors = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const handleSignup = () => {
    clearErrors();
    firebase1.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user1 = userCredential.user;
        console.log(user1);
        alert("Successfully created an account");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode);
        // ..
      });
  };


  const handleLogin = (event) => {
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
      firebase1
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          // alert(error.code);
          setAlertHidden(false);
           console.log(error.code); //the error
        });

      // loginAdmin({setAlertHidden});
    }

  };

  const handlelogout = () => {
    firebase1.auth().signOut();
  };


  useEffect(() => {
    const authListener = () => {
      firebase1.auth().onAuthStateChanged((user: any) => {
        if (user) {
          clearInputs();
          setUser(user);
        }
        else {
          setUser('');
          return <RecruiterMainPage handlelogout={handlelogout} />;
        }
      });
    };

    authListener();
  }, []);


  return (
    <>
      {user ? (
        <RecruiterMainPage handlelogout={handlelogout} />
      ) : (

            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              emailError={emailError}
              passwordError={passwordError}
              validated={validated}
              alertHidden={alertHidden}
            />
          )
      }
    </>

  );
}


