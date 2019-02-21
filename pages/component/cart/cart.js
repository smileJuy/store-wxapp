// pages/component/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    hasList:false,
    totalPrice:0,
    selectAlllStatus:true,
    obj:{
      name:"hello"
    }
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hasList: true,
      carts: [
        { id: 1, title: '新鲜芹菜 半斤', image: '/image/s5.png', num: 4, price: 0.01, selected: true },
        { id: 2, title: '素米 500g', image: '/image/s6.png', num: 1, price: 0.03, selected: true }
      ]
    });
    this.getTotalPrice();
  },
  // 当前商品选中事件
  selectList:function(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts:carts
    });
    this.getTotalPrice();
  },
  // 删除购物车当前商品
  deleteList:function(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts:carts
    });
    if(!carts.length){
      this.setData({
        hasList:false
      });
    }else{
      this.getTotalPrice();
    }
  },
  // 购物车全选事件
  selectAll:function(e){
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for(let i = 0; i < carts.length; i++){
      carts[i].selected = selectAllStatus;

    }
    this.setData({
      selectAllStatus:selectAllStatus,
      carts:carts
    });
    this.getTotalPrice();
  },
  // 绑定加数量事件
  addCount:function(e){
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts:carts
    })
    this.getTotalPrice();
  },
  // 绑定减数量事件
  minusCount:function(e){
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts:carts
    });
    this.getTotalPrice();
  },
  // 计算总价
  getTotalPrice:function(){
    let carts = this.data.carts;
    let total = 0;
    for(let i=0;i<carts.length;i++){
      if(carts[i].selected){
        total += carts[i].num * carts[i].price;
      }
    }
    this.setData({
      carts:carts,
      totalPrice:total.toFixed(2)
    })
  }
})