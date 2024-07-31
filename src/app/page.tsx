'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import HotelList from '../components/HotelList'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'
import { HotelsResponse, IHotel, LocationsResponse } from '../types'
import styles from './page.module.css'

async function getHotels(searchParams: URLSearchParams): Promise<HotelsResponse> {
  const res = await fetch(`/api/hotels?${searchParams.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch hotels')
  }
  return res.json()
}

async function getLocations(): Promise<LocationsResponse> {
  const res = await fetch('/api/locations')
  if (!res.ok) {
    throw new Error('Failed to fetch locations')
  }
  return res.json()
}

export default function Home() {
  const [hotels, setHotels] = useState<IHotel[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [countries, setCountries] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    console.log('searchParams:', searchParams.toString())
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // const [hotelsData, locationsData] = await Promise.all([
        //   getHotels(searchParams),
        //   getLocations()
        // ])
        const hotelsData = await getHotels(searchParams)
        const locationsData = await getLocations()
        console.log('hotelsData:', hotelsData)
        setHotels(hotelsData.hotels)
        setTotalPages(hotelsData.totalPages)
        setCurrentPage(searchParams.get('page') ? Number(searchParams.get('page')) : 1)
        setCountries(locationsData.countries)
        setCities(locationsData.cities)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [searchParams])

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    setCurrentPage(page)
    router.push(`/?${newSearchParams.toString()}`)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Best Hotel Offers</h1>
      <Filters countries={countries} cities={cities} />
      <HotelList initialHotels={hotels} />
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </main>
  )
}