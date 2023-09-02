import React from "react";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Stack,
    Container,
    Title,
    Center,
    Space
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation} from "@apollo/client";
import {Link} from "react-router-dom";
import SIGN_UP_MUTATION from "../../mutations/UserMutations/SignUpMutation";


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
            firstName: (value) => ((value.length < 1) ? 'First name is required' : null),
            lastName: (value) => ((value.length < 1) ? 'Last name is required' : null),
            address: (value) => ((value.length < 1) ? 'Address is required' : null),
            email: (value) => ((!value.includes('@')) ? 'Invalid email' : null),
            phone: (value) => ((value.length < 11) ? 'Invalid phone number' : null),
            password: (value) => ((value.length < 6) ? 'Password should include at least 6 characters' : null),
            confirmPassword: (value) => ((value.length >= 6 && form.values.password === value) ? null : 'Password does not match'),
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
        <Container size="xs" px="xs" my={100}>
            <Stack>
                <Center>
                    <Title>
                        SIGN UP
                    </Title>
                </Center>
                <Paper radius="md" p="xl" shadow="md" withBorder>
                    <Stack>
                        <Space h="md"/>
                        <Stack>
                            <Group grow>
                                <TextInput
                                    required
                                    size="md"
                                    placeholder="First Name"
                                    value={form.values.firstName}
                                    onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                    error={form.errors.firstName && 'First name is required'}
                                    radius="md"
                                />
                                <TextInput
                                    required
                                    size="md"
                                    placeholder="Last Name"
                                    value={form.values.lastName}
                                    onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                                    error={form.errors.lastName && 'Last name is required'}
                                    radius="md"
                                />
                            </Group>

                            <TextInput
                                required
                                size="md"
                                placeholder="Address"
                                value={form.values.address}
                                onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
                                error={form.errors.address && 'Address is required'}
                                radius="md"
                            />
                            <Group grow>
                                <TextInput
                                    required
                                    size="md"
                                    placeholder="Email"
                                    value={form.values.email}
                                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                    error={form.errors.email && 'Invalid email'}
                                    radius="md"
                                />
                                <TextInput
                                    required
                                    size="md"
                                    placeholder="Phone"
                                    value={form.values.phone}
                                    onChange={(event) => form.setFieldValue('phone', event.currentTarget.value)}
                                    error={form.errors.phone && 'Invalid phone number'}
                                    radius="md"
                                />
                            </Group>

                            <PasswordInput
                                required
                                size="md"
                                placeholder="Password"
                                value={form.values.password}
                                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                error={form.errors.password && 'Password should include at least 6 characters'}
                                radius="md"
                            />
                            <PasswordInput
                                required
                                size="md"
                                placeholder="Confirm Password"
                                value={form.values.confirmPassword}
                                onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
                                error={form.errors.confirmPassword && 'Password does not match'}
                                radius="md"
                            />
                        </Stack>

                        <Center>
                            <Group position="apart" mt="xl">
                                <Button type="submit" color="violet.9" onClick={handleSignUp}>
                                    REGISTER
                                </Button>
                            </Group>
                        </Center>

                        <Group position="center" spacing="xs">
                            <Text ta="center">
                                Already have an account?
                            </Text>
                            <Link to={"/sign-in"}>
                                <Text color="blue" weight={500}>
                                    Sign In
                                </Text>
                            </Link>
                        </Group>

                    </Stack>
                </Paper>
            </Stack>
        </Container>
    )
};


export default SignUpPage;