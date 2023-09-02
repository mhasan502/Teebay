import {gql} from "@apollo/client";


const EDIT_PRODUCT_MUTATION = gql`
    mutation EditProductMutation(
        $id: String!, 
        $title: String!, 
        $description: String!, 
        $price: String!, 
        $category: [String!], 
        $rentType: String!, 
        $rentPrice: String!,
        $userEmail: String!
    )
    {
        editProduct(
            id: $id,
            data: {
                title: $title,
                description: $description,
                price: $price,
                category: $category,
                rentType: $rentType,
                rentPrice: $rentPrice,
                userEmail: $userEmail
            }
        )
        {
            message
        }
    }
`;


export default EDIT_PRODUCT_MUTATION;