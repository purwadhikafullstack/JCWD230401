import {
    Box, Button, useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import "./RoomCard.css";
import Swiper from "swiper";
import SwiperCarousel from "../SwiperCarousel/SwiperCarousel";
import noimage from '../../assets/noimage.png'
import { API_URL, API_URL_IMG } from "../../helper";
import { Link } from "react-router-dom";

export default function RoomCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Box onClick={onOpen} cursor='pointer'>
                <div class="house">
                    <div class="house-img">
                        <img src={!props.picture?.length ? noimage : `${API_URL_IMG}${props?.picture[0].picture}`} />
                    </div>
                    <div class="house-info">
                        <p>Room Detail</p>
                        <h3>{props?.name}</h3>
                        {/* <p>1 Bedroom / 1 Bathroom / Wifi / Kitchen</p> */}
                        <p>{props?.description}</p>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                        <i class="far fa-star"></i>
                        <div class="house-price">
                            <p>{props?.capacity} Guest</p>
                            <h4>{Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props?.price || 0)}<span>/ day</span></h4>
                            <br />
                            {/* <p><BookingButton /></p> */}
                            <Link to={`/payment/${props.uuid}`} state={{ inputCheckIn: props.inputCheckIn, inputCheckOut: props.inputCheckOut }}>
                                <Button colorScheme={'red'}>Book Now!</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                        <ModalHeader>Picture Room</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <SwiperCarousel pictureRoom={props.picture} />
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}
