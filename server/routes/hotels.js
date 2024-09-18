import express from 'express'
import { createHotel,updateHotel,deleteHotel, getOneHotel, getHotels } from '../controllers/hotel.js';

const router = express.Router();


//create hotel

router.post('/' , createHotel)

//update hotel 
router.put('/:id' , updateHotel)

//delete hotel 

router.delete('/:id',deleteHotel)
//get single hotel 
router.get('/:id',getOneHotel)


//get all hotels
router.get('/',getHotels)

export default router;