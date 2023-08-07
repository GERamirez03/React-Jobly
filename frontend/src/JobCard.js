import React, { useState, useContext } from "react";
import { ListGroupItem } from "reactstrap";
import UserContext from "./userContext";

/**
 * A component which populates basic information about a job into a small card
 * for display within the JobList parent component.
 * 
 * This component accesses the UserContext to determine whether a user has applied
 * to the specific job in order to render the appropriate button next to the job.
 * 
 * Handles user applying to the job through the handleApply function, which calls
 * the apply function from the UserContext.
 */

function JobCard({ job }) {  

  const { currentUser, apply } = useContext(UserContext);
  const { applications } = currentUser;

  const { id, title, companyName, salary, equity } = job;

  // initialize hasApplied as whether or not this specific job is already in the currentUser's applications array
  const [hasApplied, setHasApplied] = useState(applications.includes(id));

  async function handleApply(id) {
    await apply(id);
    setHasApplied(true);
  }

  return (
        <ListGroupItem>
          
            <p><b>{ title }</b></p>
            <p>{ companyName }</p>
            { salary && <p>Salary: { salary }</p>}
            { equity && <p>Equity: { equity }</p>}

            {/** If user has yet to apply to this job, show an Apply button. Else, render a disabled "Applied" button. */}
            { hasApplied && <button disabled={true}>Applied</button>}
            { !hasApplied && <button onClick={() => handleApply(id)}>Apply</button>}

        </ListGroupItem>
  );

}

export default JobCard;
