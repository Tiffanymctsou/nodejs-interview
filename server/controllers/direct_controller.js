const renderWelcome = async (req, res) => {
    res.render('welcome.html');
};

const renderList = async (req, res) => {
    const data = {
        subject: ''
    };
    res.render('to-do-list.html', data);
};

module.exports = {
    renderWelcome,
    renderList
};