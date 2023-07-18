
export const setCurrentUser = async (user) => {
  console.log('setCurrentUser', user)
  try {
    if (user) {
      console.log('user', user)
      localStorage.setItem('auth_user', JSON.stringify(user));
      let items = localStorage.getItem('users') != null
        ? JSON.parse(localStorage.getItem('users'))
        : [];

      console.log('items.length', items.length)
      let users = []
      if(items.length> 0){
        await items.map((item)=> {
          if(item.email === user.email){
            users.push(user)
          }
          else {
            users.push(item)
          }
        })
      }
        localStorage.setItem('users', JSON.stringify(users));
    } else {
      localStorage.removeItem('auth_user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

export const setNewUser = (user) => {
  console.log('setNewUser', user)
  try {
    if (user) {
      let users =
      localStorage.getItem('users') != null
        ? JSON.parse(localStorage.getItem('users'))
        : [];
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users));
    } 
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setNewUser -> error', error);
  }
};
export const setLog = (log) => {
  console.log('setLog', log)
  try {
    if (log) {
      let logs =
      localStorage.getItem('logs') != null
        ? JSON.parse(localStorage.getItem('logs'))
        : [];
      logs.push(log)
      localStorage.setItem('logs', JSON.stringify(logs));
    } 
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setLog -> error', error);
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
