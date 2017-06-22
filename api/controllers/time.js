const moment = require('moment-timezone')

function ask(req, res) {
  let tz = req.swagger.params.tz.value || undefined
  let time = moment().tz(tz).format()
  res.json({
    time,
  })
}

module.exports = {
  ask,
}
