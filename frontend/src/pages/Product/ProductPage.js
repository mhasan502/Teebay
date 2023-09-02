import React, {useEffect, useState} from "react"
import {useQuery} from "@apollo/client";
import Logout from "../../components/User/Logout";
import {
    Anchor, Button,
    Center,
    Container,
    Group,
    Space,
    Title
} from "@mantine/core";
import MyProductPage from "./ProductPage/MyProductPage";
import AllProductPage from "./ProductPage/AllProductPage";
import {Link} from "react-router-dom";
import LIST_OF_ALL_PRODUCTS_QUERY from "../../queries/ProductQueries/ListOfAllProductsQuery";
import LIST_OF_CREATED_PRODUCT_BY_USER_QUERY from "../../queries/ProductQueries/ListOfCreatedProductByUserQuery";


const ProductPage = () => {
    const [myProductPage, setMyProductPage] = useState(true);
    const [createdProducts, setCreatedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useQuery(LIST_OF_CREATED_PRODUCT_BY_USER_QUERY, {
        onCompleted: (data) => {
            setCreatedProducts(data.allProductCreatedByUser)
        }
    });

    useQuery(LIST_OF_ALL_PRODUCTS_QUERY, {
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
            <Group position="right" mt={10} mr={15}>
                <Link to={"/history"}>
                    <Button>
                        History
                    </Button>
                </Link>
                <Logout/>
            </Group>
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