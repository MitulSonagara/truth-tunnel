// pages/terms.js
import React from 'react';
import Navbar from "@/components/Navbar"; // Optional: Reuse Navbar
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Optional: ScrollToTop Button
import { useTheme } from 'next-themes';

const TermsPage = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`min-h-screen ${resolvedTheme === 'light' ? 'bg-white' : 'bg-black'} font-bold transition-colors duration-300`}>
      <Navbar /> {/* Optional: Navbar */}
      <div className="container mx-auto py-24 px-4 pt-5 mt-8 sm:px-6 lg:px-8 border rounded-lg shadow-lg">
        <h1 className="text-5xl font-extrabold mb-10 text-center border-b-4 border-red-900 pb-4 text-red-700">Terms of Use</h1>

        <p className="mb-8 text-lg">
          Welcome to Truth Tunnel. These terms of use govern your use of our platform. By using our platform, you agree to be bound by these terms.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl text-red-600 font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6 text-lg font-normal">
              By accessing or using Truth Tunnel, you agree to comply with and be legally bound by the terms and conditions of these Terms of Use, as well as our Privacy Policy. If you do not agree to these Terms, you must discontinue use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-3xl text-red-600 font-bold mb-4">2. Privacy and Security</h2>
            <p className="mb-6 text-lg font-normal">
              Your privacy is important to us. All communications through our platform are encrypted using military-grade encryption. We do not sell, trade, or otherwise transfer your personally identifiable information to third parties without your consent, except as required by law.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">2.1 Data Collection</h3>
            <p className="mb-6 text-lg font-normal">
              We collect only the necessary data to provide our services, such as email addresses for account creation. No data related to your messages is stored on our servers.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">2.2 Security Practices</h3>
            <p className="mb-6 text-lg font-normal">
              We use advanced encryption protocols to ensure that your data remains secure and protected. However, no system is completely immune to vulnerabilities. By using our platform, you acknowledge the risks inherent in internet-based communications.
            </p>
          </div>

          <div>
            <h2 className="text-3xl text-red-600 font-bold mb-4">3. User Conduct</h2>
            <p className="mb-6 text-lg">
              You agree to use our platform only for lawful purposes. You are prohibited from using Truth Tunnel to share or transmit any content that:
            </p>
            <ul className="list-disc list-inside mb-6 text-lg space-y-2 font-normal">
              <li>Is illegal, harmful, or violates any laws</li>
              <li>Harasses, threatens, or abuses other users</li>
              <li>Infringes upon the intellectual property rights of others</li>
              <li>Attempts to compromise the security of our systems</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-red-500 font-bold mb-3">3.1 Prohibited Activities</h3>
            <p className="mb-6 text-lg">
              You are not permitted to engage in activities that disrupt or interfere with the functionality of our platform. These include, but are not limited to, the following:
            </p>
            <ul className="list-disc list-inside mb-6 text-lg space-y-2 font-normal">
              <li>Attempting to hack or disable the platform</li>
              <li>Using bots, scripts, or automated systems to access or manipulate our services</li>
              <li>Distributing viruses or harmful code</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl text-red-600 font-bold mb-4 mt-10">4. Intellectual Property</h2>
        <p className="mb-6 text-lg font-normal">
          All content, trademarks, logos, and data provided by Truth Tunnel are the intellectual property of the company and its licensors. You may not copy, distribute, or reproduce any content without explicit permission.
        </p>

        <h2 className="text-3xl text-red-600 font-bold mb-4">5. Account Termination</h2>
        <p className="mb-6 text-lg">
          We reserve the right to terminate your account if you violate any of the terms outlined in this agreement. Account termination may also occur if:
        </p>
        <ul className="list-disc list-inside mb-6 text-lg space-y-2 font-normal">
          <li>You engage in illegal activities through the platform</li>
          <li>Your conduct is harmful to other users or to the platform</li>
          <li>You attempt to hack or compromise the security of the system</li>
        </ul>

        <h2 className="text-3xl text-red-600 font-bold mb-4">6. Disclaimer of Warranties</h2>
        <p className="mb-6 text-lg font-normal">
          The platform is provided as is and without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted or error-free, nor do we guarantee the accuracy of the information provided through the platform.
        </p>

        <h2 className="text-3xl text-red-600 font-bold mb-4">7. Limitation of Liability</h2>
        <p className="mb-6 text-lg font-normal">
          Truth Tunnel will not be liable for any damages, including but not limited to, direct, indirect, incidental, punitive, or consequential damages arising out of your use of the platform.
        </p>

        <h2 className="text-3xl text-red-600 font-bold mb-4">8. Changes to the Terms</h2>
        <p className="mb-6 text-lg font-normal">
          We reserve the right to update or modify these terms at any time without prior notice. It is your responsibility to review these terms periodically for any changes.
        </p>

        <h2 className="text-3xl text-red-600 font-bold mb-4">9. Contact Information</h2>
        <p className="mb-6 text-lg font-normal">
          If you have any questions or concerns about these terms, please contact us at <a href="mailto:support@truthtunnel.com" className="text-white underline">support@truthtunnel.com</a>.
        </p>
      </div>

      <ScrollToTopButton /> {/* Optional */}
    </div>


  );
};

export default TermsPage;
