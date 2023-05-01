const express = require('express')
const router = express.Router();

router.post('/groceryData',(req,res)=>{
    try{
        res.send([global.grocery_items, global.grocery_category]);
    }catch(err){
        res.send(err.message);
    }
})

module.exports = router;
