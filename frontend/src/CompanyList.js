import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup
} from "reactstrap";

import CompanyCard from "./CompanyCard";

/**
 * TODO: Implement search form functionality for CompanyList with a CompanySearchForm
 * component to filter companies by name. Connect this to the backend with the JoblyAPI class.
 * 
 * A component which lists all companies and simple information
 * about each company.
 * 
 * Each CompanyCard contains a link to their respective CompanyDetail page.
 */

function CompanyList({ companies }) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Company List
          </CardTitle>
          <CardText>
            Welcome to the Company List tab! There's also a search bar coming.
          </CardText>
          <ListGroup>
            {companies.map(company => (<CompanyCard company={company} key={company.handle}/>))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyList;
