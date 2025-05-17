import express from 'express'
import {
  createUrl,
  getUrl,
  getUrls,
  updateUrl,
  deleteUrl,
  checkUrlAvailability
} from '../controllers/urlController.js'

const router = express.Router()

// Check URL availability
router.get('/check/:customName', checkUrlAvailability)

// CRUD operations
router.route('/')
  .get(getUrls)
  .post(createUrl)

router.route('/:id')
  .put(updateUrl)
  .delete(deleteUrl)

// Get URL by short URL for redirection
router.get('/:shortUrl', getUrl)

export default router