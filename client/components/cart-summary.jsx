import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
  }

  handleBack() {
    this.props.selectedView('catalog', {});
  }

  handleClickCheckout() {
    this.props.selectedView('checkout', {});
  }

  getCartItemCount() {
    let totalItems = 0;
    this.props.cart.map(product => {
      totalItems += parseInt(product.itemCount);
    });
    return totalItems;
  }

  getTotalPrice() {
    const cartItems = this.getCartItemCount();
    const totalPrice = this.props.cart.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur.subTotal), 0);
    const cartItemTitle = cartItems === 1 ? '1 Item' : `${cartItems} Items`;

    if (totalPrice === 0) {
      return 'Item Total: 0';
    } else {
      return `Subtotal (${cartItemTitle}): $` + parseFloat(totalPrice).toFixed(2).toLocaleString();
    }
  }

  render() {
    const cartSummaryMenu = (
      <div className='row m-0'>
        <h5 className='text-muted hvr-icon-back px-3 px-sm-0 py-1' style={{ cursor: 'pointer' }} onClick={this.handleBack}>
          <i className='fas fa-angle-left hvr-icon'></i> Back to catalog
        </h5>
      </div>
    );

    const cartSummaryTitle = (
      <div className='row m-0'>
        <h5 className='px-3 px-sm-0'>My Shopping Cart</h5>
      </div>
    );

    const cartSummaryItem =
      this.props.cart.length === 0 ? (
        <div className='d-flex justify-content-center my-5'>
          <img src='/images/empty-cart.png' className='mx-auto' alt='empty cart' style={{ maxHeight: '20rem', objectFit: 'contain' }} />
        </div>
      ) : (
        this.props.cart.map((item, index) => <CartSummaryItem product={item} key={index} type='cart' />)
      );

    const cartSummaryFooter =
      this.props.cart.length === 0 ? null : (
        <div className='d-flex justify-content-center justify-content-sm-between align-items-center flex-wrap my-2'>
          <div className='row m-0 py-1'>
            <h5 className='px-3 px-sm-0 text-nowrap'>{this.getTotalPrice()}</h5>
          </div>
          <div className='row m-0 py-1'>
            <button type='button' className='btn btn-outline-primary' onClick={this.handleClickCheckout}>
              Proceed to checkout
            </button>
          </div>
        </div>
      );

    return (
      <div className='container cart-summary-container my-2 my-sm-3 p-0'>
        {cartSummaryMenu}
        {cartSummaryTitle}
        <div className='m-0'>
          {cartSummaryItem}
          {cartSummaryFooter}
        </div>
      </div>
    );
  }
}
