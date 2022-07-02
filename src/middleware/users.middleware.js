exports.status = async(req, res, next) => {
    try {
        if(req.user.email_verify){
            next()
        }
        else{
            await utils.res.response(res, messages.emailNotVerify, false, 201, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
};
