let shapes = [];
let draggedShape = null;
let offsetX, offsetY;

let buildArea = { x: 50, y: 50, w: 800, h: 100 }; // the white box zone

function setup() {
  createCanvas(1600, 1400);
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();

  // Example shapes (you can add more letters here)
  shapes.push({x: 40, y: 300, w: 40, h: 40, color: 'lightyellow', label: 'a'});
  shapes.push({x: 90, y: 300, w: 40, h: 40, color: 'white', label: 'b'});
  shapes.push({x: 140, y: 300, w: 40, h: 40, color: 'white', label: 'c'});
  shapes.push({x: 190, y: 300, w: 40, h: 40, color: 'white', label: 'd'});
  shapes.push({x: 240, y: 300, w: 40, h: 40, color: 'lightyellow', label: 'e'});
  shapes.push({x: 290, y: 300, w: 40, h: 40, color: 'white', label: 'f'});
  shapes.push({x: 340, y: 300, w: 40, h: 40, color: 'white', label: 'g'});
  shapes.push({x: 390, y: 300, w: 40, h: 40, color: 'white', label: 'h'});
  shapes.push({x: 440, y: 300, w: 40, h: 40, color: 'lightyellow', label: 'i'});
  shapes.push({x: 490, y: 300, w: 40, h: 40, color: 'white', label: 'j'});
  shapes.push({x: 540, y: 300, w: 40, h: 40, color: 'white', label: 'k'});
  shapes.push({x: 590, y: 300, w: 40, h: 40, color: 'white', label: 'l'});
  shapes.push({x: 640, y: 300, w: 40, h: 40, color: 'white', label: 'm'});
  shapes.push({x: 40, y: 350, w: 40, h: 40, color: 'white', label: 'n'});
  shapes.push({x: 90, y: 350, w: 40, h: 40, color: 'lightyellow', label: 'o'});
  shapes.push({x: 140, y: 350, w: 40, h: 40, color: 'white', label: 'p'});
  shapes.push({x: 190, y: 350, w: 40, h: 40, color: 'white', label: 'q'});
  shapes.push({x: 240, y: 350, w: 40, h: 40, color: 'white', label: 'r'});
  shapes.push({x: 290, y: 350, w: 40, h: 40, color: 'white', label: 's'});
  shapes.push({x: 340, y: 350, w: 40, h: 40, color: 'white', label: 't'});
  shapes.push({x: 390, y: 350, w: 40, h: 40, color: 'lightyellow', label: 'u'});
  shapes.push({x: 440, y: 350, w: 40, h: 40, color: 'white', label: 'v'});
  shapes.push({x: 490, y: 350, w: 40, h: 40, color: 'white', label: 'w'});
  shapes.push({x: 540, y: 350, w: 40, h: 40, color: 'white', label: 'x'});
  shapes.push({x: 590, y: 350, w: 40, h: 40, color: 'white', label: 'y'});
  shapes.push({x: 640, y: 350, w: 40, h: 40, color: 'white', label: 'z'});
  shapes.push({x: 40, y: 450, w: 60, h: 40, color: 'white', label: 'ch'});
  shapes.push({x: 115, y: 450, w: 60, h: 40, color: 'white', label: 'sh'});
  shapes.push({x: 185, y: 450, w: 60, h: 40, color: 'white', label: 'th'});
  shapes.push({x: 255, y: 450, w: 60, h: 40, color: 'white', label: 'wh'});
  shapes.push({x: 325, y: 450, w: 60, h: 40, color: 'white', label: 'qu'});
  shapes.push({x: 600, y: 450, w: 60, h: 40, color: 'white', label: '-ck'});
  shapes.push({x: 775, y: 300, w: 60, h: 40, color: 'lightgreen', label: '-s'});
  shapes.push({x: 395, y: 450, w: 60, h: 40, color: 'white', label: '-ff'});
  shapes.push({x: 465, y: 450, w: 60, h: 40, color: 'white', label: '-ll'});
  shapes.push({x: 535, y: 450, w: 60, h: 40, color: 'white', label: '-ss'});
  shapes.push({x: 600, y: 450, w: 60, h: 40, color: 'white', label: '-zz'});
  shapes.push({x: 40, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ing'});
  shapes.push({x: 115, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ang'});
  shapes.push({x: 185, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ong'});
  shapes.push({x: 255, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ung'});
  shapes.push({x: 325, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ink'});
  shapes.push({x: 395, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-ank'});
  shapes.push({x: 465, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-onk'});
  shapes.push({x: 535, y: 550, w: 60, h: 40, color: 'lightyellow', label: '-unk'});
  shapes.push({x: 395, y: 600, w: 60, h: 40, color: 'white', label: 'bl-'});
  shapes.push({x: 255, y: 600, w: 60, h: 40, color: 'white', label: 'cl-'});
  shapes.push({x: 325, y: 600, w: 60, h: 40, color: 'white', label: 'fl-'});
  shapes.push({x: 40, y: 600, w: 60, h: 40, color: 'white', label: 'gl-'});
  shapes.push({x: 115, y: 600, w: 60, h: 40, color: 'white', label: 'pl-'});
  shapes.push({x: 185, y: 600, w: 60, h: 40, color: 'white', label: 'sl-'});
  shapes.push({x: 255, y: 900, w: 60, h: 40, color: 'white', label: 'br-'});
  shapes.push({x: 325, y: 900, w: 60, h: 40, color: 'white', label: 'cr-'});
  shapes.push({x: 395, y: 900, w: 60, h: 40, color: 'white', label: 'dr-'});
  shapes.push({x: 465, y: 900, w: 60, h: 40, color: 'white', label: 'fr-'});
  shapes.push({x: 535, y: 900, w: 60, h: 40, color: 'white', label: 'gr-'});
  shapes.push({x: 600, y: 900, w: 60, h: 40, color: 'white', label: 'pr-'});
  shapes.push({x: 675, y: 900, w: 60, h: 40, color: 'white', label: 'tr-'});
  shapes.push({x: 975, y: 600, w: 60, h: 40, color: 'white', label: 'sc-'});
  shapes.push({x: 900, y: 600, w: 60, h: 40, color: 'white', label: 'sk-'});
  shapes.push({x: 750, y: 600, w: 60, h: 40, color: 'white', label: 'sm-'});
  shapes.push({x: 825, y: 600, w: 60, h: 40, color: 'white', label: 'sn-'});
  shapes.push({x: 600, y: 600, w: 60, h: 40, color: 'white', label: 'sp-'});
  shapes.push({x: 675, y: 600, w: 60, h: 40, color: 'white', label: 'st-'});
  shapes.push({x: 40, y: 650, w: 60, h: 40, color: 'white', label: 'scr-'});
  shapes.push({x: 115, y: 650, w: 60, h: 40, color: 'white', label: 'shr-'});
  shapes.push({x: 185, y: 650, w: 60, h: 40, color: 'white', label: 'spl-'});
  shapes.push({x: 255, y: 650, w: 60, h: 40, color: 'white', label: 'spr-'});
  shapes.push({x: 325, y: 650, w: 60, h: 40, color: 'white', label: 'squ-'});
  shapes.push({x: 395, y: 650, w: 60, h: 40, color: 'white', label: 'str-'});
  shapes.push({x: 465, y: 650, w: 60, h: 40, color: 'white', label: 'thr-'});
  shapes.push({x: 750, y: 800, w: 60, h: 40, color: 'white', label: 'dw-'});
  shapes.push({x: 500, y: 800, w: 60, h: 40, color: 'white', label: 'sw-'});
  shapes.push({x: 400, y: 800, w: 60, h: 40, color: 'white', label: 'tw-'});
  shapes.push({x: 40, y: 900, w: 60, h: 40, color: 'lightyellow', label: 'y'});
  shapes.push({x: 115, y: 700, w: 60, h: 40, color: 'white', label: '-ld'});
  shapes.push({x: 185, y: 700, w: 60, h: 40, color: 'white', label: '-lf'});
  shapes.push({x: 255, y: 700, w: 60, h: 40, color: 'white', label: '-lk'});
  shapes.push({x: 325, y: 700, w: 60, h: 40, color: 'white', label: '-lp'});
  shapes.push({x: 395, y: 700, w: 60, h: 40, color: 'white', label: '-lt'});
  shapes.push({x: 465, y: 700, w: 60, h: 40, color: 'white', label: '-ct'});
  shapes.push({x: 535, y: 700, w: 60, h: 40, color: 'white', label: '-ft'});
  shapes.push({x: 600, y: 700, w: 60, h: 40, color: 'white', label: '-nt'});
  shapes.push({x: 675, y: 700, w: 60, h: 40, color: 'white', label: '-pt'});
  shapes.push({x: 750, y: 700, w: 60, h: 40, color: 'white', label: '-st'});
  shapes.push({x: 825, y: 700, w: 60, h: 40, color: 'white', label: '-xt'});
  shapes.push({x: 900, y: 700, w: 60, h: 40, color: 'white', label: '-mp'});
  shapes.push({x: 40, y: 700, w: 60, h: 40, color: 'white', label: '-nd'});
  shapes.push({x: 115, y: 750, w: 60, h: 40, color: 'white', label: '-sk'});
  shapes.push({x: 185, y: 750, w: 60, h: 40, color: 'white', label: '-sp'});
  shapes.push({x: 600, y: 650, w: 60, h: 40, color: 'white', label: '-nch'});
  shapes.push({x: 675, y: 650, w: 60, h: 40, color: 'white', label: '-tch'});
  shapes.push({x: 750, y: 650, w: 60, h: 40, color: 'white', label: '-dge'});
  shapes.push({x: 850, y: 300, w: 60, h: 40, color: 'lightgreen', label: 'un-'});
  shapes.push({x: 850, y: 350, w: 60, h: 40, color: 'lightgreen', label: 'sub-'});
  shapes.push({x: 850, y: 550, w: 60, h: 40, color: 'lightgreen', label: 'con-'});
  shapes.push({x: 920, y: 350, w: 60, h: 40, color: 'lightgreen', label: 'in-'});
  shapes.push({x: 775, y: 350, w: 60, h: 40, color: 'lightgreen', label: 'mis-'});
  shapes.push({x: 920, y: 400, w: 60, h: 40, color: 'lightgreen', label: '-ing'});
  shapes.push({x: 40, y: 800, w: 60, h: 40, color: 'lightyellow', label: '-ild'});
  shapes.push({x: 115, y: 800, w: 60, h: 40, color: 'lightyellow', label: '-old'});
  shapes.push({x: 185, y: 800, w: 60, h: 40, color: 'lightyellow', label: '-olt'});
  shapes.push({x: 255, y: 800, w: 60, h: 40, color: 'lightyellow', label: '-ind'});
  shapes.push({x: 850, y: 400, w: 60, h: 40, color: 'lightgreen', label: '-es'});
  shapes.push({x: 395, y: 800, w: 60, h: 40, color: 'lightyellow', label: '*e'});
  shapes.push({x: 465, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'a_e'});
  shapes.push({x: 535, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'e_e'});
  shapes.push({x: 600, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'i_e'});
  shapes.push({x: 675, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'o_e'});
  shapes.push({x: 750, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'u_e'});
  shapes.push({x: 825, y: 800, w: 60, h: 40, color: 'lightyellow', label: 'y_e'});
  shapes.push({x: 1000, y: 350, w: 60, h: 40, color: 'lightgreen', label: '-less'});
  shapes.push({x: 1000, y: 400, w: 60, h: 40, color: 'lightgreen', label: '-ness'});
  shapes.push({x: 775, y: 400, w: 60, h: 40, color: 'lightgreen', label: '-ment'});
  shapes.push({x: 775, y: 550, w: 60, h: 40, color: 'lightgreen', label: '-ful'});
  shapes.push({x: 920, y: 500, w: 60, h: 40, color: 'lightgreen', label: '-ish'});
  shapes.push({x: 850, y: 500, w: 60, h: 40, color: 'lightgreen', label: '-en'});
  shapes.push({x: 40, y: 850, w: 60, h: 40, color: 'white', label: '-ble'});
  shapes.push({x: 115, y: 850, w: 60, h: 40, color: 'white', label: '-cle'});
  shapes.push({x: 185, y: 850, w: 60, h: 40, color: 'white', label: '-dle'});
  shapes.push({x: 255, y: 850, w: 60, h: 40, color: 'white', label: '-fle'});
  shapes.push({x: 325, y: 850, w: 60, h: 40, color: 'white', label: '-gle'});
  shapes.push({x: 395, y: 850, w: 60, h: 40, color: 'white', label: '-kle'});
  shapes.push({x: 465, y: 850, w: 60, h: 40, color: 'white', label: '-ple'});
  shapes.push({x: 535, y: 850, w: 60, h: 40, color: 'white', label: '-tle'});
  shapes.push({x: 600, y: 850, w: 60, h: 40, color: 'white', label: '-zle'});
  shapes.push({x: 115, y: 900, w: 60, h: 40, color: 'lightyellow', label: 'ai'});
  shapes.push({x: 185, y: 900, w: 60, h: 40, color: 'lightyellow', label: 'ea'});
  shapes.push({x: 255, y: 900, w: 60, h: 40, color: 'lightyellow', label: 'oa'});
  shapes.push({x: 325, y: 900, w: 60, h: 40, color: 'lightyellow', label: '-ay'});
  shapes.push({x: 395, y: 900, w: 60, h: 40, color: 'lightyellow', label: 'ee'});
  shapes.push({x: 465, y: 900, w: 60, h: 40, color: 'lightyellow', label: '-oe'});
  shapes.push({x: 535, y: 900, w: 60, h: 40, color: 'white', label: 'ph'});
  shapes.push({x: 1000, y: 450, w: 60, h: 40, color: 'lightgreen', label: 're-'});
  shapes.push({x: 1000, y: 400, w: 60, h: 40, color: 'lightgreen', label: 'pro-'});
  shapes.push({x: 775, y: 450, w: 60, h: 40, color: 'lightgreen', label: 'de-'});
  shapes.push({x: 850, y: 450, w: 60, h: 40, color: 'lightgreen', label: 'pre-'});
  shapes.push({x: 920, y: 450, w: 60, h: 40, color: 'lightgreen', label: 'be-'});
  shapes.push({x: 40, y: 950, w: 60, h: 40, color: 'lightyellow', label: 'er'});
  shapes.push({x: 115, y: 950, w: 60, h: 40, color: 'lightyellow', label: 'ir'});
  shapes.push({x: 185, y: 950, w: 60, h: 40, color: 'lightyellow', label: 'ur'});
  shapes.push({x: 255, y: 950, w: 60, h: 40, color: 'lightyellow', label: 'ar'});
  shapes.push({x: 325, y: 950, w: 60, h: 40, color: 'lightyellow', label: 'or'});
  shapes.push({x: 40, y: 500, w: 60, h: 40, color: 'white', label: '-by'});
  shapes.push({x: 465, y: 500, w: 60, h: 40, color: 'white', label: '-dy'});
  shapes.push({x: 535, y: 500, w: 60, h: 40, color: 'white', label: '-fy'});
  shapes.push({x: 255, y: 500, w: 60, h: 40, color: 'white', label: '-ky'});
  shapes.push({x: 325, y: 500, w: 60, h: 40, color: 'white', label: '-ly'});
  shapes.push({x: 395, y: 500, w: 60, h: 40, color: 'white', label: '-ny'});
  shapes.push({x: 600, y: 500, w: 60, h: 40, color: 'white', label: '-py'});
  shapes.push({x: 670, y: 500, w: 60, h: 40, color: 'white', label: '-sy'});
  shapes.push({x: 40, y: 500, w: 60, h: 40, color: 'white', label: '-ty'});
  shapes.push({x: 115, y: 500, w: 60, h: 40, color: 'white', label: '-vy'});
  shapes.push({x: 185, y: 500, w: 60, h: 40, color: 'white', label: '-zy'});
  shapes.push({x: 255, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'ou'});
  shapes.push({x: 325, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'ow'});
  shapes.push({x: 395, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'oi'});
  shapes.push({x: 465, y: 1000, w: 60, h: 40, color: 'lightyellow', label: '-oy'});
  shapes.push({x: 535, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'igh'});
  shapes.push({x: 600, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'au'});
  shapes.push({x: 675, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'aw'});
  shapes.push({x: 1000, y: 300, w: 60, h: 40, color: 'lightgreen', label: '-ed'});
  shapes.push({x: 825, y: 1000, w: 60, h: 40, color: 'lightyellow', label: 'oo'});
  shapes.push({x: 920, y: 300, w: 60, h: 40, color: 'lightgreen', label: '-ic'});
  shapes.push({x: 40, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'eigh'});
  shapes.push({x: 1000, y: 500, w: 60, h: 40, color: 'lightgreen', label: '-tion'});
  shapes.push({x: 775, y: 500, w: 60, h: 40, color: 'lightgreen', label: '-sion'});
  shapes.push({x: 255, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'augh'});
  shapes.push({x: 325, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'ei'});
  shapes.push({x: 395, y: 1050, w: 60, h: 40, color: 'lightyellow', label: '-ew'});
  shapes.push({x: 465, y: 1050, w: 60, h: 40, color: 'lightyellow', label: '-ey'});
  shapes.push({x: 535, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'ie'});
  shapes.push({x: 600, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'ough'});
  shapes.push({x: 675, y: 1050, w: 60, h: 40, color: 'lightyellow', label: '-ue'});
  shapes.push({x: 750, y: 1050, w: 60, h: 40, color: 'lightyellow', label: 'ui'});
  shapes.push({x: 825, y: 1050, w: 60, h: 40, color: 'white', label: 'war'});
  shapes.push({x: 900, y: 1050, w: 60, h: 40, color: 'white', label: 'wor'});
  shapes.push({x: 40, y: 1100, w: 60, h: 40, color: 'white', label: 'gn'});
  shapes.push({x: 115, y: 1100, w: 60, h: 40, color: 'white', label: 'kn-'});
  shapes.push({x: 185, y: 1100, w: 60, h: 40, color: 'white', label: '-mb'});
  shapes.push({x: 255, y: 1100, w: 60, h: 40, color: 'white', label: '-mn'});
  shapes.push({x: 325, y: 1100, w: 60, h: 40, color: 'white', label: 'wr-'});
  
}

function draw() {
  background(240);

  // Draw build area
  fill(255);
  stroke(180);
  strokeWeight(2);
  rect(buildArea.x, buildArea.y, buildArea.w, buildArea.h, 10);
  noStroke();
  fill(100);
  textSize(24);
  text("🧱 Drag letters here to build a word", buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h / 2);

  // Draw shapes
  for (let s of shapes) {
    fill(s.color);
    stroke(200);
    rect(s.x, s.y, s.w, s.h, 10);
    noStroke();
    fill(0);
    text(s.label, s.x + s.w / 2, s.y + s.h / 2);
  }

  // Arrange shapes in the box neatly
  arrangeShapesInBox();

  // Display the built word
  let currentWord = getCurrentWord();
  fill(0);
  textSize(36);
  textStyle(BOLD);
  text("Word: " + currentWord, buildArea.x + buildArea.w / 2, buildArea.y + buildArea.h + 50);
}

function mousePressed() {
  for (let s of shapes) {
    if (mouseX > s.x && mouseX < s.x + s.w && mouseY > s.y && mouseY < s.y + s.h) {
      draggedShape = s;
      offsetX = mouseX - s.x;
      offsetY = mouseY - s.y;
      break;
    }
  }
}

function mouseDragged() {
  if (draggedShape) {
    draggedShape.x = mouseX - offsetX;
    draggedShape.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  if (draggedShape) {
    if (isOverBuildArea(draggedShape)) {
      draggedShape.inBox = true;
      draggedShape.color = 'lightyellow';
    } else {
      draggedShape.inBox = false;
      draggedShape.color = 'white';
    }
  }
  draggedShape = null;
}

function isOverBuildArea(s) {
  return (
    s.x + s.w / 2 > buildArea.x &&
    s.x + s.w / 2 < buildArea.x + buildArea.w &&
    s.y + s.h / 2 > buildArea.y &&
    s.y + s.h / 2 < buildArea.y + buildArea.h
  );
}

function arrangeShapesInBox() {
  // Get shapes currently in the box
  let inBoxShapes = shapes.filter((s) => s.inBox);

  if (inBoxShapes.length === 0) return;

  // Sort them by x (for consistent order)
  inBoxShapes.sort((a, b) => a.x - b.x);

  // Determine total width
  const spacing = 10;
  const totalWidth =
    inBoxShapes.reduce((sum, s) => sum + s.w, 0) + spacing * (inBoxShapes.length - 1);
  const startX = buildArea.x + (buildArea.w - totalWidth) / 2;
  const centerY = buildArea.y + buildArea.h / 2;

  // Smoothly position letters in a row
  let currentX = startX;
  for (let s of inBoxShapes) {
    s.x = lerp(s.x, currentX, 0.2);
    s.y = lerp(s.y, centerY - s.h / 2, 0.2);
    currentX += s.w + spacing;
  }
}

function getCurrentWord() {
  let inBoxShapes = shapes.filter((s) => s.inBox);
  inBoxShapes.sort((a, b) => a.x - b.x);
  return inBoxShapes.map((s) => s.label).join('');
}
