const { transaction, commit, rollback, query } = require("./mysqlcon");

const getLists = async () => {
    const sqlQuery = `SELECT * FROM list_details`;
    const lists = await query(sqlQuery);
    return { result: lists };
};

const getListId = async () => {
    const sqlQuery = `SELECT auto_increment FROM INFORMATION_SCHEMA.TABLES WHERE table_name = 'list_details'`;
    const result = await query(sqlQuery);
    return result[0].auto_increment;
};

const getListDetails = async (id) => {
    const sqlQuery = `SELECT * FROM list_details WHERE to_do_id = ?`;
    const result = await query(sqlQuery, [id]);
    return result[0];
};

const insertList = async (listDetails) => {
    try {
        await transaction();
        const sqlQuery = 'INSERT INTO list_details SET ?';
        await query(sqlQuery, listDetails);
        await commit();
        return { message: 'ok.' };
    } catch (error) {
        await rollback();
        return { error };
    }
};

const updateList = async (id, listDetails) => {
    try {
        await transaction();
        const sqlQuery = 'UPDATE list_details SET ? WHERE to_do_id = ?';
        await query(sqlQuery, [listDetails, id]);
        await commit();
        return { message: 'ok.' };
    } catch (error) {
        await rollback();
        return { error };
    }
};

module.exports = {
    getLists,
    getListId,
    getListDetails,
    insertList,
    updateList
};