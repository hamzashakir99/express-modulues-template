const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;
const { JWT_SECRET } = process.env;
ExtractJwt.fromBodyField("token");
const opts = { passReqToCallback: true, secretOrKey: JWT_SECRET };

module.exports = ()=>{
  opts.jwtFromRequest = (request)=>{
    var token = null;
    if (request.header("authorization")) {
      token = request.header("authorization").trim().split(" ").pop();
    } else if (request.query.jwtToken) {
      token = request.query.jwtToken;
    }
    request.jwtToken = token;
    return token;
  };
  passport.use(
    new JwtStrategy(opts, async (req, jwt_payload, done) => {
      try {
        if (!jwt_payload._id) {
          process.nextTick(()=>{
            done({ status: 401, message: messages.InvalidToken }, null);
          });
        } else {
          let user = await schema.Users.findById(jwt_payload._id);
          user ? done(null, user) : done(customError, false);
        }
      } catch (error) {
        console.log(error)
        done(error, false);
      }
    })
  );
};


