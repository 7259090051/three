module.exports = function (app) {

	 var fs = require('fs');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var ObjectID = require('mongodb').ObjectID;
    var mongojs=require('mongojs');
    var Decimal128 = require('mongodb').Decimal128;
    var db=mongojs('inventory200',['user','tags','transaction','saleInvoice','mode','transactionDetail','batch','bank',
  'transactionSeriesInvoice','itemrate','item','menu','order','useritem','purity','uom','pct','labcal','useradj',
  'barCodeSummary','stockPointMaster','configurations','inventoryGroupMaster','salesCategoryMaster','itemType','taxrate',
  'items','tax','taxation','inventoryGroupValueNotation','inventoryGroupValueNotationDaily','salesPerson','loginDetails',
  'trHeaders','gIControlTables','history','ledgerActs','ledgeraccounts','mainclasses','maingroups','mcIds',
  'roundOffConfig','sgIds','subgroups','subscribers','trDetails','transactionInvoice','ugIds','updatelist','user',
  'users','merchantDetails','trail','staff','cardType']);

  	console.log(" enter into financialAccounts js");


  	var inVoiceSeriesConfig = null;
	var DecimalPoints = null;
	var rupeesDecimalPoints = null;
	function configurationCall() {
	  db.configurations.find(function(err,doc){
	        if (doc.length != 0) {
	          inVoiceSeriesConfig = doc[0].inVoiceSeries;
	          DecimalPoints = doc[0].DecimalPoints;
	          rupeesDecimalPoints = doc[0].rupeesDecimalPoints;
	           
	          console.log('inVoiceSeriesConfig '+inVoiceSeriesConfig);
	        };
	})
	}//configurationCall




  	app.get('/api/trCollectionCreation/:data',function(req,res){ 
      

       configurationCall();  
       trHeadersCount (); 
  
       console.log("Discount Given Discount GivenDiscount getinventoryGroupValueNotation trCollectionCreation")
       res.json("100");
   var taxDuplicateCheck = [];
 var str=req.params.data;
    //console.log(str);
     var str_array=str.split(",");
    //console.log( str_array.length);
    var length = str_array.length;
    //console.log(length);
    var voucher = str_array[length - 1];
    var salesIds=req.query.salesIds;
    var userIds = req.query.userIds;
    var trailRepeat = req.query.trail;
     var billTypeForAccounts = req.query.Billtype;
     console.log(" billTypeForAccounts "+req.query.Billtype)
    var userIdData = null;
    // for(var i =0;i<length ;i++){
    //   console.log("str_array[i] "+str_array[i])
    // }

    //voucherId check
    var voucherId = 0;
    var voucherClass = null;
    function trHeadersCount () {
    	
    
    db.trHeaders.find({}).sort({_id:-1}).limit(1,function(err,data){
        //res.json(doc);
        console.log(data.length);
        if (data.length == 0) {
            voucherId = 1;
        }else{
               voucherId =  Number(data[0].voucherId) ; 
               console.log(" voucher   voucher "+data[0].voucherId)
               voucherId++;
             }
    })

    }//trHeadersCount ()
    
   // console.log("trailRepeat trailRepeat "+trailRepeat)
    if (trailRepeat  == "yes") {


    //console.log("userIds.length userIds.length "+userIds.length);
    // if (userIds.length == 24) {
    //   userIdData = userIds ;
    // }else{
    //    userIdData = userIds[0]
    // }
    //console.log()
    var currentdate = null;
    var currentYear = null;
    var voucherType = null;
    var  vocuherNumber =null;
    var suffix = null;
    var name = null;
    var amountTotal = null;
    var amountNet = null;
     var concat = null;
     var billtype = null;
      var voucherRowNumber = 0;
      var salesPerson = null;
      var refId ;
      var ledgerAccountId = null;
    findCall(req.query.salesIds);
    function customerDetails(name,defaultBalance) {
      db.subscribers.find({subscriber:name},function (err,subscriber) {
        console.log(subscriber)
        console.log("subscriber                                         call ")
        console.log(subscriber[0].ledgerID);
          db.ledgeraccounts.find({"_id" : mongojs.ObjectId(subscriber[0].ledgerID)},function (err,ledger) {
            console.log(ledger)
            //console.log("subscriber                                         call ")
            console.log(ledger[0].accountIds);
            ledgerAccountId = ledger[0].accountIds;
            defaultBalanceSubscriber(ledger[0].accountIds,defaultBalance);
          })

      })
    }
    
    function findCall(argument) {
       db.saleInvoice.find({ "_id" : mongojs.ObjectId(argument)},function (err,res) {
    console.log(res);
    //res.json(res)
     
  currentdate =  res[0].date ;
  billtype =  res[0].billtype ;
  //"billtype" : "Cash"
    currentdate = currentdate.slice(0, 10);
     //console.log( currentdate);
    
      currentYear = res[0].date.slice(0, 4);
    // console.log(currentYear);
    // console.log(res[0].Transaction);
     voucherType = res[0].Transaction;
    
     // console.log(res[0].invoiceValue);
     //console.log(res[0].voucherNo);
     vocuherNumber = res[0].voucherNo;
     suffix = res[0].voucherNo.slice(0, 2);
     name = res[0].partyname ;
          if (res[0].adj == 'null') {
        amountTotal = res[0].invoiceValue;
     }else{
        amountTotal = Decimal128.fromString(res[0].invoiceValue) + Decimal128.fromString(res[0].adj) ;
     }
     //Decimal128.fromString("636.45")
     amountNet = res[0].netamt;
     // console.log(suffix );
     //console.log(res[0].partyname);
     concat = "To "+res[0].partyname ;
     //console.log(concat);
     
     //to find voucherClass
     db.transactionSeriesInvoice.find({ "TransactionType" :voucherType },function (err,resData) {
            voucherClass =  resData[0].TransactionClass ;
     })
   

     //taxCall(res[0].tax1);
     //for not allowing urd purchase transactions
     if (voucherType != "Urd Purchase") {
             if (billtype == "Cash" ) {

                     if (voucherType == "RD Purchase") {
                     	customerDetails(name,'Cr')
                         gstCall("Cash Paid", amountTotal);
                     }else{
                     		customerDetails(name,'Dr')
                            //  gstCall("Cash on hand", amountTotal);
                          }
                   // defaultBalanceSubscriber(name);
                    //customerDetails(name)
             }else{


                     if (voucherType == "RD Purchase") {
                     	customerDetails(name,'Cr')
                        // gstCall("Cash Paid", amountTotal);
                     }else{
                     		customerDetails(name,'Dr')
                            //  gstCall("Cash on hand", amountTotal);
                          }
                     
                    // customerDetails(name)

                    //defaultBalanceSubscriber(name);
                  }
           
               if (res[0].discount!=0 && res[0].discount!='' && res[0].discount!='NaN' && res[0].discount!= 'undefined') {
                  console.log(" res[0].discount "+res[0].discount)
                  gstCall("Discount Given", parseFloat (res[0].discount));
               }

             if (res[0].roundOffValue!=0 && res[0].roundOffValue!='' && res[0].roundOffValue!='NaN' && res[0].roundOffValue!= 'undefined') {
                    console.log(" res[0].roundOffValue "+res[0].roundOffValue)
                 
                    gstCall("Round off sales", parseFloat (res[0].roundOffValue));
             }
               if (res[0].cardCharges!=0 && res[0].cardCharges!='' && res[0].cardCharges!='NaN' && res[0].cardCharges!= 'undefined') {
                 console.log(" res[0].cardCharges "+res[0].cardCharges)
                  gstCall("Other charges collected", parseFloat (res[0].cardCharges));
               }
             groupDetails(vocuherNumber);
             taxCaluclations(m=0);
      }else{ // if (voucherType != "Urd Purchase") 

            defaultBalanceSubscriber(name,'Cr');
             refId = "";
             db.transactionDetail.find({ "_id" : mongojs.ObjectId(str_array[0])},function (err,request) {
                            //    db.transactionDetail.find({ "_id" : mongojs.ObjectId(req.query.userIds)},function (err,request) {
                           salesPerson =  request[0].salesPerson;
                  gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,'Cr','L035') 
           
             })
            setTimeout(trHeader, 3000);
      }

   })
    }//finalCall
  trailRepeat  = "false" ; 
}//if trail
 
  

        
           
     // call (res[0].Transaction,)
     function defaultBalanceSubscriber(party,DefaultBalance) {
       // body...
     console.log("defaultBalanceSubscriber call"+party)

        insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,party,amountTotal,concat,DefaultBalance);
        

     }//defaultBalance
       function insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance) {
              // if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
              //   DefaultBalance = 'Dr';
              // }else{
              //     DefaultBalance = 'Cr';
              // }
              voucherRowNumber++;
            db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate: new Date(currentdate),
           accountId:name,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
           
            })
       };//insertCall


         function taxCaluclations(m) {
         if (m<length) {
              console.log("str_array[i] "+str_array[m]+" m "+m+" len "+length);
              // m++;
              // taxCaluclations(m);
              if (m >= 0) {
                   db.transactionDetail.find({ "_id" : mongojs.ObjectId(str_array[m])},function (err,request) {
                            //    db.transactionDetail.find({ "_id" : mongojs.ObjectId(req.query.userIds)},function (err,request) {
                           salesPerson =  request[0].salesPerson;
                            //vocuherNumber = request[0].voucherNo;
                            if (request[0].Transaction == "RD Purchase") {
                              refId = request[0].RefId;
                            }else{
                              refId = "";
                            }
                            if(taxDuplicateCheck.indexOf(request[0].taxSelection) == -1) {
                                taxDuplicateCheck.push(request[0].taxSelection);
                                noRepeatedCall();
                            }else{
                                       m++;
                                       taxCaluclations(m);
                                       console.log(" nonon no  taxSelection "+request[0].taxSelection+" len ")
                                       
                                 }
                            function noRepeatedCall() {
                                  if (request[0].taxSelection != 'undefined') {
                                       db.transactionDetail.find({ "taxSelection" : request[0].taxSelection,voucherNo:request[0].voucherNo },function (err,data) {
                                           console.log(" taxSelection "+request[0].taxSelection+" len "+data.length);
                                          
                                    db.transactionDetail.aggregate([{$match:{ "taxSelection" : request[0].taxSelection,voucherNo:request[0].voucherNo}},
                                            { "$lookup": {  "from": "tax",   "localField":   "taxname", "foreignField":  "taxSelection", "as": "taxCollection"}},
                  
                                             { "$unwind": "$taxCollection" },
                                              { "$redact": { 
                                                  "$cond": [
                                                      { "$eq": [ "$taxSelection", "$taxCollection.taxname" ] }, 
                                                      "$$KEEP", 
                                                      "$$PRUNE"
                                                  ]
                                              }},
                                             //{$group:{_id :{taxSelection:"$taxSelection","purchaseId":"$taxCollection.purchaseId","salesId":"$taxCollection.salesId"} ,
                                             //sgst:{$sum:"$withinstatesgst"},
                                            //   cgst:{$sum:"$withinstatecgst"},igst:{$sum:"outofstateigst"}
                                            {$group:{_id :{taxSelection:"$taxSelection","purchaseId":"$taxCollection.purchaseId","salesId":"$taxCollection.salesId",
      "PurchaseAC":"$taxCollection.PurchaseAC","SaleAc":"$taxCollection.SaleAc","withinstate":"$taxCollection.withinstate" } ,
   sgst:{$sum:"$withinstatesgst"},
                                                   cgst:{$sum:"$withinstatecgst"},igst:{$sum:"$outofstateigst"}     
                                               }} ],function (err,data1) {
                                                       console.log(data1);
                                                       //console.log("  enteretrweytwqywteqweyt "+data1[0]._id.withinstate)
                                                    if (data1[0]._id.withinstate == "yes") {
                                                        // console.log(" start  enteretrweytwqywteqweyt ")
                                                        // console.log(data1);
                                                        // console.log(data1[0]._id.salesId);
                                                        // console.log(data1[1]._id.salesId);
                                                        // console.log(data1[0].sgst);
                                                        //  console.log(data1[0].cgst);

                                                        // console.log(data1[0]._id.purchaseId);
                                                        // console.log(data1[1]._id.purchaseId);
                                                        if (voucherType != "RD Purchase") {
                                                           // gstCall(data1[0]._id.salesId,data1[0].sgst);
                                                           // gstCall(data1[1]._id.salesId,data1[1].cgst );
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].sgst,concat,'Cr',data1[0]._id.salesId) 
       
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[1].cgst,concat,'Cr',data1[1]._id.salesId) 
       
                                                        }else if(voucherType == "RD Purchase"){
                                                           // gstCall(data1[0]._id.purchaseId,data1[0].sgst);
                                                           // gstCall(data1[1]._id.purchaseId,data1[1].cgst);
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].sgst,concat,'Dr',data1[0]._id.purchaseId) 
       
                                                           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[1].cgst,concat,'Dr',data1[1]._id.purchaseId) 
         
                                                        }
                                                    } else if(data1[0]._id.outofstate == "yes"){
                                          
                                                                if (voucherType != "RD Purchase") {
                                                                       gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].igst,concat,'Cr',data1[0]._id.salesId) 
       
                                                                     //gstCall(data1[0]._id.salesId,data1[0].igst );
                                                                }else if(voucherType == "RD Purchase"){
                                                                       gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,data1[0].igst,concat,'Dr',data1[0]._id.purchaseId) 
       
                                                                    // gstCall(data1[0]._id.purchaseId,data1[0].igst);
                                                                }
                                            
                                                    }

                                                        m++;
                                                          taxCaluclations(m);
                                               })//aggregate



                                       })//find
                                      
                                 };//taxSelection undefined
                            }//noRepeatedCall
                            
                          
                  })//transactionDetail

              }// if (m == 0)
         }//  if (m<length)

    }//taxCaluclations
    
      
  function gstCall(gst,gstamount) {
      console.log(" gst "+gst)
       db.ledgeraccounts.find({"accountName" : gst },function (err,response) {
           //gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,gstamount,narration,response[0].mggroup.DefaultBalance,response[0].accountName) 
           gstInsertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,name,gstamount,concat,'Cr',response[0].accountIds) 
         
       }) 
 
  }//gstCall
  
      
 function gstInsertCall  (currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance,accountName) {
           
            if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                DefaultBalance = 'Cr';
            }else{
                DefaultBalance = 'Dr';
            }
   
              voucherRowNumber++;
              amountTotal = parseFloat(amountTotal).toFixed(2);
             db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate:new Date(currentdate),
                 accountId:accountName,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
           
            })
}//gstInsertCall
 function groupDetails(argument) {
   // body...
   console.log(" hjjjjjjjjjjjjjjjj hyyujjjjjjjjjj "+argument)
    // $scope.TransactionPurchase = [{"TransactionType":"Regular Sale"},{"TransactionType":"Purchase Return"}, {"}, {"}, {"TransactionType":"Approval Sale"}]
   if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
   // if(voucherType.toUpperCase().match(/SALE/g)  == "SALE"){
    //alert("Sale ")
    db.transactionDetail.aggregate([
      {$match:{"voucherNo" :argument  }},
       { "$lookup": { 
                            "from": "inventoryGroupMaster", 
                            "localField":   "SalesAcc", 
                            "foreignField":  "AccNo", 
                            "as": "inventorygroup"
                         }
            },
             {$unwind:"$inventorygroup"},
              {$unwind:"$inventorygroup.SalesAcc"},
        
            { "$project" :{ "AccNo":1,  "taxval":1,"inventorygroup.SalesAcc.AccNo" :1,cmpTo: { $cmp: [ "$inventorygroup.SalesAcc.AccNo", "$AccNo"] }}},
           {$match:{"cmpTo" :0 }},
            {$group:{_id:{name:"$AccNo",name1:"$inventorygroup.SalesAcc.AccNo"},"score" : {$sum : "$taxval"}}}
        
             
              
           ],function (err,res) {
             
             for (var j = res.length - 1; j >= 0; j--) {
                 gstCall(res[j]._id.name,res[j].score)
                 if ( j == 0) {
                //console.log("trHeader j"+j);
                 // trHeader()
                  setTimeout(trHeader, 3000);
                 }
             }
             
           
            })
   // $scope.TransactionSales = [{"TransactionType":"Urd Purchase"},{"TransactionType":"RD Purchase"},{"TransactionType":"Sale Return"},{"TransactionType":"Receipt Voucher"},{"TransactionType":"Approval Return"}]//TransactionType == "Valuation"
   
    }else if(voucherType == 'Urd Purchase' || voucherType == "RD Purchase" ||voucherType == "Sale Return" ||voucherType == "Receipt Voucher"){
     //}else if(voucherType.toUpperCase().match(/PURCHASE/g) == "PURCHASE"){
     
          db.transactionDetail.aggregate([
      {$match:{"voucherNo" :argument  }},
         { "$lookup": { 
                            "from": "inventoryGroupMaster", 
                            "localField":   "PurchaseAcc" , 
                            "foreignField":  "AccNo", 
                            "as": "inventorygroup"
                         }
            },
             {$unwind:"$inventorygroup"}, 
            
              {$unwind:"$inventorygroup.PurchaseAcc"},
        
            { "$project" :{ "AccNo":1,  "taxval":1,"inventorygroup.PurchaseAcc.AccNo" :1,cmpTo: { $cmp: [ "$inventorygroup.PurchaseAcc.AccNo", "$AccNo"] }}},
           {$match:{"cmpTo" :0 }},
            {$group:{_id:{name:"$AccNo",name1:"$inventorygroupPurchaseAcc.AccNo"},"score" : {$sum : "$taxval"}}}
             
              
           ],function (err,res) {
             
             for (var j = res.length - 1; j >= 0; j--) {
                 gstCall(res[j]._id.name,res[j].score)
                 if ( j == 0) {
                   console.log("trHeader j"+j);
                  //trHeader()
                  setTimeout(trHeader, 3000);
                 }
             }
             
           
            })
    }

  
 
}//groupcall


 function trHeader() {
   console.log("trHeader call1")
     //db.trDetails.find({vocuherId:vocuherId},function(err,doc){
       // res.json(doc);
           console.log("voucherType voucherType voucherType voucherType voucherType "+salesPerson)
          // console.log(doc);
          db.trHeaders.insert({voucherId:voucherId,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(currentdate),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:refId,
                amount:Decimal128.fromString(amountTotal),numberOfDetails:voucherRowNumber,userId:salesPerson,narration:'',remarks:''},function (err,res) {
               
               // changeNumberType(voucherId)
                // var billTypeForAccounts = req.query.Billtype;
               // check
                if (billTypeForAccounts == 'Cash') {
                      if (voucherType != 'Urd Purchase') {
                            voucherId =  voucherId+1;
                            voucherRowNumber = 0;

                           if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                                //DefaultBalance = 'Dr';
                                insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,ledgerAccountId,amountNet,concat,'Cr');
                                //gstCall("Cash on hand", amountTotal);
                                receiptAndPaymentCallTrDetails(currentdate,currentYear,voucherType,vocuherNumber,suffix,ledgerAccountId,amountNet,concat,'Dr','L011')
                           
                           }else{
                                //DefaultBalance = 'Cr';
                                insertCall(currentdate,currentYear,voucherType,vocuherNumber,suffix,ledgerAccountId,amountTotal,concat,'Dr');
                                // gstCall("Cash on hand", amountTotal);
                                receiptAndPaymentCallTrDetails(currentdate,currentYear,voucherType,vocuherNumber,suffix,ledgerAccountId,amountTotal,concat,'Cr','L013')
                           }
                      }//urd purchase  
                }//if (billTypeForAccounts == 'Cash') {};

          })//db.trHeaders
      
   
 }//trHeader

