let authService = require('../services/auth');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if(!result.success){
      const message = result.message;
      return res.status(401).json({
        message: message,
        data: {}
      })
    }

    let newToken = await authService.generateToken(result.data);
    
    return res.status(201).json({
      message: 'Authorization is successful',
      data: {
        token: newToken,
        user: result.data
      }
    })
  },

  async register(req, res, next) {
    const { email, password } = req.body;

    const result = await authService.register(email, password);

    if (!result.success) {

      let message = result.message;
      let data = result.data;

      return res.status(400).json({
        message: message,
        data: data
      });
    }

    return res.status(201).json({
      message: result.text,
      data: result.data
    });
  }

};