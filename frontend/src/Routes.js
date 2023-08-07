import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import NotFound from "./NotFound";
import UserContext from "./userContext";

/**
 * A routes component which directs the user to the appropriate resource depending on
 * the path specified and the user's authorization.
 * 
 * Only the home, login, and signup routes are public. The companies, jobs, company details,
 * and profile details routes are protected and require a user to be signed in to access.
 */

function Routes({ companies, jobs }) {

  const { currentUser } = useContext(UserContext);
  const { username } = currentUser;

  return (
    <Switch>

      {/** PUBLIC ROUTES */}

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <LoginForm />
        </Route>

        <Route exact path="/signup">
          <SignupForm />
        </Route>

      {/** PROTECTED ROUTES */}

      { !username && <Redirect to="/" />}

        <Route exact path="/companies">
          <CompanyList companies={companies} />
        </Route>

        <Route path="/companies/:handle">
          <CompanyDetail companies={companies} />
        </Route>

        <Route exact path="/jobs">
          <JobsList jobs={jobs} />
        </Route>

        <Route exact path="/profile">
          <ProfileForm />
        </Route>

      {/** NOT FOUND ROUTE */}

        <Route>
          <NotFound />      
        </Route>        

    </Switch>
  );
}

export default Routes;
