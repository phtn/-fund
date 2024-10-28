import { env } from "@/env";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: env.NEXT_PUBLIC_API_KEY,
  authDomain: env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_PROJECTID,
  storageBucket: env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: env.NEXT_PUBLIC_APPID,
  measurementId: env.NEXT_PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const f = initializeApp(config);
export const auth = getAuth(f);
