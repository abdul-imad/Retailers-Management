import React from "react";
import { connect } from "react-redux";
import forgotMiddleWare from "../redux/middleWare/forgotMiddleWare";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardActions,
	CardContent,
	Button,
	TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

function ForgotPassword(props) {
  let { forgotemail } = props;
  let { isEmailCorrect,emailSent} = props;
  console.log(emailSent)
  let useStyles = makeStyles({
    centerDiv: {
		
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      height: "20rem",
      width: "20rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    mb: {
      marginBottom: "2rem",
    },
    image: {
      height: "6rem",
      backgroundSize: "contain",
    },
  });
  const classes = useStyles();

  return (
    <div className = {classes.centerDiv}>
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.centerElements}>
          <Typography variant="h5" className={classes.mb}>
            Reset Password
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email"
            type="email"
            placeholder="abc@xyz.com"
            className={classes.mb}
            size="small"
            style={{ display: "block", width: "80%" }}
            value={forgotemail}
            onChange={(e) => {
              props.setforgotEmail(e.target.value);
            }}
          />
		  {isEmailCorrect==false ? <div style = {{color:"red"}}>Email you entered doesn't match</div>:emailSent==true?
			<h2>Email Sent</h2>:null  
		}

          <Button
            color="primary"
            variant="contained"
            style={{ width: "100%", marginTop: "2rem" }}
            onClick={(e) => {
              props.handleReset(e);
            }}
          >
            Send Email
          </Button>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = (store) => {
  return store;
};

const mapDispatchToProps = (dispatch) => {
  return {
	  setforgotEmail:(val)=>{
		  return dispatch({type:"set_forgot_email",payload:val})
	  }
	  ,
    handleReset: (e) => {
      e.preventDefault();
      return dispatch(forgotMiddleWare);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
