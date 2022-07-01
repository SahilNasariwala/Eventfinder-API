const express=require("express");
const router=express.Router();
const EventController=require("../controllers/events");
const MyEventController=require("../controllers/myevents");
const checkauth=require("../Authentication/CheckAuth");

router.get("/events",EventController.getEvents);
router.post("/events",checkauth,EventController.postEvents);
router.post("/events/search",checkauth,EventController.findEvent);
router.get("/myevents",checkauth,MyEventController.GetMyEvents);
router.delete("/myevents/",checkauth,MyEventController.deleteEvent);
router.patch("/myevents/",checkauth,MyEventController.updateEvent);

module.exports=router;