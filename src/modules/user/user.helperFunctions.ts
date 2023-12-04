import User from "./user.model";

export const isEmailTaken = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else {
    return false;
  }
};
