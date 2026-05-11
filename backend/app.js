import express, { json } from 'express';
import prisma from './models/prisma.js';
import router from './routes/routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router)

const port = 5000;

app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})
