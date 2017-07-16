function Canvas (dom) {
    this.dom = dom;
    this.cxt = this.dom.getContext('2d');
}

// 设置宽高
Canvas.prototype.setWH = function () {
    var dom = this.dom;
    var body = document.body;
    var w = body.clientWidth;
    var h = body.clientHeight;
    this.width = w;
    this.height = h;
    dom.setAttribute('width', w);
    dom.setAttribute('height', h);
}

// 填充背景色
Canvas.prototype.fillBg = function () {
    var cxt = this.cxt;
    cxt.fillStyle = '#1E1E1E';
    cxt.fillRect(0, 0, this.width, this.height);
}

// 画线
// http://www.cnblogs.com/v-rockyli/p/3833845.html
Canvas.prototype.drawLine = function (startX, startY, dir) {
    var cxt = this.cxt;
    var lineX = 0;
    var lineY = 0;
    
    if (dir === 'row') {
        lineY = startY - 0.5;   
        cxt.moveTo(startX, lineY);
        cxt.lineTo(this.width, lineY);
    } else if (dir === 'col'){
        lineX = startX - 0.5;
        cxt.moveTo(lineX, startY);
        cxt.lineTo(lineX, this.height);
    }
    
    cxt.lineWidth = 1;
    cxt.strokeStyle = 'grey';
    cxt.stroke();
}

// 画标线
Canvas.prototype.markLine = function () {}

// 写字
Canvas.prototype.setText = function (startX, startY, text) {
    var cxt = this.cxt;
    cxt.font = '14';
    cxt.fillStyle = 'gray';
    cxt.fillText(text, startX, startY);
}

// 画网格
Canvas.prototype.drawGrid = function () {
    var w = this.width;
    var h = this.height;
    var rowTimes = 0;
    var colTimes = 0;
    
    for (var i = 20; i <= h; i = i + 10) {
        var rowStartX = 20;
        if (rowTimes % 5 === 0) {
            rowStartX = 0;
            this.setText(rowStartX, i - 2, i - 20);
        }
        
        rowTimes ++ ;
        this.drawLine(rowStartX, i, 'row');
    }
    
    for (var j = 20; j <= w; j = j + 10) {
        var rowStartY = 20;
        if (colTimes % 5 === 0) {
            rowStartY = 0;
            this.setText(j, 9, j - 20);
        }
        
        colTimes ++ ;
        this.drawLine(j, rowStartY, 'col');
    }
}

Canvas.prototype.init = function () {
    this.setWH();
    this.fillBg();
    this.drawGrid();
}

var canvasDom = document.querySelector('#canvas');
var canvas = new Canvas (canvasDom);
canvas.init();