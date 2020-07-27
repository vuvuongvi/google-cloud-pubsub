// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

async function quickstart(
  projectId = 'your-project-id', // Your Google Cloud Platform project ID
  topicName = 'my-topic1' // Name for the new topic to create
) {
  // Instantiates a client
  const pubsub = new PubSub({
    projectId,
    apiEndpoint: 'localhost:8085'
});

  // Creates the new topic
  const [topic] = await pubsub.createTopic(topicName);
  console.log(topic)
  console.log(`Topic ${topic.name} created.`);
}
async function createPushSubscription(topicName = 'YOUR_TOPIC_NAME', subscriptionName = 'YOUR_SUBSCRIPTION_NAME') {
    const pubsub = new PubSub({
        projectId: 'your-project-id',
        apiEndpoint: 'localhost:8085'
    });
    const options = {
      pushConfig: {
        // Set to an HTTPS endpoint of your choice. If necessary, register
        // (authorize) the domain on which the server is hosted.
        pushEndpoint: `localhost:8085`,
      },
    };

    await pubsub
      .topic(topicName)
      .createSubscription(subscriptionName, options);
    console.log(`Subscription ${subscriptionName} created.`);
}
createPushSubscription();