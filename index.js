( function( window, document ) {

   let thisPageURL = window.location.href;

   //make sure it ends with slash
   thisPageURL = ( thisPageURL.charAt( [ thisPageURL.length - 1 ] ) == "/" ) ? thisPageURL : thisPageURL.concat( "/" )

   //footer date insertion:
   var thisYear = new Date().getFullYear();
   document.getElementById( "currentYear" ).innerHTML = thisYear;


   //  controlling the visibility of commenting panel
   let commentBlock = document.querySelectorAll( "div.comment-block" )
   commentBlock.forEach( ( item ) => {
      let replyAnchor = item.querySelector( "a.post-reply" )
      replyAnchor.addEventListener( "click", ( event ) => {
         item.querySelector( "div.reply-form" ).style.display = "block"
      } )
      let closeBtn = item.querySelector( "a.closeBtn" )
      closeBtn.addEventListener( "click", () => {
         item.querySelector( "div.reply-form" ).style.display = "none"
      } )
   } )

   // local storage used for forms   
   // once user inputs name and email, keep it show by default 
   let sg_name = localStorage.sg_name || null;
   let sg_email = localStorage.sg_email || null;
   const forms = document.querySelectorAll( `form` )
   if ( sg_name && thisPageURL.match( /speakgeorgian/gi ) && !( thisPageURL.match( /control/gi ) ) ) {
      document.querySelectorAll( `[name*='name']` ).forEach( i => i.value = sg_name )
   }
   if ( sg_email && thisPageURL.match( /speakgeorgian/gi ) && !( thisPageURL.match( /control/gi ) ) ) {
      document.querySelectorAll( `[name*='email']` ).forEach( i => i.value = sg_email );
   }

   forms.forEach( item => {
      item.addEventListener( "submit", ( event ) => {
         if ( thisPageURL.match( /speakgeorgian/gi ) != null ) {
            sg_name = event.target.querySelector( "[name*='name']" ).value
            sg_email = event.target.querySelector( "[name*='email']" ).value

            localStorage.setItem( "sg_name", sg_name );
            localStorage.setItem( "sg_email", sg_email );
         }
      } )
   } )


   // comments recieved confirmation alert
   commentFormsOnly = document.querySelectorAll( "section.comments form" );
   commentFormsOnly.forEach( i => i.addEventListener( "submit", () => {

      // first checking the website's language
      if ( thisPageURL.match( /\/fa\//gi ) ) {
         alert( "از اینکه نظر خود را با ما سهیم شدید سپاسگزاریم! \nنظرات ابتدا بررسی شده و تا 24 ساعت در سایت منتشر می شوند " )
      } else {
         alert( "Thank you for sharing your ideas with us! \n All comments are moderated and published in a few hours." )
      }
   } ) )

   // for managing admin area
   const approveComment = document.querySelectorAll( "a.approveComment" )
   approveComment.forEach( item => {
      item.addEventListener( "click", ( event ) => {
         const id = event.target.getAttribute( "data-ref" )
         const ref = event.target
         const idElements = id.split( "_" )

         const text = document.querySelector( `tr#${id} td textarea` ).value.replace( /\n/g, "<br>" )
         const checkBox = document.querySelector( `tr#${id} td input[type="checkbox"]` ).checked
         const updatedComment = {
            id: Number( idElements[ 2 ] ),
            articleID: Number( idElements[ 1 ] ),
            text: text,
            isAdmin: checkBox
         }
         const url = thisPageURL + "pass/?" + "id=" + updatedComment.id + "&articleID=" + updatedComment.articleID + "&text=" + updatedComment.text + "&isAdmin=" + updatedComment.isAdmin

         fetch( url )
         ref.style.backgroundColor = "lime"
         ref.innerText = "Approved"
         location.reload( true )
      } )
   } )


   function timeConvertor( time ) {
      window.addEventListener( "DOMContentLoaded", () => {
         time.forEach( item => {
            const optinTime = item.getAttribute( "data-ref" )
            const optinDate = `${new Date(Number(optinTime) ).toDateString()} - ${new Date(Number(optinTime) ).toLocaleTimeString()}`
            item.innerText = optinDate;
         } )
      } )
   }

   // on admin for contacts managment
   const convertOptinTime = document.querySelectorAll( "td p.optinTime" );
   timeConvertor( convertOptinTime )
   const convertNextTime = document.querySelectorAll( "td p.nextTime" );
   timeConvertor( convertNextTime )

   const updateContact = document.querySelectorAll( "td a.updateContact" );

   updateContact.forEach( item => {
      item.addEventListener( "click", ( event ) => {
         const id = event.target.getAttribute( "data-ref" )
         const ref = event.target

         const name = document.querySelector( `tr#${id} td input[name="nameField"]` ).value;
         const email = document.querySelector( `tr#${id} td input[name="emailField"]` ).value;
         const next = document.querySelector( `tr#${id} td input[name="nextField"]` ).value;
         const cycle = document.querySelector( `tr#${id} td input[name="cycleField"]` ).value;


         const updatedContact = {
            index: id.slice( 2 ),
            name: name,
            email: email,
            next: Number( next ),
            cycle: Number( cycle )
         }

         fetch( thisPageURL, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( updatedContact )
         } ).then( data => data )
         ref.style.backgroundColor = "lime"
         ref.innerText = "Updated"
         location.reload( true )
      } )
   } )



   //chaning backGround color for free audio lessons on listen.ejs:
   if ( document.getElementById( "listen" ) ) {
      const cycleFree = Number( document.getElementById( "listen" ).getAttribute( "data-ref" ) )
      switch ( cycleFree ) {
         case 0:
            document.getElementById( "l1" ).style.backgroundColor = "#330600"
            break;
         case 1:
            document.getElementById( "l1" ).style.backgroundColor = "#660c00"
            document.getElementById( "l2" ).style.backgroundColor = "#330600"
            break;
         case 2:
            document.getElementById( "l1" ).style.backgroundColor = "#991200"
            document.getElementById( "l2" ).style.backgroundColor = "#660c00"
            document.getElementById( "l3" ).style.backgroundColor = "#330600"
            break;
         case 3:
            document.getElementById( "l1" ).style.backgroundColor = "#cc1800"
            document.getElementById( "l2" ).style.backgroundColor = "#991200"
            document.getElementById( "l3" ).style.backgroundColor = "#660c00"
            document.getElementById( "l4" ).style.backgroundColor = "#330600"
            break;
         case 4:
            document.getElementById( "l1" ).style.backgroundColor = "#ff1e00"
            document.getElementById( "l2" ).style.backgroundColor = "#cc1800"
            document.getElementById( "l3" ).style.backgroundColor = "#991200"
            document.getElementById( "l4" ).style.backgroundColor = "#660c00"
            document.getElementById( "l5" ).style.backgroundColor = "#330600"
            break;
         default:
            document.getElementById( "l1" ).style.backgroundColor = "#ff1e00"
            document.getElementById( "l2" ).style.backgroundColor = "#cc1800"
            document.getElementById( "l3" ).style.backgroundColor = "#991200"
            document.getElementById( "l4" ).style.backgroundColor = "#660c00"
            document.getElementById( "l5" ).style.backgroundColor = "#330600"
            break;
      }
   }


   //email form validation:
   const pageHasEmailForm = document.querySelectorAll( "input[type='email']" )
   if ( thisPageURL.match( /\/fa/gi ) ) {
      if ( pageHasEmailForm.length > 0 ) {
         document.querySelector( "form" ).addEventListener( "submit", function( event ) {
            for ( var i = 0; i < event.target.length; i++ ) {
               if ( event.target[ i ].name == "name" ) {
                  let enteredName = event.target[ i ].value;
                  if ( ( enteredName.match( /^\s+$/ ) || enteredName.match( /^$/ ) ) ) {
                     alert( "قسمت نام در فرم نمی تواند خالی باشد " );
                     event.preventDefault();
                     break;
                  } else if ( ( enteredName.match( /\d/ ) ) ) {
                     alert( " نام شما نمی تواند فقط حاوی رقم باشد! \n لطفا یک نام صحیح وارد کنید." );
                     event.preventDefault();
                     break;
                  }

               } else if ( event.target[ i ].name == "email" ) {
                  var entered = event.target[ i ].value;

                  if ( !( entered.match( /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-Z0-9]{2,4}$/ ) ) ) {
                     alert( "لطفا یک آدرس ایمیل معتبر وارد کنید!" );
                     event.preventDefault();
                     break;
                  }
               }

            }
         } )
      }
   } else {
      if ( pageHasEmailForm.length > 0 ) {
         document.querySelector( "form" ).addEventListener( "submit", function( event ) {
            for ( var i = 0; i < event.target.length; i++ ) {
               if ( event.target[ i ].name == "name" ) {
                  let enteredName = event.target[ i ].value;

                  if ( ( enteredName.match( /^\s+$/ ) || enteredName.match( /^$/ ) ) ) {
                     alert( "You cannot leave the name field blank! " );
                     event.preventDefault();
                     break;
                  } else if ( ( enteredName.match( /\d/ ) ) ) {
                     alert( "Ok, I know you are number 1 in everything! But your name cannot be made of numbers. \n Please enter a valid name!" );
                     event.preventDefault();
                     break;
                  }
               } else if ( event.target[ i ].name == "email" ) {
                  var entered = event.target[ i ].value;

                  if ( !( entered.match( /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-Z0-9]{2,4}$/ ) ) ) {
                     alert( "Please enter a valid email address!" );
                     event.preventDefault();
                     break;
                  }
               }

            }
         } )
      }
   }

   //random user's testimonial display on homepage
   if ( document.querySelectorAll( "blockquote" ) ) {
      if ( thisPageURL.match( /\/fa\//gi ) ) {
         fetch( "/public/testimonial/fa.json" ).then( res => res.json() ).then( res => {
            let items = res.length
            let randomItem = Math.floor( Math.random() * items )
            document.querySelectorAll( "blockquote" ).forEach( item => {
               item.innerHTML = res[ randomItem ]
            } )
         } )
      } else {
         fetch( "/public/testimonial/en.json" ).then( res => res.json() ).then( res => {
            let items = res.length
            let randomItem = Math.floor( Math.random() * items )
            document.querySelectorAll( "blockquote" ).forEach( item => {
               item.innerHTML = res[ randomItem ]
            } )
         } )
      }
   }


   // google analytics: 
   window.dataLayer = window.dataLayer || [];

   function gtag() { dataLayer.push( arguments ); }
   gtag( 'js', new Date() );
   gtag( 'config', 'UA-133712275-1' );


} )( window, document )
