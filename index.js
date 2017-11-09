const SlackClient = require('./lib/slack-client');
const defaultConfig = require('./lib/defaultConfig');

module.exports = (robot) => {
  robot.on('issues.opened', async context => {
    const config = await context.config('config.yml', defaultConfig);
    const slackClient = new SlackClient(config);
    const issue =  context.issue();
    const issueDescription = await context.github.issues.get({number: issue.number,
      repo: config.repo,
      owner: config.owner
    });
    slackClient.send(issueDescription.data.title, issueDescription.data.user.login);
  });
}
