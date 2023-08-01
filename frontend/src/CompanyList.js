import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup
} from "reactstrap";

import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

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

  const [searchTerm, setSearchTerm] = useState(null);
  const [companiesArr, setCompaniesArr] = useState(companies);

  const search = term => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function getCompanyData(searchTerm) {
      let companies = await JoblyApi.getCompanies(searchTerm);
      setCompaniesArr(companies);
    }
    getCompanyData(searchTerm);
  }, [searchTerm]);

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Company List
          </CardTitle>
          <CardText>
            <SearchForm search={search} />
          </CardText>
          <ListGroup>
            {companiesArr.map(company => (<CompanyCard company={company} key={company.handle}/>))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
};

export default CompanyList;
