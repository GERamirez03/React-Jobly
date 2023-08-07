import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import UserContext from "./userContext";

/**
 * A controlled form component which renders a signup form, handles changes,
 * and handles submission to register new Jobly users using the signup function 
 * accessed through the UserContext.
 */

function SignupForm() {

    const { signup } = useContext(UserContext);

    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();
        signup(formData);
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
                      Sign Up
                    </h3>
                </CardTitle>
                <CardText>
                    <form onSubmit={handleSubmit}>
                        <p>
                        <label htmlFor="username">username:</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        </p>
                        <p>
                        <label htmlFor="password">password:</label>
                        <input
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                        />
                        </p>
                        <p>
                        <label htmlFor="firstName">firstName:</label>
                        <input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        </p>
                        <p>
                        <label htmlFor="lastName">lastName:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        </p>
                        <p>
                        <label htmlFor="email">email:</label>
                        <input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                        />
                        </p>

                        <button>Submit</button>
                    </form>
                </CardText>     
            </CardBody>
        </Card>
    );
};

export default SignupForm;