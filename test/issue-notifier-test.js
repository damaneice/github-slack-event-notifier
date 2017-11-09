const expect = require('expect')
const IssueNotifier = require('../lib/issue-notifier')

describe('issue-notifier', () => {
  let issueNotifier
  let slackClient
  beforeEach(() => {
    slackClient = {send: expect.createSpy()}
    issueNotifier = new IssueNotifier(slackClient)
  })
  describe('slack client is called with', () => {
    let repo
    let issue

    beforeEach(() => {
      repo = {owner: 'owner', name: 'name'}
      issue = {
        data: {
          title: 'test',
          html_url: 'http://www.example.com',
          number: 2,
          user: {
            login: 'username'
          }
        }
      }
      slackClient = {send: expect.createSpy()}
      issueNotifier = new IssueNotifier(slackClient)
    })

    it('opened message', async () => {
      issue.action = 'opened'

      issueNotifier.notify(repo, issue)
      const callArguments = slackClient.send.getLastCall().arguments
      expect(slackClient.send).toHaveBeenCalled()
      expect(callArguments[0]).toEqual('owner/name \n<http://www.example.com|Issue test #2> has been opened')
      expect(callArguments[1]).toEqual('username')
    })

    it('edited message', async () => {
      issue.action = 'edited'

      issueNotifier.notify(repo, issue)
      const callArguments = slackClient.send.getLastCall().arguments
      expect(slackClient.send).toHaveBeenCalled()
      expect(callArguments[0]).toEqual('owner/name \n<http://www.example.com|Issue test #2> has been edited')
      expect(callArguments[1]).toEqual('username')
    })

    it('reopened message', async () => {
      issue.action = 'reopened'

      issueNotifier.notify(repo, issue)
      const callArguments = slackClient.send.getLastCall().arguments
      expect(slackClient.send).toHaveBeenCalled()
      expect(callArguments[0]).toEqual('owner/name \n<http://www.example.com|Issue test #2> has been reopened')
      expect(callArguments[1]).toEqual('username')
    })
  })
})
