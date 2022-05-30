const mongo = require('mongodb').MongoClient
const express = require('express')
const cors = require('cors')
require('dotenv/config')

const app = express()
app.use(cors())
app.use(express.json())

const url = process.env.MONGO_URL
const options = {
useNewUrlParser: true,
useUnifiedTopology: true,
}
let menudb, customerdb

mongo.connect(url,options, (err,mongoClient) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('we are connected!')

    app.listen(3000,() => console.log('Changes are ahead.. be wary'))
    const db = mongoClient.db('restaurant')
    customerdb = db.collection('customers')
    menudb = db.collection('menu')
})

// get
app.get('/', (req, res) => res.status(200).send('Running on AWS'))

// post
app.post('/', (req, res) => {
    menudb.insertOne(req.body)
    res.status(201).send('item was added')
})

// patch
app.patch('/', (req, res) => {
    menudb
    .updateOne({name:'Taco'},{$set: {name:'tequila', cost: 30, stock:true} })
    .then(() => res.status(200).send('item was updated'))
})

// delete
app.delete('/',(req, res) =>{
    menudb.deleteOne({name:''}).then(() => res.send('item was deleted'))
})