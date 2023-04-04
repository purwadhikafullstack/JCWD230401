import React, { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    Text,
    Textarea,
    FormControl,
    FormLabel,
    useToast,
} from "@chakra-ui/react";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";

function AddProperty(props) {
    const [category, setCategory] = useState(""); // useState category

    const [property, setProperty] = useState(""); // useState property

    const inputFile = useRef(null);
    const [fileProperty, setFileProperty] = useState(null);

    const onChangeFile = (event) => {
        setFileProperty(event.target.files[0]);
    };

    const [description, setDescription] = useState(""); // useState description
    const [descriptionLength, setDescriptionLength] = useState(0);

    const [address, setAddress] = useState(""); // useState address
    const [regency, setRegency] = useState(""); // useState regency
    const [province, setProvince] = useState(""); // useState province
    const [zipcode, setZipcode] = useState(""); // useState zip
    const [country, setCountry] = useState(""); // useState country

    const toast = useToast();

    const btnAddProperty = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    category: category,
                    property: property,
                    description: description,
                    address: address,
                    regency: regency,
                    province: province,
                    zipcode: zipcode,
                    country: country,
                })
            );

            if (fileProperty != null) {
                formData.append("images", fileProperty);
            }

            let add = await axios.post(
                `${API_URL}/property/addproperty`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (add.data.success) {
                setFileProperty(null);
                setCategory("");
                setProperty("");
                setDescription("");
                setDescriptionLength(0);
                setAddress("");
                setRegency("");
                setProvince("");
                setZipcode("");
                setCountry("");
                alert("Property Added");
                // ubah ke toast
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log("description", description);
    console.log("fileProperty", fileProperty);

    return (
        <Container
            my={"4"}
            h={"100vh"}
            w={"100%"}
            maxW={"1300px"}
            display={"flex"}
            flexDir="column"
        >
            <Box
                border={"none"}
                shadow={"2xl"}
                rounded={"3xl"}
                px={"8"}
                mb={"10"}
            >
                <Box
                    textAlign="left"
                    fontSize={"5xl"}
                    fontWeight="bold"
                    mt="10"
                >
                    <h1>Add Listing</h1>
                </Box>
                <Box mt={"5"}>
                    <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                        <h2>Basic Information</h2>
                    </Box>
                    <Box as={Flex} my="10">
                        <Flex
                            flex={1}
                            fontWeight="medium"
                            alignItems={"center"}
                        >
                            <Text>Which category fits your place?</Text>
                        </Flex>
                        <Box flex={3} display="flex" flexDir={"column"}>
                            <Box display={"flex"} flexDir={"row"}>
                                <Button
                                    type="button"
                                    justifyContent={"center"}
                                    display={"flex"}
                                    flexDir="column"
                                    size="md"
                                    w={"120px"}
                                    h={"120px"}
                                    textAlign="center"
                                    mx={"4"}
                                    variant="outline"
                                    value={"Hotel"}
                                    onClick={() => {
                                        setCategory("Hotel");
                                    }}
                                >
                                    <Text textAlign={"center"}>
                                        <BiHotel
                                            fontSize={"45px"}
                                            color="#D3212D"
                                        />
                                        Hotel
                                    </Text>
                                </Button>
                                <Button
                                    type="button"
                                    justifyContent={"center"}
                                    display={"flex"}
                                    flexDir="column"
                                    size="md"
                                    w={"120px"}
                                    h={"120px"}
                                    textAlign="center"
                                    mx={"4"}
                                    variant="outline"
                                    value={"Villa"}
                                    onClick={() => {
                                        setCategory("Villa");
                                    }}
                                >
                                    <BiHomeAlt
                                        fontSize={"45px"}
                                        color="#D3212D"
                                    />
                                    <Text textAlign={"center"}>Villa</Text>
                                </Button>
                                <Button
                                    type="button"
                                    justifyContent={"center"}
                                    display={"flex"}
                                    flexDir="column"
                                    size="md"
                                    w={"120px"}
                                    h={"120px"}
                                    textAlign="center"
                                    mx={"4"}
                                    variant="outline"
                                    value={"Apartment"}
                                    onClick={() => {
                                        setCategory("Apartment");
                                    }}
                                >
                                    <MdApartment
                                        fontSize={"45px"}
                                        color="#D3212D"
                                    />
                                    <Text textAlign={"center"}>Apartment</Text>
                                </Button>
                            </Box>
                            <Box mx="4" my="2">
                                <Text mb="2" fontWeight={"medium"}>
                                    Or you can add your own category
                                </Text>
                                <InputGroup display={"flex"} size={"md"}>
                                    <Input
                                        placeholder="Your category"
                                        type="text"
                                        justifyItems={"self-end"}
                                        h={"40px"}
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Let's give your place a name</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <InputGroup display={"flex"} size={"md"}>
                                    <Input
                                        placeholder="Enter the name of your listing"
                                        type="text"
                                        justifyItems={"self-end"}
                                        h={"40px"}
                                        value={property}
                                        onChange={(e) =>
                                            setProperty(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Upload Photos of your place</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box
                                display={"flex"}
                                flexDir={"column"}
                                placeItems={"center"}
                            >
                                <Box
                                    border={"2px"}
                                    borderStyle={"dashed"}
                                    borderColor={"gray.300"}
                                    p={"4"}
                                >
                                    <Button
                                        type="button"
                                        justifyContent={"center"}
                                        display={"flex"}
                                        flexDir="column"
                                        size="md"
                                        w={"800px"}
                                        h={"100px"}
                                        textAlign="center"
                                        my={"4"}
                                        mx={"4"}
                                        variant="outline"
                                        alignItems={"center"}
                                        onClick={() => {
                                            inputFile.current.click();
                                        }}
                                    >
                                        <SlPicture
                                            fontSize={"35px"}
                                            color="#D3212D"
                                        />
                                        <input
                                            type="file"
                                            id="file"
                                            ref={inputFile}
                                            style={{ display: "none" }}
                                            onChange={onChangeFile}
                                        />
                                        <Text textAlign={"center"}>
                                            Upload picture
                                        </Text>
                                    </Button>
                                    <Flex
                                        justify={"space-between"}
                                        w="96%"
                                        mx={"4"}
                                        mb={"4"}
                                    >
                                        <Text alignSelf={"center"}>
                                            Your file: {fileProperty?.name}
                                        </Text>
                                        <Button
                                            type="button"
                                            display={"flex"}
                                            flexDir="column"
                                            h={"35px"}
                                            w={"35px"}
                                            variant="outline"
                                            alignItems={"center"}
                                            onClick={() =>
                                                setFileProperty(null)
                                            }
                                        >
                                            <Text fontSize={"xl"}>
                                                <HiTrash
                                                    fontWeight={"extrabold"}
                                                    color="#D3212D"
                                                />
                                            </Text>
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Tell us a story about your place</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <Textarea
                                    placeholder="Describe your property"
                                    size={"md"}
                                    resize={"none"}
                                    h={"250px"}
                                    maxLength={250}
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        setDescriptionLength(
                                            e.target.value.length
                                        );
                                    }}
                                />
                                <Text textAlign={"right"} color={"gray.300"}>
                                    {descriptionLength}/250
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                    <h2>Property Location</h2>
                </Box>
                <Box as={Flex} my="10">
                    <Flex flex={1} fontWeight="medium" alignItems={"center"}>
                        Where is your place located?
                    </Flex>
                    <Box flex={3} display="flex" flexDir={"column"}>
                        <Box display={"flex"} flexDir={"row"}>
                            <FormControl mx={"4"}>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Enter street name, number and city"
                                    mb={"2"}
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                />

                                <FormLabel>Regency</FormLabel>
                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Enter regency name"
                                    mb={"2"}
                                    value={regency}
                                    onChange={(e) => {
                                        setRegency(e.target.value);
                                    }}
                                />

                                <FormLabel>Province</FormLabel>
                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Enter province name"
                                    mb={"2"}
                                    value={province}
                                    onChange={(e) => {
                                        setProvince(e.target.value);
                                    }}
                                />

                                <FormLabel>Zip Code</FormLabel>
                                <Input
                                    isRequired
                                    type="number"
                                    placeholder="Enter zip code"
                                    mb={"2"}
                                    value={zipcode}
                                    onChange={(e) => {
                                        setZipcode(e.target.value);
                                    }}
                                    maxLength={5}
                                />

                                <FormLabel>Country</FormLabel>
                                <Input
                                    isRequired
                                    type="text"
                                    placeholder="Enter country"
                                    mb={"2"}
                                    value={country}
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
                <Box
                    display="flex"
                    mb="10"
                    justifyContent={"center"}
                    w={"full"}
                    py={"2"}
                >
                    <Button
                        type="button"
                        w={"300px"}
                        mr={"4"}
                        rounded={"3xl"}
                        onClick={() => {
                            setCategory("");
                            setProperty("");
                            setFileProperty(null);
                            setDescription("");
                            setDescriptionLength(0);
                            setAddress("");
                            setRegency("");
                            setProvince("");
                            setZipcode("");
                            setCountry("");
                        }}
                    >
                        <Text>Reset</Text>
                    </Button>
                    <Button
                        type="button"
                        _hover=""
                        w={"300px"}
                        ml={"4"}
                        rounded={"3xl"}
                        bgColor="#D3212D"
                        onClick={btnAddProperty}
                    >
                        <Text color={"white"}>Save</Text>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default AddProperty;
