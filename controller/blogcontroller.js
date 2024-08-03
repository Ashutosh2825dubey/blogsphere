//blog_index,blog_details,blog_create_get,blog_create_post,blog_delete
const Blog = require('../model/blog');


const handleErrorsblog=(err)=>{
    // console.log(err.errors);
    // console.log(err.message,err.code);//err.code is only used for duplication or unique baki sb m undefined 
    
    let errors={email:'',password:''};// eventually this is the thing that is sent to the user if no error empty but if error then update this an dsen dthis as json
    //incorrect email
    

    //1)validation errors
    //object k sath khela gaya h bas nested objects
    if(err.message.includes('Blog validation failed')){
        // console.log(Object.values(err.errors));
        // Object.values(err.errors).forEach(error=>{
        //     console.log(error.properties)
        // }) this is the like cycle through the values of the object of errors and getting the properties
        Object.values(err.errors).forEach(({properties})=>{ //destructing th eproperties from the errors
         errors[properties.path]=properties.message;

        })
    }
    return errors;

}


const blog_index=(req,res)=> {
    Blog.find().sort({ createdAt: -1 })
.then((result) => {
    res.render('index.ejs', {  blogs: result, title: 'All Blogs' });
})
.catch(err => {
    console.log(err);
});{

}
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    // console.log(id);
    Blog.findById(id)
    .then(result=>{
        res.render('details.ejs',{ blog:result, title: 'Blog details'});
    })
    .catch(err=>{
       res.render('404',{title:'blog not found'})
    })
}
const blog_create_get=(req,res)=>{
    res.render('create', { title: 'Create' });
}


const blog_create_post = async (req, res) => {
    const { title, snippet, body } = req.body;
  
    try {
      const blog = new Blog({ title, snippet, body });
      await blog.save();
      res.status(201).json({ blog });
    } catch (err) {
        const error=handleErrorsblog(err);
        res.status(400).json({error});
    }
  };
  

const blog_delete=(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: 'Error deleting the blog' });
        });


}


const blog_about = (req, res) => {
    res.render('about', { title: 'About Us' });
};
const blog_contact = (req, res) => {
    res.render('contact', { title: 'Contact Us' });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_about,
    blog_contact
};
