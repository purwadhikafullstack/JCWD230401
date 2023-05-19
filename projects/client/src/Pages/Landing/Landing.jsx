import "./Landing.css";
import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Footer from "../../Components/Footer";
import Search from "./images/search.png";
import PropertyCard from "../../Components/PropertyCard";
import Homestays1 from "./images/image-s1.png";
import Apartments1 from "./images/image-s2.png";
import Hotels1 from "./images/image-s3.png";
import Villas1 from "./images/image-s4.png";
import Resorts1 from "./images/image-s5.png";
import GuestHouse1 from "./images/image-s6.png";
import Jakarta1 from "./images/jakarta-1.jpg";
import Canggu1 from "./images/canggu-1.jpg";
import Uluwatu1 from "./images/uluwatu-1.jpg";
import Kuta1 from "./images/kuta-1.jpg";
import Ubud1 from "./images/ubud-1.jpg";
import Bandung1 from "./images/bandung-1.jpg";
import Bali1 from "./images/bali-1.png";
import NusaPenida1 from "./images/nusapenida-1.png";
import axios from "axios";
import { API_URL, API_URL_IMG } from "../../helper";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Landing() {
    const [inputTypeIn, setInputTypeIn] = useState("");
    const [inputTypeOut, setInputTypeOut] = useState("");
    const [allCategory, setAllCategory] = useState([]);
    const [allProperty, setAllProperty] = useState([]);
    const token = localStorage.getItem("tempatku_login");
    const [inputLocation, setInputLocation] = useState("");

    const [showLocation, setShowLocation] = useState([]);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guest, setGuest] = useState(5);
    // Get current date
    const currentDate = new Date();
    // Set the minDate prop to the current date to disable yesterday and earlier dates
    const minDate = currentDate;
    // const highlightDates = (date) => {
    //     if (checkInDate && checkOutDate) {
    //         return date >= checkInDate && date <= checkOutDate;
    //     } else {
    //         return false;
    //     }
    // };
    //api to fetch search result
    const onSearch = (searchTerm) => {
        setInputLocation(searchTerm); //if suggestion clicked, it will be put inside the input field
        console.log("Ini adalah search : ", searchTerm);
    };

    const getAllLocations = async () => {
        try {
            let response = await axios.get(`${API_URL}/location/list`, {
                city: showLocation,
            });
            // console.log("ini response.data dari getAllLocations 🪶 : ", response.data.data);
            setShowLocation(response.data.data);
        } catch (error) {
            console.log("ini error dari getAllLocations:", error);
        }
    };

    const navigate = useNavigate();

    // Jalanin fungsi getAllLocations
    React.useEffect(() => {
        getAllLocations();
    }, [inputLocation]);

    // Check In Check Out
    const [inputCheckIn, setInputCheckIn] = useState("");
    const [inputCheckOut, setInputCheckOut] = useState("");

    const OnBtnCheckIn = () => {
        setInputCheckIn("date");
    };
    const OnBtnCheckOut = () => {
        setInputCheckOut("date");
    };
    // const onBlurInput = () => {
    //     setInputTypeIn('');
    //     setInputTypeOut('');
    //   };

    const getAllCategory = async () => {
        let get = await axios.get(`${API_URL}/category`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setAllCategory(get.data);
    };

    const printAllCategory = () => {
        console.log("all categoryyyy", allCategory);
        return allCategory.map((val, idx) => {
            return (
                <div>
                    <img src={`${API_URL_IMG}${val.picture}`} />
                    <span>
                        <h3>{val.category}</h3>
                    </span>
                </div>
            );
        });
    };

    const getAllProperty = async () => {
        let get = await axios.get(`${API_URL}/property`);
        console.log("get all property", get);
        setAllProperty(get.data);
    };

    const printAllProperty = () => {
        return allProperty.map((val, idx) => {
            return <PropertyCard property={val.property} picture={val.picture_properties[0]?.picture}
                location={val.property_location} price={val.rooms[0]?.price} uuid={val.uuid} />
        })
    }

    const handleSearch = () => {
        navigate("/property", {
            state: {
                inputLocation: inputLocation,
                inputCheckIn: inputCheckIn,
                inputCheckOut: inputCheckOut,
                guest: guest,
            },
        });
    };

    useEffect(() => {
        getAllCategory();
        getAllProperty();
    }, []);

    return (
        <>
            {/* BANNER */}
            <Box className="header">
                <Box className="container">
                    <Heading as="h1">Find Your Next Stay</Heading>
                    {/* SEARCH BAR */}
                    <Box className="search-bar">
                        <form>
                            <div className="location-input">
                                <label>Location</label>
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    onChange={(e) =>
                                        setInputLocation(e.target.value)
                                    }
                                    value={inputLocation}
                                />
                                <div className="dropdown">
                                    {showLocation
                                        .filter((item) => {
                                            const searchTerm =
                                                inputLocation.toLowerCase();
                                            const city =
                                                item.city.toLowerCase();
                                            return (
                                                searchTerm &&
                                                city.startsWith(searchTerm) &&
                                                city !== searchTerm
                                            );
                                        })
                                        .slice(0, 5) //will show only first 5 items di location input field
                                        .map((item) => (
                                            <div
                                                onClick={() =>
                                                    onSearch(item.city)
                                                }
                                                className="dropdown-row"
                                                key={item.city}
                                            >
                                                {item.city}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div>
                                <label>Check in</label>
                                <DatePicker
                                    selected={checkInDate}
                                    onChange={(date) => setCheckInDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Choose Date"
                                    minDate={minDate}
                                    // highlightDates={highlightDates}
                                    // calendarClassName="highlight"
                                    shouldCloseOnSelect={false}
                                />
                            </div>
                            <div>
                                <label>Check out</label>
                                <DatePicker
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Choose Date"
                                    minDate={
                                        checkInDate
                                            ? new Date(
                                                checkInDate.getTime() +
                                                24 * 60 * 60 * 1000
                                            )
                                            : undefined
                                    }
                                    // highlightDates={highlightDates}
                                    // calendarClassName="highlight"
                                    shouldCloseOnSelect={false}
                                />
                            </div>
                            <div>
                                <label>Guest</label>
                                <input
                                    type="number"
                                    placeholder="Add Guest"
                                    onChange={(e) => setGuest(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSearch}
                                style={{ background: "#D3212D" }}
                            >
                                <img src={Search} />
                            </button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box className="container">
                {/* SPECIAL DEALS */}
                <div className="special-offers">
                    <p className="special-offers-flag">HOLIDAY SALE</p>
                    <h3>Special Offers</h3>
                    <p>
                        Get the best prices on 20,000+ properties the best
                        prices on.
                    </p>
                    <a href="#" class="special-offers-btn">
                        See Deals
                    </a>
                </div>
                <Heading as="h2">Browse by property type</Heading>
                <br />
                {/* PROPERTY TYPE */}
                <div className="property-type">{printAllCategory()}</div>
                <br />
                <br />
                <br />
                <Heading as="h2">Top Destinations</Heading>
                <br />
                {/* LOCATIONS */}
                <div className="locations">
                    <div>
                        <img src={Bali1} />
                        <p>Bali</p>
                    </div>
                    <div>
                        <img src={Jakarta1} />
                        <p>Jakarta</p>
                    </div>
                    <div>
                        <img src={Canggu1} />
                        <p>Canggu</p>
                    </div>
                    <div>
                        <img src={Uluwatu1} />
                        <p>Uluwatu</p>
                    </div>
                    <div>
                        <img src={Ubud1} />
                        <p>Ubud</p>
                    </div>
                    <div>
                        <img src={Bandung1} />
                        <p>Bandung</p>
                    </div>
                    <div>
                        <img src={Kuta1} />
                        <p>Kuta</p>
                    </div>
                    <div>
                        <img src={NusaPenida1} />
                        <p>Nusa Penida</p>
                    </div>
                </div>
                {/* CALL TO ACTION */}
                <div className="cta">
                    <h3>
                        Sharing <br />
                        Is Earning Now
                    </h3>
                    <p>
                        Great opportunity to make money by <br />
                        sharing your extra space.
                    </p>
                    <a
                        href="#"
                        class="cta-btn"
                        onClick={() => navigate("/tenantregister")}
                    >
                        Become a Tenant
                    </a>
                </div>
                <Heading as="h2">Recommended for you</Heading>
                {/* PROPERTY RECOMMENDATIONS */}
                <br />
                <div className="recommendations">
                    {/* {printAllProperty()} */}
                </div>
                <button onClick={() => navigate('/property')} type='button' className="see-more-btn">See more properties</button>
            </Box>
            <br />
            <br />
            <br />
            <Footer />
        </>
    );
}
