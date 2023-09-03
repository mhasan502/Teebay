import {gql} from "@apollo/client";


const LIST_OF_CREATED_PRODUCT_BY_USER_QUERY = gql`
    query AllProductCreatedByUser($email: String!) {
        allProductCreatedByUser(email: $email) {
            id
            title
            description
            price
            rentType
            rentPrice
            datePosted
            category {
                categoryName
            }
        }
    }
`;

export default LIST_OF_CREATED_PRODUCT_BY_USER_QUERY;