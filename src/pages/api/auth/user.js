import clientPromise from "../../../utils/mongodb";
import { compare } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }
  
  const { email, password } = req.body; // Changed from 'username' to 'email'
  
  console.log("=== LOGIN DEBUG ===");
  console.log("Request body:", req.body);
  console.log("Email received:", email); // Changed from 'username' to 'email'
  console.log("Password received:", password);
  
  try {
    const client = await clientPromise;
    const db = client.db("test");
    
    const user = await db.collection("users").findOne({
      $or: [
        { name: email },    // Search by name using the email field value
        { email: email }    // Search by email using the email field value
      ]
    });
    
    console.log("User found:", user ? "YES" : "NO");
    if (user) {
      console.log("User name:", user.name);
      console.log("User email:", user.email);
    }
    
    if (!user) {
      return res.status(401).json({ message: "No user found" });
    }
    
    const isValid = await compare(password, user.password);
    console.log("Password valid:", isValid);
    
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const { password: _, ...userWithoutPass } = user;
    return res.status(200).json(userWithoutPass);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}