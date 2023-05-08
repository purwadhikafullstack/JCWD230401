import {
    Box, Container, Text, Flex, UnorderedList, ListItem, useDisclosure, Button, Collapse, Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
// import React, { useState } from 'react'
// import DatePickerCalendar from '../../Components/DatePickerCalendar'
// import Footer from '../../Components/Footer'
// import RoomCard from '../../Components/RoomCard'
import SwiperCarousel from '../../Components/SwiperCarousel/SwiperCarousel'

import "./PropertyDetail.css";
import { FaHome, FaPaintBrush, FaMapMarkerAlt, FaHeart, FaStar } from 'react-icons/fa';
import { API_URL, API_URL_IMG, capitalizeFirstWord, formatRupiah } from '../../helper';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoomCard from '../../Components/RoomCard/RoomCard';
import Booking from '../../Components/Booking';
import noimage from '../../assets/noimage.png';
import Review from '../../Components/Review';


export default function PropertyDetail() {
    let token = localStorage.getItem("tempatku_login");

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);
    // const { isOpen, onToggle } = useDisclosure()

    const params = useParams();
    const location = useLocation();
    console.log("paramssss", params)
    console.log("useLocation property detail", location)

    const [propertyDetail, setPropertyDetail] = useState([]);
    const [regency, setRegency] = useState('');
    const [propertyPrice, setPropertyPrice] = useState(0)
    const [tenantEmail, setTenantEmail] = useState('')
    const getPropertyDetail = async () => {
        let get = await axios.get(`${API_URL}/property/getpropertydetail?uuid=${params.uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setPropertyDetail(get.data[0]);
        setRegency(get.data[0].property_location.regency.name);
        setPropertyPrice(get.data[0].rooms[0].price)
        setTenantEmail(get.data[0].user.email)

    }

    console.log("proeprtyy detaillll : ", propertyDetail);

    // MODAL
    const modalProperty = useDisclosure()

    // Get Room Available
    const [inputCheckIn, setInputCheckIn] = useState(location.state.inputCheckIn)
    const [inputCheckOut, setInputCheckOut] = useState(location.state.inputCheckOut)
    const [roomAvailable, setRoomAvailable] = useState([])
    const getRoomAvailable = async () => {
        let get = await axios.get(`${API_URL}/property/getroomavailable?uuid=${params.uuid}&start=${inputCheckIn}&end=${inputCheckOut}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRoomAvailable(get.data);
    }
    console.log("room available", roomAvailable);

    const printRoomCard = () => {
        return roomAvailable.map((val, idx) => {
            return <RoomCard name={val.room_category.name} description={val.description} price={val.price} // kalo ada special price gimana ?
                capacity={val.capacity} picture={val.picture_rooms} uuid={val.uuid}
                inputCheckIn={inputCheckIn} inputCheckOut={inputCheckOut} />
        })
    }

    const [pictureProperty, setPictureProperty] = useState([])
    const getPictureProperty = async () => {
        let get = await axios.get(`${API_URL}/property/getpictureproperty?uuid=${params.uuid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        setPictureProperty(get.data);
        console.log("picture property", get);
    }

    useEffect(() => {
        getPropertyDetail();
        getRoomAvailable();
        getPictureProperty();
    }, [])

    useEffect(() => {
        getRoomAvailable();
    }, [inputCheckIn, inputCheckOut])



    return (
        <>
            <div className="product-details">
                <div className="product-title">
                    <h1>{propertyDetail?.property}</h1>
                    <div className="row">
                        <div>
                            <FaStar color='orange' />
                        </div>
                        <div>
                            <p>&nbsp;5.0</p>
                        </div>
                        <div>
                            <span>57 Reviews</span>
                        </div>
                        <div>
                            <p>Location:
                                {capitalizeFirstWord(regency)}
                                , {propertyDetail?.property_location?.country}</p>
                        </div>
                    </div>
                </div>
                <Box onClick={modalProperty.onOpen} cursor='pointer'>
                    <div className="gallery">
                        <div className="gallery-img-1">
                            <img src={!pictureProperty[0] ? noimage : `${API_URL_IMG}${pictureProperty[0]?.picture}`} />
                        </div>
                        <div>
                            <img src={!pictureProperty[1] ? noimage : `${API_URL_IMG}${pictureProperty[1]?.picture}`} />
                        </div>
                        <div>
                            <img src={!pictureProperty[2] ? noimage : `${API_URL_IMG}${pictureProperty[2]?.picture}`} />
                        </div>
                        <div>
                            <img src={!pictureProperty[3] ? noimage : `${API_URL_IMG}${pictureProperty[3]?.picture}`} />
                        </div>
                        <div>
                            <img src={!pictureProperty[4] ? noimage : `${API_URL_IMG}${pictureProperty[4]?.picture}`} />
                        </div>


                    </div>
                </Box>
                <Modal isOpen={modalProperty.isOpen} onClose={modalProperty.onClose}>
                    {/* <ModalOverlay /> */}
                    <ModalContent>
                        <ModalHeader>Picture Property</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <SwiperCarousel pictureProperty={pictureProperty} />
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <div className="small-details">
                    <h2>Hosted by {propertyDetail?.user?.user_detail?.name}</h2>
                    <p>Facility .........</p>
                    <h4>{formatRupiah(propertyPrice)} / day</h4>
                </div>
                <Flex w='full'>
                    <Box w='full'>
                        <hr className="line" />
                        <ul className="details-list">
                            <li><i><FaHome /></i>Entire Home
                                <span>You will have the entire flat for you.</span>
                            </li>
                            <li><i><FaPaintBrush /></i>Enhanced Clean
                                <span>This host has committed to tempatku's cleaning process.</span>
                            </li>
                            <li><i><FaMapMarkerAlt /></i>Great Location
                                <span>90% of recent guests gave the location a 5 star rating.</span>
                            </li>
                            <li><i><FaHeart /></i>Great Check-in Experience
                                <span>100% of recent guests gave the check-in process a 5 star rating.</span>
                            </li>
                        </ul>
                        <hr className="line" />

                        <p className="product-desc">
                            {propertyDetail?.description}
                        </p>
                        <hr className="line" />
                    </Box>
                    <Box ml='4' mt='10' display={{ base: 'none', lg: 'block' }}>
                        <Booking
                            inputCheckIn={inputCheckIn}
                            inputCheckOut={inputCheckOut}
                            setInputCheckIn={setInputCheckIn}
                            setInputCheckOut={setInputCheckOut} />
                    </Box>
                </Flex>
                <Box>
                    {/* BUATIN COMPONENT KALO ROOM HABIS */}
                    {
                        roomAvailable.length ? printRoomCard() : <h1>NO ROOM AVAILABLE</h1>
                    }
                </Box>
                <div className="map">
                    <h3>Location on map</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31541.345788385628!2d115.05704101562502!3d-8.817205999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24ffebe892cdd%3A0xb7a1edced2ee4c50!2sPuri%20Uluwatu%20Villas!5e0!3m2!1sen!2sid!4v1680459004192!5m2!1sen!2sid" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>
                    <b>{capitalizeFirstWord(regency)}, {propertyDetail?.property_location?.country}</b>
                    <p>It's like a home away from home.</p>
                </div>

                <hr className="line" />
                <div className="tenant">
                    {/* Di database belom ada isinya jd sementara pake image ini */}
                    <img style={{ width: '70px', height: '70px', objectFit: 'cover' }} src={'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'} />
                    <div>
                        <h2>Hosted by {propertyDetail?.user?.user_detail?.name}</h2>
                        <p>
                            <div className="row">
                                <div>
                                    <p>{tenantEmail}</p>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
                <a href={`mailto:${tenantEmail}`} className="contact-tenant">Contact Tenant</a>

                <hr className="line" />

                {/* REVIEW */}
                <Box mb='20'>
                    <Text fontSize={'23px'} fontWeight={500} mb='10'>
                        Review
                    </Text>
                    <Flex gap='5' wrap={'wrap'}>
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                        <Review />
                    </Flex>
                </Box>
            </div>
        </>
    )
}
