import { Donation, IDonation } from "../models/models";
import { Request, Response } from "express";
import { FoodRequest, UserAuthInfoRequest } from "../types/types";

export const addFood = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { foodName, description, quantity, location, donationDate } =
      req.body as unknown as FoodRequest;

    const donorId = req.user._id;

    const newDonation = new Donation({
      donorId,
      foodName,
      description,
      quantity,
      location,
      donationDate,
    });

    await newDonation.save();
    return res.status(201).json({
      newDonation,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create donation" });
    console.log(error);
  }
};

export const getAllFood = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find();

    if (!Donation) {
      return res.status(401).json({
        message: "No Donations found",
      });
    }
    res.status(200).json(donations);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error getting donations",
    });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    console.log;
    res.status(500).json({ error: "Failed to get donation" });
  }
};

export const updateFood = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const { foodName, description, quantity, location, donationDate } =
      req.body as unknown as FoodRequest;

    const donorId = req.user._id;

    if (!donorId || !foodName || !quantity || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create donation" });
    console.log(error);
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete donation", message: error });
  }
};