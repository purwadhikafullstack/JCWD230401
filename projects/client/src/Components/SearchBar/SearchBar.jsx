import { Box } from '@chakra-ui/react'
import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
    return (
        <Box>
            <Box className='search-bar-fp'>
                <form>
                    <div className="location-input-fp">
                        <label>Property</label>
                        <input type="text" placeholder="Property Name"
                            onChange={(e) => props.setProductName(e.target.value)}
                        // value={props.inputLocation}
                        />
                        <div className="dropdown-fp">
                            {props.showLocation.filter(item => {
                                const searchTerm = props.inputLocation.toLowerCase();
                                const city = item.city.toLowerCase();
                                return (searchTerm && city.startsWith(searchTerm) && city !== searchTerm);
                            }
                            ).slice(0, 5) //will show only first 5 items di location input field
                                .map((item) =>
                                (<div
                                    onClick={() => props.onSearch(item.city)}
                                    className="dropdown-row-fp"
                                    key={item.city}
                                >{item.city}</div>))}
                        </div>
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" placeholder="Location Name"
                            onChange={(e) => props.setCity(e.target.value)}
                            defaultValue={props.stateUseLocation.inputLocation}
                        />
                    </div>
                    <div>
                        <label>Check in</label>
                        <input
                            type={props.inputCheckIn}
                            placeholder="Choose Date" onClick={props.OnBtnCheckIn}
                            onChange={(e) => props.setInputCheckIn(e.target.value)}
                            defaultValue={props.stateUseLocation.inputCheckIn}
                        />
                    </div>
                    <div>
                        <label>Check out</label>
                        <input
                            type={props.inputCheckOut}
                            placeholder="Choose Date" onClick={props.OnBtnCheckOut}
                            onChange={(e) => props.setInputCheckOut(e.target.value)}
                            defaultValue={props.stateUseLocation.inputCheckOut}
                        />
                    </div>
                    <div>
                        <label>Guest</label>
                        <input type="number" placeholder="Add Guest" />
                    </div>
                    <button type="button"
                        onClick={() => {
                            props.setPage(0);
                            props.getAllProperty();
                            props.setCity("")
                        }}>
                        {/* <img src={Search} /> */}
                    </button>
                </form>
            </Box>
        </Box>
    )
}
