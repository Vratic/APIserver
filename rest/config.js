// -------------------------------------
// Database Connect Setting:
// -------------------------------------
module.exports.connectDB = function(){
    var mysql = require('mysql');

    var conection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'vacapp'
    });

    conection.connect(function(error){
        if(!!error){
            console.error(error);
        } else {
            console.log('Database is connected ...');
        }
    });
    return conection;
}

// -------------------------------------
// Module Routers API:
// -------------------------------------
module.exports.routers = function(){
    var express = require('express');
    var router = express.Router();

    // Login:
    var login = require('./controllers/login');
    router.post('/login', login.post);

    // Validation:
    router.use(login.validation);

    // User:
    var user = require('./controllers/user');
    router.get('/user', user.list);
    router.get('/user/:id', user.list);
    router.post('/user/', user.create);
    router.put('/user/:id', user.update);
    router.delete('/user/:id', user.delete);

    // User Obligation:
    router.get('/user/:id/obligation', user.list_obligation);
    router.post('/user/:id/obligation', user.create_obligation);
    router.put('/user/:id/obligation', user.update_obligation);

    // User Vacation:
    router.get('/user/:id/vacation', user.list_vacation);
    router.post('/user/:id/vacation', user.create_vacation);
    router.put('/user/:id/vacation', user.update_vacation);

    // Company:
    var company = require('./controllers/company');
    router.get('/company', company.list);
    router.get('/company/:id', company.list);
    router.post('/company', company.create);
    router.put('/company/:id', company.update);
    router.delete('/company/:id', company.delete);

    // Department:
    var department = require('./controllers/department');
    router.get('/department', department.list);
    router.get('/department/:id', department.list);
    router.post('/department/', department.create);
    router.put('/department/:id', department.update);
    router.delete('/department/:id', department.delete);

    // Entry:
    var entry = require('./controllers/entry');
    router.get('/entry', entry.list);
    router.get('/entry/:id', entry.list);
    router.post('/entry', entry.create);
    router.put('/entry/:id', entry.update);
    router.delete('/entry/:id', entry.delete);

    // Entry Status:
    var status = require('./controllers/entry_status');
    router.get('/status', status.list);
    router.get('/status/:id', status.list);
    router.post('/status', status.create);
    router.put('/status/:id', status.update);
    router.delete('/status/:id', status.delete);

    // Entry Type:
    var type = require('./controllers/entry_type');
    router.get('/type', type.list);
    router.get('/type/:id', type.list);
    router.post('/type', type.create);
    router.put('/type/:id', type.update);
    router.delete('/type/:id', type.delete);


    return router;
}