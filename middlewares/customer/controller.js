const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_DATABASE || 'yourdatabasename'
  }
})

const controller = {
  getCustomer: async (req, res) => {
    getCustomer = await knex.select().from('customers')

    res.status(200).send({
      message: 'success get customer',
      ListCustomer: getCustomer
    })
  },

  registerCustomer: async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const emailCustomer = await knex
      .select()
      .from('customers')
      .where({ email: req.body.email })
    const phoneCustomer = await knex
      .select()
      .from('customers')
      .where({ mobile_phone: req.body.mobile_phone })

    if (emailCustomer.length === 0 && phoneCustomer.length === 0) {
      const newCustomer = {
        ...req.body,
        salt,
        password,
        is_actived: 0
      }

      await knex.insert(newCustomer).from('customers')

      res.status(200).send({
        message: 'register success'
      })
    } else {
      res.status(409).send({
        message: 'data is already exists'
      })
    }
  },

  loginCustomer: async (req, res) => {
    let foundCustomer = await knex
      .select()
      .from('customers')
      .where({ user_name: req.body.user_name })

    if (foundCustomer.length === 0) {
      res.status(404).send({
        message: 'not found'
      })
    } else {
      const authenticated = await bcrypt.compare(
        req.body.password,
        foundCustomer[0].password
      )

      if (authenticated === false) {
        res.status(401).send({
          message: 'password fail'
        })
      } else {
        const { password, salt, ...customer } = foundCustomer[0]
        const payload = {
          customer
        }
        if (payload.customer.is_actived === 0) {
          await knex('customers')
            .where({ id_customer: payload.customer.id_customer })
            .update({ is_actived: 1 })
        }
        const token = await jwt.sign(payload, process.env.SECRET)

        res.status(200).send({
          message: 'login success',
          token: token
        })
      }
    }
  },

  getUserById: async (req, res) => {
    try {
      const foundCustomer = await knex
        .select(
          'id_customer',
          'user_name',
          'full_name',
          'email',
          'mobile_phone',
          'is_actived'
        )
        .from('customers')
        .where({ id_customer: req.params.id })

      const token = req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token, process.env.SECRET)

      if (true) {
        res.status(200).send({
          message: 'get customer by Id',
          dataCustomerById: foundCustomer
        })
      } else {
        res.status(404).send({
          message: 'token and id not match'
        })
      }
    } catch (error) {
      res.send({
        message: 'Token is not exist'
      })
    }
  }
}

module.exports = controller
