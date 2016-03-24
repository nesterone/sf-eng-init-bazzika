var eggScriptTags = document.querySelectorAll("script[type='text/egg']");

for(var i=0; i < eggScriptTags.length; i++){
    var programm = eggScriptTags[i].innerText;
    run(programm);
}