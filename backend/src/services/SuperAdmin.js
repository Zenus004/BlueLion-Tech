const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const DEFAULT_SUPER_ADMIN = {
  username: "superadmin",
  password: "admin123",
};

const bootstrapSuperAdmin = async () => {
  const existingSuperAdmin = await Admin.findOne({
    username: DEFAULT_SUPER_ADMIN.username,
  });

  if (existingSuperAdmin) {
    return { created: false };
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_SUPER_ADMIN.password, 10);

  await Admin.create({
    username: DEFAULT_SUPER_ADMIN.username,
    password: hashedPassword,
    role: "super_admin",
    isBlocked: false,
    createdBy: null,
  });

  return { created: true };
};

module.exports = bootstrapSuperAdmin;
