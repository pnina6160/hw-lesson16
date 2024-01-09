import { User, userValidator, userValidatorForLogin } from "../Model/user.js"



export const addUser = async (req, res) => {
    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "valid not good", message: validate.error.details[0].message })
    let { userName, password, tz, email } = req.body;
    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        if (sameUser)
            return req.status(400).json({
                type: "same user", message: "user with same details already exists"
            })
        let newUser=new User({userName, password, tz, email})
        await newUser.save();
        return res.json(newUser);
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message});
    }
}


export const login = async (req, res) => {
    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "valid not good", message: validate.error.details[0].message })
    let { userName, password, tz, email } = req.body;
    try {
        let user = await User.findOne({ userName: userName ,password:password })
        if (!user)
            return req.status(400).json({
                type: "no user", message: "not find user witg such parameters, sign up"
            })

        user.password="*****"
        return res.json(user);
    }
    catch(err){
        res.status(400).json({type:"error",message:err.message});
    }
}