"use client"
import Image from 'next/image'
import { IHotel } from '../types'
import styles from './HotelItem.module.css'

import { useState } from 'react'

interface HotelItemProps {
  hotel: IHotel
  fallbackImage?: string
}

export default function HotelItem({ hotel,fallbackImage }: HotelItemProps) {
  
  const [imageSrc, setImageSrc] = useState(hotel.image || fallbackImage || '/no image.jpeg');

  const handleImageError = () => {
    if (imageSrc !== fallbackImage) {
      setImageSrc(fallbackImage || '/no image.jpeg');
    } else {
      setImageSrc('/no image.jpeg');
    }
  };
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        
          <img 
            src={hotel.image || fallbackImage || '/no image.jpeg'} 
            alt={hotel.name} 
            className={styles.image}
            onError={handleImageError}

          />
        
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{hotel.name}</h2>
        <p className={styles.location}>{hotel.city}, {hotel.country}</p>
        <div className={styles.details}>
          <p className={styles.price}>€{Number(hotel.price).toFixed(0)}</p>
          <div className={styles.stars}>
            {[...Array(hotel.stars)].map((_, i) => (
              <span key={i} className={styles.star}>★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}