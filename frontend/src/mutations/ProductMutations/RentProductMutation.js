import {gql} from "@apollo/client";


const RENT_PRODUCT_MUTATION = gql`
    mutation rentProduct($productId: String!, $customerEmail: String!, $dateFrom: String!, $dateTo: String!) {
        rentProduct(productId: $productId, customerEmail: $customerEmail, dateFrom: $dateFrom, dateTo: $dateTo) {
            message
        }
    } 
`;


export default RENT_PRODUCT_MUTATION;