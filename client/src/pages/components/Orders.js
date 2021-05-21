import React from 'react';   
import axios from 'axios' 

import Button from '@material-ui/core/Button';   
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';  
import MaterialDatatable from "material-datatable";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';   
import LaunchIcon from '@material-ui/icons/Launch';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';  
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';   
import { Alert } from '@material-ui/lab'; 
import CircularProgress from '@material-ui/core/CircularProgress';   

import CachedIcon from '@material-ui/icons/Cached';
import Update from './updateProduct' 

export default class Admin extends React.Component {
 

  state = {
    tabValue: 1,
   
    
    apiError: false, 
    successAlert: '',
    failureAlert: '',
    orders: [],
    updateDialogOpen: false,
    deleteDialogOpen: false,

    recordsUpdating: false,
    selectedObj: {},
    apiIssue: false,
  
  }


  // Table desing
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTable: {
       height: 800
      }
    }
  })

  // Reset alert messages in 5 seconds
  resetMessage = () => {
    setTimeout(() => {
      this.setState({denied: false, apiError: false})
    }, 5000)
  }


  // Get all products from database
  getOrders = async () => {
    try{
      console.log('GETTINGS ORDERS----------------')
      // Order by product sale status
     

      // GET PRODUCTS
      await axios 
      .get('/api/products')
      .then(res => {
        console.log("RES STATUS:", res.status)
          if(res.status === 200){   
            //  let data = res.data.sort(compare).reverse()   
            let data = res.data   
            console.log('ADMIN - PRODUCTS:', data)
            
            this.setState({
                orders: data, 
                loading: false,
                updateDialogOpen: false,  
                deleteDialogOpen: false,
                recordsUpdating: false,
            }) 
            
          }else{
              this.setState({
                apiError: true,  
                loading: false, 
                updateDialogOpen: false,  
                deleteDialogOpen: false,
                recordsUpdating: false
              })
          }
      }) 

           
    }catch(e){
      console.log(e)
    }
  }
 



  // Show and hide success alerts
  showSuccessAlert = (type) => {
    if(type === 'update'){
      this.setState({ successAlert: "პროდუქტი წარმეტებით განახლდა"})
    }else if(type === 'create'){
      this.setState({ successAlert: "პროდუქტი წარმეტებით დაემატა"})
    }else if(type === 'delete'){
      this.setState({ successAlert: "პროდუქტი წარმეტებით წაიშალა"})
    }

    setTimeout(() => {
        this.setState({successAlert: ''})
    }, 8000)
  }
  // Show and hide failure alerts
  showFailureAlert = (type) => {
    if(type === 'update'){
      this.setState({ failureAlert: "პროდუქტის განახლება ვერ მოხდა, სცადეთ მოგვიანებით"})
    }else if(type === 'create'){
      this.setState({ failureAlert: "პროდუქტის დამატება ვერ მოხდა, სცადეთ მოგვიანებით"})
    }else if(type === 'delete'){
      this.setState({ failureAlert: "პროდუქტის წაშლა ვერ მოხდა სცადეთ მოგვიანებით"})
    }

    setTimeout(() => {
        this.setState({failureAlert: ''})
    }, 8000)
  }



  // Functions at page load
  componentDidMount() {
    this.setState({
        data: this.props.data
    })
     
  }

  
 columns = [
  {
      name:  'რედაქტირება' ,  
      options: { 
        width: 1, 
          customBodyRender: (rowDataObject) => {
              return  <div >
                      <Button  
                          color="primary"
                          onClick={( ) => { 
                            this.setState({
                              updateDialogOpen : true, 
                              selectedObj: rowDataObject  
                            })
                          }}>  {<LaunchIcon />}
                      </Button>    
                      <Button  
                       color="primary"
                        onClick={() => {
                          this.setState({
                            deleteDialogOpen: true, 
                            selectedObj: rowDataObject })
                        }}>  {<DeleteOutlineIcon />}
                    </Button>    
              </div>
          }
      } 
  }, 
    {   
      name: 'კოდი', 
      field: 'code',
      options: {
          width: 50,
      },
    },
    {   
      name: 'სახელი', 
      field: 'name',
      options: {
          width: 50,
      },
    }, 
    {   
      name: 'ფასი', 
      field: 'price',
      options: {
          width: 50,
      },
    }, 
    {   
      name: 'ფასდაკლება', 
      field: 'disscountPrice',
      options: {
          width: 50,
      },
    },   
    {   
      name: 'რაოდენობა', 
      field: 'quantity',
      options: {
          width: 50,
      },
    } 
]  



