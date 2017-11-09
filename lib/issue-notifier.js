module.exports = class IssueNotifier {
  constructor (slackClient = {}) {
    this.slackClient = slackClient
  }

  notify (repo, issue) {
    const notification = `${repo.owner}/${repo.name} \n` +
    `<${issue.data.html_url}|Issue ${issue.data.title} #${issue.data.number}> has been ${issue.action}`
    this.slackClient.send(notification, issue.data.user.login)
  }
}
