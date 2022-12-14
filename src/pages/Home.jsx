import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Categories from '../components/Сategories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import qs from 'qs'
import pizzas from '../data/pizzas'
import Pagination from '../Pagination'
import { useRef } from 'react'
import sortList from '../data/sort'

import { setFilters } from '../redux/slices/filterSlice'

import { useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
// import { SearchContext } from '../App'

function sortedPizzas(filterPizzas, key) {
  const sortedCourses = [...filterPizzas]
  key === 'ABC'
    ? sortedCourses.sort((a, b) => (a.title > b.title ? 1 : -1))
    : sortedCourses.sort((a, b) => (a[key] < b[key] ? 1 : -1))
  return sortedCourses
}

function filterCategories(activeCategori) {
  const filterCategori = [...pizzas]
  if (!activeCategori) {
    return filterCategori
  }
  return filterCategori.filter((pizza) => pizza.category === activeCategori)
}
const Home = () => {
  //------------------REDUX------------
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const { activeCategori, sort, search } = useSelector((state) => state.filter)
  const sortKey = sort
  const searchValue = search
  const [error, setError] = useState('')
  const [firstIndex, setFirstIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(8)

  const location = useLocation()
  const filterPizzas = filterCategories(activeCategori)
  const sortPizzas = sortedPizzas(filterPizzas, sortKey)

  const pizzasSorted = (sortPizzas) => {
    return sortPizzas
      .filter((pizza) => {
        return pizza.title.toLowerCase().includes(searchValue.toLowerCase())
          ? true
          : false
      })
      .slice(firstIndex, lastIndex)
      .map((pizza) => {
        return <PizzaBlock {...pizza} key={pizza.id} />
      })
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategori,
        sortKey,
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [activeCategori, sortKey, searchValue])

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1))
      const sort = sortList.find((obj) => obj === params.sortKey)
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
    }
  }, [])

  useEffect(() => {
    pizzasSorted(sortPizzas)

    window.scrollTo(0, 0)
  }, [activeCategori, sortKey, searchValue])
  // const query = queryString.parse(location.search)
  // console.log(query.search)
  // const [sortKey, setSortKey] = useState(query.sort)

  // const sortPizzas = sortedPizzas(pizzas, sortKey)

  // sortedPizzas(pizzas, sortKey)
  // console.log(sortedPizzas)
  // const [sortedPizzas, setSortedPizzas] = useState()

  // const API =
  //   'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221126%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221126T180227Z&X-Amz-Expires=86400&X-Amz-Signature=b06304a06743593b98b4da52d0642246a2ec0bff1107a05ed04e5cc4349570ba&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22pizzas.json%22&x-id=GetObject'
  // axios.get(API).then((res) => setPizzas(res.data))

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(API)
  //       const pizzas = await res.json()
  //       setPizzas(pizzas)
  //     } catch (error) {
  //       setError('Error server')
  //     }
  //   }
  //   fetchData()
  //   window.scrollTo(0, 0)
  // }, [])

  // const { searchValue } = React.useContext(SearchContext)

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{pizzasSorted(sortPizzas)}</div>
        <Pagination setFirstIndex={setFirstIndex} setLastIndex={setLastIndex} />
      </div>
    </>
  )
}

export default Home
