/* ========================================================
   All College Game Jam 2025 — Main Script
   Sidebar Drawer & Campus Filter Controller (40 Teams)
   ======================================================== */

const GCKPortfolio = (() => {
  let config = {};
  let idleSeconds = 0;
  let frameCount = 0;
  let lastFpsTime = performance.now();
  let fpsCount = 0;
  let currentFps = 60;
  let currentVideoIndex = 0;

  let currentSlide = 1;
  let totalSlides = 1;
  let currentTeamKey = null;

  // === 40 ENTRIES DATA ===
  const TEAM_DATA = {
  "akiba_01": {
    "num": "01",
    "campus": "秋葉原校",
    "title": "花火ニワトリ",
    "genre": "爽快爆発アクション",
    "concept": "花火の力でニワトリが大爆発＆大飛翔！タイミングよく花火を打ち上げハイスコアを目指す！",
    "download": "https://drive.google.com/file/d/1fEkK0uSw0HiPzIgHtO37KKaqltgOM9Ul/view?usp=drivesdk",
    "video": "akiba_01/background.mp4",
    "proposal": "akiba_01/proposal.pdf",
    "thumbnail": "akiba_01/thumbnail.jpg",
    "slideCount": 9
  },
  "akiba_02": {
    "num": "02",
    "campus": "秋葉原校",
    "title": "BomBlow",
    "genre": "3D爆風アクション",
    "concept": "爆風と衝撃波で相手をフィールド外へ吹き飛ばせ！激しいボムの応酬が熱いマルチ対戦！",
    "download": "https://drive.google.com/file/d/1Oe8gyMIYGp_pE4IfuaD4X8Gc9USOi8F7/view?usp=drivesdk",
    "video": "akiba_02/background.mp4",
    "proposal": "akiba_02/proposal.pdf",
    "thumbnail": "akiba_02/thumbnail.jpg",
    "slideCount": 5
  },
  "akiba_03": {
    "num": "03",
    "campus": "秋葉原校",
    "title": "BOMBERJUMPER",
    "genre": "ジャンプ＆ボムアクション",
    "concept": "爆弾の爆発反動を利用して上空へ大ジャンプ！ギミックを駆使してゴールを目指す！",
    "download": null,
    "video": "akiba_03/background.mp4",
    "proposal": "akiba_03/proposal.pdf",
    "thumbnail": "akiba_03/thumbnail.jpg",
    "slideCount": 4
  },
  "akiba_04": {
    "num": "04",
    "campus": "秋葉原校",
    "title": "にゃんばく (nyanbaku)",
    "genre": "弾幕系サバイバルアクション",
    "concept": "爆発する猫たちが大暴れ！無数に降り注ぐ肉球ボムを避けながら生き残る弾幕サバイバル！",
    "download": "https://drive.google.com/file/d/14HwuJ6QwhOfN7KEKCf5-JTGFUjGgcia3/view?usp=drivesdk",
    "video": "akiba_04/background.mp4",
    "proposal": "akiba_04/proposal.pdf",
    "thumbnail": "akiba_04/thumbnail.jpg",
    "slideCount": 5
  },
  "akiba_05": {
    "num": "05",
    "campus": "秋葉原校",
    "title": "LifeBomber",
    "genre": "3Dアクションパズル",
    "concept": "命を削る爆弾か、活路を開く爆風か！ギリギリの判断でゴールを目指す3D爆弾アクション！",
    "download": "https://drive.google.com/file/d/1MaREZ0RGwJK_Rug9kNr3sdNxMlJeupYN/view?usp=drivesdk",
    "video": "akiba_05/background.mp4",
    "proposal": "akiba_05/proposal.pdf",
    "thumbnail": "akiba_05/thumbnail.jpg",
    "slideCount": 5
  },
  "akiba_06": {
    "num": "06",
    "campus": "秋葉原校",
    "title": "バッケツドクター",
    "genre": "爆発治療アクション",
    "concept": "爆薬の刺激で患者を蘇生！？ハチャメチャな治療器具で病魔を吹き飛ばすドタバタ医療アクション！",
    "download": "https://drive.google.com/file/d/1_T6XfXT4nt9jL-DjzLxQ5ynPL-RWfRDs/view?usp=drivesdk",
    "video": "akiba_06/background.mp4",
    "proposal": "akiba_06/proposal.pdf",
    "thumbnail": "akiba_06/thumbnail.jpg",
    "slideCount": 5
  },
  "akiba_07": {
    "num": "07",
    "campus": "秋葉原校",
    "title": "爆破解体進行中！",
    "genre": "ビル解体アクション",
    "concept": "構造計算に基づきダイナマイトをセット！巨大ビルを一気に瓦解させる快感解体シミュレーション！",
    "download": "https://drive.google.com/file/d/1bKdU81txEiE7aSBL0kAjZvT_6OFfz5HB/view?usp=drivesdk",
    "video": "akiba_07/background.mp4",
    "proposal": "akiba_07/proposal.pdf",
    "thumbnail": "akiba_07/thumbnail.jpg",
    "slideCount": 3
  },
  "yokohama_01": {
    "num": "08",
    "campus": "横浜校",
    "title": "鉄骨爆走 ―ファイナルロード―",
    "genre": "デスロードランアクション",
    "concept": "止まれば爆死、進んでも爆死！絶体絶命の鉄骨の上を疾走するスリリングアクション！",
    "download": "https://drive.google.com/file/d/1iTi-hoYsYOKyDN_X8ChYua5yUPm85fPa/view?usp=drivesdk",
    "video": "yokohama_01/background.mp4",
    "proposal": "yokohama_01/proposal.pdf",
    "thumbnail": "yokohama_01/thumbnail.jpg",
    "slideCount": 10
  },
  "yokohama_02": {
    "num": "09",
    "campus": "横浜校",
    "title": "Bom Poppin' Popcorn",
    "genre": "2Dポップコーンフィーバー",
    "concept": "トウモロコシが次々とポップ！弾けるコーンを集めてハイスコアを狙うフィーバーアクション！",
    "download": "https://drive.google.com/file/d/189i2_ZAv_00nxP63PaX5ayEZu4YTzyza/view?usp=drivesdk",
    "video": "yokohama_02/background.mp4",
    "proposal": "yokohama_02/proposal.pdf",
    "thumbnail": "yokohama_02/thumbnail.jpg",
    "slideCount": 5
  },
  "yokohama_03": {
    "num": "10",
    "campus": "横浜校",
    "title": "株式会社カワムラ華火",
    "genre": "打ち上げ花火ランゲーム",
    "concept": "夜空を焦がす大輪の華！リズムに合わせて花火を打ち上げる華やかなランアクション！",
    "download": "https://drive.google.com/file/d/1ztdX70y7J6K4LB730xeycqra8KcXpPZh/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "yokohama_03/proposal.pdf",
    "thumbnail": "yokohama_03/thumbnail.jpg",
    "slideCount": 9
  },
  "yokohama_04": {
    "num": "11",
    "campus": "横浜校",
    "title": "LJUE (Long Jump Using Explosion)",
    "genre": "爆風ジャンプアクション",
    "concept": "爆風の反動で超高所へロングジャンプ！緻密な角度計算と大胆な跳躍でクリアを目指せ！",
    "download": "https://drive.google.com/file/d/1XOSJKJiZBKStzXolctZ9eZLSw40_rTOs/view?usp=drivesdk",
    "video": "yokohama_04/background.mp4",
    "proposal": "yokohama_04/proposal.pdf",
    "thumbnail": "yokohama_04/thumbnail.jpg",
    "slideCount": 6
  },
  "yokohama_05": {
    "num": "12",
    "campus": "横浜校",
    "title": "ポップコーンフリッカー",
    "genre": "フリックアクション",
    "concept": "フライパンから飛び出すポップコーンをフリックで撃ち落とせ！爽快感抜群のカジュアルゲーム！",
    "download": "https://drive.google.com/file/d/1zPa21glqgVoayOewW8-GtbYq9mxxeeiJ/view?usp=drivesdk",
    "video": "yokohama_05/background.mp4",
    "proposal": "yokohama_05/proposal.pdf",
    "thumbnail": "yokohama_05/thumbnail.jpg",
    "slideCount": 7
  },
  "oomiya_01": {
    "num": "13",
    "campus": "大宮校",
    "title": "KnockBlast",
    "genre": "3Dふき飛ばし対戦ゲーム",
    "concept": "相手の行動を読み場外に吹き飛ばす爽快感！読み合いが熱い3D対戦アクション！",
    "download": "https://drive.google.com/file/d/1d8x6HD3xz30NqLUBGFOH8YmpUT_X-LCG/view?usp=drivesdk",
    "video": "oomiya_01/background.mp4",
    "proposal": "oomiya_01/proposal.pdf",
    "thumbnail": "oomiya_01/thumbnail.jpg",
    "slideCount": 8
  },
  "oomiya_02": {
    "num": "14",
    "campus": "大宮校",
    "title": "Sculpion",
    "genre": "3Dアクションパズル",
    "concept": "立体パズルを解き明かしゴールを目指す！緻密な空間把握が求められるパズルゲーム！",
    "download": "https://drive.google.com/file/d/1eyNeTY16RA4ryYtHXM4B-cFNOusb11Ji/view?usp=drivesdk",
    "video": "oomiya_02/background.mp4",
    "proposal": "oomiya_02/proposal.pdf",
    "thumbnail": "oomiya_02/thumbnail.jpg",
    "slideCount": 6
  },
  "oomiya_03": {
    "num": "15",
    "campus": "大宮校",
    "title": "爆発クライマー",
    "genre": "2D3Dクライミングアクション",
    "concept": "爆発の衝撃波で崖を登り詰めろ！一瞬の油断が命取りになる高難易度クライミング！",
    "download": "https://drive.google.com/file/d/1WR8eOOAimC_vsa4FcH2yjIwgk7xttRoT/view?usp=drivesdk",
    "video": "oomiya_03/background.mp4",
    "proposal": "oomiya_03/proposal.pdf",
    "thumbnail": "oomiya_03/thumbnail.jpg",
    "slideCount": 5
  },
  "oomiya_04": {
    "num": "16",
    "campus": "大宮校",
    "title": "クイズクエスト",
    "genre": "クイズバトルRPG",
    "concept": "知識が武器になる！クイズに答えて強力な爆発魔法を放ちモンスターを討伐せよ！",
    "download": "https://drive.google.com/file/d/1ioWJ1e9ZksqpRSQvtVlEiqNX9sADy-24/view?usp=drivesdk",
    "video": "oomiya_04/background.mp4",
    "proposal": "oomiya_04/proposal.pdf",
    "thumbnail": "oomiya_04/thumbnail.jpg",
    "slideCount": 4
  },
  "sendai_01": {
    "num": "17",
    "campus": "仙台校",
    "title": "ヴァルキリーアルカディア",
    "genre": "ランアクション",
    "concept": "戦乙女（ヴァルキリー）が天界を疾走！敵を斬り伏せ障害物を飛び越えるハイスピード・ランアクション！",
    "download": "https://drive.google.com/file/d/1AiYAjd1ft8NbFY9TVe3JeDjBPN3Hj-nJ/view?usp=drivesdk",
    "video": "sendai_01/background.mp4",
    "proposal": "sendai_01/proposal.pdf",
    "thumbnail": "sendai_01/thumbnail.jpg",
    "slideCount": 3
  },
  "sendai_02": {
    "num": "18",
    "campus": "仙台校",
    "title": "スパタコ sparklingtako",
    "genre": "爆破アクション",
    "concept": "炭酸タコが大暴れ！弾けるスパークリングの衝撃で敵を蹴散らす爽快アクション！",
    "download": "https://drive.google.com/file/d/11963JUZUYXcClHPCXC6B5rE_V5VaoajV/view?usp=drivesdk",
    "video": "sendai_02/background.mp4",
    "proposal": "sendai_02/proposal.pdf",
    "thumbnail": "sendai_02/thumbnail.jpg",
    "slideCount": 4
  },
  "sendai_03": {
    "num": "19",
    "campus": "仙台校",
    "title": "DuoInko（デュオインコ）",
    "genre": "協力2Dアクション",
    "concept": "2羽のインコが協力して難関ギミックに挑む！息の合った連携が鍵を握る2Dアクション！",
    "download": "https://drive.google.com/file/d/1OVNf2DH9qrGCSCbQMeFKYjV2P2MnOGX6/view?usp=drivesdk",
    "video": "sendai_03/background.mp4",
    "proposal": "sendai_03/proposal.pdf",
    "thumbnail": "sendai_03/thumbnail.jpg",
    "slideCount": 4
  },
  "osaka_01": {
    "num": "20",
    "campus": "大阪校",
    "title": "LOGIBOOM",
    "genre": "2Dパズルアクション",
    "concept": "ロジカルに爆弾を配置し道を切り拓け！知略と爆破の連鎖が生み出す新感覚パズルアクション！",
    "download": "https://drive.google.com/file/d/1t_QOr5XB5DvcJGjm-lhfJjEDPAc7f8gz/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "osaka_01/proposal.pdf",
    "thumbnail": "osaka_01/thumbnail.jpg",
    "slideCount": 3
  },
  "osaka_02": {
    "num": "21",
    "campus": "大阪校",
    "title": "Bomb！Bomb！DASH！",
    "genre": "爆発2Dランゲーム",
    "concept": "爆風を背に受けて加速ダッシュ！疾走感と爆発の爽快感が融合したハイスピードラン！",
    "download": null,
    "video": "shared/no_reference.mp4",
    "proposal": "osaka_02/proposal.pdf",
    "thumbnail": "osaka_02/thumbnail.jpg",
    "slideCount": 6
  },
  "osaka_03": {
    "num": "22",
    "campus": "大阪校",
    "title": "プラネットボム",
    "genre": "惑星爆破アクション",
    "concept": "迫りくる天体を爆砕せよ！宇宙を舞台に惑星サイズの爆発を引き起こすダイナミックアクション！",
    "download": "https://drive.google.com/file/d/1D0-dRCESlnUqO8jOCvBDMaSCcQX5AVRc/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "osaka_03/proposal.pdf",
    "thumbnail": "osaka_03/thumbnail.jpg",
    "slideCount": 4
  },
  "nagoya_01": {
    "num": "23",
    "campus": "名古屋校",
    "title": "BlowAway",
    "genre": "3D爆破アクション",
    "concept": "爆風で吹き飛ばせ！連鎖爆破の爽快感と戦術性を追求した3D爆破アクションゲーム！",
    "download": null,
    "video": "shared/no_reference.mp4",
    "proposal": "nagoya_01/proposal.pdf",
    "thumbnail": "nagoya_01/thumbnail.jpg",
    "slideCount": 6
  },
  "nagoya_02": {
    "num": "24",
    "campus": "名古屋校",
    "title": "忍火 -しのびび-",
    "genre": "見下ろし型忍対戦アクション",
    "concept": "忍びの技と火遁の爆炎が交錯する！最大4人でワイワイ盛り上がる見下ろし型マルチ対戦ゲーム！",
    "download": "https://drive.google.com/file/d/1TP_SmR_GMKsaT_OBzF_ssdMJBwE5bCqR/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "nagoya_02/proposal.pdf",
    "thumbnail": "nagoya_02/thumbnail.jpg",
    "slideCount": 7
  },
  "sapporo_01": {
    "num": "25",
    "campus": "札幌校",
    "title": "TALLYCARD",
    "genre": "心理爆弾カードバトル",
    "concept": "爆弾所持のスリルと駆け引き！短時間の読み合いが熱い緊迫のカードバトル！",
    "download": "https://drive.google.com/file/d/1wO0LEUCNFstNTUY7-CBm7nHArURpuoLU/view?usp=drivesdk",
    "video": "sapporo_01/background.mp4",
    "proposal": "sapporo_01/proposal.pdf",
    "thumbnail": "sapporo_01/thumbnail.jpg",
    "slideCount": 5
  },
  "sapporo_02": {
    "num": "26",
    "campus": "札幌校",
    "title": "KNUCKLE BOMB",
    "genre": "ジャンプ＆パンチアクション",
    "concept": "ナックルに爆熱の拳を込めて殴り倒せ！豪快なパンチと爆発が炸裂する直感アクション！",
    "download": "https://drive.google.com/file/d/1m_Uinq1seeyMQlQG6MuBMxqJLbR_246I/view?usp=drivesdk",
    "video": "sapporo_02/background.mp4",
    "proposal": "sapporo_02/proposal.pdf",
    "thumbnail": "sapporo_02/thumbnail.jpg",
    "slideCount": 3
  },
  "naha_01": {
    "num": "27",
    "campus": "那覇校",
    "title": "爆走 (BAKUSOU)",
    "genre": "ハイスピードドライビング",
    "concept": "爆弾を積んだマシンでコースを爆走！リミット寸前のスピードとドリフトで駆け抜けろ！",
    "download": "https://drive.google.com/file/d/1YlccsE67mj6CZarYuSg8ojekiPOTI_a9/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "naha_01/proposal.pdf",
    "thumbnail": "naha_01/thumbnail.jpg",
    "slideCount": 6
  },
  "naha_02": {
    "num": "28",
    "campus": "那覇校",
    "title": "プラネットエクスキューション",
    "genre": "スペースシューティング",
    "concept": "宇宙の覇権をかけた大戦争！惑星兵器のビームとミサイルで艦隊を殲滅せよ！",
    "download": "https://drive.google.com/file/d/1p2fK1jwl9SSeura4UlUJEpEVFg6f3lCV/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "naha_02/proposal.pdf",
    "thumbnail": "naha_02/thumbnail.jpg",
    "slideCount": 1
  },
  "naha_03": {
    "num": "29",
    "campus": "那覇校",
    "title": "POPorBOMM",
    "genre": "ポップパズルアクション",
    "concept": "弾けるバブルと迫るボム！連鎖を繋げて一気に画面を一掃する爽快パズルゲーム！",
    "download": "https://drive.google.com/file/d/1Hae0SJlzVpZ_40KPvg9LrA5tRhOREzY2/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "naha_03/proposal.pdf",
    "thumbnail": "naha_03/thumbnail.jpg",
    "slideCount": 7
  },
  "kagoshima_01": {
    "num": "30",
    "campus": "鹿児島校",
    "title": "ハ花ナ火び (ハナビ)",
    "genre": "夜空の花火アクション",
    "concept": "夜空に咲かせる最高の一輪！美しい花火の連発で観客のボルテージを最高潮に高めろ！",
    "download": null,
    "video": "shared/no_reference.mp4",
    "proposal": "kagoshima_01/proposal.pdf",
    "thumbnail": "kagoshima_01/thumbnail.jpg",
    "slideCount": 7
  },
  "kagoshima_02": {
    "num": "31",
    "campus": "鹿児島校",
    "title": "ムーブ・マインボンバー",
    "genre": "地雷探索アクション",
    "concept": "地雷を見つけて大爆発！マインスイーパーの緊張感をアクションに昇華した探索ゲーム！",
    "download": "https://drive.google.com/file/d/1DiN1smKiwUNM6ItN_y6lHVktuLTostxg/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "kagoshima_02/proposal.pdf",
    "thumbnail": "kagoshima_02/thumbnail.jpg",
    "slideCount": 4
  },
  "kobe_01": {
    "num": "32",
    "campus": "神戸三宮校",
    "title": "Corrupted Zone",
    "genre": "サバイバルFPS",
    "concept": "暗闇の廃墟を探索し灯台のバッテリーを確保せよ！恐怖と孤独の90年代風サバイバルFPS！",
    "download": "https://drive.google.com/file/d/1KAtImnvK9NvMRb5mEE4XulGARz5qVnxU/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "kobe_01/proposal.pdf",
    "thumbnail": "kobe_01/thumbnail.jpg",
    "slideCount": 6
  },
  "kobe_02": {
    "num": "33",
    "campus": "神戸三宮校",
    "title": "OctaRipper",
    "genre": "近未来アリーナバトル",
    "concept": "8方向の攻撃と高速回避を駆使してアリーナの敵を殲滅するハイテンポ・サイバーバトル！",
    "download": "https://drive.google.com/file/d/12Nc7YgmXxZ_szuSMxa7chKr_aMRLQLxp/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "kobe_02/proposal.pdf",
    "thumbnail": "kobe_02/thumbnail.jpg",
    "slideCount": 6
  },
  "fukuoka_01": {
    "num": "34",
    "campus": "福岡校",
    "title": "まわして、ドカン！",
    "genre": "回転ギミック爆破アクション",
    "concept": "ステージを回転させて爆弾を誘導！最適なルートを見つけ出しターゲットを爆破せよ！",
    "download": "https://drive.google.com/drive/folders/1PYs_4TcOm6hrQD97XxumSnmH8kM9Kw2Z",
    "video": "shared/no_reference.mp4",
    "proposal": "fukuoka_01/proposal.pdf",
    "thumbnail": "fukuoka_01/thumbnail.jpg",
    "slideCount": 3
  },
  "fukuoka_02": {
    "num": "35",
    "campus": "福岡校",
    "title": "TOYBooM!",
    "genre": "読み合いトイマスゲーム",
    "concept": "おもちゃの世界で盤上の読み合い！一手先の爆発を予見して勝利を掴むタクティカルバトル！",
    "download": "https://drive.google.com/file/d/1vSt7yfUFVBk4AiMRaj1PTLgzkjdRWKLq/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "fukuoka_02/proposal.pdf",
    "thumbnail": "fukuoka_02/thumbnail.jpg",
    "slideCount": 6
  },
  "fukuoka_03": {
    "num": "36",
    "campus": "福岡校",
    "title": "退魔屋ハナビ",
    "genre": "2Dハナビシューティング",
    "concept": "霊符と特製花火玉で悪霊退散！色鮮やかな花火弾幕で妖怪どもを討伐する和風シューティング！",
    "download": "https://drive.google.com/file/d/1H1vmqK-_djU60PAADVnTOC8mHnATd6d8/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "fukuoka_03/proposal.pdf",
    "thumbnail": "fukuoka_03/thumbnail.jpg",
    "slideCount": 4
  },
  "hiroshima_01": {
    "num": "37",
    "campus": "広島校",
    "title": "TO SNOWDROP EACH OTHER",
    "genre": "対戦型タクティカルボード",
    "concept": "雪原に咲く花を巡る心理戦！相手の布陣を読み合い一手で形勢を逆転させるタクティカル対戦！",
    "download": "https://drive.google.com/file/d/1z2P9shstIiaSnf3mHxR35iKe5bG1Q_hi/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "hiroshima_01/proposal.pdf",
    "thumbnail": "hiroshima_01/thumbnail.jpg",
    "slideCount": 2
  },
  "hiroshima_02": {
    "num": "38",
    "campus": "広島校",
    "title": "人気爆発！！地雷ちゃん",
    "genre": "アンチコメント爆破アクション",
    "concept": "アンチコメントを片っ端から爆破消去！SNSの炎上を鎮めて笑顔を取り戻すハイテンションゲーム！",
    "download": null,
    "video": "shared/no_reference.mp4",
    "proposal": "hiroshima_02/proposal.pdf",
    "thumbnail": "hiroshima_02/thumbnail.jpg",
    "slideCount": 1
  },
  "shizuoka_01": {
    "num": "39",
    "campus": "静岡校",
    "title": "BOOMBOX",
    "genre": "横スクロール2Dアクション",
    "concept": "ビートに合わせてボムを投下！リズミカルな破壊と音楽が心地よい2D横スクロールアクション！",
    "download": "https://drive.google.com/file/d/1EP6w3mw2jpRieo9GVCpDZFQ0N0_r-GJu/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "shizuoka_01/proposal.pdf",
    "thumbnail": "shizuoka_01/thumbnail.jpg",
    "slideCount": 5
  },
  "kyoto_01": {
    "num": "40",
    "campus": "京都校",
    "title": "LOVE♡BOMB",
    "genre": "アクション×タワーディフェンス",
    "concept": "愛の力で拠点を防衛！押し寄せる敵をハートボムで浄化する新感覚タワーディフェンス！",
    "download": "https://drive.google.com/file/d/1zRHUiB6AJAAFByltqEjwGARJTdSJVLoq/view?usp=drivesdk",
    "video": "shared/no_reference.mp4",
    "proposal": "kyoto_01/proposal.pdf",
    "thumbnail": "kyoto_01/thumbnail.jpg",
    "slideCount": 6
  }
};

  function init(options) {
    config = Object.assign({
      pageType: 'index',
      videos: [],
      currentTeam: null,
      autoSwitchInterval: 30
    }, options);

    initFuiHUD();
    initVideoBackground();
    initMouseReveal();
    initAutoSwitch();
    initCampusDrawer();

    if (config.pageType === 'index') {
      initIndexCards();
      initCampusFilter();
    } else if (config.pageType === 'team') {
      initTeamPage();
    }
  }

  function initCampusDrawer() {
    const trigger = document.getElementById('drawerTrigger');
    const closeBtn = document.getElementById('drawerClose');
    const sidebar = document.getElementById('campusSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (!trigger || !sidebar || !backdrop) return;

    function openSidebar() {
      sidebar.classList.add('active');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
      sidebar.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    backdrop.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  function initCampusFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.team-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.campus;

        cards.forEach(card => {
          if (selected === 'all' || card.dataset.campus === selected) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function initFuiHUD() {
    const timeEl = document.getElementById('fuiTime');
    const coordEl = document.getElementById('fuiCoord');
    const fpsEl = document.getElementById('fuiFps');
    const frameEl = document.getElementById('fuiFrame');
    const idleEl = document.getElementById('fuiIdle');

    function updateHUD() {
      const now = new Date();
      if (timeEl) {
        timeEl.textContent = now.getFullYear() + '.' +
          String(now.getMonth() + 1).padStart(2, '0') + '.' +
          String(now.getDate()).padStart(2, '0') + ' ' +
          String(now.getHours()).padStart(2, '0') + ':' +
          String(now.getMinutes()).padStart(2, '0') + ':' +
          String(now.getSeconds()).padStart(2, '0');
      }

      frameCount++;
      fpsCount++;
      const curTime = performance.now();
      if (curTime - lastFpsTime >= 500) {
        currentFps = Math.round((fpsCount * 1000) / (curTime - lastFpsTime));
        fpsCount = 0;
        lastFpsTime = curTime;
      }

      if (fpsEl) fpsEl.textContent = currentFps;
      if (frameEl) frameEl.textContent = String(frameCount).padStart(6, '0');
      if (idleEl) idleEl.textContent = String(idleSeconds).padStart(2, '0') + 's';

      requestAnimationFrame(updateHUD);
    }
    requestAnimationFrame(updateHUD);

    document.addEventListener('mousemove', (e) => {
      idleSeconds = 0;
      if (coordEl) {
        coordEl.textContent = 'X:' + String(e.clientX).padStart(4, '0') + ' Y:' + String(e.clientY).padStart(4, '0');
      }
    });

    setInterval(() => {
      idleSeconds++;
    }, 1000);
  }

  function initVideoBackground() {
    const bgVideo = document.getElementById('bgVideo');
    const revealVideo = document.getElementById('revealVideo');
    if (!bgVideo) return;

    if (config.videos.length > 0) {
      bgVideo.src = config.videos[0];
      if (revealVideo) revealVideo.src = config.videos[0];
      bgVideo.play().catch(() => {});
      if (revealVideo) revealVideo.play().catch(() => {});
    }
  }

  function initMouseReveal() {
    const revealLayer = document.querySelector('.mouse-reveal-layer');
    if (!revealLayer) return;

    document.addEventListener('mousemove', (e) => {
      revealLayer.style.setProperty('--mouse-x', e.clientX + 'px');
      revealLayer.style.setProperty('--mouse-y', e.clientY + 'px');
    });
  }

  function initAutoSwitch() {
    if (!config.videos || config.videos.length <= 1) return;
    const interval = config.autoSwitchInterval * 1000;
    const bar = document.querySelector('.auto-switch-bar');

    function triggerSwitch() {
      triggerGlitch(() => {
        currentVideoIndex = (currentVideoIndex + 1) % config.videos.length;
        const bgVideo = document.getElementById('bgVideo');
        const revealVideo = document.getElementById('revealVideo');
        if (bgVideo) bgVideo.src = config.videos[currentVideoIndex];
        if (revealVideo) revealVideo.src = config.videos[currentVideoIndex];
      });
    }

    function restartBar() {
      if (bar) {
        bar.style.animation = 'none';
        void bar.offsetHeight;
        bar.style.animation = 'switchProgress ' + config.autoSwitchInterval + 's linear infinite';
      }
    }

    restartBar();
    setInterval(() => {
      triggerSwitch();
      restartBar();
    }, interval);
  }

  function triggerGlitch(callback) {
    const overlay = document.getElementById('glitchOverlay');
    if (!overlay) {
      if (callback) callback();
      return;
    }
    overlay.classList.add('active');
    setTimeout(() => {
      if (callback) callback();
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 150);
    }, 150);
  }

  function initIndexCards() {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
      const video = card.querySelector('.team-card-thumbnail');
      if (video) {
        card.addEventListener('mouseenter', () => {
          video.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
          video.pause();
        });
      }
    });
  }

  function initTeamPage() {
    currentTeamKey = config.currentTeam;
    const data = TEAM_DATA[currentTeamKey];
    if (!data) return;

    totalSlides = data.slideCount || 1;
    currentSlide = 1;

    const teamNameEl = document.getElementById('teamName');
    const workTitleEl = document.getElementById('workTitle');
    const teamConceptEl = document.getElementById('teamConcept');
    const campusTagEl = document.getElementById('campusTag');
    const downloadBtn = document.getElementById('downloadBtn');

    if (teamNameEl) teamNameEl.textContent = data.title;
    if (workTitleEl) workTitleEl.textContent = data.genre;
    if (teamConceptEl) teamConceptEl.textContent = data.concept;
    if (campusTagEl) campusTagEl.textContent = data.campus;

    if (downloadBtn) {
      if (data.download) {
        downloadBtn.href = data.download;
        downloadBtn.target = '_blank';
        downloadBtn.rel = 'noopener';
        downloadBtn.setAttribute('aria-label', 'Open Google Drive to download ' + data.title);
        downloadBtn.classList.remove('is-unavailable');
        downloadBtn.removeAttribute('aria-disabled');
        downloadBtn.removeAttribute('tabindex');
        downloadBtn.removeAttribute('title');
        downloadBtn.textContent = 'DOWNLOAD GAME IN DRIVE';
      } else {
        downloadBtn.removeAttribute('href');
        downloadBtn.removeAttribute('target');
        downloadBtn.removeAttribute('rel');
        downloadBtn.classList.add('is-unavailable');
        downloadBtn.setAttribute('aria-disabled', 'true');
        downloadBtn.setAttribute('tabindex', '-1');
        downloadBtn.setAttribute('title', 'Game build unavailable');
        downloadBtn.textContent = 'GAME BUILD UNAVAILABLE';
      }
      downloadBtn.style.display = 'inline-flex';
    }

    updateSlideViewer();
  }

  function updateSlideViewer() {
    const img = document.getElementById('slideImage');
    const counter = document.getElementById('slideCounter');
    if (img && currentTeamKey) {
      img.src = currentTeamKey + '/pages/page_' + currentSlide + '.jpg';
    }
    if (counter) {
      counter.textContent = 'PAGE ' + currentSlide + ' / ' + totalSlides;
    }
  }

  function changeSlide(delta) {
    currentSlide += delta;
    if (currentSlide < 1) currentSlide = totalSlides;
    if (currentSlide > totalSlides) currentSlide = 1;
    updateSlideViewer();
  }

  function setProposalViewMode(mode) {
    const iframe = document.getElementById('proposalIframe');
    const viewer = document.getElementById('proposalSlidesViewer');
    const tabPdf = document.getElementById('tabPdf');
    const tabSlides = document.getElementById('tabSlides');

    if (mode === 'pdf') {
      if (iframe) iframe.style.display = 'block';
      if (viewer) viewer.style.display = 'none';
      if (tabPdf) tabPdf.classList.add('active');
      if (tabSlides) tabSlides.classList.remove('active');
    } else {
      if (iframe) iframe.style.display = 'none';
      if (viewer) viewer.style.display = 'flex';
      if (tabPdf) tabPdf.classList.remove('active');
      if (tabSlides) tabSlides.classList.add('active');
      updateSlideViewer();
    }
  }

  return {
    init,
    changeSlide,
    setProposalViewMode,
    getTeamData: (k) => TEAM_DATA[k]
  };
})();

function openModal(type) {
  const modal = document.getElementById(type + 'Modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const iframe = modal.querySelector('iframe[data-src]');
    if (iframe && !iframe.hasAttribute('src')) {
      iframe.src = iframe.dataset.src;
    }
    const video = modal.querySelector('video');
    if (video) {
      if (video.dataset.src && !video.hasAttribute('src')) {
        video.src = video.dataset.src;
      }
      video.play().catch(() => {});
    }
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(m => {
    m.classList.remove('active');
    const video = m.querySelector('video');
    if (video) video.pause();
  });
  document.body.style.overflow = '';
}

function changeSlide(delta) {
  GCKPortfolio.changeSlide(delta);
}

function setProposalViewMode(mode) {
  GCKPortfolio.setProposalViewMode(mode);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
