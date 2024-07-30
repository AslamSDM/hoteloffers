// app/api/locations/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Hotel from '@/models/Hotel'

export async function GET() {
  await dbConnect()

  try {
    const countries = await Hotel.distinct('country')
    const cities = await Hotel.distinct('city')
    console.log('countries:', countries)
    return NextResponse.json({
      countries: countries.sort(),
      cities: cities.sort()
    })
  } catch (error) {
    console.error('Error fetching locations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}