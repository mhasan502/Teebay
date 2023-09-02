import {gql} from "@apollo/client";


const SOLD_PRODUCTS_QUERY = gql`
    query SoldProductsForUser($email: String!) {
        soldProductsForUser(email: $email) {
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

export default SOLD_PRODUCTS_QUERY;