const renderWelcome = async (req, res) => {
    res.render('welcome.html');
};

const renderLogin = async (req, res) => {
    res.render('login.html');
};

const renderList = async (req, res) => {
    res.render('to-do-list.html');
};

module.exports = {
    renderWelcome,
    renderLogin,
    renderList
};