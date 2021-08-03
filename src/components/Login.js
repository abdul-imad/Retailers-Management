import React from 'react';
import { connect } from 'react-redux';
import rootReducer from "../redux/rootReducer"
import { makeStyles } from '@material-ui/styles';
import {Card,CardActions,CardContent,Button,TextField} from "@material-ui/core"
import {Link} from "react-router-dom"
import { Typography } from '@material-ui/core';


function Login(props) {
    
    let useStyles = makeStyles({
        centerDiv: {
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        card:{
            height:"20rem",
            width:"20rem"
        },
        alignCenter: {
          justifyContent: "center",
        },
        centerElements:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }
        ,
        mb:{
            marginBottom:"2rem"
        },
        image:{
            height:"6rem",
            backgroundSize:"contain"
        }
      });
      
const classes = useStyles()
    return (
        <div className = {classes.centerDiv} >
            <Card variant="outlined" className = {classes.card}>
                
              <CardContent className={classes.centerElements}>
              <Typography variant = "h5"  className = {classes.mb}> Login </Typography>
                <TextField id="outlined-basic" variant="outlined" label="Email" type = "email" placeholder="abc@xyz.com" 
                className={classes.mb}
                size = "small"style={{display:"block"},{width:"80%"}} value = {props.email} onChange={(e)=>{console.log(e.target.value)}} />
                <TextField variant = "outlined" label = "Password" type = "password" placeholder="Enter password"
                className = {classes.mb}
                size = "small" style={{display:"block"},{width:"80%"}} value={props.password} onChange={(e)=>{console.log(e.target.value)}}></TextField>
                {/* <Link to = "/forgotPassword" >ForgotPassword</Link> */}
                <div>Forgot password</div>
                <Button color = "primary" variant = "contained" style={{width:"100%",marginTop:"2rem"}}
                onClick={(e)=>{console.log("Submit")}}
                >Login</Button>
              </CardContent>
              <CardActions></CardActions>
            </Card>
        </div>
    );
}

const mapStateToProps = store=>{
    return store;
}

const mapDispatchToProps = dispatch=>{
    return {

    }
}

export default connect()(Login);