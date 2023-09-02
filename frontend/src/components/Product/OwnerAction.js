import React from "react";
import {
    ActionIcon,
    Group,
    Tooltip
} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconEdit, IconTrash} from "@tabler/icons-react";


const OwnerAction = ({product, deleteConfirm}) => {
    return (
        <>
            <Group position="right">
                <Link to={"/edit-product/" + product.id}>
                    <Tooltip label="Edit" position="bottom" withArrow>
                        <ActionIcon size="lg" color="blue.7" variant="filled" radius="md">
                            <IconEdit size="1.625rem"/>
                        </ActionIcon>
                    </Tooltip>
                </Link>
                <Tooltip label="Delete" position="bottom" withArrow>
                    <ActionIcon size="lg" color="red.9" variant="filled" radius="md" onClick={deleteConfirm}>
                        <IconTrash size="1.625rem"/>
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    );
};


export default OwnerAction;