import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../helper";
import PropertyTable from "../../Components/PropertyTable";
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../Components/Pagination";

function PropertyList(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [dataAllProperty, setDataAllProperty] = useState([]);
    const [property, setProperty] = useState("");
    const [totalData, setTotalData] = React.useState(0);

    const defaultPage = parseInt(params.get("page")) - 1 || 0;
    const defaultSort = params.get("sortby") || "property";
    const defaultOrder = params.get("orderby") || "ASC";
    const defaultFilter = params.get("filter") || "";
    const [page, setPage] = React.useState(defaultPage);
    const [size] = React.useState(10);
    const [sortby, setSortby] = React.useState(defaultSort);
    const [order, setOrder] = React.useState(defaultOrder);
    const [filter, setFilter] = React.useState(defaultFilter);

    console.log("dataAllProperty:", dataAllProperty);

    const printPropertyData = () => {
        const actualRowNumber = page * size;
        return dataAllProperty.map((val, idx) => {
            const rowNumber = actualRowNumber + idx + 1;
            return (
                <PropertyTable
                    key={val.uuid}
                    idx={rowNumber}
                    property={val.property}
                    address={val.property_location.address}
                    uuid={val.uuid}
                    getAllPropertyList={getAllPropertyList}
                />
            );
        });
    };

    const getAllPropertyList = async () => {
        try {
            let token = localStorage.getItem("tempatku_login");
            let get = await axios.get(
                `${API_URL}/property/getlistproperty?page=${page}&size=${size}&sortby=${property}&order=${order}&property=${filter}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDataAllProperty(get.data.data);
            setTotalData(get.data.datanum);
            console.log("get property list", get.data.data);
            console.log("get property list only", get);
        } catch (error) {
            console.log(error);
        }
    };

    const paginate = (pageNumber) => {
        setPage(pageNumber.selected);
        params.set("page", pageNumber.selected + 1);
    };

    useEffect(() => {
        getAllPropertyList();
    }, []);

    useEffect(() => {
        getAllPropertyList();
    }, [sortby, order, page]);
    return (
        <Flex>
            <Box mt="4" w={"full"}>
                <TableContainer>
                    <Table variant="simple" color={"#EEEEEE"}>
                        <Thead>
                            <Tr>
                                <Th fontSize={"lg"}>No</Th>
                                <Th fontSize={"lg"}>Property</Th>
                                <Th fontSize={"lg"}>Address</Th>
                                <Th fontSize={"lg"}></Th>
                            </Tr>
                        </Thead>
                        {printPropertyData()}
                    </Table>
                </TableContainer>

                {
                    <Flex justify="center">
                        <Pagination
                            paginate={paginate}
                            size={size}
                            totalData={totalData}
                        />
                    </Flex>
                }
            </Box>
        </Flex>
    );
}

export default PropertyList;
