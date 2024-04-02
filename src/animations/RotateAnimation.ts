import { Matrix3x3 } from "../math/Matrix3x3";
import { Vector2D } from "../math/Vector2D";
import { gsap } from "gsap";

export class RotateAnimation {
  constructor(
    private elementSelector: HTMLElement,
    private duration: number = 1000,
    private angle: number = 360,
    private pointX?: number,
    private pointY?: number
  ) {}

  rotateAroundSelf() {
    // this.rotateWithGSAP();
    this.rotateWithMath();
  }

  rotateAroundRandomPoint() {
    this.rotateAroundPointWithMath();
  }

  rotateAroundPoint(point: Vector2D) {
    this.rotateAroundPointWithMath(point);
  }

  private rotateWithGSAP() {
    gsap.to(this.elementSelector, {
      duration: this.duration / 1000,
      rotation: this.angle,
      ease: "none",
    });
  }

  private setRotation(angle: number) {
    // Assuming the element's transform origin is already centered
    const rotationMat = Matrix3x3.rotationMatrix(angle);
    const cssTransform = `matrix(${rotationMat.matrix[0][0]}, ${rotationMat.matrix[1][0]}, ${rotationMat.matrix[0][1]}, ${rotationMat.matrix[1][1]}, 0, 0)`;
    this.elementSelector.style.transform = cssTransform;
  }

  private rotateWithMath() {
    const element = this.elementSelector;
    const duration = this.duration;
    const startTime = performance.now();
    const initialAngle = 0;
    const finalAngle = this.angle;
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const fraction = Math.min(elapsedTime / duration, 1);
      const currentAngle =
        initialAngle + (finalAngle - initialAngle) * fraction;
      this.setRotation(currentAngle);
      if (fraction < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  private rotateAroundPointWithMath(rotationPoint: Vector2D = null) {
    const originalTransform = window.getComputedStyle(
      this.elementSelector
    ).transform;
    if (!rotationPoint) {
      // Define a random point if none provided
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      rotationPoint = new Vector2D(
        Math.random() * viewportWidth,
        Math.random() * viewportHeight
      );
      console.log("Random rotation point: ", rotationPoint);
    }

    // Adjust transform-origin to the rotation point
    this.elementSelector.style.transformOrigin = `${rotationPoint.x}px ${rotationPoint.y}px`;

    const duration = this.duration;
    const finalAngle = this.angle;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const fraction = Math.min(elapsedTime / duration, 1);
      const currentAngle = finalAngle * fraction;

      // Only use the rotation matrix since transform-origin is set
      const rotationMat = Matrix3x3.rotationMatrix(currentAngle);

      // Apply only rotation around the updated transform-origin
      const cssTransform = `matrix(${rotationMat.matrix[0][0]}, ${rotationMat.matrix[1][0]}, ${rotationMat.matrix[0][1]}, ${rotationMat.matrix[1][1]}, 0, 0)`;
      this.elementSelector.style.transform = cssTransform;

      if (fraction < 1) {
        requestAnimationFrame(animate);
      } else {
        // Reset transform-origin after animation completes
        this.elementSelector.style.transformOrigin = "50% 50%";

        // Reset transform to its original state or apply the final resting transform
        this.elementSelector.style.transform =
          originalTransform === "none" ? "" : originalTransform;
      }
    };

    requestAnimationFrame(animate);
  }
}
