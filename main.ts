import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const src = new URL("./entry.png", import.meta.url);
const buf = readFileSync(src);
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const isPng = buf.subarray(0, 8).equals(PNG_MAGIC);
const isJpeg = buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither a PNG nor a JPEG (bad magic bytes)");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
console.log(`wrote ${join(outDir, "entry.png")} (${buf.length} bytes, ${isPng ? "PNG" : "JPEG"})`);
