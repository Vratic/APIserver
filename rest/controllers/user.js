module.exports.list = function(req, res){
     try {
        var id = req.params.id;
    } catch (err) {
        console.error('[catch]' + err);
    }
    if(!id){
        global.db.query('SELECT * FROM user', 
        function(err, row, field){
            if(err){
                console.error(err);
                return res.status(500).send('Internal Server Error' + err);
            } else {
                console.log(row);
                return res.status(200).json(row);
            }
        });
    } else {
        global.db.query('SELECT * FROM user WHERE id = ?', id,  
        function(err, row, field){
            if(err){
                console.error(err);
                return res.status(500).send('Internal Server Error' + err);
            } else {
                console.log(row);
                return res.status(200).json(row);
            }
        });
    }
};

module.exports.create = function(req, res){
    var user = req.body;

    global.db.query("INSERT INTO user SET ?", user,
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(201).json(row);
        }
    });
};

module.exports.update = function(req, res){
    var user = req.body;
    var id = req.params.id;

    global.db.query('UPDATE user SET ? WHERE id = ?', [user, id], 
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};

module.exports.delete = function(req, res){
    var id = req.params.id;

    global.db.query('DELETE FROM user WHERE id = ?', id, 
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};


// -------------------------------------------
// User obligation:
// -------------------------------------------
module.exports.list_obligation = function(req, res){
    var id = req.params.id;

    global.db.query('\
    SELECT * FROM user_obligation \
    INNER JOIN user ON user.id = user_obligation.user_id \
    WHERE user.id = ?', id,
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};

module.exports.create_obligation = function(req, res){
    var id = req.params.id;

    var ob = {
        user_id : id
    };

    global.db.query('INSERT INTO user_obligation SET ?', ob, 
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};

module.exports.update_obligation = function(req, res){
    var id = req.params.id;
    var obl = req.body;

    global.db.query('\
    UPDATE user_obligation \
    INNER JOIN user ON user.id = user_obligation.user_id \
    SET ? WHERE user.id = ?', [obl, id],
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};


// -------------------------------------------
// User vacation:
// -------------------------------------------
module.exports.list_vacation = function(req, res){
    var id = req.params.id;

    global.db.query('\
    SELECT * FROM user_vacation \
    INNER JOIN user ON user.id = user_vacation.user_id \
    WHERE user.id = ?', id,
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};

module.exports.create_vacation = function(req, res){
    var id = req.params.id;
    var date = new Date();
    var year = date.getFullYear();

    var vac = {
        user_id : id,
        year : year
    };

    global.db.query('INSERT INTO user_vacation SET ?', vac, 
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};

module.exports.update_vacation = function(req, res){
    var id = req.params.id;
    var vac = req.body;

    global.db.query('\
    UPDATE user_vacation \
    INNER JOIN user ON user.id = user_vacation.user_id \
    SET ? WHERE user.id = ?', [vac, id],
    function(err, row){
        if(err){
            console.error(err);
            return res.status(500).send('Internal Server Error' + err);
        } else {
            console.log(row);
            return res.status(200).json(row);
        }
    });
};