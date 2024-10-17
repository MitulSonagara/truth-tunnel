import { expose } from 'comlink';
import forge from 'node-forge'; // or 'forge' depending on your setup

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

const generateKeyPair = async (): Promise<KeyPair> => {
  return new Promise((resolve, reject) => {
    try {
      const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
      resolve({
        publicKey: forge.pki.publicKeyToPem(publicKey),
        privateKey: forge.pki.privateKeyToPem(privateKey),
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Expose the function for use in the worker
expose({ generateKeyPair });
