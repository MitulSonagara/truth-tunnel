// pages/terms.js
import React from 'react';
import Navbar from "@/components/Navbar"; // Optional: Reuse Navbar
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Optional: ScrollToTop Button

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar /> {/* Optional: Navbar */}
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Use</h1>
        
        <p className="mb-6">
          Welcome to Truth Tunnel. These terms of use govern your use of our platform. By using our platform, you agree to be bound by these terms.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing or using Truth Tunnel, you agree to comply with and be legally bound by the terms and conditions of these Terms of Use, as well as our Privacy Policy. If you do not agree to these Terms, you must discontinue use of the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">2. Privacy and Security</h2>
        <p className="mb-6">
          Your privacy is important to us. All communications through our platform are encrypted using military-grade encryption. We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as required by law.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">2.1 Data Collection</h3>
        <p className="mb-6">
          We collect only the necessary data to provide our services, such as email addresses for account creation. No data related to your messages is stored on our servers.
        </p>

        <h3 className="text-xl font-semibold mb-2">2.2 Security Practices</h3>
        <p className="mb-6">
          We use advanced encryption protocols to ensure that your data remains secure and protected. However, no system is completely immune to vulnerabilities. By using our platform, you acknowledge the risks inherent in internet-based communications.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
        <p className="mb-6">
          You agree to use our platform only for lawful purposes. You are prohibited from using Truth Tunnel to share or transmit any content that:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Is illegal, harmful, or violates any laws</li>
          <li>Harasses, threatens, or abuses other users</li>
          <li>Infringes upon the intellectual property rights of others</li>
          <li>Attempts to compromise the security of our systems</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">3.1 Prohibited Activities</h3>
        <p className="mb-6">
          You are not permitted to engage in activities that disrupt or interfere with the functionality of our platform. These include, but are not limited to, the following:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Attempting to hack or disable the platform</li>
          <li>Using bots, scripts, or automated systems to access or manipulate our services</li>
          <li>Distributing viruses or harmful code</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
        <p className="mb-6">
          All content, trademarks, logos, and data provided by Truth Tunnel are the intellectual property of the company and its licensors. You may not copy, distribute, or reproduce any content without explicit permission.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Account Termination</h2>
        <p className="mb-6">
          We reserve the right to terminate your account if you violate any of the terms outlined in this agreement. Account termination may also occur if:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>You engage in illegal activities through the platform</li>
          <li>Your conduct is harmful to other users or to the platform</li>
          <li>You attempt to hack or compromise the security of the system</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
        <p className="mb-6">
          The platform is provided as is and without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted or error-free, nor do we guarantee the accuracy of the information provided through the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="mb-6">
          Truth Tunnel will not be liable for any damages, including but not limited to, direct, indirect, incidental, punitive, or consequential damages arising out of your use of the platform.
        </p>

        <h2 className="text-2xl font-semibold mb-4">8. Changes to the Terms</h2>
        <p className="mb-6">
          We reserve the right to update or modify these terms at any time without prior notice. It is your responsibility to review these terms periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
        <p className="mb-6">
          If you have any questions or concerns about these terms, please contact us at <a href="mailto:support@truthtunnel.com" className="text-red-600 hover:underline">support@truthtunnel.com</a>.
        </p>
      </div>

      <ScrollToTopButton /> {/* Optional */}
    </div>
  );
};

export default TermsPage;
