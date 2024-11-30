const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

module.exports = { protect };
