import {gql} from "@apollo/client";


const LENT_PRODUCTS_QUERY = gql`
    query LentProductsForUser($email: String!) {
        lentProductsForUser(email: $email) {
            id
            title
            price
            description
            rentType
            rentPrice
            datePosted
            category {
                categoryName
            }
        }
    }
`;


export default LENT_PRODUCTS_QUERY;