function receiptAndPaymentCallTrDetails  (currentdate,currentYear,voucherType,vocuherNumber,suffix,name,amountTotal,concat,DefaultBalance,accountName) {
           
              voucherRowNumber++;
             db.trDetails.insert({voucherId:voucherId,voucherRowNo:voucherRowNumber,voucherDate:new Date(currentdate),
                 accountId:accountName,amount:Decimal128.fromString(amountTotal),transType:DefaultBalance},function (err,res) {
                  
               if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                    inVoiceCall('Receipts',inVoiceSeriesConfig) 
               }else{
                    inVoiceCall('Payments',inVoiceSeriesConfig) 
              }
                  
            })
}//receiptAndPaymentCallTrDetails 
function inVoiceCall(Transaction,voucherSeriesType) {
   console.log("  inVoiceCall inVoiceCallinVoiceCall check "+Transaction);
   
  var Transaction = Transaction;
  
  var voucherSeriesType =  voucherSeriesType;
  var classType = null;
  db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
   // console.log(doc);
    classType = doc[0].TransactionClass;
  })
  db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
        //
    console.log(" record transactionInvoice "+doc.length);
      if (doc.length == 0) {
          console.log(" insert call ");
          insertNewTransactionInvoice();
      }else{
              console.log(" update  call ");
              insertUpdateTransactionInvoice();
           }
  })//transactionInvoice
  function insertNewTransactionInvoice() {
     // console.log(" insertNewTransactionInvoice call ");
      db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){
    
            // console.log(doc);
            if (voucherSeriesType == "StartingTransactionClassNo" ) {
                    var voucherSeries =  doc[0].StartingTransactionClassNo ;
                    db.transactionInvoice.find({"TransactionClass":classType},function(err,doc1){
                        if (doc1.length == 0) {
                         // var TransactionNoCheck = 
                          voucherSeries =  doc[0].StartingTransactionClassNo ;
                
                        }else{
                          voucherSeries = Number(doc1[0].TransactionNo) +1;
                        }
                      //console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      //console.log(" if multi  check udate call "+doc1[0].TransactionNo);
                      db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true })
                           
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                            console.log(doc.TransactionPrefix+doc.TransactionNo);
                             receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)
                             //res.json(doc.TransactionPrefix+doc.TransactionNo);
                        })
                    })
          
            }else{
                    var voucherSeries =  doc[0].StartingTransactionTypeNo ;
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                          console.log(doc.TransactionPrefix+doc.TransactionNo);
                          // res.json(doc.TransactionPrefix+doc.TransactionNo);
                           receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)

                        })

                 }
          
      })
  }//insertNewTransactionInvoice
   function insertUpdateTransactionInvoice() {
      console.log("insertUpdateTransactionInvoice");

      if (voucherSeriesType == "StartingTransactionClassNo" ) {
              
                    //var voucherSeries =  doc[0].StartingTransactionClassNo ;
          
               db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true },function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log(" if multi "+classType);
                     //  res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
      }else{
              db.transactionInvoice.update({"TransactionType":Transaction},  { $inc: {"TransactionNo": 1 }},function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log("else one "+classType);
                      // res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
           }
     
      
   }//insertUpdateTransactionInvoice
