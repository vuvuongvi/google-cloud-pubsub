const { PubSub } = require('@google-cloud/pubsub');

const pubSubClient = new PubSub({
  projectId: 'your-project-id',
  apiEndpoint: 'localhost:8085'
})

async function listSubscriptions(topic) {
  // Lists all subscriptions in the current project
  const [subscriptions] = await pubSubClient.getSubscriptions(topic);
  console.log('Subscriptions:', subscriptions);
  subscriptions.forEach(subscription => console.log(subscription.name));
}

async function createSubscription(topicName, subscriptionName) {
  let a = await pubSubClient.createSubscription(topicName, subscriptionName)
  console.log(a);
}
createSubscription('my-topic1', 'VuVuongVi')