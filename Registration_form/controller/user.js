const User=require('../model/user')

exports.getusers=(req,res,next)=>{
    User.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}
exports.addNewUser=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    User.create({
        name:name,
        email:email
    })
    .then((result)=>{
        res.json(result.dataValues)
    })
    .catch(err=>{console.log(err)})
}

exports.deleteuser=(req,res,next)=>{
    const id=req.params.id;
    User.findByPk(id)
    .then((user)=>{
        user.destroy()
    })
    .catch(err=>{
        console.log(err)
    })
}
