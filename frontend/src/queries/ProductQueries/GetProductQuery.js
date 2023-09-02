import {gql} from "@apollo/client";


const GET_PRODUCT_QUERY = gql`
    query product($id: Int!) {
        product(id: $id) {
            id
            title
            description
            price
            rentPrice
            rentType
            category {
              id
              categoryName
            }
        }
    }
`;


export default GET_PRODUCT_QUERY;