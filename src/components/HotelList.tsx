// app/components/HotelList.tsx
'use client'

import { useEffect, useState } from 'react'
import HotelItem from './HotelItem'
import { IHotel } from '../types'
import styles from './HotelList.module.css'

interface HotelListProps {
  initialHotels: IHotel[]
}

export default function HotelList({ initialHotels }: HotelListProps) {
  const [hotels, setHotels] = useState<IHotel[]>([])

  useEffect(() => {
    const hotelMap = initialHotels.reduce((acc, hotel) => {
      const { name, price, image } = hotel;
      if (!acc[name]) {
        acc[name] = { ...hotel, fallbackImage: image };
      } else {
        if (price < acc[name].price) {
          acc[name] = { ...hotel, fallbackImage: acc[name].image };
        } else if (!acc[name].image && image) {
          acc[name].fallbackImage = image;
        }
      }
      return acc;
    }, {} as Record<string, IHotel & { fallbackImage?: string }>);

    setHotels(Object.values(hotelMap));
  }, [initialHotels]);

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