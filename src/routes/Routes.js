import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// hooks
import useLoading from "../hooks/useLoading";
// route
import routes from "./index";

const Routes = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={useLoading()}>
        <Switch>
          {routes.map(({ name, path, component: Component }, index) => (
            <Route
              key={index}
              path={path}
              exact
              render={props => <Component {...props} />}
            />
          ))}
          <Redirect from="/" to="/explorer" />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default Routes;
