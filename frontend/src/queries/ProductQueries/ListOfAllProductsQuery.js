import {gql} from "@apollo/client";


const LIST_OF_ALL_PRODUCTS_QUERY = gql`
    query {
        allProducts {
            id
            title
            rentType
            rentPrice
            price
            description
            datePosted
            category {
                categoryName
            }
        }
    }
`;

export default LIST_OF_ALL_PRODUCTS_QUERY;