const allowedOrigins = require("./allowedOrigins");
// it is a third party api so you have to follow their patterns
const allowedOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      // null means no error
      // true means we are allowing]
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = allowedOptions;
