// mongoose gives tools to interact with mongodb
// at first require mongoose then create schema then a model that runs on the schema defined
//models are created based on blog schema
//install mongoose as it is 3rd party
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const blogschema=new schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{timestamps:true});
//model creation
const Blog=mongoose.model('Blog',blogschema);//pluralise it mongoose so a collection is created blogs not blog
module.exports=Blog;
