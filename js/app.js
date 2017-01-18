(function(){
  function init(){
    //todo:api call to service and store data.
    var data= window.data || {};
    var context;
    data = {
        "buttons": [
            10,
            38,
            -13,
            -18
        ],
        "bars": [
            62,
            45,
            62
        ],
        "limit": 230
    };
    /*getData('',function(data){
      data = data;
    });*/
    renderApp();
    function renderApp(){
      var buttons = data.buttons;
      var bars = data.bars;
      var limit = data.limit;
      var i,progressBar,dropdownHTML = document.createElement('select'),progressBars=[];
      document.getElementById('dropdown').appendChild(dropdownHTML);
      dropdownHTML.addEventListener('change', function(){
        context=getContext(this.value);
        context.id=this.value;
      });
      function getContext(n){
        return progressBars[n];
      }
      for(i=0;i<bars.length;i++){
        progressBar = new ProgressBar(bars[i],i);
        document.getElementById('bars').innerHTML+=progressBar.template;
        progressBars.push(progressBar);
        dropdownHTML.appendChild(new Option("Progress Bar"+(i+1), i));
      }
      context= progressBars[0];
      context.id=0;
      for(i=0;i<buttons.length;i++){
        var buttonHTML = document.createElement('button');
        buttonHTML.addEventListener('click', function(){
          context.progressTo(this.innerHTML,limit,context.id);
          console.log(this.innerHTML);
        });
        var text = document.createTextNode(buttons[i]);
        buttonHTML.appendChild(text);
        document.getElementById('buttons').appendChild(buttonHTML);
      }
    }
  }

  function getData(api){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function ()
    {
       if(request.readyState==4 && request.status==200)
          {
            json = JSON.parse(request.responseText);
          }
    }
    request.open("GET", api, false);
    request.send();
    return json;
  }

  function ProgressBar(initialValue, id){
    this.value = parseInt(initialValue);
    console.log(this.initialValue);
    this.limit=0;
    this.progress = (this.value/230)*100;
    this.progressTo = function(initialValue,limit,id){
      this.limit = limit;
      this.value = parseInt(this.value) + parseInt(initialValue);
      if(this.value<=0){
        this.progress =0;
        this.value=0;
      }else{
        this.progress = (this.value/230)*100;
      }
      if(this.value>this.limit){
        this.template=this.getTemplate(true);
      }else{
        this.template=this.getTemplate(false);
      }
      document.getElementById('progressBar'+id).innerHTML=this.template;
    }

    this.getTemplate = function(exceeded,id){
      var template='';
      if(!exceeded){
        template = "<div class='noload' id='progressBar"+id+"'>"+
          "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
          "<div class='load' id='loaddiv' style='width:"+this.progress.toFixed()+"%'>"+
          "</div>"+
        "</div>";
      }else{
          template = "<div class='noload' id='progressBar"+id+"'>"+
          "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
          "<div class='load' id='loaddiv' style='background:red'>"+
          "</div>"+
        "</div>";
      }
      return template;
    }
    this.template= this.getTemplate(false,id);
  }
  window.onload=init();
}());
