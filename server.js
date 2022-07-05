const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://Rajea:Mdreams87b@cluster0.xdfv4.mongodb.net/?retryWrites=true&w=majority'


//the use method in Express helps us use the body-parser



MongoClient.connect(connectionString, { useUnifiedTopology: true })

    .then(client => {
        console.log('Connected to Database')
        const db = client.db('inspirational-quotes')
        const quotesCollection = db.collection('quotes')

        // express request handlers
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))
        app.get('/', (request, response) => {
            quotesCollection.find().toArray()
            .then(data => {
                response.render('index.ejs', { quotes: data })
            })
            .catch(error => console.error(error))
           
        })

        app.post('/quotes', (request, response) => {
            console.log(request.body)
            quotesCollection.insertOne(request.body)
            .then(result => {
                // console.log(result)
                response.redirect('/')
            })
            .catch(error => console.error(error))
        })
        app.put('/quotes', (request, response) => {
           quotesCollection.findOneAndUpdate(
               { name: 'Rumi' },
               {
                   $set: {
                       name: request.body.name,
                       quote: request.body.quote
                   }
                },
                {
                    upsert: true
                }
                )
                .then(result => {
                    response.json('Success')
                })
                .catch(error => console.error(error))
            })

        app.delete('/quotes', (request, response) => {
            quotesCollection.deleteOne(
                { name: request.body.name}
            )
            .then(result => {
                if(result.deletedCount === 0) {
                    return response.json('No quote to delete')
                }
                response.json('Deleted Stoic\'s quote')
            })
            .catch(error => console.error(error))
        })

// handling delete quotes


        app.delete('/deleteLine', (request, response) => {
            console.log(request)
            quotesCollection.deleteOne({quote: request.body.Name})
            .then(result => {
                console.log('Quote deleted')
                response.json('Quote deleted')
            })
            .catch(error => console.error(error))
        })


        app.listen(4000, function(){
            console.log('listening on 4000')
        })
        
    })
    .catch(error => console.error(error))

  



