"use client"

import { savePrivateKey } from "@/lib/indexedDB";
import { IGenerateKeyWorker } from "@/types/comlinkWorkerTypes";
import axios from "axios";
import { wrap } from "comlink";

export default async function checkAndSaveKeys() {


  try {
    console.log("HITTING!")
    const worker = new Worker(
      new URL("../workers/crypto.ts", import.meta.url),
      {
        type: "module",
      }
    );

    const { generateKeyPair } = wrap<IGenerateKeyWorker>(worker);

    const { publicKey, privateKey } = await generateKeyPair();
    worker.terminate();

    await savePrivateKey(privateKey);
    // Send public key to server to store it
    const response = await axios.post("/api/savePublicKey", { publicKey });
    return true;

  } catch (error) {
    console.error("Error auto generating keys:", error);

    return false;
  }
}