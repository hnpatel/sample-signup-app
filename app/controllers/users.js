/**
 * Render login page
 */
exports.login = function(req, res){
    res.render('login', {
        title: 'Login'
    });
};

/**
 * Get Email Records
 */
exports.records = function(req, res){
    res.redirect('/verify-records');
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
}