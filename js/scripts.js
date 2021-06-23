
let ENDPOINT = 'http://localhost:5003/web-gui/';

let openedFile = undefined;

function openFile(f){
    openedFile = f;
    request(data = { cmd : 'open', file : f });
    $('#filesModal').modal('hide');
};

function listFiles(files) {
    let el = document.getElementById("filesModalBody");
    el.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
        let active = openedFile == files[i] ? "active" : "";
        el.innerHTML += '<div class="' + active + '">' + '<a href="#" onClick="openFile(\'' + files[i] + '\')">' + files[i] + '</a></div>';
    }
};

function handleResponse(response) {
    if (response.cmd == "ls")
        listFiles(response.files);

    else if (response.cmd == "open"){
        editor.setValue(response.content);
        editor.selection.setRange({start : {row:0, column:0}, end : {row:0, column:0}});
    }

    else if (response.cmd == "analyze"){
        $('#resultsbox').empty();
        for (let i = 0; i < response.output.length; i++){
            $('#resultsbox').append('<div class="mb-3" id="out' + i + '"></div>');
            katex.render(response.output[i], document.getElementById('out' + i), { displayMode: false });
        }

        for (let i = 0; i < response.error.length; i++)
            $('#resultsbox').append('<div class="mb-2">' + response.error[i] + '</div>');
    }
};

function request(data = {}) {
    $.ajax({
        type: "POST",
        url: ENDPOINT,
        data: data,
        dataType: 'json',
        xhrFields: { withCredentials: false },
        success: handleResponse,
    });
};

// Key bindings
let map = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';

    // Ctrl + Alt + O
    if (map[17] && map[18] && map[79]){
        request(data = { cmd : 'ls' });
        $('#filesModal').modal('toggle');

    // Ctrl + Alt + G
    } else if (map[17] && map[18] && map[71]){
        $('body').css('background-color', '#abebc6');
        setTimeout(function(){ $('body').css('background-color', '#424242') }, 500);
        let lines = editor.getSession().getValue();
        request(data = { cmd : 'save', file : openedFile, lines : lines });

    // Ctrl + Alt + H
    } else if (map[17] && map[18] && map[72]){
        document.getElementById("helpBtn").click();

    } else if (map[17] || map[18]){

    } else {
        setTimeout(function(){ map = {};}, 200);
    }
}
