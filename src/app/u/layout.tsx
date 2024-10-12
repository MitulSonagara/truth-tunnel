export const metadata = {
  title: "Truth-Tunnel",
  description:
    "Welcome to the Truth-Tunnel Web Application! This platform allows users to send and receive messages securely while maintaining anonymity. The application features a robust login system with OTP (One-Time Password) verification to ensure the safety and privacy of user identities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
