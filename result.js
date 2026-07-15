document.addEventListener("DOMContentLoaded", () => {
  const answers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
  const resultText = document.getElementById("resultText");

  if (!answers.length) {
    resultText.innerText = "Tidak Ada Jawaban Yang Ditemukan";
    return;
  }

  // --------------------- MAPPING DATA ---------------------
  const styleMap = {
    visual: ["Cari video/gambar penjelasan", "Melihat diagram/gambar", "Melihat video di internet"],
    auditori: ["Diskusi sama teman/guru", "Diskusi dengan orang lain", "Mendengar penjelasan/lagu"],
    menulis: ["Menulis ulang/membuat catatan ringkas", "Membuat catatan/menulis ulang", "Membaca ulang dengan teliti"],
    kinestetik: ["Mencoba langsung dengan latihan/eksperimen", "Praktik langsung", "Mengulang-ulang latihan"]
  };

  const motivationMap = {
    "Pencapaian akademik": "Motivasi utama kamu adalah pencapaian akademik.",
    "Rasa ingin tahu": "Motivasi utama kamu adalah rasa ingin tahu.",
    "Dorongan dari lingkungan": "Motivasi utama kamu berasal dari dukungan/lingkungan.",
    "Tujuan jangka panjang (karier/impian)": "Motivasi utama kamu adalah tujuan jangka panjang."
  };

  const preferenceMap = {
    "Sendiri": "Kamu lebih nyaman belajar secara mandiri.",
    "Berdua": "Kamu lebih suka belajar dengan pasangan kecil.",
    "Kelompok kecil": "Kamu lebih efektif belajar dalam kelompok kecil.",
    "Kelas besar": "Kamu nyaman belajar di kelompok besar atau diskusi kelas."
  };

  const suggestionMap = {
    "Bahasa atau istilah terlalu rumit": "Pelajari banyak istilah atau bahasa yang baru",
    "Penjelasan terlalu abstrak/teoritis": "Cari kesimpulan konsep jika konsep terlalu abstrak",
    "Sulit menghubungkan dengan kehidupan nyata": "Biasakan menerapkan materi ke kehidupan nyata",
    "Mudah bosan atau kehilangan fokus": "Jaga pola hidup sehat dan selingi dengan aktivitas baru",
    "Materi terlalu banyak dalam waktu singkat": "Belajarlah dengan rutin, jangan kebut semalam",
    "Kurang sumber belajar yang sesuai": "Cobalah mencari sumber belajar di internet"
  };


  // --------------------- GAYA BELAJAR ---------------------
  const counts = { visual: 0, auditori: 0, menulis: 0, kinestetik: 0 };

  answers.forEach(ans => {
    for (const key in styleMap) {
      if (styleMap[key].includes(ans)) counts[key]++;
    }
  });

  const maxStyle = Object.entries(counts).sort((a,b) => b[1]-a[1])[0][0];

  const styleDescription = {
    visual: "Anda Visual. mudah memahami dengan gambar, diagram, atau video.",
    auditori: "Anda Auditori. lebih cepat memahami lewat diskusi atau penjelasan lisan.",
    menulis: "Anda Menulis. nyaman memahami lewat catatan atau rangkuman.",
    kinestetik: "Anda Kinestetik. lebih suka praktik langsung atau eksperimen."
  }[maxStyle] + " (Tetap latih gaya lainnya untuk seimbang!)";


  // --------------------- MOTIVASI ---------------------
  const motivasi = motivationMap[answers[7]] || "Motivasi belajar kamu beragam.";


  // --------------------- FLEKSIBILITAS ---------------------
  const flexValues = ["Jarang","Kadang-kadang","Sering","Selalu"];
  const fleksScore = flexValues.indexOf(answers[4]) + 1 + Number(answers[5]);

  const fleksibilitas =
    fleksScore <= 4 ? "Kamu cenderung kaku dalam mencoba metode baru."
    : fleksScore <= 7 ? "Kamu cukup fleksibel mencoba metode baru."
    : "Kamu sangat adaptif dan terbuka pada metode baru.";


  // --------------------- PREFERENSI SOSIAL ---------------------
  const preferensi = preferenceMap[answers[8]] || "Preferensimu beragam.";


  // --------------------- SARAN ---------------------
  const saran = suggestionMap[answers[1]] || "Terus eksplorasi metode belajar yang cocok.";


  // --------------------- CATATAN & REKOMENDASI ---------------------
  const rekomendasiBase = {
    visual: "Gunakan mind map, diagram, dan catatan visual.",
    auditori: "Belajar dengan membaca keras atau diskusi.",
    menulis: "Catatan terstruktur dan rangkuman akan sangat efektif.",
    kinestetik: "Praktik langsung atau eksperimen sangat cocok untukmu."
  }[maxStyle];

  const rekomendasi = `
    ${rekomendasiBase}
    ${fleksibilitas.includes("kaku") ? "Cobalah variasi metode agar lebih fleksibel." : "Bagus! Kamu adaptif dalam belajar."}
    ${preferensi.includes("mandiri") ? "Siapkan ruang belajar yang tenang agar fokus." : ""}
  `;

  const catatanFinal =
    "Tidak ada satu gaya belajar mutlak. Kombinasikan berbagai metode agar hasil belajar lebih optimal.";


  // --------------------- OUTPUT ---------------------
  resultText.innerHTML = `
    <h2>Preferensi Belajar Kamu</h2>
    <p><b>Gaya Belajar:</b> ${styleDescription}</p>
    <p><b>Motivasi:</b> ${motivasi}</p>
    <p><b>Fleksibilitas:</b> ${fleksibilitas}</p>
    <p><b>Preferensi Sosial:</b> ${preferensi}</p>
    <p><b>Saran: </b> ${saran}</p>
    <h3>Rekomendasi:</h3>
    <p>${rekomendasi}</p>
    <h3>Catatan:</h3>
    <p>${catatanFinal}</p>
  `;
});


const ctx1 = document.getElementById('gayaChart').getContext('2d');

new Chart(ctx1, {
  type: 'pie',
  data: {
    labels: ['Visual', 'Auditori', 'Menulis', 'Kinestetik'],
    datasets: [{
      label: 'Gaya Belajar',
      data: [
        counts.visual,
        counts.auditori,
        counts.menulis,
        counts.kinestetik
      ],
      backgroundColor: ['#4e79a7','#f28e2c','#e15759','#76b7b2']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribusi Gaya Belajar'
      }
    }
  }
});


// --------------------- CHART FLEKSIBILITAS ---------------------
const ctx2 = document.getElementById('fleksChart').getContext('2d');

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Fleksibilitas'],
    datasets: [{
      label: 'Skor',
      data: [fleksScore], 
      backgroundColor: ['#59a14f']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Skor Fleksibilitas Belajar (0–10)'
      }
    }
  }
});


