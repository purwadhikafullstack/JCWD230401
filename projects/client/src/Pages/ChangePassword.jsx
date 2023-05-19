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
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
    const navigate = useNavigate();

    const onBtnChangePassword = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/user/changepw`,
                {
                    password: oldPassword,
                    newPassword: newPassword,
                    confirmationPassword: passwordConfirmation,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("ini hasil response onbtnchangepassword :", response); //testing purposes
            console.log(
                "ini hasil response onbtnchangepassword message from be :",
                response.data.message
            ); //testing purposes
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            console.log("ini error dari onBtnChangePassword : ", error); //testing purposes
            alert(error.response.data.message);
            alert(error.response.data.error[0].msg);
        }
    };

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
                <FormControl id="password">
                    {/* Old Password Field */}
                    <FormLabel>Old Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showOldPassword ? "text" : "password"}
                            onChange={(e) => setOldPassword(e.target.value)}
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
                </FormControl>
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
                        onClick={onBtnChangePassword}
                    >
                        Change Password
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
