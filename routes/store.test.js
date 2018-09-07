const lolex = require("lolex");
const createStore = require('./store');
const implementation = require('./in-memory');

const store = createStore(implementation);
let clock;

beforeEach(() => {
  store.clear()
  clock = lolex.install()
});

afterEach(() => {
  clock.uninstall()
})

const testChannel = 'test';
const testMessage = {
  author: 'Max',
  text: 'Message',
};

test('get Message should handle empty state', async () => {
  const result = await store.fetch(testChannel);
  expect(result).toEqual([]);
});

test('get Message should filter', async () => {
  const since = new Date();
  clock.tick(500);
  await Promise.all([
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
  ]);
  clock.tick(100);
  const until = new Date();
  await Promise.all([
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
    store.insert(testChannel, testMessage),
  ]);
  let result = await store.fetch(testChannel, since, until);
  expect(result.length).toEqual(6);
  result = await store.fetch(testChannel);
  expect(result.length).toEqual(10);
});
