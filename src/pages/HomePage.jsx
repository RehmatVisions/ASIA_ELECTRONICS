import React from 'react'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import SpecialOffers from '../components/SpecialOffers'
import Testimonials from '../components/Testimonials'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <SpecialOffers />
      <Testimonials />
    </div>
  )
}

export default HomePage
