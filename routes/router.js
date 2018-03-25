var Controller = require('../controllers/crud');

module.exports = function(app) {
    app.all('/*', function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization,cache-control');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    })

    // HOME PAGE
    app.get('/', function(req, res,next) {
        return res.render('index.html')
    });
    
    /** add/update/delete generate here.  */
    app.post('/create', Controller.add);
    app.post('/update', Controller.update);
    app.post('/get', Controller.get);
    app.post('/delete', Controller.delete);
};

function isLoggedIn(req, res, next) {
    if (req.session.userId){
        console.log(req.session.userId);
        next();
    }else{
        return res.status(500).send({status:false, message: 'SESSION_EXPIRED'});
    }
}