const app = require('../dist/index.js').default;

module.exports = async (req, res) => {
  return app(req, res);
}; 