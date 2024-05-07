import { connect, connection } from 'mongoose'
import 'dotenv/config'

export const DbConnect = async (): Promise<void> => {
     await connect(`mongodb://${process.env.MONGO_USERNAME}:
        ${process.env.MONGO_PASSWORD}@
        ${process.env.MONGO_HOST}:
        ${process.env.MONGO_PORT}/
        ${process.env.MONGO_DATABASE}
        `.replace(/\s+/gm, ''),
    )

    connection.on('error', (error) => {
        console.error('Error connection mongodb:', error)
    })
}