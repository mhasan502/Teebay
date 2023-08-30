import React, {useState} from "react"
import {gql, useQuery} from "@apollo/client";
import Product from "../../components/Product/Product";
import Logout from "../../components/User/Logout";
import {
    Button,
    Center,
    Container,
    Group,
    Space,
    Title
} from "@mantine/core";
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

const MyProductPage = () => {
    const [products, setProducts] = useState([]);
    useQuery(LIST_OF_CREATED_PRODUCT_BY_USER_QUERY, {
        onCompleted: (data) => {
            setProducts(data.allProductCreatedByUser)
        }
    });

    return (
        <>
            <Logout/>
            <Container>
                <Center>
                    <Title>
                        MY PRODUCTS
                    </Title>
                </Center>
                <Space h="lg"/>

                {products.map((product, index) => (
                    <Product product={product} key={index}/>
                ))}

                <Space h="lg"/>

                <Group position="right">
                    <Link to="/create-product">
                        <Button color="violet">
                            Add Product
                        </Button>
                    </Link>
                </Group>

                <Space h="lg"/>
                <Space h="lg"/>
            </Container>
        </>
    )
};

export default MyProductPage;