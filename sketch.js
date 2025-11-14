11/13/25 2:42

let shapes = [];
let buildArea = { x: 50, y: 50, w: 800, h: 100 };
let resetButton;
let nextClickIndex = 0; // for ordering clones

function setup() {
  createCanvas(1600, 1400);
  textAlign(CENTER, CENTER);
  textSize(20);
  rectMode(CORNER);
  noStroke();

  // Reset button
  resetButton = createButton("🔄 Reset");
  resetButton.position(900, 275);
  resetButton.style('font-size', '24px');
  resetButton.mousePressed(resetShapes);

  // Load shapes
  addShapes();
}

function addShapes() {
  function addShape(x, y, w, h, color, label) {
    shapes.push({
      x,
      y,
      w,
      h,
      color,
      label,
      inBox: false,         // only clones will be true
      homeX: x,
      homeY: y,
      targetX: x,
      targetY: y,
      scale: 1,
      targetScale: 1,
      originalColor: color,
      isBase: true,         // originals are base tiles (never removed)
      clickIndex: null      // used for clones only
    });
  }

  // Example subset — reinsert your full set here (kept identical)
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

function draw() {
  background(240);

  // Draw white build area
  stroke(180);
  fill(255);
  rect(buildArea.x, buildArea.y, buildArea.w, buildArea.h, 15);

  let inBoxShapes = shapes.filter((s) => s.inBox);

  // Draw text if empty
  if (inBoxShapes.length === 0) {
    noStroke();
    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("🧱 Click letters to build a word", buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h / 2);
  }

  // Smoothly move shapes toward their targets & scale
  for (let s of shapes) {
    s.x = lerp(s.x, s.targetX, 0.15);
    s.y = lerp(s.y, s.targetY, 0.15);
    s.scale = s.scale === undefined ? 1 : s.scale;
    s.targetScale = s.targetScale === undefined ? 1 : s.targetScale;
    s.scale = lerp(s.scale, s.targetScale, 0.15);
  }

  // Draw shapes
  for (let s of shapes) {
    fill(s.color);
    stroke(200);
    rect(s.x, s.y, s.w * (s.scale || 1), s.h * (s.scale || 1), 10);
    noStroke();
    fill(0);
    textSize(s.inBox ? 48 : 24); // 🔹 larger letters in box
    text(s.label, s.x + (s.w * (s.scale || 1)) / 2, s.y + (s.h * (s.scale || 1)) / 2);
  }

  // Arrange shapes in box
  arrangeShapesInBox();

  // Show current word
  fill(0);
  textSize(36);
  textStyle(BOLD);
  text("Word: " + getCurrentWord(), buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h + 50);
}

// 🔹 CLICK TO ADD / REMOVE LETTER (cloning)
// topmost-first check so clones on top are removed by clicking them
function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    let s = shapes[i];
    let sw = s.w * (s.scale || 1);
    let sh = s.h * (s.scale || 1);
    if (
      mouseX > s.x &&
      mouseX < s.x + sw &&
      mouseY > s.y &&
      mouseY < s.y + sh
    ) {
      // If it's a base (original) → create a clone (so the original stays)
      if (s.isBase) {
        let clone = {
          x: s.homeX,
          y: s.homeY,
          w: s.w,
          h: s.h,
          color: 'lightyellow',
          label: s.label,
          inBox: true,
          homeX: s.homeX,
          homeY: s.homeY,
          targetX: s.homeX,
          targetY: s.homeY,
          originalColor: s.originalColor,
          scale: 1,            // start at base scale (animates to targetScale)
          targetScale: 1.5,
          isBase: false,
          clickIndex: nextClickIndex++,
        };
        shapes.push(clone);
        arrangeShapesInBox();
        break;
      } else {
        // It's a clone (not base) -> remove that clone
        shapes.splice(i, 1);
        arrangeShapesInBox();
        break;
      }
    }
  }
}

// 🔹 Arrange clicked shapes inside build area (preserve click order)
function arrangeShapesInBox() {
  let inBoxShapes = shapes.filter((s) => s.inBox);

  if (inBoxShapes.length === 0) {
    // Send base tiles home (and ensure scale = 1)
    for (let s of shapes) {
      if (s.isBase) {
        s.targetX = s.homeX;
        s.targetY = s.homeY;
        s.targetScale = 1;
        s.color = s.originalColor;
      }
    }
    return;
  }

  // Sort by clickIndex so clones appear in click order
  inBoxShapes.sort((a, b) => a.clickIndex - b.clickIndex);

  const spacing = 20;
  const letterWidth = 90; // width per letter when enlarged
  const totalWidth = inBoxShapes.length * letterWidth + (inBoxShapes.length - 1) * spacing;
  const startX = buildArea.x + (buildArea.w - totalWidth) / 2;
  const centerY = buildArea.y + buildArea.h / 2;

  let currentX = startX;
  for (let s of inBoxShapes) {
    s.targetX = currentX;
    s.targetY = centerY - (s.h * 1.5) / 2;
    s.targetScale = 1.5;
    s.color = 'lightyellow';
    currentX += letterWidth + spacing;
  }

  // Return all base tiles to home positions and normal scale/color
  for (let s of shapes) {
    if (s.isBase) {
      s.targetX = s.homeX;
      s.targetY = s.homeY;
      s.targetScale = 1;
      s.color = s.originalColor;
    }
  }
}

// 🔹 Build current word (ordered by clickIndex)
function getCurrentWord() {
  let inBoxShapes = shapes.filter((s) => s.inBox);
  inBoxShapes.sort((a, b) => a.clickIndex - b.clickIndex);
  return inBoxShapes.map((s) => s.label).join('');
}

// 🔹 Reset everything (removes clones and returns bases)
function resetShapes() {
  // keep only base shapes
  shapes = shapes.filter((s) => s.isBase);
  // reset base tile positions and colors
  for (let s of shapes) {
    s.x = s.homeX;
    s.y = s.homeY;
    s.targetX = s.homeX;
    s.targetY = s.homeY;
    s.scale = 1;
    s.targetScale = 1;
    s.color = s.originalColor;
    s.inBox = false;
    s.clickIndex = null;
  }
  nextClickIndex = 0;
}

11/14/25 8:50
let baseShapes = [];   // master unique tiles (objects)
let shapes = [];       // runtime array (base tiles first, clones appended)
let groups = [];       // 18 groups arrays of baseShapes references
let nextClickIndex = 0;
let resetButton;
let buildArea;
let scaleFactor = 1;

// --- DESIGN / layout settings
const DESIGN_W = 1600;
const DESIGN_H = 1400;
const CATEGORY_COUNT = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  noStroke();

  createBaseShapesFromFullList();
  categorizeBaseShapes();
  calculateScale();
  layoutGroups();

  // shapes initially are copies of baseShapes (so we can push clones later)
  shapes = baseShapes.map(b => ({ ...b }));

  // reset button
  resetButton = createButton("🔄 Reset");
  resetButton.style("font-size", "18px");
  resetButton.mousePressed(resetShapes);
  positionResetButton();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScale();
  layoutGroups();
  shapes = baseShapes.map(b => ({ ...b }));
  positionResetButton();
}

