import { Finger, handShapes, RootHandShape } from "../src/app/pages/signwrite/types";

function search() {
  handShapes.forEach((handShape) => {
    if (handShape.rootShape === RootHandShape.CIRCLE) {
      console.log(handShape.toTSV());
    }
  });
}

search();
