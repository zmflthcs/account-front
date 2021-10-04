import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {getKakaoUserInfo} from '../../modules/user';
import {connect} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const OauthHandler = () => {
    const location = useLocation();
    const history = useHistory();

    const nickname = useSelector(state => state.user.nickname)
    
    if(nickname.length>0){
        console.log('nickname',nickname);
        history.push('/');
    }

    const searchParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    let code = searchParams.get("code");


    
    useEffect(()=>{
        async function fetchUserData(){
            const result = await dispatch(getKakaoUserInfo(code));
            console.log(result);
        }
        fetchUserData();
    },[]);

    return(
        <div>
            waiting.......
        </div>
    )
}

export default OauthHandler;