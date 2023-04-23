import {
    Box, Button,
    Flex, Menu,
    MenuButton, MenuDivider, MenuItem, MenuList, MenuOptionGroup, Select
} from '@chakra-ui/react';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Pagination from '../../Components/Pagination';
import PropertyCard from '../../Components/PropertyCard';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { API_URL } from "../../helper";
import './FilteredProperty.css'; // import css

export default function FilteredProperty() {
    const location = useLocation();
    const token = localStorage.getItem('tempatku_login')
    const [inputLocation, setInputLocation] = useState('');
    const [showLocation, setShowLocation] = useState([]);
    const [inputCheckIn, setInputCheckIn] = useState(location?.state?.inputCheckIn);
    const [inputCheckOut, setInputCheckOut] = useState(location?.state?.inputCheckOut);

    const onSearch = (searchTerm) => {
        setInputLocation(searchTerm); //if suggestion clicked, it will be put inside the input field
        console.log("Ini adalah search : ", searchTerm)
    }

    const OnBtnCheckIn = () => {
        setInputCheckIn('');
    };

    const OnBtnCheckOut = () => {
        setInputCheckOut('');
    };

    // Get Property and Pagination

    const [showProducts, setShowProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [productName, setProductName] = useState("");
    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("property");
    const [order, setOrder] = useState("ASC");
    const [category, setCategory] = useState("");
    const [guest, setGuest] = useState(0);
    const [city, setCity] = useState(location.state?.inputLocation);

    const getAllProperty = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let res = await axios.get(
                `${API_URL}/property/filter?start=${inputCheckIn || ''}&end=${inputCheckOut || ''}&page=${page}&size=${size}&name=${productName}&sortby=${sortBy}&order=${order}&category=${category}&city=${city || ''}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("ress dari filter propertyyyy", res)
            setTotalData(res.data.datanum);
            setShowProducts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };



    console.log("locationnnnn : ", location.state)
    console.log("showww productss : ", showProducts)

    const printAllProperty = () => {
        return showProducts.map((val, idx) => {
            return <PropertyCard property={val.property} price={val.rooms[0].price} picture={val.picture_properties[0].picture} uuid={val.uuid} inputCheckIn={inputCheckIn} inputCheckOut={inputCheckOut} location={val.property_location} />
        })
    }

    const paginate = (pageNumber) => {
        setPage(pageNumber.selected)
        console.log(pageNumber.selected)
    }

    useEffect(() => {
        getAllProperty()
    }, [page, sortBy, order, category])

    return (
        <Box>
            <Box className='container-fp'>
                <SearchBar setInputLocation={setInputLocation} showLocation={showLocation}
                    inputLocation={inputLocation} inputCheckIn={inputCheckIn}
                    onSearch={onSearch} OnBtnCheckIn={OnBtnCheckIn} OnBtnCheckOut={OnBtnCheckOut}
                    setInputCheckIn={setInputCheckIn} inputCheckOut={inputCheckOut} setInputCheckOut={setInputCheckOut}
                    setPage={setPage} getAllProperty={getAllProperty} setProductName={setProductName}
                    setCity={setCity} stateUseLocation={location.state} setSortBy={setSortBy}
                    setOrder={setOrder}
                />
            </Box>
            <Box className='container-fp'>
                <Flex justifyContent={'end'}>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button}>
                            Filter
                        </MenuButton>
                        <MenuList minWidth='240px'>
                            <MenuOptionGroup defaultValue='asc' title='Order'>
                                <MenuItem value='ASC' onClick={() => {
                                    setSortBy("property");
                                    setOrder("ASC");
                                }}>
                                    A - Z
                                </MenuItem>
                                <MenuItem value='DESC' onClick={() => {
                                    setSortBy("property");
                                    setOrder("DESC");
                                }}>Z - A</MenuItem>
                                <MenuItem value='DESC' onClick={() => {
                                    setSortBy("price");
                                    setOrder("ASC");
                                }}>Price Low - High</MenuItem>
                                <MenuItem value='DESC' onClick={() => {
                                    setSortBy("price");
                                    setOrder("DESC");
                                }}>Price High - Low</MenuItem>
                            </MenuOptionGroup>
                            <MenuDivider />
                            <MenuOptionGroup title='Category'>
                                <Select placeholder='Select Category' variant='unstyled' pl='9' onChange={(e) => setCategory(e.target.value)}>
                                    <option value='Hotel'>Hotel</option>
                                    <option value='Apart'>Apartemen</option>
                                    <option value='Resort'>Resort</option>
                                </Select>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </Flex>
                <div className='property-fp'>
                    {printAllProperty()}
                </div>
            </Box>
            <Flex justify={'center'}>
                <Pagination
                    size={size}
                    totalData={totalData}
                    paginate={paginate} />
            </Flex>
            <Footer />

        </Box>
    )
}
