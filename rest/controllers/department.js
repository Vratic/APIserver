module.exports.list = function(req, res){
    try {
        var id = req.params.id;
    } catch (err) {
        console.error('[catch]' + err);
    }
    if(!id){
        global.db.query('SELECT * FROM department', 
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
        global.db.query('SELECT * FROM department WHERE id = ?', id,  
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
    var dep = req.body;

    global.db.query("INSERT INTO department SET ?", dep,
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
    var dep = req.body;
    var id = req.params.id;

    global.db.query('UPDATE department SET ? WHERE id = ?', [dep, id], 
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

    global.db.query('DELETE FROM department WHERE id = ?', id, 
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