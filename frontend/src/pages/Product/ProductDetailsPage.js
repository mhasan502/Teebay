import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {Button, Container, Group, Modal, Paper, Space, Stack, Text, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {DatePickerInput} from "@mantine/dates";
import {IconCalendar} from "@tabler/icons-react";

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

const ProductDetailsPage = () => {
    const [product, setProduct] = useState([]);
    const [rentPeriod, setRentPeriod] = useState([]);
    const [openedBuyModal, {open: openBuyModal, close: closeBuyModal}] = useDisclosure(false);
    const [openedRentModal, {open: openRentModal, close: closeRentModal}] = useDisclosure(false);

    useQuery(GET_PRODUCT_QUERY, {
        variables: {
            id: parseInt(useParams().id)
        },
        onCompleted: (data) => {
            setProduct(data.product);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const reservedDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (day >= 5 && day <= 10 && month === 9 && year === 2023);
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
                        <Button color="blue.7" onClick={closeBuyModal}>Buy</Button>
                    </Group>
                </Paper>
            </Modal>



            <Modal opened={openedRentModal} onClose={closeRentModal} centered padding="lg" size="lg">
                <Paper position="right">
                    <Text size="xl" weight={500}>
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
                        excludeDate={reservedDate}
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
                        <Button color="blue.7" onClick={
                            () => console.log(rentPeriod)
                        }>Confirm Rent</Button>
                    </Group>
                </Paper>
            </Modal>

            <Container size="sm" px="xs" my={100}>
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

                    <Group position="right">
                        <Button color="violet.9" onClick={openRentModal}>
                            Rent
                        </Button>
                        <Button color="violet.9" onClick={openBuyModal}>
                            Buy
                        </Button>
                    </Group>
                </Paper>
            </Container>
        </>
    )
};

export default ProductDetailsPage;