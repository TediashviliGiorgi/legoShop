import React from 'react';  
import axios from 'axios' 

import Header from '../layout/Header'
import Footer from '../layout/Footer'


export default class Item extends React.Component {
 
    state ={
        
        product: {},
        relatedProducts: [],
        loading: false,
        apiError: false
    }


    // Get all products from database
    getData = async () => {
        try{
        

        let currentProduct = {}
      
        // GET PRODUCT 
        await axios 
        .get(`/api/products/get/${this.props.match.params.id }`)
        .then(res => { 
            if(res.status === 200){     
                currentProduct = res.data[0]  
                this.setState({  loading: false, product:  res.data[0] }) 
            }else{
                this.setState({apiError: true})
            } 
        })  
 

        // RELATED PRODUCTS
        if(currentProduct){
            await axios 
            .get('/api/products')
            .then(res => { 
                if(res.status === 200){ 
                     let data = res.data
                     let relatedProducts = []
                     for(let i of data){
                         if(i._id != currentProduct._id && relatedProducts.length < 4){
                            let isRelated = false 
                            for(let b of i.categories){
                                if(currentProduct.categories.includes(b)){
                                   isRelated = true
                                }
                            }
                            if(isRelated){
                                relatedProducts.push(i)
                            }
                         } 
                     } 
                     console.log('Related products:',relatedProducts )
                     this.setState({relatedProducts: [...relatedProducts ]})
                }   
            })   
        } 

        }catch(e){
            console.log(e)
        }
    }

    async componentDidMount(){
        this.setState({loading: true})
        await this.getData()
    }