function positionResetButton() {
  resetButton.position(width * 0.86, buildArea.y + buildArea.h + 12);
}

// ---- helper scale functions (uniform)
function calculateScale() {
  scaleFactor = min(windowWidth / DESIGN_W, windowHeight / DESIGN_H);
  const margin = 0.05 * width;
  buildArea = {
    x: margin,
    y: 0.03 * height,
    w: width - margin * 2,
    h: constrain(120 * scaleFactor, 80, 200)
  };
}
function createBaseShapesFromFullList() {
  const raw = [
    // single letters a–z
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z",

    // digraphs, blends, clusters
    "ch","sh","th","wh","qu","-ck","-s","-ff","-ll","-ss","-zz",
    "-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk",
    "bl-","cl-","fl-","gl-","pl-","sl-",
    "br-","cr-","dr-","fr-","gr-","pr-","tr-",
    "sc-","sk-","sm-","sn-","sp-","st-",
    "scr-","shr-","spl-","spr-","squ-","str-","thr-",
    "dw-","sw-","tw-",

    // final clusters
    "-ld","-lf","-lk","-lp","-lt","-ct","-ft","-nt","-pt","-st","-xt",
    "-mp","-nd","-sk","-sp","-nch","-tch","-dge",

    // vowel teams
    "ai","ea","oa","-ay","ee","-oe","ou","ow","oi","-oy","au","aw",
    "oo","eigh","ei","-ew","-ey","ie","igh","-ue","ui","oe","augh","ough",

    // magic-e
    "*e","a_e","e_e","i_e","o_e","u_e","y_e",

    // r-controlled
    "er","ir","ur","ar","or","war","wor",

    // prefixes
    "un-","sub-","con-","in-","mis-","de-","re-","pro-","pre-","be-",

    // suffixes
    "-es","-less","-ness","-ment","-ful","-ish","-en","-tion","-sion",
    "-ed","-ic","-ing",

    // y-endings
    "-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy","-py","-sy","-ty",

    // -le patterns
    "-ble","-cle","-dle","-fle","-gle","-kle","-ple","-tle","-zle",

    // oddballs and repeats
    "ph","kn-","gn","wr-","-mb","-mn",
    "ai","ea","oa","ee","ie","oo","igh","eigh","ough","augh","ei",
    "-ew","-ey","ie","-ue","ui","au","aw",
    "-s","-ff","-ll","-ss","-zz","-ck","tch","-dge","-nch","-oy","-oy","-oe"
  ];

  const seen = new Set();
  const uniq = [];
  for (let t of raw) {
    if (!seen.has(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
  baseShapes = uniq.map(lbl => ({
    label: lbl,
    w: 70, h: 44,
    x: 0, y: 0,
    homeX: 0, homeY: 0,
    targetX: 0, targetY: 0,
    color: "white",
    originalColor: "white",
    isBase: true,
    inBox: false,
    scale: 1,
    targetScale: 1,
    clickIndex: null,
    groupIndex: null
  }));
}
function categorizeBaseShapes() {
  const singleLetters = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
  const digraphs = new Set(["ch","sh","th","wh","qu","ph","tch","dge","ck","ff","ll","ss","zz","gn","kn","wr","mb","mn"]);
  const lBlends = new Set(["bl-","cl-","fl-","gl-","pl-","sl-"]);
  const rBlends = new Set(["br-","cr-","dr-","fr-","gr-","pr-","tr-"]);
  const sBlends = new Set(["sc-","sk-","sm-","sn-","sp-","st-"]);
  const threeLetter = new Set(["scr-","shr-","spl-","spr-","squ-","str-","thr-"]);
  const wBlends = new Set(["dw-","sw-","tw-"]);

  const vowelTeam1 = new Set(["ai","ea","oa","ay","ee","oe","ou","ow",
    "oi","oy","igh","oo","au","aw"]);
  const vowelTeam2 = new Set(["eigh","ei","ew","ey","ie","ough","ue",
    "ui","augh"]);

  const rControl = new Set(["er","ir","ur","ar","or","war","wor"]);
  const ngnk = new Set(["-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk"]);
  const finalClusters = new Set(["-ld","-lf","-lk","-lp","-lt","-ct","-ft",
    "-nt","-pt","-st","-xt","-mp","-nd","-sk","-sp","-nch","-tch","-dge"]);

  const prefixes = new Set(["un-","sub-","con-","in-","mis-","de-","re-",
    "pro-","pre-","be-"]);

  const suffixes = new Set(["-es","-less","-ness","-ment","-ful","-ish","-en",
    "-tion","-sion","-ed","-ic","-ing"]);

  const magicE = new Set(["*e","a_e","e_e","i_e","o_e","u_e","y_e"]);
  const yEndings = new Set(["-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy",
    "-py","-sy","-ty"]);
  const leSyllables = new Set(["-ble","-cle","-dle","-fle","-gle","-kle",
    "-ple","-tle","-zle"]);
  const oddballs = new Set(["y","-ild","-old","-olt","-ind","augh","ough"]);

  groups = Array.from({length: CATEGORY_COUNT}, () => []);

  for (let s of baseShapes) {
    const lbl = s.label.toLowerCase().replace(/_/g, "").replace(/-/g, "");

    let g = null;

    if (singleLetters.has(lbl)) g = 0;
    else if (digraphs.has(lbl)) g = 1;
    else if (lBlends.has(s.label)) g = 2;
    else if (rBlends.has(s.label)) g = 3;
    else if (sBlends.has(s.label)) g = 4;
    else if (threeLetter.has(s.label)) g = 5;
    else if (wBlends.has(s.label)) g = 6;
    else if (vowelTeam1.has(lbl)) g = 7;
    else if (vowelTeam2.has(lbl)) g = 8;
    else if (rControl.has(lbl)) g = 9;
    else if (ngnk.has(s.label)) g = 10;
    else if (finalClusters.has(s.label)) g = 11;
    else if (prefixes.has(s.label)) g = 12;
    else if (suffixes.has(s.label)) g = 13;
    else if (magicE.has(s.label)) g = 14;
    else if (yEndings.has(s.label)) g = 15;
    else if (oddballs.has(s.label)) g = 16;
    else if (leSyllables.has(s.label)) g = 17;
    else g = 16;

    s.groupIndex = g;
    groups[g].push(s);
  }

  // --- colors
  for (let s of baseShapes) {
    const g = s.groupIndex;
    if (g === 0 && /^[aeiouy]$/.test(s.label)) s.originalColor = "lightyellow";
    else if (g === 7 || g === 8 || g === 14) s.originalColor = "lightyellow";
    else if (g === 12 || g === 13) s.originalColor = "lightgreen";
    else s.originalColor = "white";
    s.color = s.originalColor;
  }
}
function layoutGroups() {
  calculateScale();

  const rowPlan = [
  [0],          // Single letters (a-z)
  [1],          // Digraphs

  [2, 3, 4],    // L-blends, R-blends, S-blends

  [7],          // Vowel teams 1
  [8],          // Vowel teams 2

  [12],         // Prefixes
  [13],         // Suffixes

  // Everything else split into two rows
  [5, 6, 9, 10],  
  [11, 14, 15],
  [16, 17]
];

  const top = buildArea.y + buildArea.h + 30 * scaleFactor;
  const rowGap = max(35 * scaleFactor, height * 0.03);
  const blockGap = 70 * scaleFactor;

  const availableW = width * 0.9;
  const leftMargin = (width - availableW) / 2;

  const baseTileW = constrain(floor(70 * scaleFactor), 40, 140);
  const baseTileH = constrain(floor(44 * scaleFactor), 28, 80);
  const tileGap = max(8 * scaleFactor, 6);

  let y = top;

  for (let row of rowPlan) {
    let blocks = [];
    let totalRowWidth = 0;

    // --- First pass: measure each block ---
    for (let gi of row) {
      const items = groups[gi] || [];
      const maxCols = max(1, floor((availableW * 0.9 + tileGap) / (baseTileW + tileGap)));
      const cols = min(items.length, maxCols);
      const rowsNeeded = items.length ? ceil(items.length / cols) : 0;

      const width = cols > 0 ? cols * baseTileW + (cols - 1) * tileGap : 0;
      const height = rowsNeeded * (baseTileH + tileGap) - tileGap;

      blocks.push({ gi, items, width, height, rows: rowsNeeded });
      totalRowWidth += width;
    }

    totalRowWidth += blockGap * (row.length - 1);

    let startX = leftMargin + (availableW - totalRowWidth) / 2;
    let blockX = startX;

    // --- Second pass: draw blocks and position tiles ---
    for (let block of blocks) {
      const { items, width, height, rows } = block;

      // BORDER
      if (items.length > 0) {
        stroke(200);
        strokeWeight(2);
        noFill();
        rect(
          blockX - 10 * scaleFactor,
          y - 10 * scaleFactor,
          width + 20 * scaleFactor,
          height + 20 * scaleFactor,
          10 * scaleFactor
        );
      }

      // TILE PLACEMENT
      if (items.length > 0) {
        const maxCols = max(1, floor((availableW * 0.9 + tileGap) / (baseTileW + tileGap)));
        const cols = min(items.length, maxCols);
        const rowsNeeded = ceil(items.length / cols);

        let idx = 0;
        for (let r = 0; r < rowsNeeded; r++) {
          const countInRow = min(cols, items.length - r * cols);
          const rowWidth = countInRow * baseTileW + (countInRow - 1) * tileGap;
          const rowStartX = blockX + (width - rowWidth) / 2;

          for (let c = 0; c < countInRow; c++) {
            const s = items[idx++];

            s.w = baseTileW;
            s.h = baseTileH;
            s.homeX = rowStartX + c * (baseTileW + tileGap);
            s.homeY = y + r * (baseTileH + tileGap);
            s.x = s.homeX;
            s.y = s.homeY;
            s.targetX = s.homeX;
            s.targetY = s.homeY;
            s.scale = 1;
            s.targetScale = 1;
            s.color = s.originalColor;
            s.inBox = false;
            s.isBase = true;
          }
        }
      }

      blockX += width + blockGap;
    }

    const tallestRows = max(...blocks.map(b => b.rows));
    const tallestHeight = tallestRows * (baseTileH + tileGap);
    y += tallestHeight + rowGap;
  }

  shapes = baseShapes.map(b => ({ ...b }));
}
function draw() {
  background(245);

  // build area
  stroke(180);
  fill(255);
  rect(buildArea.x, buildArea.y, buildArea.w, buildArea.h, 12 * scaleFactor);

  // hint text
  const inBox = shapes.filter(s => s.inBox);
  if (inBox.length === 0) {
    noStroke();
    fill(40);
    textSize(min(24 * scaleFactor, 24));
    text("🧱 Click letters to build a word", buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h / 2);
  }

  // animate
  for (let s of shapes) {
    s.x = lerp(s.x, s.targetX, 0.15);
    s.y = lerp(s.y, s.targetY, 0.15);
    s.scale = lerp(s.scale, s.targetScale, 0.15);
  }

  // draw shapes
  for (let s of shapes) {
    fill(s.color || "white");
    stroke(200);
    rect(s.x, s.y, s.w * s.scale, s.h * s.scale, 8 * scaleFactor);
    noStroke();
    fill(0);
    textSize(s.inBox ? min(48 * scaleFactor, s.h * 0.9) : min(20 * scaleFactor, s.h * 0.6));
    text(s.label, s.x + (s.w * s.scale) / 2, s.y + (s.h * s.scale) / 2);
  }

  arrangeShapesInBox();
}
function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i];
    const sw = s.w * s.scale;
    const sh = s.h * s.scale;

    if (mouseX > s.x && mouseX < s.x + sw && mouseY > s.y && mouseY < s.y + sh) {
      if (s.isBase) {
        const clone = {
  label: s.label,
  w: s.w, h: s.h,
  x: s.homeX, y: s.homeY,
  homeX: s.homeX, homeY: s.homeY,
  targetX: s.homeX, targetY: s.homeY,
  
  // FIXED: use correct category color
  color: s.originalColor,
  originalColor: s.originalColor,

  isBase: false,
  inBox: true,

  scale: 1,
  targetScale: 1.5,
  clickIndex: nextClickIndex++
};
        shapes.push(clone);
        arrangeShapesInBox();
        return;
      } else {
        shapes.splice(i, 1);
        arrangeShapesInBox();
        return;
      }
    }
  }
}
function arrangeShapesInBox() {
  const inBox = shapes
    .filter(s => s.inBox)
    .sort((a, b) => a.clickIndex - b.clickIndex);

  if (inBox.length === 0) {
    for (let s of shapes) {
      if (s.isBase) {
        s.targetX = s.homeX;
        s.targetY = s.homeY;
        s.targetScale = 1;
        s.color = s.originalColor;
      }
    }
    return;
  }

  const spacing = max(8 * scaleFactor, 8);
  const maxLetterW = min(160 * scaleFactor, buildArea.w / inBox.length * 0.9);
  const letterW = max(40 * scaleFactor, maxLetterW);
  const totalW = inBox.length * letterW + (inBox.length - 1) * spacing;

  let startX = buildArea.x + (buildArea.w - totalW) / 2;
  const centerY = buildArea.y + buildArea.h / 2;

  let x = startX;
  for (let t of inBox) {
    t.targetX = x;
    t.targetY = centerY - (t.h * t.targetScale) / 2;

    const base = baseShapes.find(b => b.label === t.label);
    if (base) {
  t.color = base.originalColor;   // keep the real category color
} else {
  t.color = 'white';
}
    t.targetScale = min(2.0, (buildArea.h / t.h) * 0.9);

    x += letterW + spacing;
  }

  for (let s of shapes) {
    if (s.isBase) {
      s.targetX = s.homeX;
      s.targetY = s.homeY;
      s.targetScale = 1;
      s.color = s.originalColor;
    }
  }
}
function getCurrentWord() {
  return shapes
    .filter(s => s.inBox)
    .sort((a, b) => a.clickIndex - b.clickIndex)
    .map(s => s.label)
    .join("");
}

