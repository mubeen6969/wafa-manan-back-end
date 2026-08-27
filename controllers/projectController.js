const Project = require("../models/Project");

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });

    const sanitized = projects.map((p) => {
      if (p.restricted && !req.ndaUnlocked) {
        return {
          _id: p._id,
          title: p.title,
          category: p.category,
          thumb: p.thumb, // drop this line too if the thumbnail itself is sensitive
          restricted: true,
          order: p.order,
        };
      }
      return p;
    });

    res.json(sanitized);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
};

exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project." });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project." });
  }
};

exports.remove = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found." });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project." });
  }
};