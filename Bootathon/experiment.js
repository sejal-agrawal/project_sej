function no_of_proc(){
    var no_proc=document.getElementById("inn").value;
    localStorage.setItem("no_o_proc",no_proc);
    return false;
}
function colaps(e){
    var target = document.getElementById("demo");
    if(target.style.display==="none"){
        target.style.display="block";
        return;
    }
    target.style.display="none";
}