function resetShapes() {
  shapes = baseShapes.map(b => ({ ...b }));
  nextClickIndex = 0;
  for (let s of shapes) {
    s.inBox = false;
    s.color = s.originalColor;
    s.scale = 1;
    s.targetScale = 1;
    s.clickIndex = null;
    s.x = s.homeX;
    s.y = s.homeY;
    s.targetX = s.homeX;
    s.targetY = s.homeY;
  }
}

11/14/25 9:04

let baseShapes = [];   // master unique tiles (objects)
let shapes = [];       // runtime array (base tiles first, clones appended)
let groups = [];       // 18 groups arrays of baseShapes references
let nextClickIndex = 0;
let resetButton;
let buildArea;
let scaleFactor = 1;

// --- DESIGN / layout settings
const DESIGN_W = 1600;
const DESIGN_H = 2000;
const CATEGORY_COUNT = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  noStroke();

  createBaseShapesFromFullList();
  categorizeBaseShapes();
  calculateScale();
  layoutGroups();

  shapes = baseShapes.map(b => ({ ...b }));

  resetButton = createButton("🔄 Reset");
  resetButton.style("font-size", "18px");
  resetButton.mousePressed(resetShapes);
  positionResetButton();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScale();
  layoutGroups();
  shapes = baseShapes.map(b => ({ ...b }));
  positionResetButton();
}

