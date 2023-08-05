import React, {useState, useContext} from 'react';
import {Form, Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom'; // Import useNavigate hook

import { AuthContext } from '../utils/authContext';

function Signup() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const context = useContext(AuthContext);

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const [addUser] = useMutation(CREATE_USER, {
        update(_, result) {
            context.login(result.data.createUser);
            navigate('/'); // Use navigate here
        },
        variables: values
    });

    const Submit = (event) => {
        event.preventDefault();
        addUser();
    };

    return (
        <div className='form-page'>
            <Form onSubmit={Submit} noValidate>
                <h1>Sign Up</h1>
                <Form.Input 
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
const CREATE_USER = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            userInput: {
                username: $username
                email: $email
                password: $password
            }
        ) {
            _id username email token
        }
    }
`;

export default Signup;