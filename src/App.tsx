import React, { useMemo, useState } from "react";
import bannerImg from "./assets/banner.png";
import seriDaku from "./assets/세리다쿠.png";
import seriShirt from "./assets/세리셔츠.png";
import villainKey from "./assets/악당킬이.png";
import magnet from "./assets/자석.png";
import keyring from "./assets/키링.png";
import figure from "./assets/피규어.png";
import note from "./assets/노트.png";

export default function SejongGoodsShop() {
  const allProducts = useMemo(
    () => [
      {
        id: "seri-daku",
        name: "세리 다쿠마쿠라",
        price: 32000,
        badge: "NEW",
        tags: ["세리", "쿠션", "귀여움"],
        imageUrl: seriDaku,
        color: "살구",
        category: "캐릭터",
      },
      {
        id: "seri-shirt",
        name: "세리 티셔츠 (한글 로고)",
        price: 25000,
        badge: "BEST",
        tags: ["의류", "반팔"],
        imageUrl: seriShirt,
        color: "아이보리",
        category: "캐릭터",
      },
      {
        id: "villain-keyring",
        name: "악당 키링",
        price: 9000,
        tags: ["키링", "랜덤"],
        imageUrl: villainKey,
        color: "혼합",
        category: "악당들",
      },
      {
        id: "magnet",
        name: "세리 자석 세트",
        price: 7000,
        tags: ["자석", "문구"],
        imageUrl: magnet,
        color: "혼합",
        category: "캐릭터",
      },
      {
        id: "keyring",
        name: "세리 키링",
        price: 9000,
        tags: ["키링"],
        imageUrl: keyring,
        color: "핑크",
        category: "캐릭터",
      },
      {
        id: "figure",
        name: "악당 피규어",
        price: 18000,
        tags: ["피규어"],
        imageUrl: figure,
        color: "브라운",
        category: "악당들",
      },
      {
        id: "note",
        name: "세리 노트",
        price: 6000,
        tags: ["노트", "문구"],
        imageUrl: note,
        color: "혼합",
        category: "캐릭터",
      },
    ],
    []
  );

  const categories = ["전체", "캐릭터", "악당들"] as const;
  type Category = (typeof categories)[number];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("전체");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCategory = category === "전체" || p.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [allProducts, category, query]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = allProducts.find((p) => p.id === id);
      if (!product) return sum;
      return sum + product.price * qty;
    }, 0);
  }, [cart, allProducts]);

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const decFromCart = (id: string) =>
    setCart((c) => {
      const next = { ...c } as Record<string, number>;
      if (!next[id]) return next;
      next[id] = Math.max(0, next[id] - 1);
      if (next[id] === 0) delete next[id];
      return next;
    });
  const clearCart = () => setCart({});

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900">
      {/* Hero 배너 */}
      <section className="bg-gradient-to-b from-amber-100 to-amber-50 border-b border-amber-200">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              세종 감성 캐릭터 굿즈,
              <span className="text-amber-700"> 세리</span>와
              <span className="text-amber-700"> 악당들</span>
            </h1>
            <p className="text-stone-600">
              전통 모티프와 귀여움을 담은 굿즈 컬렉션! 아이들과 어른 모두에게 즐거움을 드려요.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-amber-200 bg-white/70 shadow-inner grid place-items-center p-6">
            <img src={bannerImg} alt="배너" className="rounded-xl object-contain h-full" />
          </div>
        </div>
      </section>

      {/* 카탈로그 */}
      <section id="catalog" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-bold mb-4">상품 카탈로그</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl border border-amber-200 bg-white/80 p-3 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {p.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-amber-600 text-white text-xs px-2 py-1 shadow">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 flex-1">
                <h3 className="font-semibold leading-tight line-clamp-2">
                  {p.name}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="font-bold">{p.price.toLocaleString()}원</div>
                <button
                  onClick={() => addToCart(p.id)}
                  className="rounded-lg bg-amber-700 text-white text-sm px-3 py-2 hover:bg-amber-800"
                >
                  담기
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
