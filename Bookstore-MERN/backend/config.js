import "dotenv/config"

export const PORT = 3000

export const MOGODBURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ebcdsaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`