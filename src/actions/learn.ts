"use server";

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  duration: string;
  content?: string;
}

const mockModules: Module[] = [
  // ==========================================
  // BEGINNER
  // ==========================================
  {
    id: "intro-economics",
    title: "Intro to Economics",
    description: "The fundamental study of how society manages its scarce resources.",
    icon: "BookOpen",
    level: "Beginner",
    duration: "45 mins",
    content: `# Macroeconomics 101: Memahami Gambaran Besar Ekonomi

Makroekonomi adalah cabang ilmu ekonomi yang mempelajari perilaku, struktur, kinerja, dan pengambilan keputusan ekonomi secara keseluruhan (agregat). Berbeda dengan mikroekonomi yang berfokus pada individu dan perusahaan, makroekonomi melihat perekonomian dalam skala nasional maupun global.

## 1. PDB (Produk Domestik Bruto)
PDB adalah indikator utama untuk mengukur kesehatan ekonomi suatu negara. PDB menghitung total nilai semua barang dan jasa akhir yang diproduksi di suatu negara dalam periode tertentu.
- **PDB Riil vs Nominal:** PDB Riil telah disesuaikan dengan inflasi, sedangkan Nominal belum.
- **Resesi:** Umumnya didefinisikan sebagai penurunan PDB riil selama dua kuartal berturut-turut.

## 2. Inflasi dan Deflasi
- **Inflasi:** Kenaikan harga barang dan jasa secara umum yang menyebabkan turunnya daya beli uang. Inflasi moderat (sekitar 2%) dianggap sehat.
- **Deflasi:** Penurunan harga barang dan jasa, yang sering kali menunda konsumsi (karena orang menunggu harga lebih murah) dan dapat memicu krisis ekonomi.

## 3. Kebijakan Moneter dan Fiskal
- **Kebijakan Moneter:** Diatur oleh Bank Sentral (seperti The Fed atau Bank Indonesia). Alat utamanya adalah **suku bunga** dan jumlah uang beredar. Jika inflasi tinggi, bank sentral akan menaikkan suku bunga.
- **Kebijakan Fiskal:** Diatur oleh Pemerintah melalui **pajak** dan **pengeluaran negara**. Saat ekonomi lesu, pemerintah dapat memotong pajak atau meningkatkan pengeluaran (misalnya untuk infrastruktur) guna menstimulasi pertumbuhan.

## Kesimpulan
Memahami makroekonomi sangat krusial bagi investor dan trader karena data makro (seperti rilis inflasi atau keputusan suku bunga) dapat menggerakkan pasar keuangan secara signifikan dalam hitungan detik.`
  },
  {
    id: "supply-demand",
    title: "Supply & Demand",
    description: "The core model of market economics determining price and quantity.",
    icon: "TrendingUp",
    level: "Beginner",
    duration: "1 hour",
    content: `# Dinamika Permintaan dan Penawaran (Supply & Demand)

Dalam *trading*, segala sesuatunya—baik itu harga saham Apple, nilai tukar EUR/USD, hingga harga Bitcoin—ditentukan oleh satu hukum mutlak: Permintaan dan Penawaran.

## 1. Konsep Dasar 
- Jika **Permintaan > Penawaran**, harga akan NAIK. (Banyak pembeli, sedikit penjual).
- Jika **Penawaran > Permintaan**, harga akan TURUN. (Banyak penjual, sedikit pembeli).

## 2. Mengidentifikasi Area S&D di Grafik (Chart)
Trader sering menggunakan konsep S&D dalam analisis teknikal:
- **Area Demand (Support):** Area harga di mana pembeli historis masuk dengan kuat, mencegah harga turun lebih jauh. Di sini, minat beli mengalahkan minat jual.
- **Area Supply (Resistance):** Area harga di mana penjual agresif masuk untuk mengambil keuntungan, menyebabkan harga berbalik arah ke bawah.

## 3. Order Block dan Likuiditas
Pergerakan drastis di pasar biasanya diciptakan oleh institusi besar (Bank, Hedge Fund) yang menempatkan pesanan raksasa (Order Block). Ketika harga kembali ke level di mana institusi tersebut memulai pergerakan besarnya, biasanya akan terjadi reaksi harga yang kuat karena sisa-sisa order masih tertinggal di sana.`
  },
  {
    id: "opportunity-cost",
    title: "Opportunity Cost",
    description: "Understanding the true cost of making any economic decision.",
    icon: "PieChart",
    level: "Beginner",
    duration: "30 mins",
    content: `# Opportunity Cost\n\nOpportunity cost is the value of the next best alternative forgone as the result of making a decision.\n\n### Why it Matters\nEvery choice has a cost. By choosing to spend time or money on one thing, you are giving up the opportunity to spend it on something else. This concept is crucial for rational decision-making in both business and daily life.`
  },
  {
    id: "gdp-basics",
    title: "GDP Basics",
    description: "Measuring the total economic output of a country.",
    icon: "Layout",
    level: "Beginner",
    duration: "45 mins",
    content: `# Memahami Pertumbuhan GDP (PDB)

Gross Domestic Product (GDP) atau Produk Domestik Bruto (PDB) adalah "rapor" bagi suatu negara. Ini adalah angka tunggal yang paling sering dilihat untuk menilai apakah negara tersebut semakin kaya atau malah terpuruk.

## 1. Komponen PDB
PDB dihitung dari empat komponen utama (Rumus: C + I + G + NX):
1. **Consumption (C):** Konsumsi rumah tangga (belanja makanan, mobil, listrik). Ini biasanya porsi terbesar (di AS mencapai 70%).
2. **Investment (I):** Investasi bisnis (pembelian mesin baru, pembangunan pabrik).
3. **Government Spending (G):** Pengeluaran pemerintah (gaji PNS, infrastruktur).
4. **Net Exports (NX):** Ekspor dikurangi Impor. Jika negara lebih banyak mengekspor, NX akan positif.

## 2. Mengapa Trader Peduli pada GDP?
- GDP yang **lebih tinggi dari ekspektasi** menunjukkan ekonomi yang kuat, biasanya positif untuk pasar saham lokal dan menguatkan mata uang negara tersebut.
- GDP yang **kontraksi (negatif)** selama dua kuartal memicu peringatan resesi, membuat investor memindahkan aset ke obligasi atau emas (Safe Haven).`
  },
  {
    id: "inflation-basics",
    title: "Inflation Basics",
    description: "The rate at which the general level of prices for goods and services is rising.",
    icon: "TrendingUp",
    level: "Beginner",
    duration: "1 hour",
    content: `# Pengenalan Lanjutan Makroekonomi: Inflasi vs Deflasi

Inflasi dan deflasi adalah dua sisi mata uang yang sangat memengaruhi daya beli masyarakat dan kebijakan moneter suatu negara. Memahami keduanya adalah kunci untuk mengantisipasi pergerakan suku bunga.

## 1. Penyebab Inflasi
Inflasi tidak terjadi begitu saja. Ada tiga penyebab utama:
- **Demand-Pull Inflation:** Terjadi ketika permintaan barang dan jasa melebihi kapasitas produksi. Uang yang beredar terlalu banyak mengejar barang yang terlalu sedikit.
- **Cost-Push Inflation:** Terjadi akibat kenaikan biaya produksi (misalnya: harga minyak dunia naik tajam atau upah minimum naik). Biaya ini kemudian dibebankan kepada konsumen.
- **Built-In Inflation:** Harapan masyarakat bahwa harga akan terus naik, sehingga pekerja menuntut upah lebih tinggi yang pada gilirannya mendorong pengusaha menaikkan harga jual.

## 2. Bahaya Tersembunyi Deflasi
Meskipun harga barang turun terdengar bagus, deflasi sangat ditakuti oleh bank sentral.
Mengapa? Karena saat harga terus turun, konsumen akan **menunda pembelian** (berharap harga lebih murah besok). Akibatnya, perusahaan kehilangan pendapatan, terpaksa mem-PHK karyawan, yang berujung pada turunnya daya beli secara keseluruhan. Inilah yang disebut dengan *Deflationary Spiral*.

## 3. Aset Lindung Nilai (Hedging)
- **Saat Inflasi Tinggi:** Uang tunai kehilangan nilainya. Investor biasanya beralih ke Emas, Real Estat, atau Saham (karena perusahaan bisa menaikkan harga jual).
- **Saat Deflasi:** Uang tunai (Cash) menjadi raja. Obligasi pemerintah tenor panjang juga menjadi pilihan utama.`
  },
  {
    id: "consumer-behavior",
    title: "Consumer Behavior",
    description: "How individuals make decisions to spend their available resources.",
    icon: "DollarSign",
    level: "Beginner",
    duration: "45 mins",
    content: `# Psikologi dan Behavioral Economics

Dalam dunia finansial modern, manusia diakui tidak selalu mengambil keputusan secara rasional. *Behavioral Economics* menggabungkan psikologi dan ekonomi untuk menjelaskan mengapa trader sering kali membuat keputusan yang merugikan dirinya sendiri.

## 1. FOMO (Fear of Missing Out)
Rasa takut tertinggal saat melihat harga suatu aset terbang tinggi. Ini mendorong trader untuk membeli di harga puncak (pucuk) tanpa analisis objektif. Saat tren berbalik, mereka terjebak kerugian.

## 2. Loss Aversion
Secara psikologis, rasa sakit akibat kehilangan uang 2x lebih kuat daripada rasa senang mendapat untung dengan jumlah yang sama. Akibatnya, trader sering kali:
- Terlalu cepat menjual aset yang sedang untung (takut untungnya hilang).
- Menahan aset yang rugi (tidak mau menerima kekalahan), berharap harganya kembali naik (hopium).

## 3. Confirmation Bias
Kecenderungan untuk hanya mencari informasi yang membenarkan posisi/analisis kita. Jika Anda sedang "buy" (Long) Bitcoin, Anda secara tidak sadar akan mengabaikan berita buruk tentang regulasi kripto dan hanya membaca berita baik.

## Mengatasi Emosi
Disiplin dan jurnal trading adalah kunci. Memiliki *Trading Plan* (Entry, Stop Loss, Take Profit) sebelum membuka posisi dapat mengeliminasi keputusan emosional.`
  },
  {
    id: "producer-basics",
    title: "Producer Basics",
    description: "How firms make decisions about production and pricing.",
    icon: "LineChart",
    level: "Beginner",
    duration: "1 hour",
    content: `# Producer Theory\n\nProducer theory examines how a firm makes decisions regarding what to produce, how much to produce, and how much to charge.\n\n### Profit Maximization\nFirms generally aim to maximize profit, which is the difference between total revenue and total cost. This involves analyzing marginal cost and marginal revenue.`
  },

  // ==========================================
  // INTERMEDIATE
  // ==========================================
  {
    id: "monetary-policy",
    title: "Monetary Policy & The Fed",
    description: "Deep dive into how the Federal Reserve uses interest rates.",
    icon: "DollarSign",
    level: "Intermediate",
    duration: "3 hours",
    content: `# Kebijakan Moneter & The Fed

Federal Reserve (The Fed) adalah bank sentral Amerika Serikat. Karena Dolar AS (USD) adalah mata uang cadangan global, setiap kebijakan yang diambil oleh The Fed akan berdampak ke seluruh dunia, termasuk Indonesia.

## Mandat Ganda The Fed (Dual Mandate)
Kongres AS memberikan dua tugas utama kepada The Fed:
1. **Stabilitas Harga:** Menjaga inflasi di kisaran target 2%.
2. **Ketenagakerjaan Maksimal:** Menjaga tingkat pengangguran serendah mungkin tanpa memicu inflasi berlebih.

## Alat Kebijakan Utama
- **Federal Funds Rate (FFR):** Suku bunga acuan overnight. Jika FFR naik, bunga deposito dan kredit akan naik. Ini mengerem ekonomi karena orang lebih suka menabung.
- **Quantitative Easing (QE):** Pembelian obligasi besar-besaran oleh The Fed untuk membanjiri pasar dengan likuiditas. Sering dilakukan saat krisis (seperti 2008 dan 2020) untuk menstimulasi aset berisiko seperti saham dan kripto.
- **Quantitative Tightening (QT):** Kebalikan dari QE. The Fed mengurangi neraca keuangannya dengan menjual aset, menarik uang dari sistem keuangan.

## Dampak pada Trading
- **Hawkish:** The Fed bersikap agresif terhadap inflasi (biasanya menaikkan suku bunga). Berdampak **negatif** untuk Saham & Kripto, **positif** untuk USD.
- **Dovish:** The Fed bersikap akomodatif (menurunkan suku bunga). Berdampak **positif** untuk Saham & Kripto, **negatif** untuk USD.`
  },
  {
    id: "market-cycles",
    title: "Market Cycles & Indicators",
    description: "Identify market tops and bottoms using leading, lagging, and coincident economic indicators.",
    icon: "TrendingUp",
    level: "Intermediate",
    duration: "2.5 hours",
    content: `# Market Cycles & Indikator Ekonomi

Pasar keuangan tidak bergerak dalam satu garis lurus. Ekonomi bergerak dalam siklus: Ekspansi (pertumbuhan), Puncak (Top), Kontraksi (Resesi), dan Palung (Bottom). Mengetahui di mana posisi kita dalam siklus sangat penting untuk investasi.

## Tiga Jenis Indikator Ekonomi
1. **Leading Indicators (Indikator Mendahului):** Memberikan sinyal sebelum ekonomi berbelok. Contoh: Pasar Saham, Izin Mendirikan Bangunan (Building Permits), Yield Curve (Kurva Imbal Hasil).
2. **Coincident Indicators (Indikator Kebetulan):** Bergerak bersamaan dengan kondisi ekonomi saat ini. Contoh: PDB, Penjualan Ritel, Tingkat Konsumsi.
3. **Lagging Indicators (Indikator Tertinggal):** Berubah setelah ekonomi mulai berubah. Sering digunakan untuk mengonfirmasi tren. Contoh: Tingkat Pengangguran, Tingkat Inflasi Inti.

## Rotasi Sektor dalam Siklus Pasar
- **Masa Resesi (Awal Pemulihan):** Sektor Finansial dan Teknologi cenderung mulai *rally* karena antisipasi penurunan suku bunga.
- **Masa Ekspansi (Puncak Pertumbuhan):** Sektor Material Dasar dan Industri unggul.
- **Masa Kontraksi (Awal Penurunan):** Sektor Defensif (seperti Kesehatan, Barang Konsumsi Pokok, dan Utilitas) menjadi tempat berlindung investor.

Sebagai trader, memantau *Yield Curve Inversion* (ketika obligasi tenor pendek memberi bunga lebih tinggi dari tenor panjang) adalah salah satu prediktor resesi paling akurat sepanjang sejarah.`
  },

  // ==========================================
  // ADVANCED
  // ==========================================
  {
    id: "fiscal-policy",
    title: "Fiscal Policy",
    description: "The use of government revenue collection and expenditure to influence a country's economy.",
    icon: "Layout",
    level: "Advanced",
    duration: "2 hours",
    content: `# Kebijakan Fiskal Dasar

Sementara Kebijakan Moneter dikendalikan oleh Bank Sentral (suku bunga), Kebijakan Fiskal sepenuhnya berada di tangan **Pemerintah** (Kementerian Keuangan/Presiden). 

## 1. Alat Utama Kebijakan Fiskal
- **Pajak (Tax):** Sumber pendapatan utama negara. Menurunkan pajak (seperti pajak penghasilan atau pajak korporasi) akan menyisakan lebih banyak uang bagi masyarakat untuk belanja dan berinvestasi.
- **Pengeluaran Negara (Government Spending):** Proyek infrastruktur, subsidi, dan bantuan sosial. Saat pemerintah membangun jalan tol, ini menciptakan lapangan kerja dan menstimulasi perputaran uang.

## 2. Sikap Kebijakan Fiskal
- **Ekspansif (Expansionary):** Dilakukan saat ekonomi lesu/resesi. Pemerintah menurunkan pajak dan menaikkan belanja (meskipun harus berutang/defisit). Tujuannya untuk menggenjot pertumbuhan.
- **Kontraktif (Contractionary):** Dilakukan saat ekonomi terlalu panas (inflasi tinggi). Pemerintah menaikkan pajak dan memangkas anggaran belanja (surplus).

## 3. Defisit Anggaran dan Utang Negara
Ketika pemerintah mengeluarkan lebih banyak dari yang didapat dari pajak, terjadi **Defisit Anggaran**. Untuk menutup defisit ini, pemerintah menerbitkan Surat Utang Negara (Obligasi). 
Bagi *trader* obligasi, jumlah penerbitan obligasi pemerintah akan sangat memengaruhi *yield* obligasi di pasar.`
  },
  {
    id: "international-trade",
    title: "International Trade",
    description: "The exchange of capital, goods, and services across international borders.",
    icon: "BookOpen",
    level: "Advanced",
    duration: "2 hours",
    content: `# Perdagangan Global & Tarif Ekspor Impor

Di era globalisasi, tidak ada negara yang bisa bertahan sendiri. Perdagangan internasional memastikan efisiensi di mana setiap negara memproduksi apa yang mereka kuasai (*Comparative Advantage*).

## 1. Tarif dan Perang Dagang
- **Tarif:** Pajak yang dikenakan pada barang impor agar barang lokal bisa bersaing.
- Jika Negara A mengenakan tarif pada baja dari Negara B, Negara B biasanya akan membalas dengan mengenakan tarif pada hasil pertanian Negara A. Ketegangan ini disebut **Perang Dagang**, yang sangat mengganggu rantai pasok global dan memicu inflasi (karena harga barang impor naik).

## 2. Neraca Perdagangan (Trade Balance)
- **Surplus:** Ekspor > Impor. Negara mengumpulkan mata uang asing. Biasanya membuat mata uang domestik menguat.
- **Defisit:** Impor > Ekspor. Negara meminjam dari luar atau menghabiskan cadangan devisanya. Berpotensi melemahkan mata uang lokal.

## 3. Nilai Tukar (Exchange Rates)
Perdagangan global sangat bergantung pada kurs. Mata uang yang lemah (misal Yen Jepang melemah terhadap USD) membuat produk ekspor negara tersebut menjadi lebih murah dan kompetitif di luar negeri, sehingga sangat menguntungkan bagi perusahaan manufaktur berorientasi ekspor.`
  },
  {
    id: "yield-curve",
    title: "Yield Curve",
    description: "A line that plots yields of bonds having equal credit quality but differing maturity dates.",
    icon: "LineChart",
    level: "Advanced",
    duration: "1.5 hours",
    content: `# The Yield Curve\n\nThe yield curve is a graphical representation of interest rates on debt for a range of maturities.\n\n### Inverted Yield Curve\nA rare situation where short-term interest rates are higher than long-term rates. It is often considered a reliable predictor of an impending economic recession.`
  },

  // ==========================================
  // EXPERT
  // ==========================================
  {
    id: "quantitative-easing",
    title: "Quantitative Easing",
    description: "Unconventional monetary policy used by central banks.",
    icon: "TrendingUp",
    level: "Expert",
    duration: "2 hours",
    content: `# Quantitative Easing (QE)\n\nQE is a form of unconventional monetary policy in which a central bank purchases longer-term securities from the open market in order to increase the money supply and encourage lending and investment.\n\n### Effects\nWhile QE can pull an economy out of a recession, it significantly expands the central bank's balance sheet and can risk long-term asset bubbles and inflation.`
  },
  {
    id: "ai-economy",
    title: "AI Economy",
    description: "The macroeconomic impact of artificial intelligence and automation.",
    icon: "PieChart",
    level: "Expert",
    duration: "2 hours",
    content: `# The AI Economy\n\nThe integration of artificial intelligence into the global economy is expected to drive massive productivity gains while simultaneously causing significant labor market disruption.\n\n### Structural Unemployment\nAs AI automates cognitive tasks, certain job sectors may experience permanent structural unemployment, necessitating new fiscal policies or retraining initiatives.`
  }
];

