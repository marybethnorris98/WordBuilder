// Responsive, centered, proportional version of your program
// BASE design size (what your original coords were designed for)
const BASE_W = 1600;
const BASE_H = 1400;

let shapes = [];
let buildAreaBase = { x: 50, y: 50, w: 800, h: 100 }; // base coords (unchanged)
let resetButton;
let nextClickIndex = 0; // for ordering clones

// runtime layout
let scaleFactor = 1;
let offsetX = 0;
let offsetY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  noStroke();

  // Create reset button (we'll position it in repositionLayout)
  resetButton = createButton("🔄 Reset");
  resetButton.style('font-size', '20px'); // base style; will be visually scaled by position and textSize usage
  resetButton.mousePressed(resetShapes);

  // Load base shapes (use base coordinates here)
  addShapes();

  // Compute initial layout and update display coordinates
  repositionLayout();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  repositionLayout();
}

// ----- Helpers for scaling/centering -----
function computeLayout() {
  // keep proportions: choose the smaller scale so everything fits
  const sx = windowWidth / BASE_W;
  const sy = windowHeight / BASE_H;
  scaleFactor = min(sx, sy);

  // center the scaled design
  offsetX = (windowWidth - BASE_W * scaleFactor) / 2;
  offsetY = (windowHeight - BASE_H * scaleFactor) / 2;
}

// convert base coordinate -> displayed coordinate
function sx(v) { return offsetX + v * scaleFactor; }
function sy(v) { return offsetY + v * scaleFactor; }
// convert base length -> displayed length
function sw(v) { return v * scaleFactor; }
function sh(v) { return v * scaleFactor; }

// Recompute display positions for UI elements and shapes when the window size changes
function repositionLayout() {
  computeLayout();

  // position the reset button under the build area (centered)
  const buildX = sx(buildAreaBase.x);
  const buildY = sy(buildAreaBase.y);
  const buildW = sw(buildAreaBase.w);
  const buildH = sh(buildAreaBase.h);

  // style the button font size based on scale (a little clamp so it stays readable)
  const btnSize = Math.max(14, Math.round(18 * scaleFactor));
  resetButton.style('font-size', btnSize + 'px');

  // place button centered beneath the build area (adjust vertical offset a bit)
  const btnX = buildX + buildW / 2 - (80 * scaleFactor); // approximate half button width
  const btnY = buildY + buildH + 40 * scaleFactor;
  resetButton.position(btnX, btnY);

  // update every shape's displayed positions based on base coords
  for (let s of shapes) {
    // for base tiles: keep their logical home (base) coords, compute displayed x/y from them
    s.displayX = sx(s.homeX);
    s.displayY = sy(s.homeY);
    s.displayW = sw(s.w);
    s.displayH = sh(s.h);

    // initialize target display positions if not present
    s.targetDisplayX = s.targetDisplayX === undefined ? s.displayX : sx(s.baseTargetX || s.homeX);
    s.targetDisplayY = s.targetDisplayY === undefined ? s.displayY : sy(s.baseTargetY || s.homeY);

    // local scale (1 for base visual size; clones will target 1.5)
    s.displayLocalScale = s.displayLocalScale === undefined ? 1 : s.displayLocalScale;
    s.targetLocalScale = s.targetLocalScale === undefined ? 1 : s.targetLocalScale;
  }

  // Make sure clones that are in box get arranged with recalculated display coords
  arrangeShapesInBox();
}

