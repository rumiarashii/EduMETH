//PERTANYAAN DAN PILIHAN
document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      id: 1,
      question: "Saat belajar topik sulit, apa hal pertama yang biasanya kamu lakukan?",
      options: [
        "Cari video/gambar penjelasan",
        "Diskusi sama teman/guru",
        "Mencoba langsung dengan latihan/eksperimen",
        "Menulis ulang/membuat catatan ringkas"
      ],
      type: "single"
    },
    {
      id: 2,
      question: "Menurutmu, apa hal yang paling sering menghambatmu memahami materi?",
      options: [
        "Bahasa atau istilah terlalu rumit",
        "Penjelasan terlalu abstrak/teoritis",
        "Sulit menghubungkan dengan kehidupan nyata",
        "Mudah bosan atau kehilangan fokus",
        "Materi terlalu banyak dalam waktu singkat",
        "Kurang sumber belajar yang sesuai"
      ],
      type: "single"
    },
    {
      id: 3,
      question: "Jika ada tugas besar, bagaimana cara kamu menghadapinya?",
      options: [
      "Membuat rencana langkah demi langkah",
      "Mengerjakan bagian mudah dulu",
      "Mencari bantuan dari teman/guru",
      "Langsung coba semua sekaligus",
      "Lainnya"
      ],
      type: "single"
    },
    {
      id: 4,
      question: "Ketika gagal memahami suatu materi, apa yang biasanya kamu lakukan?",
      options: [
      "Melihat video di internet",
      "Diskusi dengan orang lain",
      "Mengulang-ulang latihan",
      "Membaca ulang dengan teliti"
    ],
    type: "single"
    },
    {
      id: 5,
      question: "Seberapa sering kamu mencoba cara belajar baru?",
      options: ["Jarang", "Kadang-kadang", "Sering", "Selalu"],
      type: "scale", 
    },
    {
      id: 6,
      question: "Dalam skala 1-5, seberapa terbuka kamu untuk mencoba metode belajar baru?",
      options: [1, 2, 3, 4, 5],
      type: "scale"
    },
    {
      id: 7,
      question: "Saat mengingat informasi, apa yang paling membantu?",
      options: [
      "Melihat diagram/gambar",
      "Mendengar penjelasan/lagu",
      "Membuat catatan/menulis ulang",
      "Praktik langsung"
    ],
    type: "single"
    },
    {
      id: 8,
      question: "Apa motivasi terbesar kamu untuk belajar?",
      options: [
      "Pencapaian akademik",
      "Rasa ingin tahu",
      "Dorongan dari lingkungan",
      "Tujuan jangka panjang (karier/impian)",
      "Lainnya"
    ],
    type: "single"
    },
    {
      id: 9,
      question: "Ketika diberi pilihan belajar kelompok atau sendiri, kamu lebih suka?",
      options: ["Sendiri", "Berdua", "Kelompok kecil", "Kelas besar"],
    type: "single"
    },
    {
      id: 10,
      question: "Jika waktu belajar kamu terbatas, apa yang biasanya kamu prioritaskan?",
      options: [
      "Ringkasan inti materi",
      "Latihan soal",
      "Diskusi cepat dengan orang lain",
      "Mencari trik atau shortcut",
      "Lainnya"
    ],
    type: "single"
    }

  ];

  let currentQuestion = 0;
  let answers = new Array(questions.length).fill(null);

  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");


  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const finishBtn = document.getElementById("finishBtn");

  //LOAD PERTANYAAN
  function loadQuestion(index) {
    let q = questions[index];
    questionElement.innerText = q.question;

    optionsContainer.innerHTML = "";

    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.classList.add("option", "scale-option");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question" + index;
      input.value = option;

      if(answers[index] === option) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        answers[index] = option;
        
        if (
        currentQuestion === questions.length - 1 &&
        answers.filter((a) => a !== undefined).length === questions.length
        ) {
        finishBtn.style.display = "block";
        }
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(label);
    });
  

    //BUTTON
    prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
    nextBtn.style.visibility = currentQuestion === questions.length - 1 ? "hidden" : "visible";
    
   if (index === questions.length - 1 && answers.filter((a) => a !== undefined).length === questions.length){
     finishBtn.style.display = "block";
   } else {
    finishBtn.style.display = "none";
   }

    updateProgress(currentQuestion);
  }

    //CLICK MECHANISM
    nextBtn.addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
    });

    prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
    });

    finishBtn.addEventListener("click", () => {
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
        window.location.href = "result.html";
    })

  function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  }

  //LOAD PERTAMA
  loadQuestion(currentQuestion);
  updateProgress(currentQuestion);
});