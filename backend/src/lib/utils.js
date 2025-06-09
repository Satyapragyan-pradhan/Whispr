import jwt from "jsonwebtoken"
export const generateToken = (userId, res) => {
    const tokens = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    res.cookie("jwt", tokens, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//MS
        httpOnly: true,   //prevent XSS attack
        sameSite: "strict", //prevents CSRF attack
        secure:process.env.NODE_ENV!=="development"
        
    })
    return tokens;

}