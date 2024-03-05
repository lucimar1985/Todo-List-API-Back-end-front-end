import mongoose from "mongoose";

class Database {
    constructor(){
        this.mongo()
    }

        mongo() {
            mongoose.connect('mongodb://localhost:27018/to-do').then(() => {
                console.log('MongoDB Connected')
            }).catch((error)=>{
                console.log('error:' + error)
            })
        }

    
}

export default new Database()