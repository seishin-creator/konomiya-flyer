import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const imagesDirectory = path.join(process.cwd(), "public/images");
  const files = fs.readdirSync(imagesDirectory);

  // `header.jpg` と `ecobugcp.JPG` を除外し、画像ファイルのみリスト化
  const imageFiles = files.filter(file =>
    file !== "header.jpg" && file !== "ecobugcp.jpg"&& file !== "coupon.jpg" && /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  res.status(200).json(imageFiles.map(file => `/images/${file}`));
}
