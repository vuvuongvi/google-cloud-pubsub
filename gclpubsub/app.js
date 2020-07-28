const { PubSub, v1 } = require('@google-cloud/pubsub');

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
publicMessageToTopic('my-topic1', 'VuVuongVi', 5, 6)
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
getTopicPolicy()
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

async function publishWithRetryRequest(projectId = 'your-project-id', topicName, data) {
  const publisherClient = new v1.PublisherClient({
    apiEndpoint: 'localhost:8085',
    projectId: 'your-project-id',
  })
  const formattedTopic = publisherClient.projectTopicPath(projectId, topicName);
  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);
  const messagesElement = {
    data: dataBuffer
  }
  const messages = [messagesElement];
  // Build request
  const request = {
    topic: formattedTopic,
    messages: messages
  }
  // Retry settings control how the publisher handles retryable failures
  // Default values are shown
  const retrySettings = {
    retryCodes: [
      10, // 'ABORTED'
      1, // 'CANCELLED',
      4, // 'DEADLINE_EXCEEDED'
      13, // 'INTERNAL'
      8, // 'RESOURCE_EXHAUSTED'
      14, // 'UNAVAILABLE'
      2, // 'UNKNOWN'
    ],
    backoffSettings: {
      initialRetryDelayMillis: 100,
      retryDelayMultiplier: 1.3,
      maxRetryDelayMillis: 60000,
      initialRpcTimeoutMillis: 5000,
      rpcTimeoutMultiplier: 1.0,
      maxRpcTimeoutMillis: 600000,
      totalTimeoutMillis: 600000,
    }
  }
  const [response] = await publisherClient.publish(request, {
    retry: retrySettings
  }).catch((error) => console.error(error));
  console.log(`Message ${response.messageIds} published.`)
}