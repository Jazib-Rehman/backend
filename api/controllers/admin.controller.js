const { User, Teacher, Student } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { config } = require("../../config/data");

class AdminController {
	// async fetchAllArtists(req, res) {
	//   try {
	//     const artist = await Artist.find().exec();
	//     if (!artist) {
	//       throw new Error("NO artists Found");
	//     }
	//     res.json({ artist });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async fetchArtistById(req, res) {
	//   try {
	//     const artist = await Artist.findById(req.params.id).exec();
	//     if (!artist) {
	//       throw new Error("NO artist Found");
	//     }
	//     res.json({ artist });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async fetchGalleryImages(req, res) {
	//   try {
	//     const artist = await Artist.findById(req.params.id)
	//       .select("galleryImages")
	//       .exec();
	//     if (!artist) {
	//       throw new Error("NO images Found");
	//     }
	//     res.json({ artist });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async fetchAllArtistsByLocation(req, res) {
	//   try {
	//     const { lat, lng } = req.query;
	//     const artist = await Artist.find({ lat, lng }).exec();
	//     res.json({ artist });
	//   } catch (error) {
	//     res.status(500).send(error.message);
	//   }
	// }

	async signUp(req, res) {
		try {
			let user = await User.findOne({ email: req.body.email })
			if (user)
				throw new Error("User Already Exists")

			user = new User(req.body);
			//bcrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(req.body.password, salt);

			await user.save()
			res.status(200).json({ user })
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	async login(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user)
				throw new Error("Invalid Credentials")

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				throw new Error("Invalid Credentials")

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config, { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token, user });
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}

	async loginTeacher(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await Teacher.findOne({ email });
			if (!user)
				throw new Error("Invalid Credentials")

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				throw new Error("Invalid Credentials")

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config, { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token, user });
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}

	async loginStudent(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await Student.findOne({ email });
			if (!user)
				throw new Error("Invalid Credentials")

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				throw new Error("Invalid Credentials")

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(payload, config, { expiresIn: 36000 }, (err, token) => {
				if (err) throw err;
				res.json({ token, user });
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}

	}



	// async appointmentBooking(req, res) {
	//   try {
	//     await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true })
	//     res.json({ status: "success" });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }

	// async updateProfileImage(req, res) {
	//   try {
	//     const data = await Artist.findByIdAndUpdate(req.params.id, req.body, {
	//       new: true,
	//     });
	//     if (!data) {
	//       throw new Error("update Profile Failed, kindly check ID.");
	//     }
	//     res.json({ status: "success" });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async galleryImages(req, res) {
	//   try {
	//     await Artist.findByIdAndUpdate(req.params.id, req.body, {
	//       new: true,
	//     });
	//     res.json({ status: "success" });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }

	// async uploadImage(req, res) {
	//   try {
	//     res.json({ filePath: req.file.path });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }

	// async artistResetPassword(req, res) {
	//   try {
	//     const { reciever } = req.body;
	//     let artist = await Artist.findOne({ email: reciever });
	//     if (!artist) {
	//       throw new Error("No Such Account Exists");
	//     }
	//     const resetNumber =
	//       Math.random().toFixed(36).substring(2, 4) +
	//       Math.random().toFixed(36).substring(2, 4);
	//     await Artist.findByIdAndUpdate(
	//       artist._id,
	//       { resetPassword: resetNumber },
	//       { new: true }
	//     );
	//     let transporter = nodemailer.createTransport({
	//       service: "gmail",
	//       auth: {
	//         user: "helpfinder33@gmail.com",
	//         pass: "Sherry786*",
	//       },
	//     });
	//     const mailOptions = {
	//       from: "artist@gmail.com",
	//       to: reciever,
	//       subject: "Reset Password",
	//       html: `<br><!DOCTYPE html><html><head> 
	//       <title>Reset Password</title>
	//       </head>
	//       <body> <p>Your Password Reset Code is <br> <b>${resetNumber}</b></p>
	//       </body></html>`,
	//     };

	//     transporter.sendMail(mailOptions, function (error, info) {
	//       if (error) {
	//         console.log(error);
	//         res.send(error);
	//       } else {
	//         console.log("Email sent: " + info.response);
	//         res.status(200).json({ status: "code sent" });
	//       }
	//     });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async verifyPassword(req, res) {
	//   try {
	//     const { resetCode, email } = req.body;
	//     if (!resetCode || resetCode === "") {
	//       throw new Error("Please Enter Reset Code.");
	//     }
	//     let artist = await Artist.findOne({
	//       email,
	//       resetPassword: resetCode,
	//     }).exec();
	//     if (!artist) {
	//       throw new Error("Password Update failed.");
	//     }

	//     res.status(200).json({ status: "code verified" });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }
	// async updatePassword(req, res) {
	//   try {
	//     const { email } = req.body;
	//     let artist = await Artist.findOne({ email }).exec();
	//     if (!artist) {
	//       throw new Error("Password Update failed.");
	//     }
	//     const salt = await bcrypt.genSalt(10);
	//     req.body.password = await bcrypt.hash(req.body.password, salt);
	//     const updated = await Artist.findByIdAndUpdate(
	//       artist._id,
	//       { password: req.body.password, resetPassword: "" },
	//       {
	//         new: true,
	//       }
	//     );
	//     if (!updated) {
	//       throw new Error("password cannot update");
	//     }
	//     res.status(200).json({ status: "success" });
	//   } catch (error) {
	//     res.status(500).json({ error: error.message });
	//   }
	// }

}

//
const authValidations = {
	signUp: [
		check("userName", "UserName/CompanyName is required").not().isEmpty(),
		check("email", "please include a valid Email").isEmail(),
		check("password", "please include correct password of 6 or more characters").isLength({ min: 6 }),
	],
	login: [
		check("email", "please include a valid Email").isEmail(),
		check("password", "Password is required").exists(),
	],
};

const adminController = new AdminController();

module.exports = {
	adminController,
	authValidations,
};
