import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { servicePath } from '../constants/defaultValues';

function getToken(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      user.getIdToken().then((token) => {
        unsubscribe();
        resolve(token);
      });
    }, reject);
  });
}

export const getAccount = async () => {
  console.log('getAccount')
  let token = await getToken(auth);
  console.log('token', token)
  const response = await fetch(`${servicePath}account/get`, {
      method: 'POST', mode: 'cors', cache: 'no-cache',
      headers: { 'Content-Type': 'application/json', 'token': token },
    })
      .then(response => response.json())
      .then(data => { return data; })
      .catch(err => console.log(err));
  return response.data[0];
};
export const updateAccount = async (payload) => {
  console.log('updateAccount', payload)
  let token = await getToken(auth);
  console.log('token', token)
  const response = await fetch(`${servicePath}account/update`, {
      method: 'POST', mode: 'cors', cache: 'no-cache',
      headers: { 'Content-Type': 'application/json', 'token': token },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => { return data; })
      .catch(err => console.log(err));
  return response.data[0];
};