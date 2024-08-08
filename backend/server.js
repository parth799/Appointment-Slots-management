import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import appointments from './src/router/appointments.js';
import connectDB from "./src/db/index.js";
const app = express();
const PORT = 5157;

app.use(cors());
app.use(express.json());
app.use('/appointments', appointments);

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error" , error);
        throw error
    })
    app.listen(PORT, () =>{
        console.log(`server is runnig at http:localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log("Mongo databse connectin failled !!! ", err );
})


app.use(bodyParser.json());

