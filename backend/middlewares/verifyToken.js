const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
    }

    req.userID = decoded.userID;

    next();
  } catch (error) {
    console.error('Error in verifyToken', error);
    return res.status(500).json({ success: false, message: 'Invalid token' });
  }
};
