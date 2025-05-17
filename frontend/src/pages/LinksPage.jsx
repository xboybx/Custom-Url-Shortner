import { useState, useEffect } from 'react'
import { FiSearch, FiRefreshCw } from 'react-icons/fi'
import LinkCard from '../components/LinkCard'
import EmptyState from '../components/EmptyState'
import { getAllUrls } from '../services/urlService'
import toast from 'react-hot-toast'

function LinksPage() {
  const [links, setLinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      setIsLoading(true)
      const data = await getAllUrls()
      setLinks(data)
    } catch (error) {
      toast.error('Failed to fetch links')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await fetchLinks()
    setIsRefreshing(false)
  }

  const handleUpdate = (updatedLink) => {
    setLinks(links.map(link => 
      link._id === updatedLink._id ? updatedLink : link
    ))
  }

  const handleDelete = (deletedId) => {
    setLinks(links.filter(link => link._id !== deletedId))
  }
  
  // Filter links based on search term
  const filteredLinks = links.filter(link => 
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) || 
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">My Links</h1>
        
        <div className="flex space-x-2">
          <div className="relative flex-grow sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary flex items-center"
            aria-label="Refresh links"
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : links.length === 0 ? (
        <EmptyState />
      ) : filteredLinks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No links match your search</p>
        </div>
      ) : (
        <div>
          {filteredLinks.map(link => (
            <LinkCard
              key={link._id}
              link={link}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
          <p className="text-sm text-gray-500 text-center mt-4">
            Showing {filteredLinks.length} of {links.length} links
          </p>
        </div>
      )}
    </div>
  )
}

export default LinksPage