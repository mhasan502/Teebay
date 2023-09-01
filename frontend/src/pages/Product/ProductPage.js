import React, {useEffect, useState} from "react"
import {gql, useQuery} from "@apollo/client";
import Logout from "../../components/User/Logout";
import {
    Anchor,
    Center,
    Container,
    Group,
    Space,
    Title
} from "@mantine/core";
import MyProductPage from "./ProductPage/MyProductPage";
import AllProductPage from "./ProductPage/AllProductPage";

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
                categoryName
            }
        }
    }
`;

const LIST_OF_ALL_PRODUCTS = gql`
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

const ProductPage = () => {
    const [myProductPage, setMyProductPage] = useState(false);

    const [createdProducts, setCreatedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useQuery(LIST_OF_CREATED_PRODUCT_BY_USER_QUERY, {
        onCompleted: (data) => {
            setCreatedProducts(data.allProductCreatedByUser)
        }
    });

    useQuery(LIST_OF_ALL_PRODUCTS, {
        onCompleted: (data) => {
            setAllProducts(data.allProducts)
        }
    });

    const handlePageChange = () => {
        setMyProductPage(!myProductPage);
    };

    useEffect(() => {
        if (myProductPage) {
            setCreatedProducts(createdProducts);
        } else {
            setAllProducts(allProducts);
        }
    }, [myProductPage, allProducts, createdProducts]);

    return (
        <>
            <Logout/>
            <Container>
                <Center>
                    <Group>
                        <Title>
                            <Anchor onClick={handlePageChange}>
                                {myProductPage ? "MY PRODUCTS" : "ALL PRODUCTS"}
                            </Anchor>
                        </Title>
                    </Group>
                </Center>

                <Space h="lg"/>

                {myProductPage ? <MyProductPage products={createdProducts}/> : <AllProductPage products={allProducts}/>}

                <Space h="lg"/>
                <Space h="lg"/>
            </Container>
        </>
    )
};

export default ProductPage;