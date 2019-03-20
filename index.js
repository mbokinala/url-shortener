$('#mainForm').submit(function (e) {
    e.preventDefault();
    console.log($('#longURL').val());

    var sendUrl = $('#longURL').val();
    if(!(sendUrl.startsWith('http://') || sendUrl.startsWith('https://'))) {
        sendUrl = 'http://' + sendUrl;
    }

    data = {
        url: $('#longURL').val(),
        code: $('#code').val()
    }

    xhr = new XMLHttpRequest();

    xhr.open('POST', '/new');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 201) {
            $('#form').trigger('reset');
            alert('Your URL is www.manavbokinala.com/u/' + data.code);
        } else if (xhr.status !== 201) {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify(data));
});