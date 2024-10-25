# <p align="center" id="top">📦 Truth-Tunnel Web Application 🛡️</p>

<p align="center"> 
   <div align="center"> 
      <img src="https://readme-typing-svg.herokuapp.com?color=45ffaa&center=true&vCenter=true&size=40&width=900&height=80&lines=Welcome+to+Truth-Tunnel!"/> 
   </div> 
</p>

<h2>Hi there,<img src="https://raw.githubusercontent.com/nixin72/nixin72/master/wave.gif" height="40" width="40" /> Welcome to secure and anonymous messaging! <img src='https://raw.githubusercontent.com/ShahriarShafin/ShahriarShafin/main/Assets/handshake.gif' width="60px" height="35"></h2>

<p>Truth-Tunnel is a web application that allows users to send and receive messages securely while maintaining anonymity. With a robust login system featuring OTP (One-Time Password) verification, your safety and privacy are our top priority.</p>

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

<!--Added Table to show repo statistics-->
## 📈 GitHub Repository Stats
| 🌟 **Stars** | 🍴 **Forks** | 🐛 **Issues** | 🔔 **Open PRs** | 🔕 **Closed PRs** | 🛠️ **Languages** | ✅ **Contributors** |
|--------------|--------------|---------------|-----------------|------------------|------------------|------------------|
| ![GitHub stars](https://img.shields.io/github/stars/MitulSonagara/truth-tunnel) | ![forks](https://img.shields.io/github/forks/MitulSonagara/truth-tunnel) | ![issues](https://img.shields.io/github/issues/MitulSonagara/truth-tunnel?color=32CD32) | ![pull requests](https://img.shields.io/github/issues-pr/MitulSonagara/truth-tunnel?color=FFFF8F) | ![Closed PRs](https://img.shields.io/github/issues-pr-closed/MitulSonagara/truth-tunnel?color=20B2AA) | ![Languages](https://img.shields.io/github/languages/count/MitulSonagara/truth-tunnel?color=20B2AA) | ![Contributors](https://img.shields.io/github/contributors/MitulSonagara/truth-tunnel?color=00FA9A) |

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

<!-- Added Hacktoberfest 2024 and GSSoc Extended 2024 banners -->
### This project is now OFFICIALLY accepted for

<div align="center">
  <img src="https://raw.githubusercontent.com/SwanandD121/FeatherPerfect_fe/refs/heads/main/Untitled%20design.png" alt="GSSoC 2024 Extd" width="80%">
  <img src="https://cdn.discordapp.com/attachments/657543125190967316/1294560786114674748/Screenshot_2024-10-12_122347.png?ex=670b752f&is=670a23af&hm=26ddd7f41740b8b19ee4985e7568b3892091384b3b85e7165770a4b10f4d1050&" alt="Hacktoberfest 2024" width="80%">
</div>
<br>

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## Overview 📌

<ul> 
   <li>🔒 Anonymous Identity: Users can communicate without revealing their identity.</li> 
   <li>📧 Secure OTP Login: Verifies user identity via OTP sent to their email.</li> 
   <li>🔐 Encrypted Messaging: Ensures privacy with end-to-end message encryption.</li> 
   <li>💻 Cross-Platform: Accessible on web and mobile devices.</li> 
   <li>✨ User-Friendly Interface: Simple, clean, and intuitive design.</li> 
</ul>

<p align="center"> <img src="/public/assets/dashboard.png" alt="Truth-Tunnel Preview" width="900" /> </p>

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## Live Demo 🎥

Access the live version of Truth-Tunnel at [truth-tunnel.vercel.app](https://truth-tunnel.vercel.app/).

<!--Line--> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900"> <h2><img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="30px" height="38"> Technologies Used</h2>

Truth-Tunnel is built using the following technologies:

- **Frontend**:
  - Next.js
  - TailwindCSS
  - shadcn
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **Security**:
  - next/auth for authentication
  - OTP (One-Time Password) for verification
  - bcrypt for password hashing

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## Prerequisites 👈🏻

Before setting up the project, ensure you have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Set up an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## Installation 🛠️

Follow these steps to set up Truth-Tunnel locally:

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
DATABASE_URL= #Prisma Database url
NEXTAUTH_SECRET= #Any Secret code for next auth secret
EMAIL_PASS= #App password for your email account from which you want to send the email
EMAIL_USER= #Email address from which you want to send the email
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID= #Your Google client ID
GOOGLE_CLIENT_SECRET= #your Google client secret
```

4. Build the application:

```bash
npm run build
```

5. Run the application:

```bash
npm start
```

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## Contributing 🌟

Contributions are welcome! Follow these steps to contribute:

Fork the repository

Click the "Fork" button at the top-right corner of the repository page to create a personal copy.

**Clone your forked repository**

```bash
git clone https://github.com/your-username/truth-tunnel.git
cd scruter
```

**Create a new branch**

```bash
git checkout -b feature-branch-name
```

**Add your changes**

```bash
git add .
```

**Make your changes and commit them**

```bash
git commit -m 'Add some feature'
```

**Push to the branch**

```bash
git push origin feature-branch-name
```

**Submit a pull request**

Go to the original repository and click on the "Pull Request" button to submit your changes.

**Please refer to the [Contributing.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute to this project.**

<!--Line--> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

<div>
  <h2 align = "center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" width="35" height="35">Our Contributors</h2>
  <div align = "center">
 <h3>Thank you for contributing to our repository</h3>

![Contributors](https://contrib.rocks/image?repo=MitulSonagara/truth-tunnel)
</div>

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

<!-- Added the Team section -->
## 👥 Team
| ![Mitul Sonagara](https://avatars.githubusercontent.com/u/95460188?v=4&s=80) |
|:--:|
| **Mitul Sonagara** <br> <sub>Project Admin</sub> | 
| [![LinkedIn](https://img.icons8.com/fluency/32/000000/linkedin.png)](https://www.linkedin.com/in/mitul-songara-4b199b225/) |

For any inquiries or feedback, please contact. Happy Contributing 🫡

<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

<!-- Added a Support section for the project README -->
## ⭐️ Support the Project
If you find this project helpful, please consider giving it a ⭐ on GitHub! Your support helps to grow the project and reach more contributors.

## Made with ❤️ by Mitul Sonagara.
