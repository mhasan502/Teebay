import {gql} from "@apollo/client";


const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProductMutation(
        $title: String!, 
        $description: String!, 
        $price: String!,
        $category: [String!],
        $rentType: String!,
        $rentPrice: String!,
        $userEmail: String!
    ) 
    {
        createProduct(
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


export default CREATE_PRODUCT_MUTATION;