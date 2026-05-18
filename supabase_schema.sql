-- Users & Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  main_interest TEXT CHECK (main_interest IN ('Tech', 'Economy')),
  xp_points INT DEFAULT 0,
  current_level TEXT DEFAULT 'Curious Learner',
  streak_days INT DEFAULT 0,
  last_login TIMESTAMP WITH TIME ZONE
);

-- User Sub-Interests (Many-to-Many)
CREATE TABLE IF NOT EXISTS user_interests (
  user_id UUID REFERENCES profiles(id),
  interest_name TEXT,
  PRIMARY KEY (user_id, interest_name)
);

-- News Articles (Cached/Fetched periodically)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  summary TEXT,
  original_url TEXT,
  source TEXT,
  category TEXT, -- Tech or Economy
  difficulty_level TEXT, -- Beginner, Intermediate, Advanced
  estimated_read_time INT,
  thumbnail_url TEXT,
  content TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learn Before Read (Context/Lessons for Articles)
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id),
  title TEXT,
  content JSONB, -- Array of infographics/text
  glossary_terms JSONB
);

-- User Progress & Gamification
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID REFERENCES profiles(id),
  article_id UUID REFERENCES articles(id),
  is_read BOOLEAN DEFAULT FALSE,
  quiz_passed BOOLEAN DEFAULT FALSE,
  saved BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, article_id)
);

-- Learn Modules
CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  level TEXT, -- Beginner, Intermediate, Advanced
  duration TEXT,
  content TEXT, -- Markdown content for the module
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- RLS POLICIES (Row Level Security)
-- ==========================================
-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Allow public read access (Anon users can view news and modules)
DROP POLICY IF EXISTS "Allow public read on articles" ON articles;
CREATE POLICY "Allow public read on articles" ON articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on modules" ON modules;
CREATE POLICY "Allow public read on modules" ON modules FOR SELECT USING (true);

-- Allow public insert access (For MVP auto-seeding purposes)
DROP POLICY IF EXISTS "Allow public insert on articles" ON articles;
CREATE POLICY "Allow public insert on articles" ON articles FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public insert on modules" ON modules;
CREATE POLICY "Allow public insert on modules" ON modules FOR INSERT WITH CHECK (true);

-- ==========================================
-- INJEKSI MATERI (AI GENERATED CONTENT)
-- ==========================================
UPDATE modules SET content = '
# Macroeconomics 101: Memahami Gambaran Besar Ekonomi

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
Memahami makroekonomi sangat krusial bagi investor dan trader karena data makro (seperti rilis inflasi atau keputusan suku bunga) dapat menggerakkan pasar keuangan secara signifikan dalam hitungan detik.
' WHERE id = 'macro-101';

UPDATE modules SET content = '
# Microeconomics 101: Fundamental Pasar dan Individu

Mikroekonomi mempelajari keputusan individu dan perusahaan dalam mengalokasikan sumber daya yang terbatas. Ini adalah fondasi dari semua mekanisme pasar.

## 1. Hukum Permintaan dan Penawaran
- **Permintaan (Demand):** Seberapa banyak barang yang ingin dan mampu dibeli konsumen pada berbagai tingkat harga. Semakin tinggi harga, semakin rendah permintaan.
- **Penawaran (Supply):** Seberapa banyak barang yang produsen bersedia jual. Semakin tinggi harga, semakin banyak barang yang ditawarkan.
- **Titik Ekuilibrium:** Titik di mana kurva penawaran dan permintaan bertemu. Inilah harga pasar yang sebenarnya terbentuk.

## 2. Elastisitas Harga
Elastisitas mengukur seberapa sensitif permintaan atau penawaran terhadap perubahan harga.
- **Inelastis:** Kebutuhan pokok (seperti beras atau obat). Harga naik tidak membuat permintaan turun drastis.
- **Elastis:** Barang mewah (seperti mobil sport). Sedikit saja harga naik, orang langsung menunda pembelian.

## 3. Struktur Pasar
- **Persaingan Sempurna:** Banyak penjual dan pembeli, barang identik (misal: pasar saham murni).
- **Monopoli:** Hanya ada satu penjual yang menguasai pasar, sehingga ia bebas menentukan harga.
- **Oligopoli:** Didominasi oleh segelintir perusahaan besar (misal: industri telekomunikasi).

## Mengapa Trader Harus Tahu?
Bagi analis saham (khususnya saham individu), memahami mikroekonomi sangat penting. Struktur pasar tempat sebuah emiten (perusahaan) beroperasi akan sangat menentukan margin keuntungan dan prospek bisnisnya di masa depan.
' WHERE id = 'micro-101';

