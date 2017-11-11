const router = require('express').Router()

router.use('/', () => console.log('<h1>Ocean Web Express Server'))

router.use('/trackedClient', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

module.exports = router
