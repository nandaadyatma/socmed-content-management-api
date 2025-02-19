const { Event } = require("../../api/v1/events/model");


const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Event.find(condition)

  return result;
};

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    imageLink,
    category,
    talent,
    organizer,
  } = req.body;

  const check = await Event.findOne({ title });

  if (check) throw new BadRequestError("Event with the same name is exist");

  const result = await Event.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    imageLink: imageLink,
    category,
    talent,
    organizer
  });

  return result;
};

const getOneEventById = async (req) => {
  const { id } = req.params;

  req.headers

  const result = Event.find({ _id: id });

  if (!result || result.length == 0) {
    throw new NotFoundError(`Event not found with this id ${id}`);
  }

  return result;
};

const deleteEventById = async (req) => {
  const { id } = req.params;

  const checkEvent = await Event.findOne({
    _id: id,
  });

  if (!checkEvent) throw new NotFoundError(`There's no event with id :  ${id}`);

  const result = Event.findOneAndDelete({ _id: id });

  if (!result) {
    throw new NotFoundError(`Event not found with this id ${id}`);
  }

  return result;
};

const updateEventById = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    imageLink,
    category,
    talent,
    organizer,
  } = req.body;

  // Get event based on id
  const checkEvent = await Event.findOne({
    _id: id,
  });

  if (!checkEvent) throw new NotFoundError(`There's no event with id :  ${id}`);

  const sameTitleData = await Event.findOne({
    title,
    _id: { $ne: id}
  })

  if (sameTitleData) {
    throw new BadRequestError("The title already used in other event")
  }

  const result = Event.findOneAndUpdate(
    {
      _id: id,
    },
    {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        imageLink: imageLink,
        category,
        talent,
        organizer,
    },
    {
        new: true,
        runValidators: true
    }
  );

  return result;
};

// const deleteEventById

module.exports = {
  createEvent,
  getAllEvents,
  getOneEventById,
  deleteEventById,
  updateEventById,
};
