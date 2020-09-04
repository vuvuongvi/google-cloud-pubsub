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
// listSubscriptions('my-topic1')
async function createSubscription(topicName, subscriptionName) {
  var topic = pubSubClient.topic(topicName);
  topic.createSubscription(subscriptionName, function(err, subscription) {
    // `subscription` is a Subscription object.
    if (err) {
      console.log(err);
    }
    console.log(subscription)
  });
}

async function publishMessage(data) {
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);

  const messageId = await pubSubClient.topic('my-topic').publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
}
// publishMessage('yasuodimid');
createSubscription('my-topic', 'VuVuongVi')