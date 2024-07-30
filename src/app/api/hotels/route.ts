import Hotel from '@/models/Hotel'
import axios from 'axios'
import { IHotel } from '@/types'
import { NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { ObjectId } from 'mongodb';

const API_ENDPOINT = 'http://testapi.swisshalley.com/hotels/'
const API_KEY = process.env.API_KEY
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
export async function GET(request: NextRequest) {
  await dbConnect()

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '21')
  const sort = searchParams.get('sort')
  const country = searchParams.get('country')
  const city = searchParams.get('city')

  try {
    let hotels = await Hotel.find({})
    if (hotels.length === 0) {
      const response = await axios.get(API_ENDPOINT, {
        headers: { 'x-api-key': API_KEY }
      })
      if (response.data.data && Array.isArray(response.data.data.hotels)) {
        console.log(response.data.data.hotels)
        const processedHotels = processHotels(response.data.data.hotels)
        // console.log(processedHotels)
        await Hotel.insertMany(processedHotels)
        hotels = processedHotels
      } else {
        throw new Error('Invalid data format from API')
      }
    }


  
    const skip = (page - 1) * limit
  
    let query = Hotel.find()
  
    if (country) {
      query = query.where('country', country)
    }
  
    if (city) {
      query = query.where('city', city)
    }
  
    switch (sort) {
      case 'price_asc':
        query = query.sort('price')
        break
      case 'price_desc':
        query = query.sort('-price')
        break
      case 'stars_desc':
        query = query.sort('-stars')
        break
      case 'stars_asc':
        query = query.sort('stars')
        break
      default:
        query = query.sort('price') // Default sort
    }
    const totalHotels = hotels.length;
    const totalPages = Math.ceil(totalHotels / limit);
    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    hotels = hotels.slice(startIndex, endIndex)

    return new Response(JSON.stringify({hotels:hotels,totalPages:totalPages}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error:any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

function processHotels(hotels: any[]): IHotel[] {
  
  return hotels.map(hotel => ({
    _id: new ObjectId().toHexString(), // Add the _id property
    id: hotel.hotel_id,
    image: hotel.image,
    name: hotel.hotel_name,
    country: hotel.country,
    country_id: hotel.country_id,
    city: hotel.city,
    price: hotel.price,
    stars: hotel.star
  }))
}