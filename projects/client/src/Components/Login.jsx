import {
    Flex,
    Box,
    FormControl,
    Divider,
    Image,
    Icon,
    Card,
    CardBody,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    Center,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useToast,
    FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { TbHomeHeart } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAction } from "../reducers/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import Logo from "../assets/logotempatku.png";

export default function Login(props) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const onBtnLogin = async () => {
        try {
            setLoading(true);
            await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
            let response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/user/auth`,
                {
                    email: formik.values.emailOrPhone,
                    phone: formik.values.emailOrPhone,
                    password: formik.values.password,
                }
            );
            toast({
                title: "Login success",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            //simpen ke LOCALSTORAGE browser u/ KEEPLOGIN
            localStorage.setItem("tempatku_login", response.data.token);
            //simpen response.data ke reducer
            dispatch(loginAction(response.data));
            if (response.data.role == "User") {
                navigate("/", { replace: true });
            } else if (response.data.role == "Tenant") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log("ini error dari onBtnLogin : ", error);
            if (error.response && !error.response.data.message) {
                toast({
                    title: "Login failed",
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
    };

    const formik = useFormik({
        initialValues: {
            emailOrPhone: "",
            password: "",
        },
        onSubmit: onBtnLogin,
        validationSchema: yup.object().shape({
            emailOrPhone: yup
                .string()
                .required("Please enter a valid email address or phone number")
                .test(
                    "valid-email-or-phone",
                    "Please enter a valid email address or phone number",
                    function (value) {
                        const emailRegex =
                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        const phoneRegex = /^\+?[0-9]{8,14}$/;
                        return emailRegex.test(value) || phoneRegex.test(value);
                    }
                ),
            password: yup
                .string()
                .required("Password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
        }),
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const signInWithGoogle = () => {
        window.open(
            `${process.env.REACT_APP_API_BASE_URL}/auth/google`,
            "_self",
            "toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto"
        );
    };

    //Focus on specific element 
    React.useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Tab") {
            event.preventDefault();
      
            if (event.shiftKey) {
              props.initialRef.current.focus(); // Move focus to the email input
            } else {
              if (document.activeElement === props.finalRef.current) {
                // If the currently focused element is the "Continue with Google" button
                props.initialRef.current.focus(); // Move focus back to the email input
              } else {
                event.stopPropagation();
                event.preventDefault();
                const formElements = document.getElementsByTagName("input");
                const formElementsArray = Array.from(formElements);
                const currentIndex = formElementsArray.indexOf(document.activeElement);
                const nextIndex = (currentIndex + 1) % formElementsArray.length;
                formElementsArray[nextIndex].focus(); // Move focus to the next input element
              }
            }
          }
        };
      
        if (props.initialRef.current) {
          props.initialRef.current.focus();
          props.initialRef.current.addEventListener("keydown", handleKeyDown);
        }
      
        return () => {
          if (props.initialRef.current) {
            props.initialRef.current.removeEventListener("keydown", handleKeyDown);
          }
        };
      }, []);


    return (
        <Flex
            maxH={"100vh"}
            justify={"center"}
        >
            <Stack mx={"auto"} minW={{ base: "sm", md: "md" }} px={6}>
                <Box rounded={"lg"} bg={"white"} px={4}>
                    <Stack mt="4" alignItems={"center"}>
                        <Image
                            src={Logo}
                            alt="tempatku logo"
                            boxSize="50px"
                        />
                    </Stack>
                    <Stack mb="8">
                        <Text
                            fontSize="3xl"
                            fontWeight="semibold"
                            style={{ display: "flex" }}
                            m="auto"
                        >
                            Login to tempatku
                        </Text>
                    </Stack>
                    <Stack spacing={6}>
                        <FormControl id="emailOrPhone" isInvalid={formik.errors.emailOrPhone}>
                            <FormLabel size="sm">Email or Phone Number</FormLabel>
                            {/* Input Email or Phone Number */}
                            <Input
                                type="text"
                                borderColor="#d0d7de"
                                onChange={handleForm}
                                name="emailOrPhone"
                                ref={props.initialRef}
                                tabIndex={1}
                            />
                            <FormErrorMessage fontSize="xs"
                                style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}
                            >{formik.errors.emailOrPhone}</FormErrorMessage>
                        </FormControl>
                        <FormControl id="password" isInvalid={formik.errors.password}>
                            <HStack justify="space-between">
                                <FormLabel>Password</FormLabel>
                                <Button
                                    as="a"
                                    variant="link"
                                    size="xs"
                                    color="#0969da"
                                    fontWeight="500"
                                    onClick={() => {
                                        props.onCloseModal();
                                        navigate("/password/forgot");
                                    }}
                                    tabIndex={3}
                                >
                                    Forgot password?
                                </Button>
                            </HStack>
                            <InputGroup borderColor="#d0d7de">
                                {/* Input Password */}
                                <Input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    onChange={handleForm}
                                    name="password"
                                    tabIndex={2}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        _hover={"none"}
                                        _active={"none"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) =>
                                                    !showPassword
                                            )
                                        }
                                        tabIndex={4}
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage fontSize="xs"
                                style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}
                            >{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <Stack spacing={0}></Stack>
                        <Stack pb={0}>
                            <Center>
                                <Stack
                                    spacing={2}
                                    align={"center"}
                                    maxW={"md"}
                                    w={"full"}
                                >
                                    <Button
                                        type="button"
                                        w={"full"}
                                        bg={"#D3212D"}
                                        color={"white"}
                                        _hover={{
                                            bg: "#D3212D",
                                        }}
                                        onClick={onBtnLogin}
                                        isLoading={loading}
                                        tabIndex={5}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={signInWithGoogle}
                                        w={"full"}
                                        variant={"outline"}
                                        leftIcon={<FcGoogle />}
                                        borderColor="#d0d7de"
                                        _hover={"none"}
                                        ref={props.finalRef}
                                        tabIndex={6}
                                    >
                                        <Center>
                                            <Text>
                                                Continue with Google
                                            </Text>
                                        </Center>
                                    </Button>

                                    <Stack pb="2">
                                        <Card
                                            variant="none"
                                            borderColor="#d0d7de"
                                        >
                                            <CardBody>
                                                <Center>
                                                    <HStack
                                                        fontSize="sm"
                                                        spacing="1"
                                                    >
                                                        <Text>
                                                            New to tempatku?
                                                        </Text>
                                                        <Text
                                                            onClick={() => {
                                                                props.onCloseModal();
                                                                navigate(
                                                                    "/register/user"
                                                                );
                                                            }}
                                                            color="#0969da"
                                                            cursor={
                                                                "pointer"
                                                            }
                                                        >
                                                            Create an
                                                            account.
                                                        </Text>
                                                    </HStack>
                                                </Center>
                                            </CardBody>
                                        </Card>
                                    </Stack>
                                </Stack>
                            </Center>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
