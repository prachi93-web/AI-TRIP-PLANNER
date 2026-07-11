import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your AI Trip Planner account",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>AI Trip Planner</h2>

        <p>Your OTP for account verification is:</p>

        <h1 style="letter-spacing:4px;">${otp}</h1>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
};

export default sendOtpEmail;
