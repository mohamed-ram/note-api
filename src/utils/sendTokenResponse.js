// helper function to create user token and send it to cookie.
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getUserJWT();
  console.log(res);
  const options = {
    expires: new Date(
      Date.now() + process.env.TOKEN_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, data: user, token });
};

module.exports = sendTokenResponse;
