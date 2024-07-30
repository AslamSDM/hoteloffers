// app/components/HotelList.tsx
'use client'

import { useState } from 'react'
import HotelItem from './HotelItem'
import { IHotel } from '../../types'
import styles from './HotelList.module.css'

interface HotelListProps {
  initialHotels: IHotel[]
}

export default function HotelList({ initialHotels }: HotelListProps) {
  const [hotels, setHotels] = useState<IHotel[]>(initialHotels)

  if (hotels?.length === 0) {
    return <p>No hotels found</p>
  }
  return (
    <div className={styles.gridContainer}>
      {hotels?.map((hotel) => (
        <HotelItem key={hotel._id} hotel={hotel} />
      ))}
    </div>
  )
}