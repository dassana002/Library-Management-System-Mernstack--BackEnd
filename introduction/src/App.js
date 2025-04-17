// Express import
const express = require('express')
const App = express()
const port = 3500

// Mongoose import
const mongoose = require('mongoose');
// CORS import
const cors = require('cors');


const bookRoutes = require("./routes/BookRoutes")

// JSON object handle (This is Meddle war---> application eka mada idn support kranwa, wada kranwa)
App.use(express.json())

// meya wada kranne Dispature servelate ekk widiyata ( Dispature Part, configuration hold)
// Url eke "/books" kiyla awoth request eka book routes(controller layer ekata yawanawa)
// Url ekk handles walta pass krann use() method eka use kranwa 
// Find a Execute / Resolve controller  
App.use('/api/v1', bookRoutes)

//handle CORS issue
App.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Mongoose configurations
mongoose.connect("mongodb://localhost:27017/LMSdatabase",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err))

//
App.listen(port, () => {
    console.log(`LMS-App listening on port ${port}`)
})