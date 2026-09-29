class Square {
  constructor(sideLength) {
    this.sideLength = sideLength;
    this.perimeter = 4 * sideLength;
    this.area = sideLength * sideLength;
    this.createdAt = new Date();
  }
}

module.exports = Square;
