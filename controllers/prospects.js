const Prospect = require("../models/Prospect");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllProspects = async (req, res) => {
  const prospects = await Prospect.find({ createdBy: req.user.userId }).sort(
    "status"
  );
  res.status(StatusCodes.OK).json({ prospects });
};

const getProspect = async (req, res) => {
  const {
    user: { userId },
    params: { id: prospectId },
  } = req;
  const prospect = await Prospect.findOne({
    _id: prospectId,
    createdBy: userId,
  });
  if (!prospect) {
    throw new NotFoundError(`No prospect found with this ID: ${prospectId}`);
  }
  res.status(StatusCodes.OK).json({ prospect });
};

const createProspect = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const prospect = await Prospect.create(req.body);
  res.status(StatusCodes.CREATED).json({ prospect });
};

const updateProspect = async (req, res) => {
  const {
    body: { name, portfolioValue },
    user: { userId },
    params: { id: prospectId },
  } = req;

  if (name === "" || portfolioValue === "") {
    throw new BadRequestError("Name and Portfolio values are requied!");
  }

  const prospect = await Prospect.findByIdAndUpdate(
    {
      _id: prospectId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!prospect) {
    throw new NotFoundError(`No prospect found with this ID: ${prospectId}`);
  }
  res.status(StatusCodes.OK).json({ prospect });
};

const deleteProspect = async (req, res) => {
  const {
    user: { userId },
    params: { id: prospectId },
  } = req;
  const prospect = await Prospect.findByIdAndDelete({
    _id: prospectId,
    createdBy: userId,
  });
  if (!prospect) {
    throw new NotFoundError(`No prospect found with this ID: ${prospectId}`);
  }
  res.status(StatusCodes.OK).json({ msg: `${prospect.name} successfully deleted!` });
};

module.exports = {
  getAllProspects,
  getProspect,
  createProspect,
  updateProspect,
  deleteProspect,
};
