import React, {useEffect} from 'react';
import { Route, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import AccountRecordPage from './page/AccountRecordPage';
import AddRecordPage from './page/AddRecordPage';
import AddCategoryPage from './page/AddCategoryPage';
import RecordDetailPage from './page/RecordDetailPage';
import Login from './page/Login';
import OauthHandler from './components/login/OauthHandler';
import {connect} from 'react-redux';
import {getCategories} from './modules/category';
import { Container} from "@material-ui/core";
import Cookies from 'js-cookie';
import parseJwt from './lib/parseToken';
import { setUserInfo } from './modules/user';
const App=({getCategories, setUserInfo, nickname})=> {
  
  /*
  useEffect(()=>{
    console.log('get categories');
    getCategories();
  },[getCategories]);
*/

  useEffect(()=>{
    const token = Cookies.get('token');
    if(Cookies.get('token')){
      const parseResult = parseJwt(token);
      setUserInfo(parseResult.nickname, parseResult.userImage);
    }
  },[])

  const location = useLocation();
  
  /*
  if(location.pathname==='/login'){
    return(<Login/>)
  }
*/
  if(nickname.length>0){
    return (
      <div className="App">
        <Route path={["/","/addrecord","/categories"]} component={NavBar}></Route>
        <Container maxWidth='md' style={{marginTop: '5rem'}}>
          
          <Route exact path='/' component={AccountRecordPage}/>
          <Route exact path='/addrecord' component={AddRecordPage}/>
          <Route exact path='/categories' component={AddCategoryPage}/>
          <Route exact path='/record/:id' component={RecordDetailPage}/>
        </Container>
          <Route component={OauthHandler} path="/oauth/kakao"/>
      </div>)
  }else{
    return(
    <div className="App">
        <Route path={["/","/addrecord","/categories"]} component={NavBar}></Route>
        <Container maxWidth='md' style={{marginTop: '5rem'}}>
          <Route path='/' component={Login}/>
          <Route component={OauthHandler} path="/oauth/kakao"/>
        </Container>
    </div>
    )
  }
}

export default connect(({user})=>({
  nickname: user.nickname}),{getCategories, setUserInfo})(App);
