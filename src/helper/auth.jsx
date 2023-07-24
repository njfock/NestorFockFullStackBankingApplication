import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { servicePath } from '../constants/defaultValues';

/* eslint-disable array-callback-return */
export const setCurrentUser = async (user) => {
  console.log('setCurrentUser', user)
  try {
    if (user) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('current user is ', user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('errorCode', errorCode);
          console.log('errorMessage', errorMessage);

          NotificationManager.error(errorMessage, errorCode);
        });
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const setNewUser = (user) => {
  try {
    if (user) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        registerUser({email: user.email, password: user.password, name: user.name, balance: 0, uid: userCredential.user.uid, type: user.type, rol: user.rol});
        updateProfile(auth.currentUser, {
          displayName: user.name
        });
      })
      .catch((error) => {
        console.log('errorCode =', error.code);
        console.log('errorMessage =', error.message);
      });
    } 
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setNewUser -> error', error);
  }
};
export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('auth_user') != null
        ? JSON.parse(localStorage.getItem('auth_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const getUsers = () => {
  let user = [];
  try {
    user =
      localStorage.getItem('users') != null
        ? JSON.parse(localStorage.getItem('users'))
        : [];
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getUsers -> error', error);
    user = [];
  }
  return user;
};

export const getLogs = () => {
  let user = [];
  try {
    user =
      localStorage.getItem('logs') != null
        ? JSON.parse(localStorage.getItem('logs'))
        : [];
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getLogs -> error', error);
    user = [];
  }
  return user;
};

export const setLogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

const registerUser = async (user) => {
  await fetch(`${servicePath}register`, {
    method: 'POST', mode: 'cors', cache: 'no-cache',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => { return data; })
    .catch(err => console.log(err));
}