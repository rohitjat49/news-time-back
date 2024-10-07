const cloudinary=require('../config/cloudinary');
const Photo= require('../module/cardphoto');


//const Notification= require('../module/allownotification');

exports.cardphoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { headline,description } = req.body;
    const image = req.file;
    console.log(image);

    const img = await cloudinary.uploader.upload(image.path, {
      folder: "photos"
    });
    console.log(img, "this is image");

    const data = await Photo.create({
      image: {
        client_id: img.public_id,
        url: img.url
      },
      headline,description
    });
    console.log(data);

    // const notification = new Notification({ message: 'New photo uploaded' });
    // await notification.save();

    res.status(200).json({
      message: "File uploaded successfully",
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllcard = async (req, res) => {
  try {
      // Fetch all photos from the database
      const photos = await Photo.find();
   
  
      // If no photos found, return an empty array
      if (!photos || photos.length === 0) {
        return res.status(404).json({ message: "No photos found" });
      }
  
      // Return the photos with their captions
      return res.json({ message: "Dashboard retrieved successfully", photos });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch dashboard", error: err.message });
    }
};
exports.getProduct = async (req, res) => {
  try {
    const Id = req.params.Id;
    if (Id) {
      const product = await Photo.findById(Id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    const products = await Photo.find();
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedcard = await Photo.findByIdAndDelete(id);

    if (!deletedcard) {
      return res.status(404).json({ message: "card not found" });
    }

    return res.json({ message: "card deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Failed to delete video", error: err.message });
  }
};




