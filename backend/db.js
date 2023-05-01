const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/GStore').then(()=>{
     console.log("connection successfull....")
        const fetched_data = mongoose.connection.db.collection("Store_items").find({}).toArray().then((data)=>{
                const itemCategory = mongoose.connection.db.collection("Items_Category").find({}).toArray().then((catData)=>{
                    global.grocery_items = data;
                    global.grocery_category = catData;
                })
        })
}).catch((err)=>console.log("---",err));


