import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = `${process.env.MONGO_URI}`;

  await mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("database has been connected"))
    .catch((err) => console.log(`Getting error ${err.message}`));
};

export default connectToDB;
