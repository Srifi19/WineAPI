
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const randomOTP = require('../Helpers/randomOTP');


class BrandModel {
    constructor() { }

    async createBrandData(brandName , brandDescription , websiteUrl, logo ,email , region , area , phoneNumber){
        try {
            const result = await db.query('Call db_InsertBrandData(?,?,?,?,?,?,?,?)' , [brandName , brandDescription , websiteUrl, logo ,email , region , area , phoneNumber]);
            const brandId = result[0][0][0].brandId;
            return brandId;
        } catch (error) {   
            console.log(error);
        }
    }
    
    async validateEmail(email){
        try {
            const result = await db.query('Select db_ValidateEmail(?)' , [email]);
            const response = result[0][0]
            for (const key in response) {
                if (key.includes("db_ValidateEmail")) {
                    const pass = response[key];
                    return pass; // Return the user's password if found
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async createOTPToken(email){
        try {
            const OTP = 111111 ; //randomOTP.generateRandomSixDigitNumber();
            const result = await db.query('Call db_CreateOTPToken(?,?)' , [email , OTP]);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }

    async GetBrandByEmail(email , OTP){// Validation OTP Token
        try {
            const result = await db.query('Select db_ValidateOTPToken(?,?)' , [email,OTP]);
            const response = result[0][0]
            for (const key in response) {
                if (key.includes("db_Validate")) {
                    const pass = response[key];
                    return pass; // Return the user's password if found
                }
            }
        } catch (error) {
            throw error;
        }
    } 

}




module.exports = new BrandModel();