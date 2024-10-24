// types/comlinkWorkerTypes.ts

export interface IGenerateKeyWorker {
  generateKeyPair: ({ passphrase }: { passphrase: string }) => Promise<{ publicKey: string; privateKey: string }>;
}
