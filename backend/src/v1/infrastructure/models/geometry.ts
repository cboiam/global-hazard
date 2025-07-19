
class Geometry {
    magnitude: number;
    unit: string;
    date: string;
    type: "Point";
    coordinates: number[];

    constructor(data: any) {
        this.magnitude = data.magnitudeValue;
        this.unit = data.magnitudeUnit;
        this.date = data.date;

        this.type = "Point";
        if (data.type === this.type) {
            this.coordinates = data.coordinates;
            return;
        }
        if (data.type === "Polygon") {
            // converts polygon to a point in its center
            this.coordinates = centroid(data.coordinates);
            return;
        }
        throw new Error("Geometry not suported!");
    }
}

// Piece of code based on: https://gist.github.com/seyuf/ab9c980776e4c2cb350a2d1e70976517
// But improved to one iteration only
function centroid(poly: { coordinates: number[][] }) {
    let s = 0.0;
    let c = [0, 0];
    const ring = poly.coordinates[0];
    
    for (let i = 0; i < (ring.length - 1); i++) {
        s += (ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]);
        c[0] += (ring[i][0] + ring[i + 1][0]) * (ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]);
        c[1] += (ring[i][1] + ring[i + 1][1]) * (ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]);
    }
    
    const a = 0.5 * s * 6;
    c[0] /= a;
    c[1] /= a;
    
    return c;
}
/////////////////////////////////////////////////////////////////////////////////////////////////

export { Geometry };