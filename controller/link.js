const Link = require('../module/link');

// Function to create a new link
exports.createLink = async (req, res) => {
    const { url } = req.body;

    try {
        // Check if URL is provided
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        // Create a new link instance
        const link = new Link({ url });

        // Save the link to the database
        await link.save();

        return res.status(201).json({ message: 'Link created successfully', link });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create link', error: err.message });
    }
};

// Function to update a link by ID
// exports.updateLink = async (req, res) => {
//     const linkId = req.params.linkId;
//     const { url } = req.body;

//     try {
//         // Check if URL is provided
//         if (!url) {
//             return res.status(400).json({ message: 'URL is required' });
//         }

//         // Find the link by ID and update it
//         const updatedLink = await Link.findByIdAndUpdate(linkId, { url }, { new: true });

//         if (!updatedLink) {
//             return res.status(404).json({ message: 'Link not found' });
//         }

//         return res.json({ message: 'Link updated successfully', link: updatedLink });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Failed to update link', error: err.message });
//     }
// };

// Function to delete a link by ID
exports.deleteLink = async (req, res) => {
    const linkId = req.params.linkId;

    try {
        // Find the link by ID and delete it
        const deletedLink = await Link.findByIdAndDelete(linkId);

        if (!deletedLink) {
            return res.status(404).json({ message: 'Link not found' });
        }

        return res.json({ message: 'Link deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete link', error: err.message });
    }
};
exports.getAllLinks = async (req, res) => {
    try {
        // Fetch all links from the database
        const links = await Link.find();

        // Send the links as a JSON response
        return res.status(200).json(links);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to fetch links', error: err.message });
    }
};
