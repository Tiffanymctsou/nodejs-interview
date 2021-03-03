const mysql = require("mysql");
const env = process.env.NODE_ENV;
const { promisify } = require("util");
const { LOCAL_DB_HOST, LOCAL_DB_USER, LOCAL_DB_PWD, LOCAL_DB } = process.env;

const mysqlCon = mysql.createConnection({
    host: LOCAL_DB_HOST,
    user: LOCAL_DB_USER,
    password: LOCAL_DB_PWD,
    database: LOCAL_DB
});

const promiseQuery = promisify(mysqlCon.query).bind(mysqlCon);
const promiseTransaction = promisify(mysqlCon.beginTransaction).bind(mysqlCon);
const promiseCommit = promisify(mysqlCon.commit).bind(mysqlCon);
const promiseRollback = promisify(mysqlCon.rollback).bind(mysqlCon);
const promiseEnd = promisify(mysqlCon.end).bind(mysqlCon);

module.exports = {
    core: mysqlCon,
    query: promiseQuery,
    transaction: promiseTransaction,
    commit: promiseCommit,
    rollback: promiseRollback,
    end: promiseEnd
};

