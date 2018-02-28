//for firstpage.html
var myApp=angular.module('myApp',[]); 
myApp.controller('orderCntrl',['$scope','$http','$window','$rootScope',"ControllerService",
function($scope,$http,$window,$rootScope,ControllerService){
  //alert("well come to mainpage.html")
// $scope.irate=[];
//var updateData="";
//$scope.updateOrder=null
//for generating billno
$scope.date=new Date()
//$scope.datefrom
$http.get('/getprefixs').success(function(response){
  console.log(response);
  console.log(response[0].TransactionPrefix)
  $scope.prefix1=response[0].TransactionPrefix;
  // alert($scope.prefix1);
  $http.get('/gettotalcount').success(function(response){
    console.log(response);
    $scope.bno=response+1;
    $scope.billNo=$scope.prefix1+$scope.bno;
    $scope.orderNO=$scope.billNo;
    // alert($scope.billNo);
    $scope.BillNos=$scope.prefix1+","+$scope.bno;
    $scope.narrate="Bill No is :"+$scope.billNo;
      window.sessionStorage.setItem("billnumber",$scope.billNo);
  // alert($scope.billNo);
  // $scope.insertReceipt($scope.billNo);
  });
});
 var updateData=window.sessionStorage.getItem("bringOrders")
 if(updateData!=null)
 {
  //alert(updateData)
  $scope.updateOrder=updateData

 }
    var orerNme=window.sessionStorage.setItem("bringOrders","null");
 var oNee = window.sessionStorage.getItem("bringOrders");

var orderName  =window.sessionStorage.getItem("orderName");
     //console.log(orderName)
     if (orderName!=null) {
          $scope.party=orderName
        } 
         var orderName=window.sessionStorage.setItem("orderName","null");
 var oN = window.sessionStorage.getItem("orderName"); 
 
 
 var orderid=JSON.parse(window.sessionStorage.getItem("gotoorders"));

if (orderid!=null){
console.log(orderid._id)
 $scope.goOrders='show'
  $http.get('/goorders',{params:{"id":orderid._id}}).success(function(response){
             console.log(response)

               $scope.userit=response;
$scope.orderNO=response[0].orderNO
$scope.party=response[0].partyNames
$scope.staff=response[0].saleNames
$scope.totalVal=response[0].totalVal
$scope.remarks=response[0].remarks
$scope.userit[0].usedate = new Date(response[0].usedate )
  $scope.date = new Date(response[0].date )    

               })

}
 var orderid=window.sessionStorage.setItem("gotoorders","null");
 var de = window.sessionStorage.getItem("gotoorders"); 

  var fixdec= 2;
  //$scope.transaction ="Receipt Voucher"
  var checkRepeat = false
    $scope.LabourTax = null;
$scope.userit=[];
 $scope.use=[];
  $scope.results=[];
   //var selectedrow = null;
$scope.radiowithinstate = "withinstate";
   $scope.radio = {
        state:'with in state'  
      };
  $scope.usernamedetails = window.sessionStorage.getItem("username")
   $scope.userit.push({ 

         
               'purity' : "",
               'gwt': "", 
                'rate': "",
                'total': "",
                'taxval':"",
              
                // 'matadj':$scope.totmat ,
                // 'irate':[]              
            });

// $scope.partyNames=function () {

 //alert("jj")
  $http.get('/PartyNames').success(function(response){
        $scope.partyNames=response;
       
  });
  console.log( $scope.partyNames)
// }
// $scope.vendorNames=function () {

//  //alert("jj")
//   $http.get('/PartyNames').success(function(response){
//         $scope.partyNames=response;
       
//   });
//   console.log( $scope.partyNames)
// }
$scope.orderdetail=function(partyname123){
  console.log(partyname123)
  var prtys=partyname123;
 $http.get('/orders'+prtys).success(function(response){
      console.log(response);
      $scope.userit=response;

               
                  });
}

// $scope.stonecalc=function () {
//alert("jj")
 
  $http.get('/stonecalc').success(function(response){
        $scope.labcal=response;
       
  });
  console.log( $scope.partyNames)
// }
// $scope.saleNames=function () {

 
  $http.get('/saleNames').success(function(response){
        $scope.saleNames=response;
        
  });
  console.log( $scope.partyNames)
// }
$scope.vendorNames=function () {

 
  $http.get('/vendorNames').success(function(response){
        $scope.vendorNames=response;

        
  });
  console.log( $scope.partyNames)
}
// $scope.itemSelect11=function () {
//alert("hh")
 
  $http.get('/itemSelect').success(function(response){
        $scope.items=response;
        
  });
  console.log( $scope.partyNames)
// }
// $scope.getUom=function(){
$http.get('/uom').success(function(response){
        $scope.uom=response;
        
  });
// }
// $scope.getPct=function(){
$http.get('/ddpctOrder').success(function(response){
  console.log(response)
        $scope.pct=response;
        
  });
// }
// $scope.labCal=function(){
$http.get('/lab').success(function(response){
        $scope.lab=response;
        
  });
// }
$scope.itemSelect = function(itemname,in1) {
  //alert("ggg")
      //alert("itemSelect itemSelect "+in1+itemname)
     
       $http.get('/checkofcomboitem/'+itemname).success(function(response) { 
           
                //console.log("i got replay form confirm")
                console.log(response);
                //alert(response[0].comboItem);
                 if(response[0].comboItem == "yes"){
                      comboItemCheck = 'yes';
                      $scope.userit[in1].comboItem = 'yes';
                 }else{
                          comboItemCheck = 'no';
                          $scope.userit[in1].comboItem =  'no';
                      }
       })
                
           
     if(in1 > 0){
       $scope.userit[in1].uom = "Carats";
     }   

      for(let a=0;a<$scope.items.length;a++){
       
          if (itemname == $scope.items[a].Name){
                 // alert("$scope.items[i].Name "+$scope.items[i].Name)
                    console.log($scope.items[a].InvGroupName)
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                            console.log(response);
                            console.log(response[0].PurchaseAcc);
                             $scope.userit[in1].InvGroupName = $scope.items[a].InvGroupName;
                            $scope.userit[in1].SaleCategory = $scope.items[a].SaleCategory;
                           
            
                            console.log(lastdate)
                            if(response[0].InvGroupName =="Diamond" ){
                                $scope.userit[in1].uom = "Carats"
                              }
                           // alert(lastdate)
                            var itempuritydata = response[0].InvGroupID +","+lastdate;
                           $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                              console.log(response)
                             $scope.irate=response; 
                             $scope.userit[in1].irate = response;
                            })   
            
                    })
              break;
          }    
       
       }

  
}
       $scope.valuationPrint = function(){
        if($scope.party==undefined || $scope.party==null || $scope.party==""){
alert("Please select Party")
return;
  }
    if($scope.orderNO==undefined){
alert("Please select Order NO")
return;
  }
     if($scope.staff==undefined || $scope.staff==null|| $scope.staff==""){
alert("Please select Staff")
return;
  }
     if($scope.date==undefined){
alert("Please select Order Dt")
return;
  }
  for(let i=0;i<=$scope.userit.length-1;i++) {  
              
                   if($scope.userit[i].itemName == null || $scope.userit[i].itemName == undefined || $scope.userit[i].itemName =="" )
                   {
                      alert("Please Select Item");
                     
                       return;
                   }

                

                      if($scope.userit[i].purity == null || $scope.userit[i].purity == undefined || $scope.userit[i].purity =="")
                       {
                        alert("Please Select Purity");
                        
                        return;
                       }
                       var gwt5=parseFloat($scope.userit[i].gwt)
                     if($scope.userit[i].gwt == null || $scope.userit[i].gwt == undefined || $scope.userit[i].gwt =="" || gwt5 == NaN)
                       {
                         alert("Please Select Proper Gross Weight");
                         
                         return;
                      }
                // }


                if($scope.userit[i].gpcs == null || $scope.userit[i].gpcs == undefined || $scope.userit[i].gpcs =="" )
                  {
                      alert("Please Select Proper Gpcs");
                      return;
                      
                   }
                 if($scope.userit[i].uom == undefined  )
                  {
                     $scope.userit[i].uom = "Gms"; 
                     return;
                   }
                      if($scope.userit[i].usedate == undefined )
                  {
                    alert("Please Give Proper DueDate")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }
                  if($scope.userit[i].taxSelection == undefined || $scope.userit[i].taxSelection == null|| $scope.userit[i].taxSelection == "")
                  {
                    alert("Please Select  Tax")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }       
               
 }              
            //alert("vadskjdrfjk");
       //var ppdd=window.sessionStorage.getItem("purityName", JSON.stringify($scope.userit))
             const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $window.location.href = "orderPdf.html";

                         }, 1000);

     // $window.location.href = "pdf.html";    

       }
       $scope.allocateAlert = function(ff,tag){
        // if $scope.userit[0].initial="Received"
        //alert(ff)
       console.log($scope.use[tag].partyNames)
       console.log($scope.party)
         // $http.post('/recieveChange',$scope.use ).success(function(response){
         //     console.log(response)
         //     //$scope.use=response;
         //       })
         // $http.put('/manageChange/',$scope.use[tag] ).success(function(response){
         //     console.log(response)
         //     //$scope.use=response;
         //       })
          
//$scope.use[index].allocate=status;
   //alert("kkk"+$scope.use[index].allocate)
   
   //window.sessionStorage.setItem("carrigor",$scope.use[index].allocate)
    if (ff=="Received"){
//console.log($scope.use)
    var r = confirm("Land To Receipt Voucher?")
            if (r==true) {
//console.log($scope.use)
           $scope.transaction="Receipt Voucher"     
  $window.location="Transaction.html"
  window.sessionStorage.setItem("goToReceipt",$scope.transaction)
  console.log($scope.party)
    window.sessionStorage.setItem("getPatyName",$scope.use[tag].partyNames)
   //alert("kkk"+$scope.use[index].allocate)
    //window.sessionStorage.setItem("getIssue",$scope.transaction)
    // $http.post('/recieveChange',$scope.use ).success(function(response){
    //          console.log(response)
    //          //$scope.use=response;
    //            })
     var receiptPartyId =$scope.use[tag]._id+","+$scope.use[tag].allocate
    //var vocherPartyId= $scope.use[index] 
    console.log(receiptPartyId)
  window.sessionStorage.setItem("receiptVocherPartyId",receiptPartyId) 
  
  }

  else{
    //$scope.use[index].initial="Received";
    // $http.post('/recieveChange',$scope.use ).success(function(response){
    //          console.log(response)
    //          //$scope.use=response;
    //            })
   

  }
}

       }
      
 var lastdate = null;
$http.get('/getinventorygroupvaluenotationlast').success(function(response){
                     console.log(response);  
                     console.log(response[0].date);
                      lastdate= response[0].date         
                 });

