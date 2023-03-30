import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helper';


export default function Dashboard() {
    return (
        <>
        <Text>Welcome to your Dashboard</Text>
        </>
    )
}