import Url from '../../models/urlModel.js'

/**
 * URL Service
 * Handles all operations related to URLs
 */
export class UrlService {
  /**
   * Create a new URL
   * @param {Object} urlData - URL data
   * @returns {Promise<Object>} - Created URL
   */
  async create(urlData) {
    return await Url.create(urlData)
  }

  /**
   * Get a URL by ID
   * @param {string} id - URL ID
   * @returns {Promise<Object>} - URL object
   */
  async getById(id) {
    return await Url.findById(id)
  }

  /**
   * Get a URL by short URL
   * @param {string} shortUrl - Short URL
   * @returns {Promise<Object>} - URL object
   */
  async getByShortUrl(shortUrl) {
    return await Url.findOne({ shortUrl })
  }

  /**
   * Get all URLs
   * @returns {Promise<Array>} - Array of URL objects
   */
  async getAll() {
    return await Url.find().sort({ createdAt: -1 })
  }

  /**
   * Update a URL
   * @param {string} id - URL ID
   * @param {Object} updateData - Updated URL data
   * @returns {Promise<Object>} - Updated URL
   */
  async update(id, updateData) {
    return await Url.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
  }

  /**
   * Delete a URL
   * @param {string} id - URL ID
   * @returns {Promise<Object>} - Deleted URL
   */
  async delete(id) {
    return await Url.findByIdAndDelete(id)
  }
}