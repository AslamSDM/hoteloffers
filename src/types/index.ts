// types/index.ts
export interface IHotel {
  _id: string
  name: string
  country: string
  city: string
  price: number
  stars: number
  image: string
}

export interface HotelsResponse {
  hotels: IHotel[]
  currentPage: number
  totalPages: number
  totalHotels: number
}

export interface LocationsResponse {
  countries: string[]
  cities: string[]
}