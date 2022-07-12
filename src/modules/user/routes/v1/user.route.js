router
    .get(
        '/users',
        actions.user.list.getUsers
    )
    .get("/auth/login/success", (req, res) => {
        if (req.user) {
            res.status(200).json({
                error: false,
                message: "Successfully Login In",
                user: req.user,
            });
        } else {
            res.status(403).json({ error: true, message: "Not Authorized" });
        }
    })
    .get("/auth/login/failed", (req, res) => {
        res.status(401).json({
            error: true,
            message: "Log in failure",
        });
    })
    .get("/auth/google", passport.authenticate("google", ["profile", "email"]))
    .get(
        "/auth/google/callback",
        passport.authenticate("google", {
            failureRedirect: `/api/v1/auth/login/failed`,
            session: false
        }), (req, res)=>{
            console.log("Q", req)
            const token = req.user.jwt_token;
            res.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
        }
    )
    .get("/auth/logout", (req, res) => {
        req.logout();
        res.redirect("/api/v1/auth/users");
    });
module.exports = router;
