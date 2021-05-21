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
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';  
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CachedIcon from '@material-ui/icons/Cached';
import Create from './components/newProduct' 
import Update from './components/updateProduct' 
import Orders from './components/Orders'

export default class Admin extends React.Component {
 

  state = {
    tabValue: 1,
    authorized: true,
    denied: false,
    apiError: false,
    username: '',
    password: '',
    successAlert: '',
    failureAlert: '',
    products: [],
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
  getData = async () => {
    try{
      console.log('GETTINGS DATA----------------')
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
                products: data, 
                loading: false,
                updateDialogOpen: false, 
                createDialogOpen: false,
                deleteDialogOpen: false,
                recordsUpdating: false,
            }) 
            
          }else{
              this.setState({
                apiError: true,  
                loading: false, 
                updateDialogOpen: false, 
                createDialogOpen: false,
                deleteDialogOpen: false,
                recordsUpdating: false
              })
          }
      }) 

           
    }catch(e){
      console.log(e)
    }
  }

  // Authorize
  auth = async () => {
    try{
      

      const user = this.state.username
      const pass = this.state.password
      await axios
      .post('/api/users/auth', {username: user, password: pass })
      .then(res => {
        if(res.status === 200){
            if(res.data.succeed === true){
                this.setState({authorized: true, loading: true})
                this.getData()
            }else{
              this.setState({denied: true})
              this.resetMessage()
            }
        }else{
          this.setState({apiError: true})
        }
      } )

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
    }, 5000)
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
    }, 5000)
  }



  // Functions at page load
  componentDidMount() {
    this.setState({loading: true})
    this.getData()
  }

  
 columns = [
  {
      name:  'რედაქტირება - წაშლა' ,  
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
    
 



handleCreateDialogOpen = () => {
  this.setState({createDialogOpen: true})
}
handleCreateDialogClose = () => {
  this.setState({createDialogOpen: false})
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
         await this.getData()
        
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
      <div style={{marginTop:20, marginLeft: 10}}> 
    
      

      {this.state.loading === true && (
        
        <div style={{marginTop: 100, marginLeft: 100, marginBottom: 400}}>
          <h2>
            იტვირთება...
          </h2>
        </div>
        
      )}
      {this.state.authorized === true && this.state.loading === false &&  (
          
          <div >
          <Tabs
            value={this.state.tabValue}
            onChange={(event, newValue) => this.setState({tabValue: newValue}) }
            indicatorColor="primary"
            textColor="primary"  
          >
            <Tab label="პროდუქცია"  value={1}  /> 
            <Tab label="შეკვეთები"   value={2}/>
          </Tabs>

          {this.state.tabValue == 1 && ( 
            <div style={{marginTop:15, marginLeft:10, marginTop:30}}> 

                {this.state.successAlert.length > 0 && (
                      <Alert style={{width: 800, marginLeft:10,marginTop:10,marginBottom: 10 }} severity="success">{this.state.successAlert}</Alert>
                )} 
                
                {this.state.failureAlert.length > 0 && (
                    <Alert style={{width: 800, marginLeft:20 }} severity="error">{this.state.failureAlert}</Alert>
                )}
               
                <div style={{float: "left"}}>   
                  <Button  
                    startIcon={<AddIcon /> }  
                    variant="contained" 
                    color="primary" 
                    style={{marginLeft:10,marginBottom:25, marginTop: 15}}
                    onClick={this.handleCreateDialogOpen}
                    >  ახალი პროდუქტი
                  </Button>  
                  <Button  
                    startIcon={<CachedIcon /> }  
                    variant="outlined"
                    color="primary" 
                    style={{marginLeft:10,marginBottom:25, marginTop: 15, width:130}}
                    onClick={this.getData}
                    >  განახლება
                  </Button>  
                </div>
              
             
                <div className="clear"> </div>
                <MuiThemeProvider style={{marginTop:25}}theme={this.getMuiTheme()}>
                    <MaterialDatatable 
                        title={"პროდუქცია (" + this.state.products.length + ")"}
                        data={this.state.products}
                        columns={this.columns}
                        options={this.options}
                    />
                </MuiThemeProvider> 
                </div> 
            )}        
            {this.state.tabValue == 2 && (
               <Orders data={this.state.products} reload={this.getData} />
            )} 
           
          </div>
        )}


        {this.state.authorized === false && (
          <div> 
            <div style={{  marginBottom:500,  marginTop:50, marginRight: 300 , float:"right"}}> 
                <TextField id="outlined-basic" label="მომხმარებელი" variant="outlined" style={{width: 250}} onChange={e => this.setState({username: e.target.value})}/>
                <br/> <br/>
                <TextField id="outlined-basic" label="პაროლი" type="password" variant="outlined" style={{width: 250}}  onChange={e => this.setState({password: e.target.value})}/>
                <br/> <br/>
                <Button  
                variant="contained"
                    color="primary"
                    onClick={this.auth}
                    style={{width: 250,height:50}}
                >  შესვლა
                </Button>    

                {this.state.denied === true && (
                  <div style={{marginTop: 10}}>
                    <span style={{ color: "red"}}>მომხმარებელი ან პაროლი არასწორია</span>
                  </div>
                )}
                {this.state.apiError === true && (
                  <div style={{marginTop: 10}}>
                    <span style={{ color: "red"}}>ვერ მოხდა ბაზასთან დაკავშირება, სცადეთ მოგვიანებით</span>
                  </div>
                )} 
            </div> 
              </div>
        )}



           {/* CREATE - DIALOG*/}
            <Dialog open={this.state.createDialogOpen} 
               onClose={this.handleCreateDialogClose} 
              aria-labelledby="form-dialog-title"
              maxWidth="lg" 
              fullWidth={true} >
              <DialogTitle id="form-dialog-title" style={{color: "black"}}>ახალი პროდუქტი</DialogTitle> 
              <Create 
                  showSuccessAlert={this.showSuccessAlert}
                  updateProducts= {this.getData}
                  products={this.state.products}
                  close={this.handleCreateDialogClose}
              /> 
            </Dialog>



            
            {/* UPDATE - DIALOG*/}
            <Dialog open={this.state.updateDialogOpen} 
                  onClose={this.handleUpdateDialogClose} 
                  aria-labelledby="form-dialog-title"
                  maxWidth="lg" 
                  fullWidth={true} >
                  <DialogTitle id="form-dialog-title">რედაქტირება</DialogTitle> 
                  <Update 
                      showSuccessAlert={this.showSuccessAlert}
                      updateProducts= {this.getData}
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
                  ნამდვილად გსურთ რომ წაშალოთ "{this.state.selectedObj.name } - {this.state.selectedObj.code}" პროდუქტი?  
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
 