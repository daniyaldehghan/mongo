import User from "@/models/User";
import conectedDB from "@/utils/conectedDB";

export default async function handler(req, res) {
  await conectedDB();
  const id = req.query.userId;
  if (req.method === "GET") {
    const userdata = await User.findById(id);
    res.status(201).json({ message: "success", data: userdata });
  }else if(req.method==="PATCH"){
    const useremail=await User.findById(id)
    // console.log(user)
    useremail.email=req.body.email
    await useremail.save();
    res.status(201).json({message:"success",data:useremail})
  }
}
