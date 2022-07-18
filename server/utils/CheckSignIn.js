import jwt from  'jsonwebtoken'
export default (req,res,next)=>{
    const token = (req.headers.authorization ||'').replace(/Bearer\s?/,'');
    if(token){
        try{
            const decodedToken = jwt.verify(token,'secret123')
            req.UserId = decodedToken._id;
            next();

        } catch(e){
            return res.status(400).json({message:"Don't have access!"})
        }
    }else{
        return res.status(403).json({message:"Don't have access!"})
    }


}