const { Service } = require('../models');


class ServiceController {
  // =====================> CREATE <===================== //
  async createService(req, res) {
    try {
      const data = new Service(req.body);
      await data.save();
      if (!data) {
        return res.status(400).json({ msg: 'no Service added.' });
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // =====================> FETCH <===================== //
  async fetchAllServicesByArtist(req, res) {
    try {
      const data = await Service.find({ artistId: req.params.id }).exec();
      if (!data.length > 0) {
        throw new Error('no Services Found')
      }
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async fetchServiceById(req, res) {
    try {
      const data = await Service.findById(req.params.id).exec();
      if (!data) {
        throw new Error('no Service Found, Kindly Check Id.')
      }
      res.json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // =====================> UPDATE <===================== //
  async updateService(req, res) {
    try {
      const data = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if(!data)
      {
          throw new Error("Service Update Failed.")
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // =====================> REMOVE <===================== //
  async removeServiceById(req, res) {
    try {
      const done = await Service.deleteOne({ _id: req.params.id });
      if (!done) {
        throw new Error("Service deletion failed, please provide correct id")
      }
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = {
  serviceController: new ServiceController()
};
