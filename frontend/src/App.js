import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/Login/Login';
import LayOut from './hoc/Layout';
import Main from './components/Main/Main';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { AuthContext } from './Auth/Auth';
import AddArticle from './components/AddArticle/AddArticle';
import Articles from './components/Articles/Articles';
import AddCategory from './components/AddCategory/AddCategory';
import AddSubCategory from './components/AddSubCategory/AddSubCategory';
import Categories from './components/Categories/Categories';
import SearchResults from './components/SearchResults/SearchResults';
import AddUser from './components/AddUser/AddUser';
import EditUserList from './components/EditUser/EditUserList';
import AddVideo from './components/AddVideo/AddVideo';
import Videos from './components/Videos/Videos';
import Subscribers from './components/Subscribers/Subscribers';
import SendLetterSubscriber from './components/SendLetterSubscriber/SendLetterSubscriber';
import AddPartners from './components/AddPartners/AddPartners';
import Partners from './components/Partners/Partners';
import Comments from './components/Comments/Comments';

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const [token, setToken] = useState('');
  console.log('21 tox token', token);

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
    // setToken(data['dataValues']['token']);
    setToken(data?.dataValues.token);
  };

  const { pathname } = useLocation();

  // console.log(authTokens['dataValues']);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Switch>
        <Route exact path='/login' component={Login} />
        {token ? (
          <LayOut>
            <PrivateRoute exact path='/' component={Main} />

            <Route exact path='/addArticle'>
              <AddArticle token={token} />
            </Route>
            <Route exact path='/articles'>
              <Articles token={token} />
            </Route>
            <Route exact path='/EditArticle/:id'>
              <AddArticle token={token} />
            </Route>
            <Route exact path='/addCategory'>
              <AddCategory token={token} />
            </Route>
            <Route exact path='/addCategory/:id'>
              <AddCategory token={token} />
            </Route>
            <Route exact path='/addSubCategory'>
              <AddSubCategory token={token} />
            </Route>
            <Route exact path='/categories'>
              <Categories token={token} />
            </Route>
            <Route exact path='/searchResults/:str' component={SearchResults} />
            <Route exact path='/addUser'>
              <AddUser token={token} />
            </Route>
            <Route exact path='/editUserList'>
              <EditUserList token={token} />
            </Route>
            <Route exact path='/editUser/:id'>
              <AddUser token={token} />
            </Route>
            <Route exact path='/addVideo'>
              <AddVideo token={token} />
            </Route>
            <Route exact path='/videos'>
              <Videos token={token} />
            </Route>
            <Route exact path='/subscribers'>
              <Subscribers token={token} />
            </Route>
            <Route exact path='/sendLetterSubscriber'>
              <SendLetterSubscriber token={token} />
            </Route>
            <Route exact path='/addPartners'>
              <AddPartners token={token} />
            </Route>
            <Route exact path='/partners'>
              <Partners token={token} />
            </Route>
            <Route exact path='/comments'>
              <Comments token={token} />
            </Route>
          </LayOut>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referrer: pathname } }}
          />
        )}
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
