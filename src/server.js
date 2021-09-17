const app = require('./app')
require('./database')

app.listen(process.env.PORT, () => {
    console.log(`App running at ${process.env.HOST}:${process.env.PORT}`)
})
