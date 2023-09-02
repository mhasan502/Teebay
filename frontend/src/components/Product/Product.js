import React from "react";
import {
    Button,
    Group,
    Modal,
    Text,
    Paper,
    Space,
    Title,
    Container,
    Stack, Spoiler
} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks";
import {useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import OwnerAction from "./OwnerAction";
import DELETE_PRODUCT_MUTATION from "../../mutations/ProductMutations/DeleteProductMutation";


const Product = ({product, owner = false}) => {
    const navigate = useNavigate();
    const [openedDeleteModal, {open: openDeleteModal, close: closeDeleteModal}] = useDisclosure(false);

    const [deleteProductMutation] = useMutation(DELETE_PRODUCT_MUTATION, {
        onCompleted: (data) => {
            alert(data.deleteProduct.message);
            navigate(0);
        },
        onError: (error) => {
            alert(error);
        }
    });

    const handleDelete = async () => {
        await deleteProductMutation({
            variables: {
                id: product.id,
            }
        });
    };

    return (
        <Container>
            <Paper p="xl" shadow="md" withBorder>
                <Modal opened={openedDeleteModal} onClose={closeDeleteModal} centered padding="lg">
                    <Paper position="right" p={10}>
                        <Text size="xl" weight="500">
                            Are you sure you want to delete this product?
                        </Text>
                        <Space h="xl"/>
                        <Space h="xl"/>
                        <Group position="right">
                            <Button onClick={closeDeleteModal} color="blue.7">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} color="red.9">
                                Delete
                            </Button>
                        </Group>
                    </Paper>
                </Modal>

                <Stack spacing="xs">
                    <Group position="apart">
                        <Title order={3}>
                            {product.title}
                        </Title>
                        {owner ? (<OwnerAction product={product} deleteConfirm={openDeleteModal}/>) : null}
                    </Group>


                    <Text size="xs" c="dimmed">Categories: {" "}
                        {product.category.map((category, index) => (
                            (index ? ', ' : '') + category.categoryName
                        ))}
                    </Text>

                    <Text size="xs" c="dimmed">
                        Price: ${product.price} | Rent: ${product.rentPrice} {product.rentType.toLowerCase()}
                    </Text>

                    <Spoiler maxHeight={80} showLabel="... More details" hideLabel="Hide">
                        <Text>
                            {product.description}
                        </Text>
                    </Spoiler>

                    <Text size="xs" c="dimmed"> Date Posted: {""}
                        {new Date(product.datePosted).toLocaleDateString("en-UK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                    </Text>
                </Stack>
            </Paper>
            <Space h="md"/>
        </Container>
    )
};


export default Product;