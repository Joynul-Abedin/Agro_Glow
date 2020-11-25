
const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
	res.clearCookie('user');
	res.redirect('/login');
});

router.post('/', (req, res)=>{
	res.redirect('/home');
});

module.exports = router;