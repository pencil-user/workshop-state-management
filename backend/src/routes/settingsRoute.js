"use strict"

const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  res.json({
    foo: 'Lorem ipsum dolor.',
    bar: 'Class aptent.',
    baz: 1234
  })

}
)

module.exports = router;