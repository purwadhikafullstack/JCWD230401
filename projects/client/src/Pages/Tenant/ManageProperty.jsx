import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    useToast,
    Image,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";

function ManageProperty(props) {
    const params = useParams();

    const toast = useToast();

    const inputFile1 = useRef(null);
    const inputFile2 = useRef(null);
    const inputFile3 = useRef(null);
    const inputFile4 = useRef(null);
    const inputFile5 = useRef(null);

    const [propertyData, setPropertyData] = useState(null);
    const [category, setCategory] = useState("");
    const [property, setProperty] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [address, setAddress] = useState("");
    const [regency, setRegency] = useState(null);
    const [province, setProvince] = useState(null);
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    const [mapsUrl, setMapsUrl] = useState("");

    const [allRegency, setAllRegency] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [allProvince, setAllProvince] = useState([]);

    const [filePropertyEdit1, setFilePropertyEdit1] = useState(null);
    const [filePropertyEdit2, setFilePropertyEdit2] = useState(null);
    const [filePropertyEdit3, setFilePropertyEdit3] = useState(null);
    const [filePropertyEdit4, setFilePropertyEdit4] = useState(null);
    const [filePropertyEdit5, setFilePropertyEdit5] = useState(null);

    const getPropertyData = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/property/getpropertydata/${params.uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("get", get);
            setPropertyData(get.data.data[0]);
            setFilePropertyEdit1(get.data.data[0].picture_properties[0]);
            setFilePropertyEdit2(get.data.data[0].picture_properties[1]);
            setFilePropertyEdit3(get.data.data[0].picture_properties[2]);
            setFilePropertyEdit4(get.data.data[0].picture_properties[3]);
            setFilePropertyEdit5(get.data.data[0].picture_properties[4]);
        } catch (error) {
            console.log(error);
        }
    };
    console.log("propertyData", propertyData);

    const uploadImageProperty = async (imageFile, id, propertyId) => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();

            formData.append("images", imageFile);

            let edit = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/property/updateimageproperty?id=${id}&propertyId=${propertyData.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (edit.data.success) {
                toast({
                    title: " Property Image Updated !",
                    description: "Saved your file.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteImageProperty = async (id) => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let del = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/property/deleteimageproperty?id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (del.data.success) {
                getPropertyData();
                toast({
                    title: " Image Deleted !",
                    description: "Successfully deleted the image.",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeFile1 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFilePropertyEdit1(event.target.files[0]);
            uploadImageProperty(event.target.files[0], id);
        }
    };

    const onChangeFile2 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFilePropertyEdit2(event.target.files[0]);
            uploadImageProperty(event.target.files[0], id);
        }
    };
    const onChangeFile3 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFilePropertyEdit3(event.target.files[0]);
            uploadImageProperty(event.target.files[0], id);
        }
    };
    const onChangeFile4 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFilePropertyEdit4(event.target.files[0]);
            uploadImageProperty(event.target.files[0], id);
        }
    };
    const onChangeFile5 = (event, id) => {
        const maxSize = 2 * 1024 * 1024;
        if (event.target.files[0].size > maxSize) {
            toast({
                title: "Error occured",
                description: "Your file is too large",
                status: "error",
                duration: 3500,
                isClosable: true,
            });
        } else {
            setFilePropertyEdit5(event.target.files[0]);
            uploadImageProperty(event.target.files[0], id);
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
            let get = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/property/getprovince`);
            console.log("get allprovince", get.data);
            setAllProvince(get.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Regency Select
    const selectRegency = useChakraSelectProps({
        isMulti: false,
        value: regency,
        onChange: setRegency,
    });

    const getRegencyById = async () => {
        try {
            let get = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/property/getregencybyid`, {
                province_id: province.value,
            });
            setAllRegency(get.data);
        } catch (error) {
            console.log(error);
        }
    };

    const btnEditProperty = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");

            let edit = await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/property/editproperty/${params.uuid}`,
                {
                    category: category,
                    property: property,
                    description: description,
                    address: address,
                    zipcode: zipcode,
                    country: country,
                    regencyId: regency,
                    provinceId: province,
                    gmaps: mapsUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (edit.data.success) {
                toast({
                    title: "Property data updated",
                    status: "success",
                    duration: 3500,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProvince();
        getPropertyData();
    }, []);

    // SELECTED OPTION BASED ON PROPERTYDATA
    useEffect(() => {
        if (allProvince.length && propertyData) {
            let data = allProvince.filter(
                (val) => val.value === propertyData.property_location.provinceId
            );
            console.log("INI DATAAAA PROVINCE DI USEEFFECT TOT", data);
            setProvince(data[0]);
        }
    }, [allProvince, propertyData]);

    useEffect(() => {
        getRegencyById();
    }, [province]);

    useEffect(() => {
        if (allRegency.length && propertyData) {
            let data = allRegency.filter(
                (val) => val.value === propertyData.property_location.regencyId
            );
            console.log("INI DATAAAA REGENCY DI USEEFFECT TOT", data);
            setRegency(data[0]);
        }
    }, [allRegency, propertyData]);

    console.log("filePropertyEdit1:", filePropertyEdit1);
    console.log("filePropertyEdit2:", filePropertyEdit2);
    console.log("filePropertyEdit3:", filePropertyEdit3);
    console.log("filePropertyEdit4:", filePropertyEdit4);
    console.log("filePropertyEdit5:", filePropertyEdit5);

    // ACTIVE BUTTON
    const handleButtonClick = (value) => {
        setActiveButton(value === activeButton ? null : value);
    };

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
                    <h1>Edit Listing</h1>
                </Box>
                <Box mt={"10"}>
                    <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                        <h2>Basic Information</h2>
                    </Box>
                    {/* CHOOSE/EDIT CATEGORY */}
                    <Box as={Flex} my="10">
                        <Flex
                            flex={1}
                            fontWeight="medium"
                            alignItems={"center"}
                        >
                            <Text>Edit Category</Text>
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
                                        activeButton === "Hotel" ? "2px" : "1px"
                                    }
                                    value={"Hotel"}
                                    onClick={() => {
                                        handleButtonClick("Hotel");
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
                                        activeButton === "Villa" ? "2px" : "1px"
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
                                        value={
                                            !category
                                                ? propertyData?.category
                                                      ?.category
                                                : category
                                        }
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                        }}
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    {/* CREATE/EDIT PROPERTY NAME */}
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Edit Name</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <InputGroup display={"flex"} size={"md"}>
                                    <Input
                                        placeholder="Enter the name of your listing"
                                        type="text"
                                        justifyItems={"self-end"}
                                        h={"40px"}
                                        // value={property}
                                        defaultValue={propertyData?.property}
                                        onChange={(e) =>
                                            setProperty(e.target.value)
                                        }
                                    />
                                </InputGroup>
                            </Box>
                        </Box>
                    </Box>
                    {/* UPLOAD/EDIT PHOTO/S */}
                    <Box as={Flex} my={"10"}>
                        <Flex
                            flex={1}
                            fontWeight={"medium"}
                            alignItems={"center"}
                        >
                            <Text>Edit Pictures</Text>
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
                                    mx="4"
                                    my="2"
                                    minW={"871px"}
                                >
                                    <Box as={Flex}>
                                        <Box
                                            display={"flex"}
                                            w={"full"}
                                            justifyContent={"space-between"}
                                        >
                                            {/* Button Image 1 */}
                                            {filePropertyEdit1 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile1.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof filePropertyEdit1.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              filePropertyEdit1
                                                                          )
                                                                        : `${process.env.REACT_APP_API_IMG_URL}${filePropertyEdit1.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile1}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile1(
                                                                        event,
                                                                        filePropertyEdit1.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFilePropertyEdit1(
                                                                    null
                                                                );
                                                                deleteImageProperty(
                                                                    propertyData
                                                                        .picture_properties[0]
                                                                        .id
                                                                );
                                                            }}
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
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile1.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile1}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile1(
                                                                event,
                                                                filePropertyEdit1.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}

                                            {/* Button Image 2 */}
                                            {filePropertyEdit2 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile2.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof filePropertyEdit2.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              filePropertyEdit2
                                                                          )
                                                                        : `${process.env.REACT_APP_API_IMG_URL}${filePropertyEdit2.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile2}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile2(
                                                                        event,
                                                                        filePropertyEdit2.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFilePropertyEdit2(
                                                                    null
                                                                );
                                                                deleteImageProperty(
                                                                    propertyData
                                                                        .picture_properties[1]
                                                                        .id
                                                                );
                                                            }}
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
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile2.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile2}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile2(
                                                                event,
                                                                filePropertyEdit2.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 3 */}
                                            {filePropertyEdit3 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile3.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof filePropertyEdit3.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              filePropertyEdit3
                                                                          )
                                                                        : `${process.env.REACT_APP_API_IMG_URL}${filePropertyEdit3.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile3}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile3(
                                                                        event,
                                                                        filePropertyEdit3.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFilePropertyEdit3(
                                                                    null
                                                                );
                                                                deleteImageProperty(
                                                                    propertyData
                                                                        .picture_properties[2]
                                                                        .id
                                                                );
                                                            }}
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
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile3.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile3}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile3(
                                                                event,
                                                                filePropertyEdit3.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 4 */}
                                            {filePropertyEdit4 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile4.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof filePropertyEdit4.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              filePropertyEdit4
                                                                          )
                                                                        : `${process.env.REACT_APP_API_IMG_URL}${filePropertyEdit4.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
                                                                    aspectRatio:
                                                                        "1/1",
                                                                    objectFit:
                                                                        "cover",
                                                                    boxShadow:
                                                                        "2px 2px 5px gray",
                                                                    borderRadius:
                                                                        "6px",
                                                                }}
                                                            />
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile4}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile4(
                                                                        event,
                                                                        filePropertyEdit4.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFilePropertyEdit4(
                                                                    null
                                                                );
                                                                deleteImageProperty(
                                                                    propertyData
                                                                        .picture_properties[3]
                                                                        .id
                                                                );
                                                            }}
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
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile4.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile4}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile4(
                                                                event,
                                                                filePropertyEdit4.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                            {/* Button Image 5 */}
                                            {filePropertyEdit5 ? (
                                                <>
                                                    <Flex flexDir={"column"}>
                                                        <Box
                                                            onClick={() => {
                                                                inputFile5.current.click();
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    typeof filePropertyEdit5.name ==
                                                                    "string"
                                                                        ? URL.createObjectURL(
                                                                              filePropertyEdit5
                                                                          )
                                                                        : `${process.env.REACT_APP_API_IMG_URL}${filePropertyEdit5.picture}`
                                                                }
                                                                w={"100px"}
                                                                h={"100px"}
                                                                my={"4"}
                                                                mx={"4"}
                                                                style={{
                                                                    maxWidth:
                                                                        "100px",
                                                                    maxHeight:
                                                                        "100px",
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
                                                            <input
                                                                type="file"
                                                                id="file"
                                                                ref={inputFile5}
                                                                style={{
                                                                    display:
                                                                        "none",
                                                                }}
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    onChangeFile5(
                                                                        event,
                                                                        filePropertyEdit5.id
                                                                    );
                                                                }}
                                                            />
                                                        </Box>
                                                        <Button
                                                            type="button"
                                                            h={"35px"}
                                                            w={"35px"}
                                                            variant="outline"
                                                            alignItems={
                                                                "center"
                                                            }
                                                            alignSelf={"center"}
                                                            mx={"auto"}
                                                            mb={"4"}
                                                            onClick={() => {
                                                                setFilePropertyEdit5(
                                                                    null
                                                                );
                                                                deleteImageProperty(
                                                                    propertyData
                                                                        .picture_properties[4]
                                                                        .id
                                                                );
                                                            }}
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
                                                    </Flex>
                                                </>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    justifyContent={"center"}
                                                    display={"flex"}
                                                    flexDir="column"
                                                    size="md"
                                                    w={"100px"}
                                                    h={"100px"}
                                                    textAlign="center"
                                                    my={"4"}
                                                    mx={"4"}
                                                    variant="outline"
                                                    _hover={""}
                                                    bgColor={"gray.100"}
                                                    alignItems={"center"}
                                                    onClick={() => {
                                                        inputFile5.current.click();
                                                    }}
                                                >
                                                    <SlPicture
                                                        fontSize={"35px"}
                                                        color="#D3212D"
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile5}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={(event) => {
                                                            onChangeFile5(
                                                                event,
                                                                filePropertyEdit5.id
                                                            );
                                                        }}
                                                    />
                                                    <Text
                                                        textAlign={"center"}
                                                        fontSize={"sm"}
                                                    >
                                                        Choose Image
                                                    </Text>
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
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
                            <Text>Edit Description</Text>
                        </Flex>
                        <Box flex={3}>
                            <Box mx="4" my="2">
                                <Textarea
                                    placeholder="Describe your property"
                                    size={"md"}
                                    resize={"none"}
                                    h={"250px"}
                                    maxLength={250}
                                    // value={description}
                                    defaultValue={propertyData?.description}
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
                        Edit Location
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
                                    // value={address}
                                    defaultValue={
                                        propertyData?.property_location?.address
                                    }
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                />
                                <FormLabel>Province</FormLabel>
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
                                            options={allProvince}
                                            placeholder="Select province"
                                            closeMenuOnSelect={true}
                                            {...selectProvince}
                                            defaultInputValue={province?.label}

                                            // propertyData?.property_location
                                            //     ?.provinceId
                                        />
                                    </FormControl>
                                </Box>
                                <FormLabel>Regency</FormLabel>
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
                                            options={allRegency}
                                            placeholder="Select regency"
                                            closeMenuOnSelect={true}
                                            {...selectRegency}
                                            defaultValue={regency?.label}
                                        />
                                    </FormControl>
                                </Box>

                                <FormLabel>Zip Code</FormLabel>
                                <Input
                                    isRequired
                                    type="number"
                                    placeholder="Enter zip code"
                                    mb={"2"}
                                    // value={zipcode}
                                    defaultValue={
                                        propertyData?.property_location?.zip
                                    }
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
                                    // value={country}
                                    defaultValue={
                                        propertyData?.property_location?.country
                                    }
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                />

                                <FormLabel>Google Maps</FormLabel>
                                <Input
                                    isRequired
                                    type="url"
                                    placeholder="Enter Google Maps Link"
                                    mb={"2"}
                                    defaultValue={
                                        propertyData?.property_location.gmaps
                                    }
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
                        // onClick={() => {
                        // setCategory("");
                        // setProperty("");
                        // setFileProperty(null);
                        // setDescription("");
                        // setDescriptionLength(0);
                        // setAddress("");
                        // setRegency("");
                        // setProvince("");
                        // setZipcode("");
                        // setCountry("");
                        // }}
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
                        onClick={btnEditProperty}
                    >
                        <Text color={"white"}>Save</Text>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ManageProperty;
