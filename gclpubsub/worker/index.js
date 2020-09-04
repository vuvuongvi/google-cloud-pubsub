const { PubSub, PubSubMessage } = require('@google-cloud/pubsub');
const axios = require('axios');

const pubSub = new PubSub({
  apiEndpoint: 'localhost:8538',
  autoRetry: false,
});
async function createSubscriptionAndGetCommand(topicName, subscriptionName, deadLetterTopicName) {
  try {
    let topic = pubSub.topic(topicName).createSubscription(subscriptionName, {
      deadLetterPolicy: {
        deadLetterTopic: pubSub.topic(deadLetterTopicName).name,
        maxDeliveryAttempts: 1,
      },
    });
    console.log(
      `Created subscription ${subscriptionName} with dead letter topic ${deadLetterTopicName}.`
    );
    console.log(
      'To process dead letter messages, remember to add a subscription to your dead letter topic.'
    );
    let getSubscription = pubSub.subscription(subscriptionName);
    getSubscription.on('message', async (message) => {
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${message.data}`);
      console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
      const getDataDummy = await axios.get('https://mail.zoho.com/api/accounts');

      console.log(getDataDummy);
      // "Ack" (acknowledge receipt of) the message
      message.ack();
    });
    getSubscription.on('error', async (error) => {
        console.log(error);
        throw error;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function createSubscriptionWithDeadPolicy(topicName, subscriptionName, deadLetterTopicName) {
  try {
    await pubSub.topic(topicName).createSubscription(subscriptionName, {
      deadLetterPolicy: {
        deadLetterTopic: pubSub.topic(deadLetterTopicName).name,
        maxDeliveryAttempts: 5,
      }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// createSubscriptionWithDeadPolicy('test-call-api', 'test4', 'deadLetterTopic-test4')
createSubscriptionAndGetCommand('test-call-api1', 'test15', 'dead-test10')