import { useState } from 'react'
import { FiLink, FiArrowRight } from 'react-icons/fi'
import { createShortUrl, checkUrlAvailability } from '../services/urlService'
import toast from 'react-hot-toast'

function LinkForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customName: ''
  })
  const [errors, setErrors] = useState({})
  const [isAvailable, setIsAvailable] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    // Validate original URL
    if (!formData.originalUrl) {
      newErrors.originalUrl = 'URL is required'
    } else if (!isValidUrl(formData.originalUrl)) {
      newErrors.originalUrl = 'Please enter a valid URL'
    }
    
    // Validate custom name
    if (!formData.customName) {
      newErrors.customName = 'Custom name is required'
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData.customName)) {
      newErrors.customName = 'Only letters, numbers, hyphens, and underscores are allowed'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (err) {
      return false
    }
  }

  const checkAvailability = async () => {
    if (!formData.customName) {
      setErrors({ ...errors, customName: 'Custom name is required' })
      return
    }
    
    if (!/^[a-zA-Z0-9-_]+$/.test(formData.customName)) {
      setErrors({ 
        ...errors, 
        customName: 'Only letters, numbers, hyphens, and underscores are allowed' 
      })
      return
    }
    
    setIsChecking(true)
    setErrors({ ...errors, customName: '' })
    
    try {
      const { available } = await checkUrlAvailability(formData.customName)
      setIsAvailable(available)
      
      if (!available) {
        setErrors({ 
          ...errors, 
          customName: 'This name is already taken. Please choose another one.' 
        })
      }
    } catch (err) {
      toast.error('Failed to check availability')
    } finally {
      setIsChecking(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    
    // Reset availability status when changing custom name
    if (name === 'customName') {
      setIsAvailable(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Check availability one last time if not already checked
    if (isAvailable !== true) {
      const checkResult = await checkAvailability()
      if (!checkResult) return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await createShortUrl(formData)
      toast.success('URL shortened successfully!')
      
      // Reset form
      setFormData({ originalUrl: '', customName: '' })
      setIsAvailable(null)
      
      // Call success callback with the new shortened URL data
      if (onSuccess) onSuccess(response)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create shortened URL')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card animate-slide-up">
      <h2 className="text-xl font-semibold mb-6">Create Custom URL</h2>
      
      <div className="mb-4">
        <label htmlFor="originalUrl" className="input-label">
          Original URL
        </label>
        <div className="relative">
          <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="originalUrl"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            placeholder="https://example.com/very-long-url"
            className={`input-field pl-10 ${
              errors.originalUrl ? 'border-red-500 focus:ring-red-300' : ''
            }`}
          />
        </div>
        {errors.originalUrl && (
          <p className="mt-1 text-red-500 text-sm">{errors.originalUrl}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="customName" className="input-label">
          Custom Name
        </label>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              id="customName"
              name="customName"
              value={formData.customName}
              onChange={handleChange}
              placeholder="my-awesome-link"
              className={`input-field ${
                errors.customName ? 'border-red-500 focus:ring-red-300' : 
                isAvailable === true ? 'border-green-500 focus:ring-green-300' : ''
              }`}
            />
          </div>
          <button
            type="button"
            onClick={checkAvailability}
            disabled={isChecking || !formData.customName}
            className="btn-secondary"
          >
            {isChecking ? 'Checking...' : 'Check'}
          </button>
        </div>
        {errors.customName && (
          <p className="mt-1 text-red-500 text-sm">{errors.customName}</p>
        )}
        {isAvailable === true && !errors.customName && (
          <p className="mt-1 text-green-500 text-sm">This name is available!</p>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Your URL will be: <span className="font-mono text-gray-700">
            {window.location.origin}/{formData.customName || 'custom-name'}
          </span>
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex items-center space-x-2"
        >
          <span>{isSubmitting ? 'Creating...' : 'Create'}</span>
          <FiArrowRight size={16} />
        </button>
      </div>
    </form>
  )
}

export default LinkForm