import mongoose from 'mongoose';


async function connectToDB() {
    try { 
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
       
    }
    catch (err) {
        throw new Error("cannot connect");
    }
}

async function disconnectToDb(){
    try{
        await mongoose.disconnect();
    }

    catch(err){
        throw new Error("database cannot be disconnected")
    }
}

export {connectToDB,disconnectToDb};




