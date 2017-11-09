const IssueNotifier = require('./lib/issue-notifier')
const SlackClient = require('./lib/slack-client')
const defaultConfig = require('./lib/defaultConfig')

module.exports = (robot) => {
  robot.on('issues.opened', async context => {
    const config = await context.config('config.yml', defaultConfig)
    const issue = context.issue()

    const issueDescription = await context.github.issues.get({
      number: issue.number,
      repo: config.repo,
      owner: config.owner
    })
    const repoContext = context.repo()
    const issueNotifier = new IssueNotifier(new SlackClient(config))
    issueNotifier.notify({owner: repoContext.owner, name: repoContext.repo}, {...issueDescription, action: 'opened'})
  })
}
