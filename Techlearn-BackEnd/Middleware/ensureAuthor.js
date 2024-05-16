const ensureAuthor = (model) => {
    return async (req, res, next) => {
      try {
        const item = await model.findById(req.params.id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found.' });
        }
  
        if (!req.user) {
          return res.status(401).json({ message: 'Authentication required.' });
        }
  
        const userId = req.user._id.toString(); // Ensure it's a string for comparison
  
        // Check if the logged-in user is the author
        if (item.author && item.author.toString() !== userId) {
          return res.status(403).json({ message: 'You do not have permission to edit this item.' });
        }
  
        // Check if the logged-in user is the owner
        if (item.owner && item.owner.toString() !== userId) {
          return res.status(403).json({ message: 'You do not have permission to edit this item.' });
        }
  
        req.item = item; // Add item to the request for further use
        next(); // Authorized: proceed with the request
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    };
  };
  
  module.exports = ensureAuthor;
  