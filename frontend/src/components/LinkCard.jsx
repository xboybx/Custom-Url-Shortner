import { useState } from 'react'
import { FiCopy, FiTrash2, FiExternalLink, FiEdit } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { deleteUrl, updateUrl } from '../services/urlService'

function LinkCard({ link, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [originalUrl, setOriginalUrl] = useState(link.originalUrl)
  
  const shortUrl = `${window.location.origin}/${link.shortUrl}`
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setIsCopied(true)
        toast.success('Copied to clipboard!')
        
        // Reset copied state after 2 seconds
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch(() => {
        toast.error('Failed to copy')
      })
  }
  
  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true)
      
      try {
        await deleteUrl(link._id)
        toast.success('Link deleted successfully')
        if (onDelete) onDelete(link._id)
      } catch (error) {
        toast.error('Failed to delete link')
      } finally {
        setIsDeleting(false)
      }
    }
  }
  
  const handleEdit = async () => {
    if (isEditing) {
      try {
        const updatedLink = await updateUrl(link._id, { originalUrl })
        toast.success('Link updated successfully')
        if (onUpdate) onUpdate(updatedLink)
        setIsEditing(false)
      } catch (error) {
        toast.error('Failed to update link')
      }
    } else {
      setIsEditing(true)
    }
  }
  
  return (
    <div className="card mb-4 hover:border-blue-100 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center mb-4">
        <div className="flex-1 mb-2 sm:mb-0">
          <h3 className="font-semibold text-lg text-blue-600">{link.shortUrl}</h3>
          <p className="text-sm text-gray-500 truncate">
            Created: {new Date(link.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Copy to clipboard"
          >
            <FiCopy className={isCopied ? 'text-green-500' : ''} />
          </button>
          <button
            onClick={handleEdit}
            className={`p-2 hover:bg-blue-50 rounded-full transition-colors ${
              isEditing ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
            aria-label="Edit link"
          >
            <FiEdit />
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete link"
          >
            <FiTrash2 />
          </button>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            aria-label="Visit original URL"
          >
            <FiExternalLink />
          </a>
        </div>
      </div>
      
      {isEditing ? (
        <div className="mb-4">
          <label htmlFor={`originalUrl-${link._id}`} className="input-label">
            Original URL
          </label>
          <input
            type="text"
            id={`originalUrl-${link._id}`}
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="input-field"
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => {
                setIsEditing(false)
                setOriginalUrl(link.originalUrl)
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              className="btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-2">
          <p className="text-gray-700 break-all">
            {link.originalUrl}
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium text-gray-500">Short URL:</span>
          <a 
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            {shortUrl}
          </a>
        </div>
        <span className="text-xs font-medium text-gray-500">
          Clicks: {link.clicks || 0}
        </span>
      </div>
    </div>
  )
}

export default LinkCard