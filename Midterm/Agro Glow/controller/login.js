const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();
const { check, validationResult} = require('express-validator'); 


router.get('/', (req,res)=>{
	res.render('login/login');
});

router.post('/', [				  //POST : 
    check('user','Invalid')
		.exists()
		.isLength({min:1}),
	
    check('password','Invalid')
		.exists()
		.isLength({min:1}),
        
	] , (req, res, next)=>{

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
            // // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('login/login',{alert});
		}else{
			next();
		}
});

router.post('/', (req, res)=>{

	//console.log(req.body.email);

	user = {
		'userName'	: req.body.user,
		'password' 	: req.body.password
	}

	console.log(user);

	userModel.validate(user, function(status){
		if(status){
			res.cookie('user', req.body.user);
			res.redirect('/home');
		}else{
			res.redirect('/login');
		}

	})
});

router.get('/register', (req,res)=>{
	res.render('login/register');
});

router.post('/register', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: null,
			'mobileNo'	: null,
			'userName' 	: req.body.userName,
			'password' 	: password,
			'userType' 	: 'farmer',
			'validity'	: 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/login');
			}else{
				res.redirect('/login/register');
			}
		})
	}else{
			res.redirect('/login/register');
		}

	console.log(req.body.firstName+' '+req.body.lastName);

});

router.get('/forgot-password', (req,res)=>{
	res.render('login/forgot-password', {layout : './layouts/main2'});
});

router.post('/forgot-password', (req, res)=>{

	res.redirect('/forgot-password');
});


module.exports = router;