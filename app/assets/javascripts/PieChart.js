function Sector(x, y, radius, startAngle, endAngle) {
  SpecialAttrPath.call(this, {
    radius: 0,
    startAngle: startAngle,
    endAngle: endAngle
  });
  this.attr({
    x: x,
    y: y,
    radius: radius,
    startAngle: startAngle,
    endAngle: endAngle
  });
}

Sector.prototype = Object.create(SpecialAttrPath.prototype);
Sector.prototype._make = function() {

  var attr = this._attributes,
      radius = attr.radius,
      startAngle = attr.startAngle,
      endAngle = attr.endAngle;

  var startX, startY, endX, endY;
  var diffAngle = Math.abs(endAngle - startAngle);

  this.startX = startX = radius * Math.cos(startAngle);
  this.startY = startY = radius * Math.sin(startAngle);
  if (diffAngle < Math.PI*2) {
    endX = radius * Math.cos(endAngle);
    endY = radius * Math.sin(endAngle);
  } else { // angles differ by more than 2*PI: draw a full circle
    endX = startX;
    endY = startY - .0001;
  }

  this.endX = endX;
  this.endY = endY;

  this.radiusExtentX = radius * Math.cos(startAngle + (endAngle - startAngle)/2);
  this.radiusExtentY = radius * Math.sin(startAngle + (endAngle - startAngle)/2);

  return this.moveTo(0, 0)
    .lineTo(startX, startY)
    .arcTo(radius, radius, 0, (diffAngle < Math.PI) ? 0 : 1, 1, endX, endY)
    .lineTo(0, 0);

};

Sector.prototype.getDimensions = function() {
  var x = this.attr('x'),
      y = this.attr('y'),
      left = Math.min(x, x + this.startX, x + this.endX, x + this.radiusExtentX),
      top = Math.min(y, y + this.startY, y + this.endY, y + this.radiusExtentY),
      right = Math.max(x, x + this.startX, x + this.endX, x + this.radiusExtentX),
      bottom = Math.max(y, y + this.startY, y + this.endY, y + this.radiusExtentY);
  console.log(y, y + this.startY, y + this.endY, y + this.radiusExtentY)
  return {
    left: left,
    top: top,
    width: right - left,
    height: bottom - top
  };
};


PieChart.BASE_COLOR = color('#1aa39c');

function PieChart(data) {
  this.angle = 0;
  this.labelY = 30;
  this.kolor = PieChart.BASE_COLOR.clone();
  var n = 0;
  for (var i in data) {
    this.slice(i, data[i], n++);
  }
}

PieChart.prototype = {
  slice: function(name, value, i) {

    var start = this.angle,
        end = start + (Math.PI*2) * value/100,
        // Increase hue by .1 with each slice (max of 10 will work)
        kolor = this.kolor = this.kolor.clone().darker(.04);

    var s = new Sector(
      400, 200, 150,
      start,
      end
    );

    var animDelay = (i * 200) + 'ms';

    var label = this.label(name, value, kolor);

    label.attr({ opacity: 0 });

    s.stroke('#FFF', 3);
    s.fill(kolor);

    s.attr({
      endAngle: start,
      radius: 0
    }).addTo(stage).on('mouseover', over).on('mouseout', out);
    label.on('mouseover', over).on('mouseout', out);

    function over() {
      label.text.attr('fontWeight', 'bold');
      label.animate('.2s', {
        x: 40
      });
      s.animate('.2s', {
        radius: 170,
        fillColor: kolor.lighter(.1)
      }, {
        easing: 'sineOut'
      });
    }

    function out() {
      label.text.attr('fontWeight', '');
      label.animate('.2s', {
        x: 30
      });
      s.animate('.2s', {
        radius: 150,
        fillColor: kolor
      });
    }

    s.animate('.4s', {
      radius: 150,
      startAngle: start,
      endAngle: end
    }, {
      easing: 'sineOut',
      delay: animDelay
    });

    label.animate('.4s', {
      opacity: 1
    }, { delay: animDelay });

    this.angle = end;
  },

  label: function(name, v, fill) {

    var g = new Group().attr({
      x: 30,
      y: this.labelY,
      cursor: 'pointer'
    });

    var t = new Text(name + ' (' + v + '%)').addTo(g);
    var r = new Rect(0, 0, 20, 20, 5).fill(fill).addTo(g);

    t.attr({
      x: 30,
      y: 5,
      textFillColor: 'black',
      fontFamily: 'Arial',
      fontSize: '14'
    });

    g.addTo(stage);
    this.labelY += 30;

    g.text = t;

    return g;
  }
};