import { User, userValidator, userValidatorForLogin } from "../Model/user.js"
import { hash, compare } from "bcrypt";
import { generateToken } from "../Config/generateToken.js";



export const addUser = async (req, res) => {
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(412).json({ type: "valid not good", message: validate.error.details[0].message})
    let { userName, password, tz, email } = req.body;
    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        if (sameUser)
            return res.status(400).json({
                type: "same user", message: "user with same details already exists"
            })
        let hashPassword = await hash(password, 15)
        let newUser = new User({ userName, password: hashPassword, tz, email })
        await newUser.save();
        let token = generateToken(newUser);
        return res.json({token});
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}


export const login = async (req, res) => {
    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "valid not good", message: validate.error.details[0].message })
    try {
        let user = await User.findOne({ userName: req.body.userName })
        if (!user || !compare(req.body.password, user.password))
            return req.status(400).json({
                type: "no user", message: "not find user witg such parameters, sign up"
            })

        // user.password = "*****"
        let token=generateToken(user)
        return res.json(token);
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, "-password");
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message });
    }
}