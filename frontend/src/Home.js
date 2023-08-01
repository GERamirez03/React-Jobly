import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 * A simple Home component to serve as a homepage for Jobly.
 */

function Home() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Jobly!
            </h3>
          </CardTitle>
          <CardText>
            Get started searching for your next company and job with the Navigation Bar above!
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
