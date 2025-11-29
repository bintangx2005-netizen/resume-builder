import app from "../server.js";     // sesuaikan jika file kamu bernama lain
import serverless from "serverless-http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default serverless(app);
