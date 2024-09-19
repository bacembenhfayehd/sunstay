import express from 'express'

import { createRoom, updateRoom,deleteRoom,updateRoomAvailability,getRoom,getRooms } from '../controllers/room.js';
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//create room
router.post('/:hotelid',verifyAdmin,createRoom);
//get single room
router.get('/:id',getRoom);
//get all rooms in hotel
router.get('/',getRooms);
//delete room from hotel
router.delete('/:id/:hotelid',deleteRoom);
//update date room availability
router.put('/availability/:id',updateRoomAvailability);
//update room structure
router.put('/:id',verifyAdmin,updateRoom);



export default router;