//blog_index,blog_details,blog_create_get,blog_create_post,blog_delete
const Blog = require('../models/blog');
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
const blog_create_post=(req,res)=>{
    // console.log(req.body);
    const blog = new Blog(req.body);
    
    blog.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.status(500).render('create', { title: 'Create', errorMessage: 'Error creating the blog' });
        });
}
const blog_delete=(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
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
