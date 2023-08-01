import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";

/**
 * A generic Item component which populates information of a specific item
 * by first extracting the item's id from the URL parameters and comparing
 * it to the items array provided.
 * 
 * If no id match is found in the items array, redirects user to the 
 * corresponding Menu page specified in the cantFind argument.
 */

function CompanyDetail({ companies }) {
  const { handle } = useParams();

  /**
   * Find the company specified by the handle in params.
   * 
   * If user tries to visit a company detail page which does not exist,
   * redirect them to the companies list page.
   */

  let company = companies.find(candidate => candidate.handle === handle);
  if (!company) return <Redirect to="/companies" />; 

  // name, description, jobs (job cards!)
  const { name, description, logoUrl, jobs } = company;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">{ name }</CardTitle>
          <img src={logoUrl} alt={name}/>
          <CardText className="font-italic">{ description }</CardText>
          <ListGroup>
            Jobs coming soon...
            {/**
             * Map the company's "jobs" to jobCards...
             */}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyDetail;
