import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from '../constants/firebase';

const appFB = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFB);
const auth = getAuth(appFB);

export { appFB, analytics, auth }