import express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

const PORT = process.env.port || 3001;

app.listen(PORT, ()=>{
    console.log(`Server running in port = ${PORT}`)
})