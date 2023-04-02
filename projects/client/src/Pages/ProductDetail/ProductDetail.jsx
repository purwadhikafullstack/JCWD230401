import "./ProductDetail.css";
import { Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import Booking from '../../Components/Booking';
import Host from './images/host_photo.jpg';
import Bathroom from './images/bathroom.jpg';
import Bedroom1 from './images/bedroom1.jpg';
import Bedroom2 from './images/bedroom2.jpg';
import FrontHotel from './images/fronthotel.jpg';
import Pool from './images/pool.jpg';
import { BsStarFill } from "react-icons/bs";
import { FaHome, FaPaintBrush, FaMapMarkerAlt, FaHeart, FaStar } from 'react-icons/fa';

export default function ProductDetail() {

    return (
        <>
            <div className="product-details">
                <div className="product-title">
                    <h1>Apartment Puri Uluwatu</h1>
                    <div className="row">
                        <div>
                            <FaStar />
                        </div>
                        <div>
                            <p>&nbsp;5.0</p>
                        </div>
                        <div>
                            <span>57 Reviews</span>
                        </div>
                        <div>
                            <p>Location: Uluwatu, Kabupaten Badung, Bali</p>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    <div className="gallery-img-1"><img src={Pool} /></div>
                    <div><img src={Bedroom1} /></div>
                    <div><img src={Bedroom2} /></div>
                    <div><img src={FrontHotel} /></div>
                    <div><img src={Bathroom} /></div>
                </div>
                <div className="small-details">
                    <h2>Entire rental unit hosted by Michael</h2>
                    <p>2 guest &nbsp; &nbsp; 2 beds &nbsp; &nbsp; 1 bathroom</p>
                    <h4>Rp 1.340.000 / day</h4>
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

                        <p className="product-desc">Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
                        <hr className="line" />
                    </Box>
                    <Box ml='4' mt='10' display={{ base: 'none', lg: 'block' }}>
                        <Booking />
                    </Box>
                </Flex>
                <div className="map">
                    <h3>Location on map</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31541.345788385628!2d115.05704101562502!3d-8.817205999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd24ffebe892cdd%3A0xb7a1edced2ee4c50!2sPuri%20Uluwatu%20Villas!5e0!3m2!1sen!2sid!4v1680459004192!5m2!1sen!2sid" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>
                    <b>Uluwatu, Kabupaten Badung, Bali</b>
                    <p>It's like a home away from home.</p>
                </div>

                <hr className="line" />
                <div className="tenant">
                    <img src={Host} />
                    <div>
                        <h2>Hosted by Michael</h2>
                        <p>
                            <div className="row">
                                <div>
                                    <FaStar />
                                </div>
                                <div>
                                    <p>&nbsp;5.0</p>
                                </div>

                                <div>
                                    <p> &nbsp; &nbsp; 57 reviews &nbsp; &nbsp; Response rate 100% &nbsp; &nbsp; Response time: 60 min</p>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
                <a href="#" className="contact-tenant">Contact Tenant</a>
            </div>
        </>
    )
}