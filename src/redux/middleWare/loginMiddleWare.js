import store from "../../app/store";
import auth from "../../firebase/firebaseConfig";

export default async function loginMiddleWare(dispatch) {
  let email = store.getState().Login.email;
  let password = store.getState().Login.password
  console.log(email,password)
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({type:"set_email",payload:""})
    dispatch({type:"set_password",payload:""})
    console.log("success");
  } catch (error) {
    console.log("error found");
    console.log(error);
  }
}