UPDATE modules SET content = '
# Kebijakan Moneter & The Fed

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
- **Dovish:** The Fed bersikap akomodatif (menurunkan suku bunga). Berdampak **positif** untuk Saham & Kripto, **negatif** untuk USD.
' WHERE id = 'monetary-policy';

UPDATE modules SET content = '
# Market Cycles & Indikator Ekonomi

Pasar keuangan tidak bergerak dalam satu garis lurus. Ekonomi bergerak dalam siklus: Ekspansi (pertumbuhan), Puncak (Top), Kontraksi (Resesi), dan Palung (Bottom). Mengetahui di mana posisi kita dalam siklus sangat penting untuk investasi.

## Tiga Jenis Indikator Ekonomi
1. **Leading Indicators (Indikator Mendahului):** Memberikan sinyal sebelum ekonomi berbelok. Contoh: Pasar Saham, Izin Mendirikan Bangunan (Building Permits), Yield Curve (Kurva Imbal Hasil).
2. **Coincident Indicators (Indikator Kebetulan):** Bergerak bersamaan dengan kondisi ekonomi saat ini. Contoh: PDB, Penjualan Ritel, Tingkat Konsumsi.
3. **Lagging Indicators (Indikator Tertinggal):** Berubah setelah ekonomi mulai berubah. Sering digunakan untuk mengonfirmasi tren. Contoh: Tingkat Pengangguran, Tingkat Inflasi Inti.

## Rotasi Sektor dalam Siklus Pasar
- **Masa Resesi (Awal Pemulihan):** Sektor Finansial dan Teknologi cenderung mulai *rally* karena antisipasi penurunan suku bunga.
- **Masa Ekspansi (Puncak Pertumbuhan):** Sektor Material Dasar dan Industri unggul.
- **Masa Kontraksi (Awal Penurunan):** Sektor Defensif (seperti Kesehatan, Barang Konsumsi Pokok, dan Utilitas) menjadi tempat berlindung investor.

Sebagai trader, memantau *Yield Curve Inversion* (ketika obligasi tenor pendek memberi bunga lebih tinggi dari tenor panjang) adalah salah satu prediktor resesi paling akurat sepanjang sejarah.
' WHERE id = 'market-cycles';

UPDATE modules SET content = '
# Pengenalan Lanjutan Makroekonomi: Inflasi vs Deflasi

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
- **Saat Deflasi:** Uang tunai (Cash) menjadi raja. Obligasi pemerintah tenor panjang juga menjadi pilihan utama.
' WHERE id = 'macro-102';

UPDATE modules SET content = '
# Kebijakan Fiskal Dasar

Sementara Kebijakan Moneter dikendalikan oleh Bank Sentral (suku bunga), Kebijakan Fiskal sepenuhnya berada di tangan **Pemerintah** (Kementerian Keuangan/Presiden). 

## 1. Alat Utama Kebijakan Fiskal
- **Pajak (Tax):** Sumber pendapatan utama negara. Menurunkan pajak (seperti pajak penghasilan atau pajak korporasi) akan menyisakan lebih banyak uang bagi masyarakat untuk belanja dan berinvestasi.
- **Pengeluaran Negara (Government Spending):** Proyek infrastruktur, subsidi, dan bantuan sosial. Saat pemerintah membangun jalan tol, ini menciptakan lapangan kerja dan menstimulasi perputaran uang.

## 2. Sikap Kebijakan Fiskal
- **Ekspansif (Expansionary):** Dilakukan saat ekonomi lesu/resesi. Pemerintah menurunkan pajak dan menaikkan belanja (meskipun harus berutang/defisit). Tujuannya untuk menggenjot pertumbuhan.
- **Kontraktif (Contractionary):** Dilakukan saat ekonomi terlalu panas (inflasi tinggi). Pemerintah menaikkan pajak dan memangkas anggaran belanja (surplus).

## 3. Defisit Anggaran dan Utang Negara
Ketika pemerintah mengeluarkan lebih banyak dari yang didapat dari pajak, terjadi **Defisit Anggaran**. Untuk menutup defisit ini, pemerintah menerbitkan Surat Utang Negara (Obligasi). 
Bagi *trader* obligasi, jumlah penerbitan obligasi pemerintah akan sangat memengaruhi *yield* obligasi di pasar.
' WHERE id = 'macro-103';

UPDATE modules SET content = '
# Dinamika Permintaan dan Penawaran (Supply & Demand)

Dalam *trading*, segala sesuatunya—baik itu harga saham Apple, nilai tukar EUR/USD, hingga harga Bitcoin—ditentukan oleh satu hukum mutlak: Permintaan dan Penawaran.

