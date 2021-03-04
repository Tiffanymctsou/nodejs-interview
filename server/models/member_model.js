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
        const sqlQuery = 'INSERT INTO members SET ?';
        const result = await query(sqlQuery, memberInfo);
        await commit();
        return { id: result.insertId, message: 'ok.' };
    } catch (error) {
        await rollback();
        return { error };
    }
};

const nativeLogin = async (account, password) => {
    try {
        const member = await query('SELECT name, password FROM members WHERE account = ?', [account]);
        if (member.length === 0) {
            return { message: '用戶不存在！' };
        }
        const memberPassword = member[0].password;
        if (!bcrypt.compareSync(password, memberPassword)) {
            return { message: '密碼錯誤！' };
        }
        const name = member[0].name;
        const accessToken = 'Bearer ' + jwt.sign({ account: account, name: name }, secret, { expiresIn: expire });
        return { templateName: name, accessToken: accessToken };
    } catch (error) {
        await rollback();
        return { error };
    }
    
};

module.exports = {
    createMember,
    nativeLogin
};