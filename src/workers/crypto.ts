import { expose } from 'comlink';
import forge from 'node-forge'; // or 'forge' depending on your setup

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const generateKeyPair = async ({ passphrase }: { passphrase: string }): Promise<KeyPair> => {
  return new Promise((resolve, reject) => {
    try {
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
      const encryptedPrivateKey = encryptPrivateKey(forge.pki.privateKeyToPem(privateKey), passphrase);
      resolve({
        publicKey: forge.pki.publicKeyToPem(publicKey),
        privateKey: encryptedPrivateKey,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Encrypt the private key using AES-CBC with a passphrase
const encryptPrivateKey = (privateKey: string, passphrase: string): string => {
  const salt = forge.random.getBytesSync(16);  // Generate a random 16-byte salt
  const iv = forge.random.getBytesSync(16);    // Generate a random 16-byte IV

  // Derive a 256-bit AES key from the passphrase and salt using PBKDF2
  const key = forge.pkcs5.pbkdf2(passphrase, salt, 10000, 32);  // 32 bytes = 256 bits

  // Create the AES cipher (AES-CBC mode)
  const cipher = forge.cipher.createCipher('AES-CBC', key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(privateKey));
  cipher.finish();

  const encrypted = cipher.output.getBytes();

  // Combine salt, IV, and encrypted data, then encode them in base64
  return forge.util.encode64(salt + iv + encrypted);
};


// Decrypt the private key with a passphrase
export const decryptPrivateKey = (encryptedData: string, passphrase: string) => {
  try {
    const encryptedBytes = forge.util.decode64(encryptedData);

    // Extract the salt (first 16 bytes), IV (next 16 bytes), and ciphertext (remaining bytes)
    const salt = encryptedBytes.slice(0, 16);
    const iv = encryptedBytes.slice(16, 32);
    const encrypted = encryptedBytes.slice(32);

    // Derive the AES key using the same PBKDF2 with the passphrase and salt
    const key = forge.pkcs5.pbkdf2(passphrase, salt, 10000, 32);  // 32 bytes = 256 bits

    // Create the AES decipher (AES-CBC mode)
    const decipher = forge.cipher.createDecipher('AES-CBC', key);
    decipher.start({ iv: iv });
    decipher.update(forge.util.createBuffer(encrypted));
    const success = decipher.finish();
    if (!success) {
      throw new Error('Decryption failed');
    }

    // Return the decrypted private key
    return decipher.output.toString();
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};


// Expose the function for use in the worker
expose({ generateKeyPair });
