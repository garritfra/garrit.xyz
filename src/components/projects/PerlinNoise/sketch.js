export default function sketch(p) {
  const w = window.innerWidth * 0.80;
  const h = window.innerHeight * 0.80;
  let xoff = 0; // X Offset
  let yoff = 100000; // Y Offset
  let coff1 = 100; // Color 1 Offset
  let coff2 = 1000; // Color 2 Offset
  let coff3 = 10000; // Color 3 Offset
  let soff = 30; // Scale Offset

  p.setup = () => {
    p.createCanvas(w, h);
    p.background(50);
    // noStroke();
  };

  p.draw = () => {
    // background(255, 255,255, 0.5);

    const x = p.noise(xoff) * w;
    const y = p.noise(yoff) * h;
    const c1 = p.noise(coff1) * 255;
    const c2 = p.noise(coff2) * 255;
    const c3 = p.noise(coff3) * 255;
    const c = p.color(c1, c2, c3);
    const s = p.noise(soff) * 50;

    p.fill(c);


    p.ellipse(x, y, s);

    xoff += 0.01;
    yoff += 0.01;
    coff1 += 0.02;
    coff2 += 0.02;
    coff3 += 0.02;
    soff += 0.01;
  };
}
