import express from "express";
import protectedRoute from "../middleware/protectedRoute";
import { addFood,deleteFood,getAllFood, getFoodById, updateFood } from "../controllers/donation.controller";
import {requestFood,getUserRequests,acceptRequest,declineRequest,deleteRequest} from "../controllers/request.controller"

const router = express.Router();


router.post("/donate-food", protectedRoute, addFood as any);
router.get("/", protectedRoute, getAllFood as any);
router.get("/:id", protectedRoute, getFoodById as any);
router.patch("/update/:id", protectedRoute, updateFood as any);
router.delete("/delete/:id", protectedRoute, deleteFood as any);


router.post("/request/:id",protectedRoute,requestFood as any)
router.get("/getRequest/:id",protectedRoute,getUserRequests as any)

router.post("/accept/:id",protectedRoute,acceptRequest as any)
router.post("/decline/:id",protectedRoute,declineRequest as any)
router.delete("/deleteRequest/:id",protectedRoute,deleteRequest as any)

export default router;