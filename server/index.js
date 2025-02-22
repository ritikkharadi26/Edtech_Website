const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //to connect with frontend cors=core origin resource sharing
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
// const allowedOrigins = [
//     "http://localhost:3000",
//     "https://edu-plus-full-stack-project-using-mern-ritiks-projects-7cd2a6d2.vercel.app",
// 	"https://edu-plus-full-stack-project-using-mern-rrdt.vercel.app"
// ];
dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*", // Allows requests from any origin
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	next();
//   });
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})