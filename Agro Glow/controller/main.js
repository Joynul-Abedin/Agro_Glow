const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();


router.get('/', (req,res)=>{
    userModel.getAllproducts(function(results){
        res.render('user/farmer/landing-Page/index',{ productInformation : results});
        console.log(results[1].imageURL)
	  });
	
});

module.exports = router;