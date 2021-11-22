$('.clickable-row').click(function() {
    window.document.location = $(this).data("link")
  });

  $('tr').click(function() {
    alert("table row clicked")
    //window.document.location = $(this).data("link")
    windows.location.href = edit_recording_path(record)
  });