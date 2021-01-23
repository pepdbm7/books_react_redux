import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {RootState} from "./redux/store"
import { useSelector } from 'react-redux';

import List from './components/list/List';
import Landing from "./components/landing/Landing"
import NotFound from "./components/error/NotFound"

export const DatabaseURL = "http://gekko-assignment.appspot.com/api/v1/secure"

const App =() => {
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  useEffect(() => console.log(isAuthorized), [isAuthorized])

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props: any) => (
            <Landing
              {...props}
            />
          )}
        />
        <Route
          path="/books"
          render={(props: any) =>
            isAuthorized ? (
              <List
                {...props}
              />
            ) : (
              <Redirect exact to={"/"} />
            )
          }
        />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
