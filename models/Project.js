const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  datas: [
    {
      project: {
        type: String,
      },
      room: {
        type: String,
      },
      unit: {
        type: String,
      },
      airflow1: {
        type: String,
      },
      airflow2: {
        type: String,
      },
      airflow3: {
        type: String,
      },
      min_humidity: {
        type: String,
      },
      max_humidity: {
        type: String,
      },
      max_airflow: {
        type: String,
      },
      boost_timer: {
        type: String,
      },
      fire_contact: {
        type: String,
      },
      configuration: {
        type: String,
      },
      positioning: {
        type: String,
      },
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model("projects", ProjectSchema);
