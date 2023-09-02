import React, {useState} from "react";
import {ActionIcon, Container, Group, Paper, Space, Tabs} from "@mantine/core";
import Product from "../../components/Product/Product";
import {useQuery} from "@apollo/client";
import BOUGHT_PRODUCTS_QUERY from "../../queries/ProductQueries/BoughtProductsQuery";
import SOLD_PRODUCTS_QUERY from "../../queries/ProductQueries/SoldProductsQuery";
import BORROWED_PRODUCTS_QUERY from "../../queries/ProductQueries/BorrowedProductsQuery";
import LENT_PRODUCTS_QUERY from "../../queries/ProductQueries/LentProductQuery";
import {IconX} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";


const HistoryPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bought');
    const [boughtProducts, setBoughtProducts] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);
    const [borrowedProducts, setBorrowedProducts] = useState([]);
    const [lentProducts, setLentProducts] = useState([]);

    useQuery(BOUGHT_PRODUCTS_QUERY, {
        variables: {email: localStorage.getItem('email')},
        onCompleted: (data) => {
            setBoughtProducts(data.boughtProductsForUser);
        }
    });

    useQuery(SOLD_PRODUCTS_QUERY, {
        variables: {email: localStorage.getItem('email')},
        onCompleted: (data) => {
            setSoldProducts(data.soldProductsForUser);
        }
    });

    useQuery(BORROWED_PRODUCTS_QUERY, {
        variables: {email: localStorage.getItem('email')},
        onCompleted: (data) => {
            setBorrowedProducts(data.borrowedProductsForUser);
        }
    });

    useQuery(LENT_PRODUCTS_QUERY, {
        variables: {email: localStorage.getItem('email')},
        onCompleted: (data) => {
            setLentProducts(data.lentProductsForUser);
        }
    });

    return (
        <Container size="sm" px="xs" my={80}>
            <Group position="right">
                <ActionIcon size="lg" variant="filled" onClick={() => navigate(-1)}>
                    <IconX/>
                </ActionIcon>
            </Group>
            <Space h="lg"/>
            <Paper shadow="xs">
                <Tabs value={activeTab} onTabChange={setActiveTab} color="violet">
                    <Tabs.List grow>
                        <Tabs.Tab value="bought">Bought</Tabs.Tab>
                        <Tabs.Tab value="sold">Sold</Tabs.Tab>
                        <Tabs.Tab value="borrowed">Borrowed</Tabs.Tab>
                        <Tabs.Tab value="lent">Lent</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="bought" pt="xs">
                        {boughtProducts.map((product, index) => (
                            <Product key={index} product={product}/>
                        ))}
                    </Tabs.Panel>

                    <Tabs.Panel value="sold" pt="xs">
                        {soldProducts.map((product, index) => (
                            <Product key={index} product={product}/>
                        ))}
                    </Tabs.Panel>

                    <Tabs.Panel value="borrowed" pt="xs">
                        {borrowedProducts.map((product, index) => (
                            <Product key={index} product={product}/>
                        ))}
                    </Tabs.Panel>

                    <Tabs.Panel value="lent" pt="xs">
                        {lentProducts.map((product, index) => (
                            <Product key={index} product={product}/>
                        ))}
                    </Tabs.Panel>
                </Tabs>
            </Paper>
        </Container>
    )
}


export default HistoryPage;