const idTranslations: Record<string, { title: string, description: string }> = {
  "intro-economics": { title: "Pengantar Ekonomi", description: "Studi mendasar tentang bagaimana masyarakat mengelola sumber dayanya yang terbatas." },
  "supply-demand": { title: "Permintaan & Penawaran", description: "Model inti ekonomi pasar yang menentukan harga dan kuantitas." },
  "opportunity-cost": { title: "Biaya Peluang (Opportunity Cost)", description: "Memahami biaya sebenarnya dari setiap keputusan ekonomi." },
  "gdp-basics": { title: "Dasar-Dasar PDB", description: "Mengukur total output ekonomi suatu negara." },
  "inflation-basics": { title: "Dasar-Dasar Inflasi", description: "Tingkat kenaikan harga umum untuk barang dan jasa." },
  "consumer-behavior": { title: "Perilaku Konsumen", description: "Bagaimana individu membuat keputusan untuk membelanjakan sumber daya mereka." },
  "producer-basics": { title: "Dasar-Dasar Produsen", description: "Bagaimana perusahaan membuat keputusan tentang produksi dan harga." },
  "monetary-policy": { title: "Kebijakan Moneter & The Fed", description: "Pembahasan mendalam tentang bagaimana bank sentral menggunakan suku bunga." },
  "market-cycles": { title: "Siklus Pasar & Indikator", description: "Mengidentifikasi puncak dan dasar pasar menggunakan indikator ekonomi." },
  "fiscal-policy": { title: "Kebijakan Fiskal", description: "Penggunaan pajak dan pengeluaran pemerintah untuk mempengaruhi ekonomi suatu negara." },
  "international-trade": { title: "Perdagangan Internasional", description: "Pertukaran modal, barang, dan jasa melintasi perbatasan negara." },
  "yield-curve": { title: "Kurva Imbal Hasil", description: "Garis yang memplot imbal hasil obligasi dengan tanggal jatuh tempo yang berbeda." },
  "quantitative-easing": { title: "Pelonggaran Kuantitatif (QE)", description: "Kebijakan moneter tidak konvensional yang digunakan oleh bank sentral." },
  "ai-economy": { title: "Ekonomi AI", description: "Dampak makroekonomi dari kecerdasan buatan dan otomatisasi." }
};

