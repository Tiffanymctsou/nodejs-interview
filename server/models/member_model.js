const { transaction, commit, rollback, query } = require("./mysqlcon");
const salt = parseInt(process.env.BCRYPT_SALT);
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expire = process.env.TOKEN_EXPIRE;

const createMember = async (memberInfo) => {
    try {
        await transaction();
        const accounts = await query('SELECT id FROM members WHERE account = ?', [memberInfo.account]);
        if (accounts.length > 0) {
            await rollback();
            return { error: "Request Error: Account already exists." };
        }
        memberInfo.password = bcrypt.hashSync(memberInfo.password, salt);
        console.log(memberInfo);
        const sqlQuery = 'INSERT INTO members SET ?';
        const result = await query(sqlQuery, memberInfo);
        await commit();
        return { id: result.insertId, message: 'ok.' };
    } catch (error) {
        await rollback();
        return { error };
    }
};

module.exports = {
    createMember
};