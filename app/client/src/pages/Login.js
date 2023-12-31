import React, {useState, useContext} from 'react';
import {Form, Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import {useNavigate} from 'react-router-dom'; // Import useNavigate hook

import { AuthContext } from '../utils/authContext';

function Login() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const context = useContext(AuthContext);
  
    const [values, setValues] = useState({
      email: '',
      password: '',
    });
  
    const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const [loginUser] = useMutation(LOGIN_USER, {
        update(_, result) {
          context.login(result.data.loginUser);
          localStorage.setItem('jwtToken', result.data.loginUser.token); // Store the token in local storage
          navigate('/'); // Use navigate here
        },
        variables: values,
      });
  
    const Submit = (event) => {
      event.preventDefault();
      loginUser();
    };

    return (
        <div className='form-page'>
            <Form onSubmit={Submit} noValidate>
                <h1>Login</h1>
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
                    Login
                </Button>
            </Form>
        </div>
    )
}
const LOGIN_USER = gql`
    mutation loginUser(
        $email: String!
        $password: String!
    ) {
        loginUser(
            loginInput: {
                email: $email
                password: $password
            }
        ) {
            _id username email token
        }
    }
`;

export default Login;