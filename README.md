Description¶
This is a jQuery plugin that validates things that seem to be universal on CDS reginfo pages.   It builds upon the jQuery Validator plugin and is therefore dependent on it.  With your adding of as little as 24 characters of code, this plugin will

Make sure Email and ConfEmail match
Make sure all phone number input fields (phone, fax, mobile, etc) have 10 characters
Fields that need URLs as a data type are user-friendly
ZipCode and State are always required for Canada and United States registrants
HadicapText is always required when HandicapBtn is checked.  

There are numerous options that will eventually become available.  But a basic implementation will give you all of the above.  

Edit
Reason for Being¶
I hate getting edits.  I especially hate getting the same edits show after show.  I was determined to never, ever see again an edit such as "Phone and Fax aren't requiring 10 digits".  I can tell you since I started using this, that I have never seen that edit since.  

Edit
Dependencies¶
(scripts must be loaded in this same order as well)

jQuery Library(1.8.2 or higher)
jQuery validator plugin (now at http://jqueryvalidation.org/ - but this is the orignal one by Jorn Zaefferer)
CDSValidate plugin (sos->cds core-> CoreJS->jquery.validate.CDSValidate.js) 

Edit
Helpful, but not required¶


familiarty with the jQuery Validator plugin
div-based form layout. 
CSS framework such as Zurb foundation or Twitter Bootstrap.  This will ensure aesthetically pleasing error messages.

Edit
Demonstration¶


https://dev1.cdsreg.com/register/CDSValidate_test/demo/main.html

Edit
Basic Implementation¶
Click on the demo link above, and then click the 'implementation steps' link at the bottom of the page. 