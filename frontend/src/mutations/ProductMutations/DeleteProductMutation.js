import {gql} from "@apollo/client";


const DELETE_PRODUCT_MUTATION = gql`
    mutation deleteProductMutation($id: String!) {
        deleteProduct(id: $id) {
            message
        }
    }
`;


export default DELETE_PRODUCT_MUTATION;