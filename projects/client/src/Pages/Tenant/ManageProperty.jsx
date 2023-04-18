import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, API_URL_IMG } from "../../helper";
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
    const [category, setCategory] = useState(""); // useState category
    const [property, setProperty] = useState(""); // useState property
    // const [fileProperty, setFileProperty] = useState(null);
    const [description, setDescription] = useState(""); // useState description
    const [descriptionLength, setDescriptionLength] = useState(0); // useState description length
    const [address, setAddress] = useState(""); // useState address
    const [regency, setRegency] = useState(null); // useState regency
    const [province, setProvince] = useState(null); // useState province
    const [zipcode, setZipcode] = useState(""); // useState zip
    const [country, setCountry] = useState(""); // useState country
    // const [mapsUrl, setMapsUrl] = useState(""); // useState link maps
    const [allRegency, setAllRegency] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [filePropertyEdit1, setFilePropertyEdit1] = useState([]);
    const [filePropertyEdit2, setFilePropertyEdit2] = useState([]);
    const [filePropertyEdit3, setFilePropertyEdit3] = useState([]);
    const [filePropertyEdit4, setFilePropertyEdit4] = useState([]);
    const [filePropertyEdit5, setFilePropertyEdit5] = useState([]);

    // PROPERTY DATA
    const getPropertyData = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${API_URL}/property/getpropertydata/${params.uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPropertyData(get.data.data[0]);
            setFilePropertyEdit1(
                get.data.data[0].picture_properties[0].picture
            );
            setFilePropertyEdit2(
                get.data.data[0].picture_properties[1].picture
            );
            setFilePropertyEdit3(
                get.data.data[0].picture_properties[2].picture
            );
            setFilePropertyEdit4(
                get.data.data[0].picture_properties[3].picture
            );
            setFilePropertyEdit5(
                get.data.data[0].picture_properties[4].picture
            );
        } catch (error) {
            console.log(error);
        }
    };
    console.log("propertyData", propertyData);

    // UPLOAD FILE/S
    // For Each untuk check size per file (max 2mb)
    // const checkFileSize = (files) => {
    //     const maxSize = 2 * 1024 * 1024;
    //     let overSize = false;

    //     files.forEach((file) => {
    //         if (file.size > maxSize) {
    //             overSize = true;
    //         }
    //     });
    //     return overSize;
    // };

    // const printButtonUpload = () => {

    //     for (let i = 1; i < 4; i++) {
    //         <ButtonUpload
    //         inputFile1={inputFile[i]}
    //         onChangeFile1={onChangeFile[i]}
    //         setFilePropertyEdit={
    //             setFilePropertyEdit[i]
    //         }/>
    //     }
    // }

    const onChangeFile1 = (event) => {
        // const files = [...event.target.files];
        // const overSize = checkFileSize(files);
        // const fileAmount = files.length;
        // if (overSize) {
        //     alert(`You can only upload files that are lower than 2MB in size.`);
        // } else if (fileAmount > 5) {
        //     alert(`You can only upload up to 5 pictures.`);
        // } else {

        setFilePropertyEdit1(event.target.files[0]);

        // }
    };

    const onChangeFile2 = (event) => {
        setFilePropertyEdit2(event.target.files[0]);
    };
    const onChangeFile3 = (event) => {
        setFilePropertyEdit3(event.target.files[0]);
    };
    const onChangeFile4 = (event) => {
        setFilePropertyEdit4(event.target.files[0]);
    };
    const onChangeFile5 = (event) => {
        setFilePropertyEdit5(event.target.files[0]);
    };

    const btnEditProperty = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    category: category,
                    categoryId: propertyData.categoryId,
                    uuidProperty: propertyData.uuid,
                    property_location_id: propertyData.property_location.id,
                    property: property,
                    description: description,
                    address: address,
                    regencyId: regency.value,
                    provinceId: province.value,
                    zipcode: zipcode,
                    country: country,
                })
            );
            console.log("propertyData.categoryId", propertyData.categoryId);
            console.log("category", category);
            console.log("propertyData.uuid", propertyData.uuid);
            console.log(
                "propertyData.property_location.id",
                propertyData.property_location.id
            );
            console.log("property", property);
            console.log("description", description);
            console.log("address", address);
            console.log("regency.value", regency.value);
            console.log("province.value", province.value);
            console.log("zipcode", zipcode);
            console.log("country", country);

            // if (filePropertyEdit != null) {
            //     let temp = [...filePropertyEdit];
            //     temp.forEach((val, idx) => {
            //         formData.append("images", temp[idx]);
            //     });
            // }

            if (filePropertyEdit1 != null) {
                formData.append("images", filePropertyEdit1);
            }
            if (filePropertyEdit2 != null) {
                formData.append("images", filePropertyEdit2);
            }
            if (filePropertyEdit3 != null) {
                formData.append("images", filePropertyEdit3);
            }
            if (filePropertyEdit4 != null) {
                formData.append("images", filePropertyEdit4);
            }
            if (filePropertyEdit5 != null) {
                formData.append("images", filePropertyEdit5);
            }

            let edit = await axios.patch(
                `${API_URL}/property/editproperty`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (edit.data.success) {
                // setFilePropertyEdit(null);
                setFilePropertyEdit1(null);
                setFilePropertyEdit2(null);
                setFilePropertyEdit3(null);
                setFilePropertyEdit4(null);
                setFilePropertyEdit5(null);
                setCategory("");
                setProperty("");
                setDescription("");
                setDescriptionLength(0);
                setAddress("");
                setRegency("");
                // setProvince("");
                setZipcode("");
                setCountry("");
                // ubah ke toast
                alert("Property Updated");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Province Select
    const [allProvince, setAllProvince] = useState([]);

    const selectProvince = useChakraSelectProps({
        isMulti: false,
        value: province,
        onChange: setProvince,
    });

    const getProvince = async () => {
        try {
            let get = await axios.get(`${API_URL}/property/getprovince`);
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

    // const getRegency = async () => {
    //     try {
    //         let get = await axios.post(`${API_URL}/property/getregency`, {
    //             province_id: province.value,
    //         });
    //         setAllRegency(get.data);
    //         console.log("allregency", get.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const getRegencyById = async () => {
        try {
            let get = await axios.post(`${API_URL}/property/getregencybyid`, {
                province_id: province.value,
            });
            setAllRegency(get.data);
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

    console.log("description", description);
    console.log("filePropertyEdit1:", filePropertyEdit1);
    console.log("filePropertyEdit2:", filePropertyEdit2);
    console.log("filePropertyEdit3:", filePropertyEdit3);
    console.log("filePropertyEdit4:", filePropertyEdit4);
    console.log("filePropertyEdit5:", filePropertyEdit5);
    console.log("AllProvince", allProvince);
    console.log("Provinceeeeee:", province);

    // ACTIVE BUTTON
    const handleButtonClick = (value) => {
        setActiveButton(value === activeButton ? null : value);
    };

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
                    <h1>Edit Listing</h1>
                </Box>
                <Box mt={"10"}>
                    <Box textAlign="left" fontSize={"3xl"} fontWeight="bold">
                        <h2>Basic Information</h2>
                    </Box>
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
                                    p={"4"}
                                >
                                    <Box as={Flex}>
                                        <Box display={"flex"} w={"full"}>
                                            {/* Button Image 1 */}
                                            {filePropertyEdit1 ? (
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
                                                                : `${API_URL_IMG}${filePropertyEdit1}`
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
                                                            borderRadius: "6px"
                                                        }}
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        ref={inputFile1}
                                                        style={{
                                                            display: "none",
                                                        }}
                                                        onChange={onChangeFile1}
                                                    />
                                                </Box>
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
                                                        onChange={onChangeFile1}
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
                                                    style={{ display: "none" }}
                                                    onChange={onChangeFile2}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    fontSize={"sm"}
                                                >
                                                    Choose Image
                                                </Text>
                                            </Button>
                                            {/* Button Image 3 */}
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
                                                    style={{ display: "none" }}
                                                    onChange={onChangeFile3}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    fontSize={"sm"}
                                                >
                                                    Choose Image
                                                </Text>
                                            </Button>
                                            {/* Button Image 4 */}
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
                                                    style={{ display: "none" }}
                                                    onChange={onChangeFile4}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    fontSize={"sm"}
                                                >
                                                    Choose Image
                                                </Text>
                                            </Button>
                                            {/* Button Image 5 */}
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
                                                    style={{ display: "none" }}
                                                    onChange={onChangeFile5}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    fontSize={"sm"}
                                                >
                                                    Choose Image
                                                </Text>
                                            </Button>
                                            {/* <Button
                                                type="button"
                                                display={"flex"}
                                                flexDir="column"
                                                h={"35px"}
                                                w={"35px"}
                                                variant="outline"
                                                alignItems={"center"}
                                                mx={"auto"}
                                                onClick={() =>
                                                    setFilePropertyEdit5(
                                                        null
                                                    )
                                                }
                                            >
                                                <Text fontSize={"xl"}>
                                                    <HiTrash
                                                        fontWeight={"extrabold"}
                                                        color="#D3212D"
                                                    />
                                                </Text>
                                            </Button> */}
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Flex
                                            justify={"space-between"}
                                            w="96%"
                                            mx={"4"}
                                            mb={"4"}
                                        >
                                            {/* {filePropertyEdit ? (
                                                <>
                                                    <Box
                                                        display={"flex"}
                                                        justifyContent={"left"}
                                                    >
                                                        {filePropertyEdit ? (
                                                            Array.from(
                                                                filePropertyEdit
                                                            ).map(
                                                                (
                                                                    file,
                                                                    index
                                                                ) => (
                                                                    <Image
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            filePropertyEditNew
                                                                                ? URL.createObjectURL(
                                                                                      file
                                                                                  )
                                                                                : `${API_URL}${filePropertyEdit}`
                                                                        }
                                                                        style={{
                                                                            maxWidth:
                                                                                "75px",
                                                                            maxHeight:
                                                                                "75px",
                                                                            margin: "3px",
                                                                            aspectRatio:
                                                                                "3/2",
                                                                            objectFit:
                                                                                "contain",
                                                                        }}
                                                                    />
                                                                )
                                                            )
                                                        ) : (
                                                            <Text>
                                                                Choose a file to
                                                                upload
                                                            </Text>
                                                        )}
                                                    </Box>
                                                </>
                                            ) : null} */}
                                        </Flex>
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
                                {/* Form untuk react-iframe */}
                                {/* <FormLabel>Google Maps</FormLabel>
                                <Input
                                    isRequired
                                    type="url"
                                    placeholder="Enter Google Maps Link"
                                    mb={"2"}
                                    value={mapsUrl}
                                    onChange={(e) => {
                                        setMapsUrl(e.target.value);
                                    }}
                                /> */}
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
