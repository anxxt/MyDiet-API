import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mydiet.ak4vlyk.mongodb.net/?retryWrites=true&w=majority&appName=MyDiet`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('dietista')
    return database.collection('dietas')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class DietModel {
  static async getByName ({ name }) {
    const db = await connect()
    const query = { id_dieta: { $regex: name, $options: 'i' } }
    const result = await db.find(query, { projection: { _id: 0 } }).sort({ _id: -1 }).limit(1).toArray()
    return result[0]
  }
}