//item purity
$scope.purityCal1=function(val,purity,itemname){
//function itemRatesCall(itemname,val) {
  //alert("purity");
  for(let a=0;a<$scope.items.length;a++){
       //alert("len"+$scope.items.length)
          if (itemname == $scope.items[a].Name){
                  //alert("$scope.items[i].Name "+$scope.items[a].Name)
                    console.log($scope.items[a].InvGroupName)
                  $http.get('/itemdetails'+$scope.items[a].InvGroupName).success(function(response){
                        

                            console.log(lastdate)
                            //alert(lastdate)
                            var itempuritydata = response[0].InvGroupID +","+lastdate;
                           $http.get('/itemPurityDetails'+itempuritydata).success(function(response){
                              console.log(response)
                             $scope.irate=response; 
                            // alert( $scope.irate.length)
                             // $scope.userit[in1].irate = response
                              $scope.userit[val].irate = response
                              $scope.purityCal(val,purity)
                            }) 
                           
                            
            
                    })
              break;
          }    
       
       }
//$scope.save(purity)
}//itemRatesCall(itemname,val)
$scope.purityCal=function(val,purity){
       // $scope.itemSelect ($scope.userit[val].itemName,val)
       //alert("purity calculation function called"+purity.Rate+purity)
       //alert($scope.userit[val].gwt);
//alert($scope.userit[val].itemName);
//itemRatesCall($scope.userit[val].itemName,val);

       for(i=0;i<$scope.irate.length;i++)
       {
          if (purity == $scope.irate[i].ValueNotation)
          {
              $scope.userit[val].rate=$scope.irate[i].Rate;
              break;
          }
        
       
       }

// }

       
        var labvar = parseFloat($scope.userit[val].labamt)
        if(labvar==NaN){
         $scope.userit[val].labval=0;
        }
        var stvar = parseFloat($scope.userit[val].stchg)
        if(stvar==NaN){
         $scope.userit[val].stval=0;
        }

    if($scope.userit[val].gwt=="" || $scope.userit[val].gwt == "NaN" || $scope.userit[val].gwt==undefined)
    {
       // alert("null value")
        $scope.userit[val].chgunt=0;
        $scope.userit[val].ntwt=0;
        $scope.userit[val].taxval=0;
        $scope.userit[val].taxamt=0;
        $scope.userit[val].final=0;
        $scope.newwas(val,pctcal);
    }
   /* else if($scope.userit[$index].wastage!=null && $scope.userit[$index].gwt!=null)
{
    alert("not null wastage value")
    $scope.newwas($index,pctcal);

}*/
    else 
    {
        //alert("null value")
      //26/4  var gwt=$scope.userit[$index].gwt;
   //   $scope.userit[$index].gwt = 3;//added 26/4
      console.log($scope.userit[val].gwt)//added 26/4
        var gwt=$scope.userit[val].gwt;
        //alert(gwt);
   
    $scope.userit[val].ntwt=$scope.userit[val].gwt;
    if($scope.userit[val].stwt!=null)
    {
      $scope.userit[val].ntwt=$scope.userit[val].ntwt-parseFloat($scope.userit[val].stwt);
    }
    $scope.userit[val].chgunt=$scope.userit[val].ntwt;
    //alert("here is index"+$scope.userit[$index].chgunt)
    //
    //$scope.newwas($index,pctcal);
 
    $scope.userit[val].taxval=parseFloat($scope.userit[val].chgunt*$scope.userit[val].rate).toFixed($scope.rupeesDecimalPoints)
   
    console.log( $scope.userit[val].taxval);
   // alert( $scope.userit[val].taxval);
    // if($scope.userit[val].taxval == "NaN"){
    //  // alert("inside a string"+ $scope.userit[val].taxval);
    //   $scope.userit[val].taxval = 0;
    // }
    // $scope.userit[val].taxamt=$scope.userit[val].taxval/100;
    // $scope.userit[val].final=parseFloat($scope.userit[val].taxval)+parseFloat($scope.userit[val].taxamt)
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
  //$scope.save() 

}//else
} //main close



       
 
       


 $scope.addNew = function(){
   if($scope.party==undefined || $scope.party==null || $scope.party==""){
alert("Please select Party")
return;
  }
    if($scope.orderNO==undefined){
alert("Please select Order NO")
return;
  }
     if($scope.staff==undefined || $scope.staff==null|| $scope.staff==""){
alert("Please select Staff")
return;
  }
     if($scope.date==undefined){
alert("Please select Order Dt")
return;
  }
  for(let i=0;i<=$scope.userit.length-1;i++) {  
              
                   if($scope.userit[i].itemName == null || $scope.userit[i].itemName == undefined || $scope.userit[i].itemName =="" )
                   {
                      alert("Please Select Item");
                     
                       return;
                   }

                

                      if($scope.userit[i].purity == null || $scope.userit[i].purity == undefined || $scope.userit[i].purity =="")
                       {
                        alert("Please Select Purity");
                        
                        return;
                       }
                       var gwt5=parseFloat($scope.userit[i].gwt)
                     if($scope.userit[i].gwt == null || $scope.userit[i].gwt == undefined || $scope.userit[i].gwt =="" || gwt5 == NaN)
                       {
                         alert("Please Select Proper Gross Weight");
                         
                         return;
                      }
                // }


                if($scope.userit[i].gpcs == null || $scope.userit[i].gpcs == undefined || $scope.userit[i].gpcs =="" )
                  {
                      alert("Please Select Proper Gpcs");
                      return;
                      
                   }
                 if($scope.userit[i].uom == undefined  )
                  {
                     $scope.userit[i].uom = "Gms"; 
                     return;
                   }
                      if($scope.userit[i].usedate == undefined )
                  {
                    alert("Please Give Proper DueDate")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }
                  if($scope.userit[i].taxSelection == undefined || $scope.userit[i].taxSelection == null|| $scope.userit[i].taxSelection == "")
                  {
                    alert("Please Select  Tax")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }       
               
 }              
   
      window.sessionStorage.setItem("Str41",JSON.stringify($scope.userit));
          
    
    var csfdata="party";
    
     $scope.userit.push({ 

          'name':$scope.partyname,
               'purity' : "",
               'gwt': "", 
                'rate': "",
                'total': "",
                'taxval':"",
                'salesPerson':$scope.usernamedetails
                // 'matadj':$scope.totmat ,
                // 'irate':[]              
            });
//$scope.item.gwt=0;
//alert($scope.item.gwt);
  //$scope.stwt[$scope.userit.length-1]=0;
  $scope.netwtarr[$scope.userit.length-1]=0;
  $scope.chararr[$scope.userit.length-1]=0;
  $scope.wasarr[$scope.userit.length-1]=0;
  $scope.taxablearr[$scope.userit.length-1]=[0];
  $scope.taxarr[$scope.userit.length-1]=[0];
  $scope.totvalarr[$scope.userit.length-1]=[0];
 
     console.log($scope.userit);
  
        };
