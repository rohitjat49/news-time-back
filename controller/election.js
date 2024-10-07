const cloudinary = require('../config/cloudinary');
const news= require('../module/election');
//const Notification = require('../module/allownotification');

exports.add = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headline, description, link } = req.body;
    const file = req.file;
    console.log(file);

    // Determine resource type based on file mimetype
    let resourceType;
    if (file.mimetype.startsWith('video/')) {
      resourceType = 'video';
    } else if (file.mimetype.startsWith('image/')) {
      resourceType = 'image';
    } else {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    // Upload file to Cloudinary
    const uploadedfile = await cloudinary.uploader.upload(file.path, {
      resource_type: resourceType,
      folder: "files"
    });
    console.log(uploadedfile, "this is file");

    // Save file details in the database
    const data = await news.create({
      file: { // Ensure this matches your schema
        client_id: uploadedfile.public_id,
        url: uploadedfile.secure_url // Use secure_url to avoid mixed content issues
      },
      headline,
      description,
      link,
    });
    console.log(data);

    res.status(200).json({
      message: "File uploaded successfully",
      data: data
    });
  } catch (error) { // Ensure error is defined here
    console.error('Error during file upload:', error);

    // Check if the error is from Cloudinary
    if (error.http_code) {
      return res.status(error.http_code).json({
        message: `Cloudinary error: ${error.message}`,
        error: error
      });
    }

    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
exports.get = async (req, res) => {
    try {
      // Fetch all Files from the database
      const file = await news.find();
  
  
      // If no Files found, return an empty array
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "No news found" });
      }
  
      // Return the Files with their captions
      return res.json({ message: "Dashboard retrieved successfully", file });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch dashboard", error: err.message });
    }
  };
  exports.delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFile = await news.findByIdAndDelete(id);
  
      if (!deletedFile) {
        return res.status(404).json({ message: "File not found" });
      }
  
      return res.json({ message: "File deleted successfully" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to delete File", error: err.message });
    }
  };
  
  