class Notification {
  constructor({ title, body, link }) {
    this.title = title
    this.body = body
    this.link = link
  }

  toWebMessagePayload() {
    return JSON.stringify({
      title: this.title,
      body: this.body,
      link: this.link,
    })
  }
}

module.exports = {
  Notification,
}
