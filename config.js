/* =========================================================
   収益化の設定（ここだけ書き換えれば全ページに反映される）
   - url が空のサービスは、ボタンごと非表示になる
   - ga4 / adsense が空なら、計測・広告は読み込まない
   ========================================================= */
window.LOVELAB = {
  // Googleアナリティクス4 の測定ID（例："G-ABC123XYZ"）
  ga4: "",

  // Googleアドセンスのパブリッシャー ID（例："ca-pub-1234567890123456"）
  // 審査に通ったら入れる。自動広告で表示される
  adsense: "",

  // アフィリエイトリンク（ASPで発行されたURLを url に入れる）
  links: {
    // マッチングアプリ
    pairs:    {name: "Pairs（ペアーズ）", note: "会員数が多く、趣味のコミュニティから相手を探せる", url: ""},
    with:     {name: "with（ウィズ）",    note: "性格診断をもとに相性のいい相手が見つかる",         url: ""},
    tapple:   {name: "タップル",          note: "「今日ごはん行ける人」など気軽に会いやすい",       url: ""},
    omiai:    {name: "Omiai",             note: "真剣度が高めで落ち着いた出会い向き",               url: ""},
    zexy:     {name: "ゼクシィ縁結び",    note: "結婚を考えた相手探し。お見合い調整の機能あり",     url: ""},
    // 占い（pixel は A8 の表示計測用の画像URL。あれば入れる）
    coconala: {name: "ココナラ電話占い",  note: "恋愛相談が得意な占い師を、口コミを見ながら選んで電話で相談できる",
               url: "https://px.a8.net/svt/ejp?a8mat=4BEL1L+FUYQOQ+2PEO+HUKPU&a8ejpredirect=https%3A%2F%2Fcoconala.com%2Fcategories%2F2%3Fservice_kind%3D1",
               pixel: "https://www15.a8.net/0.gif?a8mat=4BEL1L+FUYQOQ+2PEO+HUKPU"},
    vernis:   {name: "電話占いヴェルニ",  note: "電話・チャットで恋愛の悩みを占い師に相談できる", url: ""},
    pureri:   {name: "電話占いピュアリ",  note: "恋愛相談が得意な占い師を選んで相談できる",       url: ""},
    linetalk: {name: "LINEトーク占い",    note: "LINEのチャットで気軽に相談できる",               url: ""},
  },
};
