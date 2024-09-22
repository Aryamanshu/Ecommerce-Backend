const { User } = require('../model/User');

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({id: doc.id, role: doc.role});
  } catch (err) {
    res.status(401).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
    ).exec();
    // TODO: this is just temporary, we will use strong password auth
    console.log({user})
    console.log(user.password);
    console.log(req.body);
    
    if (!user) {
      res.status(401).json({ message: 'no such user email' });
    } else if (user.password === req.body.password) {
        // TODO: We will make addresses independent of login
        console.log("200 OK")
      res.status(200).json({id:user.id, role: user.role});
    } else {
      console.log("401")
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
};