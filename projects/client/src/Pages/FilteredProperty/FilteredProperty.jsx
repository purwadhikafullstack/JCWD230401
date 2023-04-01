import React, { useState, useEffect, Component } from 'react'
import './FilteredProperty.css' // import css
import axios from "axios";
import { API_URL } from "../../helper";
import {
    Box, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    Select
} from '@chakra-ui/react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import PropertyCard from '../../Components/PropertyCard';
import { useLocation } from 'react-router-dom';
import CardProperty from '../../Components/Card/CardProperty';
import Pagination from '../../Components/Pagination';
import Footer from '../../Components/Footer';
import Slider from "react-slick";
import Carousel from '../../Components/Carousel';

export default function FilteredProperty() {
    const [inputTypeIn, setInputTypeIn] = useState('');
    const [inputTypeOut, setInputTypeOut] = useState('');
    const [allCategory, setAllCategory] = useState([]);
    const [allProperty, setAllProperty] = useState([]);
    const token = localStorage.getItem('tempatku_login')
    const [inputLocation, setInputLocation] = useState('');
    const [showLocation, setShowLocation] = useState([]);
    const [inputCheckIn, setInputCheckIn] = useState('');
    const [inputCheckOut, setInputCheckOut] = useState('');

    const onSearch = (searchTerm) => {
        setInputLocation(searchTerm); //if suggestion clicked, it will be put inside the input field
        console.log("Ini adalah search : ", searchTerm)
    }

    const OnBtnCheckIn = () => {
        setInputCheckIn('date');
    };

    const OnBtnCheckOut = () => {
        setInputCheckOut('date');
    };

    // Get Property and Pagination

    const location = useLocation();
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
            let res = await axios.post(
                `${API_URL}/property/filter?page=${page}&size=${size}&name=${productName}&sortby=${sortBy}&order=${order}&category=${category}&city=${city}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("ress dari filter propertyyyy", res.data)
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
            // return <CardProperty property={val.property} price={val.rooms[0].price} />
            return <PropertyCard property={val.property} price={val.rooms[0].price} picture={val.picture_properties[0].picture}/>
        })
    }

    const paginate = (pageNumber) => {
        setPage(pageNumber)
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
                <Pagination
                    size={size}
                    page={page}
                    totalData={totalData}
                    paginate={paginate} />
            </Box>
            <Footer />
        </Box>
    )
}
