import express from 'express'
import dotenv from 'dotenv'
import productsRouter from './routes/productsRouter.js'
import authRouter from './routes/authRouter.js'
import cartRouter from './routes/cartRouter.js'
import shipRouter from './routes/shipRouter.js'
import cors from 'cors'
import connectDB from './model/db.js'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

app.use('/products', productsRouter)
app.use('/shipmethod', shipRouter)
app.use('/api/auth', authRouter)
app.use('/user', cartRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})


const PORT = process.env.PORT || 3000


connectDB().then(() => {
    app.listen(PORT, (err) => {
        if (err) console.log(err.message)
        console.log(`The server is running on http://localhost:${PORT}`)
    })
})

