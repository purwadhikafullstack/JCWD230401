import "./Landing.css";
import React, { useState } from 'react';
import {
    Box, Heading, Select
} from '@chakra-ui/react';
import Footer from "../../Components/Footer";
import Search from './images/search.png';
import PropertyCard from "../../Components/PropertyCard"
import Homestays1 from './images/image-s1.png';
import Apartments1 from './images/image-s2.png';
import Hotels1 from './images/image-s3.png';
import Villas1 from './images/image-s4.png';
import Resorts1 from './images/image-s5.png';
import GuestHouse1 from './images/image-s6.png';
import Jakarta1 from './images/jakarta-1.jpg';
import Canggu1 from './images/canggu-1.jpg';
import Uluwatu1 from './images/uluwatu-1.jpg';
import Kuta1 from './images/kuta-1.jpg';
import Ubud1 from './images/ubud-1.jpg';
import Bandung1 from './images/bandung-1.jpg';
import Bali1 from './images/bali-1.png';
import NusaPenida1 from './images/nusapenida-1.png';


export default function Landing() {
    const [inputTypeIn, setInputTypeIn] = useState('');
    const [inputTypeOut, setInputTypeOut] = useState('');

    const OnBtnCheckIn = () => {
        setInputTypeIn('date');
    };
    const OnBtnCheckOut = () => {
        setInputTypeOut('date');

    };
    // const onBlurInput = () => {
    //     setInputTypeIn('');
    //     setInputTypeOut('');
    //   };
    
    return (
        <>
            {/* BANNER */}
            <Box className='header'>
                <Box className='container'>
                    <Heading as='h1'>
                        Find Your Next Stay
                    </Heading>
                    {/* SEARCH BAR */}
                    <Box className='search-bar'>
                        <form>
                            <div className="location-input">
                                <label>Location</label>
                                {/* <input type="text" placeholder="Where are you going?" /> */}
                                {/* Should be input text and suggestions show B --> batam, bandung, bali */}
                                <Select placeholder='Where are you going?'
                                textColor={'gray.400'}
                                textAlign={'left'}
                                variant='unstyled'
                                icon={''}
                                py={{base:'4',lg:'0'}}
                                >
                                    {/* Popular destinations nearby */}
                                    <option value='option1'>Ubud</option>
                                    <option value='option2'>Bali</option>
                                    <option value='option3'>Canggu</option>
                                    <option value='option4'>Uluwatu</option>
                                    <option value='option5'>Jakarta</option>
                                    <option value='option6'>Bandung</option>
                                    <option value='option7'>Yogyakarta</option>
                                    <option value='option8'>Semarang</option>
                                    <option value='option9'>Nusa Penida</option>
                                    <option value='option10'>Surabaya</option>
                                </Select>
                            </div>
                            <div>
                                <label>Check in</label>
                                <input type={inputTypeIn} placeholder="Add Date" onClick={OnBtnCheckIn} 
                                // onBlur={onBlurInput}
                                />
                            </div>
                            <div>
                                <label>Check out</label>
                                <input type={inputTypeOut} placeholder="Add Date" onClick={OnBtnCheckOut} 
                                // onBlur={onBlurInput}
                                />
                            </div>
                            <div>
                                <label>Guest</label>
                                <input type="text" placeholder="Add Guest" />
                            </div>
                            <button type="submit">
                                <img src={Search} />
                            </button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Box className='container'>
                {/* SPECIAL DEALS */}
                <div className="special-offers">
                    <p className="special-offers-flag">HOLIDAY SALE</p>
                    <h3>Special Offers</h3>
                    <p>Get the best prices on 20,000+ properties the best prices on.</p>
                    <a href="#" class="special-offers-btn">See Deals</a>
                </div>
                <Heading as='h2'>
                    Browse by property type
                </Heading>
                <br />
                {/* PROPERTY TYPE */}
                <div className="property-type">
                    <div>
                        <img src={Hotels1} />
                        <span>
                            <h3>Hotels</h3>
                        </span>
                    </div>
                    <div>
                        <img src={Apartments1} />
                        <span>
                            <h3>Apartments</h3>
                        </span>
                    </div>
                    <div>
                        <img src={Resorts1} />
                        <span>
                            <h3>Resorts</h3>
                        </span>
                    </div>
                    <div>
                        <img src={Villas1} />
                        <span>
                            <h3>Villas</h3>
                        </span>
                    </div>
                    <div>
                        <img src={GuestHouse1} />
                        <span>
                            <h3>Guest houses</h3>
                        </span>
                    </div>
                    <div>
                        <img src={Homestays1} />
                        <span>
                            <h3>Homestays</h3>
                        </span>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <Heading as='h2'>
                    Top Destinations
                </Heading>
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
                    <h3>Sharing <br />Is Earning Now</h3>
                    <p>Great opportunity to make money by <br />sharing your extra space.</p>
                    <a href="#" class="cta-btn">Become a Tenant</a>
                </div>
                <Heading as='h2'>
                    Recommended for you
                </Heading>
                {/* PROPERTY RECOMMENDATIONS */}
                <br />
                <div className="recommendations">
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                    <PropertyCard />
                </div>
                <a href="#" className="see-more-btn">See more properties</a>
            </Box>
            <br />
            <br />
            <br />
            <Footer />
        </>
    )
}