// ----- Shape creation (store base coords) -----
function addShapes() {
  function addShape(x, y, w, h, color, label) {
    shapes.push({
      homeX: x, homeY: y, // base home coords
      w: w, h: h,         // base sizes
      color: color,
      label: label,
      inBox: false,       // only clones will be true
      baseTargetX: x,
      baseTargetY: y,
      displayX: 0, displayY: 0, // will be set in repositionLayout()
      targetDisplayX: 0, targetDisplayY: 0,
      displayW: 0, displayH: 0,
      displayLocalScale: 1,
      targetLocalScale: 1,
      originalColor: color,
      isBase: true,       // originals are base tiles (never removed)
      clickIndex: null
    });
  }

  // Example subset — kept identical to user's original base coordinates
  addShape(40, 300, 40, 40, 'lightyellow', 'a');
  addShape(90, 300, 40, 40, 'white', 'b');
  addShape(140, 300, 40, 40, 'white', 'c');
  addShape(190, 300, 40, 40, 'white', 'd');
  addShape(240, 300, 40, 40, 'lightyellow', 'e');
  addShape(290, 300, 40, 40, 'white', 'f');
  addShape(340, 300, 40, 40, 'white', 'g');
  addShape(390, 300, 40, 40, 'white', 'h');
  addShape(440, 300, 40, 40, 'lightyellow', 'i');
  addShape(490, 300, 40, 40, 'white', 'j');
  addShape(540, 300, 40, 40, 'white', 'k');
  addShape(590, 300, 40, 40, 'white', 'l');
  addShape(640, 300, 40, 40, 'white', 'm');
  addShape(40, 350, 40, 40, 'white', 'n');
  addShape(90, 350, 40, 40, 'lightyellow', 'o');
  addShape(140, 350, 40, 40, 'white', 'p');
  addShape(190, 350, 40, 40, 'white', 'q');
  addShape(240, 350, 40, 40, 'white', 'r');
  addShape(290, 350, 40, 40, 'white', 's');
  addShape(340, 350, 40, 40, 'white', 't');
  addShape(390, 350, 40, 40, 'lightyellow', 'u');
  addShape(440, 350, 40, 40, 'white', 'v');
  addShape(490, 350, 40, 40, 'white', 'w');
  addShape(540, 350, 40, 40, 'white', 'x');
  addShape(590, 350, 40, 40, 'white', 'y');
  addShape(640, 350, 40, 40, 'white', 'z');
  addShape(40, 450, 60, 40, 'white', 'ch');
  addShape(115, 450, 60, 40, 'white', 'sh');
  addShape(185, 450, 60, 40, 'white', 'th');
  addShape(255, 450, 60, 40, 'white', 'wh');
  addShape(325, 450, 60, 40, 'white', 'qu');
  addShape(600, 450, 60, 40, 'white', '-ck');
  addShape(775, 300, 60, 40, 'lightgreen', '-s');
  addShape(395, 450, 60, 40, 'white', '-ff');
  addShape(465, 450, 60, 40, 'white', '-ll');
  addShape(535, 450, 60, 40, 'white', '-ss');
  addShape(600, 450, 60, 40, 'white', '-zz');
  addShape(40, 550, 60, 40, 'lightyellow', '-ing');
  addShape(115, 550, 60, 40, 'lightyellow', '-ang');
  addShape(185, 550, 60, 40, 'lightyellow', '-ong');
  addShape(255, 550, 60, 40, 'lightyellow', '-ung');
  addShape(325, 550, 60, 40, 'lightyellow', '-ink');
  addShape(395, 550, 60, 40, 'lightyellow', '-ank');
  addShape(465, 550, 60, 40, 'lightyellow', '-onk');
  addShape(535, 550, 60, 40, 'lightyellow', '-unk');
  addShape(395, 600, 60, 40, 'white', 'bl-');
  addShape(255, 600, 60, 40, 'white', 'cl-');
  addShape(325, 600, 60, 40, 'white', 'fl-');
  addShape(40, 600, 60, 40, 'white', 'gl-');
  addShape(115, 600, 60, 40, 'white', 'pl-');
  addShape(185, 600, 60, 40, 'white', 'sl-');
  addShape(255, 900, 60, 40, 'white', 'br-');
  addShape(325, 900, 60, 40, 'white', 'cr-');
  addShape(395, 900, 60, 40, 'white', 'dr-');
  addShape(465, 900, 60, 40, 'white', 'fr-');
  addShape(535, 900, 60, 40, 'white', 'gr-');
  addShape(600, 900, 60, 40, 'white', 'pr-');
  addShape(675, 900, 60, 40, 'white', 'tr-');
  addShape(975, 600, 60, 40, 'white', 'sc-');
  addShape(900, 600, 60, 40, 'white', 'sk-');
  addShape(750, 600, 60, 40, 'white', 'sm-');
  addShape(825, 600, 60, 40, 'white', 'sn-');
  addShape(600, 600, 60, 40, 'white', 'sp-');
  addShape(675, 600, 60, 40, 'white', 'st-');
  addShape(40, 650, 60, 40, 'white', 'scr-');
  addShape(115, 650, 60, 40, 'white', 'shr-');
  addShape(185, 650, 60, 40, 'white', 'spl-');
  addShape(255, 650, 60, 40, 'white', 'spr-');
  addShape(325, 650, 60, 40, 'white', 'squ-');
  addShape(395, 650, 60, 40, 'white', 'str-');
  addShape(465, 650, 60, 40, 'white', 'thr-');
  addShape(1100, 800, 60, 40, 'white', 'dw-');
  addShape(1000, 800, 60, 40, 'white', 'sw-');
  addShape(900, 800, 60, 40, 'white', 'tw-');
  addShape(40, 900, 60, 40, 'lightyellow', 'y');
  addShape(115, 700, 60, 40, 'white', '-ld');
  addShape(185, 700, 60, 40, 'white', '-lf');
  addShape(255, 700, 60, 40, 'white', '-lk');
  addShape(325, 700, 60, 40, 'white', '-lp');
  addShape(395, 700, 60, 40, 'white', '-lt');
  addShape(465, 700, 60, 40, 'white', '-ct');
  addShape(535, 700, 60, 40, 'white', '-ft');
  addShape(600, 700, 60, 40, 'white', '-nt');
  addShape(675, 700, 60, 40, 'white', '-pt');
  addShape(750, 700, 60, 40, 'white', '-st');
  addShape(825, 700, 60, 40, 'white', '-xt');
  addShape(900, 700, 60, 40, 'white', '-mp');
  addShape(40, 700, 60, 40, 'white', '-nd');
  addShape(115, 750, 60, 40, 'white', '-sk');
  addShape(185, 750, 60, 40, 'white', '-sp');
  addShape(600, 650, 60, 40, 'white', '-nch');
  addShape(675, 650, 60, 40, 'white', '-tch');
  addShape(750, 650, 60, 40, 'white', '-dge');
  addShape(850, 300, 60, 40, 'lightgreen', 'un-');
  addShape(850, 350, 60, 40, 'lightgreen', 'sub-');
  addShape(850, 550, 60, 40, 'lightgreen', 'con-');
  addShape(920, 350, 60, 40, 'lightgreen', 'in-');
  addShape(775, 350, 60, 40, 'lightgreen', 'mis-');
  addShape(920, 400, 60, 40, 'lightgreen', '-ing');
  addShape(40, 800, 60, 40, 'lightyellow', '-ild');
  addShape(115, 800, 60, 40, 'lightyellow', '-old');
  addShape(185, 800, 60, 40, 'lightyellow', '-olt');
  addShape(255, 800, 60, 40, 'lightyellow', '-ind');
  addShape(850, 400, 60, 40, 'lightgreen', '-es');
  addShape(395, 800, 60, 40, 'lightyellow', '*e');
  addShape(465, 800, 60, 40, 'lightyellow', 'a_e');
  addShape(535, 800, 60, 40, 'lightyellow', 'e_e');
  addShape(600, 800, 60, 40, 'lightyellow', 'i_e');
  addShape(675, 800, 60, 40, 'lightyellow', 'o_e');
  addShape(750, 800, 60, 40, 'lightyellow', 'u_e');
  addShape(825, 800, 60, 40, 'lightyellow', 'y_e');
  addShape(1000, 350, 60, 40, 'lightgreen', '-less');
  addShape(1000, 400, 60, 40, 'lightgreen', '-ness');
  addShape(775, 400, 60, 40, 'lightgreen', '-ment');
  addShape(775, 550, 60, 40, 'lightgreen', '-ful');
  addShape(920, 500, 60, 40, 'lightgreen', '-ish');
  addShape(850, 500, 60, 40, 'lightgreen', '-en');
  addShape(40, 850, 60, 40, 'white', '-ble');
  addShape(115, 850, 60, 40, 'white', '-cle');
  addShape(185, 850, 60, 40, 'white', '-dle');
  addShape(255, 850, 60, 40, 'white', '-fle');
  addShape(325, 850, 60, 40, 'white', '-gle');
  addShape(395, 850, 60, 40, 'white', '-kle');
  addShape(465, 850, 60, 40, 'white', '-ple');
  addShape(535, 850, 60, 40, 'white', '-tle');
  addShape(600, 850, 60, 40, 'white', '-zle');
  addShape(115, 900, 60, 40, 'lightyellow', 'ai');
  addShape(185, 900, 60, 40, 'lightyellow', 'ea');
  addShape(255, 900, 60, 40, 'lightyellow', 'oa');
  addShape(325, 900, 60, 40, 'lightyellow', '-ay');
  addShape(395, 900, 60, 40, 'lightyellow', 'ee');
  addShape(465, 900, 60, 40, 'lightyellow', '-oe');
  addShape(535, 900, 60, 40, 'white', 'ph');
  addShape(1000, 450, 60, 40, 'lightgreen', 're-');
  addShape(1000, 400, 60, 40, 'lightgreen', 'pro-');
  addShape(775, 450, 60, 40, 'lightgreen', 'de-');
  addShape(850, 450, 60, 40, 'lightgreen', 'pre-');
  addShape(920, 450, 60, 40, 'lightgreen', 'be-');
  addShape(40, 950, 60, 40, 'lightyellow', 'er');
  addShape(115, 950, 60, 40, 'lightyellow', 'ir');
  addShape(185, 950, 60, 40, 'lightyellow', 'ur');
  addShape(255, 950, 60, 40, 'lightyellow', 'ar');
  addShape(325, 950, 60, 40, 'lightyellow', 'or');
  addShape(40, 500, 60, 40, 'white', '-by');
  addShape(115, 500, 60, 40, 'white', '-vy');
  addShape(185, 500, 60, 40, 'white', '-zy');
  addShape(255, 500, 60, 40, 'white', '-ky');
  addShape(325, 500, 60, 40, 'white', '-ly');
  addShape(395, 500, 60, 40, 'white', '-ny');
  addShape(465, 500, 60, 40, 'white', '-dy');
  addShape(535, 500, 60, 40, 'white', '-fy');
  addShape(600, 500, 60, 40, 'white', '-py');
  addShape(670, 500, 60, 40, 'white', '-sy');
  addShape(670, 450, 60, 40, 'white', '-ty');
  addShape(255, 1000, 60, 40, 'lightyellow', 'ou');
  addShape(325, 1000, 60, 40, 'lightyellow', 'ow');
  addShape(395, 1000, 60, 40, 'lightyellow', 'oi');
  addShape(465, 1000, 60, 40, 'lightyellow', '-oy');
  addShape(535, 1000, 60, 40, 'lightyellow', 'igh');
  addShape(600, 1000, 60, 40, 'lightyellow', 'au');
  addShape(675, 1000, 60, 40, 'lightyellow', 'aw');
  addShape(1000, 300, 60, 40, 'lightgreen', '-ed');
  addShape(825, 1000, 60, 40, 'lightyellow', 'oo');
  addShape(920, 300, 60, 40, 'lightgreen', '-ic');
  addShape(40, 1050, 60, 40, 'lightyellow', 'eigh');
  addShape(1000, 500, 60, 40, 'lightgreen', '-tion');
  addShape(775, 500, 60, 40, 'lightgreen', '-sion');
  addShape(255, 1050, 60, 40, 'lightyellow', 'augh');
  addShape(325, 1050, 60, 40, 'lightyellow', 'ei');
  addShape(395, 1050, 60, 40, 'lightyellow', '-ew');
  addShape(465, 1050, 60, 40, 'lightyellow', '-ey');
  addShape(535, 1050, 60, 40, 'lightyellow', 'ie');
  addShape(600, 1050, 60, 40, 'lightyellow', 'ough');
  addShape(675, 1050, 60, 40, 'lightyellow', '-ue');
  addShape(750, 1050, 60, 40, 'lightyellow', 'ui');
  addShape(825, 1050, 60, 40, 'white', 'war');
  addShape(900, 1050, 60, 40, 'white', 'wor');
  addShape(40, 1100, 60, 40, 'white', 'gn');
  addShape(115, 1100, 60, 40, 'white', 'kn-');
  addShape(185, 1100, 60, 40, 'white', '-mb');
  addShape(255, 1100, 60, 40, 'white', '-mn');
  addShape(325, 1100, 60, 40, 'white', 'wr-');
}

