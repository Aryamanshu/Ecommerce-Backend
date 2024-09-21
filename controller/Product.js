const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  // this product we will get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // here we need all query strings
  //filter = {"category":["beauty", "groceries"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination= :{_page:1,_limit=10}
  //TODO: on server we will support multi values in filter

  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  if (req.query._sort) {
    query = query.sort( [req.query._sort] );
 
  }

  const totalDocs = await totalProductsQuery.countDocuments().exec();
  console.log({totalDocs});
  
  
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  
  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs)
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProductById = async (req, res) => {
  const {id} = req.params;

  try {
    const product = await Product.findById(id)
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
  
};

exports.updateProduct = async (req, res) => {
  const {id} = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true})
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
  
};

