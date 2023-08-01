import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 * A helper component which displays a friendly 404-style message.
 */

function NotFound() {
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">Oops...</CardTitle>
          <CardText className="font-italic">
            I can't seem to find what you're looking for. 
            Please use the navigation bar above to get back to Jobly!
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default NotFound;
