import jwt from "jsonwebtoken"
export const auth = async (req, res, next) => {
    let token = req.headers["xtoken"]
    if (!token)
        return res.status(419).json({ type: "not authorized", messsage: "token missing" })

    try {
        let decoded =jwt.verify(token, process.env.JWT_STRING);
        // if (!decoded)
            // return res.status(401).json({ type: "not authorized", messsage: "user not authorized" })
        next();
    }
    catch (err) {
        return res.status(419).json({ type: "not authorized", messsage: "user not authorized" })

    }
}