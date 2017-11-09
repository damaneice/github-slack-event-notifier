const expect = require('expect')
const IssueNotifier = require('../lib/issue-notifier')

describe('issue-notifier', () => {
  let issueNotifier
  let slackClient
  beforeEach(() => {
    slackClient = {send: expect.createSpy()}
    issueNotifier = new IssueNotifier(slackClient)
  })

  it('should call slack client with message', async () => {
    const repo = {owner: 'owner', name: 'name'}
    const issue = {
      data: {
        title: 'test',
        html_url: 'http://www.example.com',
        number: 2,
        user: {
          login: 'username'
        }
      },
      action: 'opened'
    }
    issueNotifier.notify(repo, issue)
    const callArguments = slackClient.send.getLastCall().arguments
    expect(slackClient.send).toHaveBeenCalled()
    expect(callArguments[0]).toEqual('owner/name \n<http://www.example.com|Issue test #2> has been opened')
    expect(callArguments[1]).toEqual('username')
  })
})