function positionResetButton() {
  resetButton.position(width * 0.86, buildArea.y + buildArea.h + 12);
}

// ---- helper scale functions (uniform)
function calculateScale() {
  scaleFactor = min(windowWidth / DESIGN_W, windowHeight / DESIGN_H);
  const margin = 0.05 * width;
  buildArea = {
    x: margin,
    y: 0.03 * height,
    w: width - margin * 2,
    h: constrain(120 * scaleFactor, 80, 200)
  };
}

function createBaseShapesFromFullList() {
  const raw = [
    // single letters a–z
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z",

    // digraphs, blends, clusters
    "ch","sh","th","wh","qu","-ck","-s","-ff","-ll","-ss","-zz",
    "-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk",
    "bl-","cl-","fl-","gl-","pl-","sl-",
    "br-","cr-","dr-","fr-","gr-","pr-","tr-",
    "sc-","sk-","sm-","sn-","sp-","st-",
    "scr-","shr-","spl-","spr-","squ-","str-","thr-",
    "dw-","sw-","tw-",

    // final clusters
    "-ld","-lf","-lk","-lp","-lt","-ct","-ft","-nt","-pt","-st","-xt",
    "-mp","-nd","-sk","-sp","-nch","-tch","-dge",

    // vowel teams
    "ai","ea","oa","-ay","ee","-oe","ou","ow","oi","-oy","au","aw",
    "oo","eigh","ei","-ew","-ey","ie","igh","-ue","ui","oe","augh","ough",

    // magic-e
    "*e","a_e","e_e","i_e","o_e","u_e","y_e",

    // r-controlled
    "er","ir","ur","ar","or","war","wor",

    // prefixes
    "un-","sub-","con-","in-","mis-","de-","re-","pro-","pre-","be-",

    // suffixes
    "-es","-less","-ness","-ment","-ful","-ish","-en","-tion","-sion",
    "-ed","-ic","-ing",

    // y endings
    "-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy","-py","-sy","-ty",

    // -le patterns
    "-ble","-cle","-dle","-fle","-gle","-kle","-ple","-tle","-zle",

    // oddballs & repeats
    "ph","kn-","gn","wr-","-mb","-mn",
    "ai","ea","oa","ee","ie","oo","igh","eigh","ough","augh","ei",
    "-ew","-ey","ie","-ue","ui","au","aw",
    "-s","-ff","-ll","-ss","-zz","-ck","tch","-dge","-nch","-oy","-oy","-oe"
  ];

  const seen = new Set();
  const uniq = [];
  for (let t of raw) {
    if (!seen.has(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }
  baseShapes = uniq.map(lbl => ({
    label: lbl,
    w: 70, h: 44,
    x: 0, y: 0,
    homeX: 0, homeY: 0,
    targetX: 0, targetY: 0,
    color: "white",
    originalColor: "white",
    isBase: true,
    inBox: false,
    scale: 1,
    targetScale: 1,
    clickIndex: null,
    groupIndex: null
  }));
}

function categorizeBaseShapes() {
  const singleLetters = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
  const digraphs = new Set(["ch","sh","th","wh","qu","ph","tch","dge","ck","ff","ll","ss","zz","gn","kn","wr","mb","mn"]);
  const lBlends = new Set(["bl-","cl-","fl-","gl-","pl-","sl-"]);
  const rBlends = new Set(["br-","cr-","dr-","fr-","gr-","pr-","tr-"]);
  const sBlends = new Set(["sc-","sk-","sm-","sn-","sp-","st-"]);
  const threeLetter = new Set(["scr-","shr-","spl-","spr-","squ-","str-","thr-"]);
  const wBlends = new Set(["dw-","sw-","tw-"]);

  const vowelTeam1 = new Set(["ai","ea","oa","ay","ee","oe","ou","ow",
    "oi","oy","igh","oo","au","aw"]);
  const vowelTeam2 = new Set(["eigh","ei","ew","ey","ie","ough","ue",
    "ui","augh"]);

  const rControl = new Set(["er","ir","ur","ar","or","war","wor"]);
  const ngnk = new Set(["-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk"]);
  const finalClusters = new Set(["-ld","-lf","-lk","-lp","-lt","-ct","-ft",
    "-nt","-pt","-st","-xt","-mp","-nd","-sk","-sp","-nch","-tch","-dge"]);

  const prefixes = new Set(["un-","sub-","con-","in-","mis-","de-","re-",
    "pro-","pre-","be-"]);

  const suffixes = new Set(["-es","-less","-ness","-ment","-ful","-ish","-en",
    "-tion","-sion","-ed","-ic","-ing"]);

  const magicE = new Set(["*e","a_e","e_e","i_e","o_e","u_e","y_e"]);
  const yEndings = new Set(["-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy",
    "-py","-sy","-ty"]);
  const leSyllables = new Set(["-ble","-cle","-dle","-fle","-gle","-kle",
    "-ple","-tle","-zle"]);
  const oddballs = new Set(["y","-ild","-old","-olt","-ind","augh","ough"]);

  groups = Array.from({length: CATEGORY_COUNT}, () => []);

  for (let s of baseShapes) {

    // 🔥 FIXED — keep hyphens
    const lbl = s.label.toLowerCase().replace(/_/g, "");

    let g = null;

    if (singleLetters.has(lbl)) g = 0;
    else if (digraphs.has(lbl)) g = 1;
    else if (lBlends.has(s.label)) g = 2;
    else if (rBlends.has(s.label)) g = 3;
    else if (sBlends.has(s.label)) g = 4;
    else if (threeLetter.has(s.label)) g = 5;
    else if (wBlends.has(s.label)) g = 6;
    else if (vowelTeam1.has(lbl)) g = 7;
    else if (vowelTeam2.has(lbl)) g = 8;
    else if (rControl.has(lbl)) g = 9;
    else if (ngnk.has(s.label)) g = 10;
    else if (finalClusters.has(s.label)) g = 11;
    else if (prefixes.has(s.label)) g = 12;
    else if (suffixes.has(s.label)) g = 13;
    else if (magicE.has(s.label)) g = 14;
    else if (yEndings.has(s.label)) g = 15;
    else if (oddballs.has(s.label)) g = 16;
    else if (leSyllables.has(s.label)) g = 17;
    else g = 16;

    s.groupIndex = g;
    groups[g].push(s);
  }

  // --- colors
  for (let s of baseShapes) {
    const g = s.groupIndex;
    if (g === 0 && /^[aeiouy]$/.test(s.label)) s.originalColor = "lightyellow";
    else if (g === 7 || g === 8 || g === 14) s.originalColor = "lightyellow";
    else if (g === 12 || g === 13) s.originalColor = "lightgreen";
    else s.originalColor = "white";
    s.color = s.originalColor;
  }
}

function layoutGroups() {
  calculateScale();

  const rowPlan = [
    [0],
    [1],
    [2, 3, 4],
    [7],
    [8],
    [12],
    [13],
    [5, 6, 9, 10],
    [11, 14, 15],
    [16, 17]
  ];

  const top = buildArea.y + buildArea.h + 30 * scaleFactor;
  const rowGap = max(35 * scaleFactor, height * 0.03);
  const blockGap = 70 * scaleFactor;

  const availableW = width * 0.9;
  const leftMargin = (width - availableW) / 2;

  const baseTileW = constrain(floor(70 * scaleFactor), 40, 140);
  const baseTileH = constrain(floor(44 * scaleFactor), 28, 80);
  const tileGap = max(8 * scaleFactor, 6);

  let y = top;

  for (let row of rowPlan) {
    let blocks = [];
    let totalRowWidth = 0;

    for (let gi of row) {
      const items = groups[gi] || [];
      const maxCols = max(1, floor((availableW * 0.9 + tileGap) / (baseTileW + tileGap)));
      const cols = min(items.length, maxCols);
      const rowsNeeded = items.length ? ceil(items.length / cols) : 0;

      const width = cols > 0 ? cols * baseTileW + (cols - 1) * tileGap : 0;
      const height = rowsNeeded * (baseTileH + tileGap) - tileGap;

      blocks.push({ gi, items, width, height, rows: rowsNeeded });
      totalRowWidth += width;
    }

    totalRowWidth += blockGap * (row.length - 1);

    let startX = leftMargin + (availableW - totalRowWidth) / 2;
    let blockX = startX;

    for (let block of blocks) {
      const { items, width, height, rows } = block;

      if (items.length > 0) {
        stroke(200);
        strokeWeight(2);
        noFill();
        rect(
          blockX - 10 * scaleFactor,
          y - 10 * scaleFactor,
          width + 20 * scaleFactor,
          height + 20 * scaleFactor,
          10 * scaleFactor
        );
      }

      if (items.length > 0) {
        const maxCols = max(1, floor((availableW * 0.9 + tileGap) / (baseTileW + tileGap)));
        const cols = min(items.length, maxCols);
        const rowsNeeded = ceil(items.length / cols);

        let idx = 0;
        for (let r = 0; r < rowsNeeded; r++) {
          const countInRow = min(cols, items.length - r * cols);
          const rowWidth = countInRow * baseTileW + (countInRow - 1) * tileGap;
          const rowStartX = blockX + (width - rowWidth) / 2;

          for (let c = 0; c < countInRow; c++) {
            const s = items[idx++];

            s.w = baseTileW;
            s.h = baseTileH;
            s.homeX = rowStartX + c * (baseTileW + tileGap);
            s.homeY = y + r * (baseTileH + tileGap);
            s.x = s.homeX;
            s.y = s.homeY;
            s.targetX = s.homeX;
            s.targetY = s.homeY;
            s.scale = 1;
            s.targetScale = 1;
            s.color = s.originalColor;
            s.inBox = false;
            s.isBase = true;
          }
        }
      }

      blockX += width + blockGap;
    }

    const tallestRows = max(...blocks.map(b => b.rows));
    const tallestHeight = tallestRows * (baseTileH + tileGap);
    y += tallestHeight + rowGap;
  }

  shapes = baseShapes.map(b => ({ ...b }));
}

function draw() {
  background(245);

  stroke(180);
  fill(255);
  rect(buildArea.x, buildArea.y, buildArea.w, buildArea.h, 12 * scaleFactor);

  const inBox = shapes.filter(s => s.inBox);
  if (inBox.length === 0) {
    noStroke();
    fill(40);
    textSize(min(24 * scaleFactor, 24));
    text("🧱 Click letters to build a word", buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h / 2);
  }

  for (let s of shapes) {
    s.x = lerp(s.x, s.targetX, 0.15);
    s.y = lerp(s.y, s.targetY, 0.15);
    s.scale = lerp(s.scale, s.targetScale, 0.15);
  }

  for (let s of shapes) {
    fill(s.color || "white");
    stroke(200);
    rect(s.x, s.y, s.w * s.scale, s.h * s.scale, 8 * scaleFactor);
    noStroke();
    fill(0);
    textSize(s.inBox ? min(48 * scaleFactor, s.h * 0.9) : min(20 * scaleFactor, s.h * 0.6));
    text(s.label, s.x + (s.w * s.scale) / 2, s.y + (s.h * s.scale) / 2);
  }

  arrangeShapesInBox();
}

function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i];
    const sw = s.w * s.scale;
    const sh = s.h * s.scale;

    if (mouseX > s.x && mouseX < s.x + sw && mouseY > s.y && mouseY < s.y + sh) {
      if (s.isBase) {

        const clone = {
          label: s.label,
          w: s.w, h: s.h,
          x: s.homeX, y: s.homeY,
          homeX: s.homeX, homeY: s.homeY,
          targetX: s.homeX, targetY: s.homeY,
          color: s.originalColor,
          originalColor: s.originalColor,
          isBase: false,
          inBox: true,
          scale: 1,
          targetScale: 1.5,
          clickIndex: nextClickIndex++
        };

        shapes.push(clone);
        arrangeShapesInBox();
        return;

      } else {
        shapes.splice(i, 1);
        arrangeShapesInBox();
        return;
      }
    }
  }
}

