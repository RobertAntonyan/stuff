import React, { useEffect } from 'react'
import Poster from '../Poster/Poster'
import  Products  from '../Products/Products'
import { useDispatch, useSelector } from 'react-redux'
import { Categories } from '../Categories/Categories'
import { Banner } from '../Banner/Banner'
import { filterByPrice } from '../../feauters/products/productsSlice'

function Home() {
  const dispath = useDispatch()
  const {products: {list, filtered}, categories} = useSelector((state) => state)
  
  useEffect(() => {
    if(!list.length) return
    dispath(filterByPrice(100))
  },[dispath, list.length])

  return (
   <>
   <Poster />
   <Products products={list} amount={5} title="trending"/>
   <Categories products={categories.list} amount={5}  title="Worth seeing" />
   <Banner />
   <Products products={filtered} amount={5} title="trending"/>

   </>
  )
}

export default Home