const { PubSub, PubSubMessage } = require('@google-cloud/pubsub');
// Instantiates a client
const pubSub = new PubSub({
  apiEndpoint: 'localhost:8538'
});
async function createTopicAndSendMessage(
  topicName = 'test-call-api', // Name for the new topic to create
  commandCallApi = 'callApiBaoLong'
) {
  // Creates the new topic
  // const [topic] = await pubSub.createTopic(topicName);
  // console.log(`Topic ${topic.name} created.`);
  const commandSend = Buffer.from(JSON.stringify({
    command: 'callVBA',
    status: 'new'
  }));
  try {
    const batchPublisher = pubSub.topic(topicName)
    let result = await batchPublisher.publish(commandSend)
    console.log(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
createTopicAndSendMessage('test-call-api1', 'callApiBaoLong');