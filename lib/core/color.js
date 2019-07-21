export class Color {
  /**
   * @param {int|Color} [r=0]
   * @param {int} [g=0]
   * @param {int} [b=0]
   * @param {int} [a=255]
   */
  constructor(r, g, b, a) {
    if (r instanceof Color) {
      this.set(r);
    } else {
      this.r = r || 0;
      this.g = g || 0;
      this.b = b || 0;
      this.a = a || 255;
    }
  }

  /**
   * @param {int|Color} [r=0]
   * @param {int} [g=0]
   * @param {int} [b=0]
   * @param {int} [a=255]
   */
  set(r, g, b, a) {
    if (r instanceof Color) {
      this.r = r.r;
      this.g = r.g;
      this.b = r.b;
      this.a = r.a;
    } else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a || 255;
    }
  }


  /**
   * @param {NormalizedColor} normalizedColor
   */
  getNormalizedColor(normalizedColor) {
    normalizedColor.r = this.r / 255;
    normalizedColor.g = this.g / 255;
    normalizedColor.b = this.b / 255;
    normalizedColor.a = this.a / 255;
  }


  /**
   * @param {Color} color
   * @param {boolean} [skipSafety=false]
   */
  add(color, skipSafety) {
    this.r = this.r + color.r;
    this.g = this.g + color.g;
    this.b = this.b + color.b;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  /**
   * @param {Color} color
   * @param {boolean} [skipSafety=false]
   */
  subtract(color, skipSafety) {
    this.r = this.r - color.r;
    this.g = this.g - color.g;
    this.b = this.b - color.b;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  /**
   * @param {Color} color
   */
  swap(color) {
    const tmpR = color.r;
    const tmpG = color.g;
    const tmpB = color.b;
    const tmpA = color.a;

    color.r = this.r;
    this.r = tmpR;

    color.g = this.g;
    this.g = tmpG;

    color.b = this.b;
    this.b = tmpB;

    color.a = this.a;
    this.a = tmpA;
  }


  /**
   * @param {Color|NormalizedColor} color
   * @param {boolean} [skipSafety=false]
   */
  multiply(color, skipSafety) {
    this.r = color.r * this.r;
    this.g = color.g * this.g;
    this.b = color.b * this.b;
    this.a = color.a * this.a;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  /**
   * @param {float|int|number} value
   * @param {boolean} [skipSafety=false]
   */
  multiplyByVal(value, skipSafety) {
    this.r = this.r * value;
    this.g = this.g * value;
    this.b = this.b * value;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  /**
   * @param {int|float|number} divisor
   * @param {boolean} [skipSafety=false]
   */
  divideByVal(divisor, skipSafety) {
    this.r = this.r / divisor;
    this.g = this.g / divisor;
    this.b = this.b / divisor;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  /**
   * @param {Color} colorA
   * @param {Color} colorB
   * @param {int} stepCount
   * @param {boolean} [skipSafety=false]
   */
  interpolate(colorA, colorB, stepCount, skipSafety) {
    this.r = (colorB.r - colorA.r) / stepCount;
    this.g = (colorB.g - colorA.g) / stepCount;
    this.b = (colorB.b - colorA.b) / stepCount;

    if (skipSafety !== true) {
      this.round();
      this.clamp();
    }
  }


  round() {
    this.r = Math.round(this.r);
    this.g = Math.round(this.g);
    this.b = Math.round(this.b);
    this.a = Math.round(this.a);
  }


  clamp() {
    this.r = Math.max(Math.min(this.r, 255), 0);
    this.g = Math.max(Math.min(this.g, 255), 0);
    this.b = Math.max(Math.min(this.b, 255), 0);
    this.a = Math.max(Math.min(this.a, 255), 0);
  }
}

