import {gql} from "@apollo/client";


const SIGN_UP_MUTATION = gql`
    mutation SignUp($firstName: String!, $lastName: String!, $address: String!, $email: String!, $phone: String!, $password: String!) {
        signUp(data: {
            signInInput: {
                email: $email, 
                password: $password
            }
            firstName: $firstName, 
            lastName: $lastName, 
            address: $address, 
            phone: $phone, 
        })
        {
            token
            email
        }
    }
`;


export default SIGN_UP_MUTATION;