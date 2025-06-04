const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rahasia_youtimeL';

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
};
