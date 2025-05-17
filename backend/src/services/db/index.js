import { MongoDBClient } from './mongodb.js'

// Create a single instance of the DB client
const dbClient = new MongoDBClient()

/**
 * Connect to the database
 */
export const connectDB = async () => {
  await dbClient.connect()
}

/**
 * Disconnect from the database
 */
export const disconnectDB = async () => {
  await dbClient.disconnect()
}

/**
 * Get the database client instance
 */
export const getDBClient = () => {
  return dbClient
}