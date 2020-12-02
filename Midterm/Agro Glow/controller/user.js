const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

router.get('/manager', (req, res)=>{
		
	res.render('user/manager/home');

});

router.post('/manager', (req, res)=>{


});



router.post('/create', (req, res)=>{

	newUser ={
		'uname' : req.body.uname,
		'email' : req.body.email,
		'pass'  : req.body.pass,
		'dept'  : req.body.dept
	}

	userModel.createUser(newUser,function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redirect('/create');
		}
	})

});


router.get('/edit/:uname', (req, res)=>{

	var user = req.params.uname;

	userModel.getUser(user, function(results){
		console.log(results);
	  res.render('user/edit', {data : results});
	});
})

router.post('/edit/:uname', (req, res)=>{

	user = {
		'uname' : req.body.uname,
		'email' : req.body.email,
		'pass'  : req.body.pass,
		'dept'  : req.body.dept
	}
	userModel.editUser(user, function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redurect('/edit/:uname');
		}
	})
})


router.get('/delete/:uname', (req, res)=>{

	var user = req.params.uname;

	userModel.getUser(user, function(results){
		console.log(results);
	  res.render('user/delete', {data : results});
	});

});

router.post('/delete/:uname', (req, res)=>{
		
	user = req.params.uname;
	userModel.deleteUser(user, function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.redurect('/delete/:uname');
		}
	})

});

module.exports = router;