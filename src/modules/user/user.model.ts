import mongoose, { Schema } from "mongoose";
import validator from "validator";


const userSchema = new Schema<any,any>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
    private: true,
  },
  domain: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  currentYearOfStudying: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});


const User = mongoose.model("User", userSchema);

export default User;
