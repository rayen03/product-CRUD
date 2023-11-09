    //imports 
    const express=require('express');
    const app=express()
    const mongoose=require('mongoose');
    const Product=require('./models/productModel');
    app.use(express.json());
    app.use(express.urlencoded(extended=false));
    //routes    
    app.get('/',(req,res)=>{
        res.send('hello node')
    })

    app.get('/test',(req,res)=>{
        res.send('test succeeded chapati')
    })
//fetch products 
    app.get('/products', async (req, res) => {
        try {
          const products = await Product.find({});
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
//fetch product by id
      app.get('/products/:id', async (req, res) => {
        try {
            const {id} = req.params;
          const product = await Product.findById(id);
          res.status(200).json(product);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
//add product
      
    app.post('/products',async(req,res)=>{
    //res.send(req.body)
    try {
        const product=await Product.create(req.body);
        res.status(200).json(product)    
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message })
    }
    })

//update  product 
app.put('/products/:id',async(req,res)=>{
  try {
    const {id}=req.params;
    const product = await Product.findByIdAndUpdate(id,req.body)
    //product not found
    if (!product){
      return res.status(404).json({message:`product not found with id ${id}`})
    } 
    await product.save();
    res.status(200).json(product);
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})                        
//delete product
app.delete("/products/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    const product= await Product.findByIdAndDelete(id);
    if (!product){
      res.status(404).json({message:`product with the id ${id} is not found`})
    }
    res.status(200).json({message:`product removed successfully`})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
//DB connect
    mongoose.connect('mongodb+srv://XyourusernameX:XyourpwdX@cluster0.t7vyslz.mongodb.net/?retryWrites=true&w=majority').then(()=>{
        app.listen(3000,()=>{
            console.log("node app running on port 3000")})
        console.log('database connected ')})    
    .catch((error)=>{
        console.log(error);
    })