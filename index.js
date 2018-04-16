module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!')

  const handlePullRequest = require('./lib/pull-request-change')

  robot.on([
  	 //'issue_comment'
    'pull_request_review'
  ], handlePullRequest)

}
