import express, { json } from 'express';
import prisma from './models/prisma.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/api",(req,res) =>{
    res.json('hello');
});

const port = 5000;

app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})
