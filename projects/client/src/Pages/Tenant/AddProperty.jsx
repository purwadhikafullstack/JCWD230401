import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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
    Image,
    useToast,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import Loading from "../../Components/Loading";

function AddProperty(props) {
    const [loadingPage, setLoadingPage] = useState(true);
    const inputFile = useRef(null);
    const [category, setCategory] = useState(""); // useState category
    const [property, setProperty] = useState(""); // useState property
    const [description, setDescription] = useState(""); // useState description
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [address, setAddress] = useState(""); // useState address
    const [regency, setRegency] = useState(null); // useState regency
    const [province, setProvince] = useState(null); // useState province
    const [zipcode, setZipcode] = useState(""); // useState zip
    const [country, setCountry] = useState(""); // useState country
    const [allProvince, setAllProvince] = useState([]);
    const [allRegency, setAllRegency] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [fileProperty, setFileProperty] = useState(null);
    const [mapsUrl, setMapsUrl] = useState(""); // useState link maps
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    // For Each untuk check size per file (max 2mb)
    const checkFileSize = (files) => {
        const maxSize = 2 * 1024 * 1024;
        let overSize = false;

        files.forEach((file) => {
            if (file.size > maxSize) {
                overSize = true;
            }
        });
        return overSize;
    };

    // OnChange untuk upload file
    const onChangeFile = (event) => {
        const files = [...event.target.files];
        const overSize = checkFileSize(files);
        const fileAmount = files.length;
        if (overSize) {
            toast({
                title: "File/s too large!",
                description:
                    "You can only upload files that are lower than 2MB in size.",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else if (fileAmount > 5) {
            toast({
                title: "Too many Files!",
                description: "You can only upload up to 5 files.",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFileProperty(event.target.files);
        }
    };

    // Province Select
    const selectProvince = useChakraSelectProps({
        isMulti: false,
        value: province,
        onChange: setProvince,
    });

    const getProvince = async () => {
        try {
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/property/provinces`
            );
            setAllProvince(get.data);
        } catch (error) {
            console.log(error);
        }
    };

    const provinces = allProvince.map((val, idx) => {
        return { value: val.value, label: val.label };
    });

    // Regency Select
    const selectRegency = useChakraSelectProps({
        isMulti: false,
        value: regency,
        onChange: setRegency,
    });

    const getRegencyById = async () => {
        try {
            let get = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/property/regencies`,
                {
                    province_id: province.value,
                }
            );
            setAllRegency(get.data);
        } catch (error) {
            console.log(error);
        }
    };

    const regencies = allRegency.map((val, idx) => {
        return {
            value: val.value,
            label: val.label,
            province_id: val.province_id,
        };
    });

    // Button Save + Create Property
    const btnAddProperty = async () => {
        try {
            setLoading(true);
            let token = localStorage.getItem("tempatku_login");

            if (
                category === "" ||
                property === "" ||
                description === "" ||
                address === "" ||
                regency === null ||
                province === null ||
                zipcode === "" ||
                country === "" ||
                mapsUrl === ""
            ) {
                toast({
                    title: "Error occured",
                    description: "Please fill all forms UWU :3",
                    status: "error",
                    duration: 3500,
                    isClosable: true,
                });
            } else {
                let formData = new FormData();
                formData.append(
                    "data",
                    JSON.stringify({
                        category: category,
                        property: property,
                        description: description,
                        address: address,
                        regencyId: regency.value,
                        provinceId: province.value,
                        zipcode: zipcode,
                        country: country,
                        gmaps: mapsUrl,
                    })
                );

                if (fileProperty != null) {
                    let temp = [...fileProperty];
                    temp.forEach((val, idx) => {
                        formData.append("images", temp[idx]);
                    });
                }

                let add = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/property/create`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (add.data.success) {
                    toast({
                        title: "Property successfully created",
                        status: "success",
                        duration: 3500,
                        isClosable: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
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
            setMapsUrl("");
            setActiveButton(null);
            setLoading(false);
        }
    };

    // Active Button
    const handleButtonClick = (value) => {
        setActiveButton(value === activeButton ? null : value);
    };

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        if (province) {
            getRegencyById();
        }
    }, [province]);

    useEffect(() => {
        setTimeout(() => {
            setLoadingPage(false);
        }, 1700);
    }, []);

    if (loadingPage) {
        return <Loading />;
    } else {
        return (
            <Container
                my={"4"}
                h={"100%"}
                w={"100%"}
                maxW={"1300px"}
                display={"flex"}
                flexDir="column"
            >
                <Box
                    border={"1px"}
                    borderColor={"gray.300"}
                    rounded={"3xl"}
                    px={"8"}
                    mb={"10"}
                >
                    <Box
                        textAlign="left"
                        fontSize={{ base: "2xl", md: "5xl", lg: "5xl" }}
                        fontWeight="bold"
                        mt="10"
                    >
                        <h1>Add Listing</h1>
                    </Box>
                    <Box mt={"10"}>
                        <Box
                            textAlign="left"
                            fontSize={{ base: "xl", md: "3xl", lg: "3xl" }}
                            fontWeight="bold"
                        >
                            <h2>Basic Information</h2>
                        </Box>
                        <Box fontSize={{ base: "xs", md: "lg" }}>
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
                                            w={{ base: "50px", md: "120px" }}
                                            h={{ base: "50px", md: "120px" }}
                                            textAlign="center"
                                            ml={"4"}
                                            variant={
                                                activeButton === "Hotel"
                                                    ? "outline"
                                                    : "solid"
                                            }
                                            borderColor={
                                                activeButton === "Hotel"
                                                    ? "red.500"
                                                    : "gray.200"
                                            }
                                            borderWidth={
                                                activeButton === "Hotel"
                                                    ? "2px"
                                                    : "1px"
                                            }
                                            value={"Hotel"}
                                            onClick={() => {
                                                handleButtonClick("Hotel");
                                                setCategory("Hotel");
                                            }}
                                        >
                                            <BiHotel
                                                fontSize={"45px"}
                                                color="#D3212D"
                                            />
                                            <Text
                                                textAlign={"center"}
                                                fontSize={{
                                                    base: "3xs",
                                                    md: "unset",
                                                }}
                                            >
                                                Hotel
                                            </Text>
                                        </Button>
                                        <Button
                                            type="button"
                                            justifyContent={"center"}
                                            display={"flex"}
                                            flexDir="column"
                                            size="md"
                                            w={{ base: "50px", md: "120px" }}
                                            h={{ base: "50px", md: "120px" }}
                                            textAlign="center"
                                            ml={"4"}
                                            variant={
                                                activeButton === "Villa"
                                                    ? "outline"
                                                    : "solid"
                                            }
                                            borderColor={
                                                activeButton === "Villa"
                                                    ? "red.500"
                                                    : "gray.200"
                                            }
                                            borderWidth={
                                                activeButton === "Villa"
                                                    ? "2px"
                                                    : "1px"
                                            }
                                            value={"Villa"}
                                            onClick={() => {
                                                handleButtonClick("Villa");
                                                setCategory("Villa");
                                            }}
                                        >
                                            <BiHomeAlt
                                                fontSize={"45px"}
                                                color="#D3212D"
                                            />
                                            <Text
                                                textAlign={"center"}
                                                fontSize={{
                                                    base: "3xs",
                                                    md: "unset",
                                                }}
                                            >
                                                Villa
                                            </Text>
                                        </Button>
                                        <Button
                                            type="button"
                                            justifyContent={"center"}
                                            display={"flex"}
                                            flexDir="column"
                                            size="md"
                                            w={{ base: "50px", md: "120px" }}
                                            h={{ base: "50px", md: "120px" }}
                                            textAlign="center"
                                            ml={"4"}
                                            variant={
                                                activeButton === "Apartment"
                                                    ? "outline"
                                                    : "solid"
                                            }
                                            borderColor={
                                                activeButton === "Apartment"
                                                    ? "red.500"
                                                    : "gray.200"
                                            }
                                            borderWidth={
                                                activeButton === "Apartment"
                                                    ? "2px"
                                                    : "1px"
                                            }
                                            value={"Apartment"}
                                            onClick={() => {
                                                handleButtonClick("Apartment");
                                                setCategory("Apartment");
                                            }}
                                        >
                                            <MdApartment
                                                fontSize={"45px"}
                                                color="#D3212D"
                                            />
                                            <Text
                                                textAlign={"center"}
                                                fontSize={{
                                                    base: "3xs",
                                                    md: "unset",
                                                }}
                                            >
                                                Apartment
                                            </Text>
                                        </Button>
                                    </Box>
                                    <Box mx="4" my="2">
                                        <Text
                                            mb="2"
                                            fontWeight={"medium"}
                                            fontSize={{
                                                base: "3xs",
                                                md: "unset",
                                            }}
                                        >
                                            Or you can add your own category
                                        </Text>
                                        <InputGroup
                                            display={"flex"}
                                            size={"md"}
                                        >
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
                                        <InputGroup
                                            display={"flex"}
                                            size={"md"}
                                        >
                                            <Input
                                                isRequired
                                                placeholder="Enter name"
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
                                            borderColor={"gray.200"}
                                            borderRadius={"lg"}
                                            p={"4"}
                                            minW={{
                                                base: "187px",
                                                md: "511px",
                                                lg: "871px",
                                            }}
                                        >
                                            <Button
                                                type="button"
                                                justifyContent={"center"}
                                                display={"flex"}
                                                flexDir="column"
                                                size="md"
                                                w={{
                                                    base: "100px",
                                                    md: "400px",
                                                    lg: "800px",
                                                }}
                                                h={"100px"}
                                                textAlign="center"
                                                my={"4"}
                                                mx={{
                                                    base: "auto",
                                                    md: "auto",
                                                    lg: "4",
                                                }}
                                                variant="outline"
                                                _hover={""}
                                                bgColor={"gray.100"}
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
                                                    multiple
                                                    onChange={onChangeFile}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    fontSize={{
                                                        base: "10px",
                                                        md: "unset",
                                                    }}
                                                >
                                                    Upload picture/s
                                                </Text>
                                            </Button>
                                            <Flex
                                                justify={"space-between"}
                                                w="96%"
                                                mx={"4"}
                                                mb={"4"}
                                            >
                                                {fileProperty ? (
                                                    <>
                                                        <Text
                                                            alignSelf={"center"}
                                                        >
                                                            Your file/files:
                                                        </Text>
                                                        <Box
                                                            display={"flex"}
                                                            justifyContent={
                                                                "left"
                                                            }
                                                        >
                                                            {fileProperty ? (
                                                                Array.from(
                                                                    fileProperty
                                                                ).map(
                                                                    (
                                                                        file,
                                                                        index
                                                                    ) => (
                                                                        <Image
                                                                            key={
                                                                                index
                                                                            }
                                                                            src={URL.createObjectURL(
                                                                                file
                                                                            )}
                                                                            style={{
                                                                                maxWidth:
                                                                                    "100px",
                                                                                maxHeight:
                                                                                    "100px",
                                                                                margin: "8px",
                                                                                aspectRatio:
                                                                                    "1/1",
                                                                                objectFit:
                                                                                    "cover",
                                                                                borderRadius:
                                                                                    "6px",
                                                                                boxShadow:
                                                                                    "2px 2px 5px gray",
                                                                            }}
                                                                        />
                                                                    )
                                                                )
                                                            ) : (
                                                                <Text>
                                                                    Choose a
                                                                    file to
                                                                    upload
                                                                </Text>
                                                            )}
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            display={"flex"}
                                                            flexDir="column"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            onClick={() =>
                                                                setFileProperty(
                                                                    null
                                                                )
                                                            }
                                                        >
                                                            <Text
                                                                fontSize={"xl"}
                                                            >
                                                                <HiTrash
                                                                    fontWeight={
                                                                        "extrabold"
                                                                    }
                                                                    color="#D3212D"
                                                                />
                                                            </Text>
                                                        </Button>
                                                    </>
                                                ) : null}
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
                                    <Text>
                                        Tell us a story about your place
                                    </Text>
                                </Flex>
                                <Box flex={3}>
                                    <Box mx="4" my="2">
                                        <Textarea
                                            isRequired
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
                                        <Text
                                            textAlign={"right"}
                                            color={"gray.300"}
                                        >
                                            {descriptionLength}/250
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        textAlign="left"
                        fontSize={{ base: "xl", md: "3xl", lg: "3xl" }}
                        fontWeight="bold"
                    >
                        <h2>Property Location</h2>
                    </Box>
                    <Box as={Flex} my="10" fontSize={{ base: "xs", md: "lg" }}>
                        <Flex
                            flex={1}
                            fontWeight="medium"
                            alignItems={"center"}
                        >
                            Where is your place located?
                        </Flex>
                        <Box flex={3} display="flex" flexDir={"column"}>
                            <Box display={"flex"} flexDir={"row"}>
                                <FormControl mx={"4"}>
                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Address
                                    </FormLabel>
                                    <Input
                                        isRequired
                                        type="text"
                                        placeholder="Enter address"
                                        mb={"2"}
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                    />
                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Province
                                    </FormLabel>
                                    <Box
                                        display={"flex"}
                                        w={"full"}
                                        justifyContent={"center"}
                                        mb={"2"}
                                    >
                                        <FormControl>
                                            <Select
                                                useBasicStyles
                                                name="province"
                                                options={provinces}
                                                placeholder="Select province"
                                                closeMenuOnSelect={true}
                                                {...selectProvince}
                                            />
                                        </FormControl>
                                    </Box>
                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Regency
                                    </FormLabel>
                                    <Box
                                        display={"flex"}
                                        w={"full"}
                                        justifyContent={"center"}
                                        mb={"2"}
                                    >
                                        <FormControl>
                                            <Select
                                                useBasicStyles
                                                name="regency"
                                                options={regencies}
                                                placeholder={
                                                    !allRegency.length
                                                        ? "Select a province first"
                                                        : "Select Regency"
                                                }
                                                closeMenuOnSelect={true}
                                                {...selectRegency}
                                                isDisabled={
                                                    allRegency.length
                                                        ? false
                                                        : true
                                                }
                                            />
                                        </FormControl>
                                    </Box>

                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Zip Code
                                    </FormLabel>
                                    <Input
                                        isRequired
                                        type="number"
                                        placeholder="Enter zip code"
                                        mb={"2"}
                                        value={zipcode}
                                        maxLength={5}
                                        onChange={(e) => {
                                            setZipcode(e.target.value);
                                        }}
                                    />

                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Country
                                    </FormLabel>
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

                                    <FormLabel
                                        fontSize={{ base: "xs", md: "lg" }}
                                    >
                                        Google Maps
                                    </FormLabel>
                                    <Input
                                        isRequired
                                        type="url"
                                        placeholder="Enter Google Maps Link"
                                        mb={"2"}
                                        value={mapsUrl}
                                        onChange={(e) => {
                                            setMapsUrl(e.target.value);
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
                            isLoading={loading}
                        >
                            <Text color={"white"}>Save</Text>
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }
}

export default AddProperty;
