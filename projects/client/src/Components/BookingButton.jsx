import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
//moved from Booking component TPK-9

export default function BookingButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const isVerified = useSelector((state) => state.authReducer.isVerified);

    //inside modal alert cannot continue to transaction page
    const onBtnSendVerifyEmail = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/user/sendverificationemail`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("ini hasil response onbtnSendVerifyEmail :", response); //testing purposes
            alert(response.data.message);
        } catch (error) {
            console.log("ini error dari onBtnSendVerifyEmail :", error);
            // alert(error.response.data.message); // not needed continue to transaction page immediately
            navigate("/transactionpage");
        }
    };
    return (
        <>
            {
                //if user isverified false
                !isVerified ? (
                    <>
                        <Button
                            loadingText="Submitting"
                            bg={"#D3212D"}
                            color={"white"}
                            _hover={{
                                bg: "#D3212D",
                            }}
                            type="button"
                            onClick={onOpen}
                        >
                            Book now
                        </Button>
                        <Modal onClose={onClose} isOpen={isOpen} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>
                                    Please verify your account!
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p>
                                        You need to verify your email address
                                        before you can make a booking. Click the
                                        button below an we will send you an
                                        email to verify your account
                                    </p>
                                    <br />
                                    <Button
                                        loadingText="Submitting"
                                        bg={"#D3212D"}
                                        color={"white"}
                                        _hover={{
                                            bg: "#D3212D",
                                        }}
                                        type="button"
                                        onClick={onBtnSendVerifyEmail}
                                        w="full"
                                    >
                                        Send Verification Email
                                    </Button>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                ) : (
                    //if isverified true
                    <>
                        <Button
                            loadingText="Submitting"
                            bg={"#D3212D"}
                            color={"white"}
                            _hover={{
                                bg: "#D3212D",
                            }}
                            type="button"
                            onClick={() => navigate("/transactionpage")}
                        >
                            Book now
                        </Button>
                    </>
                )
            }
        </>
    );
}
