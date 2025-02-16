import mongoose from 'mongoose';
const UserSchema =new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        password:{type:String,required:true,select:false},
        salt:{type:String,select:false},
        sessionToken:{type:String,select:false},
    },

});

export const UserMOdel=mongoose.model('User',UserSchema);
export const getUsers=()=>UserMOdel.find();
export const getUserByEmail=(email:string)=>UserMOdel.findOne({email});
export const getUserBySessionToken=(sessionToken:string)=>UserMOdel.findOne({
    'authentication.sessionToken':sessionToken,
});
export const getUserById=(id:string)=>UserMOdel.findById(id);
export const createUser=(values:Record<string,any>) => new UserMOdel(values).save().then((user)=>user.toObject());
export const deleteUserById=(id:string)=>UserMOdel.findOneAndDelete({_id:id});
export const updateUserById=(id:string,values:Record<string,any>)=> UserMOdel.findByIdAndUpdate(id,values);