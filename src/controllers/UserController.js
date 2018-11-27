import httpClient from './HttpClient';
import { SQLite } from 'expo';
import { fromURN } from 'uuid-js';

const db = SQLite.openDatabase('db.db');

const createTableIfNotExists = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists userstwo (firstName text, lastName text, username text primary key not null, password text);',
        null,resolve()
      );
    });
  })
} 

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from userstwo;',
        null,(_, { rows: { _array } }) => resolve({ items: _array })
      );
    });
  })
}

const registerUser = (user) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `insert into userstwo(firstName, lastName, username, password) values('${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}');`,
        null,resolve()
      );
    });
  })
}

class UserController {
  constructor() {
    this.basePath = '/users';
  }

  login = async (email, password) => {

    return createTableIfNotExists()
      .then((response) => {
        return getUsers();
      })
      .then((response) => {
        const users = response.items;
        for(let i=0;i<users.length;i++) {
          let element = users[i];
          if(element.username === email && element.password === password) {
            return Promise.resolve({success: true, user: email});
          }
        }
        return Promise.resolve({success: false, msg:'Username/password not matched.'});
      })
  }

  register = async (user) => {

    return createTableIfNotExists()
      .then(() => {
        return getUsers();
      })
      .then((response) => {
        const users = response.items;
        for(let i=0;i<users.length;i++) {
          let element = users[i];
          if(element.username === user.email) {
            return false;
          }
        }
        return true;
      })
      .then((result) => {
        if(result) {
          return registerUser(user);
        }
        return {success:false, msg:'User already exists'};
      });
  }

  logout = () => null;
}

export default new UserController();
