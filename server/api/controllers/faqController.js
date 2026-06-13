const faqData = require("../data/faqData");

exports.getFaq = (_req, res) => {
  res.json(faqData);
};
