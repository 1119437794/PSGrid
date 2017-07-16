function Event (dom) {
    this.dom = dom;
}

// 拖拽
// dragDom 被拖拽dom
Event.prototype.drag = function (dragDom) {
    var dom = this.dom; // 画布dom
    var domW = this.dom.width;
    var domH = this.dom.height;
    var dragStartX = 0; // 鼠标拖拽起点X坐标
    var dragStartY = 0; // 鼠标拖拽起点Y坐标
    var setCss = this.setCss;
    var sign = function (num) {
        var tmpNum = Math.sign(num);
        return tmpNum === -1 ? -2 : tmpNum;
    }

    // 拖拽中移动回调 
    // 为了解绑
    var mouseMoveCallback = function (e) {
        var endX = e.clientX;
        var endY = e.clientY;
        var flagW = endX > domW;
        var flagH = endY > domH;

        if (flagH || flagW) {
            endX = flagW ? domW : endX;
            endY = flagH ? domH : endY;
        }

        var w = endX - dragStartX;
        var h = endY - dragStartY;
        var css = {};
        var prop = 'transform-origin';

        setCss(dragTextDom, {
            left: endX +  sign(w) * 10 + 'px',
            top: endY + sign(h) * 10 + 'px'
        })

        switch (true) {
            case w < 0 && h < 0 :
                w = -w;
                h = -h;
                css = {
                    [prop]: 'left top',
                    transform: 'rotate(180deg)'
                };
                break;

            case w < 0 :
                w = -w;
                css = {
                    [prop]: 'left center',
                    transform: 'rotate(180deg)'
                };
                break;

           case h < 0 :
                h = -h;
                css = {
                    [prop]: 'top center',
                    transform: 'rotate(180deg)'
                };
                break;

           default :
                css = {
                    [prop]: 'left center',
                    transform: 'rotate(0)'
                };
                break;  
        }

        setCss(dragDom, Object.assign({
            width: w + 'px',
            height: h + 'px',
            border: '1px solid #fff'
        }, css));

        dragTextDom.innerText = w + ' x ' + h;
    }

    var mouseupCallback = function () {
        setCss(dragDom, {
             width: 0,
             height: 0,
             border: 'none'
            });
            dragTextDom.innerText = '';
            document.removeEventListener('mousemove', mouseMoveCallback);
            document.removeEventListener('mouseup', mouseupCallback);
    }

    dom.addEventListener('mousedown', function (e) {
        dragStartX = e.offsetX;
        dragStartY = e.offsetY;
        
        setCss(dragDom, {
            left: dragStartX + 'px',
            top: dragStartY + 'px'
        });

        document.addEventListener('mousemove', mouseMoveCallback);
        document.addEventListener('mouseup', mouseupCallback);
    })
}

// 设置样式
Event.prototype.setCss = function (dom, options) {
    var _str = '';
    for (var i in options) {
        _str += i + ':' + options[i] + ';'
    }
    dom.style.cssText += _str;
}

var dragDom = document.querySelector('.dragMask');
var dragTextDom = document.querySelector('.dragText');
var event = new Event(canvasDom);

document.onselectstart = function () {
    return false;
}; 

event.drag(dragDom);
