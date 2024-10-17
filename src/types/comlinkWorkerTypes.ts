// types/comlinkWorkerTypes.ts

export interface IGenerateKeyWorker {
  generateKeyPair: () => Promise<{ publicKey: string; privateKey: string }>;
}