$scope.radiobutton=function(){
        //alert($scope.radio.state)
        
        if($scope.radio.state == "with in state"){
           $scope.radiowithinstate = "withinstate";
              //get tax value in index page

              ControllerService.getTaxwithinState().then(
                 function(response){
                 // console.log(response);
                   var duplicat = [];
                   if(response != null && response.data != null && response.data.length > 0){
                    // alert(" call in controller from factory "+response.data.length);
                     for (var i = response.data.length - 1; i >= 0; i--) {
                      // Things[i]
                      // alert(" call in controller from factory "+response.data[i]);
                        //console.log(response.data[i]);
                        duplicat.push({
              'aliasname':response.data[i].aliasname,
              'taxname':response.data[i].taxname
            });
                       // console.log(duplicat)

                     }//for
                     //for checking duplicates in object and removes
          function arrUnique(arr) {
               var cleaned = [];
               duplicat.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
     // console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      //console.log(uniqueStandards)
      //console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
                  
                    }
                   //rowData = getRowDataFromArray(response);
                    //ctrl.gridOptions.api.setRowData(rowData);
                }, 
                // function(response){
                    
                // }
            );
             
           // $http.get('/gettaxwithinstate').success(function(response){
           //                  interest1 = response[0].Rate
           //                  interest2 = response[1].Rate
              
           // });

        }else{

                 $scope.radiowithinstate = "outofstate";
                  ControllerService.getTaxOutState().then(function(response){
                        //console.log(response);
                            var duplicat = [];
                   if(response != null && response.data != null && response.data.length > 0){
                    // alert(" call in controller from factory "+response.data.length);
                     for (var i = response.data.length - 1; i >= 0; i--) {
                      // Things[i]
                      // alert(" call in controller from factory "+response.data[i]);
                        //console.log(response.data[i]);
                        duplicat.push({
              'aliasname':response.data[i].aliasname,
              'taxname':response.data[i].taxname
            });
                        //console.log(duplicat)

                     }//for
                     function arrUnique(arr) {
               var cleaned = [];
               duplicat.forEach(function(itm) {
               var unique = true;
               cleaned.forEach(function(itm2) {
               if (_.isEqual(itm, itm2)) unique = false;
                });
               if (unique)  cleaned.push(itm);
                });
               return cleaned;
          }
      //console.log(duplicat.length);
      var uniqueStandards = arrUnique(duplicat);
      //console.log(uniqueStandards)
      //console.log(uniqueStandards.length)
      $scope.withinstat = uniqueStandards;
      duplicat = []
                  
                    }
                  })
                     //get tax value in index page
                 // $http.get('/gettaxoutofstate').success(function(response){
                 //          // $scope.outofstateigst = response[0].Rate
                 //          interest3 = response[0].Rate
                 // });
             }
     

} 
$scope.radiobutton();
$scope.removeChecked = function(index) {

  $scope.userit[index].index = index;
 // alert(" $scope.userit[index].index "+ $scope.userit[index].index);

}
$scope.taxSelectionCall = function ($index,taxSelection,call) {
  //alert("jj")
 if (taxSelection != undefined) {
      // alert("$index "+$index+" taxSelection "+taxSelection+" call "+call);
  

   $http.get('/taxSelectionWithinstate',{params:{"taxSelection":taxSelection}}).success(function(response){
                      console.log(response);
    
                   
                      if (response[0].withinstate == "yes") {
                         // alert(" tax length "+response.length)
                          interest1 = response[0].Rate;
                          interest2 = response[1].Rate;
                          // alert(" with in "+ interest1);
                      }else if (response[0].withinstate == "no") {
                           interest3 = response[0].Rate;
                           //alert(" with in out of  "+ interest3);
                      }

                            
                        //    alert( interest1 +" "+ interest2);
                        indexvalue = $index;
                     //  if(call != "taxamtcal"){
                       taxamtcal(indexvalue);
                        
                        // $scope.getTotTaxVal();
                         // $scope.getTotTaxAmt();
                         // $scope.getTotTaxValDynamic();
                         // $scope.getFinalVal();
                         // $scope.getTotNetAmt();  
                         //saleInvoiceCalculations(true);
                  //   }//if call  
           });

  }//if taxa
}
$http.get("/ordertype").success(function(response){
  console.log(response);
  $scope.ordertype=response;
  console.log($scope.ordertype)

})
$http.get("/orderName").success(function(response){
  console.log(response);
  $scope.orderName=response;
  console.log($scope.ordertype)

})
$scope.orderdetail=function(partyname123){
  console.log(partyname123)
  var prtys=partyname123;
 $http.get('/orders'+prtys).success(function(response){
      console.log(response);
      $scope.userit=response;

               
                  });
}


//taxval
$scope.totalVal=0;

var taxamtcal = function($index){
 
     //alert("kk")
                                 
        if($scope.userit[$index].labval== undefined || $scope.userit[$index].labval==""){
               $scope.userit[$index].labval = 0 
         }

         if($scope.userit[$index].stval == undefined ||$scope.userit[$index].stval == ""){
               $scope.userit[$index].stval = 0 
         }

         
    
                 
         //labour tax reason
          if($scope.LabourTax == "Yes"){
             if ($scope.userit[$index].mrpCheck == true) {
                   
                          var calcu = ($scope.userit[$index].mrp * $scope.userit[$index].gpcs).toFixed($scope.rupeesDecimalPoints);
                         
                    }else{
                           var calcu = (($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseInt ($scope.userit[$index].stval)).toFixed($scope.rupeesDecimalPoints)
                       }
         }else{  
                 
                    if ($scope.userit[$index].mrp != undefined) {
                   
                          var calcu = ($scope.userit[$index].mrp).toFixed($scope.rupeesDecimalPoints);
                         
                    }else{
                       
                         var calcu = (($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseInt ($scope.userit[$index].labval)+parseInt ($scope.userit[$index].stval)).toFixed($scope.rupeesDecimalPoints);
                         //alert("jjj")
                         if (calcu == NaN) {
                              calcu = 0;
                              //alert(calcu)
                         };

                       }
               }
           // if($scope.transaction == "Regular Sale" ||$scope.transaction == "RD Purchase" ){
               // if($scope.transaction != "Urd Purchase" ){
            
                if($scope.radiowithinstate == "withinstate"){
                   // alert(" withinstate call ")
                   //var cgst1 = parseFloat((calcu*interest1)/100).toFixed(fixdec)
                     
                    $scope.userit[$index].withinstatecgst = parseFloat((calcu*interest1)/100).toFixed($scope.rupeesDecimalPoints)
                 
                    $scope.userit[$index].withinstatesgst =parseFloat((calcu*interest2)/100).toFixed($scope.rupeesDecimalPoints)
                   
                    $scope.userit[$index].taxamt = parseFloat($scope.userit[$index].withinstatecgst) +parseFloat($scope.userit[$index].withinstatesgst)
                    $scope.userit[$index].taxamt = ($scope.userit[$index].taxamt).toFixed($scope.rupeesDecimalPoints)
                    //alert("$scope.userit[$index].taxamt "+$scope.userit[$index].taxamt)
  $scope.userit[$index].final = (parseFloat($scope.userit[$index].taxamt) + parseFloat(calcu)).toFixed($scope.rupeesDecimalPoints)
                    // saleInvoiceCalculations(true);
              console.log($scope.userit[$index].final);
//$scope.userit[$index].final =parseFloat($scope.userit[$index].taxval)+parseFloat($scope.userit[$index].taxamt)
              $scope.totalVal+=parseFloat($scope.userit[$index].final);
                }else{
                  //alert("jj")
                  //$scope.userit[$index].final =$scope.userit[$index].final  
                            $scope.userit[$index].outofstateigst =((calcu*interest3)/100).toFixed($scope.rupeesDecimalPoints);
                     $scope.userit[$index].taxamt =  parseFloat($scope.userit[$index].outofstateigst);
                     $scope.userit[$index].taxamt = ($scope.userit[$index].taxamt).toFixed($scope.rupeesDecimalPoints);
                      $scope.userit[$index].final = (parseFloat($scope.userit[$index].taxamt) + parseFloat(calcu)).toFixed($scope.rupeesDecimalPoints)
                      saleInvoiceCalculations(true);
                    }
           // }
        //    else if($scope.transaction == "Urd Purchase"){
        //             $scope.userit[$index].taxamt = 0;
        //             $scope.userit[$index].final = calcu;
        //             //saleInvoiceCalculations(true);
        //             //alert( $scope.userit[$index].final);
        //            }
//$scope.userit[$index].final = parseFloat($scope.userit[$index].taxval) .toFixed($scope.rupeesDecimalPoints)        // // }, 10);//const
}


$scope.rateChange=function($index){
  //alert("jj")
  //alert(" iam rate change "+ $scope.userit[$index].rate)
                        
                       if( $scope.userit[$index].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas($index,$scope.userit[$index].pctcal)
                                    
                               }
                            if( $scope.userit[$index].labcal!= undefined){
                                 $scope.newlab($index,$scope.userit[$index].labcal)
                            } 
                            if( $scope.userit[$index].stonecal!= undefined){
                               $scope.newstchg($index,$scope.userit[$index].stonecal)
                            } 
                             if( $scope.userit[$index].pctcal== undefined){
                             // alert($scope.userit[0].pctcal)
                             $scope.newstwt($index)      
                              }
                           

   

}
function saleInvoiceCalculations(changeCall) {
// alert("jai ganesh jai ganesh");
//alert(changeCall)
                  if (changeCall != true) {
                         $scope.getTotTaxVal();
                         $scope.getTotTaxAmt();
                       //  $scope.getTotTaxValDynamic();
                         $scope.getFinalVal();
                         $scope.getTotNetAmt(); 
                  }else{
                        // alert(" true call check it")
                         //$scope.getTotTaxVal();
                         $scope.getTotTaxAmt();
                         $scope.getTotTaxValDynamic();
                         $scope.getFinalVal();
                         $scope.getTotNetAmt(); 
                  }   
                // } 
}//saleInvoiceCalculations
$scope.dropDownCalls =function($index,values){
  if (values == "stwt" || values == "gwt") {
         if( $scope.userit[$index].pctcal!= undefined){
              $scope.newwas($index,$scope.userit[$index].pctcal)
          } 
        if( $scope.userit[$index].labcal!= undefined){
              $scope.newlab($index,$scope.userit[$index].labcal)
          } 
        if( $scope.userit[$index].stonecal!= undefined){
              $scope.newstchg($index,$scope.userit[$index].stonecal)
          }  
    }else if(values == "pctcal"){
      //alert(" pct cal")
          if( $scope.userit[$index].labcal!= undefined){
            $scope.newlab($index,$scope.userit[$index].labcal)
          } 
          if( $scope.userit[$index].stonecal!= undefined){
            $scope.newstchg($index,$scope.userit[$index].stonecal)
          }
    }

   // saleInvoiceCalculations();
}//dropDownCalls

$scope.uomConversion=function($index,uom){
 // alert("uom call"+uom)

  if(uom == "Carats"){
    checkRepeat = true;
    $scope.userit[$index].uomValue = 0.2;


    // alert("carata"+typeof( $scope.userit[$index].uom) )
  }else if(uom == "Gms" || uom == undefined){
   // alert("gms")
  checkRepeat = true;
   $scope.userit[$index].uomValue = 1;
   //alert("$scope.uomConversion "+parseFloat($scope.userit[$index].uomValue));


  }

if(checkRepeat == true){
  $scope.newstwt($index)
}

   if( $scope.userit[$index].pctcal!= undefined){
                             // alert($scope.userit[0].pctcal)
                              $scope.newwas($index,$scope.userit[$index].pctcal)
                                    
                               }
                            if( $scope.userit[$index].labcal!= undefined){
                                 $scope.newlab($index,$scope.userit[$index].labcal)
                            } 
                            if( $scope.userit[$index].stonecal!= undefined){
                               $scope.newstchg($index,$scope.userit[$index].stonecal)
                            } 
                             

}

$scope.newgwt=function($index,pctcal)
{  
  //$scope.totalVal+=parseFloat($scope.userit[$index].final);
  //alert($index)
    //for index specifing
    //  alert(wttolerance) calMrpValue($index)
    indexvalue = $index
    $scope.uomConversion($index,$scope.userit[$index].uom)
    console.log("i got call")
  
    //console.log($scope.userit[0].gwt)

    //alert($scope.userit[$index].gwt)
    //decimal point validation
   
    
    if($scope.userit[$index].labamt==null){
         $scope.userit[$index].labval=0;
        }

        if($scope.userit[$index].stchg==null){
         $scope.userit[$index].stval=0;
        }

    if($scope.userit[$index].gwt=="")
    {
        //alert("null value")
        $scope.userit[$index].chgunt=0;
        $scope.userit[$index].ntwt=0;
        $scope.userit[$index].taxval=0;
        $scope.userit[$index].taxamt=0;
        $scope.userit[$index].final=0;
        $scope.newwas($index,pctcal);
         $scope.dropDownCalls($index,"gwt");
    }
   
    else 
    {
       
      console.log($scope.userit[$index].gwt)//added 26/4
        if ($scope.userit[$index].gwt == null) {
        $scope.userit[$index].gwt = 0;
        //alert($scope.userit[$index].gwt);
       }
        $scope.userit[$index].gwt  = (parseFloat($scope.userit[$index].gwt)).toFixed(fixdec);
        $scope.userit[$index].gwt  = parseFloat($scope.userit[$index].gwt)
  
   $scope.userit[$index].stwt = 0;
     $scope.userit[$index].ntwt=((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
       
      if($scope.userit[$index].stwt!=null)
    {
      
       $scope.userit[$index].ntwt=((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
     }
    $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
    $scope.userit[$index].taxval=($scope.userit[$index].chgunt*$scope.userit[$index].rate).toFixed(2);
    //$scope.userit[$index].final=$scope.userit[$index].taxval
    //
    // if( $scope.userit[$index].pctcal!= undefined){
    //       $scope.newwas($index,$scope.userit[$index].pctcal)
    //   } 
    // if( $scope.userit[$index].labcal!= undefined){
    //       $scope.newlab($index,$scope.userit[$index].labcal)
    //   } 
    // if( $scope.userit[$index].stonecal!= undefined){
    //       $scope.newstchg($index,$scope.userit[$index].stonecal)
    //   }
    //
    //saleInvoiceCalculations();
    $scope.dropDownCalls($index,"gwt");


}

/*else {
    
}*/
}

$scope.newstwt=function($index)
{
   //alert(($scope.userit[$index].stwt))
    indexvalue = $index;
    if(checkRepeat == false){
      $scope.uomConversion($index,$scope.userit[$index].uom) 
    }
   
   console.log($scope.userit[$index].stwt)
  
    // if($scope.userit[$index].stwt == undefined ||$scope.userit[$index].stwt ==  NaN||$scope.userit[$index].stwt == null){
    //   parseFloat($scope.userit[$index].stwt) = 0;
    //   alert("Nan or undefined");
       
    // }
    if($scope.userit[$index].stwt == undefined){
      // ($scope.userit[$index].stwt) = "";
      // if($scope.userit[$index].stwt ==""){
       // alert("$scope.userit[$index].stwt == undefined")
      // }
      // $scope.userit[$index].stwt = 0 
       $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)*parseFloat($scope.userit[$index].uomValue)).toFixed(fixdec);
       $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
        $scope.dropDownCalls($index,"stwt");
        // $scope.userit[$index].chgunt=$scope.userit[$index].chgunt.toFixed(fixdec)
       
        //alert("Null or undefined"+$scope.userit[$index].chgunt);
    }else{
      // $scope.userit[$index].stwt =( $scope.userit[$index].stwt).toFixed(fixdec);
      $scope.userit[$index].stwt = parseFloat ($scope.userit[$index].stwt) ;
   
       $scope.userit[$index].ntwt=(((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue))).toFixed(fixdec);
         $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
    }
   // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
   // $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);
        
    $scope.userit[$index].taxval1 = parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate);
    $scope.userit[$index].taxval = parseFloat($scope.userit[$index].taxval1).toFixed(2);
    
    //saleInvoiceCalculations();
    $scope.dropDownCalls($index,"stwt");

 }

  $scope.gpcsDecimals = function($index){
   $scope.userit[$index].gpcs  = (parseFloat($scope.userit[$index].gpcs)).toFixed(0);
   $scope.userit[$index].gpcs = parseFloat($scope.userit[$index].gpcs)
   // alert($scope.userit[$index].itemName);
   // if ( $scope.disableMrp[$index] == true) {
   //      $scope.mrpCal($index, $scope.userit[$index].mrp);
   //  }
   
 }
 $scope.newwas=function($index,pctcal){
  // alert($index+"index")
  // alert(pctcal+"pct")
   indexvalue = $index ;
  if(pctcal == undefined ||pctcal == "undefined" || pctcal == null || pctcal == ''){
   // alert("Please select pct");
     $scope.userit[$index].wastage = 0;
  }else{
  // alert(pctcal)
    if($scope.userit[$index].wastage==null || $scope.userit[$index].wastage=="" || $scope.userit[$index].wastage== undefined){
        
      
        // var ntwtFixed =  ($scope.userit[$index].ntwt).toFixed(fixdec);
         $scope.userit[$index].chgunt= ($scope.userit[$index].ntwt) ;
         //  alert("wasragerer "+  $scope.userit[$index].chgunt);
    }
    //  else {
    //      // alert("else "+$scope.userit[$index].wastage);
    //    $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
    //    $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
    // }

  else  if(pctcal=="AddPercent")
    {
        //alert(pctcal);
        // $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
        var wastage=(($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100).toFixed(fixdec);
        //alert($scope.userit[$index].wastage);
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        //alert($scope.userit[$index].chgunt);
        $scope.dropDownCalls($index,"pctcal");
    }
    else if(pctcal=="Add Units")
    {
        // $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
        var wastage=$scope.userit[$index].wastage;
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        $scope.dropDownCalls($index,"pctcal");
    }
    else if(pctcal=="SubPercent")
    {
      $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   

       var wastage=($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100;
        //alert($scope.userit[$index].wastage);
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
       $scope.dropDownCalls($index,"pctcal");
    }
    else
    {
       var wastage=$scope.userit[$index].wastage;
       $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)-parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
      $scope.dropDownCalls($index,"pctcal");
    }
    //alert($scope.totmat);
     
     //alert($scope.userit[$index].chgunt);
     if($scope.userit[$index].chgunt<0)
     {
        //alert("less than 0");
        $scope.userit[$index].chgunt=0;
        $scope.userit[$index].matadj=parseFloat($scope.userit[$index].ntwt)+parseFloat($scope.userit[$index].wastage);
        $scope.totmat=$scope.totmat-$scope.userit[$index].matadj;

        $scope.userit[$index].taxval1=$scope.userit[$index].chgunt*$scope.userit[$index].rate;
        $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        //alert($scope.userit[$index].taxval)
        window.sessionStorage.setItem("taxv",$scope.userit[$index].taxval)
        
         //saleInvoiceCalculations();

     }
     //alert($scope.userit[$index].chgunt);
    //alert($scope.userit[$index].chgunt); 
     else
      {
        //alert("else")
        //alert($scope.userit[$index].chgunt);
        //alert($scope.userit[$index].rate)
         $scope.totmat=0;
         $scope.userit[$index].matadj=0;
     
        /*This holds the adjustment material balance*/
         $scope.userit[$index].taxval=$scope.userit[$index].chgunt*$scope.userit[$index].rate;
         $scope.userit[$index].taxval=$scope.userit[$index].taxval.toFixed(2);
         //alert($scope.userit[$index].taxval);
          window.sessionStorage.setItem("taxv",$scope.userit[$index].taxval)
         
      
 }
}
}
$scope.newstchg=function($index,stonecal2)
 {
     indexvalue = $index ;
    // alert("$scope.userit[$index].stchg "+$scope.userit[$index].stchg)
   if($scope.userit[$index].labamt=="" || $scope.userit[$index].labamt==undefined  || $scope.userit[$index].labamt== null) {
      
       $scope.userit[$index].labval=0;
    }
    

    if($scope.userit[$index].stchg == "" ||$scope.userit[$index].stchg == null ||$scope.userit[$index].stchg==undefined ){
        $scope.userit[$index].stval = 0;
  
    }
     else 
     {
        // $scope.userit[$index].stval = 0;

    $scope.userit[$index].stchg =( $scope.userit[$index].stchg).toFixed(fixdec);
    $scope.userit[$index].stchg = parseFloat ($scope.userit[$index].stchg) ;
    
        
    }
     if(stonecal2=="Percent")
    {
         //
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
       // alert(addstone);
       
       if($scope.userit[$index].stchg != null){
        var stval1=(addstone*$scope.userit[$index].stchg)/100;
        $scope.userit[$index].stval= stval1.toFixed($scope.rupeesDecimalPoints);
            }
         
        if($scope.LabourTax == "No"){

             $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        
         }else{
                   
             $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval);
             $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
        
         }
    }
    else if(stonecal2=="PerUnit")
    {
       
        var addstone=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].stchg != null){
        var addstone1=$scope.userit[$index].chgunt*$scope.userit[$index].stchg;        
            $scope.userit[$index].stval=(parseFloat(addstone1)).toFixed($scope.rupeesDecimalPoints);
         }
        if($scope.LabourTax == "No"){
            $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval)+parseFloat($scope.userit[$index].labval);
            $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
         
         }else{
            $scope.userit[$index].taxval1=addstone+parseFloat($scope.userit[$index].stval);
            $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);
         
         }
    }
    else if(stonecal2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        
        if($scope.userit[$index].stchg != null){
        $scope.userit[$index].stval=($scope.userit[$index].stchg).toFixed($scope.rupeesDecimalPoints);
        }
        if($scope.LabourTax == "No"){
           $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
           $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
        
         }else{

                 $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed(2);   
         }
     }

       
        //saleInvoiceCalculations();
  
 }

