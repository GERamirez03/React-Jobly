import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem // pending use... either in JobsList or within JobCard component
} from "reactstrap";

/**
 * A generic Menu component which populates a menu title and item list
 * based on the title string and items array passed to it.
 * 
 * Menu items are links to their Item details page.
 */

function JobsList() {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Jobs
          </CardTitle>
          <CardText>
            Welcome to the Jobs tab! There's also a search bar coming.
          </CardText>
          <ListGroup>
            {/* {items.map(item => (
              <Link to={`/${title.toLowerCase()}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))} */}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default JobsList;
