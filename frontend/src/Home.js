import React, { useContext } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import UserContext from "./userContext";

/**
 * A component for the homepage of Jobly.
 * 
 * The message rendered changes based on whether the user is signed in or not.
 * 
 * This component accesses the currentUser's firstName through the UserContext
 * to render a welcome message or ask the user to authenticate.
 */

function Home() {

  const { currentUser } = useContext(UserContext);
  const { firstName } = currentUser;

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Jobly
            </h3>
          </CardTitle>
          <CardText>
            <p>All the jobs in one convenient place.</p>

            { !firstName && <p>Log in or sign up to get started today!</p>}
            { firstName && <p><b>Welcome, {firstName}!</b></p>}
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
