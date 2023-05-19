import React, { useState } from "react";
import { Center, Heading } from "@chakra-ui/react";
import {
    Button,
    FormControl,
    Flex,
    Input,
    Stack,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Verification() {
    const params = useParams(); //to get token from email link for auth
    const navigate = useNavigate();
    const [pin, setPin] = useState(""); //verification code
    console.log("ini isi token dari params", params);

    const handlePinChange = (e, index) => {
        const newPin = [...pin];
        newPin[index] = e.target.value;
        setPin(newPin.join(""));
        console.log("isi pin joined :", newPin.join(""));
    };

    const onBtnVerify = async () => {
        try {
            let response = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/user/verifyaccount`,
                {
                    otp: pin,
                },
                {
                    headers: {
                        Authorization: `Bearer ${params.token}`,
                    },
                }
            );
            console.log("ini hasil response onbtnverify :", response); //testing purposes
            alert(response.data.message);
            navigate("/", { replace: true });
        } catch (error) {
            console.log("ini error dari onBtnVerify :", error);
            alert(error.response.data.message);
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
                maxW={"sm"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={10}
            >
                <Center>
                    <Heading
                        lineHeight={1.1}
                        fontSize={{ base: "2xl", md: "3xl" }}
                    >
                        Verify your Account
                    </Heading>
                </Center>
                <Center fontSize={{ base: "sm", sm: "md" }}>
                    We have sent code to your email
                </Center>
                <Center fontSize={{ base: "sm", sm: "md" }} fontWeight="bold">
                    username@mail.com
                </Center>
                <FormControl>
                    <Center>
                        <HStack>
                            <PinInput>
                                <PinInputField
                                    value={pin[0]}
                                    onChange={(e) => handlePinChange(e, 0)}
                                />
                                <PinInputField
                                    value={pin[1]}
                                    onChange={(e) => handlePinChange(e, 1)}
                                />
                                <PinInputField
                                    value={pin[2]}
                                    onChange={(e) => handlePinChange(e, 2)}
                                />
                                <PinInputField
                                    value={pin[3]}
                                    onChange={(e) => handlePinChange(e, 3)}
                                />
                            </PinInput>
                        </HStack>
                    </Center>
                    <Center
                        fontSize={{ base: "xs", sm: "sm" }}
                        fontWeight="thin"
                        my={2}
                    >
                        the code is valid for 1 hour
                    </Center>
                </FormControl>
                <Stack spacing={2}>
                    <Button
                        bg={"#D3212D"}
                        color={"white"}
                        _hover={{
                            bg: "#D3212D",
                        }}
                        type="button"
                        onClick={onBtnVerify}
                    >
                        Verify
                    </Button>
                    <Button
                        bg={"none"}
                        color={"#D3212D"}
                        variant="outline"
                        _hover={{
                            color: "#D3212D",
                        }}
                        borderColor={"#D3212D"}
                    >
                        Resend OTP
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
}
