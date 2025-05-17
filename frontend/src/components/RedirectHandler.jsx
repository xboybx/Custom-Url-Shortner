import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUrlByShortUrl } from '../services/urlService'

function RedirectHandler() {
  const { shortUrl } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        const response = await getUrlByShortUrl(shortUrl)
        if (response.originalUrl) {
          // Redirect to the original URL
          window.location.href = response.originalUrl
        } else {
          setError('URL not found')
          setTimeout(() => navigate('/'), 3000)
        }
      } catch (err) {
        setError('Something went wrong')
        setTimeout(() => navigate('/'), 3000)
      }
    }

    redirectToOriginalUrl()
  }, [shortUrl, navigate])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{error}. Redirecting to home page...</p>
          <div className="animate-pulse bg-blue-100 h-1 max-w-xs mx-auto rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Redirecting...</h1>
        <div className="animate-pulse bg-blue-100 h-1 max-w-xs mx-auto rounded-full" />
      </div>
    </div>
  )
}

export default RedirectHandler