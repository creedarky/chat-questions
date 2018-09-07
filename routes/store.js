

module.exports = function(implementation) {
  return {
    fetch: implementation.fetch,
    insert: implementation.insert,
    clear: implementation.clear
  }
};
