// api/auth/register.js
import clientPromise from "../../../utils/mongodb";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body; // Added 'name' here
    try {
      const client = await clientPromise;
      const db = client.db("test");
      const existingUser = await db.collection("users").findOne({ email });
      
      if (existingUser) {
        return res.status(422).json({ message: "User already exists" });
      }
      
      const hashedPassword = await hash(password, 12);
      const result = await db.collection("users").insertOne({
        name,        // Added name field
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });
      
      return res.status(201).json({ message: "User registered", userId: result.insertedId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}