const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const router = require("express").Router();
const { Jobpost } = require("../models/PostJobSchema");

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "l=EM5cpu+rjqFyv*Ibjt",
  },
  tls: {
    ca: fs.readFileSync("./http_ca.crt"),
    rejectUnauthorized: false,
  },
});
const checkConnection = async () => {
  try {
    const res = await client.ping();
    console.log("Connected to elasticsearch", res);
  } catch (error) {
    console.log("errror connecting to elasticsearch", error);
  }
};
const jobPost = {
  _id: "65fec96574447e340f33029a",
  TitleJob: "junior developer",
  TitleJob_suggest: {
    input: ["junior developer"],
  },
  Education: "b.e",
  Shift: "day",
  Benefits: "Bonus",
  CompanyName: "Akatsuki",
  Address: "marine drive",
  SalaryRange: "5000",
  JobType: "react Js",
  SkillRequired: "React js ",
  Responsibilities:
    "Component Rendering: React is primarily focused on building user interfaces for web applications.",
  JobDetail: "Junior Developer",
  SkillRequiredInDetail:
    "Component Rendering: React is primarily focused on building user interfaces for web applications.",
  userId: "116757831115006310106",
  createdAt: "2024-03-23T12:21:57.501Z",
  updatedAt: "2024-03-23T12:21:57.501Z",
  __v: 0,
};

const getDataIndex = async (req, res) => {
  try {
    const data = await Jobpost.find();
    if (data) {
      //   client.index({
      //     index: "job-postings",
      //     id: "123",
      //     body: data,
      //   });
      //   res.status(200).json(data);
      res.send(data);
      // console.log("here the data", gandudata);
    } else {
      res
        .status(400)
        .json("data is not found and data is not inserted to elasticsearch");
    }
  } catch (error) {
    res.status(400).json("error ");
  }
};

router.post("/indexdata", async (req, res) => {
  try {
    await client.index({
      index: "job-postings",
      id: "123",
      body: jobPost,
    });
  } catch (error) {}
});
// module.expo

const GetSearch = async (req, res) => {
  const { query } = req.query;

  try {
    const result = await client.search({
      index: "job-postings",
      body: {
        suggest: {
          gotsuggest: {
            prefix: query,
            completion: {
              field: "TitleJob_suggest",
              size: 5,
            },
          },
        },
      },
    });

    console.log("Elasticsearch response:", JSON.stringify(result, null, 2));
    if (result.suggest && result.suggest.gotsuggest) {
      const suggestions = result.suggest.gotsuggest[0].options.map(
        (option) => option
      );
      res.status(200).json({ suggestions });
    } else {
      res.status(200).json({ suggestions: [] });
    }
  } catch (error) {
    res.status(401).json({ message: "no job found" });
    console.log("error while getting the data", error);
  }
};
module.exports = {
  checkConnection,
  getDataIndex,
  GetSearch,
};