// ----- draw loop -----
function draw() {
  background(240);

  // Draw build area (display coords)
  const bX = sx(buildAreaBase.x);
  const bY = sy(buildAreaBase.y);
  const bW = sw(buildAreaBase.w);
  const bH = sh(buildAreaBase.h);

  stroke(180);
  fill(255);
  rect(bX, bY, bW, bH, 15 * scaleFactor);

  // Which shapes are in the box (clones)
  let inBoxShapes = shapes.filter((s) => s.inBox);

  // Draw hint text when empty
  if (inBoxShapes.length === 0) {
    noStroke();
    fill(0);
    textSize(24 * scaleFactor);
    textAlign(CENTER, CENTER);
    text("🧱 Click letters to build a word", bX + bW / 2, bY + bH / 2);
  }

  // Smoothly move shapes toward their targets & scale
  for (let s of shapes) {
    // initialize if undefined
    s.displayX = s.displayX === undefined ? sx(s.homeX) : s.displayX;
    s.displayY = s.displayY === undefined ? sy(s.homeY) : s.displayY;
    s.displayLocalScale = s.displayLocalScale === undefined ? 1 : s.displayLocalScale;
    s.targetLocalScale = s.targetLocalScale === undefined ? 1 : s.targetLocalScale;
    s.targetDisplayX = s.targetDisplayX === undefined ? sx(s.homeX) : s.targetDisplayX;
    s.targetDisplayY = s.targetDisplayY === undefined ? sy(s.homeY) : s.targetDisplayY;

    // lerp for smooth motion
    s.displayX = lerp(s.displayX, s.targetDisplayX, 0.15);
    s.displayY = lerp(s.displayY, s.targetDisplayY, 0.15);
    s.displayLocalScale = lerp(s.displayLocalScale, s.targetLocalScale, 0.15);

    // refresh displayed width/height based on base sizes
    s.displayW = sw(s.w) * s.displayLocalScale;
    s.displayH = sh(s.h) * s.displayLocalScale;
  }

  // Draw shapes (base tiles + clones)
  for (let s of shapes) {
    fill(s.color);
    stroke(200);
    rect(s.displayX, s.displayY, s.displayW, s.displayH, 10 * scaleFactor);
    noStroke();
    fill(0);

    // text size: bigger when inBox
    const textBase = s.inBox ? 48 : 24;
    textSize(textBase * scaleFactor);
    text(s.label, s.displayX + s.displayW / 2, s.displayY + s.displayH / 2);
  }

  // Arrange shapes in box (positions are targets — this ensures items animate to their places)
  arrangeShapesInBox();

  // Show current word under the build area
  fill(0);
  textSize(36 * scaleFactor);
  textStyle(BOLD);
  text("Word: " + getCurrentWord(), bX + bW / 2, bY + bH + 50 * scaleFactor);
  textStyle(NORMAL);
}

