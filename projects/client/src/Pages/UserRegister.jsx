import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
    Image,
    Text, HStack, Box, Center, Card, CardBody, InputGroup, InputRightElement, FormErrorMessage
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userRegisterBanner from "../assets/user-register-banner.jpg";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as yup from "yup";
import Loading from "../Components/Loading";


export default function UserRegister() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const onBtnRegister = async () => {
        try {
            setLoading(true);
            await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
            let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, {
                name: formik.values.name,
                phone: formik.values.phone,
                email: formik.values.email,
                password: formik.values.password,
                confirmationPassword: formik.values.passwordConfirmation
            }
            );
            toast({
                title: response.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate("/", { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnRegister : ", error);
            if (error.response && !error.response.data.message) {
                toast({
                    title: "Register failed",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: error.response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: "",
            passwordConfirmation: ""
        },
        onSubmit: onBtnRegister,
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .required("Name is a required field")
                .matches(
                    /^[a-zA-Z ]+$/,
                    "Name must only contain letters and spaces"
                ),
            phone: yup
                .string()
                .required("Phone is a required field")
                .matches(
                    /^\+?[0-9]{8,14}$/,
                    "Please enter a valid phone number"
                ),
            email: yup
                .string()
                .required("Email is a required field")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Please enter a valid email address"
                ),
            password: yup
                .string()
                .required("Password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
            passwordConfirmation: yup
                .string()
                .required("Confirmation password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .oneOf([yup.ref("password"), null], "Passwords must match"),
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const signInWithGoogle = () => {
        window.open(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, "_self", "toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto")
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1700);
    }, []);

    if (loadingPage) {
        return <Loading />
    } else {
        return (
            <Stack minH={{ lg: "100vh" }}
                direction={{ base: "column", md: "column", lg: "row" }}
            >
                <Flex
                    p={{ base: "8", sm: "0" }}
                    flex={1}
                    align={"center"} justify={"center"}
                >
                    <Stack spacing={0} w={"full"} maxW={{ base: "sm" }}>
                        <Heading fontSize={"3xl"} fontWeight="semibold"
                            my="8"
                        >Register to tempatku</Heading>
                        <Stack spacing={8}>
                            <HStack>
                                <Box>
                                    {/* NAME */}
                                    <FormControl id="name" isInvalid={formik.errors.name}>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text"
                                            onChange={handleForm}
                                            name="name"
                                        />
                                        <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.name}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    {/* PHONE */}
                                    <FormControl id="phone" isInvalid={formik.errors.phone}>
                                        <FormLabel>Phone number</FormLabel>
                                        <Input type="text"
                                            onChange={handleForm}
                                            name="phone"
                                        />
                                        <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.phone}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            {/* EMAIL */}
                            <FormControl id="email" isInvalid={formik.errors.email}>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"
                                    onChange={handleForm}
                                    name="email"
                                />
                                <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.email}</FormErrorMessage>
                            </FormControl>
                            {/* PASSWORD */}
                            <FormControl id="password" isInvalid={formik.errors.password}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    {/* Input Password */}
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        onChange={handleForm}
                                        name="password"
                                    />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            _hover={"none"}
                                            _active={"none"}
                                            onClick={() =>
                                                setShowPassword(
                                                    (showPassword) => !showPassword
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.password}</FormErrorMessage>
                            </FormControl>
                            <FormControl id="confirmation_password" isInvalid={formik.errors.passwordConfirmation}>
                                <FormLabel>Confirmation Password</FormLabel>
                                <InputGroup>
                                    {/* Input Password Confirmation*/}
                                    <Input
                                        type={showPasswordConfirmation ? "text" : "password"}
                                        onChange={handleForm}
                                        name="passwordConfirmation"
                                    />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            _hover={"none"}
                                            _active={"none"}
                                            onClick={() =>
                                                setShowPasswordConfirmation(
                                                    (showPasswordConfirmation) =>
                                                        !showPasswordConfirmation
                                                )
                                            }
                                        >
                                            {showPasswordConfirmation ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.passwordConfirmation}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack
                            pt="10"
                        >
                            <Button bg={"#D3212D"} color={"white"} variant={"solid"}
                                _hover={{
                                    bg: "#D3212D",
                                }}
                                onClick={onBtnRegister}
                                isLoading={loading}
                            >
                                Register
                            </Button>

                            {/* Google */}
                            <Button
                                onClick={signInWithGoogle}
                                w={"full"} variant={"outline"} leftIcon={<FcGoogle />} borderColor="#d0d7de" _hover={"none"}>
                                <Center>
                                    <Text>Continue with Google</Text>
                                </Center>
                            </Button>
                            {/* Login */}
                        </Stack>
                        <Stack
                            pb="6"
                            px="10"
                        >
                            <Card variant="none" borderColor="#d0d7de" mt="2">
                                <CardBody>
                                    <Center>
                                        <HStack fontSize="sm"
                                        >
                                            <Text>Have an account?</Text>
                                            <Text onClick={() => {
                                                navigate("/");
                                            }} color="#0969da"
                                                cursor={"pointer"}
                                            >
                                                Login.
                                            </Text>
                                        </HStack>
                                    </Center>
                                </CardBody>
                            </Card>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex
                    flex={1}
                    display={{ base: "flex", sm: "flex" }}
                >
                    <Image
                        alt={"User Register Page Image"}
                        objectFit={"cover"}
                        src={userRegisterBanner}
                    />
                </Flex>
            </Stack>
        );
    }
}
