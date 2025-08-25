import joi from 'joi'
const schema = joi.object({
    name:joi.string().min(1).max(49).required(),
    address:joi.string().min(1).max(49).required(),
    latitude:joi.number().required(),
    longitude:joi.number().required()
})

async function validateSchool(req, res, next) {
    let { error } = schema.validate(req.body);
    if( error ){
        return res.status(400).json({message:"incorrect input body"});    
    }else{
        next();
    }
}

export default validateSchool;