options = {
    filterType: 'checkbox',
    selectableRows: false,
    rowsPerPage: 100,
    responsive: 'stacked' 
} 
    
 


 
handleDeleteDialogOpen = () => {
  this.setState({deleteDialogOpen: true})
}
handleDeleteDialogClose = () => {
  this.setState({deleteDialogOpen: false})
} 
handleUpdateDialogOpen = () => {
  this.setState({updateDialogOpen: true})
}
handleUpdateDialogClose = () => {
  this.setState({updateDialogOpen: false})
}




handleDeleteProduct = async () => {
  try{
    let id = this.state.selectedObj._id
    this.setState({recordsUpdating: true})
    
    await axios
    .put('/api/products', {_id: id})
    .then(async(res) => {
      if(res.status === 200){
         await this.getProducts()
        
         this.showSuccessAlert('delete')
      }else  if(res.status === 200){ 
        this.setState({
          loading: false, 
          recordsUpdating: false, 
          deleteDialogOpen: false
        })
        this.showFailureAlert('delete')
     }
    })

  }catch(e){
    console.log(e)
  }
}


  render() {

    
    return (
      
        <div>
            <div style={{marginTop:15, marginLeft:10, marginTop:30}}>

                <div style={{float: "left"}}>   
                
                  <Button  
                    startIcon={<CachedIcon /> }  
                    variant="outlined"
                    color="primary" 
                    style={{marginLeft:10,marginBottom:25, marginTop: 15, width:130}}
                    onClick={this.props.reload}
                    >  განახლება
                  </Button>  
                </div>
              
             
                <div className="clear"> </div>
                <MuiThemeProvider style={{marginTop:25}}theme={this.getMuiTheme()}>
                        <MaterialDatatable 
                            title={"შეკვეთები (" + this.state.orders.length + ")"}
                            data={this.state.orders}
                            columns={this.columns}
                            options={this.options}
                        />
                </MuiThemeProvider>
            
            </div>
           
 
            
            {/* UPDATE - DIALOG*/}
            <Dialog open={this.state.updateDialogOpen} 
                  onClose={this.handleUpdateDialogClose} 
                  aria-labelledby="form-dialog-title"
                  maxWidth="md" 
                  fullWidth={true} >
                  <DialogTitle id="form-dialog-title">შეკვეთის დეტალები</DialogTitle> 
                  <Update 
                      showSuccessAlert={this.showSuccessAlert}
                      updateProducts= {this.props.reload}
                      products={this.state.products} 
                      selectedObj={this.state.selectedObj}
                      close={this.handleUpdateDialogClose}
                  /> 
            </Dialog>


            
            {/* DELETE - DIALOG  */}
            <Dialog open={this.state.deleteDialogOpen} 
                onClose={this.handleDeleteDialogClose} 
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth={true} >
                <DialogTitle id="form-dialog-title">წაშლა</DialogTitle> 
                < DialogContent> 
                    ნამდვილად გსურთ რომ წაშალოთ "{this.state.selectedObj.name } - {this.state.selectedObj.code}" შეკვეთა?  
                </DialogContent>
                <DialogActions> 
                    <Button variant="outlined" 
                                color="primary" 
                        onClick={this.handleDeleteDialogClose}  
                    >
                        გაუქმება
                    </Button> 
                    {this.state.recordsUpdating && ( 
                        <CircularProgress    thickness="5" right="10%" size="2.5rem" /> 
                    )}
                    {this.state.recordsUpdating === false && ( 
                        <Button  variant="outlined"
                        color="secondary"
                        onClick={ this.handleDeleteProduct } 
                        disabled={this.state.recordsUpdating}
                        >
                        წაშლა  
                    </Button> 
                    )}
                    
                </DialogActions> 
            </Dialog>

 
      </div>
    )
  }

}
 