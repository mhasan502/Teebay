import React from "react";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Stack,
    Center,
    Container,
    Space,
    Title
} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useMutation} from "@apollo/client";
import {Link} from "react-router-dom";
import SIGN_IN_MUTATION from "../../mutations/UserMutations/SignInMutation";


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
            email: (value) => (!value.includes('@') ? 'Invalid email' : null),
            password: (value) => ((value.length < 6) ? 'Password should include at least 6 characters' : null),
        },
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
        <Container size="xs" px="xs" my={100}>
            <Stack>
                <Center>
                    <Title>
                        SIGN IN
                    </Title>
                </Center>
                <Paper radius="md" p="xl" shadow="md" withBorder>
                    <form onSubmit={form.onSubmit(values => handleSignIn())}>
                        <Stack>
                            <Space h="md"/>
                            <Stack>
                                <TextInput
                                    required
                                    size="md"
                                    placeholder="Email"
                                    value={form.values.email}
                                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                                    error={form.errors.email && 'Invalid email'}
                                    radius="md"
                                />
                                <PasswordInput
                                    required
                                    size="md"
                                    placeholder="Password"
                                    value={form.values.password}
                                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                                    error={form.errors.password && 'Password should include at least 6 characters'}
                                    radius="md"
                                />
                            </Stack>

                            <Center>
                                <Group position="apart" mt="xl">
                                    <Button type="submit" color="violet.9">
                                        LOGIN
                                    </Button>
                                </Group>
                            </Center>

                            <Group position="center" spacing="xs">
                                <Text ta="center">
                                    Don't have an account?
                                </Text>
                                <Link to="/sign-up">
                                    <Text color="blue.7" weight={500}>
                                        Sign Up
                                    </Text>
                                </Link>
                            </Group>
                        </Stack>
                    </form>
                </Paper>
            </Stack>

        </Container>
    )
};

export default SignInPage;