// ----- Mouse handling: topmost-first so clones on top can be removed easily -----
function mousePressed() {
  // Use displayed coords for hit testing. loop from top to bottom to pick topmost
  for (let i = shapes.length - 1; i >= 0; i--) {
    let s = shapes[i];
    // compute current bounding box
    let swd = s.displayW;
    let shd = s.displayH;
    if (
      mouseX > s.displayX &&
      mouseX < s.displayX + swd &&
      mouseY > s.displayY &&
      mouseY < s.displayY + shd
    ) {
      // If it's a base tile -> create clone
      if (s.isBase) {
        let clone = {
          homeX: s.homeX, homeY: s.homeY, // base coords
          w: s.w, h: s.h,
          color: 'lightyellow',
          label: s.label,
          inBox: true,
          baseTargetX: s.homeX,
          baseTargetY: s.homeY,
          displayX: sx(s.homeX),
          displayY: sy(s.homeY),
          targetDisplayX: sx(s.homeX),
          targetDisplayY: sy(s.homeY),
          displayW: sw(s.w),
          displayH: sh(s.h),
          displayLocalScale: 1,
          targetLocalScale: 1.5, // bigger in box
          originalColor: s.originalColor,
          isBase: false,
          clickIndex: nextClickIndex++,
        };
        shapes.push(clone);
        arrangeShapesInBox();
        break;
      } else {
        // It's a clone -> remove it
        shapes.splice(i, 1);
        arrangeShapesInBox();
        break;
      }
    }
  }
}

