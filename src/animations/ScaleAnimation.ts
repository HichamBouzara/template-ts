import { Matrix3x3 } from "../math/Matrix3x3";

export class ScaleAnimation {
  constructor(private elementSelector: HTMLElement) {}

  scaleUpAndDown() {
    // this.scaleWithGSAP();
    this.scaleWithMath(1, 2, 1000);
  }

  private scaleWithGSAP() {}

  private scaleWithMath(
    startScale: number,
    endScale: number,
    duration: number
  ) {
    const element = this.elementSelector;

    const startTime = performance.now();
    // Adjust to scale up and down within the same duration
    const totalDuration = duration / 2; // Half duration for scaling up, half for down

    const animate = (now: number) => {
      const elapsedTime = now - startTime;
      // Calculate progress as a fraction of 1, where 1 is the halfway point
      let fraction = (elapsedTime / totalDuration) % 2; // Use modulo to flip for scaling down
      // Reverse fraction after reaching the midpoint to scale down
      if (fraction > 1) fraction = 2 - fraction;

      const currentScaleFactor =
        startScale + (endScale - startScale) * fraction;
      // Use the Matrix3x3 class to create a scaling matrix
      const scalingMatrix = Matrix3x3.scalingMatrix(
        currentScaleFactor,
        currentScaleFactor
      );
      // Apply the current scaling matrix as a transform
      const cssTransform = `matrix(${scalingMatrix.matrix[0][0]}, ${scalingMatrix.matrix[1][0]}, ${scalingMatrix.matrix[0][1]}, ${scalingMatrix.matrix[1][1]}, 0, 0)`;
      element.style.transform = cssTransform;

      // Continue the animation if not completed both up and down scaling
      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      } else {
        // Reset transform to original state
        element.style.transform = "none";
      }
    };

    requestAnimationFrame(animate);
  }
}
