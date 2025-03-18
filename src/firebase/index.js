import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
// checkouts
async function getCheckout(id) {
  const docRef = doc(db, websiteName, "checkouts");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (data) {
    const checkouts = data.checkouts;
    const checkout = checkouts.find((checkout) => checkout.id === id);
    return checkout;
  }
  return null;
}
async function getCheckouts() {
  const docRef = doc(db, websiteName, "checkouts");
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}
async function updateCheckout(checkoutId, updatedCheckout) {
  const docRef = doc(db, websiteName, "checkouts");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const checkouts = docSnap.data().checkouts;
    const checkoutIndex = checkouts.findIndex(
      (checkout) => checkout.id === checkoutId
    );
    if (checkoutIndex !== -1) {
      const updatedCheckouts = [...checkouts];
      updatedCheckouts[checkoutIndex] = {
        ...updatedCheckout,
        payment_status: "paid",
      };
      await updateDoc(docRef, { checkouts: updatedCheckouts });
    }
  }
}
async function addCheckout(checkout) {
  const docRef = doc(db, websiteName, "checkouts");
  const docSnap = await getDoc(docRef);
  if (!docSnap.data()) {
    await setDoc(doc(db, websiteName, "checkouts"), {
      checkouts: [checkout],
    });
  } else {
    await updateDoc(doc(db, websiteName, "checkouts"), {
      checkouts: arrayUnion(checkout),
    });
  }
}
async function getDocuments(collectionName) {
  const ref = collection(db, collectionName);
  const response = await getDocs(ref);
  const res = response.docs.map((doc) => doc.data());
  return res;
}
async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}
async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}
async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  const existingData = docSnapshot.data();
  const updatedData = { ...existingData };
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}
export {
  storage,
  auth,
  getCheckout,
  addCheckout,
  getCheckouts,
  updateCheckout,
  addDocument,
  getDocuments,
  removeDocument,
  updateDocument,
};
