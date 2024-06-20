const Yeet = require('../models/yeet');

// Create a new yeet
exports.createYeet = (req, res) => {
  const { content, media, group, replyTo, thread, source } = req.body;
  const author = req.user._id; // Assuming user ID is available in req.user

  // Validate and handle optional fields
  const yeetFields = {};
  if (content) yeetFields.content = content;
  if (media) yeetFields.media = media;
  if (group) yeetFields.group = group;
  if (replyTo) yeetFields.replyTo = replyTo;
  if (thread) yeetFields.thread = thread;
  if (source) yeetFields.source = source;

  // Assign author
  yeetFields.author = author;

  const newYeet = new Yeet(yeetFields);

  newYeet
    .save()
    .then((yeet) => {
      res.status(201).json({ success: true, yeet });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: 'Failed to create yeet', error });
    });
};

// Get a single yeet by ID
exports.getYeetById = (req, res) => {
  const yeetId = req.params.id;

  Yeet.findById(yeetId)
    .then((yeet) => {
      if (!yeet) {
        return res
          .status(404)
          .json({ success: false, message: 'Yeet not found' });
      }
      res.status(200).json({ success: true, yeet });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: 'Failed to get yeet', error });
    });
};

// Update a yeet by ID
exports.updateYeet = (req, res) => {
  const yeetId = req.params.id;
  const { content, media, group, replyTo, thread, source } = req.body;

  Yeet.findByIdAndUpdate(
    yeetId,
    { content, media, group, replyTo, thread, source },
    { new: true }
  )
    .then((updatedYeet) => {
      if (!updatedYeet) {
        return res
          .status(404)
          .json({ success: false, message: 'Yeet not found' });
      }
      res.status(200).json({ success: true, updatedYeet });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: 'Failed to update yeet', error });
    });
};

// Delete a yeet by ID
exports.deleteYeet = (req, res) => {
  const yeetId = req.params.id;

  Yeet.findByIdAndDelete(yeetId)
    .then((deletedYeet) => {
      if (!deletedYeet) {
        return res
          .status(404)
          .json({ success: false, message: 'Yeet not found' });
      }
      res.status(200).json({ success: true, deletedYeet });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: 'Failed to delete yeet', error });
    });
};
