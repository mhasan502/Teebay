import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {ActionIcon, Button, Container, Group, Modal, Paper, Space, Stack, Text, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {DatePickerInput} from "@mantine/dates";
import {IconCalendar, IconX} from "@tabler/icons-react";
import GET_PRODUCT_QUERY from "../../queries/ProductQueries/GetProductQuery";
import BUY_PRODUCT_MUTATION from "../../mutations/ProductMutations/BuyProductMutation";
import RENT_PRODUCT_MUTATION from "../../mutations/ProductMutations/RentProductMutation";


const ProductDetailsPage = () => {
    const navigate = useNavigate();
    const [sellerEmail, setSellerEmail] = useState('');
    const [product, setProduct] = useState([]);
    const [rentPeriod, setRentPeriod] = useState([]);
    const [openedBuyModal, {open: openBuyModal, close: closeBuyModal}] = useDisclosure(false);
    const [openedRentModal, {open: openRentModal, close: closeRentModal}] = useDisclosure(false);

    const product_id = parseInt(useParams().id);
    const getProductQuery = useQuery(GET_PRODUCT_QUERY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: product_id
        },
        onCompleted: (data) => {
            setProduct(data.product);
            setSellerEmail(data.product.owner.email);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const [buyProductMutation] = useMutation(BUY_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data.buyProduct.message);
            closeBuyModal();
        },
        onError: (error) => {
            alert(error);
        }
    });

    const [rentProductMutation] = useMutation(RENT_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data.rentProduct.message);
            closeRentModal();
        },
        onError: (error) => {
            alert(error);
        }
    });

    useEffect(() => {
        if (getProductQuery.data) {
            setProduct(getProductQuery.data);
        }
    }, [getProductQuery.data]);

    const handleBuy = async () => {
        await buyProductMutation({
            variables: {
                productId: product_id.toString(),
                customerEmail: localStorage.getItem('email')
            }
        });
    };

    const handleRent = async () => {
        await rentProductMutation({
            variables: {
                productId: product_id.toString(),
                customerEmail: localStorage.getItem('email'),
                dateFrom: rentPeriod[0].toLocaleDateString('en-CA'),
                dateTo: rentPeriod[1].toLocaleDateString('en-CA')
            }
        });
    };


    return (
        <>
            <Modal opened={openedBuyModal} onClose={closeBuyModal} centered padding="lg">
                <Paper position="right" p={10}>
                    <Text size="xl" weight={500}>
                        Are you sure you want to buy this product?
                    </Text>
                    <Space h="xl"/>
                    <Space h="xl"/>
                    <Group position="right">
                        <Button color="red.9" onClick={closeBuyModal}>Cancel</Button>
                        <Button color="blue.7" onClick={handleBuy}>Buy</Button>
                    </Group>
                </Paper>
            </Modal>


            <Modal opened={openedRentModal} onClose={closeRentModal} centered padding="lg" size="lg">
                <Paper position="right">
                    <Text size="xl" weight={500} ta="center">
                        Rental Period
                    </Text>
                    <Space h="xl"/>

                    <DatePickerInput
                        required
                        size="sm"
                        placeholder="Enter rental period"
                        // value={new Date()}
                        onChange={(event) => setRentPeriod(event)}
                        variant="filled"
                        radius="md"
                        label="Enter rental period"
                        icon={<IconCalendar size="1.2rem"/>}
                        locale="UTC+6"
                        valueFormat="YYYY-MM-DD"
                        allowSingleDateInRange
                        dropdownType="modal"
                        type="range"
                        mx="auto"
                        maw={400}
                        withAsterisk
                        clearable
                    />

                    <Space h="xl"/>
                    <Space h="xl"/>
                    <Group position="right">
                        <Button color="red.9" onClick={closeRentModal}>Go Back</Button>
                        <Button color="blue.7" onClick={handleRent}>
                            Confirm Rent
                        </Button>
                    </Group>
                </Paper>
            </Modal>

            <Container size="sm" px="xs" my={100}>
                <Group position="right">
                    <ActionIcon size="lg" variant="filled" color="red.9" onClick={() => navigate(-1)}>
                        <IconX/>
                    </ActionIcon>
                </Group>
                <Space h="lg"/>
                <Paper p="xl" shadow="xs" withBorder>
                    <Stack>
                        <Title order={1}>
                            {product.title}
                        </Title>
                        <Text c="dimmed">Categories: {" "}
                            {product.category && product.category.map((category, index) => (
                                (index ? ', ' : '') + category.categoryName
                            ))}
                        </Text>
                        <Text c="dimmed">
                            Price: ${product.price} | Rent: ${product.rentPrice} {product.rentType}
                        </Text>
                        <Text>
                            {product.description}
                        </Text>
                    </Stack>

                    <Space h="lg"/>
                    <Space h="lg"/>
                    <Space h="lg"/>
                    <Space h="lg"/>

                    {(sellerEmail !== localStorage.getItem('email') ?
                        (<Group position="right">
                            <Button color="violet.9" onClick={openRentModal}>
                                Rent
                            </Button>
                            <Button color="violet.9" onClick={openBuyModal}>
                                Buy
                            </Button>
                        </Group>)
                        : null
                    )}

                </Paper>
            </Container>
        </>
    )
};


export default ProductDetailsPage;