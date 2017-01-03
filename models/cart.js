module.exports = function Cart(oldCart){

  this.items = oldCart.items || {};
  this.totalQty =  oldCart.totalQty || 0;
  this.totalPrice =  oldCart.totalPrice || 0;
  this.add = function(item,id){
    var storedItem = this.items[id];
    if(!storedItem){
      storedItem = this.items[id] = {item: item,qty: 0,price : 0};
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.promotion_price* storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.promotion_price;
  };

  this.removeItem = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    this.updateCart = function(id,qty) {
      qty = parseInt(qty)
      var storedItem = this.items[id];
      console.log('-----tongtruoc------');
      console.log(this.totalQty);
      this.totalQty += qty- storedItem.qty;
      console.log('----tongsau-----');
      console.log(this.totalQty);
      storedItem.qty = qty;
      var b = storedItem.price
      console.log('soluongtrongcart');
      console.log(storedItem.qty);
      storedItem.price = storedItem.item.promotion_price* storedItem.qty;
      console.log('---gia----');
      console.log(storedItem.price);
      this.totalPrice += storedItem.price -b ;
      console.log('----tonggia---');
      console.log(this.totalPrice);
      };
  this.generateArray = function() {
          var arr = [];
          for (var id in this.items) {
              arr.push(this.items[id]);
          }
          return arr;
      };

};
