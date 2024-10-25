
import forge from 'node-forge';
// Generate RSA key pair
export function generateKeyPair(): { publicKey: string; privateKey: string } {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
  return {
    publicKey: forge.pki.publicKeyToPem(publicKey),
    privateKey: forge.pki.privateKeyToPem(privateKey),
  };
}

// Helper function to convert string to UTF-8 bytes
function stringToUtf8Bytes(str: string): string {
  return forge.util.encodeUtf8(str);
}

// Helper function to convert UTF-8 bytes back to string
function utf8BytesToString(bytes: string): string {
  return forge.util.decodeUtf8(bytes);
}

// Encrypt message using the recipient's public key
export function encryptMessage(publicKeyPem: string, message: string): string {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP');
    return forge.util.encode64(encryptedMessage); // Base64 encode the result
}

// Decrypt message using the recipient's private key
export function decryptMessage(privateKeyPem: string, encryptedMessage: string): string | null {
    try {
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
      const decodedMessage = forge.util.decode64(encryptedMessage); // Ensure proper decoding
      console.log("Decoded Message Length: ", decodedMessage.length); // Debug: log length of the decoded message

      const decryptedMessage = privateKey.decrypt(decodedMessage, 'RSA-OAEP');
      return decryptedMessage; // Return the decrypted message
    } catch (error) {
      console.log("Decryption failed: ", error);
      return encryptedMessage.substring(0, 25);
    }
  }
