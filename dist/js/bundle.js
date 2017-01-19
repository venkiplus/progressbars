(function(){
  var data= {};
  var context={},progressBars=[];
  function init(){
    data = {"buttons": [10,38,-13,-18],"bars": [62,45,62],"limit": 230};renderApp(data); // comment it when api is available
    /*getData('http://pb-api.herokuapp.com/bars',function(response){
      data = response;
      renderApp(data);
    });*/
    alert('venki');
  }

  function renderApp(data){
    var buttons = data.buttons;
    var bars = data.bars;
    var limit = data.limit;
    var dropdownHTML = document.createElement('select');
    document.getElementById('dropdown').appendChild(dropdownHTML);
    dropdownHTML.addEventListener('change', function(){
      context=getContext(this.value);
      context.id=this.value;
    });
    function getContext(n){
      return progressBars[n];
    }
    createBars(bars,limit,dropdownHTML);
    createButtons(buttons);
  }

  function createBars(bars,limit,dropdownHTML){
    var i,progressBar;
    for(i=0;i<bars.length;i++){
      progressBar = new ProgressBar(bars[i],i,limit);
      document.getElementById('bars').innerHTML+=progressBar.template;
      progressBars.push(progressBar);
      dropdownHTML.appendChild(new Option("Progress Bar"+(i+1), i));
    }
    context= progressBars[0];
    context.id=0;
  }

  function createButtons(buttons){
    var i;
    for(i=0;i<buttons.length;i++){
      var buttonHTML = document.createElement('button');
      buttonHTML.addEventListener('click', listener);
      var text = document.createTextNode(buttons[i]);
      buttonHTML.appendChild(text);
      document.getElementById('buttons').appendChild(buttonHTML);
    }
    function listener(){
      context.progressTo(this.innerHTML,context.id);
    }
  }

  function getData(api, callback){
    var request = new XMLHttpRequest(),json;
    request.onreadystatechange = function ()
    {
       if(request.readyState==4 && request.status==200)
          {
            json = JSON.parse(request.responseText);
            callback(json);
          }
    };
    request.open("GET", api, true);
    request.send(null);
  }

  window.onload=init();
}());

  function ProgressBar(initialValue, id, limit){
    this.value = parseInt(initialValue);
    this.limit=limit;
    this.progress = (this.value/this.limit)*100;
    this.template= "<div class='noload' id='progressBar"+id+"'>"+
      "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
      "<div class='load' id='loaddiv' style='width:"+this.progress.toFixed()+"%'>"+
      "</div>"+
    "</div>";

    this.progressTo = function(initialValue,id){
      var parent = document.getElementById('progressBar'+id);
      var loader = parent.getElementsByClassName('load')[0];
      this.value = parseInt(this.value) + parseInt(initialValue);
      if(this.value<=0){
        this.progress =0;
        this.value=0;
      }else{
        this.progress = ((this.value/this.limit)*100).toFixed();
      }
      if(this.progress<=100){
          loader.classList.remove('exceeded');
          loader.style.width=this.progress+'%';
      }else{
          loader.classList.add('exceeded');
          loader.style.width='100%';
      }
      parent.getElementsByClassName('loadtext')[0].textContent=this.progress+'%';
    };
  }
