import React from 'react';
import AccountContainer from '../containers/AccountContainer';
import OptionContainer from '../containers/OptionContainer';
import { Typography } from "@material-ui/core";
export default function AccountRecordPage(){
    
    return(
        <div>
             <Typography component="h1" variant="h4" paragraph>
                기록
            </Typography>
            
            <OptionContainer/>
            <AccountContainer/>
        </div>
    )

};