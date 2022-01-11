import React from 'react';
import '../styles/reset.css';
import {
  Main,
  Chat,
  Choice,
  Myinfo,
  Login,
  PostMain,
  PostDetail,
  PostWrite,
  PostEdit,
  AddMyinfo,
  Hidden,
  KakaoCallback,
  NotPound,
  Chatroom,
  Start,
  LoginNeed,
  Profile,
} from '../components/templates';
import { PrivateRoute, PublicRoute, Bg } from '../components/modules/layout';
// Redux 불러오기
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Bg></Bg>
      <Switch>
        <PrivateRoute exact path="/start" Component={Start} />
        <PublicRoute exact restricted={true} path="/loginNeed" Component={LoginNeed} />
        <PublicRoute exact restricted={true} path="/login" Component={Login} />
        <PrivateRoute exact path="/" Component={Main} />
        <PrivateRoute exact path="/choice" Component={Choice} />
        <PrivateRoute exact path="/chat" Component={Chat} />
        <PrivateRoute exact path="/AddMyinfo" Component={AddMyinfo} />
        <PrivateRoute exact path="/myinfo" Component={Myinfo} />
        <PrivateRoute exact path="/profile/:userId" Component={Profile} />/
        <PrivateRoute exact path="/postMain" Component={PostMain} />
        <PrivateRoute exact path="/postMain/:postId" Component={PostDetail} />
        <PrivateRoute exact path="/postWrite" Component={PostWrite} />
        <PrivateRoute exact path="/postEdit/:postId" Component={PostEdit} />
        <PublicRoute
          exact
          restricted={true}
          path="/user/kakao/callback"
          Component={KakaoCallback}
        />
        <PublicRoute exact restricted={true} path="*" Component={NotPound} />
      </Switch>
      {/* <Route exact path="/hidden" component={Hidden} /> */}
    </ConnectedRouter>
  );
}

export default App;
