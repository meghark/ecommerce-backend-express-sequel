const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const rows = await Category.findAll({
      include:{
        //Return all columns from 
        model : Product
       }
    });  
    res.json(rows);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json(error);
  }  
});

router.get('/:id',async (req, res) => {
  try{
      const rows = await Category.findOne({
        where: {'id': req.params.id},
        include:{
          model: Product
        }
    });
    
    if(!rows)
    {
      res.status(404).json({message: 'No Categories found for the id'});
      return
    }
    res.json(rows);
  }
  catch(error){
    console.log(err);
    res.status(500).json(error);
  }
 
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const results = await Category.create({
      category_name: req.body.category_name
    });

    res.json(results);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json(error);
  } 
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try{
    const result = await Category.update(req.body ,{
      where : {
        id: req.params.id
       }
    });
  
    if(!result[0])
    {
      res.status(404).json({message: "No category not found with this id"});
      return;
    }
    res.json(result);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json(error);
  }  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const result = await Category.destroy({
      where: {
          id: req.params.id
      }
    });

    if(!result)
    {
      res.status(404).json({message: "User not found for deletion"});
      return;
    }
    res.json(result);
  }
  catch(error){
    console.log(error);
    res.status(500).json(error);
  }
  
});

module.exports = router;