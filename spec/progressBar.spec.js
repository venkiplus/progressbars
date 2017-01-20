describe('ProgressBar', function () {
  it('should not allow progress to go below zero', function () {
    var progressBar = new ProgressBar(20,1,110);
    var div = document.createElement('div');
    div.innerHTML=progressBar.template;
    progressBar.progressTo(-30,'1');
  });
});