export async function getModules(lang: string = 'en'): Promise<Module[]> {
  if (lang === 'id') {
    return mockModules.map(m => ({
      ...m,
      title: idTranslations[m.id]?.title || m.title,
      description: idTranslations[m.id]?.description || m.description
    }));
  }
  return mockModules;
}

export async function getModuleById(id: string, lang: string = 'en'): Promise<Module | null> {
  const mod = mockModules.find(m => m.id === id);
  if (!mod) return null;
  
  if (lang === 'id') {
    return {
      ...mod,
      title: idTranslations[mod.id]?.title || mod.title,
      description: idTranslations[mod.id]?.description || mod.description
    };
  }
  return mod;
}

export async function matchArticleToModules(article: { title: string, summary: string }, lang: string = 'en') {
  // A simple algorithm to match keywords from the article to our modules
  const textToSearch = (article.title + " " + article.summary).toLowerCase();
  
  const matched = mockModules.filter(mod => {
    const titleMatch = textToSearch.includes(mod.title.toLowerCase());
    // Also check for partial words or specific economic terms
    let keywordMatch = false;
    if (mod.id === 'inflation-basics' && textToSearch.includes('inflation')) keywordMatch = true;
    if (mod.id === 'interest-rates' && (textToSearch.includes('rate') || textToSearch.includes('fed') || textToSearch.includes('suku bunga'))) keywordMatch = true;
    if (mod.id === 'monetary-policy' && (textToSearch.includes('central bank') || textToSearch.includes('fed') || textToSearch.includes('ecb') || textToSearch.includes('bank sentral'))) keywordMatch = true;
    if (mod.id === 'international-trade' && (textToSearch.includes('tariff') || textToSearch.includes('trade') || textToSearch.includes('export') || textToSearch.includes('impor') || textToSearch.includes('perdagangan'))) keywordMatch = true;
    if (mod.id === 'ai-economy' && (textToSearch.includes('ai') || textToSearch.includes('artificial intelligence') || textToSearch.includes('tech') || textToSearch.includes('kecerdasan buatan'))) keywordMatch = true;
    if (mod.id === 'gdp-basics' && (textToSearch.includes('gdp') || textToSearch.includes('growth') || textToSearch.includes('recession') || textToSearch.includes('pdb') || textToSearch.includes('pertumbuhan') || textToSearch.includes('resesi'))) keywordMatch = true;
    
    return titleMatch || keywordMatch;
  });

  // Return up to 2 best matches
  const bestMatches = matched.slice(0, 2);

  if (bestMatches.length === 0) {
    // Fallback if no match
    return {
      keyConcepts: [
        { 
          term: "Macroeconomics", 
          definition: lang === 'id' 
            ? "Studi tentang ekonomi secara keseluruhan, yang relevan dengan berita ini." 
            : "The study of the entire economy, which is relevant to this news." 
        }
      ],
      whyItMatters: lang === 'id' 
        ? "Artikel ini membahas peristiwa terkini yang berdampak pada pasar keuangan makro dan investasi Anda."
        : "This article discusses current events that impact the broader financial markets and your investments."
    };
  }

  return {
    keyConcepts: bestMatches.map(m => ({
      term: m.title,
      definition: m.description,
      moduleId: m.id // so we can link to it later if we want
    })),
    whyItMatters: lang === 'id'
      ? `Berita ini sangat berkaitan erat dengan konsep inti yang diajarkan pada modul **${bestMatches[0].title}** kami. Memahami konsep ini akan membantu Anda menjadi trader yang lebih baik.`
      : `This article heavily relates to the core concepts taught in our **${bestMatches[0].title}** module. Understanding these concepts will help you trade better.`
  };
}
