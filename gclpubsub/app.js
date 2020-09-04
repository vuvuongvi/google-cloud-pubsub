const { PubSub, v1 } = require('@google-cloud/pubsub');

async function quickstart(
  projectId = 'your-project-id', // Your Google Cloud Platform project ID
  topicName = 'my-topic' // Name for the new topic to create
) {
  // Instantiates a client
  const pubsub = new PubSub({
    projectId,
    apiEndpoint: 'localhost:8538'
  });

  // Creates the new topic
  const [topic] = await pubsub.createTopic(topicName);
  console.log(`Topic ${topic.name} created.`);
}
async function publicMessageToTopic(topicName = 'my-topic1', data, maxMessages, maxMilliseconds) {
  const pubsub = new PubSub({
    projectId: 'your-project-id',
    apiEndpoint: 'localhost:8085'
  });
  const dataBuffer = Buffer.from(data);
  const batchPublisher = pubsub.topic(topicName, {
    batching: {
      maxMessages,
      maxMilliseconds
    }
  })
  try {
    let result = await batchPublisher.publish(dataBuffer)
    console.log(result);
  } catch (error) {
    throw error;
  }
}

async function getTopicPolicy() {
  const pubsub = new PubSub({
    projectId: 'your-project-id',
    apiEndpoint: 'localhost:8085'
  });
  pubsub.getTopics((err, topics) => {
    if (!err) {
      console.log(topics[0])
      return topics[0];
    }
  })
}
// getTopicPolicy()
async function getTopicWithPageSize(pageSize) {
  const pubsub = new PubSub({
    projectId: 'your-project-id',
    apiEndpoint: 'localhost:8085'
  });
  try {
    const topicPageSize = await pubsub.getTopics({
      pageSize
    })
    console.log(topicPageSize);
    return topicPageSize;
  } catch (error) {
    throw error;
  }
}

async function publishWithRetryRequest(topicName = 'my-topic', subscriptionName = '' , data = 'test') {
  const pubSubClient = new PubSub({
    projectId: 'your-project-id',
    apiEndpoint: 'localhost:8538'
  });
  await pubSubClient.topic(topicName).createSubscription(subscriptionName, {
    deadLetterPolicy: {
      deadLetterTopic: pubSubClient.topic(topicName).name,
      maxDeliveryAttempts: 10,
    },
  })
  console.log(
    `Created subscription ${subscriptionName} with dead letter topic ${topicName}.`
  );
  console.log(
    'To process dead letter messages, remember to add a subscription to your dead letter topic.'
  );
}
// quickstart()
// publicMessageToTopic('my-topic', 'VuVuongVi', 50, 60)
publishWithRetryRequest('my-topic', 'test')