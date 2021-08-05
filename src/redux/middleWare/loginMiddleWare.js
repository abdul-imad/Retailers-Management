import store from "../../store";
import auth from "../../firebase/firebaseConfig";

export default async function loginMiddleWare() {
  let email = store.getState().email;
  let password = store.getState().password;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("success");
  } catch (error) {
    console.log("error found");
    console.log(error);
  }
}
