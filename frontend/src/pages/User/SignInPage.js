import React from "react";
import {TextInput, PasswordInput, Text, Paper, Group, Button, Stack} from '@mantine/core';
import {useForm} from "@mantine/form";
import {gql, useMutation} from "@apollo/client";


const SIGN_IN_MUTATION = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(data: {
            email: $email, 
            password: $password
        }) 
        {
            token
            email
        }
    }
`;

const SignInPage = () => {
    const [signInMutation] = useMutation(SIGN_IN_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn.token);
            localStorage.setItem('email', data.signIn.email);
            window.location.href = ('/');
        },
        onError: (error) => {
            alert(error);
        }
    });
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
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
        await signInMutation({
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

            <Stack>
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
                    <Button type="submit" color="violet" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Group>
            </Stack>
            Don't have an Account? <a href="/sign-up">Sign Up</a>
        </Paper>
    )
};

export default SignInPage;