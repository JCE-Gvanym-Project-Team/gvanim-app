import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "./FirebaseConfig/firebase";

export function getData(path: string) {
  console.log("path: "+path);
  const database = dataref;
  const ref = database.ref(path);
  ref.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
}

export function getAllDB(){
    console.log("in getAllDB()");
    const database = dataref;
    const rootRef = database.ref();
    rootRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    });   
}