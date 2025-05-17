import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

/**
 * Create a new shortened URL
 * @param {Object} urlData - The URL data
 * @param {string} urlData.originalUrl - The original URL to shorten
 * @param {string} urlData.customName - The custom name for the shortened URL
 * @returns {Promise<Object>} - The created URL object
 */
export const createShortUrl = async (urlData) => {
  try {
    const response = await api.post('/urls', urlData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Check if a custom URL name is available
 * @param {string} customName - The custom name to check
 * @returns {Promise<Object>} - Object with available status
 */
export const checkUrlAvailability = async (customName) => {
  try {
    const response = await api.get(`/urls/check/${customName}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get URL by short URL
 * @param {string} shortUrl - The short URL to get
 * @returns {Promise<Object>} - The URL object
 */
export const getUrlByShortUrl = async (shortUrl) => {
  try {
    const response = await api.get(`/urls/${shortUrl}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Get all URLs
 * @returns {Promise<Array>} - Array of URL objects
 */
export const getAllUrls = async () => {
  try {
    const response = await api.get('/urls')
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Update a URL
 * @param {string} id - The URL ID
 * @param {Object} urlData - The updated URL data
 * @returns {Promise<Object>} - The updated URL object
 */
export const updateUrl = async (id, urlData) => {
  try {
    const response = await api.put(`/urls/${id}`, urlData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Delete a URL
 * @param {string} id - The URL ID to delete
 * @returns {Promise<Object>} - The deleted URL object
 */
export const deleteUrl = async (id) => {
  try {
    const response = await api.delete(`/urls/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}