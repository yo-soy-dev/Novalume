import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
}, { timestamps: true });

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", UserSchema);

export default User;