//});
}//inVoiceCall

 function receiptAndPaymentCallTrHeaders(vocuherNumber,voucherType,voucherClass,suffix) {
                           
   db.trHeaders.insert({voucherId:voucherId,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(currentdate),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:refId,
                amount: Decimal128.fromString(amountNet),numberOfDetails:voucherRowNumber,userId:salesPerson,narration:'',remarks:''},function (err,res) {
               // changeNumberType(voucherId)
               })
 }//receiptAndPaymentCall


});//trCollectionCreation


app.get('/api/paymentsCreation',function(req,res){   
      var BillNo = req.query.BillNo;
      var voucherNo = req.query.voucherNo;
       var userId = req.query.userId;
       var accountType = req.query.accountType;
      console.log(" BillNo  userId "+BillNo+req.query.userId+req.query.voucherNo+req.query.accountType);

      var voucherIdPayment = 0;
      var currentdate = null;
      var currentYear = null;
      var voucherType = null;
      var  vocuherNumber =null;
      var suffix = null;
      var name = null;
      var amountTotal = null;
      var amountNet = null;
      var narration = null;
      var billtype = null;
      var voucherRowNumber = 0;
      var salesPerson = null;
      var refId ;
      findCall(req.query.voucherNo);
    
      function findCall(argument) {
                db.saleInvoice.find({ "voucherNo" :argument },function (err,res) {

                console.log(res)
                currentdate =  res[0].date ;
                billtype =  res[0].billtype ;

                currentYear = res[0].date.slice(0, 4);

                voucherType = res[0].Transaction;

                vocuherNumber = res[0].voucherNo;
                console.log(" res[0].voucherNo res[0].voucherNo "+res[0].voucherNo)
                //suffix = res[0].voucherNo.slice(0, 2);
                name = res[0].partyname ;

                //to find voucherClass
                db.transactionSeriesInvoice.find({ "TransactionType" :voucherType },function (err,resData) {
                voucherClass =  resData[0].TransactionClass ;
                suffix = resData[0].TransactionPrefix ;
               // trHeaderCall (amountNet,narration)
                voucherIdCall()
                //trHeaderCall (amountTotal,narration);
                })

                })
      }//finalCall
      function voucherIdCall() {
                db.trHeaders.find({}).sort({_id:-1}).limit(1,function(err,data){
                  //res.json(doc);
                  console.log(data.length);
                  if (data.length == 0) {
                      voucherIdPayment = 1;
                  }else{
                         voucherIdPayment =  Number(data[0].voucherId) ; 
                         console.log(" voucher   voucher "+data[0].voucherId)
                         voucherIdPayment++;
                       }
                  //if (req.query.accountType == 'payments') {
                      paymentsCall();
                  // }else{
                  //   receiptsCall();
                  //}   
                       
                })//db.trHeaders

       }//voucherIdCall
      
      function paymentsCall() {
            db.payments.find({BillNo:req.query.BillNo},function(err,documents){
              
                  //res.json(doc);
                  console.log(documents);
                  amountNet = documents[0].PaidAmount;
                  narration = documents[0].Narration;
                  customerDetails(documents[0].partyname); 
                    function customerDetails(name) {
                      db.subscribers.find({subscriber:name},function (err,subscriber) {
                        console.log(subscriber)
                        console.log("subscriber                                         call ")
                        console.log(subscriber[0].ledgerID);
                          db.ledgeraccounts.find({"_id" : mongojs.ObjectId(subscriber[0].ledgerID)},function (err,ledger) {
                            console.log(ledger)
                            //console.log("subscriber                                         call ")
                            console.log("acccccccccccccccccccccccccccccccccccccccccccc"+ledger[0].accountIds);
                            trDetailsInsertCall(documents[0].PaidAmount,ledger[0].accountIds,'Dr')
                            //defaultBalanceSubscriber(ledger[0].accountIds);
                          })

                      })
                  }//customerDetails
                  // trDetailsInsertCall(documents[0].PaidAmount,name,'Dr')
                  //trHeaderCall (documents[0].PaidAmount,documents[0].Narration)
                  for (var billNoIndex = documents.length - 1;billNoIndex >= 0; billNoIndex--) {
                    //Things[i]

                    trDetailsCallPayment(documents[billNoIndex].Mode,billNoIndex,documents[billNoIndex].Amount)

                  };
            });// db.receipts
      }//payments
      
      function trDetailsCallPayment (Mode,index,Amount) {
        if (Mode == "Cash") {
           console.log(" iam cash L011 ")
           console.log(" PaidAmount "+Amount)
           trDetailsInsertCall(Amount,'Lca1','Cr',index)
        }else if (Mode == "Card") {
           console.log(" iam card PaidAmount");
            trDetailsInsertCall(Amount,'Lcd1','Cr',index)
       

        }else if (Mode == "Cheque"){
            trDetailsInsertCall(Amount,'Lcq1','Cr',index)
       
        }
        // body...
      }//trDetailsCallPayment
      
      
      function trDetailsInsertCall (amount,accountId,transType,index) {
            voucherRowNumber++;
            var amount = parseFloat(amount).toFixed(rupeesDecimalPoints);
            db.trDetails.insert({voucherId:voucherIdPayment,voucherRowNo:voucherRowNumber,voucherDate: new Date(),
                accountId:accountId,amount:Decimal128.fromString(amount),transType:transType},function (err,res) {
           
            })
            if (index == 0) {
                  //trHeaderCall (amountNet,narration);
                  // if (voucherType == "Regular Sale" || voucherType == "Purchase Return" ||voucherType == "Approval Sale" ) {
                  //     inVoiceCall('Receipts',inVoiceSeriesConfig,amountNet,narration) 
                  // }else{
                      inVoiceCall('Payments',inVoiceSeriesConfig,amountNet,narration) 
                 // }
            };

      }//trdetails

      ///
      function inVoiceCall(Transaction,voucherSeriesType,amountNet,narration) {
          console.log("  inVoiceCall inVoiceCallinVoiceCall check "+Transaction);

          var Transaction = Transaction;

          var voucherSeriesType =  voucherSeriesType;
          var classType = null;
          db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){

              // console.log(doc);
              classType = doc[0].TransactionClass;
          })
          db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
            //
          console.log(" record transactionInvoice "+doc.length);
          if (doc.length == 0) {
              console.log(" insert call ");
              insertNewTransactionInvoice();
          }else{
                  console.log(" update  call ");
                  insertUpdateTransactionInvoice();
               }
          })//transactionInvoice
      function insertNewTransactionInvoice() {
      // console.log(" insertNewTransactionInvoice call ");
      db.transactionSeriesInvoice.find({"TransactionType":Transaction},function(err,doc){

            // console.log(doc);
            if (voucherSeriesType == "StartingTransactionClassNo" ) {
                    var voucherSeries =  doc[0].StartingTransactionClassNo ;
                    db.transactionInvoice.find({"TransactionClass":classType},function(err,doc1){
                        if (doc1.length == 0) {
                         // var TransactionNoCheck = 
                          voucherSeries =  doc[0].StartingTransactionClassNo ;
                
                        }else{
                          voucherSeries = Number(doc1[0].TransactionNo) +1;
                        }
                      //console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      //console.log(" if multi  check udate call "+doc1[0].TransactionNo);
                      db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true })
                           
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                            console.log(doc.TransactionPrefix+doc.TransactionNo);
                             receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)
                             //res.json(doc.TransactionPrefix+doc.TransactionNo);
                        })
                    })
          
            }else{
                    var voucherSeries =  doc[0].StartingTransactionTypeNo ;
                      db.transactionInvoice.insert({"TransactionType":Transaction, "TransactionPrefix" : doc[0].TransactionPrefix,
                          "TransactionClass" :  doc[0].TransactionClass,"TransactionNo" : Number(voucherSeries)},function(err,doc){
                           //console.log(" transactionInvoice call ");
                          console.log(doc.TransactionPrefix+doc.TransactionNo);
                          // res.json(doc.TransactionPrefix+doc.TransactionNo);
                           receiptAndPaymentCallTrHeaders(doc.TransactionPrefix+doc.TransactionNo,doc.TransactionType,doc.TransactionClass,doc.TransactionPrefix)

                        })

                 }
          
      })
      }//insertNewTransactionInvoice
      function insertUpdateTransactionInvoice() {
      console.log("insertUpdateTransactionInvoice");

      if (voucherSeriesType == "StartingTransactionClassNo" ) {
              
                    //var voucherSeries =  doc[0].StartingTransactionClassNo ;
          
               db.transactionInvoice.update({"TransactionClass":classType},  { $inc: {"TransactionNo": 1 }}, { multi: true },function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log(" if multi "+classType);
                     //  res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix,amountNet,narration)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
      }else{
              db.transactionInvoice.update({"TransactionType":Transaction},  { $inc: {"TransactionNo": 1 }},function(err,doc){
                    
                    db.transactionInvoice.find({"TransactionType":Transaction},function(err,doc){
                    
                      console.log(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      console.log("else one "+classType);
                      // res.json(doc[0].TransactionPrefix+doc[0].TransactionNo);
                      receiptAndPaymentCallTrHeaders(doc[0].TransactionPrefix+doc[0].TransactionNo,doc[0].TransactionType,doc[0].TransactionClass,doc[0].TransactionPrefix,amountNet,narration)
                             
                    })
                     // console.log(doc.TransactionPrefix+doc.TransactionNo);
                })
           }


      }//insertUpdateTransactionInvoice
      //});
      }//inVoiceCall
////

function receiptAndPaymentCallTrHeaders(vocuherNumber,voucherType,voucherClass,suffix,amountTotal,narration) {
      var amountTotal = parseFloat(amountTotal).toFixed(rupeesDecimalPoints);
          
          db.trHeaders.insert({voucherId:voucherIdPayment,voucherClass:voucherClass,voucherType:voucherType,voucherDate:new Date(),prefix:currentYear,vocuherNumber:vocuherNumber,suffix:suffix,referenceNumber:'',
              amount:Decimal128.fromString(amountTotal),numberOfDetails:voucherRowNumber,userId:req.query.userId,narration:narration,remarks:''},function (err,res) {
          })                     
  
 }//receiptAndPaymentCall
    

})//api/pay

};