const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
{
  title: String,
  price: String,
  address: String,
  details: String  
}
);

module.exports = mongoose.model("Listing",listingSchema);