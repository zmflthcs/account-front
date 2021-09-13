import React from 'react';
import NavBar from './components/NavBar';
import './App.css';
import AccountContainer from './containers/AccountContainer';
import OptionContainer from './containers/OptionContainer';
import AddRecord from './page/AddRecord';
import { Route, useLocation } from 'react-router-dom';
import Categories from './page/Categories';
import Login from './page/Login';
import { makeStyles } from '@material-ui/core/styles';
import OauthHandler from './components/login/OauthHandler';

const App=()=> {
  const location = useLocation();
  if(location.pathname==='/login'){
    return(<Login/>)
  }
  return (
    <div className="App">
      <Route path={["/","/addrecord","/categories"]} component={NavBar}></Route>
      <div>
        <Route exact path='/' component={OptionContainer}></Route>
        <Route exact path='/' component={AccountContainer}/>
        <Route exact path='/addrecord' component={AddRecord}/>
        <Route exact path='/categories' component={Categories}/>
        <Route component={OauthHandler} path="/oauth/kakao"/>
      </div>
    </div>
  );
}

export default App;
