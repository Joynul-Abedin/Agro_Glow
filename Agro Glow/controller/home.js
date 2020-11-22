const express = require('express');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

//////<------------------User Select------------------->//////

router.get('/', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	console.log(user.userName);
	userModel.getInformation(user,function(results){
		if(results[0].userType == 'admin'){
			res.redirect('/home/admin');
		}
	});

	userModel.getInformation(user,function(results){
		if(results[0].userType == 'manager'){
			res.redirect('/home/manager');
		}
	});
})


///////--------------------------------Admin Routes---------------------------------/////////

router.get('/admin', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/admin/home', {layout : './layouts/admin-main', userInformation : results});
	  });
})

router.get('/admin/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/admin/profile', {layout : './layouts/admin-main', userInformation : results});
		console.log(results);    
	  });	
});

router.post('/admin/profile', (req, res)=>{
	
	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		user = {
			'userName'  : req.body.userName,
			'name'  	: req.body.name,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/admin/profile');
				console.log('1');
			}else{
				res.redirect('/home/admin/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/admin/profile');
			console.log('3');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
});


//----------------------------------See Users--------------------------------------------


router.get('/admin/seeManagers', (req, res)=>{

	userModel.getAllmanagers(function(results){
		manager = results;
		//console.log(manager);
	})
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeUsers/seeManagers', {layout : './layouts/admin-main',userInformation : results, managerInformation : manager});
	  });

	//res.render('user/manager/seeUsers/seeSellers');
})

router.get('/admin/seeSellers', (req, res)=>{

	userModel.getAllsellers(function(results){
		sellers = results;
		console.log(sellers);
	})
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeUsers/seeSellers', {layout : './layouts/admin-main',userInformation : results, sellerInformation : sellers});
	  });

	//res.render('user/manager/seeUsers/seeSellers');
})

router.get('/admin/seeFarmers', (req, res)=>{

	userModel.getAllfarmers(function(results){
		farmers = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/admin/seeUsers/seeFarmers', {layout : './layouts/admin-main',userInformation : results, farmerInformation : farmers});
	  });
	//res.render('user/manager/seeUsers/seeFarmers');
})


//--------------------------------------Add Users---------------------------------------------


router.get('/admin/addManager', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/admin/addUser/addManager', {layout : './layouts/admin-main', userInformation : results});
	  });

})

router.post('/admin/addManager', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'Manager',
			'validity'	: '1'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/admin/seeManager');
			}else{
				res.redirect('/home/admin/addManager');
			}
		})
	}else{
			res.redirect('/home/admin/addManager');
		}

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/addUser/addSeller', {userInformation : results});
	//   });

})

router.get('/admin/addSeller', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/admin/addUser/addSeller', {layout : './layouts/admin-main', userInformation : results});
	  });

})

router.post('/admin/addSeller', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'password2' : req.body.repassword,
			'userType' 	: 'seller',
			'validity'	: '1'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/admin/seeFarmers');
			}else{
				res.redirect('/home/admin/addSeller');
			}
		})
	}else{
			res.redirect('/home/admin/addSeller');
		}

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/addUser/addSeller', {userInformation : results});
	//   });

})

router.get('/admin/addFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/admin/addUser/addFarmer', {layout : './layouts/admin-main', userInformation : results});
	  });

})

router.post('/admin/addFarmer', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'farmer',
			'validity'	: '1'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/admin/seeFarmers');
			}else{
				res.redirect('/home/admin/addFarmer');
			}
		})
	}else{
			res.redirect('/home/admin/addFarmer');
	}
})

//----------------------------------------Customize Users -----------------------------------------------

router.get('/admin/customizeSeller', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	userModel.getAllsellers(function(results){
		sellers = results;
		// console.log(sellers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/customize/customizeSeller', {layout : './layouts/admin-main', userInformation : results, sellerInformation : sellers});
	  });
})

router.get('/admin/customizeFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllfarmers(function(results){
		farmers = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/customize/customizeFarmer', {layout : './layouts/admin-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.get('/admin/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getSeller(seller, function(results){
		sellers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/admin/customize/edit/editSeller', {layout : './layouts/admin-main', userInformation : results, sellerInformation : sellers});
	});
	  
})

router.post('/admin/customizeSeller/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editSeller(user, function(status){
		if(status){
			res.redirect('/home/admin/customizeSeller');
		}else{
			res.redirect('/admin/customizeSeller/edit/"'+user.userName+'"')
		}
	})  
})

router.get('/admin/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	userModel.getFarmer(seller, function(results){
		farmers = results;
	})

	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(function(results){
		res.render('user/admin/customize/edit/editFarmer', {layout : './layouts/admin-main', userInformation : results, farmerInformation : farmers});
	  });
})

//-------------------------------------Category-----------------------------------------------



router.get('/admin/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/admin/addCategory', {layout : './layouts/admin-main', userInformation : results});
	});
})

