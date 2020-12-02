const express = require('express');
const userModels = require('../models/userModels');
const userModel = require.main.require('./models/userModels');
const router = express.Router();

//////<------------------User Select------------------->//////

router.get('*',(req,res,next)=>{    // GET : (*)
	if(req.cookies['user'] == null){
		res.redirect("/login")
	}else{
		next()
	}
})

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
	userModel.getInformation(user,function(results){
		if(results[0].userType == 'seller'){
			res.redirect('/home/seller');
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
			'validity'	: 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/admin/seeManagers');
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
			'validity'	: 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/admin/seeSellers');
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
			'validity'	: 'valid'
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


router.get('/admin/customizeManager', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	userModel.getAllmanagers(function(results){
		manager = results;
		// console.log(sellers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/customize/customizeManager', {layout : './layouts/admin-main', userInformation : results, managerInformation : manager});
	  });
})

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


router.get('/admin/customizeManager/edit/:userName', (req, res)=>{

	var manager = req.params.userName;

	userModel.getManager(manager, function(results){
		managers = results;
	})

	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/admin/customize/edit/editManager', {layout : './layouts/admin-main', userInformation : results, managerInformation : managers});
	  });
})

router.post('/admin/customizeManager/edit/:userName', (req, res)=>{

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
			res.redirect('/home/admin/customizeManager');
		}else{
			res.redirect('/admin/customizeManager/edit/"'+user.userName+'"')
		}
	})  
})



router.get('/admin/customizeManager/delete/:userName', (req, res)=>{

	var manager = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getManager(manager, function(results){
		managers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/admin/customize/delete/deleteManager', {layout : './layouts/admin-main', userInformation : results, managerInformation : managers});
	  });
	  
})

router.post('/admin/customizeManager/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteManager(user, function(status){
		if(status){
			res.redirect('/home/admin/customizeManager');
		}else{
			res.redirect('/home/admin/customizeManager/delete/'+user.userName+'');
		}
	})
})


router.get('/admin/customizeSeller/edit/:userName', (req, res)=>{

	var seller = req.params.userName;

	userModel.getSeller(seller, function(results){
		sellers = results;
	})

	user ={
		userName : req.cookies['user']
	};

	userModel.getInformation(user, 
		function(results){
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

	//console.log(req.body.name);

	userModel.editSeller(user, function(status){
		if(status){
			res.redirect('/home/admin/customizeSeller');
		}else{
			res.redirect('/admin/customizeSeller/edit/"'+user.userName+'"')
		}
	})  
})



router.get('/admin/customizeSeller/delete/:userName', (req, res)=>{

	var seller = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getSeller(seller, function(results){
		sellers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/admin/customize/delete/deleteSeller', {layout : './layouts/admin-main', userInformation : results, sellerInformation : sellers});
	  });
	  
})

router.post('/admin/customizeSeller/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteSeller(user, function(status){
		if(status){
			res.redirect('/home/admin/customizeSeller');
		}else{
			res.redirect('/home/admin/customizeSeller/delete/'+user.userName+'');
		}
	})
})


router.get('/admin/customizeFarmer/edit/:userName', (req, res)=>{

	var farmer = req.params.userName;

	userModel.getFarmer(farmer, function(results){
		farmers = results;
	})

	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/admin/customize/edit/editFarmer', {layout : './layouts/admin-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.post('/admin/customizeFarmer/edit/:userName', (req, res)=>{

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
			res.redirect('/home/admin/customizeFarmer');
		}else{
			res.redirect('/admin/customizeFarmer/edit/"'+user.userName+'"')
		}
	})  
})



router.get('/admin/customizeFarmer/delete/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmers = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/admin/customize/delete/deleteFarmer', {layout : './layouts/admin-main', userInformation : results, farmerInformation : farmers});
	  });
	  
})

router.post('/admin/customizeFarmer/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	console.log(user.userName);

	userModel.deleteFarmer(user, function(status){
		if(status){
			res.redirect('/home/admin/customizeFarmer');
		}else{
			res.redirect('/home/admin/customizeFarmer/delete/'+user.userName+'');
		}
	})
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
	});

	userModel.getInformation(user, function(results){
		res.render('user/admin/seeCategories', {layout : './layouts/admin-main', userInformation : results, categoryInformation: category });
	});

})


router.get('/admin/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/customizeCategory/editCategory', {layout : './layouts/admin-main', userInformation : results, catInformation : category});
	  });

})

