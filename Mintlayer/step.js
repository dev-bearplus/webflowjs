
function Step(context, t, radius) {
    this._context = context;
    this._t = t;
    this._radius = radius;
}

Step.prototype = {
    areaStart: function () {
        this._line = 0;
    },
    areaEnd: function () {
        this._line = NaN;
    },
    lineStart: function () {
        this._x = this._y = NaN;
        this._point = 0;
    },
    lineEnd: function () {
        if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
        if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
        if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
    },
    point: function (x_, y_) {

        x = +x_, y = + y_;
        switch (this._point) {
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
            default: {
                var x1, y1;


                if (this._t <= 0) {
                    this._context.arcTo(this._x, y, this._x, y, this._radius);
                    this._context.lineTo(x, y);
                } else {
                    // Intermediate inference content between previous point and current point
                    x1 = this._x * (1 - this._t) + x * this._t;
                    y1 = this._y * (1 - this._t) + y * this._t;
                    // check angle
                    if (this._y < y - this._radius) {
                        // (Top to Bottom Arc)
                        this._context.arcTo(this._x, this._y, x, y1, this._radius);
                    } else if (this._y > y + this._radius) {
                        //  (Bottom to Top Arc)
                        this._context.arcTo(this._x, this._y, x, y1, this._radius);
                    } else if (this._x < x - this._radius) {
                        // (Left to Right Arc)
                        this._context.arcTo(this._x, this._y, x1, y, this._radius);

                    } else if (this._x > x + this._radius) {
                        //   (Right to Left Arc)  
                        this._context.arcTo(this._x, this._y, x1, y, this._radius);
                    } else {
                        //  spacing lower with radiant draw line
                        this._context.lineTo(x, y);
                    }
                }
                break;
            }
        }
        this._x = x, this._y = y;
    }
};

stepRound = function (context, radius = 100) {
    return new Step(context, 0.5, radius);
}; 