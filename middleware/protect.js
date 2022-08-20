const User = require('../models/User');
const jwt = require('jsonwebtoken');


module.exports = protect = async (req,res, next) => {
    try{
  // Check if token exists in cookies
      const token = req.cookies.token;
      if (!token) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
  //  Check is token is valid
      const decoded = await jwt.verify(token , process.env.JWT_SECRET);
  // Check if user still exists
      const user = await User.findById(decoded.id);
      
      if (!user) return res.status(401).json({   status: 'error', message: 'Unauthorized' });  // 401 Unauthorized
  //  Check if user is activated
      if (!user.activated) return res.status(401).json({   status: 'error', message: 'Activate your account' }); // 401 Unauthorized
  next()
  } catch (error) {
    return res.status(400).json({ status: 'error', message : "Something went wrong"})
  }
  }