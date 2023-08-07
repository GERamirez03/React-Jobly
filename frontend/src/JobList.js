import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup
} from "reactstrap";

import JobCard from "./JobCard";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

/**
 * A component which renders a list of jobs with all available information about them.
 * 
 * Also renders a SearchForm component to allow users to search for jobs by keyword.
 */

function JobsList({ jobs }) {

  const [searchTerm, setSearchTerm] = useState(null);
  const [jobsArr, setJobsArr] = useState(jobs);

  const search = term => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function getJobData(searchTerm) {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobsArr(jobs);
    }
    getJobData(searchTerm);
  }, [searchTerm])


  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Jobs
          </CardTitle>
          <CardText>
            <SearchForm search={search} />
          </CardText>
          <ListGroup>
            {jobsArr.map(job => <JobCard job={ job }/>)}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
};

export default JobsList;
