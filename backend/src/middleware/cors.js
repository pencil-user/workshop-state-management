function cors(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "https://dusan-forum-frontend.herokuapp.com")
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, content-type, X-Total, X-Offset, X-Limit, X-Count, X-Unread-Count, x-auth-token');
    res.header("Access-Control-Expose-Headers", 'X-Total, X-Offset, X-Limit, X-Count, X-Unread-Count');

    next()
}

module.exports = cors