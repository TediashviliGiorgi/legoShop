import React, {Component } from 'react' 
import Button from '@material-ui/core/Button';  
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';  
import TextField from '@material-ui/core/TextField';     
import CircularProgress from '@material-ui/core/CircularProgress';    
import axios from 'axios';
import { Alert } from '@material-ui/lab';   
import { v4 as uuidv4 } from 'uuid'; 
import ClearIcon from '@material-ui/icons/Clear'; 
import IconButton from '@material-ui/core/IconButton'; 
import Grid from '@material-ui/core/Grid'; 

export default class CreateRecord extends Component{
   
    constructor(props) {
        super(props)
        
        this.state = { 

            loading: false,
            apiIssue: false, 
            
            _id: '',
            code: '', 
            name: '',
            description: '',
            categories: [],
            price: 0,
            quantity: 0,
            inSale: false,
            disscountPrice: 0, 
            images: [],
            uploadedImages: [],

            name_error: '',
            description_error:'',
            price_error: '',
            disscountPrice_error: '', 
            code_error: '',
            categories_error: '',


            image_error: '',  
            selectedFile: '',  
            errMsg: ''
           
        }
    }
 
   
    // Close
    closeForm = () => {
        this.props.close()
    } 
 
  
    // Validations 
    validate = () => {

        let isError = false  
        const errors = { 
            name_error: '',
            description_error:'',
            price_error: '',
            disscountPrice_error: '', 
            code_error: '',
            image_error: '',
            categories_error: ''
        }

        
        // Code
        let current_code = this.state.code.toString().replace(/ /g,'')
        if(current_code === ''){
            isError = true
            errors.code_error = 'კოდი დამატება აუცილებელია'
        }
      

        // Name
        if(this.state.name === '' ){
            isError = true
            errors.name_error = 'პროდუქტის სახელი აუცილებელია!'
        }  

        // Description
        if(this.state.description === '' ){
            isError = true
            errors.description_error = 'პროდუქტის აღწერა აუცილებელია!'
        } 
  
        // Categories
        if(this.state.categories.length === 0 ){
            isError = true
            errors.categories_error = 'კატეგორიის არჩევა აუცილებელია!'
        }  

        // Price
        if(parseInt(this.state.price) < 1 ){
            isError = true
            errors.price_error = 'ფასის შეყვანა აუცილებელია!'
        }  

        // Disscount price 
        if( parseInt(this.state.disscountPrice) > 0 && parseInt(this.state.disscountPrice) >= parseInt(this.state.price)){
            isError = true
            errors.disscountPrice_error = 'ფასდაკლება უნდა იყოს ფასზე დაბალი!'
        }

        //Image 
        if(this.state.uploadedImages.length < 1 && this.state.images.length < 1){ 
                isError = true
                errors.image_error = 'სურათის ატვირთვა აუცილებელია'
        }

        this.setState({ 
            code_error: errors.code_error, 
            name_error: errors.name_error,
            description_error: errors.description_error,
            price_error : errors.price_error,
            disscountPrice_error: errors.disscountPrice_error,
            image_error: errors.image_error ,
            categories_error: errors.categories_error
        }) 
        return isError
    }





 
    async componentDidMount(){

        console.log('Images', this.props.selectedObj.images)
      

        this.setState({
            _id: this.props.selectedObj._id, 
            name:  this.props.selectedObj.name,
            description: this.props.selectedObj.description,
            quantity: this.props.selectedObj.quantity,
            code: this.props.selectedObj.code,
            categories: this.props.selectedObj.categories,
            images: this.props.selectedObj.images,
            price: this.props.selectedObj.price, 
            disscountPrice: this.props.selectedObj.disscountPrice, 
        })
    }






    // Create
    handleUpdate  = async () => { 
       
        if(this.state.images.length){
            this.setState({ loading: true }) 
        
            let reqObj  = {
                _id: this.state._id,
                name: this.state.name, 
                description: this.state.description,  
                code: this.state.code,
                quantity: this.state.quantity,
                price: this.state.price, 
                disscountPrice: this.state.disscountPrice,    
                categories: this.state.categories, 
                images: this.state.images, 
            } 
            try{ 
                await axios
                .post('/api/products/update', reqObj)
                .then(res => {
                    if(res.status === 200){ 
                        this.props.updateProducts()
                        this.props.showSuccessAlert('update') 
                        console.log('UPLOADED ITEM: ', reqObj)
                    }else{
                        this.setState({apiIssue: true, loading: false})
                    }
                })
               
            }catch(e){
                console.log(e)
                this.setState({apiIssue: true, loading: false})
            }


        }else{
            this.setState({errMsg: "სურათის ატვირთვისას მოხდა შეცდომა, სცადეთ ხელახლა", loading: false})
        }
        
          
    }


   
         
      
    
 
     

