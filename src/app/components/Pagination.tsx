// app/components/Pagination.tsx
import styles from './Pagination.module.css'

interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.pageButton} 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1
        if (
          pageNumber === 1 ||
          pageNumber === totalPages ||
          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
        ) {
          return (
            <button
              key={pageNumber}
              className={`${styles.pageButton} ${pageNumber === currentPage ? styles.active : ''}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        } else if (
          pageNumber === currentPage - 2 ||
          pageNumber === currentPage + 2
        ) {
          return <span key={pageNumber} className={styles.ellipsis}>...</span>
        }
        return null
      })}

      <button 
        className={styles.pageButton} 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}