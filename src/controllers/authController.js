/**@format */

const UserModel = require("../models/userModel")
const bcryp = require('bcrypt');

const register = async (req, res) => {
    const {name, email, password} = req.body
    const existingUser = await UserModel.findOne({email})
    console.log(req.body)

    if(existingUser !== null) {
        // res.status(400);
        // throw new Error('User has already exist!')
        res.send('Email existed')
    }
    res.send('Done register!')

    // const salt = await bcryp.genSalt(10);
	// const hashedPassword = await bcryp.hash(password, salt);

	// const newUser = new UserModel({
	// 	name: name ?? '',
	// 	email,
	// 	password: hashedPassword,
	// });

	// await newUser.save();

	// res.status(200).json({
	// 	message: 'Register new user successfully',
	// 	data: {
	// 		email: newUser.email,
	// 		id: newUser._id,
	// 		// accesstoken: await getJsonWebToken(email, newUser.id),
	// 	},
	// });
}

module.exports = {
    register,
}