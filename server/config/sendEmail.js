
import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

// Check if the API key is provided
if (!process.env.BREVO_EMAIL_API) {
  console.log("Provide BREVO_EMAIL_API in the .env file");
  process.exit(1); // Exit the process if the API key is missing
};

// Set up the Brevo API instance
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_EMAIL_API);

// Send email function
const sendEmail = async ({ to, subject, html }) => {
    try {
      const email = {
        sender: { name: "Shoply", email: "anjorinemmanuelt@gmail.com" },
        to: [{ email: to, name: "Recipient Name" }], 
        subject,
        htmlContent: html,
      };
  
      // Send the email
      const response = await apiInstance.sendTransacEmail(email);
      console.log("Email sent successfully:", response);
      return response

    } catch (error) {
      console.error("Error sending email:", error.response?.data || error.message);
    }
  };

export default sendEmail;
