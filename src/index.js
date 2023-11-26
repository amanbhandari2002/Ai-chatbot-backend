import app from "./app.js";
import { connectToDB } from './db/connection.js';


connectToDB().then(()=>{
    app.listen(process.env.PORT|| 3000,()=>{
        console.log('Server is runnig ...');
    });
}).catch((err)=>{
    console.log('couldnot connect to db')
})




// controller will control all the incoming APIs