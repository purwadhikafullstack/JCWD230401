import './Sidebar.css'
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helper';


export default function Sidebar() {
    return (
        <>
            <link
                href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
                rel="stylesheet"
            />
            <div className="sidebar">
                <div className="sidebar-content">
                    <ul className="lists">
                        <li className="list">
                            <Link to={'/dashboard'}>
                                <a className="nav-link">
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className="link">Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-user icon"></i>
                                <span className="link">Profile</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-building-house icon"></i>
                                <span className="link">Manage Property / Room</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-wallet icon"></i>
                                <span className="link">Transaction</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-pie-chart-alt-2 icon"></i>
                                <span className="link">Report</span>
                            </a>
                        </li>
                        <li className="list">
                            <Link to={"/tenantcalendar"}>
                                <a className="nav-link">
                                    <i className="bx bx-calendar icon"></i>
                                    <span className="link">Calendar</span>
                                </a>
                            </Link>
                        </li>
                    </ul>

                    <div className="bottom-cotent">
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-cog icon"></i>
                                <span className="link">Settings</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#" className="nav-link">
                                <i className="bx bx-log-out icon"></i>
                                <span className="link">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </div>
        </>
    )
}