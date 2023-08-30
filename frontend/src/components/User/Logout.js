import React from "react";
import {
    Button,
    Group,
    Modal,
    Paper,
    Space,
    Text
} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";


const Logout = () => {
    const [opened, {open, close}] = useDisclosure(false);

    // Clearing token & email to log out user
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.reload();
    }

    return (
        <>
            <Modal opened={opened} onClose={close} centered>
                <Paper position="right" p={10}>
                    <Text size="xl" weight="500">
                        Are you sure you want to log out?
                    </Text>
                    <Space h="lg"/>
                    <Space h="lg"/>
                    <Group position="right">
                        <Button onClick={close} color="blue.7">
                            Cancel
                        </Button>
                        <Button onClick={handleLogout} color="red.9">
                            Confirm
                        </Button>
                    </Group>
                </Paper>
            </Modal>

            <Group position="right" mt={10} mr={15}>
                <Button color="pink.9" onClick={open}>
                    LOGOUT
                </Button>
            </Group>
        </>
    )
};

export default Logout;