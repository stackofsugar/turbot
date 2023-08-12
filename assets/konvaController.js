/// <reference path="F:/jquery-3.6.0.min.js" />
/// <reference path="F:/konva.min.js" />
var canvas = $(".tape-canvas");
var htmlCanvas = $(".tape-canvas canvas");

class KonvaController {
    constructor() {
        this.rectWh = 50;
        this.stage = new Konva.Stage({
            container: "tape-canvas",
            width: canvas.width(),
            height: 500,
        });
        this.textLayer = [new Konva.Layer(), new Konva.Layer(), new Konva.Layer(), new Konva.Layer(), new Konva.Layer(), new Konva.Layer()];
        this.textHead = [0, 0, 0, 0, 0, 0];
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        for (var i = 0; i < this.textLayer.length; i++) {
            this.stage.add(this.textLayer[i]);
        }

        this.text_initPos = 10;
        this.text_vGap = 85;
        this.text_hGap = 50;
        this.canvasCenterX = canvas.width() / 2;
    }

    _drawRect(x, y) {
        var rect = new Konva.Rect({
            x: x - this.rectWh,
            y: y - this.rectWh,
            width: this.rectWh,
            height: this.rectWh,
            fill: "#0d1117",
            stroke: "white",
            strokeWidth: 1,
        });
        this.layer.add(rect);
    }

    _drawTriangle(x, y) {
        var triangle = new Konva.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: 20,
            fill: "white",
            stroke: "#0d1117",
            strokeWidth: 4,
        });
        this.layer.add(triangle);
    }

    _drawText(text, x, y, layer) {
        var myBgWh = 40;
        var myBackroundRect = new Konva.Rect({
            x: x - myBgWh / 2,
            y: y - 7,
            width: myBgWh,
            height: myBgWh,
            fill: "#0d1117",
            strokeWidth: 0,
        });

        var myText = new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: 35,
            fontFamily: "Lato",
            fill: "white",
        });
        myText.offsetX(myText.width() / 2);

        layer.add(myBackroundRect);
        layer.add(myText);
    }

    _drawTextLevel(text, col, tape) {
        this._drawText(text, this.canvasCenterX + this.text_hGap * col, this.text_initPos + this.text_vGap * (tape - 1), this.textLayer[tape - 1]);
    }

    _shiftTextLayer(tape, distance) {
        this.textLayer[tape - 1].move({
            y: 0,
            x: this.text_hGap * distance,
        });
    }

    pushStay(item, tape) {
        this._drawTextLevel(item, this.textHead[tape - 1], tape);
    }

    pushRight(item, tape) {
        this._drawTextLevel(item, this.textHead[tape - 1], tape);
        this.textHead[tape - 1] += 1;
        this._shiftTextLayer(tape, -1);
    }

    pushLeft(item, tape) {
        this._drawTextLevel(item, this.textHead[tape - 1], tape);
        this.textHead[tape - 1] -= 1;
        this._shiftTextLayer(tape, 1);
    }

    drawTuringPlane(tapes) {
        var spacePerTape = 84;
        var neededSpace = 0;
        var gap = 35;
        var canvasCenterX = canvas.width() / 2 + this.rectWh / 2;
        var startingPosition = this.rectWh;
        var canvasY_increments = this.rectWh + gap;
        var canvasFromCenterX = canvas.width() - canvasCenterX + this.rectWh;
        var tileCountX = canvasFromCenterX / this.rectWh;
        for (var i = 0; i < tapes; i++) {
            neededSpace += spacePerTape;
            for (var j = 0; j < tileCountX; j++) {
                this._drawRect(canvasCenterX + this.rectWh * j, startingPosition + canvasY_increments * i);
                if (j > 0) {
                    this._drawRect(canvasCenterX - this.rectWh * j, startingPosition + canvasY_increments * i);
                }
            }
            this._drawTriangle(canvasCenterX - this.rectWh / 2, startingPosition + 10 + canvasY_increments * i);
        }
        this.stage.height(neededSpace);
    }

    destroy() {
        this.stage.destroy();
    }
}