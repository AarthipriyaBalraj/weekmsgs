import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

// Construct __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));

// Serve static files (like form.html)
app.use(express.static(__dirname + "/public"));


// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", __dirname+ "/views"); 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});


app.post("/submit",(req,res)=>{
    const inputdate=req.body.date;
    if (!inputdate) {
    return res.render("index.ejs", {
      date: null,
      name: "No date entered. Please try again.",
    });
  }
    const d = new Date(inputdate);  
    let day = d.getDay();
    console.log(day);
    let message;
    if (day===0||day===6){
        message="Its weekend have some fun";
    }else{
        message="Its weekday work hard";
    }
    res.render("index.ejs",{
        name:message,
        date:inputdate,
    });

})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
