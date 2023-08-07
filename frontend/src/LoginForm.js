import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import UserContext from "./userContext";

/**
 * A controlled form component which renders a login form, handles changes,
 * and handles submission to log users into Jobly using the login function
 * accessed through the UserContext.
 */

function LoginForm() {

    const { login } = useContext(UserContext);

    const INITIAL_STATE = {
        username: "",
        password: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();
        login(formData);
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
                      Log In
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
                        
                        <button>Submit</button>
                    </form>
                </CardText>     
            </CardBody>
        </Card>
    );
};

export default LoginForm;