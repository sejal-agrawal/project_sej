var x;
    var atat;
    var awt;
    var arr=[];
    var arr1=[];
    var context;
    var circles = [];
    var circle_key=[];
    var c;
    var canvasId = "separateCircles";
    var mousePosition;
    var isMouseDown;
    var cpu;

    var Circle = function(circleX, circleY, radius, color,index){
            this.arrivalTime = 0;
            this.burstTime = 0;
            this.serviceTime = 0;
            this.completionTime = 0;
            this.turnAroundTime = 0;
            this.waitingTime = 0;
            this.startX = circleX;
            this.startY = circleY;
            this.circleX = circleX;
            this.circleY = circleY;
            this.radius = radius;
            this.color = color;
            this.index = index;
            this.isDraw = true;
            var p = this;
        this.draw = function(){
            if(p.isDraw){
                c = document.getElementById(canvasId);
                var ctx = c.getContext("2d"); 
                context = ctx;
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.fillStyle="green";
                ctx.arc(this.circleX, this.circleY, this.radius, 0, 2 * Math.PI);
                ctx.stroke();

                context.font = "20px Arial";
                context.fillText("[AT: "+p.arrivalTime+" "+"BT: "+p.burstTime+"]",p.circleX+p.radius+3,p.circleY+5);

                context.font = "20px Arial";
                context.fillText("P"+p.index,p.circleX-10,p.circleY+10);
            }
           
        };
    };

    var controlPU  = function(x,y){
        this.X = x;
        this.Y = y;
        this.width = 200;
        this.height = 300;
        var p = this;

        this.draw = function(){
            context.beginPath();
            context.rect(p.X,p.Y,200,300);
            context.fillStyle="#484848";
            context.fill();
            context.lineWidth="2";
            context.strokeStyle="black";
            context.stroke();
            context.beginPath();
            context.rect(p.X,p.Y,200,200);
            context.fillStyle="#484848";
            context.fill();
            context.lineWidth="2";
            context.strokeStyle="black";
            context.stroke();
            context.beginPath();
            context.arc(p.X+100,p.Y+140,20,0,2*Math.PI,true);
            context.fillStyle="#484848";
            context.fill();
            context.lineWidth="2";
            context.strokeStyle="black";
            context.stroke();
            context.beginPath();
            context.rect(p.X+50,p.Y+50,100,30);
            context.fillStyle="#181818";
            context.fill();
            context.lineWidth="2";
            context.strokeStyle="black";
            context.stroke();
        }
    }
  
    function ope(){
        if(!isNaN(document.getElementById("num_proc").value)){
        x=document.getElementById("num_proc").value;
        for(let i=0;i<x;i++){
            document.write('<table style="color:#472b18;"><th><tr><td ><b>Process No.</b></td><td><b>Arrival Time</b></td><td><b>BurstTime</b></td></tr><tr><td><b>'+i+'</b></td><td><input type="text" id="AT-'+i+'"></td><td><input type="text" id="BT-'+i+'"></td></tr></th></table>');
        }
        document.write('<input type="submit" onclick="in_val(); this.disabled=true" style="font-size: 25px;background-color: #e08344;">');
        }
        else
     window.alert("Please enter a number");
       
    }
    function in_val(){
        for(let i=0;i<x;i++){
            var a=document.getElementById("AT-"+i).value;
            var b=document.getElementById("BT-"+i).value;
            arr.push({k:i,AT:a,BT:b});      
            console.log(JSON.stringify(arr[i]));

        }
      
        document.write('<canvas id="separateCircles" width="1020px" height="650px" style="background-color:rgb(230, 188, 212); margin-left:450px; margin-top:-75px; border:2px solid black;"></canvas>');
     
        for(let i=0;i<x;i++){
            var temp = new Circle(50,60*(i+1),25,"black",i);
            temp.arrivalTime = arr[i].AT;
            temp.burstTime = arr[i].BT;
            circles.push(temp);
        }

        for(var j = 0; j < circles.length; j++){
            circles[j].draw();  
        }
        cpu = new controlPU(500,150);
        cpu.draw();


        document.write('<div style="margin-top:-100px;"><b>Enter average turn around time:</b> <input type="text" id="atat"/><br><br><b>Enter average waiting time:</b> <input type="text" id="awt"/><br><br></div>');
    
      //  atat=document.getElementById("atat").value;
        //awt=document.getElementById("awt").value;
        document.write('<b>Verify your results:</b><br><br><input type="button" value="Verify" onclick="verify()"style="background-color:font-size: 25px;background-color: #e08344;"/>');

        document.addEventListener('mousemove', move, false);
        document.addEventListener('mousedown', setDraggable, false);
        document.addEventListener('mouseup', setDraggable, false);

    }

    function verify(){
        atat=parseFloat(document.getElementById("atat").value);
        awt=document.getElementById("awt").value;
        var gc=[];
        var y=parseFloat(arr[0].AT)+parseFloat(arr[0].BT);
        var z=y-parseFloat(arr[0].AT);
        gc.push({A:y,B:z,C:0});
    //   console.log(JSON.stringify(gc[0]));
        var we_ttat=0;
        var we_atat=0;
        var we_twt=0;
        var we_awt=0;
        for(let i=1;i<x;i++)
        {
            y=y+parseFloat(arr[i].BT);
            z=y-parseFloat(arr[i].AT);
            gc.push({A:y,B:z,C:parseFloat(gc[i-1].A)-parseFloat(arr[i].AT)});
            we_ttat=we_ttat+z;
            we_twt+=gc[i].C;
          console.log(JSON.stringify(gc[i]));
        
        }
      
          we_ttat=we_ttat+parseFloat(gc[0].B);
        
           we_atat=we_ttat/x;
           we_awt=we_twt/x;
           console.log(atat); 
           console.log(we_atat);
           console.log(we_awt);
           console.log(awt);
          /* if((we_atat===atat)&&(we_awt===awt))
            alert("Congratulations!");
            else
            alert("Wrong Answer");*/
            if(parseFloat(we_atat)===parseFloat(atat)){
                if(parseFloat(we_awt)===parseFloat(awt))
                alert("Congratulations");
                else
                alert("Wrong Answer");
            }
            else
            alert("Wrong Answer");

        
            for(let i=0;i<x;i++){
        arr1.push({k1:circle_key[i],AT1:arr[circle_key[i]].AT,BT1:arr[circle_key[i]].BT});
        console.log(JSON.stringify(arr1[i]));
        }
        document.write('<b>Draw Gantt Chart:</b> <input type="button" value="Proceed" onclick="gantt_chart_user()" style="font-size: 25px;background-color: #e08344;">');
        document.write('<b>Verify Gantt Chart:</b> <input type="button" value="Verify" onclick="gantt_chart()" style="font-size: 25px;background-color: #e08344;">');
    }
