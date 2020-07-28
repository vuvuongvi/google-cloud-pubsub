const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub({
  projectId: 'your-project-id',
  apiEndpoint: 'localhost:8085'
});
const topic = pubsub.topic('my-topic1');
topic.createSubscription('VuVuongVi', (err, subscription) => {
  // `subscription` is a Subscription object.
  console.log(subscription)
});