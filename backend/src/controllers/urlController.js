import asyncHandler from 'express-async-handler'
import { UrlService } from '../services/url/urlService.js'

const urlService = new UrlService()

/**
 * @desc    Create a new short URL
 * @route   POST /urls
 * @access  Public
 */
export const createUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customName } = req.body

  if (!originalUrl || !customName) {
    res.status(400)
    throw new Error('Please provide both original URL and custom name')
  }

  // Check if the custom name is available
  const existingUrl = await urlService.getByShortUrl(customName)
  if (existingUrl) {
    res.status(400)
    throw new Error('This custom name is already taken')
  }

  const url = await urlService.create({
    originalUrl,
    shortUrl: customName,
    clicks: 0
  })

  res.status(201).json(url)
})

/**
 * @desc    Get a URL by short URL and increment clicks
 * @route   GET /urls/:shortUrl
 * @access  Public
 */
export const getUrl = asyncHandler(async (req, res) => {
  const { shortUrl } = req.params

  const url = await urlService.getByShortUrl(shortUrl)

  if (!url) {
    res.status(404)
    throw new Error('URL not found')
  }

  // Increment click count
  url.clicks += 1
  await urlService.update(url._id, { clicks: url.clicks })

  res.status(200).json(url)
})

/**
 * @desc    Get all URLs
 * @route   GET /urls
 * @access  Public
 */
export const getUrls = asyncHandler(async (req, res) => {
  const urls = await urlService.getAll()
  
  res.status(200).json(urls)
})

/**
 * @desc    Update a URL
 * @route   PUT /urls/:id
 * @access  Public
 */
export const updateUrl = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { originalUrl } = req.body

  if (!originalUrl) {
    res.status(400)
    throw new Error('Please provide original URL')
  }

  const url = await urlService.getById(id)

  if (!url) {
    res.status(404)
    throw new Error('URL not found')
  }

  const updatedUrl = await urlService.update(id, { originalUrl })

  res.status(200).json(updatedUrl)
})

/**
 * @desc    Delete a URL
 * @route   DELETE /urls/:id
 * @access  Public
 */
export const deleteUrl = asyncHandler(async (req, res) => {
  const { id } = req.params

  const url = await urlService.getById(id)

  if (!url) {
    res.status(404)
    throw new Error('URL not found')
  }

  await urlService.delete(id)

  res.status(200).json({ id })
})

/**
 * @desc    Check if a custom URL name is available
 * @route   GET /urls/check/:customName
 * @access  Public
 */
export const checkUrlAvailability = asyncHandler(async (req, res) => {
  const { customName } = req.params

  const url = await urlService.getByShortUrl(customName)

  res.status(200).json({ available: !url })
})