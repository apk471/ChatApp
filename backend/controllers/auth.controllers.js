export const login = (req, res) => {
  res.send("Login user");
};

export const logout = (req, res) => {
  res.send("Logout user");
};

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;
  } catch (error) {
    console.log(error);
  }
};
