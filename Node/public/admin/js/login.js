function loadershow() {
  $(".transparacy").css({ 'display': 'block' });
  $(".loader").css({ 'display': 'block' });
}

function loaderhide() {
  $(".transparacy").css({ 'display': 'none' });
  $(".loader").css({ 'display': 'none' });
}


$(document).ready(function () {

  //edit profile
  $('#loginform').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    var user = "manish";
    var pass = "helo";

    $.post("http://192.168.1.23:1000/admin/loginform", { email: user, password: pass }, function (data) {
      console.log(data);
      if (data) {
        console.log(data);
      } else {
        alert('hi');
      }
    });
     
  });
  
  //for errors
  socket.on('errors', function (data) {
    console.log(data);
    loaderhide();
    alert(data.msg)
    if (data.redirect){
      location.href = data.redirect;
    }

  });
  //for success
  socket.on('success', function (data) {
    console.log(data);
    loaderhide();
    alert(data.msg);
    location.href = data.redirect;
  });
  //emit answers
  $('#answers').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    let form_data=$(this).serialize()
    socket.emit('add_answer', form_data);
  });
  //emit district
  $('#addDistrict').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    let form_data = $(this).serialize()
    socket.emit('add_district', form_data);

  });

  //emit edit district
  $('#editDistrict').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    let form_data = $(this).serialize()
    socket.emit('edit_district', form_data);

  });

  //emit add ac
  $('#addAc').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    let form_data = $(this).serialize()
    socket.emit('add_ac', form_data);
  });
  //emit onchange district
  $(document).on('change', '#dis_id', function () {
    loadershow();
    $('#ac_id').children('.removeac').remove()
    var disId = $(this).val();
    // alert(disId)
    socket.emit('getAcbyid', { dis_id: disId});
  });
  //get all ac 
  socket.on('getAllac', function (data) {
    loaderhide();
    data.map(x=>{
      $('#ac_id').append('<option class="removeac" value="' + x.ac_id +'">'+x.name+'</option>')
    })
  });

  //emit add booth
  $('#addBooth').on('submit', function (event) {
    event.preventDefault();
    loadershow();
    let form_data = $(this).serialize()
    socket.emit('add_booth_data', form_data);
  });
});
// const dbURI = 'mongodb://akashsahu495:fbhacker1@ds011715.mlab.com:11715/blood'
// const dbURI = 'mongodb://akashsahu410:fbhacker1@ds353378.mlab.com:53378/mainelection'