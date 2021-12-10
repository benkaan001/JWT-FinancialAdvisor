const getAllProspects = async (req, res) => {
  res.send("get all prospects");
};
const getProspect = async (req, res) => {
  res.send("get single prospect");
};
const createProspect = async (req, res) => {
  res.send("create prospect");
};
const updateProspect = async (req, res) => {
  res.send("update single prospect");
};
const deleteProspect = async (req, res) => {
  res.send("delete single prospect");
};

module.exports = {
  getAllProspects,
  getProspect,
  createProspect,
  updateProspect,
  deleteProspect,
};
