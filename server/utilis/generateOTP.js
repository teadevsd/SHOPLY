

const generateOTP = () => {
const otp = Math.floor(1000 + Math.random() * 9000); // Range: 1000 - 9999

  // Set expiration time (current time + 10 minutes)
  const expiresAt = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds

  return { otp, expiresAt };
}

export default generateOTP