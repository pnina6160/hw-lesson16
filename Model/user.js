import mongoose from "mongoose";
import Joi from "joi";

const minimumCake = mongoose.Schema({
    name: String,
    numSeveralLayers: Number,
    tags: [String]
})

let userSchema = mongoose.Schema({
    tz: String,
    userName: String,
    password: String,
    email: String,
    cakes: [minimumCake],
    role:{type:String,default:"user"}
})
export const User = mongoose.model("users", userSchema);

export const userValidatorForLogin = (_user) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,12}$')).required(),
    })
    return schema.validate(_user);
}
export const userValidator = (_user) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,12}$')).required(),
        tz: Joi.string().min(9).max(9).pattern(/^[0-9]{9}/).required(),
        email: Joi.string().email().required()
    })
    return schema.validate(_user);

}
