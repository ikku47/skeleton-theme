import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, MessageCircle, Filter } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  title: string
  content: string
  date: string
  verified: boolean
  helpful: number
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingDistribution: { [key: number]: number }
  onWriteReview?: () => void
  className?: string
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
  onWriteReview,
  className = '',
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest')
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const filteredAndSortedReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        default:
          return 0
      }
    })

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className={`bg-white rounded-lg p-8 text-center ${className}`}>
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
        <p className="text-gray-600 mb-4">Be the first to share your thoughts about this product</p>
        {onWriteReview && (
          <button
            onClick={onWriteReview}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className={`bg-white rounded-lg ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reviews Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
          {onWriteReview && (
            <button
              onClick={onWriteReview}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <span className="text-4xl font-bold text-gray-900 mr-2">
                {averageRating.toFixed(1)}
              </span>
              {renderStars(averageRating, 'lg')}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = ratingDistribution[rating] || 0
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
              
              return (
                <div key={rating} className="flex items-center text-sm">
                  <span className="w-8">{rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current mr-2" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-gray-600">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by rating:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-2 py-1 text-xs rounded ${
                filterRating === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-2 py-1 text-xs rounded ${
                  filterRating === rating ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {renderStars(review.rating)}
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-gray-900">{review.title}</h4>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <p className="text-gray-700 mb-3">{review.content}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">By {review.author}</span>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <ThumbsUp className="w-3 h-3" />
                Helpful ({review.helpful})
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
