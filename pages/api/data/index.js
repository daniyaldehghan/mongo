import User from "@/models/User";
import conectedDB from "@/utils/conectedDB";

export default async function handler(req, res) {
  try {
    await conectedDB();
  } catch (err) {
    res.status(500).json({ status: "faild", message: "ca not concted DB." });
    console.log(err);
  }
  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    console.log(email, name, phone);
    if (!name || name.length <= 3) {
      res.status(422).json({ message: "faild Name" });
      return;
    }
    if (!email || email.length <= 10) {
      res.status(422).json({ message: "faild Email" });
      return;
    }
    if (!phone || phone.length < 11) {
      res.status(422).json({ message: "faild phone" });
      return;
    }
    //concted DB.
    //     const user = new User({ name });
    //     await user.save();

    const user = await User.create({ name, email, phone });
    res.status(201).json({ message: "sucess", data: user });
  } 
  else if (req.method === "GET") {
    const users = await User.find();
    console.log(users);
    res.status(201).json({message:"success",data:users})
  }
}