function arrangeShapesInBox() {
  const inBox = shapes
    .filter(s => s.inBox)
    .sort((a, b) => a.clickIndex - b.clickIndex);

  if (inBox.length === 0) {
    for (let s of shapes) {
      if (s.isBase) {
        s.targetX = s.homeX;
        s.targetY = s.homeY;
        s.targetScale = 1;
        s.color = s.originalColor;
      }
    }
    return;
  }

  const spacing = max(8 * scaleFactor, 8);
  const maxLetterW = min(160 * scaleFactor, buildArea.w / inBox.length * 0.9);
  const letterW = max(40 * scaleFactor, maxLetterW);
  const totalW = inBox.length * letterW + (inBox.length - 1) * spacing;

  let startX = buildArea.x + (buildArea.w - totalW) / 2;
  const centerY = buildArea.y + buildArea.h / 2;

  let x = startX;
  for (let t of inBox) {

    t.targetX = x;
    t.targetY = centerY - (t.h * t.targetScale) / 2;

    const base = baseShapes.find(b => b.label === t.label);
    if (base) {
      t.color = base.originalColor;
    } else {
      t.color = "white";
    }

    t.targetScale = min(2.0, (buildArea.h / t.h) * 0.9);

    x += letterW + spacing;
  }

  for (let s of shapes) {
    if (s.isBase) {
      s.targetX = s.homeX;
      s.targetY = s.homeY;
      s.targetScale = 1;
      s.color = s.originalColor;
    }
  }
}

