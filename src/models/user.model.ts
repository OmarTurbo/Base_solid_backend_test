import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';
import mongoose, { Schema } from "mongoose";
import { Role, UserType } from '../enums';

const userSchema = new Schema<IUser>(
  {
    username: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true, 
      trim: true 
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER_ROLE,
    },

    type: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      }
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password as string, 12);
});

userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
//
