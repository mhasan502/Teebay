import React, {useEffect, useState} from "react"
import {useLazyQuery} from "@apollo/client";
import Logout from "../../components/User/Logout";
import {
    Anchor, Button,
    Center,
    Container, Divider,
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
    const [myProductPage, setMyProductPage] = useState(false);
    const [createdProducts, setCreatedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [listOfCreatedProductByUser] = useLazyQuery(LIST_OF_CREATED_PRODUCT_BY_USER_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: {email: localStorage.getItem('email')},
    });

    const [listOfAllProduct] = useLazyQuery(LIST_OF_ALL_PRODUCTS_QUERY, {
        fetchPolicy: 'cache-and-network',
    });

    const handlePageChange = () => {
        setMyProductPage(!myProductPage);
    };

    useEffect(() => {
        listOfCreatedProductByUser().then(r => setCreatedProducts(r.data.allProductCreatedByUser));
        listOfAllProduct().then(r => setAllProducts(r.data.allProducts));
    }, [listOfAllProduct, listOfCreatedProductByUser]);

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
                        <Title order={2}>
                            <Group>
                            {myProductPage ?
                                <>
                                    <Anchor onClick={handlePageChange}>
                                        All Products
                                    </Anchor>
                                    <Divider size="md" orientation="vertical"/>
                                    My Products
                                </>
                                :
                                <>
                                    All Products
                                    <Divider size="sm" orientation="vertical"/>
                                    <Anchor onClick={handlePageChange}>
                                        My Products
                                    </Anchor>
                                </>
                            }
                            </Group>
                        </Title>
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