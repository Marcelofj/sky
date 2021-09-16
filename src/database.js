const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log(`MongoDB running on ${process.env.ENVIRONMENT} environment`);
});

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

main().catch((err) => console.log(err));