router.post('/admin/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
		'catName' 	: req.body.name,
	}

	//console.log(catName);

	userModel.editCategory(category,function(status){
		if(status){
			res.redirect('/home/admin/seeCategories');
		}else{
			res.redirect('/home/admin/editCategory/:catId');
		}
	})

	// userModel.getInformation(user, function(results){
	// 	res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	//   });

})

router.get('/admin/deleteCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/customizeCategory/deleteCategory', {layout : './layouts/admin-main', userInformation : results, catInformation : category});
	  });

})

router.post('/admin/deleteCategory/:catId', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
	}

	//console.log(catName);

	userModel.deleteCategory(category,function(status){
		if(status){
			res.redirect('/home/admin/seeCategories');
		}else{
			res.redirect('/home/admin/deleteCategory/:catId');
		}
	})

})



//-------------------------------------Product-----------------------------------------------


router.get('/admin/addProduct', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
			category = result;
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/addProduct', {layout : './layouts/admin-main', userInformation : results, categoryInformation: category });
	});

	//res.render('user/manager/addProduct');
})



router.post('/admin/addProduct', (req, res)=>{

	if(req.body.category != null){
		newProduct = {
			'productName' 	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'imageURL' 	: req.body.productImage
		}
		userModel.createProduct(newProduct,function(status){
			if(status){
				res.redirect('/home/admin/seeProducts');
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
	});
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
		res.render('user/admin/customize/edit/editProduct', {layout : './layouts/admin-main',userInformation : results, productInformation : products});
	});
})

router.post('/admin/editProduct/:{id}', (req, res)=>{
	if(req.body.category != 'Select Category'){
		product = {
			'id'			:req.params.productId,
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'imageURL' 		: req.files.productImage.name
		}

		//console.log(req.files.productImage);

		var file = req.files.productImage;

	file.mv('./assets/img/'+file.name, function(error){
		
		if(error == null){
			userModel.editProduct(product,function(status){
				console.log(status)
				if(status){
					res.redirect('/home/admin/customizeProducts');
				}else{
					res.redirect('/home/admin/editProduct/:productId');
				}
			})
		}else{
			res.redirect('/home/admin/addProduct/:productId');
		}
	});

	}else{
			res.redirect('/home/admin/addProduct');
	}
})

router.get('/admin/customizeProducts', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllproducts(function(results){
		products = results;
	})
	userModel.getInformation(user, function(results){
		res.render('user/admin/seeProducts', {layout : './layouts/admin-main',userInformation : results, productInformation : products});
	});
})


router.get('/admin/deleteProduct/:productId', (req, res)=>{

	var id = req.params.productId;

	user ={
		userName : req.cookies['user']
	}

	userModel.getProduct(id, function(results){
		product = results;
		console.log(product.productName)
	})

	userModel.getInformation(user,function(results){
		res.render('user/admin/customizeProducts/deleteProduct', {layout : './layouts/admin-main', userInformation : results, productInformation : product});
	  });
	  
})

router.post('/admin/deleteProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
	}

	//console.log(product);

	userModel.deleteProduct(product, function(status){
		if(status){
			res.redirect('/home/admin/customizeProducts/');
		}else{
			res.redirect('/home/admin/deleteProduct/'+product.id+'');
		}
	})

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
	});
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
			'userType' 	: 'seller',
			'validity'	: 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/manager/seeSellers');
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
			'image' 		: req.files.productImage.name
		}

		var file = req.files.productImage;

	file.mv('./assets/img/'+file.name, function(error){
		
		if(error == null){
			userModel.createProduct(newProduct,function(status){
				if(status){
					res.redirect('/home/manager/customizeProducts');
				}else{
					res.redirect('/home/manager/addProduct');
				}
			})
		}else{
			res.redirect('/home/manager/addProduct');
		}
	});

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

	if(req.body.category != 'Select Category'){
		product = {
			'id'			:req.params.productId,
			'productName'	: req.body.productName,
			'description'   : req.body.description,
			'category'		: req.body.category,
			'expDate'		: req.body.expDate,
			'quantity' 		: req.body.quantity,
			'price' 		: req.body.price,
			'imageURL' 		: req.files.productImage.name
		}

		console.log(req.files.productImage);

		var file = req.files.productImage;

	file.mv('./assets/img/'+file.name, function(error){
		
		if(error == null){
			userModel.editProduct(product,function(status){
				if(status){
					res.redirect('/home/manager/customizeProducts');
				}else{
					res.redirect('/home/manager/editProduct/:productId');
				}
			})
		}else{
			res.redirect('/home/manager/addProduct/:productId');
		}
	});

	}else{
			res.redirect('/home/manager/addProduct');
	}
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

