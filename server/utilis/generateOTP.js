

const generateOTP = () => {
  return Math.floor(Math.random() * 900000) + 100000  ///Number from 100000 - 999999
}

export default generateOTP