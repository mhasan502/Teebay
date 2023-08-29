import React from "react";
import {Button, Group, Modal, Text, Paper, Space, Box} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks";
import {gql, useMutation} from "@apollo/client";
import {Link, useNavigate} from "react-router-dom";


const DELETE_PRODUCT_QUERY = gql`
    mutation deleteProductMutation($id: String!) {
        deleteProduct(id: $id) {
            message
        }
    }
`;

const Product = ({product}) => {
    const navigate = useNavigate();
    const [openedDeleteModal, {open, close}] = useDisclosure(false);

    const [deleteProductMutation] = useMutation(DELETE_PRODUCT_QUERY, {
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
        <Box>
            <Paper p="xl" shadow="md">
                <Modal opened={openedDeleteModal} onClose={close} centered padding="lg">
                    <Paper position="right">
                        <Text size="xl" weight="500">Are you sure you want to delete this product?</Text>
                        <Space h="md"/>
                        <Group position="right">
                            <Button onClick={close} color="pink">Cancel</Button>
                            <Button onClick={handleDelete} color="violet">Delete</Button>
                        </Group>
                    </Paper>
                </Modal>

                <Group position="apart">
                    <Text size="xl">{product.title}</Text>
                    <Group position="right">
                        <Link to="/edit-product" state={{product: product}}>
                            <Button color="red">
                                Edit
                            </Button>
                        </Link>
                        <Button onClick={open}>Delete</Button>
                    </Group>
                </Group>

                <Text size="xs">Categories: {" "}
                    {product.category.map((category, index) => (
                        (index ? ', ' : '') + category.categoryName
                    ))}
                </Text>

                <Text size="xs">
                    Price: ${product.price} | Rent: ${product.rentPrice} {product.rentType.toLowerCase()}
                </Text>

                <Text>{product.description}</Text>

                <Text size="xs"> Date Posted: {""}
                    {new Date(product.datePosted).toLocaleDateString("en-UK", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </Text>
            </Paper>
            <Space h="md"/>
        </Box>
    )
};

export default Product;