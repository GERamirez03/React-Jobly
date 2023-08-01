import React from "react";
import { ListGroupItem } from "reactstrap";

/**
 * A simple JobCard component which populates basic information
 * about a job into a small card for display within the
 * JobList parent component.
 * 
 * The specific job is passed down as a property for processing.
 * 
 * Returns a populated JobCard component.
 */

function JobCard({ job }) {
  const { title, companyName, salary, equity } = job; 

  return (
        <ListGroupItem>
            <p><b>{ title }</b></p>
            <p>{ companyName }</p>
            { salary && <p>Salary: { salary }</p>}
            { equity && <p>Equity: { equity }</p>}
        </ListGroupItem>
  );

}

export default JobCard;