    handleSubmitFile = (e) => {
        const file = e.target.files[0]  
        if (!file) return 
        const reader = new FileReader() 
        reader.readAsDataURL(file) 
        reader.onloadend = () => { 
           let base64EncodedImage = reader.result
           let _uploadedImages =  this.state.uploadedImages
           _uploadedImages.push({
                id: uuidv4(), 
                url: base64EncodedImage, 
            }) 
            this.setState({
                uploadedImages: _uploadedImages,
                selectedFile: '', 
            }) 
        } 
        reader.onerror = () => { 
            this.setState({errMsg: "სურათის ატვირთვისას მოხდა შეცდომა, სცადეთ ხელახლა", loading: false})
        } 
    }







    handleUploadImages = () => {
         
        const err = this.validate() 
        if (err)return
        let targetImages = [...this.state.uploadedImages]  
        let _images = [...this.state.images]  
        let isApiError = false
        this.setState({loading: true})

        const uploadImage = async (currentImageObj) => {
            try {  
                targetImages.shift()
                console.log('Uploading image:', currentImageObj.id)
                await axios
                .post('/api/products/upload', { data: currentImageObj.url })
                .then(res => {
                    if(res.status === 200){
                        if(res.data.succeed){  
                            console.log('Succeeded, URL:', res.data.url)  
                            _images.push({
                                id: currentImageObj.id,
                                url: res.data.url,
                            })
                        }else{
                            isApiError = true
                            this.setState({errMsg: "სურათის ატვირთვისას მოხდა შეცდომა, სცადეთ ხელახლა", loading: false})
                        } 
                    }else{
                        isApiError = true
                        this.setState({errMsg: "სურათის ატვირთვისას მოხდა შეცდომა, სცადეთ ხელახლა", loading: false})
                    }
                })  
                if(!isApiError){
                    checkRemaining()
                } 
            } catch (err) {
                console.error(err)
                this.setState({errMsg: "სურათის ატვირთვისას მოხდა შეცდომა, სცადეთ ხელახლა", loading: false})
            } 

        }
        const checkRemaining = () => {
            if(targetImages.length){
                uploadImage(targetImages[0])
            }else{
                this.setState({images: _images})
                this.handleUpdate()
            }
        }
        checkRemaining()

    }







    handleRemoveImage = (id) => {
        let array = [...this.state.uploadedImages]   
        let newArr = array.filter(item => item.id != id)

        let images = [...this.state.images]   
        let newImages = images.filter(item => item.id != id)


        this.setState({uploadedImages: newArr, images: newImages})
    }

 





