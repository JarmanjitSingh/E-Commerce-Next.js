import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connectionUrl = `mongodb+srv://jarmanjits176:nextjsEcommerce2023@cluster0.ulc1qxc.mongodb.net/`;

  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("database has been connected"))
    .catch((err) => console.log(`Getting error ${err.message}`));
};

export default connectToDB;
