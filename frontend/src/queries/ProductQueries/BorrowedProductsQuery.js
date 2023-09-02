import {gql} from "@apollo/client";


const BORROWED_PRODUCTS_QUERY = gql`
    query BorrowedProductsForUser($email: String!) {
        borrowedProductsForUser(email: $email) {
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


export default BORROWED_PRODUCTS_QUERY;