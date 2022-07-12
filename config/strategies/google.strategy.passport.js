module.exports = () => {
    passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/v1/auth/google/callback",
                scope: ["profile", "email"]
            },
            async (accessToken, _refreshToken, profile, callback) => {
                try {
                    let user = await schema.users.findOne({"google_details.id": profile.id});
                    if (!user) {
                        const data = new schema.users({
                            "email": profile.email,
                            "email_verify": true,
                            "google_details.email": profile.email,
                            "google_details.access_token": accessToken,
                            "google_details.is_google_connected": true,
                            "google_details.id": profile.id,
                            "google_details.email_verified": profile.email_verified,
                            "google_details.verified": profile.verified
                        })
                        user = await data.save()
                    }
                    const token = await JWT.sign({ _id: profile.id, email: profile.email, accessToken, provider: 'google' }, process.env.JWT_SECRET, {
                        expiresIn: process.env.TOKEN_EXPIRY,
                    });
                    user = await schema.users.findOneAndUpdate({
                        "google_details.id": profile.id
                    }, {
                        $set: {
                            "jwt_token": token,
                        }
                    }, {new: true})
                    return callback(null, user);
                } catch (error) {
                    console.log(error)
                    callback(error);
                }
            }
        )
    );
};
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});