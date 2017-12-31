module.exports = (req, res, next) => {
  if (req.session && req.session.userId && req.session.username) {
    next ()
  } else {
    res.json({
      code: 403,
      message: '登录超时，请重新登录',
      data: {}
    })
  }
}