router.get('/manager/viewProduct/:productId', (req, res)=>{
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
		res.render('user/manager/customizeProducts/viewProduct', {layout : './layouts/manager-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

	//res.render('user/manager/editProducts');
})

router.get('/manager/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/manager/addCategory', {layout : './layouts/manager-main', userInformation : results});
	});
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

router.get('/manager/seeCategories', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
		category = result;
		//console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/seeCategories', {layout : './layouts/manager-main', userInformation : results, categoryInformation: category });
	  });

})

router.get('/manager/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	  });

})

router.post('/manager/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
		'catName' 	: req.body.name,
	}

	//console.log(catName);

	userModel.editCategory(category,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/editCategory/:catId');
		}
	})

	// userModel.getInformation(user, function(results){
	// 	res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	//   });

})

router.get('/manager/deleteCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/customizeCategory/deleteCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	  });

})

router.post('/manager/deleteCategory/:catId', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
	}

	//console.log(catName);

	userModel.deleteCategory(category,function(status){
		if(status){
			res.redirect('/home/manager/seeCategories');
		}else{
			res.redirect('/home/manager/deleteCategory/:catId');
		}
	})

})

router.get('/manager/systemLeave', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/manager/systemLeave', {layout : './layouts/manager-main', userInformation : results});
	  });

})

router.post('/manager/systemLeave', (req, res)=>{
	userNotification ={
		description			: req.body.notify,
		notificationType 	: req.body.notificationType,
		name 				: req.cookies['user'],
		userType			: req.body.userType,
		approval			: 'pending'
	}

	userModel.sendRequest(userNotification, function(status){
		if(status){
			userModel.getInformation(user, function(results){
				res.render('user/manager/Massege', {layout : './layouts/manager-main', userInformation : results});
			  });
		}else{
			res.redirect('/home/manager/systemLeave');
		}
	})
})

///home/manager/editCategory/





////////////////////////<-------manager-------->////////////////////

//////////////// seller////////////////////////

router.get('/seller', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/seller/home', {layout : './layouts/seller-main', userInformation : results});
	  });
})

router.get('/seller/profile', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user,function(results){
		res.render('user/seller/profile', {layout : './layouts/seller-main', userInformation : results});
		console.log(results);    
	  });	
});

router.post('/seller/profile', (req, res)=>{
	
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
				res.redirect('/home/seller/profile');
				console.log('1');
			}else{
				res.redirect('/home/seller/profile');
				console.log('2');
			}
		})
	}else{
			res.redirect('/home/seller/profile');
			console.log('3');
		}
	
	// userModel.getInformation(function(results){
	// 	res.render('user/manager/profile', {userInformation : results});
	//   });	
});

router.get('/seller/seeFarmers', (req, res)=>{

	userModel.getAllfarmers(function(results){
		farmers = results;
		//console.log(farmers);
	})
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/seller/seeUsers/seeFarmers', {layout : './layouts/seller-main',userInformation : results, farmerInformation : farmers});
	  });
	//res.render('user/manager/seeUsers/seeFarmers');
})

router.get('/seller/addFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user,function(results){
		res.render('user/seller/addUser/addFarmer', {layout : './layouts/seller-main', userInformation : results});
	  });

})

router.post('/seller/addFarmer', (req, res)=>{

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
			'userType' 	: 'farmer',
			'validity'  : 'valid'
		}
		userModel.createUser(newUser,function(status){
			if(status){
				res.redirect('/home/seller/seeFarmers');
			}else{
				res.redirect('/home/seller/addFarmer');
			}
		})
	}else{
			res.redirect('/home/seller/addFarmer');
		}

	//res.render('user/manager/addUser/addFarmer',  {userInformation : results});
})

router.get('/seller/customizeFarmer', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllfarmers(function(results){
		farmers = results;
		// console.log(farmers);
	})

	userModel.getInformation(user, function(results){
		res.render('user/seller/customize/customizeFarmer', {layout : './layouts/seller-main', userInformation : results, farmerInformation : farmers});
	  });
})

router.get('/seller/customizeFarmer/edit/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/seller/customize/edit/editFarmer', {layout : './layouts/seller-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/seller/customizeFarmer/edit/:userName', (req, res)=>{

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
			res.redirect('/home/seller/customizeFarmer');
		}else{
			res.redirect('/seller/customizeFarmer/edit/"'+user.userName+'"');
		}
	})
})


router.get('/seller/addCategory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user,function(results){
		res.render('user/seller/addCategory', {layout : './layouts/seller-main', userInformation : results});
	});
})

