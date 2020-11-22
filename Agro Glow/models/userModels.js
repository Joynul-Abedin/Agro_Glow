const db = require('./db');

module.exports ={

    createUser : function(newUser, callback){
        var sql = "insert into users values (' ', '"+newUser.name+"', '"+newUser.email+"', '"+newUser.DOB+"', '"+newUser.mobileNo+"', '"+newUser.userName+"', '"+newUser.password+"', '"+newUser.userType+"', 'valid')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    validate : function(user, callback){
        var sql = 'select * from users where email = "'+user.userName+'" or username = "'+user.userName+'" and password = "'+user.password+'" and validity = "1" ';
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(true);
            }else{
                callback(false);
            }
        })
    },

    getInformation : function(user, callback){
        var sql = 'select * from users where email = "'+user.userName+'" or userName ="'+user.userName+'" and validity = "1"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllmanagers : function(callback){
        var sql = 'select * from users where userType = "manager"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllsellers : function(callback){
        var sql = 'select * from users where userType = "seller"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getAllfarmers : function(callback){
        var sql = 'select * from users where userType = "farmer"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    createProduct : function(newProduct, callback){
        var sql = "insert into products values (' ', '"+newProduct.productName+"', '"+newProduct.category+"', '"+newProduct.price+"', '"+newProduct.quantity+"', '"+newProduct.expDate+"', '"+newProduct.description+"', '"+newProduct.image+"')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    getAllproducts : function(callback){
        var sql = 'select * from products';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getProduct : function(productId, callback){
        var sql = 'select * from products where id = "'+productId+'" ';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    createCategory : function(newCategory, callback){
        var sql = "insert into categories values (' ', '"+newCategory.name+"')";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    getAllcategories : function(callback){
        var sql = 'select * from categories';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getProduct : function(pId, callback){
        var sql = 'select * from products where Id="'+pId+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getCategory : function(catName, callback){
        var sql = 'select * from categories where catName="'+catName+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getManager : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "manager"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },
    getSeller : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "seller"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getFarmer : function(userName, callback){
        var sql = 'select * from users where username = "'+userName+'" and userType = "farmer"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    editUser : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"', password = '"+user.password+"' where userName = '"+user.userName+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editManager : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='manager' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editSeller : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='seller' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editFarmer : function(user, callback){
        var sql = "update users set name = '"+user.name+"', email = '"+user.email+"', DOB = '"+user.DOB+"', mobileNo = '"+user.mobileNo+"' where userName = '"+user.userName+"' and userType ='Farmer' "
        db.execute(sql, function(status){
            callback(status);
        })
    },

    editProduct : function(product, callback){
        var sql = "update products set productName = '"+product.productName+"', description = '"+product.description+"', category = '"+product.category+"', price = '"+product.price+"', quantity = '"+product.quantity+"', expDate = '"+product.expDate+"', imageURL = '"+product.imageURL+"' where Id = '"+product.id+"' ";
        db.execute(sql, function(status){
            console.log(status);
            callback(status);
        })
    },

    deleteProduct : function(product, callback){
        var sql = "delete from products where id ='"+product.id+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteManager : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' ";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteSeller : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' ";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    deleteFarmer : function(user, callback){
        var sql = "delete from users where userName = '"+user.userName+"' ";
        db.execute(sql, function(status){
            callback(status);
        })
    },

    // validity : function(user, callback){
    //      var sql = "update users set validity = 'invalid' where userName = '"+user.userName+"' "
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    ////////////////////////

    getUsers : function(callback){
        var sql = 'select * from user';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    getUser : function(user, callback){
        var sql = 'select * from user where uname = "'+user+'"';
        db.getResults(sql, function(results){
            callback(results);
        })
    },

    // createUser : function(newUser, callback){
    //     var sql = "insert into user values ('"+newUser.uname+"', '"+newUser.email+"', '"+newUser.pass+"', '"+newUser.dept+"')";
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    // editUser : function(user, callback){
    //     var sql = "update user set email ='"+user.email+"', pass ='"+user.pass+"', dept ='"+user.dept+"' where uname ='"+user.uname+"'"
    //     db.execute(sql, function(status){
    //         callback(status);
    //     })
    // },

    deleteUser : function(user, callback){
        var sql = "delete from user where uname ='"+user+"'"
        db.execute(sql, function(status){
            callback(status);
        })
    }

}