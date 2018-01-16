module.exports.list = function(req, res){
     try {
        var id = req.params.id;
    } catch (err) {
        console.error('[catch]' + err);
    }
    if(!id){
        global.db.query('SELECT * FROM entry_status', 
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
        global.db.query('SELECT * FROM entry_status WHERE id = ?', id,  
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
    var company = req.body;

    global.db.query("INSERT INTO entry_status SET ?", company,
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
    var company = req.body;
    var id = req.params.id;

    global.db.query('UPDATE entry_status SET ? WHERE id = ?', [company, id], 
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

    global.db.query('DELETE FROM entry_status WHERE id = ?', id, 
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