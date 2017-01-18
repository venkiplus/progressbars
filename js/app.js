(function(){
  function init(){
    //todo:api call to service and store data.
    var data= {};
    var context;
    /*data = {
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
    };*/
    getData('http://pb-api.herokuapp.com/bars',function(response){
      data = response;
      renderApp();
    });
    
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
        progressBar = new ProgressBar(bars[i],i,limit);
        document.getElementById('bars').innerHTML+=progressBar.template;
        progressBars.push(progressBar);
        dropdownHTML.appendChild(new Option("Progress Bar"+(i+1), i));
      }
      context= progressBars[0];
      context.id=0;
      for(i=0;i<buttons.length;i++){
        var buttonHTML = document.createElement('button');
        buttonHTML.addEventListener('click', function(){
          context.progressTo(this.innerHTML,context.id);
          console.log(this.innerHTML);
        });
        var text = document.createTextNode(buttons[i]);
        buttonHTML.appendChild(text);
        document.getElementById('buttons').appendChild(buttonHTML);
      }
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
    }
    request.open("GET", api, true);
    request.send(null);
  }
  window.onload=init();
}());
