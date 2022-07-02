exports.list = {
    getUsers: async(_req, res, next)=>{
        try {
            await utils.res.response(res, messages.success, true, 200, null)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}