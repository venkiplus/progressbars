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
      template = "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
        "<div class='load' id='loaddiv' style='width:"+this.progress.toFixed()+"%'>"+
        "</div>";
    }else{
        template = "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
        "<div class='load' id='loaddiv' style='background:red'>"+
        "</div>";
    }
    return template;
  }
  this.template= "<div class='noload' id='progressBar"+id+"'>"+
    "<span class='loadtext' id='loadspan'>"+this.progress.toFixed()+"%</span>"+
    "<div class='load' id='loaddiv' style='width:"+this.progress.toFixed()+"%'>"+
    "</div>"+
  "</div>";
}
