function rgb2hsb(r, g, b) {
    console.log("WHY MUST YOU DO THIS TO ME")
    let values = [r, g, b].sort();
    let max = values[2];
    let min = values[0];
    let mid = values[1];
    
    let b = Math.round(max / 255);

    let s = Math.round((max - min) / max);

    let h = ((mid-min) / max) * 360;

    return { hue: h, saturation: s, brightness: b };
}
  