'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './Filters.module.css'

interface FiltersProps {
  countries: string[]
  cities: string[]
}

export default function Filters({ countries, cities }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    setCountry(searchParams.get('country') || '')
    setCity(searchParams.get('city') || '')
    setSortBy(searchParams.get('sort') || '')
  }, [searchParams])
  console.log('countries:', country)
  console.log('cities:', city)
  console.log('sortBy:', sortBy)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (country) params.set('country', country)
    else params.delete('country')
    if (city) params.set('city', city)
    else params.delete('city')
    if (sortBy) params.set('sort', sortBy)
    else params.delete('sort')
    params.set('page', '1') // Reset to first page when filters change
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.filters}>
      <select
        className={styles.select}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className={styles.select}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="stars_desc">Stars: High to Low</option>
        <option value="stars_asc">Stars: Low to High</option>
      </select>

      <button type="submit" className={styles.button}>Apply Filters</button>
    </form>
  )
}