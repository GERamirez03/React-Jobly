import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, ListGroup } from "reactstrap";
import JobCard from "./JobCard";
import JoblyApi from "./api";

/**
 * A component that renders details about a particular company, which is
 * specified by the handle parameter.
 * 
 * The handle parameter is compared against the array of companies in
 * memory to determine whether a user has attempted to access a valid 
 * company details page.
 * 
 * If no company match is found in the array, this component redirects
 * the user to the list of all companies.
 */

function CompanyDetail({ companies }) {

  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState({});

  const { handle } = useParams();

  /**
   * Find the company specified by the handle in params.
   * 
   * If user tries to visit a company detail page which does not exist,
   * redirect them to the companies list page.
   */

  let targetCompany = companies.find(candidate => candidate.handle === handle);
  if (!targetCompany) return <Redirect to="/companies" />;

  /**
   * If the company exists, fetch all company data (including jobs)
   * from the backend using the JoblyApi helper class.
   * 
   * Display a loading message while the data is being fetched.
   * 
   * Once complete, render the company data.
   */

  useEffect(() => {
    async function getCompanyData(handle) {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
      setIsLoading(false);
    }
    getCompanyData(handle);
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  const { name, description, logoUrl, jobs } = company;

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">{ name }</CardTitle>
          <img src={logoUrl} alt={name}/>
          <CardText className="font-italic">{ description }</CardText>
          <ListGroup>
            {jobs.map(job => <JobCard job={job} />)}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyDetail;
