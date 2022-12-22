import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Card from './pages/Cart'

import { Routes, Route } from 'react-router-dom'

import React from 'react'
import SearchPizzas from './pages/SearchPizzas'

// export const SearchContext = React.createContext()

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Card />} />
            <Route path="/pizza/:id" element={<SearchPizzas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* </SearchContext.Provider> */}
      </div>
    </div>
  )
}

export default App
