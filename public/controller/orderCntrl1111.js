//for firstpage.html
var myApp=angular.module('myApp',[]); 
myApp.controller('orderCntrl',['$scope','$http','$window','$rootScope',"ControllerService",
function($scope,$http,$window,$rootScope,ControllerService){
  //alert("well come to mainpage.html")
// $scope.irate=[];
$scope.userit=[];
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
$scope.partyNames=function () {

 
  $http.get('/PartyNames').success(function(response){
        $scope.partyNames=response;
       
  });
  console.log( $scope.partyNames)
}
$scope.saleNames=function () {

 
  $http.get('/saleNames').success(function(response){
        $scope.saleNames=response;
        
  });
  console.log( $scope.partyNames)
}
$scope.vendorNames=function () {

 
  $http.get('/vendorNames').success(function(response){
        $scope.vendorNames=response;
        
  });
  console.log( $scope.partyNames)
}
$scope.itemSelect11=function () {
//alert("hh")
 
  $http.get('/itemSelect').success(function(response){
        $scope.items=response;
        
  });
  console.log( $scope.partyNames)
}
$scope.getUom=function(){
$http.get('/uom').success(function(response){
        $scope.uom=response;
        
  });
}
$scope.getPct=function(){
$http.get('/pct').success(function(response){
        $scope.pct=response;
        
  });
}
$scope.labCal=function(){
$http.get('/lab').success(function(response){
        $scope.lab=response;
        
  });
}
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
            //alert("vadskjdrfjk");
             const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
             $window.location.href = "pdf.html"; 
                         }, 500);
       }
 var lastdate = null;
$http.get('/getinventorygroupvaluenotationlast').success(function(response){
                     console.log(response);  
                     console.log(response[0].date);
                      lastdate= response[0].date         
                 });
$scope.purityCal=function(val,purity){
        
       //alert("purity calculation function called"+purity.Rate+purity)
       //alert("length is:"+$scope.irate.length)

       for(i=0;i<$scope.irate.length;i++)
       {
        //alert($scope.irate[i].ValueNotation)
          if (purity == $scope.irate[i].ValueNotation)
          {
            //alert( $scope.userit[val].rate)
              $scope.userit[val].rate=$scope.irate[i].Rate;
              break;
          }
        
       
       }



       
        var labvar = parseFloat($scope.userit[val].labamt)
        if(labvar==NaN){
         $scope.userit[val].labval=0;
        }
        var stvar = parseFloat($scope.userit[val].stchg)
        if(stvar==NaN){
         $scope.userit[val].stval=0;
        }

    if($scope.userit[val].gwt=="")
    {
        //alert("null value")
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
   
    $scope.userit[val].ntwt = $scope.userit[val].gwt;
    if($scope.userit[val].stwt!=null)
    {
      // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
         
      $scope.userit[val].ntwt=(parseFloat($scope.userit[val].ntwt)-parseFloat($scope.userit[val].stwt)).toFixed(fixdec);
    }
    //$scope.userit[val].chgunt=($scope.userit[val].ntwt).toFixed(fixdec);
     $scope.userit[val].chgunt=($scope.userit[val].ntwt);
   
    //alert("here is index"+$scope.userit[$index].chgunt)
    //
    //$scope.newwas($index,pctcal);
 
    $scope.userit[val].taxval=($scope.userit[val].chgunt*$scope.userit[val].rate).toFixed(fixdec);;
    // $scope.userit[val].taxamt=$scope.userit[val].taxval/100;
    // $scope.userit[val].final=parseFloat($scope.userit[val].taxval)+parseFloat($scope.userit[val].taxamt)
    
}
}
 $scope.addNew = function(){
   
   
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
$scope.rateChange=function($index){
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

    //saleInvoiceCalculations();
}//dropDownCalls

//for tax amount calculation 
$scope.uomConversion=function($index,uom){
  //alert("uom call"+uom)

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

$scope.newgwt=function($index,pctcal)
{  
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
    saleInvoiceCalculations();
    $scope.dropDownCalls($index,"gwt");


}

/*else {
    
}*/
}                            } }
var checkRepeat = false
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
      $scope.userit[$index].stwt =( $scope.userit[$index].stwt).toFixed(fixdec);
      $scope.userit[$index].stwt = parseFloat ($scope.userit[$index].stwt) ;
   
       $scope.userit[$index].ntwt=(((parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt))*parseFloat($scope.userit[$index].uomValue))).toFixed(fixdec);
         $scope.userit[$index].chgunt=($scope.userit[$index].ntwt);
    }
   // $scope.userit[$index].ntwt=(parseFloat($scope.userit[$index].gwt)-parseFloat($scope.userit[$index].stwt)).toFixed(fixdec);
   // $scope.userit[$index].chgunt=($scope.userit[$index].ntwt).toFixed(fixdec);
        
    $scope.userit[$index].taxval1 = parseFloat($scope.userit[$index].chgunt)*parseFloat($scope.userit[$index].rate);
    $scope.userit[$index].taxval = parseFloat($scope.userit[$index].taxval1).toFixed(2);
    
    saleInvoiceCalculations();
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
        $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
       $scope.userit[$index].wastage = parseFloat ($scope.userit[$index].wastage) ;
   
        var wastage=(($scope.userit[$index].wastage*$scope.userit[$index].ntwt)/100).toFixed(fixdec);
        //alert($scope.userit[$index].wastage);
        $scope.userit[$index].chgunt=(parseFloat($scope.userit[$index].ntwt)+parseFloat(wastage)-$scope.totmat).toFixed(fixdec);
        //alert($scope.userit[$index].chgunt);
        $scope.dropDownCalls($index,"pctcal");
    }
    else if(pctcal=="Add Units")
    {
        $scope.userit[$index].wastage =( $scope.userit[$index].wastage).toFixed(fixdec);
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
        
         saleInvoiceCalculations();

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
         
         saleInvoiceCalculations();
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

       
        saleInvoiceCalculations();
  
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
            saleInvoiceCalculations();
           // saleInvoiceCalculations(true);
        }else{
     $scope.userit[$index].taxval=$scope.userit[$index].mrp;
    $scope.userit[$index].taxval=$scope.userit[$index].taxval.toFixed(2);
   // alert( $scope.userit[$index].taxval)
    $scope.labourTax();
    // $scope.getTotTaxVal();
    // $scope.getTotTaxAmt();
    // $scope.getFinalVal();
    // $scope.getTotNetAmt();
    saleInvoiceCalculations();

 }
  


  
}

}])