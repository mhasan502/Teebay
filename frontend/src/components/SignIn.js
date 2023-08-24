import React from "react";
import {TextInput, PasswordInput, Text, Paper, Group, Button, Stack} from '@mantine/core';
import {useForm} from "@mantine/form";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";


const SIGNIN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(data: {email: $email, password: $password}) {
            token
        }
    }
`;

const SignInPage = () => {
    const navigate = useNavigate();
    const [signin_mutation, {loading, error, token}] = useMutation(SIGNIN_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn.token);
            // redirect to root page
            window.location.href = '/';
        }
    });
    const form = useForm({
        initialValues: {
            email: 'mhasan502@gmail.com',
            password: 'fbxnjhbvdx3324',
        },

        validate: {
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

    const handleSignIn = async () => {
        const {email, password} = form.values;
        await signin_mutation({
            variables: {
                email: email,
                password: password,
            }
        });
    }

    return (
        <Paper radius="md" p="xl">
            <Text size="xl" weight={500}>
                SIGN IN
            </Text>

            <form onSubmit={handleSignIn}>
                <Stack>
                    <TextInput
                        required
                        placeholder="Email"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        placeholder="Password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button type="submit" color="violet">
                        Sign In
                    </Button>
                </Group>
            </form>
        </Paper>
    );
};

export default SignInPage;