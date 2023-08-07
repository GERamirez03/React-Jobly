import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import UserContext from "./userContext";

/**
 * A controlled form component which renders a profile form, handles changes,
 * and handles submission to update a user's Jobly profile information using
 * the updateProfile function accessed through the UserContext.
 * 
 * Reads the currentUser's information through the UserContext to initially 
 * populate the form.
 */

function ProfileForm() {

    const { currentUser, updateProfile } = useContext(UserContext);
    const { username, firstName, lastName, email } = currentUser;

    // populate initial state with logged-in currentUser details
    const INITIAL_STATE = { username, firstName, lastName, email };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();
        updateProfile(formData);
        setFormData(INITIAL_STATE);
        history.push("/");
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h3 className="font-weight-bold">
                      Profile
                    </h3>
                </CardTitle>
                <CardText>
                    <form onSubmit={handleSubmit}>
                        <p>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={true}
                        />
                        </p>
                        
                        <p>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        </p>
                        <p>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        </p>
                        <p>
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                        />
                        </p>

                        <button>Save Changes</button>
                    </form>
                </CardText>     
            </CardBody>
        </Card>
    );
};

export default ProfileForm;