$scope.mrpCal=function($index)
{
  //alert( "mrp "+$scope.userit[$index].mrp)
    //alert("hi mrp");
    //alert($scope.userit[$index].mrp)
    indexvalue = $index ;
      $scope.indexValueDisable = $index;
    // $scope.disableMrp[$index] =true;
   $scope.userit[$index].mrpCheck =true;
  // $scope.userit[$index].purity ="";
  // $scope.userit[$index].stwt ="";
  // $scope.userit[$index].uom ="";
  // $scope.userit[$index].ntwt ="";
  // $scope.userit[$index].pctcal ="";
  // $scope.userit[$index].wastage ="";
  // $scope.userit[$index].matadj ="";
  // $scope.userit[$index].chgunt ="";
  // $scope.userit[$index].labcal ="";
  // $scope.userit[$index].labamt ="";
  // $scope.userit[$index].labval ="";
  // $scope.userit[$index].stonecal ="";
  // $scope.userit[$index].stchg ="";
  // $scope.userit[$index].stval="";
  // $scope.userit[$index].rate = "";

//alert("Please Select GrossPcs "+);
 //  if ($scope.userit[$index].gpcs == undefined) {
 //  // alert("$scope.userit[index].gpcs "+$scope.userit[index].gpcs);
 //   alert("Please Select GrossPcs ");
 //   $scope.userit[$index].mrp = "";
 // }else{

    if ($scope.userit[$index].mrp == undefined || $scope.userit[$index].mrp == ''|| $scope.userit[$index].mrp == null) {
         
          $scope.indexValueDisable = 100;
           $scope.newgwt($index);
           $scope.newstwt($index);
            // if( $scope.userit[$index].pctcal!= undefined){
            //                  // alert($scope.userit[0].pctcal)
            // $scope.newwas($index,$scope.userit[$index].pctcal)
                  
            //  }
          if( $scope.userit[$index].labcal!= undefined){
               $scope.newlab($index,$scope.userit[$index].labcal)
          } 
          if( $scope.userit[$index].stonecal!= undefined){
             $scope.newstchg($index,$scope.userit[$index].stonecal)
          }
            //saleInvoiceCalculations();
           // saleInvoiceCalculations(true);
        }else{
     $scope.userit[$index].taxval=$scope.userit[$index].mrp;
    $scope.userit[$index].taxval=$scope.userit[$index].taxval.toFixed(2);
   // alert( $scope.userit[$index].taxval)
    //$scope.labourTax();
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    //saleInvoiceCalculations();

 }
  


  
}
$scope.newlab = function($index,labval2)
 {
     //alert( "LabourTax" );
       indexvalue = $index;
    
     if($scope.userit[$index].stchg == "" ||$scope.userit[$index].stchg == null ||$scope.userit[$index].stchg==undefined ){
            $scope.userit[$index].stval = 0;
        }
     
     if($scope.userit[$index].labamt=="" || $scope.userit[$index].labamt==undefined  || $scope.userit[$index].labamt== null) {
          // alert("space")
           $scope.userit[$index].labval = 0;
       }
     else {
        //alert("==undefined")
        // $scope.userit[$index].labval = 0;
         $scope.userit[$index].labamt = Number( $scope.userit[$index].labamt).toFixed($scope.rupeesDecimalPoints);
        $scope.userit[$index].labamt = parseFloat ($scope.userit[$index].labamt) ;
   
       
       }

   if(labval2=="Percent")
    {
        //alert(labval)
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate));
        if($scope.userit[$index].labamt != null){
               var labval1=(addlab*$scope.userit[$index].labamt)/100;
               $scope.userit[$index].labval= labval1.toFixed($scope.rupeesDecimalPoints);
            }
         if($scope.LabourTax == "No"){   
                 $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
            }
            // else
            // {
            //      $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
            // }

    }
    else if(labval2=="PerUnit")
    {
        //alert(labval);
        var addlab=(($scope.userit[$index].chgunt*$scope.userit[$index].rate))
        
        if($scope.userit[$index].labamt != null){
        var addlab1=$scope.userit[$index].chgunt*$scope.userit[$index].labamt;        
            $scope.userit[$index].labval=(parseFloat(addlab1)).toFixed($scope.rupeesDecimalPoints)
         }
         if($scope.LabourTax == "No"){
                 $scope.userit[$index].taxval1=addlab+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                 $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
         }else{
            $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
         
         }
    }
    else if(labval2=="Amount")
    {
        console.log($scope.userit[$index].stval)
        console.log($scope.userit[$index].labval)
        if($scope.userit[$index].labamt != null){
        $scope.userit[$index].labval=($scope.userit[$index].labamt).toFixed($scope.rupeesDecimalPoints);
        }
        if($scope.LabourTax == "No"){
                $scope.userit[$index].taxval1=($scope.userit[$index].chgunt*$scope.userit[$index].rate)+parseFloat($scope.userit[$index].labval)+parseFloat($scope.userit[$index].stval);
                $scope.userit[$index].taxval=$scope.userit[$index].taxval1.toFixed($scope.rupeesDecimalPoints);
        }else{
           $scope.userit[$index].labourTaxValue = (($scope.userit[$index].labval*labourTaxInterest)/100).toFixed($scope.rupeesDecimalPoints);
         
        }

    }
    // $scope.labourTax();
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    // alert("sale return 2 row hhhhh");
    //saleInvoiceCalculations();
    
} 
$scope.rateCheck=0;
$scope.rateFixed=function(index){
  //alert("ff"+index);
  if (index==1) {
    //$scope. = true

  } 

  else {
    //$scope.all = false
  } 

}
var callSave =function(){
  //alert("kk")
  //flagCall()
   $http.put('/insertbill'+$scope.BillNos).success(function(response){
            console.log(response);
          })




  //alert($scope.userit.length)
  for(var t=0;t<$scope.userit.length;t++){
  $scope.userit[t].date=$scope.date
  $scope.userit[t].saleNames=$scope.staff
  $scope.userit[t].orderNO=$scope.orderNO
  $scope.userit[t].partyNames =$scope.party;
   $scope.userit[t].totalVal=$scope.totalVal;
    $scope.userit[t].remarks=$scope.remarks;
     $scope.userit[t].rateFixed=$scope.rateCheck;
if($scope.updateOrder!="updateData")
{
  //alert("nots")
  console.log($scope.userit[t])
     $http.post('/savingdata',$scope.userit[t]).success(function(response){
             console.log(response)
             //partyNameId=response[0]._id
               })
     
 
 //$scope.date="";
 
console.log(data)
}

//var data=$scope.userit[0]._id+","+$scope.orderNO+","+$scope.userit[0].gwt
else if($scope.updateOrder=="updateData")
{
  //alert("sucee")
   var data =$scope.userit[t].date+","+$scope.userit[t].usedate+","+$scope.userit[t].saleNames+","+$scope.userit[t].orderNO+","+$scope.userit[t].partyNames+","+$scope.userit[t].desc+","
                     +$scope.userit[t].size+","+$scope.userit[t].gpcs+","+$scope.userit[t].gwt+","+$scope.userit[t].itemName+","+$scope.userit[t].ntwt+","
                     +$scope.userit[t].purity+","+$scope.userit[t].taxval+","+$scope.userit[t].taxamt+","+$scope.userit[t].stwt+","+$scope.userit[t].wastage+","+$scope.userit[t].stval+","
                     +$scope.userit[t].uom +","+ $scope.userit[t]._id +","
                     +$scope.userit[t].pctcal+","+$scope.userit[t].chgunt +","
                     + $scope.userit[t].outofstateigst+","+$scope.userit[t].mrp+","+$scope.userit[t].stchg+","+$scope.userit[t].stonecal+","
                     +$scope.userit[t].labamt +","+$scope.userit[t].taxSelection +","+$scope.userit[t].withinstatecgst+","+$scope.userit[t].withinstatesgst   +","+$scope.userit[t].final  +","+ $scope.userit[t].rate  +","+$scope.userit[t].labval+","+$scope.userit[t].totalVal+","+$scope.userit[t].remarks  
 $http.put('/anydata/'+data).success(function(response){
             console.log(response)
            $scope.userit =response
            $scope.date=response[0].date
            $scope.orderNo=response[0].orderNo
            $scope.party=response[0].partyNames
                $scope.staff=response[0].saleNames
                $scope.totalVal=response[0].totalVal
                 $scope.remarks=response[0].remarks
              })

  
  }

  //$scope.userit[t]=""; 
           
      }
 console.log($scope.userit[0])

 // $scope.staff="";
 // $scope.rateCheck="";
 // $scope.remarks="";   
 // $scope.totalVal="";
 // $scope.party="";
 // $scope.orderNO="";
  window.location.reload()
            
 }
  $scope.save = function(rate){
    //alert(rate)
    //rate
      if($scope.party==undefined || $scope.party==null || $scope.party==""){
alert("Please select Party")
return;
  }
    if($scope.orderNO==undefined){
alert("Please select Order NO")
return;
  }
     if($scope.staff==undefined || $scope.staff==null|| $scope.staff==""){
alert("Please select Staff")
return;
  }
     if($scope.date==undefined){
alert("Please select Order Dt")
return;
  }
  for(let i=0;i<=$scope.userit.length-1;i++) {  
              
                   if($scope.userit[i].itemName == null || $scope.userit[i].itemName == undefined || $scope.userit[i].itemName =="" )
                   {
                      alert("Please Select Item");
                     
                       return;
                   }

                

                      if($scope.userit[i].purity == null || $scope.userit[i].purity == undefined || $scope.userit[i].purity =="")
                       {
                        alert("Please Select Purity");
                        
                        return;
                       }
                       var gwt5=parseFloat($scope.userit[i].gwt)
                     if($scope.userit[i].gwt == null || $scope.userit[i].gwt == undefined || $scope.userit[i].gwt =="" || gwt5 == NaN)
                       {
                         alert("Please Select Proper Gross Weight");
                         
                         return;
                      }
                // }


                if($scope.userit[i].gpcs == null || $scope.userit[i].gpcs == undefined || $scope.userit[i].gpcs =="" )
                  {
                      alert("Please Select Proper Gpcs");
                      return;
                      
                   }
            
                      if($scope.userit[i].usedate == undefined )
                  {
                    alert("Please Give Proper DueDate")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }
                  if($scope.userit[i].taxSelection == undefined || $scope.userit[i].taxSelection == null|| $scope.userit[i].taxSelection == "")
                  {
                    alert("Please Select  Tax")
                     //$scope.userit[i].uom = "Gms"; 
                     return;
                   }       
  

  }
  
  var r = confirm("Amount Advance")
            if (r==true) {

            }
            
            var f = confirm("Material Advance")
            if (f==true) {

       $scope.transaction="Receipt Voucher"       
    $scope.mylink = "Transaction.html";
//alert()
    window.sessionStorage.setItem("orderGetReceipt",$scope.transaction)
    window.sessionStorage.setItem("getPatyName",$scope.party)
     window.sessionStorage.setItem("getOrderNo",$scope.orderNO)
//window.sessionStorage.setItem("purityName", JSON.stringify($scope.userit))
//window.sessionStorage.setItem("rate",rate)


            }
          
 callSave()              
 }              
  // var   callSave=function(){
  //   //alert("KK")
  // }              



 
 $scope.indexSelected=[];
