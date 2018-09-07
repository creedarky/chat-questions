var express = require('express');
var router = express.Router();
const createStore = require('./store');
const implementation = require('./in-memory');

const store = createStore(implementation);

const messages = [];

// /* GET home page. */
// router.get('/messages', function(req, res, next) {
//   res.json({messages});
// });
//
// router.post('/message', function(req, res, next) {
//   const message = req.body;
//   const createdMessage = {
//     ...message,
//     id: Date.now(),
//     timestamp: new Date(),
//   }
//   messages.push(createdMessage)
//   res.json(createdMessage);
// });

// function getMessages(channel, date) {
//   const channelMessages = channels[channel] || [];
//   if (date) {
//
//     return channelMessages.filter((m) => {
//       return m.timestamp.getTime() < date.getTime()
//     });
//   }
//   return channelMessages;
// }
//
// function addMessage(channel, message) {
//   const createdMessage = {
//     ...message,
//     id: Date.now(),
//     timestamp: new Date(),
//   };
//   const channelMessages = channels[channel] || [];
//   channelMessages.push(createdMessage);
//   channels[channel] = channelMessages;
//   return createdMessage;
// }
//
// function clearMessage() {
//   channels = {};
// }


module.exports = function(store) {
  router.get('/:channel', async function (req, res, next) {
    const messages = await store.fetch(req.params.channel);
    res.json({messages})
  });

  router.post('/:channel', async function(req, res, next) {
    const message = await store.insert(req.params.channel, req.body);
    res.json(message);
  });

  return router;
};
