import React from 'react';
import LoginTemplate from '../components/login/LoginTemplate';
const LoginPage = () => {
    return(
    <LoginTemplate>
    <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}><img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" /> </a>
    </LoginTemplate>
    );
}

export default LoginPage;