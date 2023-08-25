import React from 'react';
import {Button, Group, Modal, Paper, Space, Text} from "@mantine/core";
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
        <div>
            <Modal opened={opened} onClose={close} centered size="xs">
                <Paper position="right">
                    <Text size="xl" weight="500">Are you sure to Logout</Text>
                    <Space h="lg"/>
                    <Group position="right">
                        <Button onClick={close} color="pink">Cancel</Button>
                        <Button onClick={handleLogout} color="violet">Confirm</Button>
                    </Group>
                </Paper>
            </Modal>
            <Group position="right">
                <Button color="pink" onClick={open}>LOGOUT</Button>
            </Group>
        </div>
    )
};

export default Logout;