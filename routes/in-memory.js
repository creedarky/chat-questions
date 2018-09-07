let channels = {};

async function getMessages(channel, since, until, limit) {
  let channelMessages = channels[channel] || [];

  channelMessages = channelMessages.filter(message => {
    let isValidSince = true;
    let isValidUntil = true;
    if (since) {
      isValidSince = since.getTime() <= message.timestamp.getTime();
    }
    if (until) {
      isValidUntil = until.getTime() > message.timestamp.getTime();
    }
    return isValidSince && isValidUntil;
  })
    .reverse()
    .slice(0, limit);

  return channelMessages;
}

async function addMessage(channel, message) {
  const createdMessage = {
    ...message,
    id: Date.now(),
    timestamp: new Date(),
  };
  const channelMessages = channels[channel] || [];
  channelMessages.push(createdMessage);
  channels[channel] = channelMessages;
  return createdMessage;
}

function clearMessage() {
  channels = {};
}

module.exports = {
  fetch: getMessages,
  insert: addMessage,
  clear: clearMessage,
}
