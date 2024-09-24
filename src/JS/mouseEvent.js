// mouse 이벤트 작성
const main_img = document.querySelector(".main-image-container");
const large_img = document.querySelector(".large-image-container");
const large_scope = document.querySelector(".large-scope");
const LARGE_SCOPE_WIDTH = 100;
const LARGE_SCOPE_HEIGHT = 100;

function throttle(mainFunc, delay) {
  let timeFlag = null;
  return (...args) => {
    if (timeFlag === null) {
      mainFunc(...args);
      timeFlag = setTimeout(() => {
        timeFlag = null;
      }, delay);
    }
  };
}

function setLargeScopePosition(event) {
  const main_width = event.currentTarget.clientWidth;
  const main_height = event.currentTarget.clientHeight;

  const { offsetX, offsetY } = {
    offsetX: event.offsetX,
    offsetY: event.offsetY,
  };

  if (
    offsetY + LARGE_SCOPE_WIDTH >= main_height &&
    offsetX + LARGE_SCOPE_HEIGHT >= main_width
  ) {
    large_scope.style.cssText = `top : ${
      offsetY - LARGE_SCOPE_HEIGHT
    }px; left : ${offsetX - LARGE_SCOPE_WIDTH}px;`;
  } else if (
    offsetY + LARGE_SCOPE_HEIGHT >= main_height &&
    offsetX + LARGE_SCOPE_WIDTH < main_width
  ) {
    large_scope.style.cssText = `top : ${
      offsetY - LARGE_SCOPE_HEIGHT
    }px; left : ${offsetX}px;`;
  } else if (
    offsetY + LARGE_SCOPE_WIDTH < main_height &&
    offsetX + LARGE_SCOPE_HEIGHT >= main_width
  ) {
    large_scope.style.cssText = `top : ${offsetY}px; left : ${
      offsetX - LARGE_SCOPE_WIDTH
    }px;`;
  } else {
    large_scope.style.cssText = `top : ${offsetY}px; left :${offsetX}px;`;
  }
}

function mouseEnterInMainEvent(event) {
  large_img.classList.add("enter");
  large_scope.classList.add("enter");
}

main_img.addEventListener("mouseenter", mouseEnterInMainEvent);

main_img.addEventListener("mouseleave", (event) => {
  large_img.classList.remove("enter");
  large_scope.classList.remove("enter");
});

main_img.addEventListener("mousemove", throttle(setLargeScopePosition, 100));
