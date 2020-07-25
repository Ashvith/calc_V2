var symbol="";
function openNav(){
    document.getElementById("mySidenav").style.width ="100%";
}

function closeNav(){
    document.getElementById("mySidenav").style.width ="0px";
}

function getPrevious(){
    return document.getElementById("prev").innerText;
}

function setPrevious(num){
    document.getElementById("prev").innerText=num;
}

function getCurrent(){
    return document.getElementById("curr").innerText;
}

function setCurrent(num){
    if(num==""){
        document.getElementById("curr").innerText=num;
    }
    else{
    document.getElementById("curr").innerText=getFormattedNumber(num)+symbol;
    symbol="";
    }
}

function getFormattedNumber(num){
    var n = Number(num);
    var value = n.toLocaleString("hi-IN");
    return value;
}

function reverseNumber(num){
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
var rep=true;
var del;
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener("click",function(){
        if(this.id=="clear"){
            rep=true;
            setPrevious("");
            setCurrent("");
        }
        else
        if(this.id=="backspace"){
            var output=reverseNumber(getCurrent()).toString();
            var history=getPrevious();
            if(output){
                output=output.substr(0,output.length-1);
                if(output.charAt(output.length-1)=="."){
                    rep=true;
                }
                setCurrent(output);
            }
        }
        else
        if(this.id=="invert"){
            var output=reverseNumber(getCurrent());
            var strng=reverseNumber(getCurrent()).toString();
            if(output!=""){
                if(strng.charAt(strng.length-1)=="."){
                    rep=true;
                }
                else{
                output=-output;
                setCurrent(output);
                }
            } 
        }
        else
        if(this.id=="%"){
            var output=reverseNumber(getCurrent());
            if(output!=""){
                output=output/100;
                setCurrent(output);
            } 
        }
        else
        if(this.id=="."){
            var output=reverseNumber(getCurrent()).toString();
            if(output!=""){
                if(rep==true){
                    symbol=this.id;
                    output=output
                    setCurrent(output);
                    rep=false;
                }
            }
        }
        else{
            var output=getCurrent();
            var history=getPrevious();
            if(output=="" && history!=""){
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                output= output==""?output:reverseNumber(output);
                history = history+output;
                if(this.id=="="){
                    rep=false;
                    var result=eval(history);
                    setCurrent(result);
                    setPrevious("");
                }
                else
                {
                    rep=true;
                    history=history+this.id;
                    setPrevious(history);
                    setCurrent("");
                }
            }
        }
    })
}

var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener("click",function(){
        var output=reverseNumber(getCurrent());
        if(output!=NaN){
            if(getCurrent().charAt(getCurrent().length-1)=="."){
                output=output+(0.1*this.id)
                setCurrent(output);
            }
            else{
            output=output+this.id;
            setCurrent(output);
            }
        }
    })
}