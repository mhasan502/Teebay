import {gql} from "@apollo/client";


const SIGN_IN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(data: {
            email: $email, 
            password: $password
        }) 
        {
            token
            email
        }
    }
`;


export default SIGN_IN_MUTATION;