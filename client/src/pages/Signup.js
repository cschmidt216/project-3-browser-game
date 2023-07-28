import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';

function Signup(props) {
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
            console.log(result);
            props.history.push('/');
        },
        variables: values
    });

    const Submit = (event) => {
        event.preventDefault();
        addUser();
    };

    return (
        <div>
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