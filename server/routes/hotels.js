import express from 'express'
import { createHotel,updateHotel,deleteHotel, getOneHotel, getHotels } from '../controllers/hotel.js';
import {verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router();


//create hotel

router.post('/' ,verifyAdmin, createHotel)

//update hotel 
router.put('/:id' , verifyAdmin, updateHotel)

//delete hotel 

router.delete('/:id', verifyAdmin, deleteHotel)
//get single hotel 
router.get('/:id',getOneHotel)


//get all hotels
router.get('/',getHotels)

export default router;