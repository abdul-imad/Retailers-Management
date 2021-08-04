import auth from "../../firebase/firebaseConfig";
import store from "../../store";
export default async function forgotMiddleWare(dispatch){
    // firebase.auth().sendPasswordResetEmail(
    //     'user@example.com', actionCodeSettings)
    //     .then(function() {
    //       // Password reset email sent.
    //     })
    //     .catch(function(error) {
    //       // Error occurred. Inspect error.code.
    //     });
dispatch({type:"set_correct",payload:true})
    let email = store.getState().forgotemail;
    auth.sendPasswordResetEmail(email)
    .then(function(){
        dispatch({type:"email_sent"})
        console.log("email sent")
        
    })
    .catch(function(error){
        dispatch({type:"set_correct",payload:false})
        console.log(error);
    })
}