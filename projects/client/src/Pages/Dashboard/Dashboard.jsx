import './Dashboard.css'
import { Text, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helper';
import Sidebar from '../../Components/Sidebar/Sidebar';


export default function Dashboard() {
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
                        <div class="home-content">
                            <div class="overview-boxes">
                                <div class="box">
                                    <div class="right-side">
                                        <div class="box-topic">Total Order</div>
                                        <div class="number">40,876</div>
                                        <div class="indicator">
                                            <i class='bx bx-up-arrow-alt'></i>
                                            <span class="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i class='bx bx-cart-alt cart'></i>
                                </div>
                                <div class="box">
                                    <div class="right-side">
                                        <div class="box-topic">Total Sales</div>
                                        <div class="number">38,876</div>
                                        <div class="indicator">
                                            <i class='bx bx-up-arrow-alt'></i>
                                            <span class="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i class='bx bxs-cart-add cart two' ></i>
                                </div>
                                <div class="box">
                                    <div class="right-side">
                                        <div class="box-topic">Total Profit</div>
                                        <div class="number">$12,876</div>
                                        <div class="indicator">
                                            <i class='bx bx-up-arrow-alt'></i>
                                            <span class="text">Up from yesterday</span>
                                        </div>
                                    </div>
                                    <i class='bx bx-cart cart three' ></i>
                                </div>
                                <div class="box">
                                    <div class="right-side">
                                        <div class="box-topic">Total Return</div>
                                        <div class="number">11,086</div>
                                        <div class="indicator">
                                            <i class='bx bx-down-arrow-alt down'></i>
                                            <span class="text">Down From Today</span>
                                        </div>
                                    </div>
                                    <i class='bx bxs-cart-download cart four' ></i>
                                </div>
                            </div>

                            <div class="sales-boxes">
                                <div class="recent-sales box">
                                    <div class="title">Recent Sales</div>
                                    <div class="sales-details">
                                        <ul class="details">
                                            <li class="topic">Date</li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>
                                            <li><a href="#">02 Jan 2021</a></li>

                                        </ul>
                                        <ul class="details">
                                            <li class="topic">Customer</li>
                                            <li><a href="#">Alex Doe</a></li>
                                            <li><a href="#">David Mart</a></li>
                                            <li><a href="#">Roe Parter</a></li>
                                            <li><a href="#">Diana Penty</a></li>

                                        </ul>
                                        <ul class="details">
                                            <li class="topic">Room</li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>
                                            <li><a href="#">Deluxe Room</a></li>

                                        </ul>
                                        <ul class="details">
                                            <li class="topic">Duration</li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>
                                            <li><a href="#">5 nights</a></li>

                                        </ul>
                                        <ul class="details">
                                            <li class="topic">Status</li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>
                                            <li><a href="#">Paid</a></li>

                                        </ul>
                                        <ul class="details">
                                            <li class="topic">Total</li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                            <li><a href="#">$204.98</a></li>
                                        </ul>
                                    </div>
                                    <div class="button">
                                        <a href="#">See All</a>
                                    </div>
                                </div>
                                <div class="top-sales box">
                                    <div class="title">Top Selling Product</div>
                                    <ul class="top-sales-details">
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Deluxe Room</span>
                                            </a>
                                            <span class="price">$1107</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Premier Room</span>
                                            </a>
                                            <span class="price">$1567</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Superior Triple</span>
                                            </a>
                                            <span class="price">$1234</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Premier Quadruple Room</span>
                                            </a>
                                            <span class="price">$2312</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Deluxe Triple Room</span>
                                            </a>
                                            <span class="price">$1456</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Deluxe 2 Single Beds</span>
                                            </a>
                                            <span class="price">$1345</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Superior Room</span>
                                            </a>
                                            <span class="price">$2345</span>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <img src="" alt="" />
                                                <span class="product">Premier King Suite</span>
                                            </a>
                                            <span class="price">$2245</span>
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