router.get('/manager/leaveHistory', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.leaveHistory(user,function(results){
		leaveHistory = results;
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/leaveHistory', {layout : './layouts/manager-main', userInformation : results, leaveHistory: leaveHistory});
	  });

})

router.post('/manager/validitySeller', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.sellerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.sellerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

router.post('/manager/validityFarmer', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.farmerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.farmerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

// router.post('/manager/validitySeller', (req, res)=>{

// 	const id = req.body.userId;
// 	console.log(id);

// 	userModels.getUser()
// 	result[0].validity =='valid'
	
// 	userModel.sellerValidity(id, function(status){
// 		if (status) {
// 			res.json({
// 				validity:"valided"
// 			})
// 		}else{
// 			res.json({
// 				validity:"failed"
// 			})
// 		}


// 		else 
// 		userModel.sellerValidity(id, function(status){
// 			if (status) {
// 				res.json({
// 					validity:"valided"
// 				})
// 			}else{
// 				res.json({
// 					validity:"failed"
// 				})
// 			}
	
// 	  });

// })

router.get('/admin/checkNotifications', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.checkNotificationsAdmin(function(results){
		notifications = results;
		console.log(results);
	})

	userModel.getInformation(user, function(results){
		res.render('user/admin/checkNotifications', {layout : './layouts/admin-main', userInformation : results, notifications : notifications});
	  });

})


router.get('/manager/checkNotifications', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.checkNotificationsManager(function(results){
		notifications = results;
		console.log(results);
	})

	userModel.getInformation(user, function(results){
		res.render('user/manager/checkNotifications', {layout : './layouts/manager-main', userInformation : results, notifications : notifications});
	  });

})

router.post('/manager/validitySeller', (req, res)=>{

	const id = req.body.userId;
	console.log(id);

	userModel.getUserbyid(id, function(results){

		console.log(results);

		if(results[0].validity == 'valid'){
			userModel.sellerInvalid(id, function(status){
				if (status) {
					res.json({
						validity:"Invalid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}else{
			userModel.sellerValid(id, function(status){
				if (status) {
					res.json({
						validity:"Valid"
					})
				}else{
					res.json({
						validity:"failed"
					})
				}
			 });
		}

	  });

})

// router.post('/manager/validitySeller', (req, res)=>{

// 	const id = req.body.userId;
// 	console.log(id);

// 	userModels.getUser()
// 	result[0].validity =='valid'
	
// 	userModel.sellerValidity(id, function(status){
// 		if (status) {
// 			res.json({
// 				validity:"valided"
// 			})
// 		}else{
// 			res.json({
// 				validity:"failed"
// 			})
// 		}


// 		else 
// 		userModel.sellerValidity(id, function(status){
// 			if (status) {
// 				res.json({
// 					validity:"valided"
// 				})
// 			}else{
// 				res.json({
// 					validity:"failed"
// 				})
// 			}
	
// 	  });

// })



// router.get('/manager/checkNotifications/:notificationId', (req, res)=>{
// 	user ={
// 		userName : req.cookies['user']
// 	}


router.post('/seller/addCategory', (req, res)=>{
	newCategory = {
		'name' 	   	: req.body.name
	}
	userModel.createCategory(newCategory,function(status){
		if(status){
			res.redirect('/home/seller/seeCategories');
		}else{
			res.redirect('/home/seller/addCategory');
		}
	})
})

router.get('/seller/seeCategories', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}
	userModel.getAllcategories(function(result){
		category = result;
		//console.log(result);
	})

	userModel.getInformation(user, function(results){
		res.render('user/seller/seeCategories', {layout : './layouts/seller-main', userInformation : results, categoryInformation: category });
	  });

})

router.get('/seller/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/seller/customizeCategory/editCategory', {layout : './layouts/seller-main', userInformation : results, catInformation : category});
	  });

})

router.post('/seller/editCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
		'catName' 	: req.body.name,
	}

	//console.log(catName);

	userModel.editCategory(category,function(status){
		if(status){
			res.redirect('/home/seller/seeCategories');
		}else{
			res.redirect('/home/seller/editCategory/:catId');
		}
	})

	// userModel.getInformation(user, function(results){
	// 	res.render('user/manager/customizeCategory/editCategory', {layout : './layouts/manager-main', userInformation : results, catInformation : category});
	//   });

})

router.get('/seller/deleteCategory/:catId', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	catId = req.params.catId;

	userModel.getCategory(catId,function(result){
		category = result;
		//console.log(category);
	})

	userModel.getInformation(user, function(results){
		res.render('user/seller/customizeCategory/deleteCategory', {layout : './layouts/seller-main', userInformation : results, catInformation : category});
	  });

})

