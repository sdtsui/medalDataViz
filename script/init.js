var svgWidth = 1400;
var svgHeight = 800;

var svg = d3.select('body').append('svg')
	.attr('width',svgWidth)
	.attr('height',svgHeight)

var drawGraph = function(year, width, pxPerMedal, medalType){
	svg.selectAll().data(year)
	.enter().append('rect')
  .on('mouseover',function(d){
    var country = d.NOC;
    var medals = medalType+' : '+d[medalType];
    var rank = d.Rank;

    console.log(d);
    svg.append('text').text(country)
      .attr('x',$(this).attr('x')+15)
      .attr('y',$(this).attr('y')-60)
      .style('font-size','30px')
    svg.append('text').text(medals)
      .attr('x',$(this).attr('x')+15)
      .attr('y',$(this).attr('y')-30)
      .style('font-size','30px')
    svg.append('text').text(rank)
      .attr('x',$(this).attr('x')+15)
      .attr('y',$(this).attr('y')-90)
      .style('font-size','30px')
  })
  .on('mouseleave',function(){
    svg.selectAll('text').remove();
  })
  .attr('x',function(d,i){return i*(width+1)})
  .attr('y',function(d){
      var barHeight = 0;
      if(medalType === 'Silver'){barHeight=barHeight+d.Gold*pxPerMedal};
      if(medalType === 'Bronze'){barHeight=barHeight+d.Silver*pxPerMedal+d.Gold*pxPerMedal}
      return svgHeight-100-barHeight;
    })
  .attr('width',width)
  .attr('height',function(d){return 0})
  .attr('fill',function(){
    if(medalType==='Bronze'){return 'brown'};
    return medalType;
  })
  .transition().duration(1000).delay(function(){
    if(medalType==='Gold'){return 0}
    if(medalType==='Silver'){return 1000}
    if(medalType==='Bronze'){return 2000}
  }).ease('elastic')
    .attr('y',function(d){
      var barHeight = d.Gold*pxPerMedal;
      if(medalType === 'Silver'){barHeight=barHeight+d.Silver*pxPerMedal};
      if(medalType === 'Bronze'){barHeight=barHeight+d.Silver*pxPerMedal+d.Bronze*pxPerMedal}
      return svgHeight-100-barHeight;
    })
  .attr('height',function(d){
    var barHeight = d.Gold*pxPerMedal;
      if(medalType === 'Silver'){barHeight=d.Silver*pxPerMedal};
      if(medalType === 'Bronze'){barHeight=d.Bronze*pxPerMedal};
      return barHeight;
  })
}
// drawGraph(d00.results.collection1,svgWidth/90,svgHeight/120,'Gold')
// drawGraph(d00.results.collection1,svgWidth/90,svgHeight/120,'Silver')
// drawGraph(d00.results.collection1,svgWidth/90,svgHeight/120,'Bronze')

var drawYear = function(year){
  drawGraph(year,svgWidth/90,svgHeight/130,'Gold')
  drawGraph(year,svgWidth/90,svgHeight/130,'Silver')
  drawGraph(year,svgWidth/90,svgHeight/130,'Bronze')
}

var years= [d00,d04,d08,d12]


//Start and Stop
var i=0;

var running = true;
var startGraph;
var start = function(){
  startGraph = setInterval(function(){
    d3.selectAll('rect').remove();
    drawYear(years[i].results.collection1);
    $('h1').text(years[i].name);

    i++;
    if(i===years.length){
      i=0;
    }
  },3200)
}

start();

var stop = function(){
  clearInterval(startGraph);
}

$('body').on('click',function(){
  if(running){
    stop();
    running = false;
  } else {
    start();
    running = true;
  }
})