  render() {
    return (
      <div> 

        <Header />
        {this.state.loading === false && this.state.product.hasOwnProperty('_id') && ( 
           <div className="single single-product" > 
            <div className="single-thumb-vertical main-container shop-page no-sidebar">
                <div className="container">
                    <div className="row">
                        <div className="main-content col-md-12">
                            <div className="kodory-notices-wrapper"></div>
                            <div id="product-27"
                                className="post-27 product type-product status-publish has-post-thumbnail product_cat-table product_cat-new-arrivals product_cat-lamp product_tag-table product_tag-sock first instock shipping-taxable purchasable product-type-variable has-default-attributes">
                                <div className="main-contain-summary">
                                  <div className="contain-left has-gallery"> 
                                    <div style={{marginTop:30}} ></div>       
                                        <div className="single-left"> 
                                         <div  style={{width: 500, height: 500, marginRight: 50, marginTop: 50}} id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                            <ol className="carousel-indicators">
                                                
                                                {this.state.product.images.map((item, index) => (   
                                                    <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index == 0 ? "active" : ""}></li>
                                                ))} 
                                            </ol>
                                            <div className="carousel-inner">
                                                {this.state.product.images.map((item, index) => (  
                                                    <div className={index == 0 ? "carousel-item active" : "carousel-item"}>
                                                    <img className="d-block w-100" src={item.url}  />
                                                    </div>
                                                ))} 
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </a>
                                            </div> 
                                        </div> 

                                        <div className="summary entry-summary" style={{marginTop: 70}}>
                                            <div className="flash">
                                                <span className="onnew"><span className="text">New</span></span></div>
                                            <h1 className="product_title entry-title">{this.state.product.name}</h1>
                                            <p class="price">
                                                {parseInt(this.state.product.disscountPrice) > 0 && (
                                                    <del>
                                                    <span class="kodory-Price-amount amount">
                                                        <span  class="kodory-Price-currencySymbol">₾&nbsp;</span>{this.state.product.price}
                                                    </span>
                                                    </del> 
                                                )}
                                                 {parseInt(this.state.product.disscountPrice) > 0 && (
                                                     <span>&nbsp;&nbsp;</span>
                                                )} 
                                                <ins>
                                                    <span class="kodory-Price-amount amount">
                                                        <span  class="kodory-Price-currencySymbol">₾&nbsp;</span>{parseInt(this.state.product.disscountPrice ) > 0 ? this.state.product.disscountPrice : this.state.product.price}
                                                    </span>
                                                </ins>
                                            </p>
                                            {parseInt(this.state.product.quantity) > 0 && (
                                                <p className="stock in-stock">
                                                რაოდენობა: <span> არის გაყიდვაში</span>
                                                </p>
                                            )}
                                            {parseInt(this.state.product.quantity) < 1 && (
                                                <p className="stock in-stock">
                                                რაოდენობა: <span style={{color: "#fc3903"}}> არ არის გაყიდვაში</span>
                                                </p>
                                            )}
                                            
                                            <div className="kodory-product-details__short-description" > 
                                                <ul>
                                                    <li>{this.state.product.description}</li> 
                                                </ul>
                                            </div>
                                            
                                            <form className="variations_form cart" >
                                               
                                                <div className="single_variation_wrap">
                                                    <div className="kodory-variation single_variation"></div>
                                                    <div className="kodory-variation-add-to-cart variations_button ">
                                                        <div className="quantity">
                                                            <span className="qty-label">რაოდენობა:</span>
                                                            <div className="control">
                                                                <a className="btn-number qtyminus quantity-minus" href="#">-</a>
                                                                <input type="text" data-step="1" name="quantity[25]" value="0" title="Qty" className="input-qty input-text qty text" size="4" pattern="[0-9]*"/>
                                                                <a className="btn-number qtyplus quantity-plus" href="#">+</a>
                                                            </div>
                                                        </div>
                                                        <button type="submit" disabled={this.state.product.quantity < 1 ? true: false}
                                                                className="single_add_to_cart_button button alt kodory-variation-selection-needed">
                                                            კალათაში დამატება
                                                        </button>
                                                        <input name="add-to-cart" value="27" type="hidden"/>
                                                        <input name="product_id" value="27" type="hidden"/>
                                                        <input name="variation_id" className="variation_id" value="0" type="hidden"/>
                                                    </div>
                                                </div>
                                            </form>
                                           
                                            <div className="clear"></div> 
                                            <div className="product_meta">
                                                <div className="wcml-dropdown product wcml_currency_switcher">
                                                    <ul>
                                                        <li className="wcml-cs-active-currency">
                                                            <a className="wcml-cs-item-toggle">USD</a>
                                                            <ul className="wcml-cs-submenu">
                                                                <li>
                                                                    <a>EUR</a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <br/>
                                                <span className="sku_wrapper">კოდი: <span className="sku">{this.state.product.code}</span></span>
                                                <span className="posted_in">კატეგორია: 
                                                    {this.state.product.categories.map((item , index) => (  
                                                        <a href="#" rel="tag">{index == 0 ? ' ': ', '}{item}</a>  
                                                    ))} 
                                                </span> 
                                            </div>
                                            <div className="kodory-share-socials">
                                                <h5 className="social-heading">Share: </h5>
                                                <a target="_blank" className="facebook" href="#">
                                                    <i className="fa fa-facebook-f"></i>
                                                </a>
                                                <a target="_blank" className="twitter"
                                                href="#"><i className="fa fa-twitter"></i>
                                                </a>
                                                <a target="_blank" className="googleplus"
                                                href="#"><i className="fa fa-google-plus"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>



                        <div className="col-md-12 col-sm-12 dreaming_related-product"  >
                            
                            <div class="main-container shop-page no-sidebar">
                            <div className="block-title">
                                <h2 className="product-grid-title">
                                    მსგავსი პროდუქცია
                                    <span></span>
                                </h2>
                            </div> 
                                <div class="container">
                                    <div class="row">
                                        <div class="main-content col-md-12">
                                            
                                            <div class=" auto-clear kodory-products">
                                                <ul class="row products columns-3">

                                                {this.state.relatedProducts.map(item => (  
                                                    <li key={item._id} className="product-item wow fadeInUp product-item rows-space-30 col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01 post-24 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-table product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock first instock featured shipping-taxable purchasable product-type-variable has-default-attributes"
                                                        data-wow-duration="1s" data-wow-delay="0ms" data-wow="fadeInUp">
                                                        <div className="product-inner tooltip-left">
                                                            <div className="product-thumb">
                                                                <a className="thumb-link" href={`/item/${item._id}`}>
                                                                    <img className="img-responsive" src={item.images[0].url} />
                                                                </a> 
                                                                
                                                                {parseInt(item.disscountPrice) > 0 &&
                                                                    <div class="flash">
                                                                            <span class="onsale"><span class="number">-{parseInt( parseInt(item.price) * (parseInt(item.price) - parseInt(item.disscountPrice))  / 100)}%</span></span>
                                                                            <span class="onnew"><span class="text">New</span></span>
                                                                        </div>
                                                                    } 
                                                                <div className="group-button"> 
                                                                    <div className="yith-wcwl-add-to-wishlist">
                                                                        <div className="yith-wcwl-add-button show">
                                                                            <a href="#" className="add_to_wishlist">მოწონება</a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="add-to-cart">
                                                                        <a href="#" className="button product_type_simple add_to_cart_button">კალათაში დამატება</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-info equal-elem">
                                                                <h2 className="product-name product_title">
                                                                {item.name.length < 22
                                                                    ?  <a  href={`/item/${item._id}`}>{item.name} <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
                                                                    :  <a  href={`/item/${item._id}`}>{item.name}</a>
                                                                }
                                                                    
                                                                </h2>
                                                                <div className="rating-wapper nostar">
                                                                    <div className="star-rating"><span   style={{width: "0%"}} >Rated <strong
                                                                            className="rating">0</strong> out of 5</span></div>
                                                                    <span className="review">(0)</span></div>
                                                                <span className="price"><span className="kodory-Price-amount amount">
                                                                    {parseInt(item.disscountPrice) > 0 &&
                                                                        <del><span class="kodory-Price-amount amount">
                                                                            <span  class="kodory-Price-currencySymbol">₾&nbsp;</span>{item.price}</span>
                                                                        </del> 
                                                                    } 
                                                                    <span className="kodory-Price-currencySymbol">&nbsp;₾&nbsp;</span>{parseInt(item.disscountPrice) > 0  ? item.disscountPrice : item.price}</span></span>
                                                                <div className="kodory-product-details__short-description"> </div>
                                                            </div> 
                                                        </div>
                                                    </li>
                                                ))}
                                                </ul> 
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div> 
           </div>
         )} 


         <Footer />
      </div>
    )
  }

}




