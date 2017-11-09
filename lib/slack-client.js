const url = require('url')
const https = require('https')

module.exports = class SlackClient {
  constructor (config = {}) {
    this.config = config
  }

  send (text, login) {
    const options = {
      host: url.parse(this.config.webhook_url).host,
      port: 443,
      path: url.parse(this.config.webhook_url).pathname,
      method: 'POST'
    }
    const body = JSON.stringify({
      'channel': `#${this.config.channel}`,
      'username': login,
      'text': text
    })

    https.request(options, (resp) => {
    }).on('error', (err) => {
      console.log('Error: ' + err.message)
    }).end(body)
  }
}
