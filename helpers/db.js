/**
 * This is a helper file which provides functions to access 
 */

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('settings.db');


/**
 * Initializes a settings table for SQLite storage on local device
 * the function creates a promise object allows the this function 
 * take advantage of ansyc functions .then() and .catch()  to know
 * if this function succeeded or not. 
 */
export const init  = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS `settings` \
            (id INTEGER PRIMARY KEY NOT NULL,\
            setting TEXT NOT NULL, \
            value TEXT)',
            [], // params array
            () => { // success callback
                resolve();
            },
            (_, err) => { // error callback
                reject(err);
            }
            )
        });
     });
    
    return promise;
    
};


/**
 * Saves a setting given a setting (key) and value
 */
export const saveSetting  = (setting, value) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
            'INSERT INTO `settings` (setting, value) VALUES (?, ?)',
            [setting, value], // params array
            () => { // success callback
                resolve();
            },
            (_, err) => { // error callback
                reject(err);
            }
            )
        });
     });
    
    return promise;
    
};

/**
 * update a setting given a setting (key) and value
 */
export const updateSetting  = (setting, value) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
            'UPDATE settings SET value=? WHERE setting =?',
            [value, setting], // params array
            () => { // success callback
                resolve();
            },
            (_, err) => { // error callback
                reject(err);
            }
            )
        });
     });
    
    return promise;
    
};
