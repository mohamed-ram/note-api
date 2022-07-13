const notFound = async (req, res) => {
  res
    .status(404)
    .json({ success: false, error: "404, Resource is not exist!" });
};

module.exports = notFound;
