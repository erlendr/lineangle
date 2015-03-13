(function(){
  var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-10, 10, 10, -10],
    axis: true,
    showCopyright: false,
  });

  var pointA = [5,0];
  var pointB = [9,8];
  var pointC = [-5,1];

  //Add points for triangle
  var pointAPoint = board.create('point', pointA, {
    name: 'A',
    strokecolor: 'red',
  });

  var pointBPoint = board.create('point', pointB, {
    name: 'B',
    strokecolor: 'red',
  });

  var pointCPoint = board.create('point', pointC, {
    name: 'C',
    strokecolor: 'red',
  });

  var lineAC = board.create('line', [pointAPoint, pointCPoint], {
    straightFirst: false,
    straightLast: false, 
    strokeWidth: 2,
  });

  var lineAB = board.create('line', [pointAPoint, pointBPoint], {
    straightFirst: false,
    straightLast: false, 
    strokeWidth: 2,
  });

  var lengthAB = distance(pointAPoint.X(), pointAPoint.Y(), pointBPoint.X(), pointBPoint.Y());
  var lengthAC = distance(pointAPoint.X(), pointAPoint.Y(), pointCPoint.X(), pointCPoint.Y());
  var lengthBC = distance(pointBPoint.X(), pointBPoint.Y(), pointCPoint.X(), pointCPoint.Y());

  var angle1 = angle(lengthAB, lengthAC, lengthBC);
  board.create('text',[pointA[0]+1, pointA[1]+1, function() { 
   var lengthAB = distance(pointAPoint.X(), pointAPoint.Y(), pointBPoint.X(), pointBPoint.Y());
   var lengthAC = distance(pointAPoint.X(), pointAPoint.Y(), pointCPoint.X(), pointCPoint.Y());
   var lengthBC = distance(pointBPoint.X(), pointBPoint.Y(), pointCPoint.X(), pointCPoint.Y());

   return 'Angle: ' + Math.round(degrees(angle(lengthAB, lengthAC, lengthBC))) + ' deg.';
 }], {fontSize:10});
})();

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2) +Math.pow(y2-y1, 2)); 
}

function angle(d1, d2, d3) {
  return Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(d3, 2)) / (2 * d1 * d2)); 
}

function degrees(radians) {
  return radians * 180 / Math.PI;
}