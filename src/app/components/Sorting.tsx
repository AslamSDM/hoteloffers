// app/components/Sorting.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Sorting() {
  const router = useRouter()

  const handleSort = (sortBy: string) => {
    router.push(`/?sort=${sortBy}`)
  }

  return (
    <div>
      <button onClick={() => handleSort('price')}>Sort by Price</button>
      <button onClick={() => handleSort('stars')}>Sort by Stars</button>
    </div>
  )
}