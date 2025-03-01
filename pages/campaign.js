import { useState } from "react";
import Image from "next/image";

// キャンペーン画像のパス
const CAMPAIGN_IMAGE = "/images/coupon.jpg";

export default function CampaignPage() {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="text-2xl font-bold mb-4">キャンペーン</h1>
      <Image src={CAMPAIGN_IMAGE} alt="キャンペーン" width={600} height={400} />
      <button
        className={`mt-4 p-3 rounded text-white w-60 ${
          isApplied ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
        }`}
        onClick={() => !isApplied && setIsApplied(true)} // すでに応募済みなら変更不可
        disabled={isApplied} // ボタンを無効化
      >
        {isApplied ? "使用済み" : "使用する"}
      </button>
    </div>
  );
}
