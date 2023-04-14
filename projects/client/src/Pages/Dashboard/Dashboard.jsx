import './Dashboard.css'
import { Text, Box, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helper';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';


export default function Dashboard() {
    const name = useSelector((state) => state.authReducer.name); // mengambil data dari reducer //props drmn?

    return (
        <>
            <Box display='flex'>
                {/* Side Bar */}
                <Box>
                    <Sidebar />
                </Box>
                {/* Main Content */}
                <Box w='full'>
                    <Box>
                        <Heading ml='6' my='10'>
                            Property Dashboard
                            <Text fontSize={'24'} fontWeight={'medium'} my='2'>Welcome, {name} 👋</Text>
                        </Heading>
                        <div className="home-content">
                            <div className="overview-boxes">
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Total Order</div>
                                        <div className="number">40,876</div>
                                        <div className="indicator">
                                            <i className='bx bx-up-arrow-alt'></i>
                                            <span className="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i className='bx bx-cart-alt cart'></i>
                                </div>
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Total Sales</div>
                                        <div className="number">38,876</div>
                                        <div className="indicator">
                                            <i className='bx bx-up-arrow-alt'></i>
                                            <span className="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i className='bx bxs-cart-add cart two' ></i>
                                </div>
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Total Profit</div>
                                        <div className="number">$12,876</div>
                                        <div className="indicator">
                                            <i className='bx bx-up-arrow-alt'></i>
                                            <span className="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i className='bx bx-cart cart three' ></i>
                                </div>
                                <div className="box">
                                    <div className="right-side">
                                        <div className="box-topic">Total Return</div>
                                        <div className="number">11,086</div>
                                        <div className="indicator">
                                            <i className='bx bx-down-arrow-alt down'></i>
                                            <span className="text">Down From Today</span>
                                        </div>
                                    </div>
                                    <i className='bx bxs-cart-download cart four' ></i>
                                </div>
                            </div>

                            <div className="sales-boxes">
                                <div className="recent-sales box">
                                    <div className="title">Recent Sales</div>
                                    <div className="sales-details">
                                        <ul className="details">
                                            <li className="topic">Date</li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Customer</li>
                                            <li><a href="#">Alex Doe</a></li>
                                            <li><a href="#">David Mart</a></li>
                                            <li><a href="#">Roe Parter</a></li>
                                            <li><a href="#">Diana Penty</a></li>

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Room</li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Duration</li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Status</li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>

                                        </ul>
                                        <ul className="details">
                                            <li className="topic">Total</li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                        </ul>
                                    </div>
                                    <div className="button">
                                        <a href="#">See All</a>
                                    </div>
                                </div>
                                <div className="top-sales box">
                                    <div className="title">Top Selling Product</div>
                                    <ul className="top-sales-details">
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Deluxe Room</span>
                                            </a>
                                            <span className="price">$1107</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Premier Room</span>
                                            </a>
                                            <span className="price">$1567</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Superior Triple</span>
                                            </a>
                                            <span className="price">$1234</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Premier Quadruple Room</span>
                                            </a>
                                            <span className="price">$2312</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Deluxe Triple Room</span>
                                            </a>
                                            <span className="price">$1456</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Deluxe 2 Single Beds</span>
                                            </a>
                                            <span className="price">$1345</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Superior Room</span>
                                            </a>
                                            <span className="price">$2345</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span className="product">Premier King Suite</span>
                                            </a>
                                            <span className="price">$2245</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Box>
            </Box>

        </>
    )
}