import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    InputGroup, InputRightElement, FormErrorMessage, useToast
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Loading from "../Components/Loading";

export default function ChangePassword() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();
    const role = useSelector((state) => state.authReducer.role);


    const onBtnChangePassword = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");
            await formik.validateForm();
            if (!formik.isValid) {
                return;
            }
            let response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/user/change-password`,
                {
                    password: formik.values.oldPassword,
                    newPassword: formik.values.newPassword,
                    confirmationPassword: formik.values.passwordConfirmation
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            toast({
                title: response.data.message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            if (role == "User") {
                navigate("/", { replace: true });
            } else if (role == "Tenant") {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log("ini error dari onBtnChangePassword : ", error);
            if (error.response && !error.response.data.message) {
                toast({
                    title: "Change password failed",
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
            oldPassword: "",
            newPassword: "",
            passwordConfirmation: ""
        },
        onSubmit: onBtnChangePassword,
        validationSchema: yup.object().shape({
            oldPassword: yup
                .string()
                .required("Old password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                ),
            newPassword: yup
                .string()
                .required("New password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .test(
                    "different from old password",
                    "New password must be different from old password",
                    function (value) {
                        return value !== this.parent.oldPassword;
                    }
                ),
            passwordConfirmation: yup
                .string()
                .required("Confirmation password is a required field")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                    "Password must be at least 6 characters includes 1 number, 1 uppercase, and 1 lowercase letter"
                )
                .oneOf([yup.ref("newPassword"), null], "Must match with new password"),
        })
    });

    const handleForm = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1700);
    }, []);

    if (loadingPage) {
        return <Loading />
    } else {
        return (
            <Flex
                minH={{ base: "50vh", sm: "100vh" }}
                align={{ base: "none", sm: "center" }}
                justify={"center"}
                bg={"white"}>
                <Stack
                    spacing={6}
                    w={"full"}
                    maxW={"md"}
                    bg={"white"}
                    rounded={"xl"}
                    borderWidth={"1px"}
                    borderColor={{ base: "white", sm: "gray.300" }}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                        Enter new password
                    </Heading>
                    <FormControl id="password" isInvalid={formik.errors.oldPassword}>
                        {/* Old Password Field */}
                        <FormLabel>Old Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showOldPassword ? "text" : "password"}
                                onChange={handleForm}
                                name="oldPassword"
                            />
                            <InputRightElement h={"full"}>
                                <Button
                                    variant={"ghost"}
                                    _hover={"none"}
                                    _active={"none"}
                                    onClick={() =>
                                        setShowOldPassword(
                                            (showOldPassword) => !showOldPassword
                                        )
                                    }
                                >
                                    {showOldPassword ? (
                                        <ViewIcon />
                                    ) : (
                                        <ViewOffIcon />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.oldPassword}</FormErrorMessage>
                    </FormControl>
                    {/* New Password Field */}
                    <FormControl id="newpassword" isInvalid={formik.errors.newPassword}>
                        <FormLabel>New Password</FormLabel>
                        <InputGroup>
                            <Input
                                type={showNewPassword ? "text" : "password"}
                                onChange={handleForm}
                                name="newPassword"
                            />
                            <InputRightElement h={"full"}>
                                <Button
                                    variant={"ghost"}
                                    _hover={"none"}
                                    _active={"none"}
                                    onClick={() =>
                                        setShowNewPassword(
                                            (showNewPassword) => !showNewPassword
                                        )
                                    }
                                >
                                    {showNewPassword ? (
                                        <ViewIcon />
                                    ) : (
                                        <ViewOffIcon />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage fontSize="xs" style={{ position: "absolute", top: "100%", marginTop: "0.30rem" }}>{formik.errors.newPassword}</FormErrorMessage>
                    </FormControl>
                    {/* Confirm New Password  */}
                    <FormControl id="confirmation_password" isInvalid={formik.errors.passwordConfirmation}>
                        <FormLabel>Confirm New Password</FormLabel>
                        <InputGroup>
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
                    <Stack pt="4">
                        <Button
                            bg={"#D3212D"}
                            color={"white"}
                            _hover={{
                                bg: "#D3212D",
                            }}
                            onClick={onBtnChangePassword}
                            isLoading={loading}
                        >
                            Change Password
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        );
    }
}
