const Prospect = require("../models/Prospect");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllProspects = async (req, res) => {
  const prospects = await Prospect.find({ createdBy: req.user.userId }).sort(
    "status")
  res.status(StatusCodes.OK).json({ prospects });
};

const getProspect = async (req, res) => {
  res.send("get single prospect");
};
const createProspect = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const prospect = await Prospect.create(req.body);
  res.status(StatusCodes.CREATED).json({ prospect });
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