// ----- Arrange clicked shapes inside build area (preserve click order) -----
function arrangeShapesInBox() {
  let inBoxShapes = shapes.filter((s) => s.inBox);

  if (inBoxShapes.length === 0) {
    // No clones: send base tiles home
    for (let s of shapes) {
      if (s.isBase) {
        s.targetDisplayX = sx(s.homeX);
        s.targetDisplayY = sy(s.homeY);
        s.targetLocalScale = 1;
        s.color = s.originalColor;
      }
    }
    return;
  }

  // Sort by clickIndex so clones appear in click order
  inBoxShapes.sort((a, b) => a.clickIndex - b.clickIndex);

  const spacingBase = 20;           // base spacing in your design units
  const letterWidthBase = 90;      // base width per letter when enlarged (matching your original)
  const totalWidthBase = inBoxShapes.length * letterWidthBase + (inBoxShapes.length - 1) * spacingBase;
  const startXBase = buildAreaBase.x + (buildAreaBase.w - totalWidthBase) / 2;
  const centerYBase = buildAreaBase.y + buildAreaBase.h / 2;

  // place each clone (set targets in displayed coordinates so lerp animation works)
  let currentXBase = startXBase;
  for (let s of inBoxShapes) {
    // target positions (display coords)
    s.targetDisplayX = sx(currentXBase);
    s.targetDisplayY = sy(centerYBase - (s.h * 1.5) / 2); // vertical center adjusted for scaled height
    s.targetLocalScale = 1.5; // clones enlarge by 1.5x (local multiplier)
    s.color = 'lightyellow';
    currentXBase += letterWidthBase + spacingBase;
  }

  // Return all base tiles to home positions and normal scale/color
  for (let s of shapes) {
    if (s.isBase) {
      s.targetDisplayX = sx(s.homeX);
      s.targetDisplayY = sy(s.homeY);
      s.targetLocalScale = 1;
      s.color = s.originalColor;
    }
  }
}

// ----- Get current word (ordered by clickIndex) -----
function getCurrentWord() {
  let inBoxShapes = shapes.filter((s) => s.inBox);
  inBoxShapes.sort((a, b) => a.clickIndex - b.clickIndex);
  return inBoxShapes.map((s) => s.label).join('');
}

// ----- Reset everything (remove clones, return bases) -----
function resetShapes() {
  // keep only base shapes
  shapes = shapes.filter((s) => s.isBase);

  // reset base tile positions and colors
  for (let s of shapes) {
    s.displayX = sx(s.homeX);
    s.displayY = sy(s.homeY);
    s.targetDisplayX = sx(s.homeX);
    s.targetDisplayY = sy(s.homeY);
    s.displayLocalScale = 1;
    s.targetLocalScale = 1;
    s.color = s.originalColor;
    s.inBox = false;
    s.clickIndex = null;
  }
  nextClickIndex = 0;
  arrangeShapesInBox();
}
