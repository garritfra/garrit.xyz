import p5 from 'p5';

export default function sketch() {
  const w = p5.window.innerWidth * 0.80;
  const h = p5.window.innerHeight * 0.80;
  let xoff = 0; // X Offset
  let yoff = 100000; // Y Offset
  let coff1 = 100; // Color 1 Offset
  let coff2 = 1000; // Color 2 Offset
  let coff3 = 10000; // Color 3 Offset
  let soff = 30; // Scale Offset

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.background(50);
    // noStroke();
  };

  p5.draw = () => {
    // background(255, 255,255, 0.5);

    const x = p5.noise(xoff) * w;
    const y = p5.noise(yoff) * h;
    const c1 = p5.noise(coff1) * 255;
    const c2 = p5.noise(coff2) * 255;
    const c3 = p5.noise(coff3) * 255;
    const c = p5.color(c1, c2, c3);
    const s = p5.noise(soff) * 50;

    p5.fill(c);


    p5.ellipse(x, y, s);

    xoff += 0.01;
    yoff += 0.01;
    coff1 += 0.02;
    coff2 += 0.02;
    coff3 += 0.02;
    soff += 0.01;
  };
}
