import React from 'react';
import App from '../App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: '/graphql',
})

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})


export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)