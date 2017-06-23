const moment = require('moment-timezone')

function ask(req, res) {
  let tz = req.swagger.params.tz.value || 'UTC'
  let whitelist = {tz: 1}

  for (let param of Object.keys(req.query)) {
    if (!whitelist[param]) {
      return res.json(400, {message: `Unexpected query param "${param}"`})
    }
  }

  if (!moment.tz.zone(tz)) {
    return res.json(400, {
      message: `Timezone "${tz}" not found`
    })
  }

  let time = moment.tz(tz).format()
  res.json({
    time,
  })
}

module.exports = {
  ask,
}
