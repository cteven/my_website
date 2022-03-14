let arrow;
let dropdownmenu;
let dropdowncontent;

$(document).ready(() => {
  console.log('ready');
  arrow = document.getElementById('arrow');
  dropdownmenu = document.getElementById('dropdownmenu');
  dropdowncontent = document.getElementById('content');

  document.getElementById('backgroundvideo').playbackRate = 3;

  /*window.onclick = function() {
    console.log(dropdowncontent.style.display);
    if(dropdowncontent.style.display == 'block')
      dropdowncontent.style.display = 'none';
  }*/
});


function dropdownMenuonclick() {
  console.log('clicked');
  console.log(arrow);
  if( dropdowncontent.style.display == 'block' ) {
    dropdowncontent.style.display = 'none';
    arrow.style.transform = 'rotate(135deg)';
    //arrow.style.backgroundColor = 'black';
    //dropdownmenu.style.backgroundColor = 'black';
  } else {
    dropdowncontent.style.display = 'block';
    arrow.style.transform = 'rotate(45deg)';
    //arrow.style.backgroundColor = '#4a820c';
    //dropdownmenu.style.backgroundColor = '#4a820c';
  }

}

function sendMailWithNameMessage() {

  var username = document.getElementById('username');
  var subject = document.getElementById('subject');
  var textarea = document.getElementById('usermessage');

  var normalbordercolor = '#4a820c';
  var errorcolor = '#fc8403';

  console.log(username.value);
  if ('' == username.value || '' == textarea.value || '' == subject.value) {

    // changing name-input border-color
    if ('' == username.value)
      username.style.borderColor = errorcolor;
    else 
      username.style.borderColor = normalbordercolor;

    // changing subject-input border-color
    if ('' == subject.value)
      subject.style.borderColor = errorcolor;
    else 
      subject.style.borderColor = normalbordercolor;

    // changing textarea-input border-color
    if ('' == textarea.value)
      textarea.style.borderColor = errorcolor;
    else 
      textarea.style.borderColor = normalbordercolor;
  }
  else
    window.open(`mailto:steven.schulz@outlook.com?subject=Mail from ${username.value}: ${subject.value}&body=${textarea.value}`, "_self");
}


function sendMail() {
  window.open('mailto:steven.schulz@outlook.com?subject=Mail from Website', "_self");
}
