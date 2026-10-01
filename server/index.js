import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import express from "express";
import connectDB from "./DB/DB.js";
import app from "./app.js";

connectDB()
            .then(() =>{
                app.listen(process.env.PORT || 8000, () => {
                    console.log(`Server is running on PORT ${process.env.PORT}`);
                })
            })
            .catch((error) => {
                console.log("Error in running Server ", error);
            })