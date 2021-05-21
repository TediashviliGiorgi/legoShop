import React from 'react'; 
import Dambo from '../images/Dambo.png'

export default class Header extends React.Component {
 
  render() {
    return (
      <div> 
         <header id="header" className="header style-02 header-dark header-sticky header-transparent">
            <div className="header-wrap-stick">
                <div className="header-position">
                    <div className="header-middle">
                        <div className="kodory-menu-wapper"></div>
                        <div className="header-middle-inner">
                            <div className="header-search-menu">
                                <div className="block-menu-bar">
                                    <a className="menu-bar menu-toggle" href="#">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </a>
                                </div>
                            </div>
                            <div className="header-logo-nav">
                                <div className="header-logo">
                                    <a href="/"><img alt="Dambo" src={Dambo} className="logo"/></a></div>
                                <div className="box-header-nav menu-nocenter">
                                    <ul id="menu-primary-menu"
                                        className="clone-main-menu kodory-clone-mobile-menu kodory-nav main-menu">
                                        <li id="menu-item-230"
                                            className="menu-item menu-item-type-post_type menu-item-object-megamenu menu-item-230 parent parent-megamenu item-megamenu menu-item-has-children">
                                            <a className="kodory-menu-item-title" title="Home" href="/">მთავარი</a> 
                                        </li> 
                                        <li id="menu-item-228"
                                            className="menu-item menu-item-type-post_type menu-item-object-megamenu menu-item-228 parent parent-megamenu item-megamenu menu-item-has-children">
                                            <a className="kodory-menu-item-title" title="Shop"
                                            href="#">კატეგორიები</a>
                                            <span className="toggle-submenu"></span>
                                            <div className="submenu megamenu megamenu-shop">
                                                <div className="row">
                                                    <div className="col-md-4  ">
                                                        <div className="kodory-listitem style-01">
                                                            <div className="listitem-inner">
                                                                <h4 className="title">TOP კატეგორიები </h4>
                                                                <ul className="listitem-list">
                                                                    <li>
                                                                        <a href="#" target="_self">ლეგო </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">  ფაზლები  </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">გართობა დიდებისთვის </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">ტიკ-ტოკი </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">მანქანები</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">პულტიანი სათამაშოები </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#" target="_self">სამაგიდო თამაშები </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="col-md-4  ">
                                                        <div className="kodory-listitem style-01">
                                                            <div className="listitem-inner">
                                                                <h4 className="title">
                                                                    სხვა </h4>
                                                                <ul className="listitem-list">
                                                                    <li>
                                                                        <a href="#"  target="_self">მექანიკური სათამაშოები  </a>
                                                                    </li> 
                                                                    <li>
                                                                        <a href="#"  target="_self">თოჯონები </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"  target="_self">სპორტული </a>
                                                                    </li>  
                                                                    <li>
                                                                        <a href="#"  target="_self">იარაღები </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"  target="_self">სხვადასხვა </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </li>
                                        <li id="menu-item-229"
                                            className="menu-item menu-item-type-post_type menu-item-object-megamenu menu-item-229 parent parent-megamenu item-megamenu menu-item-has-children">
                                            <a className="kodory-menu-item-title" title="Elements" href="/about">ჩვენ შესახებ</a>
                                        </li>
                                        <li id="menu-item-996"
                                            className="menu-item menu-item-type-post_type menu-item-object-megamenu menu-item-996 parent parent-megamenu item-megamenu menu-item-has-children">
                                            <a className="kodory-menu-item-title" title="Blog"
                                            href="/contact">კონტაქტი</a> 
                                        </li>
                                      
                                    </ul>
                                </div>
                            </div>
                            <div className="header-control">
                                <div className="header-control-inner">
                                    <div className="meta-dreaming">
                                        <ul className="wpml-menu">
                                            <li className="menu-item kodory-dropdown block-language">
                                                <a href="#" data-kodory="kodory-dropdown">
                                                    <img src="assets/images/en.png"
                                                        alt="en" width="18" height="12"/>
                                                    ქართული &nbsp;
                                                </a>
                                                <span className="toggle-submenu"></span>
                                                
                                                <ul className="sub-menu">
                                                    <li className="menu-item">
                                                        <a href="#">
                                                            <img src="assets/images/it.png"
                                                                alt="it" width="18" height="12"/>
                                                            English
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li> 
                                        </ul> 
                                        
                                        &nbsp;
                                        <div className="block-minicart block-dreaming kodory-mini-cart kodory-dropdown">
                                            <div className="shopcart-dropdown block-cart-link" data-kodory="kodory-dropdown">
                                                <a className="block-link link-dropdown" href="cart.html">
                                                    <span className="flaticon-shopping-bag-1"></span>
                                                    <span className="count">0</span>
                                                </a>
                                            </div>
                                            <div className="widget kodory widget_shopping_cart">
                                                <div className="widget_shopping_cart_content">
                                                    <h3 className="minicart-title">კალათა
                                                    <span className="minicart-number-items">0</span></h3>
                                                    <ul className="kodory-mini-cart cart_list product_list_widget">
                                                       
                                                    </ul>
                                                    <p className="kodory-mini-cart__total total"><strong>ჯამი:</strong>
                                                        <span className="kodory-Price-amount amount"><span
                                                                className="kodory-Price-currencySymbol"> </span>0</span>
                                                    </p>
                                                    <p className="kodory-mini-cart__buttons buttons">
                                                        <a href="cart.html" className="button kodory-forward">ნახვა</a>
                                                        <a href="checkout.html"
                                                        className="button checkout kodory-forward">შეძენა</a>
                                                    </p>
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
            <div className="header-mobile">
                <div className="header-mobile-left">
                    <div className="block-menu-bar">
                        <a className="menu-bar menu-toggle" href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                    <div className="header-search kodory-dropdown">
                        <div className="header-search-inner" data-kodory="kodory-dropdown">
                            <a href="#" className="link-dropdown block-link">
                                <span className="flaticon-magnifying-glass-1"></span>
                            </a>
                        </div>
                        <div className="block-search">
                            <form role="search" method="get"
                                className="form-search block-search-form kodory-live-search-form">
                                <div className="form-content search-box results-search">
                                    <div className="inner">
                                        <input autocomplete="off" className="searchfield txt-livesearch input" name="s" value=""
                                            placeholder="ძიება..." type="text"/>
                                    </div>
                                </div>
                                <input name="post_type" value="product" type="hidden"/>
                                <input name="taxonomy" value="product_cat" type="hidden"/>
                             
                                <button type="submit" className="btn-submit">
                                    <span className="flaticon-magnifying-glass-1"></span>
                                </button>
                            </form> 
                        </div>
                    </div>
                    <ul className="wpml-menu">
                        <li className="menu-item kodory-dropdown block-language">
                            <a href="#" data-kodory="kodory-dropdown">
                                <img src="assets/images/en.png"
                                    alt="en" width="18" height="12"/>
                                ქართული
                            </a>
                            <span className="toggle-submenu"></span>
                            <ul className="sub-menu">
                                <li className="menu-item">
                                    <a href="#">
                                        <img src="assets/images/it.png"
                                            alt="it" width="18" height="12"/>
                                        English
                                    </a>
                                </li>
                            </ul>
                        </li> 
                    </ul>
                </div>
                <div className="header-mobile-mid">
                    <div className="header-logo">
                        <a href="index.html"><img alt="Kodory" src="assets/images/logo.png" className="logo"/></a>
                    </div>
                </div>
                <div className="header-mobile-right">
                    <div className="header-control-inner">
                        <div className="meta-dreaming">
                            
                            <div className="block-minicart block-dreaming kodory-mini-cart kodory-dropdown">
                                <div className="shopcart-dropdown block-cart-link" data-kodory="kodory-dropdown">
                                    <a className="block-link link-dropdown" href="cart.html">
                                        <span className="flaticon-shopping-bag-1"></span>
                                        <span className="count">0</span>
                                    </a>
                                </div> 
                                <div className="widget kodory widget_shopping_cart">
                                    <div className="widget_shopping_cart_content">
                                        <h3 className="minicart-title">კალათა<span className="minicart-number-items">0</span></h3>
                                        <ul className="kodory-mini-cart cart_list product_list_widget">
                                            
                                        </ul>
                                        <p className="kodory-mini-cart__total total"><strong>ჯამი:</strong>
                                            <span className="kodory-Price-amount amount"><span
                                                    className="kodory-Price-currencySymbol"></span>0</span>
                                        </p>
                                        <p className="kodory-mini-cart__buttons buttons">
                                            <a href="cart.html" className="button kodory-forward">ნახვა</a>
                                            <a href="checkout.html" className="button checkout kodory-forward">შეძენა</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
      </div>
    )
  }

}
