(function(){
  var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-10, 10, 10, -10],
    axis: true,
    showCopyright: false,
  });

  var pointA = [5,0];
  var pointB = [1,7];
  var pointC = [-5,1];
  var pointD = [5,7];

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

  var pointDPoint = board.create('point', pointD, {
    name: 'D',
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

  var lineAD = board.create('line', [pointAPoint, pointDPoint], {
    straightFirst: false,
    straightLast: false, 
    strokeWidth: 2,
  });


  board.create('text',[pointA[0]+1, pointA[1]+1, function() { 
    return 'CAB Angle: ' + Math.round(degrees(lineangle(pointAPoint, pointBPoint, pointCPoint))) + ' deg.';
  }], {fontSize:12});

  board.create('text',[pointA[0]-1, pointA[1]-1, function() { 
   return 'CAD Angle: ' + Math.round(degrees(lineangle(pointAPoint, pointCPoint, pointDPoint))) + ' deg.';
 }], {fontSize:12});

  cabLine = board.create('line', [pointCPoint, pointBPoint], {visible: false});
  cadLine = board.create('line', [pointCPoint, pointDPoint], {visible: false});

  pointAPoint.on('drag', cb);
  pointBPoint.on('drag', cb);
  pointCPoint.on('drag', cb);
  pointDPoint.on('drag', cb);

  function cb() {
    cabLine.hideElement();
    cadLine.hideElement();

    var cabAngle = lineangle(pointAPoint, pointBPoint, pointCPoint);
    var cadAngle = lineangle(pointAPoint, pointCPoint, pointDPoint);
    if(cabAngle < cadAngle) {
      cabLine.showElement();
    }
    else {
      cadLine.showElement(); 
    }
  }

})();

function lineangle(pA, pB, pC) {
  var lengthAB = distance(pA.X(), pA.Y(), pB.X(), pB.Y());
  var lengthAC = distance(pA.X(), pA.Y(), pC.X(), pC.Y());
  var lengthBC = distance(pB.X(), pB.Y(), pC.X(), pC.Y());

  return angle(lengthAB, lengthAC, lengthBC);  
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2-x1, 2) +Math.pow(y2-y1, 2)); 
}

function angle(d1, d2, d3) {
  return Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(d3, 2)) / (2 * d1 * d2)); 
}

function degrees(radians) {
  return radians * 180 / Math.PI;
}