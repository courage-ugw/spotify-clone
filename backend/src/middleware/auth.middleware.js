import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// use try catch to handle errors when working with external apis (e.g. clerk)
export const requireAdmin = async (req, res, next) => {
  try { 
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = currentUser.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
};