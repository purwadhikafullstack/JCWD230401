import React, { useState, useRef, useEffect } from "react";
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
    Image,
    useToast,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import { BiHotel, BiHomeAlt } from "react-icons/bi";
import { MdApartment } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";

function AddProperty(props) {
    const [category, setCategory] = useState(""); // useState category

    const [property, setProperty] = useState(""); // useState property

    const inputFile = useRef(null);
    const [fileProperty, setFileProperty] = useState(null);

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
            alert(`You can only upload files that are lower than 2MB in size.`);
        } else if (fileAmount > 5) {
            alert(`You can only upload up to 5 pictures.`);
        } else {
            setFileProperty(event.target.files);
        }
    };

    // const printChosenFiles = fileProperty.map((val,idx) =>{
    //    return fileProperty[idx]
    // })

    const [description, setDescription] = useState(""); // useState description
    const [descriptionLength, setDescriptionLength] = useState(0);

    const [address, setAddress] = useState(""); // useState address
    const [regency, setRegency] = useState(null); // useState regency
    const [province, setProvince] = useState(null); // useState province
    const [zipcode, setZipcode] = useState(""); // useState zip
    const [country, setCountry] = useState(""); // useState country
    // const [mapsUrl, setMapsUrl] = useState(""); // useState link maps

    // const toast = useToast();

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
            setAllProvince(get.data);
            console.log("allprovince", get);
        } catch (error) {
            console.log(error);
        }
    };

    const provinces = allProvince.map((val, idx) => {
        return { value: val.id, label: val.name };
    });

    // Regency Select
    const [allRegency, setAllRegency] = useState([]);

    const selectRegency = useChakraSelectProps({
        isMulti: false,
        value: regency,
        onChange: setRegency,
    });

    const getRegency = async () => {
        try {
            let get = await axios.post(`${API_URL}/property/getregency`, {
                province_id: province.value,
            });
            setAllRegency(get.data);
            console.log("allregency", get);
        } catch (error) {
            console.log(error);
        }
    };

    const regencies = allRegency.map((val, idx) => {
        return { value: val.id, label: val.name };
    });

    useEffect(() => {
        getProvince();
    }, []);

    useEffect(() => {
        getRegency();
    }, [province]);

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
                    regencyId: regency.value,
                    provinceId: province.value,
                    zipcode: zipcode,
                    country: country,
                })
            );
            console.log("formData", formData);

            if (fileProperty != null) {
                let temp = [...fileProperty];
                temp.forEach((val, idx) => {
                    formData.append("images", temp[idx]);
                });
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

    console.log("regencies", regencies);
    console.log("description", description);
    console.log("fileProperty", fileProperty);
    console.log("province", province);
    // console.log("printChosenFiles",printChosenFiles);

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
                                        isRequired
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
                                    borderColor={"gray.200"}
                                    borderRadius={"lg"}
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
                                            multiple
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
                                        {fileProperty ? (
                                            <>
                                                <Text alignSelf={"center"}>
                                                    Your file/files:
                                                </Text>
                                                <Box
                                                    display={"flex"}
                                                    justifyContent={"left"}
                                                >
                                                    {fileProperty ? (
                                                        Array.from(
                                                            fileProperty
                                                        ).map((file, index) => (
                                                            <Image
                                                                key={index}
                                                                src={URL.createObjectURL(
                                                                    file
                                                                )}
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
                                                        ))
                                                    ) : (
                                                        <Text>
                                                            Choose a file to
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
                                                    alignItems={"center"}
                                                    onClick={() =>
                                                        setFileProperty(null)
                                                    }
                                                >
                                                    <Text fontSize={"xl"}>
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
                            <Text>Tell us a story about your place</Text>
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
                                <Text textAlign={"right"} color={"gray.200"}>
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
                                            options={provinces}
                                            placeholder="Select province"
                                            closeMenuOnSelect={true}
                                            {...selectProvince}
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
                                            options={regencies}
                                            placeholder="Select regency"
                                            closeMenuOnSelect={true}
                                            {...selectRegency}
                                        />
                                    </FormControl>
                                </Box>

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
