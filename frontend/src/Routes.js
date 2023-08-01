import React from "react";
// import "./NavBar.css";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobsList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import NotFound from "./NotFound";

/**
 * A navigation bar component with navigation links to the Jobly homepage
 * and either login and signup OR companies, jobs, and profile.
 * 
 * Highlights current link.
 */

// I think this needs access to the companies and jobs state... and import the components


function Routes({ companies, jobs }) {
  return (
    <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/companies">
          <CompanyList companies={companies} />
        </Route>

        <Route path="/companies/:handle">
          <CompanyDetail companies={companies} />
        </Route>

        <Route exact path="/jobs">
          <JobsList jobs={jobs} />
        </Route>

        <Route exact path="/login">
          <LoginForm />
        </Route>

        <Route exact path="/signup">
          <SignupForm />
        </Route>

        <Route exact path="/profile">
          <ProfileForm />
        </Route>

        <Route>
          <NotFound />      
        </Route>        

    </Switch>
      
    
  );
}

export default Routes;
