/* Author: Andrew */

(function( $ ){

	/* default configuration */
	var Settings = {

		Phone : {
			"IncludeMe": true,
			"MyMessage" : "Please enter at least {0} digits" 
		},
		State : {
			 "IncludeMe": true,
			 "MyMessage" : "U.S. and Canada Registrants Please Enter a State",
			 "AddMexico": false
			},
		ZipCode : { 
			"IncludeMe": true,
			"MyMessage" : "U.S. and Canada Registrants Please Enter a Zip/Postal Code" ,
			"AddMexico": false
		},
		ConfEmail : { 
			"IncludeMe": true,
			"MyMessage" : "Email and Confirm Email Address must match" 

		},
		Handicap : { 
			"IncludeMe": true,
			"MyMessage" : "Please describe the special services that you will require onsite"
		}, 
		URL : {
			"IncludeMe" : true,
			"MyMessage" : "Please enter a valid URL"
		},
		TwitterHandle : {
			"IncludeMe" : true,
			"MyMessage" : "Please enter a valid Twitter handle, beggining with the '@' symbol followed by no more than 15 characters (for example: @yourhandle)."
		}
	},

	/* public methods */
	methods = {

		init : function( mySettings ){

			
			Settings = $.extend( true, Settings, mySettings );    //true makes it a recursive merge

			//console.log(Settings)

			if( Settings.Phone.IncludeMe ) {

				$(".cdsphone").each(function(){
					$(this).rules("add", {
						minlength: 10,
						messages: {
							minlength: $.format(Settings.Phone.MyMessage)
						}
					});//rules()
				});//each()
			}//if()




			if( Settings.State.IncludeMe ) {
				$("#State, #state").each(function(){
					$(this).rules("add", {
						required: function(element) {
							return ( ($("#Country").val() === "United States") || ($("#Country").val() === "Canada") || ($("#Country").val() === "Mexico"  && Settings.State.AddMexico )  )},
						messages: {
						 	required: $.format(Settings.State.MyMessage)
						}
					});//rules()
				});//each()
			}//if()



			if( Settings.ZipCode.IncludeMe ) {
				$("#ZipCode, #zipcode, #Zipcode").each(function(){
					$(this).rules("add", {
						required: function(element) {
							return ( ($("#Country").val() === "United States") || ($("#Country").val() === "Canada") || ($("#Country").val() === "Mexico" && Settings.ZipCode.AddMexico )  )},
						messages: {
							required: $.format(Settings.ZipCode.MyMessage)
						}
					});//rules()
				});//each()
			}//if()



			if( Settings.ConfEmail.IncludeMe ) {
				$("#ConfEmail, #confEmail, #confemail").each(function(){
					$(this).rules("add", {
						equalTo: '#Email',
						messages: {
							equalTo: $.format(Settings.ConfEmail.MyMessage)
						}
					});//rules()
				});//each()
			}//if()




			if( Settings.Handicap.IncludeMe ) {
				$("#HandicapText").each(function(){
					$(this).rules("add", {
						required: function(element){
							var textVal = $("#HandicapText").val(); 
							textVal = $.trim(textVal);
							return ( $("#HandicapBtn").is(":checked") && textVal === ""  )},
						messages: {
							required: $.format(Settings.Handicap.MyMessage)
						}
					});//rules()
				});//each()
			}//if()		




			if( Settings.URL.IncludeMe ) {

				$(".cdsurl").each(function(){
					$(this).rules("add", {
						url: true,
						messages: {
							url: $.format(Settings.URL.MyMessage)
						}
					});   //rules()

					customURL( $(this) );	
				});//each()
			}//if()



			if( Settings.TwitterHandle.IncludeMe ) {

			// 	$(".twitterhandle").each(function(){
			// 		$(this).rules("add", {
			// 			regex: "/@([A-Za-z0-9_]{1,15})/",
			// 			messages: {
			// 				regex: $.format(Settings.TwitterHandle.MyMessage)
			// 			}
			// 		});   //rules()

			// 	});//each()
			 }//if			

		},

		Phone : function(){

		},

		State : function(){

		},

		ZipCode : function(){

		},

		ConfEmail : function(){

		},

		Handicap : function(){

		},

		URL: function() {
			
		},
		validateInputArray: function( inputName, errorMsg ) {

			 customInputArrayErrorTarget( inputName );
			 jQuery.validator.addMethod( inputName + "_check" , function (value, element) { return  $("[name='"+inputName+"']:checked").size() > 0; }, errorMsg);	
				

			var ruleObj = {};
			ruleObj[inputName + "_check"] = true;
			//console.log(ruleObj);

			$("[name='"+inputName+"_hidden']").rules("add", ruleObj );

			$("input[name='"+inputName+"']").click(function(){
				if($(this).filter(":checked").size() > 0 ){
					$("label[for='"+inputName+"_hidden']").remove();
				}
			});

			// $("input[name='"+inputName+"']").click( function(){
			// 	$("label[for^='"+inputName+"_check']").filter(".error").remove();
			// });//click;


		},//validat input array
	},

	/* private methods */
	customURL = function( $field ) {

		$field.change( function () {
			var myval = $field.val();
			if ( myval.trim() !== "" ) {
				if(  ! (myval.substring(0,7) === "http://"  ||  myval.substring(0,8) === "https://")  ){
					myval = "http://" + myval;
					$field.val(myval);
					$field.blur();
				}
				if( myval.substring(0,14) === "http://http://"  || myval.substring(0,15) === "http://https://"  ) {
					myval = myval.substring(7, myval.length)
					$field.val(myval);
					$field.blur()

				}
			}			
		});//blur()
	}

	, customInputArrayErrorTarget= function( inputName) {

			 var $fieldArray = $("input[name='" + inputName + "']"),
			$targetField = $fieldArray.eq(0),
			$hiddenField = $( "<input type='hidden'  value='' name='CDSValidate_" + inputName + "_hidden'  id= 'CDSValidate_" + inputName + "_hidden'  />") ;
			$hiddenField.insertBefore( $targetField );
	}


	/* plugin control */
	$.fn.CDSValidate = function ( method ) {

		if ( methods[method] ){
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1));
		} else if ( typeof method === 'object'  ||  ! method  ){
			return methods.init.apply( this, arguments );
		} else {
			$.error( method + ' is not a valid method in jQuery.CDSValidate');
		}

	};

}) ( jQuery ); //dolla dolla bill yall