$scope.check=0;
$scope.indexFunctionCall=function(index,vname) {

    $scope.j=index;
     // alert(index+"index");
     //  alert(vname+"vname");
           if ($scope.indexSelected.indexOf(index) == -1){
                $scope.indexSelected.push(index);
                // alert(index+"pushed index");
            }
                     if($scope.transaction == "Sale Return" || $scope.transaction == "Purchase Return"
                      ||$scope.transaction == 'Approval Sale'||$scope.transaction=='Approval Return'){
                  
                           $scope.mycheck(index,vname);
                      }
         console.log($scope.indexSelected)

}
$scope.removeSelectedRows = function() {
  var a =0;
   $scope.userit1 = [];
    if (0 == $scope.userit.length) {
                       // do stuff
        alert("Please Fill Necessary Details");
        return;
      }
      else if($scope.indexSelected=="" ||$scope.indexSelected==undefined||$scope.indexSelected==null){
        alert("Please Select Checkbox")

      }
      else{

    var r = confirm("Are you sure you want to delete this ?")
            if (r==true) {
                
  // alert(" got call  $scope.userit.length "+ $scope.userit.length);
           for(let i=0;i<=$scope.userit.length-1;i++){ 
              //Things[i]
               // alert("in for");
              
               // alert(" $scope.userit[index] "+$scope.userit[i].index);
              if ($scope.userit[i].index != undefined) {
                         // alert(" iam hsdfsdf undefine unsaved "+ $scope.userit[i].index);
                      console.log($scope.userit[i]);
                      var udelete=$scope.userit[i]._id;
                       // if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"
                       //  &&$scope.transaction!="Approval Out"){
                      $http.delete('/ordersdelete/'+udelete).success(function(response)
                        {
                          console.log(response);
                        });
                       // }
                    
               }
               else{
                         //alert("saved");
                       console.log($scope.userit[i]);
                 
                       // saleInvoiceCalculations();
                       $scope.userit1[a] = $scope.userit[i];
                       a++;
                        console.log($scope.userit1);
              }
              if (($scope.userit.length-1) == i) {
                      $scope.userit = $scope.userit1
              }
              // if($scope.transaction!="Issue Voucher"&&$scope.transaction!="Receipt Voucher"&&$scope.transaction!="Approval Out"){
              //  if($scope.userit.length != 0){
              //   // alert("in if");
              //   // alert(r);
              //             indexvalue=0;
              //             saleInvoiceCalculations();
              //   $scope.saleinv[0].status="In Progress"
              //   $scope.saleinv[0].partyname=$scope.partyname;
        
              // var update=$scope.saleinv[0]._id+","+$scope.saleinv[0].partyname+","+$scope.saleinv[0].taxableval+","+$scope.saleinv[0].tax+","+$scope.saleinv[0].subtol
              //    +","+$scope.saleinv[0].adj+","+$scope.saleinv[0].labourValue+","+$scope.saleinv[0].labourtax+","+ $scope.saleinv[0].status+","+ $scope.saleinv[0].dis
              //    +","+$scope.saleinv[0].char+","+$scope.saleinv[0].netamt+","+$scope.saleinv[0].invoiceValue+","+$scope.decimals;
              //    console.log(update);
              //    $http.put('/saleinvoicedata12/'+update).success(function(response){
              //     // alert("sale invoice");
              //     console.log(response);
              //     // $scope.getDetails(r);
              //            })
              //           }
              //           else{
              //                   // alert("else");
              //                   $scope.saleinv[0].taxableval = 0;
              //                   $scope.saleinv[0].netamt = 0;
              //                   $scope.saleinv[0].invoiceValue = 0;
              //                   $scope.saleinv[0].tax=0;
              //                   $scope.saleinv[0].subtol = 0;
              //                    if($scope.saleinv[0]._id != null){
              //                     // alert("after save"+$scope.saleinv[0]._id);
              //                     $http.delete('/deleteinprogress'+$scope.saleinv[0]._id ).success(function(response){
              //                       console.log(response);
              //                     })
              //                    }
                                // $scope.getDetails(r);
                           }
                         }
            }//for
      
          
       
}//trial
//alert($scope.ordername)
// $scope.dateSearch=function(){
//   // alert(prtys)
//     //$scope.dateSearch(prtys);
//     // if ($scope.datefrom == null || $scope.datefrom == undefined && $scope.dateto == null || $scope.dateto == undefined  ) {
//     //   alert("Please Select Date")
//     // }
        
//     //     $http.get('/dateFind',{params:{"Barcode":$scope.datefrom}}).success(function(response){
//     //  // $scope.ddata=response;

//     //      // alert(response.length);
//     //       if (response.length == 0) {
//     //         alert("No Match Is Found")
//     //       }
//     //   console.log(response);
//     //   $scope.batch=response;
//     // })
//     // }
//     // else{

//      //   //for date search
//      //   console.log($scope.bit1.date2)
//      // console.log(Date.parse($scope.bit1.date2) )
//       if (Date.parse($scope.datefrom) > Date.parse($scope.dateto)) {
//             alert("Invalid Date Range!\nFrom Date cannot be after To Date!")

