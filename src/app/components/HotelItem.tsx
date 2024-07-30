// app/components/HotelItem.tsx
import Image from 'next/image'
import { IHotel } from '../../types'
import styles from './HotelItem.module.css'

interface HotelItemProps {
  hotel: IHotel
}

export default function HotelItem({ hotel }: HotelItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {hotel.image && (
          <img 
            src={hotel.image  ||  "/no image.jpeg"} 
            alt={hotel.name} 
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{hotel.name}</h2>
        <p className={styles.location}>{hotel.city}, {hotel.country}</p>
        <div className={styles.details}>
          <p className={styles.price}>€{hotel.price}</p>
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