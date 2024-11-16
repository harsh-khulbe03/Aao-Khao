import jwt from "jsonwebtoken";

function authenticate(req,res,next) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "Please provide the token to validate the user",
        })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,userDetails) => {
        if(err) {
            return res.status(401).json({
                message:"User is not authorized",
                err,
            })
        }
        req.user = userDetails;
        next();
    })
}

export default authenticate;