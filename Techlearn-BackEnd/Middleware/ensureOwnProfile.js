const ensureOwnProfile = (req, res, next) => {
    // Ensure the user is authenticated with JWT
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Compare the user ID from JWT with the ID in the request parameters
    if (req.params.id.toString() === req.user._id.toString()) {
      return next(); // Authorized: proceed with the request
    }
  
    res.status(403).json({ message: "You are not authorized to edit this profile." }); // Not authorized
  };
  
  module.exports = ensureOwnProfile;
  