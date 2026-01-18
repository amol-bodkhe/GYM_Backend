const jwt=require('jsonwebtoken');

const authMiddleware=async(req,res,next)=>{
try{
 const authHeader= req.headers.authorization;
  console.log("authHeader",req?.Headers);
 if (!authHeader) {
      return res.status(401).json({
        message: 'Authorization header missing'
      });
    }
 
     // 2️⃣ Extract token (Bearer <token>)
    const token = authHeader.split(' ')[1];
    console.log("token",token);

    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
 console.log("decoded",decoded);
 // 4️⃣ Attach user info to request
    req.user = decoded;

 next();
}
catch(error){
return res.status(401).json({
      message: 'Invalid or expired token'
    });
}
}

module.exports=authMiddleware;