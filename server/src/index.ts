import express from 'express';
import createTemplate from "./create-template";
import axios from 'axios';
import cors from 'cors'


const app = express();
app.use(express.json());
const port = 6006;

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));

app.post("/api/invoice", async (req, res) => {

    const testData =  req.body
    const returnedJson = await axios.post('https://garage-backend.onrender.com/getListing', testData);
    const formatResult = returnedJson.data.result.listing
  
    console.log(returnedJson)

    const result = await createTemplate(formatResult);
  
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  
    result.pipe(res);
});

app.listen(port, () => {
	console.log(`The server is running on port ${port}.`);
});
