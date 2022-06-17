const db = require('../db');

class UserController {
    async createUser(req, res) {
        const {data_table, title, amount } = req.body
        const newTable = await db.query(`INSERT INTO employee (data_table, title, amount) values ($1, $2, $3) RETURNING *`, [data_table, title, amount])
        res.json(newTable.rows[0])
    }
    async getUsers(reg, res) {
        const users = await db.query(`SELECT * FROM employee `)
        res.json(users.rows)
    }
}

module.exports = new UserController()