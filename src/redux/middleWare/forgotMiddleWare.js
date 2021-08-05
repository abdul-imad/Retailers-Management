import auth from "../../firebase/firebaseConfig";
import store from "../../app/store";
export default async function forgotMiddleWare(dispatch){
   
dispatch({type:"set_correct",payload:true})
    let email = store.getState().Forgot.forgotemail;
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