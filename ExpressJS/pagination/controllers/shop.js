const Product = require('../models/product');
const Cart=require('../models/cart')

const items_per_page=1;

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

exports.getProduct = (req,res,next)=>{
  const prodId=req.params.productId;
  Product.findByPk(prodId)
  .then((product)=>{
    res.render('shop/product-detail',{
      path:'/products',
      pageTitle:product.title,
      product:product
    })
  })
}

exports.getIndex = (req, res, next) => {
  let page= +req.query.page;
  let total_items;
  if(!page)
  page=1;
  //findAndCountAll returns count and rows where row is an array of objects
  Product.findAndCountAll({
    offset:(page-1)*items_per_page,
    limit:items_per_page
  })
  .then((response)=>{
    total_items=response.count;
    return response.rows
  })
  .then((products)=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      currentPage:page,
      hasPreviousPage:page>1,
      hasNextPage:(page*items_per_page)<total_items,
      previousPage:page-1,
      nextPage:page+1,
      lastPage: (Math.ceil(total_items/items_per_page))
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts();
  })
  .then((products)=>{
      res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products

    });
  })
  .catch(err=>{
    console.log(err)
  })

};

exports.postCart =(req, res, next) => {
  const prodId=req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then((cart)=>{
      fetchedCart=cart;
      return cart.getProducts({where:{id:prodId}})
  })
  .then((products)=>{
      let product;
      if(products.length>0){
        product=products[0]
      }
      let newQuantity=1;
      if(product){  
        const oldQuantity=product.cartItem.quantity;
        newQuantity=oldQuantity+1;
        return fetchedCart.addProduct(product,{through:{quantity: newQuantity}})
      }
      else{
        return Product.findByPk(prodId)
        .then((product)=>{
          return fetchedCart.addProduct(product,{through:{quantity: newQuantity}})
        })
        .catch(err=>{console.log(err)})
      }

  })
  .catch(err=>{console.log(err)})

  res.redirect('/cart');
}

exports.postDelete=(req,res,next)=>{
  const prodId=req.body.productId;
  req.user.getCart()
  .then((cart)=>{
    return cart.getProducts({where:{id:prodId}})
  })
  .then((products)=>{
    const product=products[0];
    product.cartItem.destroy();
    res.redirect('/cart')
  })
  .catch(err=>{console.log(err)})
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
