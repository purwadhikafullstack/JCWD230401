import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const navigate = useNavigate();
    const params = useParams(); //data token di params

    const onBtnResetPassword = async () => {
        try {
            let response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/user/resetpw`,
                {
                    newPassword: newPassword,
                    confirmationPassword: passwordConfirmation,
                },
                {
                    headers: {
                        Authorization: `Bearer ${params.token}`,
                    },
                }
            );
            console.log("ini hasil response onbtnresetpassword :", response); //testing purposes
            alert(response.data.message);
            navigate("/", { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnResetPassword : ", error);
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg); //error msg validator new pw
            alert(error.response.data.error[1].msg); //error msg validator confirmation pw
        }
    };

    console.log("ini isi params :", params); //testing purposes

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                    Enter new password
                </Heading>
                {/* New Password Field */}
                <FormControl id="newpassword">
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showNewPassword ? "text" : "password"}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                </FormControl>
                {/* Confirm New Password  */}
                <FormControl id="confirmation_password">
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={
                                showPasswordConfirmation ? "text" : "password"
                            }
                            onChange={(e) =>
                                setPasswordConfirmation(e.target.value)
                            }
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
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={"#D3212D"}
                        color={"white"}
                        _hover={{
                            bg: "#D3212D",
                        }}
                        type="button"
                        onClick={onBtnResetPassword}
                    >
                        Reset Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
