import React from "react";
import {TextInput, PasswordInput, Text, Paper, Group, Button, Stack} from '@mantine/core';
import {useForm} from "@mantine/form";

const LoginPage = () => {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate:{
            email: (value) => {
                if (!value.includes('@')) {
                    return 'Invalid email';
                }
            },
            password: (value) => {
                if (value.length < 6) {
                    return 'Password should include at least 6 characters';
                }
            },
        }
    });

    const handleLogin = () => {
    };

    return (
        <Paper radius="md" p="xl">
            <Text size="xl" weight={500}>
                SIGN IN
            </Text>

            <form onSubmit={handleLogin}>
                <Stack>
                    <TextInput
                        required
                        placeholder="Email"
                        value="mhasan502@gmail.com"//{form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        placeholder="Password"
                        value="asdbkbas"//{form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button type="submit" color="violet">
                        Login
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};

export default LoginPage;