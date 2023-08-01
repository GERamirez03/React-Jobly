import React from "react";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";

/**
 * A simple CompanyCard component which populates basic information
 * about a company into a small card for display within the
 * CompanyList parent component.
 * 
 * The specific company is passed down as a property for processing.
 * 
 * Returns a populated CompanyCard component.
 */

function CompanyCard({ company }) {
  const { handle, name, description, logoUrl } = company; 

  return (
    <Link to={`/companies/${handle}`}>
        <ListGroupItem>
            <img src={logoUrl} alt={name}/>
            <p><b>{ name }</b></p>
            <p>{ description }</p>
        </ListGroupItem>
    </Link>
  );

}

export default CompanyCard;
