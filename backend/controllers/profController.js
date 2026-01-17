const { getDb } = require("../modules/db");
// const { MongoClient } = require("mongodb");



const professional = async (req, res) => {
  // res.json({message: "Backend is connected successfully"})

//   let client = null;

  try {
    const professional = require("../professional.json");
    // console.log("Professional is: ", professional[0]);

    const db = getDb();
    // const result = await db.getDb("professional_db").collection('professionals').findOne({});
    // const result = await db.getDb("professional_db").collection('professionals').insertMany(professional);

    // const uri = process.env.MONGODB_URI;

    // client = new MongoClient(uri);

    // const result = await client
    //   .db("professional_db")
    //   .collection("professionals")
    //   .insertMany(professional);
    // const result = await db 
    //   .collection("professionals")
    //   .insertMany(professional);


      const professionalData = await db.collection("professionals").findOne({});
      console.log(professionalData)

    if (professionalData.length!==0) {
      console.log("Found professional data");
      res.json(professionalData);
    } else {
      console.log("No professional data found");
      res.status(404).json({ message: "No professional data found" });
    }
  } catch (err) {
    console.error("Error fetching professional data:", err);
    res.status(500).json({ message: "Error fetching data from database" });
  } 
};

module.exports = { professional };