    handleSetCategories = (e) => {
        if(e.target.checked){
            let newArr = [...this.state.categories]
            newArr.push(e.target.name)
            this.setState({categories: newArr})
        }else{
            let prevArr = [...this.state.categories]
            let newArr = prevArr.filter(item => item != e.target.name)
            this.setState({categories: newArr})
        }
        console.log(this.state.categories)
    }
 



 
    render(){

        const joinedImages = [...this.state.images, ...this.state.uploadedImages]
        console.log('joinedImages', joinedImages)
        return (
            <div  >  
                <DialogContent>  
                    <Grid container spacing={3}> 
                        <Grid item xs={6}> 
                            <TextField
                                style={{width: 390, marginTop: 30}}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="დასახელება *"
                                type="text"
                                variant="outlined"
                                value={this.state.name}
                                onChange={event => {
                                    if( event.target.value.length){
                                        this.setState({
                                            name: event.target.value,
                                            name_error: ''
                                        }) 
                                    }else{
                                        this.setState({
                                            name: event.target.value 
                                        }) 
                                    }  
                                }}
                                fullWidth
                                helperText={this.state.name_error}
                                error={this.state.name_error.length}
                            />  
                            
                            <br/>
                                <TextField
                                    style={{width: 390, marginTop: 30,  }} 
                                    margin="dense"
                                    id="name"
                                    label="აღწერა *"
                                    type="text"
                                    variant="outlined"
                                    value={this.state.description}
                                    onChange={event => {
                                        if( event.target.value.length){
                                            this.setState({
                                                description: event.target.value,
                                                description_error: ''
                                            }) 
                                        }else{
                                            this.setState({
                                                description: event.target.value 
                                            }) 
                                        }  
                                    }}
                                    fullWidth
                                    helperText={this.state.description_error}
                                    error={this.state.description_error.length}
                                />   
                                <br/>

                                <TextField
                                    style={{width: 390, marginTop: 30}} 
                                    margin="dense"
                                    id="name"
                                    label="კოდი *"
                                    type="text"
                                    variant="outlined"
                                    value={this.state.code}
                                    onChange={event => {
                                        if( event.target.value.length){
                                            this.setState({
                                                code: event.target.value,
                                                code_error: ''
                                            }) 
                                        }else{
                                            this.setState({
                                                code: event.target.value 
                                            }) 
                                        }  
                                    }}
                                    fullWidth
                                    helperText={this.state.code_error}
                                    error={this.state.code_error.length}
                                />  
                                <br/>
                                <TextField
                                        style={{width: 390, marginTop: 30,  marginBottom: 20}}   
                                        id="standard-number"
                                        label="რაოდენობა *"
                                        type="number"  
                                        variant="outlined"
                                        inputProps={{ min: "0" }} 
                                        value={ parseInt(this.state.quantity)}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={event => {
                                            if( event.target.value.length){
                                                this.setState({
                                                    quantity: event.target.value, 
                                                }) 
                                            }else{
                                                this.setState({
                                                    price: event.target.value 
                                                }) 
                                            }  
                                        }}
                                        fullWidth 
                                />  
                                <br/>
                                <TextField
                                        style={{width: 190, marginTop: 20,  marginBottom: 20}}   
                                        id="standard-number"
                                        label="ფასი *"
                                        type="number"  
                                        variant="outlined"
                                        inputProps={{ min: "0" }} 
                                        value={ parseInt(this.state.price) > 0 ? parseInt(this.state.price) : ''}
                                        InputLabelProps={{ shrink: true,  }}
                                        onChange={event => {
                                            if( event.target.value.length){
                                                this.setState({
                                                    price: event.target.value,
                                                    price_error: ''
                                                    
                                                }) 
                                            }else{
                                                this.setState({
                                                    price: event.target.value 
                                                }) 
                                            }  
                                        }}
                                        fullWidth
                                        helperText={this.state.price_error}
                                        error={this.state.price_error.length}
                                />  
                            
                                <TextField
                                    style={{width: 195, marginLeft: 5, marginTop: 20, marginBottom: 20 }}   
                                    id="standard-number"
                                    label="ფასდალება"
                                    type="number" 
                                    variant="outlined"
                                    inputProps={{ min: "0" }} 
                                    value={ parseInt(this.state.disscountPrice) > 0 ? parseInt(this.state.disscountPrice) : ''}
                                    InputLabelProps={{ shrink: true,  }} 
                                    onChange={event => {
                                        if( event.target.value.length){
                                            this.setState({
                                                disscountPrice: event.target.value,
                                                disscountPrice_error: '' 
                                            }) 
                                        }else{
                                            this.setState({
                                                disscountPrice: event.target.value 
                                            }) 
                                        }  
                                    }}
                                    fullWidth
                                    helperText={this.state.disscountPrice_error}
                                    error={this.state.disscountPrice_error.length}
                                />  
                            
                            </Grid>
                            <Grid item xs={6}>
                                <div id="kodory_product_categories-3" className="widget kodory widget_product_categories" style={{marginTop:20}} >
                                    <h4 className="widgettitle">კატეგორიები<span className="arrow"></span></h4>
                                    <ul className="product-categories">
                                    <li className="cat-item cat-item-22"><label><input type="checkbox" checked={this.state.categories.includes("ლეგო")}
                                            onClick={e => this.handleSetCategories(e)}  name="ლეგო"/><span>ლეგო</span>
                                                                             </label></li>
                                        <li className="cat-item cat-item-16"><label><input type="checkbox" checked={this.state.categories.includes("ფაზლები")}
                                            onClick={e => this.handleSetCategories(e)}  name="ფაზლები"/><span>ფაზლები</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-24"><label><input type="checkbox" checked={this.state.categories.includes("გართობა დიდებისთვის")}
                                            onClick={e => this.handleSetCategories(e)} name="გართობა დიდებისთვის"/><span>გართობა დიდებისთვის</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-27"><label><input type="checkbox" checked={this.state.categories.includes("ექანიკური სათამაშოები")}
                                            onClick={e => this.handleSetCategories(e)} name="ექანიკური სათამაშოები"/><span>მექანიკური სათამაშოები</span> 
                                                                            </label></li>
                                        <li className="cat-item cat-item-19"><label><input type="checkbox" checked={this.state.categories.includes("პულტიანი სათამაშოები")}
                                            onClick={e => this.handleSetCategories(e)} name="პულტიანი სათამაშოები"/><span>პულტიანი სათამაშოები</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-17"><label><input type="checkbox" checked={this.state.categories.includes("სამაგიდო თამაშები")}
                                            onClick={e => this.handleSetCategories(e)}   name="სამაგიდო თამაშები"/><span>სამაგიდო თამაშები </span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-26"><label><input type="checkbox" checked={this.state.categories.includes("თოჯონები")}
                                            onClick={e => this.handleSetCategories(e)}   name="თოჯონები"/><span>თოჯონები</span> 
                                                                            </label></li>
                                        <li className="cat-item cat-item-18"><label><input type="checkbox" checked={this.state.categories.includes("სპორტული")}
                                            onClick={e => this.handleSetCategories(e)}   name="სპორტული"/><span>სპორტული</span>
                                                                            </label></li> 
                                        <li className="cat-item cat-item-18"><label><input type="checkbox" checked={this.state.categories.includes("მანქანები")}
                                            onClick={e => this.handleSetCategories(e)}   name="მანქანები"/><span>მანქანები</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-18"><label><input type="checkbox" checked={this.state.categories.includes("იარაღები")}
                                            onClick={e => this.handleSetCategories(e)}   name="იარაღები"/><span>იარაღები</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-18"><label><input type="checkbox" checked={this.state.categories.includes("ტიკ-ტოკი")}
                                            onClick={e => this.handleSetCategories(e)}   name="ტიკ-ტოკი"/><span>ტიკ-ტოკი</span>
                                                                            </label></li>
                                        <li className="cat-item cat-item-18"><label><input type="checkbox" checked={this.state.categories.includes("სხვადასხვა")}
                                            onClick={e => this.handleSetCategories(e)} name="სხვადასხვა"/><span>სხვადასხვა</span>
                                                                            </label></li>
                                    </ul>
                                    {this.state.categories_error.length > 0 && (
                                        <div style={{ marginTop:10}}> 
                                            <div style={{ marginBottom:20}}>
                                                <p style={{color: "red"}}>{this.state.categories_error}</p>
                                            </div> 
                                        </div>
                                    )}
                                </div>
                            </Grid>
                        
                        </Grid>
                   






                    
                        <div style={{width: 850}}> <hr/></div> 
                        {/* FILE UPLOAD  */}
                        <div style={{marginTop: 10, marginBottom: 100}}> 
                            <form className="form"> 
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    სურათის დამატება
                                    <input
                                        type="file"
                                        id="fileInput"
                                        type="file"
                                        hidden
                                        onChange={this.handleSubmitFile}
                                    />
                                </Button> 
                            </form>


                         
                                <div className=" auto-clear kodory-products" style={{marginTop:30}}>
                                    <ul className="row products columns-3">   
                                        {joinedImages.map(item => ( 
                                            <li key={item.id} className="product-item wow fadeInUp product-item rows-space-30 col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01 post-30 product type-product status-publish has-post-thumbnail product_cat-light product_cat-bed product_cat-specials product_tag-light product_tag-table product_tag-sock last instock featured downloadable shipping-taxable purchasable product-type-simple"
                                                data-wow-duration="1s" data-wow-delay="0ms" data-wow="fadeInUp">
                                                <IconButton onClick={() => this.handleRemoveImage(item.id)}>
                                                    <ClearIcon />
                                                </IconButton>
                                                <div className="product-inner tooltip-left">
                                                    <div className="product-thumb">
                                                        <a className="thumb-link" href="#"> 
                                                            <img className="img-responsive"
                                                                src={item.url}
                                                                width="300" height="428"/>
                                                        </a>  
                                                    </div> 
                                                </div>
                                            </li>
                                        ))} 
                                    </ul>
                                </div> 
                           


                            {this.state.image_error.length > 0 && (
                                  <Alert style={{width: 500, marginTop: 20}} severity="error">{this.state.image_error}</Alert>
                            )}
                             {this.state.errMsg.length > 0 && ( 
                                <Alert style={{width: 500, marginTop: 20}} severity="error">{this.state.errMsg}</Alert>
                            )}
                        </div>
                                   
                    
                    {this.state.apiIssue && (
                        <div style={{ marginTop:20}}> 
                            <div style={{ marginBottom:20}}>
                                <p style={{color: "red"}}>ვერ მოხდა ბაზასთან დაკავშირება, სცადეთ მოგვიანებით</p>
                            </div> 
                        </div>
                    )}
                    {this.state.apiIssue === false && (
                        <div style={{ marginBottom:40}}></div>
                    )}
                   
                </DialogContent> 
                <br/>
                 
                <DialogActions> 
                    <Button 
                            onClick={this.closeForm} 
                            color="primary"
                            variant="outlined"
                            disabled={this.state.loading}
                            style={{width: 150}}
                    >
                        გაუქმება
                    </Button>
                   
                    {this.state.loading && ( 
                        <CircularProgress   thickness="5" right="10%" size="2.5rem"/> 
                    )}
                    {!this.state.loading && (
                      <Button  
                            variant="contained" 
                            color="primary"
                            onClick={  this.handleUploadImages } 
                            disabled={this.state.loading} 
                            style={{width: 150}}
                        >
                        განახლება    
                    </Button>
                    )}
                </DialogActions>
            </div>
        )
    }
}