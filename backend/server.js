import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

import connectDn  from "./src/db/data.js";


connectDn();


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
