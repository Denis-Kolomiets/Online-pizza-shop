import style from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'
const Pagination = ({ setFirstIndex, setLastIndex }) => {
  const clickPaginate = (e) => {
    switch (e) {
      case 1:
        setFirstIndex(0 * (e - 1))
        setLastIndex(8 * e)
        break
      case 2:
        setFirstIndex(8 * (e - 1))
        setLastIndex(8 * e)
        break
      case 3:
        setFirstIndex(8 * (e - 1))
        setLastIndex(8 * e)
        break
      case 4:
        setFirstIndex(8 * (e - 1))
        setLastIndex(8 * e)
        break
    }
  }
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => clickPaginate(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={4}
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pagination
