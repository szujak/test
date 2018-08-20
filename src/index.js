import dotenv from 'dotenv'
import Server from './server'

// Use .env file 
dotenv.config()

const server = new Server(process.env)

server.start()
