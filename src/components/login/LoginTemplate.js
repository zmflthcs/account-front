import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        left:'0',
        right:'0',
        bottom:'0',
        top:'0',
    },
  }));

const LoginTemplate= ({children})=>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            {children}
        </div>
    )
};

export default LoginTemplate;