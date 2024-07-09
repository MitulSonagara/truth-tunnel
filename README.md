# Truth-Tunnel Web Application

## Overview

Welcome to the Truth-Tunnel Web Application! This platform allows users to send and receive messages securely while maintaining anonymity. The application features a robust login system with OTP (One-Time Password) verification to ensure the safety and privacy of user identities.

You can preview and try the website live in Vercel here : 

## Table of Contents

- Features
- Installation
- Usage
- Screenshots
- Technologies Used
- Contributing
- License

## Features

- Anonymous Identity: Users can communicate without revealing their true identity.
- Secure Login: Login system secured with OTP for verification.
- Message Encryption: All messages are encrypted to ensure privacy.
- User-Friendly Interface: Simple and intuitive design for ease of use.
- Cross-Platform: Compatible with both web and mobile devices.

## Installation

## Prerequisites
- Node.js
- npm

## Steps

1. Clone the repository:
  
  
```bash
git clone https://github.com/MitulSonagara/truth-tunnel.git
cd truth-tunnel
```
2. Install dependencies:
```bash
npm install
  ```
3. Set up environment variables:
   
   Create a .env file in the root directory and configure the following variables:
```bash
MONGODB_URI=""
RESEND_API_KEY=""
NEXTAUTH_SECRET=""
  ```
4. Run the application:
   
```bash
npm start
  ```
## Usage
1. Register: Create a new account using an anonymous identity.
2. Login: Enter your credentials and verify your identity using the OTP sent to your registered email.
3. Send Messages: Compose and send encrypted messages to other users.
4. Receive Messages: View received messages in your inbox, decrypted and secure.

# Screenshots
## Home Page
![image](https://github.com/MitulSonagara/truth-tunnel/blob/master/public/assets/home.png)


## Registration Page
![image](https://github.com/MitulSonagara/truth-tunnel/blob/master/public/assets/signup.png)

## OTP Verification
![image](https://github.com/MitulSonagara/truth-tunnel/blob/master/public/assets/otp.png)

## Messaging Interface
## Copy the unique link
![image](https://github.com/MitulSonagara/truth-tunnel/blob/master/public/assets/dashboard.png)

## send messages to user without login
![image](https://github.com/MitulSonagara/truth-tunnel/blob/master/public/assets/send-msg.png)

## Technologies Used
- Frontend:
  - NextJs
  - HTML/CSS
  - TailwindCSS
  - shadcn
- Backend:
  - Node.js
  - Express.js
- Database:
  - MongoDB 
- Security:

  - next/auth for authentication
  - OTP (One-Time Password) for verification
  - bcrypt (Squared the password)

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch 
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

## Contact
For any queries or issues, please reach out to:

- Link:  [mitulsonagara.com](portfolio-phi-topaz-23.vercel.app)
- GitHub: [MitulSonagara](https://github.com/MitulSonagara)

## Made with ❤️ by Mitul Sonagara.
