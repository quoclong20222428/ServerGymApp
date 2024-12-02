const { default: mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        //Thông tin cá nhân user
        name: { type: String, trim: true },
        age: {type: Number},
        height: {type: Number},
        weight: {type: Number},
        birthDate: { type: Date },
        phoneNumber: { type: String, trim: true },
        gender: {
            type: String,
            enum: ["male", "female", "other", ""],
            default: "",
        },

        // Thông tin đăng nhập
        email: { type: String, unique: true, trim: true, lowercase: true },
        password: { type: String },

        // Kế hoạch hàng tuần (số ngày)
        plan: {type: Number},

        // Ảnh đại diện
        photo: { type: String, trim: true },

        // Trạng thái tài khoản
        isActive: { type: Boolean, default: true },
        
        // Đã xác minh email
        isVerified: { type: Boolean, default: false }, 

        // Ngày tạo tài khoản
        createAt: {type: Date, default: Date.now()}
    },
)

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;