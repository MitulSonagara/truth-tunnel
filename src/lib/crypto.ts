import forge from 'node-forge';


// Encrypt message using the recipient's public key
export function encryptMessage(publicKeyPem: string, message: string): string {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedMessage = publicKey.encrypt(message, 'RSA-OAEP');
  return forge.util.encode64(encryptedMessage); // Base64 encode the result
}

// Decrypt message using the recipient's private key
export function decryptMessage(privateKeyPem: string, encryptedMessage: string): string {
  try {

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decodedMessage = forge.util.decode64(encryptedMessage);
    return privateKey.decrypt(decodedMessage, 'RSA-OAEP');
  } catch (error) {
    console.log("MESSAGE IN NOT ENCRYPTED");
    return encryptedMessage.substring(0, 25);
  }
}

