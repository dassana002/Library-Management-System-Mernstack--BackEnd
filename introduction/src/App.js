const express = require('express')
const App = express()
const port = 3500

const bookRoutes = require("./routes/BookRoutes")

// meya wada kranne Dispature servelate ekk widiyata ( Dispature Part)
// Url eke "/books" kiyla awoth request eka book routes(controller layer ekata yawanawa)
App.use("/api/v1", bookRoutes)

App.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})