function getCurrentWord() {
  return shapes
    .filter(s => s.inBox)
    .sort((a, b) => a.clickIndex - b.clickIndex)
    .map(s => s.label)
    .join("");
}

function resetShapes() {
  shapes = baseShapes.map(b => ({ ...b }));
  nextClickIndex = 0;
  for (let s of shapes) {
    s.inBox = false;
    s.color = s.originalColor;
    s.scale = 1;
    s.targetScale = 1;
    s.clickIndex = null;
    s.x = s.homeX;
    s.y = s.homeY;
    s.targetX = s.homeX;
    s.targetY = s.homeY;
  }
}


11/14/25 11:26
let baseShapes = [];   // master unique tiles (objects)
let shapes = [];       // runtime array (base tiles first, clones appended)
let groups = [];       // CATEGORY_COUNT groups arrays of baseShapes references
let nextClickIndex = 0;
let resetButton;
let buildArea;
let scaleFactor = 1;
let mainFont;
const backgroundColor = [250, 248, 240];    // warm off-white
const buildAreaColor = [255, 255, 255, 230]; // slightly translucent white
const tileShadowColor = [0, 0, 0, 22];      // subtle shadow
const tileCorner = 12;                       // rounded corner radius
const tileShadowOffset = 4;                  // px shadow offset for tiles

function preload() {
  // Nunito regular — reliable file from Google Fonts CDN
  mainFont = loadFont("https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofINeaB.ttf");
}

// design reference
const DESIGN_W = 1600;
const DESIGN_H = 1400;
const CATEGORY_COUNT = 18;
const SAFE_MARGIN = 50;   // about 1/2 inch on most screens


function setup() {
  createCanvas(windowWidth - SAFE_MARGIN * 2, windowHeight - SAFE_MARGIN * 2);
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  noStroke();

   background(backgroundColor);

  createBaseShapesFromFullList();
  categorizeBaseShapes();
  calculateScale();

  // initial buildArea sizing (will be recalculated in layoutGroups too)
buildArea = {
  x: SAFE_MARGIN,
  y: SAFE_MARGIN,
  w: width - SAFE_MARGIN * 2,
  h: constrain(120 * scaleFactor, 80, 200)
};
  
  // reset button
  resetButton = createButton("🔄 Reset");
  resetButton.style("font-family", "Nunito, system-ui, sans-serif");
  resetButton.style("font-size", "18px");
  resetButton.style("padding", "10px 14px");
  resetButton.style("border-radius", "12px");
  resetButton.style("background", "white");
  resetButton.style("box-shadow", "0 6px 12px rgba(0,0,0,0.06)");
  resetButton.mousePressed(resetShapes);

  layoutGroups();

  // shapes are copies of baseShapes (so runtime clones can be appended)
  shapes = baseShapes.map(b => ({ ...b }));

  positionResetButton();
}

function windowResized() {
 resizeCanvas(windowWidth - SAFE_MARGIN * 2, windowHeight - SAFE_MARGIN * 2);
  calculateScale();
 buildArea.w = width - SAFE_MARGIN * 2;
  buildArea.y = SAFE_MARGIN;
  buildArea.h = constrain(120 * scaleFactor, 80, 200);
 categorizeBaseShapes();
  layoutGroups();
  shapes = baseShapes.map(b => ({ ...b }));
  positionResetButton();
}

function positionResetButton() {
  // keep the reset button visible and not off-screen
  const btnX = width * 0.86;
  const desiredY = buildArea.y + buildArea.h + 12;
  const btnY = min(desiredY, height - 40);
  // position is relative to the page; if canvas is offset, button will still align visually.
  resetButton.position(btnX + SAFE_MARGIN, btnY + SAFE_MARGIN);
}

function calculateScale() {
 scaleFactor = min(width / DESIGN_W, height / DESIGN_H);
}

