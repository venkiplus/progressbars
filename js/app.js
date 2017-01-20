(function(){
  var data= {};
  var context={},progressBars=[];
  function init(){
    //data = {"buttons": [10,38,-13,-18],"bars": [62,45,62],"limit": 230};renderApp(data); // comment it when api is available
    getData('http://pb-api.herokuapp.com/bars',function(response){
      data = response;
      renderApp(data);
    });
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
