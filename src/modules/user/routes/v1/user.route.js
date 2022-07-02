router
    .get(
        '/auth/users',
        actions.user.list.getUsers
    )
module.exports = router;
