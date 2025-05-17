import mongoose from 'mongoose'

/**
 * MongoDB database client
 * Encapsulates MongoDB-specific connection logic to make it easier
 * to switch to a different database in the future
 */
export class MongoDBClient {
  /**
   * Connect to MongoDB
   */
  async connect() {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI)
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect() {
    try {
      await mongoose.disconnect()
      console.log('MongoDB Disconnected')
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }

  /**
   * Get the MongoDB connection
   */
  getConnection() {
    return mongoose.connection
  }
}