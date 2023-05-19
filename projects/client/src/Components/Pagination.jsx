import React from 'react';
import ReactPaginate from "react-paginate";
import { Flex } from "@chakra-ui/react";
import "./Pagination.css"


export default function Pagination(props) {
  const pageCount = Math.ceil(props.totalData / props.size);

  return <Flex>
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      previousLabel="<<"
      marginPagesDisplayed={1} // number of pages at the start and end of pagination
      pageCount={pageCount} // number of pages to display
      pageRangeDisplayed={3} // number of pages between breaklabel
      onPageChange={props.paginate} // function to call when number button is clicked
      activeClassName={"active"} // style
      className={"react-pagination"}
    />
  </Flex>
  }