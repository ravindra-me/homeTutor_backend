import otpGenerator from "otp-generator";
import constants from "../constants/constants.js";
const generateOTP = () => {
  const OTP = otpGenerator.generate(constants.OTP_LENGTH, constants.OTP_CONFIG);
  return OTP;
};
export default generateOTP;
