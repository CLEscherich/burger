const connection = require("../config/connection");

function createQmarks(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(ob) {
  const arr = [];
  for (const key in ob) {
    let value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

const orm = {
  selectAll: function(table, cb) {
    const dbQuery = "SELECT * FROM " + table + ";";

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    const dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") " +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";

    console.log(dbQuery);
    connection.query(dbQuery, vals, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    const dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  deleteOne: function(table, condition, cb) {
    const dbQuery = "DELETE FROM " + table + " WHERE " + condition;
    console.log(dbQuery);

    connection.query(dbQuery, (err, res) => {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};
module.exports = orm;
