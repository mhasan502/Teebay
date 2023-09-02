import {gql} from "@apollo/client";


const BOUGHT_PRODUCTS_QUERY = gql`
    query BoughtProductsForUser($email: String!) {
        boughtProductsForUser(email: $email) {
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

export default BOUGHT_PRODUCTS_QUERY;