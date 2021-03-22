const jwt = require('jsonwebtoken');
const { config } = require('../../config/data')
module.exports = (req, res, next) => {
  // get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, config);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
