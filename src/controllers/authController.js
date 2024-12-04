/**@format */

const UserModel = require("../models/userModel")
const bcryp = require('bcrypt');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getJsonWebToken = async (email, id) => {
	const payload = {
		email,
		id,
	};
	const token = jwt.sign(payload, process.env.SECRET_KEY, {
		expiresIn: '7d',
	});

	return token;
};

const register = asyncHandle(async (req, res) => {
	const { name, email, password } = req.body;

	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error('User has already exist!!!');
	}

	const salt = await bcryp.genSalt(10);
	const hashedPassword = await bcryp.hash(password, salt);

	const newUser = new UserModel({
		name: name ?? '',
		email,
		password: hashedPassword,
	});

	await newUser.save();

	res.status(200).json({
		message: 'Register new user successfully',
		data: {
			email: newUser.email,
			id: newUser._id,
			accesstoken: await getJsonWebToken(email, newUser.id),
		},
	});
});

const login = asyncHandle(async (req, res) => {
	const { email, password } = req.body;

	const existingUser = await UserModel.findOne({ email });

	if (!existingUser) {
		res.status(403);
		throw new Error('User not found!!!');
	}

	const isMatchPassword = await bcryp.compare(password, existingUser.password);

	if (!isMatchPassword) {
		res.status(401);
		throw new Error('Email or Password is not correct!');
	}

	res.status(200).json({
		message: 'Login successfully',
		data: {
			id: existingUser.id,
			email: existingUser.email,
			accesstoken: await getJsonWebToken(email, existingUser.id),
			fcmTokens: existingUser.fcmTokens ?? [],
			photo: existingUser.photoUrl ?? '',
			name: existingUser.name ?? '',
		},
	});
});

const handleLoginWithGoogle = asyncHandle(async (req, res) => {
	const userInfo = req.body;

	const existingUser = await UserModel.findOne({ email: userInfo.email });
	let user;
	if (existingUser) {
		await UserModel.findByIdAndUpdate(existingUser.id, {
			updatedAt: Date.now(),
		});
		user = { ...existingUser };
		user.accesstoken = await getJsonWebToken(userInfo.email, userInfo.id);

		if (user) {
			const data = {
				accesstoken: user.accesstoken,
				id: existingUser._id,
				email: existingUser.email,
				fcmTokens: existingUser.fcmTokens,
				photo: existingUser.photoUrl,
				name: existingUser.name,
			};

			res.status(200).json({
				message: 'Login with google successfully!!!',
				data,
			});
		} else {
			res.sendStatus(401);
			throw new Error('fafsf');
		}
	} else {
		const newUser = new UserModel({
			email: userInfo.email,
			fullname: userInfo.name,
			...userInfo,
		});
		await newUser.save();
		user = { ...newUser };
		user.accesstoken = await getJsonWebToken(userInfo.email, newUser.id);

		if (user) {
			res.status(200).json({
				message: 'Login with google successfully!!!',
				data: {
					accesstoken: user.accesstoken,
					id: user._id,
					email: user.email,
					fcmTokens: user.fcmTokens,
					photo: user.photoUrl,
					name: user.name,
				},
			});
		} else {
			res.sendStatus(401);
			throw new Error('fafsf');
		}
	}
});

module.exports = {
	register,
	login,
	handleLoginWithGoogle,
}