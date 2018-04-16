async function handlePullRequestChange (context) {
  //let config = await context.config('minimum-reviews.yml')

  //if (!config) {
  //  context.log('%s missing configuration file', context.payload.repository.full_name)
  //  return

 // const text = context.data.review.body;

  const text = context.payload.review.body;
 
  const idx = text.indexOf("🆗");

  if( idx >= 0) {

    const state = 'success'
    const description = "QA approval OK"
    
    //const x = await context.github.pullRequests.get({owner:'AllocateSoftware', repo:'RealTime', number: 95})

    const sha = context.payload.pull_request.head.sha;

    return context.github.repos.createStatus(context.repo({
      sha: sha,
      state: state,
      description: description,
      context: 'probot/allocate'
    }))
  }
}

async function getReviewsWithState (context, state) {
  const response = await context.github.pullRequests.getReviews({
    owner: context.payload.repository.owner.login,
    repo: context.payload.repository.name,
    number: context.payload.pull_request.number
  })

  return response.data.map(review => review.state).filter(word => word.toLowerCase() === state).length
}

module.exports = handlePullRequestChange