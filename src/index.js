import Vex from "vexflow/src/index.js";

console.log(Vex);

// Create an SVG renderer and attach it to the DIV element named "boo".
const vexflowdiv = document.getElementById("music");
const renderer = new Vex.Flow.Renderer(
  vexflowdiv,
  Vex.Flow.Renderer.Backends.SVG
);

let width = window.innerWidth;
let height = window.innerHeight;

// Size our svg:
renderer.resize(width, height);

// And get a drawing context:
const context = renderer.getContext();
context.scale(2, 2);

// From other guy:
// context.options.scaleToContainer = true;

let stave = new Vex.Flow.Stave(10, 0, width / 2 - 20, {});

const clefSelector = document.getElementById("clef");
const keySelector = document.getElementById("key");
const majorKeys = [
  "C",
  "F",
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Cb",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#"
];
const minorKeys = [
  'Am',
  'Dm',
  'Gm',
  'Cm',
  'Fm',
  'Bbm',
  'Ebm',
  'Abm',
  'Em',
  'Bm',
  'F#m',
  'C#m',
  'G#m',
  'D#m',
  'A#m',
];

majorKeys.forEach(key => {
  let o = document.createElement('option')
  o.value = key;
  o.textContent = key;
  keySelector.children.majorKey.appendChild(o)
})
minorKeys.forEach(key => {
  let o = document.createElement('option')
  o.value = key;
  o.textContent = key;
  keySelector.children.minorKey.appendChild(o)
})

clefSelector.oninput = ev => {
  stave.setClef(clefSelector.value);
  drawStaff();
};

keySelector.oninput = ev => {
  stave.setKeySignature(keySelector.value)
  drawStaff()
}

// Add a clef
stave.setClef(clefSelector.value);

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

window.addEventListener("resize", () => {
  console.log("resized", context.state.scale);
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.resize(width, height);
});

function drawStaff() {
  context.scale(context.state.scale.x, context.state.scale.y);
  stave.setWidth(width / 2 - 20);
  context.clear();
  stave.draw();
}

function selectClef(clef) {
  console.log(clef);
}

let svgPt;
function domToSvg(svg, point) {
  if (!svgPt) svgPt = svg.createSVGPoint();
  svgPt.x = point.x;
  svgPt.y = point.y;
  var sp = svgPt.matrixTransform(svg.getScreenCTM().inverse());
  return {
    x: sp.x,
    y: sp.y
  };
}
