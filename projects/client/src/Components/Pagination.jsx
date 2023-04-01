import React from 'react'

export default function Pagination(props) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(props.totalData / props.size); i++) {
    pageNumber.push(i)
  }
  console.log("propssss", Math.ceil(props.totalData / props.size))
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        {pageNumber.map((number) => {
          return <li class="page-item" style={{cursor: "pointer"}}>
            <a class="page-link" onClick={() => props.paginate(number - 1)}>
              {number}
            </a>
          </li>
        })}
      </ul>
    </nav>
  )
}
