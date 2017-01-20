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