// -----------------------------
// Base shapes (full list)
// -----------------------------
function createBaseShapesFromFullList() {
  const raw = [
    // single letters a–z
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z",

    // digraphs, blends, clusters
    "ch","sh","th","wh","qu","-ck","-s","-ff","-ll","-ss","-zz",
    "-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk",
    "bl-","cl-","fl-","gl-","pl-","sl-",
    "br-","cr-","dr-","fr-","gr-","pr-","tr-",
    "sc-","sk-","sm-","sn-","sp-","st-",
    "scr-","shr-","spl-","spr-","squ-","str-","thr-",
    "dw-","sw-","tw-",

    // final clusters
    "-ld","-lf","-lk","-lp","-lt","-ct","-ft","-nt","-pt","-st","-xt",
    "-mp","-nd","-sk","-sp","-nch","-tch","-dge",

    // vowel teams
    "ai","ea","oa","-ay","ee","-oe","ou","ow","oi","-oy","au","aw",
    "oo","eigh","ei","-ew","-ey","ie","igh","-ue","ui","oe","augh","ough",

    // magic-e
    "*e","a_e","e_e","i_e","o_e","u_e","y_e",

    // r-controlled
    "er","ir","ur","ar","or","war","wor",

    // prefixes
    "un-","sub-","con-","in-","mis-","de-","re-","pro-","pre-","be-",

    // suffixes
    "-es","-less","-ness","-ment","-ful","-ish","-en","-tion","-sion",
    "-ed","-ic","-ing",

    // y-endings
    "-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy","-py","-sy","-ty",

    // -le patterns
    "-ble","-cle","-dle","-fle","-gle","-kle","-ple","-tle","-zle",

    // oddballs and repeats
    "ph","kn-","gn","wr-","-mb","-mn",
    "ai","ea","oa","ee","ie","oo","igh","eigh","ough","augh","ei",
    "-ew","-ey","ie","-ue","ui","au","aw",
    "-s","-ff","-ll","-ss","-zz","-ck","tch","-dge","-nch","-oy","-oy","-oe"
  ];

  // remove duplicates while preserving order
  const seen = new Set();
  const uniq = [];
  for (let t of raw) {
    if (!seen.has(t)) {
      seen.add(t);
      uniq.push(t);
    }
  }

  baseShapes = uniq.map(lbl => ({
    label: lbl,
    w: 70, h: 44,
    x: 0, y: 0,
    homeX: 0, homeY: 0,
    targetX: 0, targetY: 0,
    color: "white",
    originalColor: "white",
    isBase: true,
    inBox: false,
    scale: 1,
    targetScale: 1,
    clickIndex: null,
    groupIndex: null
  }));
}

// -----------------------------
// Categorize
// -----------------------------
function categorizeBaseShapes() {
  // preserve hyphens for matching sets that include them
  const singleLetters = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
  const digraphs = new Set(["ch","sh","th","wh","qu","ph","tch","dge","ck","ff","ll","ss","zz","gn","kn","wr","mb","mn"]);
  const lBlends = new Set(["bl-","cl-","fl-","gl-","pl-","sl-"]);
  const rBlends = new Set(["br-","cr-","dr-","fr-","gr-","pr-","tr-"]);
  const sBlends = new Set(["sc-","sk-","sm-","sn-","sp-","st-"]);
  const threeLetter = new Set(["scr-","shr-","spl-","spr-","squ-","str-","thr-"]);
  const wBlends = new Set(["dw-","sw-","tw-"]);

  const vowelTeam1 = new Set(["ai","ea","oa","ay","ee","oe","ou","ow","oi","oy","igh","oo","au","aw"]);
  const vowelTeam2 = new Set(["eigh","ei","ew","ey","ie","ough","ue","ui","augh"]);

  const rControl = new Set(["er","ir","ur","ar","or","war","wor"]);
  const ngnk = new Set(["-ing","-ang","-ong","-ung","-ink","-ank","-onk","-unk"]);
  const finalClusters = new Set(["-ld","-lf","-lk","-lp","-lt","-ct","-ft","-nt","-pt","-st","-xt","-mp","-nd","-sk","-sp","-nch","-tch","-dge"]);

  const prefixes = new Set(["un-","sub-","con-","in-","mis-","de-","re-","pro-","pre-","be-"]);
  const suffixes = new Set(["-es","-less","-ness","-ment","-ful","-ish","-en","-tion","-sion","-ed","-ic","-ing"]);

  const magicE = new Set(["*e","a_e","e_e","i_e","o_e","u_e","y_e"]);
  const yEndings = new Set(["-by","-vy","-zy","-ky","-ly","-ny","-dy","-fy","-py","-sy","-ty"]);
  const leSyllables = new Set(["-ble","-cle","-dle","-fle","-gle","-kle","-ple","-tle","-zle"]);
  const oddballs = new Set(["y","-ild","-old","-olt","-ind","augh","ough"]);

  // reset groups
  groups = Array.from({length: CATEGORY_COUNT}, () => []);

  for (let s of baseShapes) {
    // keep hyphens (they are meaningful for e.g. "-ing", "un-")
    const lbl = s.label.toLowerCase().replace(/_/g, "");

    let g = null;

    if (singleLetters.has(lbl)) g = 0;
    else if (digraphs.has(lbl)) g = 1;
    else if (lBlends.has(s.label)) g = 2;
    else if (rBlends.has(s.label)) g = 3;
    else if (sBlends.has(s.label)) g = 4;
    else if (threeLetter.has(s.label)) g = 5;
    else if (wBlends.has(s.label)) g = 6;
    else if (vowelTeam1.has(lbl)) g = 7;
    else if (vowelTeam2.has(lbl)) g = 8;
    else if (rControl.has(lbl)) g = 9;
    else if (ngnk.has(s.label)) g = 10;
    else if (finalClusters.has(s.label)) g = 11;
    else if (prefixes.has(s.label)) g = 12;
    else if (suffixes.has(s.label)) g = 13;
    else if (magicE.has(s.label)) g = 14;
    else if (yEndings.has(s.label)) g = 15;
    else if (oddballs.has(s.label)) g = 16;
    else if (leSyllables.has(s.label)) g = 17;
    else g = 16; // fallback to oddballs

    s.groupIndex = g;
    groups[g].push(s);
  }

  // colors by category
  for (let s of baseShapes) {
    const g = s.groupIndex;
    const COLOR_YELLOW = "#fff7c8"; // example pastel yellow
const COLOR_GREEN  = "#e6f6df"; // example pastel green
const COLOR_WHITE  = "#ffffff";

if (g === 0 && /^[aeiouy]$/.test(s.label)) s.originalColor = COLOR_YELLOW;
else if (g === 7 || g === 8 || g === 14) s.originalColor = COLOR_YELLOW;
else if (g === 12 || g === 13) s.originalColor = COLOR_GREEN;
else s.originalColor = COLOR_WHITE;
    s.color = s.originalColor;
  }
}