//         }else{
    
 

//        var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
//        var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
//              fromdate = fromdate.slice(0,10);
//              fromdate = fromdate+"T00:00:00.000Z";
//              todate= todate.slice(0,10);
//              todate = todate+"T23:59:59.999Z";
//              date= fromdate+","+todate;
//           //   alert(fromdate+" "+todate)


//       $http.get('/dateFind/'+date).success(function(response){
//      // $scope.ddata=response;
//        if (response.length == 0) {
//             alert("No Match Is Found")
//           }
//           else{
//                console.log(response);
//       $scope.use=response;

//           }
   
//     })

 
//   }
// // }//esle if 
//   }
  // $scope.ven="un allocated"
  // $scope.ord="Initial"
  //console.log($scope.userit)
  //        $http.get('/detailsManage').success(function(response){
  //            console.log(response)
  //            $scope.use=response
  //          //console.log($scope.use.allocate)
  //      //$scope.use[0].usedate = new Date(response[0].usedate )
  // //$scope.use[0].date = new Date(response[0].date )     
  //              })

  $scope.selectrow = function(tag,index){
  console.log(tag)
 //alert($scope.idData)
 $scope.initDis=tag.initial
  $scope.selectedrow = index
  //alert(allo)
  $scope.idSelectedVote = tag;
 
  //alert("tag"+tag.all)
  $http.put('/changesta', tag).success(function(response){
             console.log(response)
              //$scope.use=response;
               })
  //alert("afetr"+$scope.idData)
  if($scope.idData!=undefined){
both=tag._id+","+$scope.idData+","+tag.allocate+","+tag.initial
console.log(both)
    $http.put('/manageChange/'+both).success(function(response){
             console.log(response)
             //$scope.use=response;
             })
      }
//       else{
//          $http.put('/everyChange',tag).success(function(response){
//              console.log(response)
//              //$scope.use=response;
//              })
//       }
  
}
// function allorow() {
//   console.log(tag)
//  alert("allo")
//   $scope.selectedrow = index
  
//   $scope.idSelectedVote = tag;
//   // $http.put('/changesta', daboth).success(function(response){
//  //             console.log(response)
//  //             //$scope.use=response;
//  //               })
   
    
//      //$scope.manage(tag)
// }
//data =$scope.use[i].barcodeNumber
 
//$scope.idSelectedVote=null
 ///console.log($scope.idSelectedVote)
// console.log($scope.itial)
// var daboth= $scope.selectedrow+","+$scope.itial
// console.log(daboth)
 // $http.put('/changesta', daboth).success(function(response){
 //             console.log(response)
 //             //$scope.use=response;
 //               })
 
// $scope.gotoorders=function() {
//   //alert(data)
  
//    // var id= $scope.idSelected._id
//    // console.log(id)
//    //alert( $scope.dataselect)
   

// $http.get('/goorders',{params:{"id":$scope.idSelected._id}}).success(function(response){
//              console.log(response)

//                $scope.userit=response;

//              // console.log($scope.userit)
//                })
//     $scope.orderpage = "orderCustomer.html";
 
//  }




$scope.removeItem = function(tag){
 //alert("kk")
  //$scope.test = 'display'
  if($scope.selectedrow == null ){
    alert("Please select item");
  }else{
              var r = confirm("Are you sure you want to delete this ?")
              if (r == true) {
                
                 var del=$scope.use[tag]._id;
                  console.log(del);
                 $http.delete('/removeItem/'+del).success(function(response){
                          //refresh();
                           //$scope.item1 ="" 
                            //$scope.filterchange();

                 });
              window.location.reload();
                 // $scope.item1 =""
                 // editcheck=false 
              }}}
              $scope.removeOrder = function(tag){
 //alert(tag)
 //$scope.orderNo=$scope.use[tag].orderNo
  //alert($scope.partyNames)
  if(tag == undefined ){
    alert("Please select Order No");
  }else{
    console.log($scope.use[tag])
    $scope.orderNo=$scope.use[tag].orderNO
    //alert($scope.orderNo)
              var r = confirm("Are you sure you want to delete this ?")
              if (r == true) {
                //alert($scope.orderNo)
                 //var del=$scope.use[tag]._id;
                  //console.log(del);
                 $http.delete('/removeOrder/',{params:{"orderNO":$scope.orderNo}}).success(function(response){
                          //refresh();
                           //$scope.item1 ="" 
                            //$scope.filterchange();

                 });
              window.location.reload();
                 // $scope.item1 =""
                 // editcheck=false 
              }}}
$scope.getorder=function(manage,datefrom,dateto){
  // var man=manage;
  // var dafrom=datefrom
  // var dato=dateto
  // alert(man)
  // alert(dafrom)
  // alert(dato)
  if(manage!=undefined && datefrom==undefined && dateto==undefined)
  {
    //alert("query for ordername")
  var prtys=manage;

   $http.get('/getord'+prtys).success(function(response){
             //console.log(response)
             $scope.results=response;
             console.log($scope.results)
               })
 }

 if(manage==undefined && datefrom!=undefined && dateto!=undefined)
  {

    //alert("query for date")
        var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             both= fromdate+","+todate;
 

   $http.get('/getBothDates'+both).success(function(response){
             //console.log(response)
             $scope.results=response;
             console.log($scope.results)
               })
 }
 if(manage!=undefined && datefrom!=undefined && dateto!=undefined)
  {

    //alert("query for date and order")
        var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             both= fromdate+","+todate+","+manage;
 //alert(both)

   $http.get('/DatesOrders'+both).success(function(response){
             //console.log(response)
             $scope.results=response;
             console.log($scope.results)
               })
 }
 else if(manage==undefined && datefrom==undefined && dateto==undefined){
  alert("Please Select Mandatory Fields")
 }

 }
 //alert($scope.vendor)
//  $scope.updateAllocate=function(tag){
//   //alert("jj")
// //$scope.use[tag]
//   console.log($scope.use[tag])
//    $http.put('/updateAllocate',$scope.use[tag]).success(function(response)
//                 {
//                   console.log(response)
  

//                 })

//  }
 //alert($scope.idSelectedVote)
 $scope.manage=function(tag){
 //alert(tag)
  if( tag==undefined){
    alert("Please Select Row")
  }
  //alert($scope.use[tag].initial)
  // if ($scope.use[tag].initial=="Received") {
     // $http.post('/sschange',$scope.use[tag] ).success(function(response){
     //         console.log(response)
     //         //$scope.use=response;
     //           })
     $http.put('/changesta',$scope.use[tag] ).success(function(response){
             //console.log(response)
             //$scope.use=response;
               })
  // } else {
    // $http.put('/changesta',$scope.use[tag] ).success(function(response){
    //          //console.log(response)
    //          //$scope.use=response;
    //            })
    

  // }

            
  }
 $scope.vend=function(partyname123){
  $scope.use=""
  //alert(partyname123)
  // var prtys=partyname123;
 // $http.get('/vendornam'+prtys).success(function(response){
 //      console.log(response);
 //      $scope.use=response;

               
 //                  });
}
$scope.party=null;
$scope.oName=function(partyname123,ven,par,dfrom,dto){
  //alert();
  var pname=partyname123;
  var vend=ven;
  var part=par;
  var dafrom=dfrom;
  var dato=dto;
  // var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
  //      var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             // dafrom = dafrom1.slice(0,10);
             // dafrom  = dafrom1+"T00:00:00.000Z";
             // // dato=  dato1.slice(0,10);
             //  dato =  dato1+"T23:59:59.999Z";
  //            // /date= fromdate+","+todate;
 // alert(pname)
 //  alert(vend)
 //  alert("party"+part)
 //  alert(dafrom)
 //   alert(dato)
  
  if(pname==undefined &&vend==undefined &&part==undefined && dafrom==undefined && dato==undefined)
  {  
  alert("Please Select Mandatory Fields") 
  // var prtys=dfrom+","+dto;
  
  }
   else if(pname!=undefined && vend==undefined &&part==undefined && dafrom==undefined && dato==undefined  ){
    alert("queary for ordername")
    $http.get('/oname'+pname).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
    //var prtys=partyname123;

  
  }
else if(vend!=undefined && pname==undefined &&part==undefined && dafrom==undefined && dato==undefined   ){
  //alert("query for vendor")
  $http.get('/getvendorname'+vend).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  //var prtys=partyname123+","+dfrom+","+dto;
  

}
else if(part!=undefined && pname==undefined &&vend==undefined && dafrom==undefined && dato==undefined  ){
 // alert("queary for party")
  //var prtys=partyname123+","+dfrom+","+dto;
  $http.get('/ordername'+part).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
$scope.use[0].date = new Date(response[0].date ) 
               
                  });

}
// else if(part!=undefined || pname==undefined &&vend==undefined && dafrom==undefined && dato==undefined ){
//   alert("queary for party")
//   //var prtys=partyname123+","+dfrom+","+dto;
  

// }

else if(dafrom!=undefined && dato!=undefined && pname==undefined &&vend==undefined && part==undefined  ){
    //alert(dafrom+"hh")
    var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate;
  //var bothdates=dafrom+","+dato;
  //alert("queary for date"+date)
   $http.get('/getwww'+date).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  //var prtys=partyname123+","+dfrom+","+dto;
  

}
else if(dato!=undefined && dato!=undefined && pname!=undefined &&  vend==undefined && part==undefined ){
  //alert("queary for date and ordername")
  var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+pname;
  //var bothdates=dafrom+","+dato;
  //alert("queary for date"+date)
   $http.get('/getordername'+date).success(function(response){
      console.log(response);
      $scope.use=response;

           $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date )        
                  });
  

}
else if(dato!=undefined && dato!=undefined && part!=undefined && pname==undefined &&vend==undefined  ){
  //alert("queary for party and date")
  var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+part;
  //var bothdates=dafrom+","+dato;
  //alert("queary for date"+date)
   $http.get('/getpartname'+date).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  //var prtys=partyname123+","+dfrom+","+dto;
  

}
else if(dato!=undefined && dato!=undefined && vend!=undefined && pname==undefined &&part==undefined  ){
  //alert("queary for vend and date")
  //var prtys=partyname123+","+dfrom+","+dto;
  var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
             date= fromdate+","+todate+","+vend;
  //var bothdates=dafrom+","+dato;
  //alert("queary for date"+date)
   $http.get('/venddate'+date).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  

}
else if(vend!=undefined && part!=undefined && pname==undefined && dafrom==undefined && dato==undefined ){
 // alert("queary for party & vend")
  both= vend+","+part;
  $http.get('/getven'+both).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  //alert(both)
  //var prtys=partyname123+","+dfrom+","+dto;
  

}
else if(vend!=undefined && pname!=undefined && part==undefined && dafrom==undefined && dato==undefined ){
  //alert("queary for order name & vend")
 both= vend+","+pname;
  $http.get('/getpname'+both).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });
  

}
else if(part!=undefined && pname!=undefined && vend==undefined && dafrom==undefined && dato==undefined ){
  //alert("queary for party name & oname")
  //var prtys=partyname123+","+dfrom+","+dto;
  both= part+","+pname;
  $http.get('/partpname'+both).success(function(response){
      console.log(response);
      $scope.use=response;

          $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date )         
                  });
  
  

}
else if(part!=undefined && pname!=undefined && vend!=undefined && dafrom==undefined && dato==undefined ){

//alert("query for party name & oname & vend") 
both= part+","+pname+","+vend;
$http.get('/partyvendor'+both).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 
               
                  });

 }
 else if(part!=undefined && pname!=undefined && vend==undefined && dafrom!=undefined && dato!=undefined ){

//alert("query for party name & oname & date") 
var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
both= fromdate+","+todate+","+ part+","+pname;
$http.get('/datevendor'+both).success(function(response){
      console.log(response);
      $scope.use=response;
         $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 


 })
}
 else if(part==undefined && pname!=undefined && vend!=undefined && dafrom!=undefined && dato!=undefined ){

//alert("query for date & oname & vend") 
var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
both= fromdate+","+todate+","+ vend+","+pname;
$http.get('/chaopop'+both).success(function(response){
      console.log(response);
      $scope.use=response;
   $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 

 })
}
else{
  //alert("all")
  var fromdate  = new Date(((new Date($scope.datefrom).toISOString().slice(0, 23))+"-05:30")).toISOString();
       var  todate= new Date(((new Date($scope.dateto).toISOString().slice(0, 23))+"-05:30")).toISOString();
   
             fromdate = fromdate.slice(0,10);
             fromdate = fromdate+"T00:00:00.000Z";
             todate= todate.slice(0,10);
             todate = todate+"T23:59:59.999Z";
both= fromdate+","+todate+","+ vend+","+pname+","+part;
$http.get('/pratop'+both).success(function(response){
      console.log(response);
      $scope.use=response;
         $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date ) 


 })
}


 
}
 //$scope.dateSearch();
