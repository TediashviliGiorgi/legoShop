import React from 'react'
import axios from 'axios'

export default class Shop extends React.Component {
 
    state ={
        products: [] ,
        sortedProducts: [],
    }


    // Get all products from database
    getData = async () => {
        try{  
            await axios 
            .get('/api/products')
            .then(res => { 
                if(res.status === 200){  this.setState({ products: res.data})} 
            })  
        }catch(e){
            console.log(e)
        }
    }

    async componentDidMount(){
        await this.getData()
    }

  render() {
    return (
      <div>
         
          <div className="main-container shop-page left-sidebar">
            <div className="container">
                <div className="row">
                    <div className="main-content col-xl-9 col-lg-8 col-md-8 col-sm-12 has-sidebar">
                        <div className="shop-control shop-before-control">
                            
                            <form className="kodory-ordering" method="get">
                                <select title="product_cat" name="orderby" className="orderby">
                                    <option value="menu_order" selected="selected">ახალი დამატებული</option>  
                                    <option value="price">სორტირება ფასით: მაღალი</option>
                                    <option value="price-desc">სორტირება ფასით: დაბალი</option>
                                </select>
                            </form>
                            
                        </div>



                        <div className=" auto-clear kodory-products">
                            <ul className="row products columns-3"> 

                                 {this.state.products.map(item => (  
                                    <li key={item._id} className="product-item wow fadeInUp product-item rows-space-30 col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01 post-30 product type-product status-publish has-post-thumbnail product_cat-light product_cat-bed product_cat-specials product_tag-light product_tag-table product_tag-sock last instock featured downloadable shipping-taxable purchasable product-type-simple"
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
                    <div className="sidebar col-xl-3 col-lg-4 col-md-4 col-sm-12">
                        <div id="widget-area" className="widget-area shop-sidebar">
                            <div id="kodory_product_search-2" className="widget kodory widget_product_search">
                                <form className="kodory-product-search">
                                    <input id="kodory-product-search-field-0" className="search-field"
                                        placeholder="ძიება..." value="" name="s" type="search"/>
                                    <button type="submit" value="Search">ძიება</button>
                                </form>
                            </div>
                            <div id="kodory_price_filter-2" className="widget kodory widget_price_filter"><h2
                                    className="widgettitle">ფასი<span className="arrow"></span></h2>
                                <form method="get" action="#">
                                    <div className="price_slider_wrapper">
                                        <div data-label-reasult="Range:" data-min="0" data-max="1000" data-unit="$"
                                            className="price_slider" data-value-min="100" data-value-max="800">
                                        </div>
                                        <div className="price_slider_amount">
                                            <button type="submit" className="button">გაფილტრე</button>
                                            <div className="price_label">
                                                ფასი: <span className="from">100</span> — <span className="to">800</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                           
                            <div id="kodory_product_categories-3" className="widget kodory widget_product_categories" style={{marginTop:80}}><h2
                                    className="widgettitle">კატეგორიები<span className="arrow"></span></h2>
                                <ul className="product-categories">
                                    <li className="cat-item cat-item-22"><label><input type="checkbox"
                                                                                name="cate"/><span>ლეგო</span>
                                        <span className="count">(11)</span></label></li>
                                    <li className="cat-item cat-item-16"><label><input type="checkbox"
                                                                                name="cate"/><span>ფაზლები</span>
                                        <span className="count">(9)</span></label></li>
                                    <li className="cat-item cat-item-24"><label><input type="checkbox"
                                                                                name="cate"/><span>გართობა დიდებისთვის</span>
                                        <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-27"><label><input type="checkbox"
                                                                                name="cate"/><span>მექანიკური სათამაშოები</span> <span
                                            className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-19"><label><input type="checkbox" name="cate"/><span>პულტიანი სათამაშოები</span>
                                        <span className="count">(7)</span></label></li>
                                    <li className="cat-item cat-item-17"><label><input type="checkbox"
                                                                                name="cate"/><span>სამაგიდო თამაშები </span>
                                        <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-26"><label><input type="checkbox"
                                                                                name="cate"/><span>თოჯონები</span> <span
                                            className="count">(4)</span></label></li>
                                    <li className="cat-item cat-item-18"><label><input type="checkbox"
                                                                                name="cate"/><span>სპორტული</span>
                                        <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-18"><label><input type="checkbox"
                                                                            name="cate"/><span>მანქანები</span>
                                    <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-18"><label><input type="checkbox"
                                                                            name="cate"/><span>იარაღები</span>
                                    <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-18"><label><input type="checkbox"
                                                                            name="cate"/><span>ტიკ-ტოკი</span>
                                    <span className="count">(6)</span></label></li>
                                    <li className="cat-item cat-item-18"><label><input type="checkbox"
                                                                            name="cate"/><span>სხვადასხვა</span>
                                    <span className="count">(6)</span></label></li>
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>

      </div>
    )
  }

}




