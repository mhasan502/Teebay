import React from 'react';
import {TextInput, PasswordInput, Text, Paper, Group, Button, Stack} from '@mantine/core';
import {useForm} from "@mantine/form";
import {gql, useMutation} from "@apollo/client";


const SIGN_UP_MUTATION = gql`
    mutation SignUp($firstName: String!, $lastName: String!, $address: String!, $email: String!, $phone: String!, $password: String!) {
        signUp(data: {
            signInInput: {
                email: $email, 
                password: $password
            }
            firstName: $firstName, 
            lastName: $lastName, 
            address: $address, 
            phone: $phone, 
        })
        {
            token
            email
        }
    }
`;

const SignUpPage = () => {
    const [signUpMutation] = useMutation(SIGN_UP_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signUp.token);
            localStorage.setItem('email', data.signUp.email);
            window.location.href = ('/');
        },
        onError: (error) => {
            alert(error);
        }
    });
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },

        validate: {
            firstName: (value) => {
                if (value.length < 1) {
                    return 'First name is required';
                }
            },
            lastName: (value) => {
                if (value.length < 1) {
                    return 'Last name is required';
                }
            },
            address: (value) => {
                if (value.length < 1) {
                    return 'Address is required';
                }
            },
            email: (value) => {
                if (!value.includes('@')) {
                    return 'Invalid email';
                }
            },
            phone: (value) => {
                if (value.length < 11) {
                    return 'Invalid phone number';
                }
            },
            password: (value) => {
                if (value.length < 6) {
                    return 'Password should include at least 6 characters';
                }
            },
            confirmPassword: (value) => {
                if (value.length < 6) {
                    return 'Password should include at least 6 characters';
                }
                if (form.values.password !== value) {
                    return 'Password does not match';
                }
            },
        }
    });

    const handleSignUp = async () => {
        const {firstName, lastName, address, email, phone, password} = form.values;
        await signUpMutation({
            variables: {
                firstName,
                lastName,
                address,
                email,
                phone,
                password
            }
        });
    }
    return (
        <Paper radius="md" p="xl">
            <Text size="xl" weight={500}>
                SIGN UP
            </Text>

            <Stack>
                <Stack>
                    <TextInput
                        required
                        placeholder="First Name"
                        value={form.values.firstName}
                        onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                        error={form.errors.firstName && 'First name is required'}
                        radius="md"
                    />
                    <TextInput
                        required
                        placeholder="Last Name"
                        value={form.values.lastName}
                        onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                        error={form.errors.lastName && 'Last name is required'}
                        radius="md"
                    />

                    <TextInput
                        required
                        placeholder="Address"
                        value={form.values.address}
                        onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
                        error={form.errors.address && 'Address is required'}
                        radius="md"
                    />

                    <TextInput
                        required
                        placeholder="Email"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />
                    <TextInput
                        required
                        placeholder="Phone"
                        value={form.values.phone}
                        onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                        error={form.errors.phone && 'Invalid phone number'}
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
                    <PasswordInput
                        required
                        placeholder="Confirm Password"
                        value={form.values.confirmPassword}
                        onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                        error={form.errors.confirmPassword && 'Password does not match'}
                        radius="md"
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button type="submit" color="violet" onClick={handleSignUp}>
                        Sign In
                    </Button>
                </Group>
            </Stack>
            Already have an account? <a href="/sign-in">Login</a>
        </Paper>
    )
};

export default SignUpPage;