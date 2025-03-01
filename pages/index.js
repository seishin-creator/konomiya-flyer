import { useState, useEffect } from "react";
import Image from "next/image";

// ヘッダー画像のパス（ローカル）
const HEADER_IMAGE_URL = "/images/header.jpg";

export default function Home() {
  const [productImages, setProductImages] = useState([]);
  const [cart, setCart] = useState([]);

  // `public/images/` 内の画像を取得する処理
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/getImages");
        const data = await res.json();

        // `fallback.jpg` を除外
        const filteredImages = data.filter(img => !img.includes("fallback.jpg"));
        setProductImages(filteredImages);
      } catch (error) {
        console.error("画像リストの取得に失敗しました", error);
      }
    }
    fetchImages();
  }, []);

  // カートに商品を追加/削除
  const toggleCartItem = (image) => {
    if (cart.includes(image)) {
      setCart(cart.filter(item => item !== image));
    } else {
      setCart([...cart, image]);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ヘッダー画像 */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md p-4 text-center">
        <Image src={HEADER_IMAGE_URL} alt="マルミヤストア" width={600} height={200} />
      </div>

      {/* 商品画像リスト */}
      <div className="w-full max-w-2xl mt-28 pb-20 grid grid-cols-2 gap-0">
        {productImages.length > 0 ? (
          productImages.map((img, index) => (
            <div key={index} className="p-0">
              <Image src={img} alt={`商品 ${index + 1}`} width={200} height={200} className="w-full h-auto" />
              <button
                className={`p-2 rounded w-full ${cart.includes(img) ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}
                onClick={() => toggleCartItem(img)}
              >
                {cart.includes(img) ? "選択済み（クリックで解除）" : "カートに追加"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">商品画像を読み込み中...</p>
        )}
      </div>

      {/* フッター */}
      <div className="fixed bottom-0 w-full bg-gray-800 text-white p-4 flex justify-around">
        <button className="bg-green-500 p-2 rounded" onClick={() => {
          const destination = encodeURIComponent("愛知県名古屋市南区前浜通３丁目");
          const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&m=0`;
          window.open(routeUrl, '_blank');
        }}>
          ルート
        </button>
        <button className="bg-yellow-500 p-2 rounded" onClick={() => window.open("/campaign", '_blank')}>キャンペーン</button>
        <button className="bg-red-500 p-2 rounded" onClick={() => {
          const cartWindow = window.open("", "_blank");
          cartWindow.document.write(`
            <html>
              <head>
                <title>カート内容</title>
                <style>
                  body { display: flex; flex-direction: column; align-items: center; padding: 10px; background-color: #f8f8f8; }
                  .grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; width: 100%; max-width: 600px; }
                  img { width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); }
                  .close-btn { margin-top: 20px; padding: 10px; background-color: #ff4d4d; color: white; border: none; border-radius: 5px; cursor: pointer; }
                </style>
              </head>
              <body>
                <h2>カート内容</h2>
                <div class="grid-container">
          `);

          cart.forEach(item => {
            cartWindow.document.write(`<img src="${item}" alt="商品">`);
          });

          cartWindow.document.write(`
                </div>
                <button class="close-btn" onclick="window.close()">閉じる</button>
              </body>
            </html>
          `);
          cartWindow.document.close();
        }}>
          カート
        </button>
      </div>
    </div>
  );
}
