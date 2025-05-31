import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  imageUrl?: string
  author: string
  publishedAt: string
  readTime?: string
  tags?: string[]
  url: string
}

interface VersaBlogGridProps {
  title?: string
  subtitle?: string
  posts: BlogPost[]
  layout?: 'grid' | 'list' | 'featured'
  showExcerpt?: boolean
  showAuthor?: boolean
  showReadTime?: boolean
  showTags?: boolean
  className?: string
}

export const VersaBlogGrid: React.FC<VersaBlogGridProps> = ({
  title,
  subtitle,
  posts,
  layout = 'grid',
  showExcerpt = true,
  showAuthor = true,
  showReadTime = true,
  showTags = false,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const getGridClasses = () => {
    switch (layout) {
      case 'list':
        return 'space-y-8'
      case 'featured':
        return 'grid grid-cols-1 lg:grid-cols-3 gap-8'
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="container">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {subtitle && (
              <p className="font-body text-neutral text-lg mb-4 uppercase tracking-wide">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-primary text-4xl md:text-5xl font-bold">
                {title}
              </h2>
            )}
          </motion.div>
        )}

        {/* Blog Posts */}
        <motion.div
          className={getGridClasses()}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className={layout === 'featured' && index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
              variants={itemVariants}
            >
              <BlogPostCard 
                post={post}
                layout={layout}
                featured={layout === 'featured' && index === 0}
                showExcerpt={showExcerpt}
                showAuthor={showAuthor}
                showReadTime={showReadTime}
                showTags={showTags}
                formatDate={formatDate}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Individual Blog Post Card Component
const BlogPostCard: React.FC<{
  post: BlogPost
  layout: string
  featured: boolean
  showExcerpt: boolean
  showAuthor: boolean
  showReadTime: boolean
  showTags: boolean
  formatDate: (date: string) => string
}> = ({ 
  post, 
  layout, 
  featured, 
  showExcerpt, 
  showAuthor, 
  showReadTime, 
  showTags, 
  formatDate 
}) => {
  const isListLayout = layout === 'list'

  return (
    <motion.article
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
        isListLayout ? 'flex gap-6' : ''
      }`}
      whileHover={{ y: isListLayout ? 0 : -5 }}
    >
      {/* Post Image */}
      {post.imageUrl && (
        <div className={`relative overflow-hidden ${
          isListLayout 
            ? 'w-1/3 flex-shrink-0' 
            : featured 
              ? 'aspect-[16/10]' 
              : 'aspect-[4/3]'
        }`}>
          <motion.img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Read Time Badge */}
          {post.readTime && showReadTime && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          )}
        </div>
      )}

      {/* Post Content */}
      <div className={`p-6 ${isListLayout ? 'flex-1' : ''} space-y-4`}>
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-neutral">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          
          {showAuthor && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-heading font-semibold text-primary group-hover:text-secondary transition-colors ${
          featured ? 'text-2xl lg:text-3xl' : 'text-xl'
        }`}>
          <a href={post.url} className="line-clamp-2">
            {post.title}
          </a>
        </h3>

        {/* Excerpt */}
        {showExcerpt && post.excerpt && (
          <p className={`text-neutral leading-relaxed ${
            featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'
          }`}>
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {showTags && post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-light-bg text-neutral text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <motion.a
          href={post.url}
          className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors group"
          whileHover={{ x: 5 }}
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </motion.article>
  )
}
