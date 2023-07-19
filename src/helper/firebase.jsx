import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from '../constants/firebase';

const appFB = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFB);

export { appFB, analytics }