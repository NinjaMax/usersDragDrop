 require('dotenv').config();
 const bcrypt = require('bcrypt');
 const {User} = require('../models/User');
 const jwt = require('jsonwebtoken');

 const jwtGenerate = (id, email) => {
    return  jwt.sign({id, email}, 
            process.env.SECRET_KEY_TOKEN, {expiresIn: '24h'});
 
  };

 class UserController {
    async registration(req, res, error) {
      const {email, password, name} = req.body;
      if(!email || !password) {
         return res.status(401).json({message: "Error: Incorrect Email or Password!!!"});
      }
      const customer = await User.findOne({where: {email}});
      if(customer) {
        return res.status(401).json({message: `Customer with such email ${email} exists!!!`});
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({email, name, password: hashPassword});
      const token = jwtGenerate (user.id, user.email);

      return res.json({message: `NEW User ${user.name} Create!`}, {token}); 
    }
    
    async login(req, res) {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}});
      if(!user) {
        return res.status(401).json({message: "Customer doesn't Exist!!"});
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if(!comparePassword) {
        return res.status(401).json({message:"Wrong Password!!!"});
      }
      const token = jwtGenerate(user.id, user.email);

      return res.json({message: "You are logged in!"}, {token});
    }

    async check(req, res, next) {
        const token = jwtGenerate(req.user.id, req.user.email);
  
        return res.json({token});    
      }

    async logout(refreshToken) {
        const token = await removeToken(refreshToken);
        return token;
    }

 }

 module.exports = new UserController();