router.post('/admin/addCategory', (req, res)=>{
	newCategory = {
		'name' 	   	: req.body.name
	}
	userModel.createCategory(newCategory,function(status){
		if(status){
			res.redirect('/home/admin/seeCategories');
		}else{
			res.redirect('/home/admin/addCategory');
		}
	})
})

router.get('/admin/seeCategories', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
		category = result;
		console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/seeCategories', {layout : './layouts/admin-main', userInformation : results, categoryInformation: category });
	  });

})



//-------------------------------------Product-----------------------------------------------


router.get('/admin/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
			category = result;
			console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/addProduct', {layout : './layouts/admin-main', userInformation : results, categoryInformation: category });
	});

	//res.render('user/manager/addProduct');
})

router.post('/admin/addProduct', (req, res)=>{

	if(category != null){
		newProduct = {
			'name' 	   		: req.body.name,
			'description'   : req.body.descrip,
			'DOB'			: req.body.DOB,
			'mobileNo'		: req.body.mobileNo,
			'userName' 		: req.body.userName,
			'password' 		: req.body.password,
			'userType' 		: 'farmer',
			'validity'		: '1'
		}
		userModel.createProduct(newProduct,function(status){
			if(status){
				res.redirect('/home/admin/seeProduct');
			}else{
				res.redirect('/home/admin/addProduct');
			}
		})
	}else{
			res.redirect('/home/admin/addProduct');
	}
})

router.get('/admin/seeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		product = results;
	})
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeProducts', {layout : './layouts/admin-main',userInformation : results, productInformation : product});
	});
})

router.get('/admin/editProduct/:Id', (req, res)=>{
	
	var pId = req.params.Id;

	user ={
		userName : req.cookies['user']
	}
	userModel.getProduct(pId, function(results){
		products = results;
	})
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeProducts', {layout : './layouts/admin-main',userInformation : results, productInformation : products});
	});
})

router.post('/admin/editProduct/:{id}', (req, res)=>{
	userModel.editProduct(function(results){
		product = results;
	})
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeProducts', {layout : './layouts/admin-main',userInformation : results, productInformation : product});
	});
})


router.get('/admin/deleteProduct', (req, res)=>{
	userModel.getAllproducts(function(results){
		product = results;
		//console.log(manager);
	})
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeProducts', {layout : './layouts/admin-main',userInformation : results, productInformation : product});
	});
})




//--------------------------------Manager Routes--------------------------------

router.get('/manager', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/manager/home', {layout : './layouts/manager-main', userInformation : results});
	  });
})

router.get('/manager/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/manager/profile', {layout : './layouts/manager-main', userInformation : results});
		console.log(results);    
	  });	
});

router.post('/manager/profile', (req, res)=>{
	
	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		user = {
			'userName'  : req.body.userName,
			'name'  	: req.body.name,
			'email' 	: req.body.email,
			'DOB'   	: req.body.DOB,
			'mobileNo' 	: req.body.mobileNo,
			'password'	: password	
		}
		userModel.editUser(user,function(status){
			if(status){
				res.redirect('/home/manager/profile');
				console.log('1');
			}else{
				res.redirect('/home/manager/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/manager/profile');
			console.log('3');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
});

router.get('/manager/seeSellers', (req, res)=>{

	userModel.getAllsellers(function(results){
		sellers = results;
		console.log(sellers);
	})
	user ={
		userName : req.cookies['user']
	}
	//{layout : './layouts/main2'}
	userModel.getInformation(user, function(results){
		res.render('user/manager/seeUsers/seeSellers', {layout : './layouts/manager-main',userInformation : results, sellerInformation : sellers});
	  });

	//res.render('user/manager/seeUsers/seeSellers');
})

router.get('/manager/seeFarmers', (req, res)=>{

	userModel.getAllfarmers(function(results){
		farmers = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/seeUsers/seeFarmers', {layout : './layouts/manager-main',userInformation : results, farmerInformation : farmers});
	  });
	//res.render('user/manager/seeUsers/seeFarmers');
})

router.get('/manager/addSeller', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/addUser/addSeller', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/addSeller', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'seller'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeFarmers');
			}else{
				res.redirect('/home/manager/addSeller');
			}
		})
	}else{
			res.redirect('/home/manager/addSeller');
		}

	// userModel.getInformation(function(results){
	// 	res.render('user/manager/addUser/addSeller', {userInformation : results});
	//   });

})

router.get('/manager/addFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/manager/addUser/addFarmer', {layout : './layouts/manager-main', userInformation : results});
	});
})

router.post('/manager/addFarmer', (req, res)=>{

	if(req.body.password == req.body.repassword){
		password = req.body.password
		//console.log(req.body.firstName+' '+req.body.lastName);
	}else{
		password = null;
	}

	if(password != null){
		newUser = {
			'name' 	   	: req.body.firstName+' '+req.body.lastName,
			'email'    	: req.body.email,
			'DOB'		: req.body.DOB,
			'mobileNo'	: req.body.mobileNo,
			'userName' 	: req.body.userName,
			'password' 	: req.body.password,
			'userType' 	: 'farmer'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeFarmers');
			}else{
				res.redirect('/home/manager/addFarmer');
			}
		})
	}else{
			res.redirect('/home/manager/addFarmer');
		}

	//res.render('user/manager/addUser/addFarmer',  {userInformation : results});
})