function gantt_chart()
               {
           
                   var sum;
                                   
                         context.font = "20px Georgia";
                         context.fillText(parseFloat(arr[0].AT), 200, 500);
                         sum=parseFloat(arr[0].AT)+parseFloat(arr[0].BT);
                         context.beginPath();
                         context.strokeRect(200,500,100,50);
                         context.fillText(sum,300,500);      
                         for(let i=1; i<x;i++){
                            sum=sum+parseFloat(arr[i].BT);
                         context.beginPath();
                         context.strokeRect(100+((i+1)*100),500,100,50);
                         context.fillText(sum, 200+((i+1)*100), 500);
                         context.strokeStyle='black';                         
                      context.stroke();
                    

                      }
                      console.log(JSON.stringify(arr));
                      var flag=0;
                      for(let i=0;i<x;i++){
                          if(arr[i].k===arr1[i].k1)
                          continue;
                          else{
                          flag=-1;
                          break;
                          }
                      }
                      if(flag===0)
                      alert("Your Gantt Chart is correct");
                      else
                      alert("Your Gantt Chart is incorrect. Please verify with the correct Gantt Chart");
               }
               
               function gantt_chart_user()
               {
                   var sum;
                                       
                         context.font = "20px Georgia";
                      
                        context.fillText(parseFloat(arr1[0].AT1), 200, 600);
                        sum=parseFloat(arr1[0].AT1)+parseFloat(arr1[0].BT1);  
                         context.beginPath();
                         context.strokeRect(200,600,100,50);
                         context.fillText(sum,300,600);   
                         for(let i=1; i<x;i++){
                            sum=sum+parseFloat(arr1[i].BT1);
                         context.beginPath();
                         context.strokeRect(100+((i+1)*100),600,100,50);
                         context.fillText(sum, 200+((i+1)*100), 600);
                         context.strokeStyle='black';                         
                      context.stroke();
                      }
                      console.log(JSON.stringify(arr1));
               }
    //main draw method
    function draw() {
        context.clearRect(0, 0, c.width, c.height);
        cpu.draw();
        drawCircles();
        
    }
    
    //draw circles
    function drawCircles() {
        for (var i = circles.length - 1; i >= 0; i--) {
            circles[i].draw();
            
        }
    }
    
    //key track of circle focus and focused index
    var focused = {
        key: 0,
        state: false
    }
    
    function move(e) {
        if (!isMouseDown) {
            return;
        }
        getMousePosition(e);

        if (focused.state) {
            circles[focused.key].circleX = mousePosition.x;
            circles[focused.key].circleY = mousePosition.y;
            draw();
            return;
        }

        for (var i = 0; i < circles.length; i++) {
            if (intersects(circles[i])) {
                focused.key=i;
                focused.state = true;
                break;
            }
        }
        draw();
    }

    function setDraggable(e) {
        var t = e.type;
       
        if (t === "mousedown") {
            isMouseDown = true;
        } 
        else if (t === "mouseup")
         {

            isMouseDown = false;
            releaseFocus();
            if(isInside(circles[focused.key],cpu)){
                circle_key.push(focused.key);
                //console.log(focused.key);
                circles[focused.key].isDraw=false;
            }
            circles[focused.key].circleX = circles[focused.key].startX;
            circles[focused.key].circleY = circles[focused.key].startY;
            draw();
        }
      
    }

    function releaseFocus() {
        focused.state = false;
    }

    function getMousePosition(e) {

        var rect = c.getBoundingClientRect();
        mousePosition = {
            x: Math.round(e.x - rect.left),
            y: Math.round(e.y - rect.top)
        }
    }


    function intersects(circle) {

        var areaX = mousePosition.x - circle.circleX;
        var areaY = mousePosition.y - circle.circleY;
        return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
    }

    function isInside(circle,cpu)
    {
         var res = false;
        var tempX = circles[focused.key].circleX-cpu.X;
        var tempY = circles[focused.key].circleY-cpu.Y;
        if(tempX>0&&tempX<cpu.width && tempY>0 && tempY<cpu.height){
            res = true;
        }
        return res;
    }