import { FiLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-blue-50 p-4 rounded-full mb-6">
        <FiLink className="text-blue-500 w-10 h-10" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">No links found</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        You haven't created any shortened links yet. Create your first custom URL to get started.
      </p>
      <Link to="/" className="btn-primary">
        Create Your First Link
      </Link>
    </div>
  )
}

export default EmptyState