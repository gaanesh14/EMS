import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import Employee from "../models/empSchema.js";

export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    let user = await Employee.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // check if any admin exists
    const existingAdmin = await Employee.findOne({ role: "admin" });

    // if no admin -> make this user admin, else employee
    const role = existingAdmin ? "employee" : "admin";

    user = new Employee({ userName, email, password: hashPassword, role });
    await user.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    if (user.authProvider === "google") {
      return res
        .status(400)
        .json({ message: "Please login using Google OAuth" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Access Token (Short Life)
    const accessToken = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2m" },
    );

    // Refresh Token (Long Life)
    const refreshToken = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({
      message: "Login Success",
      accessToken,
      refreshToken,
      // token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        image: user.image,
        gender: user.gender,
        department: user.department,
        designation: user.designation,
        empId: user.empId,
        authProvider: user.authProvider,
      },
      // employee: employeeData,
    });
  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
    console.log("error", error);
  }
};

export const logoutUser = (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = JWT.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = JWT.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "2m" },
    );
    res.json({
      accessToken: newAccessToken,
      // refreshToken: newRefreshToken
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, userName, image } = req.body;

    let user = await Employee.findOne({ email });

    //  If user exists → update provider if needed
    if (user) {
      if (user.authProvider !== "google") {
        user.authProvider = "google";
      }

      // update image only if not already set
      if (!user.image && image) {
        user.image = image;
      }

      await user.save();
    }

    //  If user does NOT exist → create minimal profile
    if (!user) {
      const existingAdmin = await Employee.findOne({ role: "admin" });
      const role = existingAdmin ? "employee" : "admin";

      user = await Employee.create({
        email,
        userName,
        image,
        authProvider: "google",
        role,
        password: null,
      });
    }

    // Access Token (short life)
    const accessToken = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2m" },
    );

    // Refresh Token (long life)
    const refreshToken = JWT.sign(
      { id: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    //  RETURN FULL USER (same as local login)
    res.json({
      message: "Login Success",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        image: user.image,
        gender: user.gender,
        department: user.department,
        designation: user.designation,
        empId: user.empId,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Google login failed" });
  }
};

// Password Change
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    // If request doesn't have id, stop here
    if (!id) {
      return res.status(400).json({ message: "User ID is missing in request" });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    if (employee.authProvider === "google") {
      return res.status(400).json({
        message: "You are login with Google password change is not Allowed!",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    employee.password = hashed;
    await employee.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

