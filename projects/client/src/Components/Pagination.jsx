import React from 'react'
import ReactPaginate from "react-paginate";
import { Flex } from "@chakra-ui/react";

export default function Pagination(props) {
  // const pageNumber = [];
  // for (let i = 1; i <= Math.ceil(props.totalData / props.size); i++) {
  //   pageNumber.push(i)
  // }
  // console.log("propssss", Math.ceil(props.totalData / props.size))
  // return (
  //   <nav aria-label="Page navigation example">
  //     <ul class="pagination justify-content-center">
  //       {pageNumber.map((number) => {
  //         return <li class="page-item" style={{cursor: "pointer"}}>
  //           <a class="page-link" onClick={() => props.paginate(number - 1)}>
  //             {number}
  //           </a>
  //         </li>
  //       })}
  //     </ul>
  //   </nav>
  // )



  console.log("paginationnnn")

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
        // =======================================================================smua yang dibawah ini styling aja
        // containerClassName={"pagination"}
        // pageClassName={"page-item"}
        // pageLinkClassName={"page-link"}
        // previousClassName={"page-item"}
        // previousLinkClassName={"page-link"}
        // nextClassName={"page-item"}
        // nextLinkClassName={"page-link "}
        // breakClassName={"page-item"}
        // breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </Flex>

}
