var Appointment = require('../models/crud');
module.exports = {
    add: function(req, res) {
        console.log(req.body)
        var query = {
            time : req.body.time
        }
        Appointment.findOne(query, function(err, appointment) {
            if(appointment){
                Appointment.findOneAndUpdate(
                    query, 
                    {
                        $set:req.body
                    }, function(err, doc){
                    if(err){
                        res.status(400).send({ status: false, message: JSON.stringify(err) });
                    }else{
                        req.res.status(200).send({status: true, data: doc});
                    }
                });
            }else{
                console.log("new added",req.body)
                Appointment.create(req.body,function (err) {
                    if (err) {
                        res.send(err);
                    }else{
                        res.send({ message: 'Appoitment Booked !' })
                    }
                });
            }
        });
    },
    update: function(req, res) {
        var query = {
            _id:req.body.id
        };
        delete req.body.id;
        Appointment.findOneAndUpdate(
            query, 
            {
                $set:req.body
            }, function(err, doc){
            if(err){
                res.status(400).send({ status: false, message: JSON.stringify(err) });
            }else{
                req.res.status(200).send({status: true, data: doc});
            }
        });
    },
    delete: function(req, res){
        try{
            var query;
            if(req.body.time){
                query = {time : req.body.time}
            }
            Appointment.findOne(query, function(err, appointment) {
                if(appointment){
                    appointment.remove(query)
                    .exec(function (error, user) {
                        if (error) {
                            res.status(400).send({ status: false, message: JSON.stringify(error)});
                        } else {
                            res.send({message:"Appointment deleted successfully"});
                        }
                    });
                }else{
                    res.send({message:"Appointment not exit"})
                }
            });
        }catch(e){
            return res.status(400).send({ status: false, message: e })
        }
    },
    get: function(req, res) {
        var query = req.body;
        Appointment.find(query,function (err, appointment) {
            if (err) {
                res.send(err);
            }else{
                res.send(appointment);
            }
        });
    }
}