// }


   $http.get('/getmanage').success(function(response){
             console.log(response)
             $scope.use=response;
       $scope.use[0].usedate = new Date(response[0].usedate )
  $scope.use[0].date = new Date(response[0].date )     
               })
  //   $http.get('/detailsManage').success(function(response){
  //            console.log(response)
  //            //$scope.use.allocate=response.allocate
  //            // $scope.use[0].initial=response[0].initial;
  // //      $scope.use[0].usedate = new Date(response[0].usedate )
  // // $scope.use[0].date = new Date(response[0].date )     
  //              })
    // $http.get('/managedetails').success(function(response){
    //          //console.log(response)
    //          $scope.use=response;
    //            //$scope.use=response;
    //            })

   // $scope.use.alocate="Unallocated"
   // $scope.use.initial="Initial"
   //alert($scope.idData)
 var sta=window.sessionStorage.getItem("getIssue",status)
 //alert(sta)
 //$scope.use[$index].initial=sta;
  //alert("out"+$scope.idData)
  $scope.updateorder=function(status,index){
    //alert("pass"+status)
  $scope.use[index].allocate=status;
  //alert("first"+$scope.use[index].allocate)
   $scope.itial=$scope.use[index].allocate;
   //console.log($scope.use[index])
   
    //alert($scope.use[index]._id)
     //$scope.use[index].initial="Allocated";
  
   // if($scope.use[index].initial=="Allocated"){
   //   $http.post('/recieveChange',$scope.use[index] ).success(function(response){
   //           console.log(response)
   //            $scope.idData=response._id;
   //            //alert(response._id)
   //          //alert($scope.idData)
   //             })

   //  double=$scope.use[index]._id+","+$scope.use[index].allocate+","+$scope.use[index].initial
   //   //alert( double)
   //   $http.put('/vendorSave/'+double ).success(function(response){
   //           console.log(response)
   //           //$scope.use=response;
   //             })
   
   // }
   // else{
    // $http.put('/changesta',$scope.use[index] ).success(function(response){
    //          console.log(response)
    //          //$scope.use=response;
    //            })
   // }

    var r = confirm("Land to Issue Voucher?")
            if (r==true) {
           $scope.transaction="Issue Voucher"     
 $window.location="Transaction.html"
   //alert("kkk"+$scope.use[index].allocate)
    window.sessionStorage.setItem("getIssue",$scope.transaction)
     window.sessionStorage.setItem("carrigor",$scope.use[index].allocate)
     //$scope.use[index].initial="Allocated";
   var vocherPartyId =$scope.use[index]._id+","+$scope.use[index].allocate
    //var vocherPartyId= $scope.use[index] 
    //console.log(vocherPartyId)
  window.sessionStorage.setItem("issueVocherPartyId",vocherPartyId)
  $http.post('/recieveChange',$scope.use[index] ).success(function(response){
             console.log(response)
              $scope.idData=response._id;
              //alert(response._id)
            //alert($scope.idData)
               })

    double=$scope.use[index]._id+","+$scope.use[index].allocate+","+$scope.use[index].initial
     //alert( double)
     $http.put('/vendorSave/'+double ).success(function(response){
             console.log(response)
             //$scope.use=response;
               })
  }
  else{
    $scope.use[index].initial="Allocated"
    //alert($scope.use[index].initial)
    $http.post('/recieveChange',$scope.use[index] ).success(function(response){
             console.log(response)
              $scope.idData=response._id;
              //alert(response._id)
            //alert($scope.idData)
               })

    double=$scope.use[index]._id+","+$scope.use[index].allocate+","+$scope.use[index].initial
     //alert( double)
     $http.put('/vendorSave/'+double ).success(function(response){
             console.log(response)
             //$scope.use=response;
               })
    //$scope.use[index].initial="Allocated";
   

  }

        

  }
  //alert($scope.use.initial)
 var receipt=JSON.parse(window.sessionStorage.getItem("Str3"));
  console.log(receipt)
