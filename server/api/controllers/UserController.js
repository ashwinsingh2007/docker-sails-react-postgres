const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {

  signup: async function (req, res) {
    let { email, password, firstName, lastName, gender } = req.body;
    if (!email || !password) {
      // throw new Error('TESTING')
      return res.status(500).json({ error: 'Empty Email and Password' });
    }
    email = email.toLowerCase();
    const hashedPassword = bcrypt.hashSync(password, 8);
    const exisitingUsers = await Users.findOne({ email });
    if (exisitingUsers && exisitingUsers.id) {
      return res.status(500).json({ error: 'User already exist.' });
    }
    const users = await Users.findOrCreate({
      email
    }, {
        email,
        firstName,
        lastName,
        gender,
        password: hashedPassword,
        active: true,
      });
    const config = { // make this in some global config file
      secret: 'ADSGAECEAF34csdf1dfdswe21'
    };
    const token = jwt.sign({ userId: users.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json({ auth: true, token });
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    const users = await Users.findOne({
      email
    });
    if(!users) {
      return res.status(500).json({ error: `User doesn't exist` });
    }
    const passwordIsValid = bcrypt.compareSync(password, users.password);
    if (passwordIsValid) {
      const config = { // make this in some global config file
        secret: 'ADSGAECEAF34csdf1dfdswe21'
      };
      const token = jwt.sign({ userId: users.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ auth: true, token, userDetails: users });
    } else {
      return res.status(500).json({ error: `Password is not correct` });
    }
  },
  getCurrentUser: async (req, res) => {
    if (!req.user || !(req.user && req.user.id)) {
      return res.status(200).json({ currentUser: {} });
    }
    const { id } = req.user;
    const currentUser = await Users.findOne({
      id,
      active: true
    });
    delete currentUser.password;
    res.status(200).json({ currentUser });
  },
}