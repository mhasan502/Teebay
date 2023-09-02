import {gql} from "@apollo/client";


const BUY_PRODUCT_MUTATION = gql`
    mutation buyProduct($productId: String!, $customerEmail: String!) {
        buyProduct(productId: $productId, customerEmail: $customerEmail) {
            message
        }
    }
`;


export default BUY_PRODUCT_MUTATION;