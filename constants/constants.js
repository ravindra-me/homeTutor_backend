import dotenv from "dotenv";
dotenv.config();
const constants = {
  allowedOrigins: ["http://localhost:3000/"],
  SERVER_PORT: process.env.PORT || 3000,
  SERVER_DB_URI: process.env.DB_URI,
  JWT_SECRET: "thisIsASimpleTest",
  OTP_LENGTH: 4,
  OTP_CONFIG: {
    upperCaseAlphabets: false,
    specialChars: false,
  },
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};

export default constants;
