
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
  try {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const utf8Message = stringToUtf8Bytes(message);  // Ensure the message is in UTF-8 format
    const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP');
    return forge.util.encode64(encryptedMessage); // Base64 encode the result
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt message");
  }
}

// Decrypt message using the recipient's private key
export function decryptMessage(privateKeyPem: string, encryptedMessage: string): string {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decodedMessage = forge.util.decode64(encryptedMessage);  // Ensure proper decoding
    console.log("Decoded Message Length: ", decodedMessage.length); // Debug: log length of the decoded message

    const decryptedMessage = privateKey.decrypt(decodedMessage, 'RSA-OAEP');
    return decryptedMessage; // Return the decrypted message
  } catch (error) {
    console.error("Decryption failed:", error);
    if (typeof encryptedMessage === 'string') {
      // Fallback for non-encrypted messages
      console.log("MESSAGE IS NOT ENCRYPTED");
      return encryptedMessage.substring(0, 25);  
    }
    throw new Error("Failed to decrypt message");
  }
}

// Check if the message is small enough to be encrypted using RSA
export function canEncryptMessage(message: string): boolean {
  try {
    // RSA-2048 can encrypt messages up to (2048/8 - 42) = 214 bytes with OAEP padding
    const maxBytes = 214;
    const utf8Message = stringToUtf8Bytes(message);  // Convert the message to UTF-8 bytes
    return utf8Message.length <= maxBytes;
  } catch (error) {
    return false;
  }
}
