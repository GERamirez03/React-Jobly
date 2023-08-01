import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/**
 * A controlled form component which renders a form, handles changes,
 * and handles submission using the addItem function passed down from
 * the App component. UPDATE DOCS
 */

// prop will likely be currentUser or similar

function ProfileForm({ addItem }) {

    const INITIAL_STATE = { // populate initial state with currentUser details
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleSubmit = evt => {
        evt.preventDefault();
        addItem(formData); // change addItem to updateUser or similar!
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
                        <label htmlFor="username">username:</label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={true}
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

                        <button>Save Changes</button>
                    </form>
                </CardText>     
            </CardBody>
        </Card>
    );
};

export default ProfileForm;