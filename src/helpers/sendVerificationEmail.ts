import nodemailer from "nodemailer";

const pass = process.env.EMAIL_PASS;

// Create a transporter using SMTP details
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: "mitul.songara.1612@gmail.com",
        pass,
    }
});

// Verify transporter setup
transporter.verify().then(() => {
    console.log("Nodemailer transporter is ready.");
}).catch((error) => {
    console.error("Error setting up nodemailer transporter:", error);
});

export async function sendVerificationEmail(email: string, username: string, verifyCode: string): Promise<{ success: boolean, message?: string }> {
    try {
        const htmlContent = `
            <html lang="en">
                <head>
                    <title>Verification Code</title>
                </head>
                <body>
                    <section>
                        <div>
                            <h2>Hello ${username},</h2>
                        </div>
                        <div>
                            <p>Thank you for registering. Please use the following verification code to complete your registration.</p>
                        </div>
                        <div>
                            <p><strong>${verifyCode}</strong></p>
                        </div>
                        <div>
                            <p>If you did not request this code, please ignore this email.</p>
                        </div>
                    </section>
                </body>
            </html>
        `;
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Truth-Tunnel" <mitul.songara.1612@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify Your Email", // Subject line
            text: `Hello ${username},\n\nYour verification code is: ${verifyCode}\n\nPlease use this code to verify your email.`, // plain text body
            html: htmlContent, // html body (if you want to use HTML)
        });

        console.log("Verification email sent:", info.messageId);
        return { success: true };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return { success: false, message: "Failed to send verification email. Please try again later." };
    }
}
