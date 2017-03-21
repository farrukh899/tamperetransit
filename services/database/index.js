const _ = require('lodash');


function enterDataToTable(data, timestamp, tableName, successCallback, errorCallback) {
    console.log(db)
    db.transaction((tx) => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS stops(id INTEGER PRIMARY KEY)`, [], (tx, results) => {
            console.log('got here')
            tx.executeSql(`INSERT INTO stops VALUES(null, ${data}, ${timestamp})`, errorCallback.bind(this), successCallback.bind(this))
        }, errorCallback.bind(this))
    })
}

function deleteDataFromTable() {

}

function updateDataInTable() {


}

export default {
    enterDataToTable,
    deleteDataFromTable,
    updateDataInTable
}
