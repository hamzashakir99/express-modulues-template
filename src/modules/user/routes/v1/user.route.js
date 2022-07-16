router
    .get(
        '/profile',
        actions.user.list.profile
    )
    .get(
        '/auth/google',
        (req, res, next)=>{
            const { device_type, device_vendor, os, os_version, browser, browser_version } = req.query
            if(device_type && device_vendor && os && os_version && browser && browser_version){
                req.session.device_type = device_type;
                req.session.device_vendor = device_vendor;
                req.session.os = os;
                req.session.os_version = os_version;
                req.session.browser = browser;
                req.session.browser_version = browser_version;
                next()
            }
            else {
                res.redirect(`${process.env.FRONTEND_URL}/login?result=${messages.generalError}`)
            }
        },
        passport.authenticate("google", ["profile", "email"])
    )
    .get(
        '/auth/google/callback',
        passport.authenticate("google", {
            failureRedirect: `${process.env.FRONTEND_URL}/login?result=${messages.generalError}`,
            session: false
        }), (req, res)=>{
            const token = req.user.jwt_token;
            res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`)
        }
    )
module.exports = router;
