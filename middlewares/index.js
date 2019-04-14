const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('success')

  res.status(200).send({
    message: 'Hello jasa'
  })
})

module.exports = router
