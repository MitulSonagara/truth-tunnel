import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const adminEmail = process.env.EMAIL_USER; 
const adminEmailPassword = process.env.EMAIL_PASS; 

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmail,
    pass: adminEmailPassword,
  },
});
export async function GET() {
  return  NextResponse.json({"msg" : "hi there"})
}
export async function POST(req: NextRequest, res: NextResponse) {

    const { name, email, phone, category, message } =await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Please fill in all fields." });
    }

    const mailOptions = {
      from: email,
      to: adminEmail,
      subject: `Contact Us Submission - ${category}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Category: ${category}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return  NextResponse.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: "Failed to send the message. Please try again later." });
    }
  
}
