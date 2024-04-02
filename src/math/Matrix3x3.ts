import { Vector2D } from "./Vector2D";

export class Matrix3x3 {
  // Matrix is represented as a 2D array
  constructor(
    public matrix: number[][] = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]
  ) {}

  multiply(matrix: Matrix3x3): Matrix3x3 {
    let result = new Matrix3x3([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          result.matrix[i][j] += this.matrix[i][k] * matrix.matrix[k][j];
        }
      }
    }
    return result;
  }

  transform(vector: Vector2D): Vector2D {
    let x =
      vector.x * this.matrix[0][0] +
      vector.y * this.matrix[0][1] +
      this.matrix[0][2];
    let y =
      vector.x * this.matrix[1][0] +
      vector.y * this.matrix[1][1] +
      this.matrix[1][2];
    return new Vector2D(x, y);
  }

  determinant(): number {
    const a = this.matrix;
    return (
      a[0][0] * (a[1][1] * a[2][2] - a[2][1] * a[1][2]) -
      a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
      a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0])
    );
  }

  adjugate(): Matrix3x3 {
    const a = this.matrix;
    // Calculating the adjugate (cofactor matrix transposed)
    let adj = [
      [
        a[1][1] * a[2][2] - a[2][1] * a[1][2],
        -(a[0][1] * a[2][2] - a[0][2] * a[2][1]),
        a[0][1] * a[1][2] - a[0][2] * a[1][1],
      ],
      [
        -(a[1][0] * a[2][2] - a[1][2] * a[2][0]),
        a[0][0] * a[2][2] - a[0][2] * a[2][0],
        -(a[0][0] * a[1][2] - a[1][0] * a[0][2]),
      ],
      [
        a[1][0] * a[2][1] - a[2][0] * a[1][1],
        -(a[0][0] * a[2][1] - a[2][0] * a[0][1]),
        a[0][0] * a[1][1] - a[1][0] * a[0][1],
      ],
    ];
    return new Matrix3x3(adj);
  }

  multiplyByScalar(scalar: number): Matrix3x3 {
    let result = new Matrix3x3(
      this.matrix.map((row) => row.map((value) => value * scalar))
    );
    return result;
  }

  inverse(): Matrix3x3 | null {
    const det = this.determinant();
    if (det === 0) {
      // The matrix isn't invertible if the determinant is 0.
      return null;
    }
    const adj = this.adjugate();
    // The inverse is 1/det * adjugate
    return adj.multiplyByScalar(1 / det);
  }

  static rotationMatrix(angleInDegrees: number): Matrix3x3 {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return new Matrix3x3([
      [Math.cos(angleInRadians), -Math.sin(angleInRadians), 0],
      [Math.sin(angleInRadians), Math.cos(angleInRadians), 0],
      [0, 0, 1],
    ]);
  }

  static scalingMatrix(sx: number, sy: number): Matrix3x3 {
    return new Matrix3x3([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ]);
  }

  static translationMatrix(tx: number, ty: number): Matrix3x3 {
    return new Matrix3x3([
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1],
    ]);
  }

  // Implementations for inverse, rotation, scaling, and translation matrices
  // are omitted for brevity but would follow similar mathematical operations
}
