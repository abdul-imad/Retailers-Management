import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
export default function CircularLoader() {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
          
        },
        width:"50px",
        margin:"300px auto"
        
      },
    }));
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <CircularProgress style={{color:"#082032"}}  />
      </div>
    );
  }