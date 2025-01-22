// updateCart.js
export const updateCart = (cart, coffee, quantity) => {
    const existingItemIndex = cart.findIndex(item => item.coffee.id === coffee.id);
  
    if (existingItemIndex >= 0) {
      // Jika item sudah ada dalam keranjang, update quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Jika item belum ada, tambahkan item baru
      cart.push({ coffee, quantity });
    }
  
    return cart;
  };
  