router.get('/manager/customizeSeller', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	userModel.getAllsellers(function(results){
		sellers = results;
		// console.log(sellers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : sellers});
	  });
})

router.get('/manager/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getSeller(seller, function(results){
		sellers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/edit/editSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : sellers});
	  });
	  
})

router.post('/manager/customizeSeller/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editSeller(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeSeller');
		}else{
			res.redirect('/manager/customizeSeller/edit/"'+user.userName+'"');
		}
	})
})

router.get('/manager/customizeSeller/delete/:userName', (req, res)=>{

	var seller = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getSeller(seller, function(results){
		sellers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/delete/deleteSeller', {layout : './layouts/manager-main', userInformation : results, sellerInformation : sellers});
	  });
	  
})

router.post('/manager/customizeSeller/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	console.log(user.userName);

	userModel.deleteSeller(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeSeller');
		}else{
			res.redirect('/home/manager/customizeSeller/delete/'+user.userName+'');
		}
	})
})

router.get('/manager/customizeFarmer/delete/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/delete/deleteFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/manager/customizeFarmer/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteFarmer(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeFarmer');
		}else{
			res.redirect('/home/manager/customizeFarmer/delete/'+user.userName+'');
		}
	})
})

router.get('/manager/customizeFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllfarmers(function(results){
		farmers = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customize/customizeFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.get('/manager/customizeFarmer/edit/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customize/edit/editFarmer', {layout : './layouts/manager-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/manager/customizeFarmer/edit/:userName', (req, res)=>{

	user = {
		name   		: req.body.name,
		userName 	: req.params.userName,
		email		: req.body.email,
		DOB			: req.body.DOB,
		mobileNo	: req.body.mobileNo
	}

	console.log(req.body.name);

	userModel.editFarmer(user, function(status){
		if(status){
			res.redirect('/home/manager/customizeFarmer');
		}else{
			res.redirect('/manager/customizeFarmer/edit/"'+user.userName+'"');
		}
	})
})

router.get('/manager/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllcategories(function(result){
		categories = result;
})

	userModel.getInformation(user, function(results){
		res.render('user/manager/addProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories});
	  });
})

router.post('/manager/addProduct', (req, res)=>{

	if(req.body.category != 'Select Category'){
		newProduct = {
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'image' 		: 'nothing',
		}
		console.log(newProduct);
		userModel.createProduct(newProduct,function(status){
			// console.log(status);
			if(status){
				res.redirect('/home/manager/customizeProducts');
			}else{
				res.redirect('/home/manager/addProduct');
			}
		})
	}else{
			res.redirect('/home/manager/addProduct');
	}
})

router.get('/manager/customizeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		products = results;
	})
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeProducts/customizeProducts', {layout : './layouts/manager-main',userInformation : results, productInformation : products});
	});
})

router.get('/manager/editProduct/:productId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	productId = req.params.productId;

	userModel.getAllcategories(function(result){
		categories = result;
    })

	userModel.getProduct(productId , function(results){
		product = results;
		console.log(results[0].id);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeProducts/editProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

	//res.render('user/manager/editProducts');
})

router.post('/manager/editProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
		'productName'	: req.body.productName,
		'category'		: req.body.category,
		'price'			: req.body.price,
		'quantity'		: req.body.quantity,
		'expDate'		: req.body.expDate,
		'description'	: req.body.description,
		'imageURL'		: 'nothing'
	}

	//console.log(product);

	userModel.editProduct(product, function(status){
		if(status){
			//console.log(1);
			res.redirect('/home/manager/customizeProducts');
		}else{
			//console.log(0);
			res.redirect('/home/manager/editProduct/'+product.id+'');
		}
	})

})

router.get('/manager/deleteProduct/:productId', (req, res)=>{

	var id = req.params.productId;

	user ={
		userName : req.cookies['user']
	}

	userModel.getProduct(id, function(results){
		product = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/manager/customizeProducts/deleteProduct', {layout : './layouts/manager-main', userInformation : results, productInformation : product});
	  });
	  
})

router.post('/manager/deleteProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
	}

	//console.log(product);

	userModel.deleteProduct(product, function(status){
		if(status){
			res.redirect('/home/manager/customizeProducts');
		}else{
			res.redirect('/home/manager/deleteProduct/'+product.id+'');
		}
	})

})

router.get('/manager/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/manager/addCategory', {layout : './layouts/manager-main', userInformation : results});
	});
})

router.get('/manager/systemLeave', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/systemLeave', {layout : './layouts/manager-main', userInformation : results});
	  });

	//res.render('user/manager/systemLeave');
})

router.post('/manager/addCategory', (req, res)=>{
	newCategory = {
		'name' 	   	: req.body.name
	}
	userModel.createCategory(newCategory,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/addCategory');
		}
	})
})

////////////////////////<-------manager-------->////////////////////

module.exports = router;