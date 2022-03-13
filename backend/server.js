const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
// const cookieParser = require("cookie-parser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000  ",
    methods: ["GET", "POST"],
    transports: ["websocket"],
    credentials: true,
  },
  allowEIO3: true,
});

// app.use(express.json());
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));

// app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "lostie",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
    allowedHeaders: ["content-type"],
  };
  app.use(cors(corsOptions));
}
const tagRouter = require("./apis/tagRoutes");
const productRouter = require("./apis/productRoutes");
// const filamentRouter = require('./apis/filamentRoutes');
// const orderRouter = require('./apis/orderRoutes');
const orderRouter = require("./apis/orderRoutes");
const userRouter = require("./apis/userRoutes");
const loggerRouter = require("./apis/loggerRoutes");
const authRouter = require("./apis/authRoutes");

const connectSockets = require("./apis/socketRoutes");

app.use("/api/tag", tagRouter);
// app.use('/api/order', orderRouter);
// app.use('/api/filament', filamentRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/logger", loggerRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
connectSockets(io);

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 4444;
http.listen(port, () => console.log(`Listening on port ${port}...`));
