const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body
  
    if(!username || username.length < 3) {
      return res.status(400).json({
        error: 'invalid username',
      })
    }

    if(!password || password.length < 3) {
      return res.status(400).json({
        error: 'invalid password',
      })
    }

    const sRounds = 15
    const passwordHash = await bcrypt.hash(password, sRounds)

    const user = new User({
      name,
      username,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')

  if(users) res.status(200).json(users)
  else res.status(400).json({ error: 'Something went wrong' })
})

module.exports = usersRouter