## 1. Konsep Dasar 
- Jika **Permintaan > Penawaran**, harga akan NAIK. (Banyak pembeli, sedikit penjual).
- Jika **Penawaran > Permintaan**, harga akan TURUN. (Banyak penjual, sedikit pembeli).

## 2. Mengidentifikasi Area S&D di Grafik (Chart)
Trader sering menggunakan konsep S&D dalam analisis teknikal:
- **Area Demand (Support):** Area harga di mana pembeli historis masuk dengan kuat, mencegah harga turun lebih jauh. Di sini, minat beli mengalahkan minat jual.
- **Area Supply (Resistance):** Area harga di mana penjual agresif masuk untuk mengambil keuntungan, menyebabkan harga berbalik arah ke bawah.

## 3. Order Block dan Likuiditas
Pergerakan drastis di pasar biasanya diciptakan oleh institusi besar (Bank, Hedge Fund) yang menempatkan pesanan raksasa (Order Block). Ketika harga kembali ke level di mana institusi tersebut memulai pergerakan besarnya, biasanya akan terjadi reaksi harga yang kuat karena sisa-sisa order masih tertinggal di sana.
' WHERE id = 'micro-102';

UPDATE modules SET content = '
# Memahami Pertumbuhan GDP (PDB)

Gross Domestic Product (GDP) atau Produk Domestik Bruto (PDB) adalah "rapor" bagi suatu negara. Ini adalah angka tunggal yang paling sering dilihat untuk menilai apakah negara tersebut semakin kaya atau malah terpuruk.

## 1. Komponen PDB
PDB dihitung dari empat komponen utama (Rumus: C + I + G + NX):
1. **Consumption (C):** Konsumsi rumah tangga (belanja makanan, mobil, listrik). Ini biasanya porsi terbesar (di AS mencapai 70%).
2. **Investment (I):** Investasi bisnis (pembelian mesin baru, pembangunan pabrik).
3. **Government Spending (G):** Pengeluaran pemerintah (gaji PNS, infrastruktur).
4. **Net Exports (NX):** Ekspor dikurangi Impor. Jika negara lebih banyak mengekspor, NX akan positif.

## 2. Mengapa Trader Peduli pada GDP?
- GDP yang **lebih tinggi dari ekspektasi** menunjukkan ekonomi yang kuat, biasanya positif untuk pasar saham lokal dan menguatkan mata uang negara tersebut.
- GDP yang **kontraksi (negatif)** selama dua kuartal memicu peringatan resesi, membuat investor memindahkan aset ke obligasi atau emas (Safe Haven).
' WHERE id = 'macro-104';

UPDATE modules SET content = '
# Psikologi dan Behavioral Economics

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
Disiplin dan jurnal trading (seperti yang ada di platform ini) adalah kunci. Memiliki *Trading Plan* (Entry, Stop Loss, Take Profit) sebelum membuka posisi dapat mengeliminasi keputusan emosional.
' WHERE id = 'trading-101';

UPDATE modules SET content = '
# Perdagangan Global & Tarif Ekspor Impor

Di era globalisasi, tidak ada negara yang bisa bertahan sendiri. Perdagangan internasional memastikan efisiensi di mana setiap negara memproduksi apa yang mereka kuasai (*Comparative Advantage*).

## 1. Tarif dan Perang Dagang
- **Tarif:** Pajak yang dikenakan pada barang impor agar barang lokal bisa bersaing.
- Jika Negara A mengenakan tarif pada baja dari Negara B, Negara B biasanya akan membalas dengan mengenakan tarif pada hasil pertanian Negara A. Ketegangan ini disebut **Perang Dagang**, yang sangat mengganggu rantai pasok global dan memicu inflasi (karena harga barang impor naik).

## 2. Neraca Perdagangan (Trade Balance)
- **Surplus:** Ekspor > Impor. Negara mengumpulkan mata uang asing. Biasanya membuat mata uang domestik menguat.
- **Defisit:** Impor > Ekspor. Negara meminjam dari luar atau menghabiskan cadangan devisanya. Berpotensi melemahkan mata uang lokal.

## 3. Nilai Tukar (Exchange Rates)
Perdagangan global sangat bergantung pada kurs. Mata uang yang lemah (misal Yen Jepang melemah terhadap USD) membuat produk ekspor negara tersebut menjadi lebih murah dan kompetitif di luar negeri, sehingga sangat menguntungkan bagi perusahaan manufaktur berorientasi ekspor.
' WHERE id = 'macro-105';
