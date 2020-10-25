const router = require('express').Router();
const verify = require("../routes/varifyToken");
const Listing = require("../model/Listing");

//get all listing
router.get('/',verify,async (req,res)=>{
// res.send("All listing");
try{
    const listing = await Listing.find();
    res.json(listing);
}
catch(error){

}
});

//add new  listing
router.post('/',verify,async (req,res) =>{
//res.send("Add new listing");
const listing = new Listing({
    title: req.body.title,
    price: req.body.price,
    address: req.body.address,
    details: req.body.details 
});
try{
    const savedListing = await listing.save();
    res.send(savedListing);
}
catch (error) {
    res.status(400).send(error);
}
});

//single listing
router.get("/:listingId",verify,async (req,res) =>{
//res.send("Single listing");
try{
const listing = await Listing.findById(req.params.listingId);
res.json(listing);
}
catch (error){
    res.json({message: error});
}
});

//Update listing
router.put('/:listingId',verify,async(req,res)=>{
//res.send("Update listing");
try{
    const listing = {
        title: req.body.title,
        price: req.body.price,
        address: req.body.address,
        details: req.body.details
    };
    const updatedListing = await Listing.findByIdAndUpdate(
        {_id: req.params.listingId},listing);
        res.json(updatedListing);
}
catch(error){
    res.json({message: error});
}
});

//Delete listing
router.delete('/:listingId',verify,async (req,res)=>{
//res.send("Delete listing");
try{
    const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
    res.json(removeListing);
}
catch(error)
{
    res.json({message:error});
}
});

module.exports = router;