router.post('/seller/deleteCategory/:catId', (req, res)=>{

	user ={
		userName : req.cookies['user']
	}

	category = {
		'id'		: req.params.catId,
	}

	//console.log(catName);

	userModel.deleteCategory(category,function(status){
		if(status){
			res.redirect('/home/seller/seeCategories');
		}else{
			res.redirect('/home/seller/deleteCategory/:catId');
		}
	})

})

router.get('/seller/addProduct', (req, res)=>{
	console.log('categories');
	user ={
		userName : req.cookies['user']
	}

	userModel.getAllcategories(function(result){
		categories = result;
		console.log('categories');
})

	userModel.getInformation(user, function(results){
		res.render('user/seller/addProduct', {layout : './layouts/seller-main', userInformation : results, categoryInformation : categories});
	  });
})

router.post('/seller/addProduct', (req, res)=>{

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
				res.redirect('/home/seller/customizeProducts');
			}else{
				res.redirect('/home/seller/addProduct');
			}
		})
	}else{
			res.redirect('/home/seller/addProduct');
	}
})

router.get('/seller/seeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		product = results;
	});
	user ={
		userName : req.cookies['user']
	}
	userModel.getInformation(user, function(results){
		res.render('user/seller/seeProducts', {layout : './layouts/seller-main',userInformation : results, productInformation : product});
	});
})


router.get('/seller/customizeProducts', (req, res)=>{
	userModel.getAllproducts(function(results){
		products = results;
	})
	user ={
		userName : req.cookies['user']
	}
	
	userModel.getInformation(user, function(results){
		res.render('user/seller/customizeProducts/customizeProducts', {layout : './layouts/seller-main',userInformation : results, productInformation : products});
	});
})

router.get('/seller/editProduct/:productId', (req, res)=>{
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
		res.render('user/seller/customizeProducts/editProduct', {layout : './layouts/seller-main', userInformation : results, categoryInformation : categories, productInformation : product});
	  });

	//res.render('user/manager/editProducts');
})

router.post('/seller/editProduct/:productId', (req, res)=>{

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
			res.redirect('/home/seller/customizeProducts');
		}else{
			//console.log(0);
			res.redirect('/home/seller/editProduct/'+product.id+'');
		}
	})

})

router.get('/seller/deleteProduct/:productId', (req, res)=>{

	var id = req.params.productId;

	user ={
		userName : req.cookies['user']
	}

	userModel.getProduct(id, function(results){
		product = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/seller/customizeProducts/deleteProduct', {layout : './layouts/seller-main', userInformation : results, productInformation : product});
	  });
	  
})

router.post('/seller/deleteProduct/:productId', (req, res)=>{

	product = {
		'id'			: req.params.productId,
	}

	//console.log(product);

	userModel.deleteProduct(product, function(status){
		if(status){
			res.redirect('/home/seller/customizeProducts');
		}else{
			res.redirect('/home/seller/deleteProduct/'+product.id+'');
		}
	})

})

router.get('/seller/systemLeave', (req, res)=>{
	user ={
		userName : req.cookies['user']
	}

	userModel.getInformation(user, function(results){
		res.render('user/seller/systemLeave', {layout : './layouts/seller-main', userInformation : results});
	  });

})

router.post('/seller/systemLeave', (req, res)=>{
	userNotification ={
		description			: req.body.notify,
		notificationType 	: req.body.notificationType,
		name 				: req.cookies['user'],
		userType			: req.body.userType
	}

	userModel.sendRequest(userNotification, function(status){
		if(status){
			userModel.getInformation(user, function(results){
				res.render('user/seller/Massege', {layout : './layouts/sell-main', userInformation : results});
			  });
		}else{
			res.redirect('/home/seller/systemLeave');
		}
	})
})
router.get('/seller/customizeFarmer/delete/:userName', (req, res)=>{

	var farmer = req.params.userName;

	user ={
		userName : req.cookies['user']
	}

	userModel.getFarmer(farmer, function(results){
		farmer = results;
	})

	userModel.getInformation(user,function(results){
		res.render('user/seller/customize/delete/deleteFarmer', {layout : './layouts/seller-main', userInformation : results, farmerInformation : farmer});
	  });
	  
})

router.post('/seller/customizeFarmer/delete/:userName', (req, res)=>{

	user = {
		userName 	: req.params.userName,
	}

	//console.log(user.userName);

	userModel.deleteFarmer(user, function(status){
		if(status){
			res.redirect('/home/seller/customizeFarmer');
		}else{
			res.redirect('/home/seller/customizeFarmer/delete/'+user.userName+'');
		}
	})
})



module.exports = router;