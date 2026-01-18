const bcrypt=require('bcrypt');
const User=require('./user.model');
const jwt=require('jsonwebtoken')

const addUser=async (req,res)=>{
    try{
        console.log("req body",req?.body?.name);
        // Validation
        const {name,email,password}=req?.body;
        if(!name || !email || !password){
           return res.status(400).json({msg:'All fields are required..'})
        }
        // check existing User
        const existingUser= await User.findOne();
        if(existingUser){
           return res.status(409).json({msg:'User Already register'});
        }
        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user=await User.create({name,email,password:hashedPassword});
        // Response
        res.status(201).json({msg:'User registered Successfully.',userId:user?._id});
    }
    catch(error){
        console.error('register user error',error);
        res.status(500).json({msg:'Server Error'})
    }
}

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req?.body;
        if(!email || !password){
           return res.status(400).json({msg:'All fields are required.'})
        }

         // 2. Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch=await bcrypt.compare(password,user.password);
     if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // 4. Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });

    }
    catch(error){
        console.error('Sign in error',error);
        res.status(500).json({msg:'Server Error'});
    }
}

const getProfile=async(req,res)=>{
    try{
    res.json({message: 'Profile accessed',user: req.user });
    }
    catch(error){
        console.log('profle access error',error);
        res.status(500).json({msg:'Server Error'});
    }
}

const userPermission=async(req,res)=>{
    try{
    res.json({message: 'Profile accessed',user: req.user });
    }
    catch(error){
        console.log('profle access error',error);
        res.status(500).json({msg:'Server Error'});
    }
}

module.exports={addUser,loginUser,getProfile,userPermission}