var flagCall = function(){
    // alert("hi");
            if(flag == 0){
              $scope.payButtonDIsplay = "true";
                arrcon =[];
             // alert(" validations are clear")

        console.log( $scope.partyname)   
        $scope.user = $scope.userit;
        console.log($scope.user)

   //   var requestCallPrint  = $scope.userit.length-1;

        for(let i=0;i<=$scope.userit.length-1;i++){ 
            
               console.log($scope.userit[i])
             
               for(let j=0;j<$scope.items.length;j++){
                       //alert("inside loop Name "+$scope.items[j].Name)
                       console.log($scope.items[j])
                     if ($scope.userit[i].itemName == $scope.items[j].Name){ 
                            //alert($scope.items[j])
                            console.log($scope.items[j])
                            // alert("Hsc in  items matched"+$scope.items[j].Hsc)
                            $scope.userit[i].Hsc=$scope.items[j].Hsc;
                             $scope.userit[i].InvGroupName = $scope.items[j].InvGroupName;
                            $scope.userit[i].SaleCategory = $scope.items[j].SaleCategory;
                           
                            console.log($scope.userit[i].Hsc)
                          
                            break;
                          }
                  }//for(let j=0;j<$scope.items.length;j++){



                  // for transaction  types
                 $scope.userit[i].remarks = $scope.remarks
                 console.log($scope.userit[i].remarks)
           
                 console.log($scope.userit[i].date)
                 console.log($scope.userit[i].Transaction)
                 $scope.userit[i].Transaction = $scope.transaction
                 console.log($scope.userit[i].Transaction)
                 if($scope.userit[i].date == undefined){
                     //  $scope.userit[i].date = "2017-04-24T12:20:18.920Z"
                     $scope.userit[i].date = new Date(((new Date(new Date()).toISOString().slice(0, 23))+"-05:30")).toISOString();
                     $scope.userit[i].Transaction = $scope.transaction
                 }
                  // $scope.userit[i].Gwt =parseFloat($scope.userit[i].gwt)
                  //            alert($scope.userit[i].Gwt)
                  //defining fields

                 var data = $scope.transaction+","+$scope.userit[i].barcodeNumber+","+$scope.userit[i].chgunt+","+$scope.userit[i].date+","+$scope.userit[i].desc+","
                     +$scope.userit[i].final+","+$scope.userit[i].gpcs+","+$scope.userit[i].gwt+","+$scope.userit[i].itemName+","+$scope.userit[i].ntwt+","+$scope.partyname+","
                     +$scope.userit[i].size+","+$scope.userit[i].taxval+","+$scope.userit[i].taxamt+","+$scope.userit[i].stwt+","+$scope.userit[i].wastage+","+$scope.userit[i].stval+","
                     +$scope.userit[i].labval+","+$scope.userit[i].rate +","+ $scope.userit[i]._id +","+$scope.userit[i].StockFrom+","+$scope.userit[i].StockTo+","
                     +$scope.userit[i].withinstatecgst+","+$scope.userit[i].withinstatesgst +","+ $scope.userit[i].outofstateigst;
                 console.log(data)
                 console.log($scope.userit[i])
                 console.log($scope.transaction)
       
       
                  if($scope.userit[i]._id!=null){  
                      // alert("id is not null")
                      // alert("save entered $scope.userit[i]._id!=null "+$scope.userit[i]._id)
                      // console.log("$scope.userit[i]._id!=null");
                       //console.log($scope.userit[i])
                       var ordstatus = $scope.userit[i].orderStatus
                       //console.log($scope.userit[i].orderstatus)
                       //console.log($scope.userit[i]._id)
                        // $scope.userit[i]._id = null;
                       // console.log($scope.userit[i]._id)
                       if($scope.userit[i].orderStatus == "available"){
                        // if($scope.transaction!="Approval Out"){
                           // alert("entered into orderstatus available")
                             $scope.userit[i]._id = null;
                             
                             $scope.userit[i].partyname=$scope.partyname;
                               // $scope.userit[i].stockPoint ="URD treasure"
                             $scope.userit[i].stockInward = "no" ;
                              if($scope.transaction!='Approval Out'&& $scope.transaction!='Opening Stock'){
                                      $scope.userit[i].orderStatus = "Inprogress";
                                     
                               }
                               // else if($scope.transaction=="Urd Purchase"){
                               //  $scope.userit[i].orderStatus = "completed";
                               //  $scope.userit[i].stockInward='yes';
                               // }
                               else{
                                 // alert("change barcode");
                                  $scope.userit[i].orderStatus = "completed";
                                  $scope.userit[i].stockInward='no';
                                  updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                               }
                                      $scope.userit[i].billType =  $scope.billtype;
                             
                                  // }
                             if($scope.transaction!="Approval Out"){
                             $http.post('/insertUseritDetails',$scope.userit[i]).success(function(response){
                                    // alert(response)
                                        updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus); 
                                        console.log(response)
                                        // if($scope.transaction=="Approval Out"){

                                        
                                    // }
                                         $scope.userit[i]._id = response._id;
                                         console.log($scope.userit[i]._id );
                                      if($scope.transaction!="Sale Return"&&$scope.transaction!="Purchase return"){
                                      $scope.idUpadtesCall(response._id);
                                          }
                                    // accountAndPurityCall(i,response.itemName)
                                  $scope.userit[i]._id = response._id;
                                 // $scope.id1= response._id ;
                                    //  arrcon.push(response._id)
                                      console.log(arrcon);
                                     // alert(arrcon)
                                       var update=$scope.partyname+","+$scope.transaction;
                                       // $http.get('/transdetails/'+update).success(function(response)
                                       //       { 
                                       //          console.log(response)
                                       //           //$scope.userit[i] = response;
                                       //          $scope.user=$scope.userit;
                                    
                                       //        })

                                   })
                                }
                                else{
                                  $http.post('/insertUseritDetails',$scope.userit[i]).success(function(response){

                                       console.log(response)
                                        arrcon.push(response._id);
                                      console.log(arrcon); 
                                      window.sessionStorage.setItem("userids",JSON.stringify(arrcon)); 
                                        });

                                }
                                   // if($scope.transaction == 'Approval Out'){
                                  //   for(var p=0;p<arrcon.length;p++){
                                  //   alert("aproval in");
                                  //   var id1=arrcon[p];
                                  //   // $scope.appdata=$scope.transaction+","+$scope.partyname;
                                  //   alert(id1);
                                  //   $http.put('/approvalupdate'+id1).success(function(response){
                                  //     console.log(response);
                                  //   })
                                  //   $http.put('/updateUseritCall',$scope.userit[i]).success(function(response)
                                  //     {
                             
                                  //              console.log(response);
                                  //               updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                                  //           $scope.idUpadtesCall($scope.userit[i]._id);
                                  //     })
                                  // }
                                  // }
                                // }
                                // else{
                                //   alert("Approval out");
                                //     $http.post('/approvalinsert',$scope.userit[i]).success(function(response){
                                //       console.log(response);
                                //     })
                                // }

                        }else if($scope.userit[i].orderStatus == "Inprogress"){
                                 //  alert("entered into orderstatus Inprogress")

                                    $scope.userit[i].billType =  $scope.billtype;
                             
                                  $scope.userit[i].partyname= $scope.partyname;
                                    //if()
                                if($scope.transaction =="RD Purchase"){
                                    // $scope.userit[i].refidRD = $scope.refId;
                                    $scope.userit[i].orderStatus="completed";
                                  }
                                  $scope.userit[i]._id = $scope.userit[i]._id;
                                  var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward+","+$scope.userit[i].Hsc+
                               ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+
                               ","+$scope.userit[i].stonecal+","+$scope.userit[i].salesPerson +","+$scope.userit[i].AccNo +","+$scope.userit[i].labourTaxValue+
                               ","+$scope.userit[i].labamt+","+$scope.userit[i].urdAdjustment+","+$scope.userit[i].stchg +","+$scope.userit[i].comboItem +","+$scope.userit[i].mrp +
                                ","+ $scope.userit[i].billType+","+$scope.userit[i].taxSelection+","+$scope.userit[i].refId+","+$scope.userit[i].InvGroupName +
                                ","+ $scope.userit[i].SaleCategory+","+$scope.userit[i]._id+","+$scope.userit[i].barcode+","+$scope.userit[i].orderStatus; 
                                 console.log(data1)
                               //$http.post('/savedata1/'+data1)
                                // $http.put('/updateUseritCall',$scope.userit[i]).success(function(response)
                                

                                 $http.put('/updateSaveData/'+data1).success(function(response)
                                      {
                                              //   alert("Inprogress "+$scope.userit[i]._id);
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
                                                console.log(response);
                                                updateBatch($scope.userit[i].barcode,$scope.userit[i].orderStatus);
                                                $scope.idUpadtesCall($scope.userit[i]._id);
                                      })

                         }else if($scope.userit[i].orderStatus == "completed"){
                                        //alert("completed");
                                   //console.log("completed then update ")
                                   //console.log( $scope.userit[i].barcode)
                                      // if($scope.userit[i].barcode == undefined){
                                   //     console.log("this is non barcode item")
                                    // }
                                  // var new1 = data+","+$scope.userit[i].orderStatus;
                                    $scope.userit[i].billType =  $scope.billtype;
                                    // if($scope.transaction =="RD Purchase"){
                                    //        $scope.userit[i].refidRD = $scope.refId;
                                    //  }
                                    if($scope.transaction == "Sale Return"||$scope.transaction=="Purchase Return"||$scope.transaction=="Approval Out") {
                                         console.log($scope.userit[i]);
                                         // alert("sale return")
                                        arrcon=[];
                                       // alert(arrcon.length+"   length outside");
                                         if($scope.transaction == "Sale Return"){
                                          $scope.userit[i].stockInward='yes';
                                         }
                                         else{
                                          $scope.userit[i].stockInward='no';
                                         }
                                         for(var g=0;g<$scope.voucherid.length;g++){
                                          // alert("entered for");
                                                     if($scope.voucherid[g].id==$scope.userit[i]._id){
                                                           // alert(arrcon.length+"  length inside");

                                                           // alert("i am in flagcall"+g);           
                                                         updateBatch($scope.userit[i].barcode,"available");
                                                                    $http.put('/insertNewUseritDetails',$scope.userit[i]).success(function(response){
                                                                   // alert("sale return");
                                                                    console.log(response+"new row");
                                                                    // if(arrcon.indexOf(_id)==-1){
                                                                      // alert("arrcon");

                                                                              // $scope.printId();
                                                                        arrcon.push(response._id)
                                                                      // alert(arrcon.length+"  length inside");
                                                                     console.log(arrcon);
                                                                      // }
                                                                         window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
// =======
//                                                                      arrcon.push(response._id)
//                                                                       // alert(arrcon.length+"  length inside");
//                                                                      console.log(arrcon);
//                                                                       // }
//                                                                       window.sessionStorage.setItem("userids",JSON.stringify(arrcon));
// >>>>>>> 8b85df3ecb8f882c338247563e8f1846dcd8aef6
                                                                     // alert(arrcon+"1");
                                                                    });
                                                          console.log($scope.voucherid[g].id);
                                                          $scope.namess=$scope.voucherid[g].id;
                                                      
                                                                    $http.put('/changeOrderStatus'+$scope.namess).success(function(response){
                                                                      console.log(response);
                                                                    });
                                                       }
                                          }//for closer
                                                   
                                      }


                                                       else{
                                                        if($scope.transaction=="Approval Return"){
                                                          $scope.userit[i].stockInward="yes";
                                                        }
                                                                $http.put('/updateUseritCall',$scope.userit[i]).success(function(response){ 
                                                                  console.log(response);
                                                                 // alert(arrcon+"222222222222");
                                                                // $scope.idUpadtesCall($scope.userit[i]._id);
                                                                 })
                                                           }
                                                
                                         
                                        }
                       
                                      }else{
                                        // alert("else");
                          // console.log("this is main else loop");
                          // alert("$scope.userit[i]._id else =null");
                         console.log($scope.userit[i]);
       //                     $scope.urdPurchaseStockPoint = response[0].urdPurchaseStockPoint ;
       // $scope.rdPurchaseStockPoint = response[0].rdPurchaseStockPoint ;
     
                         $scope.userit[i].partyname=$scope.partyname;
                         if($scope.transaction == "Urd Purchase"){
                             // $scope.userit[i].orderStatus = $scope.urdPurchaseStockPoint ;
                               $scope.userit[i].stockInward = "yes";
                               $scope.userit[i].urdAdjustment = $scope.userit[i].final ;
                           }
                          // }else if($scope.transaction=='Sale Return'){
                          //   $scope.userit[i].stockInward="yes";
                          // }
                          // else if($scope.transaction=='Purchase Return'){
                          //   $scope.userit[i].stockInward="no";
                          // }
                          else if($scope.transaction =='Issue Voucher'){
                            $scope.userit[i].stockInward = "no";
                            $scope.userit[i].orderStatus = "completed";
                          }else if($scope.transaction == "RD Purchase"){
                                // $scope.userit[i].stockPoint = $scope.rdPurchaseStockPoint ;
                                 $scope.userit[i].stockInward = "yes";
                                 $scope.userit[i].refId=$scope.refId;
                               }else if($scope.transaction == 'Receipt Voucher'||$scope.transaction == 'Opening Stock'){
                                // console.log($scope.refId+"$scope.refId");
                                //   $scope.userit[i].refId=$scope.refId;
                                  // alert($scope.userit[i].refId);
                                  $scope.userit[i].stockInward = "yes";
                                  $scope.userit[i].orderStatus = "completed";
                               }
                               else if($scope.transaction == 'Approval Out'||$scope.transaction=='Approval Sale'){
                                $scope.userit[i].orderStatus="completed";
                                $scope.userit[i].stockInward="no";
                               }
                               else if($scope.transaction=='Approval Return'){
                                $scope.userit[i].stockInward="yes";
                               }
                               else{
                                // $scope.userit[i].stockPoint = $scope.regularSaleStockPoint ;
                                 $scope.userit[i].stockInward = "no";
                               }
                 
                              // if($scope.transaction =="Urd Purchase"){
                              //   $scope.userit[i].urdAdjustment = $scope.userit[i].final ;
                              //  }
                                $scope.userit[i].billType =  $scope.billtype;
                             
                               console.log(data)
                               //alert("hscc "+$scope.userit[i].Hsc)
                               var data1 = data+","+$scope.userit[i].stockPoint+","+$scope.userit[i].stockInward+","+$scope.userit[i].Hsc+
                               ","+$scope.userit[i].purity+","+$scope.userit[i].pctcal+","+$scope.userit[i].labcal+","+$scope.userit[i].uom+
                               ","+$scope.userit[i].stonecal+","+$scope.userit[i].salesPerson +","+$scope.userit[i].AccNo +","+$scope.userit[i].labourTaxValue+
                               ","+$scope.userit[i].labamt+","+$scope.userit[i].urdAdjustment+","+$scope.userit[i].stchg +","+$scope.userit[i].comboItem +","+$scope.userit[i].mrp +
                                ","+ $scope.userit[i].billType+","+$scope.userit[i].taxSelection+","+$scope.userit[i].refId+","+$scope.userit[i].InvGroupName +","+ $scope.userit[i].SaleCategory+","+$scope.userit[i]._id; 
                                 console.log(data1)
                               //  var date3 = new Date()
                                 $http.post('/savedata1/'+data1).success(function(response){
                         
                                 console.log(response);

                                  // $scope.userit[i]._id = response._id;
                                 // alert("save "+$scope.userit[i]._id);
// >>>>>>> fee1f0c78ec863e1379d888ee1ecfcda651c8fe5
                                  
                                 $scope.idUpadtesCall(response._id);
// <<<<<<< HEAD
                                


                                         
                                 // $scope.getDetails();
                                    


                          }); 

                                 
                         
                       }

                  
                       console.log("i           "+i);
                        $scope.dataTargetCall = "#myModal1" ;

          //for print call
     
         }//for loop closer

       



        
 
           
     }
    

   }
// $scope.labourTax = function (){
//    // alert("sale labourTax")
//       $scope.saleinv[0].labourtax=0;
//        $scope.saleinv[0].labourValue = 0;
//     for(i=0;i<=$scope.userit.length-1;i++)
//       {
//          $scope.saleinv[0].labourValue = (parseFloat($scope.saleinv[0].labourValue)+parseFloat($scope.userit[i].labval)).toFixed($scope.rupeesDecimalPoints);
    
//        $scope.saleinv[0].labourtax = (parseFloat($scope.saleinv[0].labourtax)+parseFloat($scope.userit[i].labourTaxValue)).toFixed($scope.rupeesDecimalPoints);
//       console.log($scope.saleinv[0].labourValue)
//        console.log($scope.saleinv[0].labourtax)
//      }
// }

}])