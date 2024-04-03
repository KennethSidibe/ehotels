// code for date picker to work
// needs jquery and jqueryui

$("#arrivalDateInput").datepicker({
    firstDay: 1,
    showOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd.mm.yy"
  });
  
  $(".date").mousedown(function() {
    $(".ui-datepicker").addClass("active");
  });
  
$("#arrivalDateInput").datepicker({
    firstDay: 1,
    showOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    dateFormat: "dd.mm.yy"
  });
  
  $(".date").mousedown(function() {
    $(".ui-datepicker").addClass("active");
  });
