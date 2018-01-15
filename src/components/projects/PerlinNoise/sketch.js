export default function sketch(p) {

    var w = window.innerWidth * 0.80;
    var h = window.innerHeight * 0.80;
    var xoff = 0;       //X Offset
    var yoff = 100000;  //Y Offset
    var coff1 = 100;    //Color 1 Offset
    var coff2 = 1000;   //Color 2 Offset
    var coff3 = 10000;  //Color 3 Offset
    var soff = 30;      //Scale Offset

    p.setup = () => {
        p.createCanvas(w, h);
        p.background(50);
        //noStroke();
    }

    p.draw = () => {

        //background(255, 255,255, 0.5);

        var x = p.noise(xoff) * w;
        var y = p.noise(yoff) * h;
        var c1 = p.noise(coff1) * 255;
        var c2 = p.noise(coff2) * 255;
        var c3 = p.noise(coff3) * 255;
        var c = p.color(c1, c2, c3);
        var s = p.noise(soff) * 50;

        p.fill(c);


        p.ellipse(x, y, s);

        xoff += 0.01;
        yoff += 0.01;
        coff1 += 0.02;
        coff2 += 0.02;
        coff3 += 0.02;
        soff += 0.01;



    }
}