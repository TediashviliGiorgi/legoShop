import React from 'react';  
import Dambo from '../images/Dambo.png'

export default class Footer extends React.Component {
 
  render() {
    return (
      <div>
          <footer id="footer" className="footer style-04"> 
            <div className="section-016">
                <div className="container">
                    <div className="row"> 
                    </div>
                </div>
            </div>
            <div className="section-025">
                <div className="container">
                    <div className="row">
                        <hr />
                        <div className="col-md-12 col-lg-12 d-lg-none">
                            <div className="logo-footer">
                                <img src="assets/images/logo.png"
                                    className="az_single_image-img attachment-full" alt="img"/>
                            </div> 
                            <div className="kodory-socials style-01" style={{marginTop: 30}}>
                                <div className="content-socials">
                                    <ul className="socials-list">
                                        <li>
                                            <a href="https://facebook.com" target="_blank">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com" target="_blank">
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com" target="_blank">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="kodory-listitem style-04">
                                <div className="listitem-inner">
                                    <h4 className="title">??????????????????????????? </h4>
                                    <ul className="listitem-list">
                                        <li>
                                            <a href="/" target=" _blank">
                                               ?????????????????????</a>
                                        </li>
                                        <li>
                                            <a href="/products" target=" _blank">
                                               ???????????????????????????</a>
                                        </li>
                                        <li>
                                            <a href="/about" target="_self">
                                               ???????????? ????????????????????? </a>
                                        </li>
                                        <li>
                                            <a href="/contact" target="_self">
                                                ???????????????????????? </a>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="logo-footer">
                                <img src={Dambo}
                                    className="az_single_image-img attachment-full" alt="img"/>
                            </div>
                             
                            <div className="kodory-socials style-01" style={{marginTop: 30}}>
                                <div className="content-socials">
                                    <ul className="socials-list">
                                        <li>
                                            <a href="https://www.facebook.com/legoshop.ge" target="_blank">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com" target="_blank">
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com" target="_blank">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="kodory-listitem style-04">
                                <div className="listitem-inner">
                                    <h4 className="title">
                                        TOP ????????????????????????????????? </h4>
                                    <ul className="listitem-list">
                                        <li>
                                            <a href="#" target="_self">
                                             ?????????-????????????</a>
                                        </li>
                                        <li>
                                            <a href="#" target="_self">
                                             ???????????????????????? ????????????????????????</a>
                                        </li>
                                        <li>
                                            <a href="#" target="_self">
                                            ????????????????????? ?????????????????????????????????</a>
                                        </li>
                                        <li>
                                            <a href="#" target="_self">
                                            ????????????????????? </a>
                                        </li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-016">
                <div className="container">
                    <div className="row">
                        <div  style={{marginLeft: '38%'}}>
                            <p>?? ??????????????? ?????????????????? ????????????????????? - Dambo.ge </p>
                        </div>
                         
                    </div>
                </div>
            </div>
        </footer> 
      </div>
    )
  }

}
