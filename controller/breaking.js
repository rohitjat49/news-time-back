const cloudinary = require('../config/cloudinary');
const File = require('../module/breakingnews');

exports.uploadfile = async (req, res) => {
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
    const data = await File.create({
      file: { // Ensure this matches your schema
        client_id: uploadedfile.public_id,
        url: uploadedfile.secure_url // Use secure_url to avoid mixed content issues
      },
      headline,
      description,
      link
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
exports.getbreakingnews = async (req, res) => {
  try {
      // Fetch all photos from the database
      const file = await File.find();
   
  
      // If no photos found, return an empty array
      if (!file || file.length === 0) {
        return res.status(404).json({ message: "No file found" });
      }
  
      // Return the photos with their captions
      return res.json({ message: "Dashboard retrieved successfully", file});
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.getonebreakingnews= async (req, res) => {
  try {
    const Id = req.params.Id;
    if (Id) {
      const product = await File.findById(Id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    const products = await File.find();
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};
exports.deletebreakingnews = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedbreakingnews = await File.findByIdAndDelete(id);

    if (!deletedbreakingnews) {
      return res.status(404).json({ message: "breaking news not found" });
    }

    return res.json({ message: "breaking news deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to delete breaking news", error: err.message });
  }
};