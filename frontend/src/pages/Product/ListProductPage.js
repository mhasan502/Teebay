import React, {useState} from 'react'
import {gql, useQuery} from "@apollo/client";
import Product from "../../components/Product/Product";
import Logout from "../../components/User/Logout";
import {Button, Text} from "@mantine/core";
import {Link} from "react-router-dom";

const LIST_OF_CREATED_PRODUCT_BY_USER_QUERY = gql`
    query {
        allProductCreatedByUser(email: "mhasan502@gmail.com") {
            id
            title
            description
            price
            rentType
            rentPrice
            datePosted
            category {
                id
            }
        }
    }
`

const ListProductPage = () => {
    const [products, setProducts] = useState([]);
    useQuery(LIST_OF_CREATED_PRODUCT_BY_USER_QUERY, {
        onCompleted: (data) => {
            setProducts(data.allProductCreatedByUser)
        }
    });

    return (
        <div>
            <Logout/>
            <Text size="xl" weight={500} ta="center">
                ALL PRODUCTS
            </Text>
            {products.map((product, index) => (
                <Product product={product} key={index}/>
            ))}

            <Link to="/create-product">
                <Button color="violet">
                    Add Product
                </Button>
            </Link>

        </div>
    )
};

export default ListProductPage;