// -----------------------------
// Layout: BLOCK WRAP (whole blocks wrap)
// -----------------------------
function layoutGroups() {
  calculateScale();

const leftMargin = SAFE_MARGIN;
const rightMargin = SAFE_MARGIN;
const maxRowWidth = width - SAFE_MARGIN * 2;
  
  // tile/base sizes
  const baseTileW = constrain(floor(70 * scaleFactor), 36, 140);
  const baseTileH = constrain(floor(44 * scaleFactor), 24, 80);
  const tileGap = max(8 * scaleFactor, 6);
  const blockGap = max(40 * scaleFactor, 24);
  const rowGap = max(30 * scaleFactor, 18);

  let y = buildArea.y + buildArea.h + 30 * scaleFactor;
  y = max(y, SAFE_MARGIN);  // ensure top row is not near bottom
  let currentRowWidth = 0;
  if (y + baseTileH > height - SAFE_MARGIN) {
  // either reduce tile size or stop placing more
}

  // We'll build a new list of baseShapes positions based on groups (wrapping blocks)
  for (let gi = 0; gi < groups.length; gi++) {
    const block = groups[gi];
    if (!block || block.length === 0) continue;

    // measure block width (all tiles placed in one row inside the block)
    const blockWidth = block.length * baseTileW + (block.length - 1) * tileGap;

    // if the block cannot fit on the current row, wrap to next row
    if (currentRowWidth > 0 && currentRowWidth + blockWidth > maxRowWidth) {
      // new row
      y += baseTileH + rowGap;
      currentRowWidth = 0;
    }

    // starting X for this block
    let blockStartX = leftMargin + currentRowWidth;

    // place each tile in this block
    for (let i = 0; i < block.length; i++) {
      const s = block[i];

      s.w = baseTileW;
      s.h = baseTileH;
      s.homeX = blockStartX + i * (baseTileW + tileGap);
      s.homeY = y;
      s.x = s.homeX;
      s.y = s.homeY;
      s.targetX = s.homeX;
      s.targetY = s.homeY;
      s.scale = 1;
      s.targetScale = 1;
      s.color = s.originalColor;
      s.inBox = false;
      s.isBase = true;
    }

    // advance currentRowWidth (block + gap)
    currentRowWidth += blockWidth + blockGap;
  }

  // After placing all blocks, update runtime shapes as copies of baseShapes
  shapes = baseShapes.map(b => ({ ...b }));
  positionResetButton();
}

// -----------------------------
// Draw loop
// -----------------------------
function draw() {
  // soft background for whole canvas
  background(backgroundColor);

  // modern build area
  noStroke();
  fill(buildAreaColor);
  rect(buildArea.x, buildArea.y, buildArea.w, buildArea.h, 20 * scaleFactor);

  // hint text when empty
  const inBox = shapes.filter(s => s.inBox);
  if (inBox.length === 0) {
    noStroke();
    fill(70);
    textSize(min(24 * scaleFactor, 24));
    text("🧱 Click letters to build a word", buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h / 2);
  }

  // animate movement/scale (unchanged)
  for (let s of shapes) {
    s.x = lerp(s.x, s.targetX, 0.15);
    s.y = lerp(s.y, s.targetY, 0.15);
    s.scale = lerp(s.scale, s.targetScale, 0.15);
  }

  // draw tiles (bases and clones)
  for (let s of shapes) {

    // draw subtle shadow (under tile)
    push();
    noStroke();
    fill(tileShadowColor);
    rect(s.x + tileShadowOffset, s.y + tileShadowOffset, s.w * s.scale, s.h * s.scale, tileCorner * scaleFactor);
    pop();

    // draw actual tile (use s.color which preserves your tile color rules)
    push();
    noStroke();
    fill(s.color || "white");
    rect(s.x, s.y, s.w * s.scale, s.h * s.scale, tileCorner * scaleFactor);

    // tile text (dark gray)
    noStroke();
    fill(40);
    textSize(
      s.inBox
        ? s.h * s.scale * 0.82
        : s.h * s.scale * 0.58
    );
    text(s.label, s.x + (s.w * s.scale) / 2, s.y + (s.h * s.scale) / 2);
    pop();
  }

  arrangeShapesInBox();
}
// -----------------------------
// Mouse press: click base or clone
// -----------------------------
function mousePressed() {
  // iterate top-down so later shapes (clones) can be removed if clicked
  for (let i = shapes.length - 1; i >= 0; i--) {
    const s = shapes[i];
    const sw = s.w * s.scale;
    const sh = s.h * s.scale;
    if (mouseX > s.x && mouseX < s.x + sw && mouseY > s.y && mouseY < s.y + sh) {
      if (s.isBase) {
        // create a clone (keep original category color)
        const clone = {
          label: s.label,
          w: s.w, h: s.h,
          x: s.homeX, y: s.homeY,
          homeX: s.homeX, homeY: s.homeY,
          targetX: s.homeX, targetY: s.homeY,
          color: s.originalColor,
          originalColor: s.originalColor,
          isBase: false,
          inBox: true,
          scale: 1,
          targetScale: 1.5,
          clickIndex: nextClickIndex++,
          groupIndex: s.groupIndex
        };
        shapes.push(clone);
        arrangeShapesInBox();
        return;
      } else {
        // clicked a clone -> remove it
        shapes.splice(i, 1);
        arrangeShapesInBox();
        return;
      }
    }
  }
}

// -----------------------------
// Arrange shapes that are in the top box
// -----------------------------
function arrangeShapesInBox() {
  const inBox = shapes
    .filter(s => s.inBox)
    .sort((a, b) => (a.clickIndex || 0) - (b.clickIndex || 0));

  if (inBox.length === 0) {
    // return bases back to their home positions
    for (let s of shapes) {
      if (s.isBase) {
        s.targetX = s.homeX;
        s.targetY = s.homeY;
        s.targetScale = 1;
        s.color = s.originalColor;
      }
    }
    return;
  }

  // spacing logic for box
  const spacing = max(8 * scaleFactor, 8);
  // compute available width per tile with padding
  const maxLetterW = min(160 * scaleFactor, buildArea.w / inBox.length * 0.9);
  const letterW = max(40 * scaleFactor, maxLetterW);
  const totalW = inBox.length * letterW + (inBox.length - 1) * spacing;

  let startX = buildArea.x + (buildArea.w - totalW) / 2;
  const centerY = buildArea.y + buildArea.h / 2;

  let x = startX;
  for (let t of inBox) {
    t.targetX = x;
    t.targetY = centerY - (t.h * t.targetScale) / 2;

    const base = baseShapes.find(b => b.label === t.label);
    if (base) {
      t.color = base.originalColor;
    } else {
      t.color = 'white';
    }
    // scale to fit box height (but keep within a cap)
    t.targetScale = min(2.0, (buildArea.h / t.h) * 0.9);

    x += letterW + spacing;
  }

  // ensure all base tiles remain at home positions visually
  for (let s of shapes) {
    if (s.isBase) {
      s.targetX = s.homeX;
      s.targetY = s.homeY;
      s.targetScale = 1;
      s.color = s.originalColor;
    }
  }
}

function getCurrentWord() {
  return shapes
    .filter(s => s.inBox)
    .sort((a, b) => (a.clickIndex || 0) - (b.clickIndex || 0))
    .map(s => s.label)
    .join("");
}

// -----------------------------
// Reset shapes (clear top box)
// -----------------------------
function resetShapes() {
  shapes = baseShapes.map(b => ({ ...b }));
  nextClickIndex = 0;
  for (let s of shapes) {
    s.inBox = false;
    s.color = s.originalColor;
    s.scale = 1;
    s.targetScale = 1;
    s.clickIndex = null;
    s.x = s.homeX;
    s.y = s.homeY;
    s.targetX = s.homeX;
    s.targetY = s.homeY;
  }
  positionResetButton();
}

