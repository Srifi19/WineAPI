
const BrandModel = require('../Models/BrandModel');
const createFileUploadMiddleware = require('../middleware/upload');
const uploadLogo = createFileUploadMiddleware("logo");
const fs = require('fs')
const path = require('path');



exports.createBrandData = async (req, res) => {
  const { brandName, brandDescription, websiteUrl, email, region, area, phoneNumber } = req.body;
  const { logo } = req.files;
  try {
    if (logo !== undefined) {
      // Specify the destination directory where you want to save the logo
      const destinationDir = path.join(__dirname, 'Winery', 'Files', 'Logos');

      // Ensure the destination directory exists
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
      
      // Construct the full path to the destination file
      const destinationPath = path.join(destinationDir, logo.name);

      // Save the uploaded logo data to the destination file
      fs.writeFile(destinationPath, logo.data, async (error) => {
        if (error) {
          console.error('Error saving logo data to file:', error);
          res.status(500).json({ message: 'Error saving logo data to file' });
        } else {
          console.log('Logo data saved to file:', destinationPath);

          // Continue with handling brand data or response
          await BrandModel.createBrandData(brandName, brandDescription, websiteUrl, destinationPath, email, region, area ,phoneNumber)
            .then((id) => {
              res.status(200).json({ message: "All works", BrandId: id });
            })
            .catch(() => {
              res.status(200).json({ message: "All dont work" });
            });
        }
      });
    } else {
      // Handle the case where no logo was uploaded
      console.log('No logo uploaded');
      res.status(400).json({ message: 'No logo uploaded' });
    }
  } catch (err) {
    console.error("Error uploading logo:", err);
    res.status(500).json({ message: "Error uploading logo" });
  }
}



/*
exports.createBrandMedia = async (req,res) => {

}
*/

exports.validateEmailAndSendToken = async (req, res) => {
  const { mailAddress } = req.body;

  try {
    // Validate the email and get the brand ID
    const brandId = await BrandModel.validateEmail(mailAddress);

    if (brandId) {
      await BrandModel.createOTPToken(mailAddress);

      // Send a success response
      res.status(200).json({
        message: "OTP Has Been Sent Successfully",
        success: 1,
        brandId: brandId,
      });
    } else {
      res.status(400).json({ message: "Email validation failed", success: false });
    }
  } catch (error) {
    if (error.sqlMessage == "Email Already Validated") {
      res.status(403).json({ message: "Email Already Validated", success: false });
    } else {
      console.error("Error validating email and sending OTP:", error);
      res.status(500).json({ message: "Failed to validate email and send OTP", success: false });
    }

  }
}

exports.getBrandByEmail = async (req, res) => {
  const { mailAddress, pin } = req.body

  try {
    const brand = await BrandModel.GetBrandByEmail(mailAddress, pin)

    if (brand) {
      const data = JSON.parse(brand);
      res.status(200).json({ success: true, message: "Brand found", data: data });
    } else {
      res.status(404).json({ success: false, message: "Brand not found" });
    }
  } catch (error) {
    if (error.sqlMessage == "Email Already Validated") {
      res.status(403).json({ message: "Email Already Validated", success: false });
    } else {
      res.status(500).json({ success: false, message: "Failed to retrieve brand" });
    }


  }
}



