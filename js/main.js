(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Sticky header shadow on scroll
  --------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const onScrollHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------------------------------------------------------
     Scroll reveal (IntersectionObserver)
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     Subtle hero parallax (transform-only, rAF-throttled)
  --------------------------------------------------------- */
  const heroShape = document.querySelector(".hero-shape");
  if (heroShape && !reducedMotion) {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      heroShape.style.transform = `translateY(${y * 0.12}px)`;
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }


  /* ---------------------------------------------------------
     Job listings data + render
  --------------------------------------------------------- */
  const jobs = [
    {
      id: "help-desk",
      title: "Help Desk Manager",
      intro:
        "Jesteś ogarnięty/a, znasz trochę zagadnień technicznych, lubisz pomagać i rozwiązywać problemy? Idealnie — właśnie poszukujemy do naszego zespołu osoby na stanowisko Help Desk Manager 🙂",
      perks: [
        { title: "Wsparcie", text: "Wiemy, że możesz nie mieć dużego pojęcia o rynku IT. Jesteśmy na to przygotowani. Nauczymy Cię wszystkiego!" },
        { title: "Samodzielność", text: "Twoja praca nie będzie uzależniona od innych i nikt nie będzie ingerować w Twoje metody, tak długo jak pozostają one skuteczne!" },
        { title: "Trochę biura, trochę domu", text: "Na początku na pewno na miejscu, w biurze. Potem 3 dni w domu, 2 dni w biurze będzie ok. Musisz być z Białegostoku lub okolic." },
      ],
      reqs: [
        { title: "Komunikatywności", text: "Wsparcie techniczne to kontakt z klientem, który zgłasza problem. Trzeba pomóc wyjaśnić, na czym on polega, ale też jak zadbać, by nie doszło do niego w przyszłości." },
        { title: "Etyki pracy", text: "Wiesz, że do ponadprzeciętnych wyników nie dochodzi się siedzeniem w pracy na Facebooku. Umiesz zorganizować swój czas pracy i priorytety." },
        { title: "Zmysłu technicznego", text: "Zapewnimy Ci odpowiednie wsparcie i szkolenie, jednak znaczącym atutem będzie Twoja wiedza i umiejętność logicznego myślenia." },
      ],
      duties: [
        { title: "Pomoc klientom", text: "Nasi klienci nie zawsze radzą sobie w obsłudze serwerów — potrzebują wtedy pomocy, czyli Ciebie! Odpowiadasz za pomoc i rozwiązanie zgłoszonych problemów." },
        { title: "Wsparcie załogi", text: "Nie tylko klienci mają pytania — również nasi Project i Account Managerowie potrzebują zweryfikować informacje w oparciu o Twoją wiedzę." },
        { title: "A może coś więcej?", text: "Każdy jest inny i może wnieść do firmy indywidualne, unikalne umiejętności. Chętnie wspieramy każdą nową inicjatywę." },
      ],
      footnote:
        "* Doświadczenie będzie oczywiście atutem, jednak nie jest wymogiem koniecznym. Początkowa stawka wynagrodzenia jest w dużej mierze uzależniona od już posiadanej wiedzy i doświadczenia.",
    },
    {
      id: "account-manager",
      title: "Account Manager",
      intro:
        "Rekin sprzedaży — taką ksywkę mogliby Ci dać Twoi znajomi? Idealnie, szukamy właśnie Ciebie. Rozwijamy się coraz szybciej, mamy coraz więcej zainteresowanych klientów i potrzebujemy Twojej pomocy w jeszcze szybszym rozwoju!",
      perks: [
        { title: "Wysokie wynagrodzenie", text: "Średnie wynagrodzenie w naszej firmie na stanowisku Account Managera to 6700 zł. Jeśli się zaangażujesz — ponad 10 000 zł jest możliwe." },
        { title: "Ciepłe leady", text: "Rozmawiamy wyłącznie z osobami, które wyraziły uprzednio zainteresowanie naszymi usługami." },
        { title: "Wsparcie", text: "Wiemy, że możesz nie mieć dużego pojęcia o rynku IT. Jesteśmy na to przygotowani i otrzymasz od nas pełne wsparcie merytoryczne." },
      ],
      reqs: [
        { title: "Doświadczenia", text: "Masz co najmniej półroczne doświadczenie i dobrze czujesz się w sprzedaży. Kontakt z klientem Cię nie stresuje, znasz podstawowe techniki sprzedaży." },
        { title: "Etyki pracy", text: "Wiesz, że do ponadprzeciętnych wyników nie dochodzi się siedzeniem w pracy na Facebooku. Umiesz zorganizować swój czas pracy i priorytety." },
        { title: "Chęci rozwoju", text: "Lubisz być ekspertem w danej dziedzinie i dążysz do poszerzania wiedzy. Wolisz specjalizować się w nielicznych rzeczach, m.in. sprzedaży." },
      ],
      duties: [
        { title: "Pozyskiwanie klientów", text: "Telefonicznie, mailowo, osobiście. Będziesz tą najważniejszą osobą w firmie, która generuje obrót — a jej umiejętności przekładają się na rozwój własny i firmy." },
        { title: "Działania zwiększające sprzedaż", text: "Wszystko, co może wpłynąć na większą konwersję — przygotowywanie ofert, raportowanie, planowanie itp." },
        { title: "A może coś jeszcze?", text: "Każdy jest inny i może wnieść do firmy indywidualne, unikalne umiejętności. Chętnie wspieramy każdą nową inicjatywę." },
      ],
      footnote: "",
    },
    {
      id: "wp-designer",
      title: "WordPress Designer",
      intro:
        "Tworzenie stron internetowych jest dla Ciebie przyjemne jak pierwszy kęs przepysznego ciasta? Idealnie — właśnie poszukujemy do naszego zespołu zdolnego WordPress Designera!",
      perks: [
        { title: "Wysokie wynagrodzenie", text: "Wynagrodzenie w naszej firmie na stanowisku WordPress Designera to 4–7 tys. złotych." },
        { title: "Ambitne zajęcie", text: "To właśnie Twoje dzieła będą wizytówką naszej firmy i jedną z naszych głównych wartości — jakości dostarczanej klientom." },
        { title: "Wsparcie", text: "O WordPressie wiemy bardzo dużo. Dlatego z chęcią podzielimy się wiedzą oraz pomożemy w realizacji projektu." },
      ],
      reqs: [
        { title: "Doświadczenia", text: "Wystarczy krótkie, nawet kilkumiesięczne doświadczenie w tworzeniu stron internetowych. Fajnie, gdybyś mógł/a pochwalić się niewielkim portfolio." },
        { title: "Etyki pracy", text: "Wiesz, że do ponadprzeciętnych wyników nie dochodzi się siedzeniem w pracy na Facebooku. Umiesz zorganizować swój czas pracy i priorytety." },
        { title: "Chęci rozwoju", text: "Nie stoimy w miejscu i cały czas się rozwijamy. Możesz dołączyć i rozwijać się razem z nami — ale musisz mieć ambicję i tego chcieć!" },
      ],
      duties: [
        { title: "Tworzeniem stron internetowych", text: "Nic dodać, nic ująć 🙂" },
        { title: "Przygotowaniem grafik", text: "Raz na jakiś czas trzeba będzie przygotować kilka grafik na stronę klienta. Jeśli nie masz w tym doświadczenia — nauczymy Cię tego." },
        { title: "A może coś więcej?", text: "Każdy ma indywidualne umiejętności. Jesteśmy otwarci na Twoje pomysły i unikatowe zdolności. Pokaż, co potrafisz!" },
      ],
      footnote: "* Jest możliwość pracy zdalnej.",
    },
  ];

  const tabsWrap = document.getElementById("job-tabs");
  const panelWrap = document.getElementById("job-panel");

  function renderTabs(activeId) {
    tabsWrap.innerHTML = jobs
      .map(
        (job) => `
      <button class="job-tab" role="tab" id="tab-${job.id}" aria-selected="${job.id === activeId}" aria-controls="panel-${job.id}" data-id="${job.id}">
        ${job.title}
      </button>`
      )
      .join("");
  }

  function renderPanel(job) {
    panelWrap.innerHTML = `
      <div id="panel-${job.id}" role="tabpanel" aria-labelledby="tab-${job.id}">
        <div class="job-intro">
          <div>
            <h3>${job.title}</h3>
            <p>${job.intro}</p>
          </div>
          <a href="#formularz" class="btn btn-primary job-apply-link" data-position="${job.title}">
            Tak, to stanowisko dla mnie!
            <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <div class="job-block">
          <div class="job-block-head">
            <p class="kicker">3 największe zalety</p>
            <h4>Dlaczego powinieneś/aś aplikować?</h4>
          </div>
          <div class="job-cards">
            ${job.perks.map((p, i) => cardHTML(p, i)).join("")}
          </div>
        </div>

        <div class="job-block">
          <div class="job-block-head">
            <p class="kicker">3 najważniejsze wymogi</p>
            <h4>Czego od Ciebie wymagamy?</h4>
          </div>
          <div class="job-cards">
            ${job.reqs.map((p, i) => cardHTML(p, i)).join("")}
          </div>
        </div>

        <div class="job-block">
          <div class="job-block-head">
            <p class="kicker">3 najważniejsze obowiązki</p>
            <h4>Czym będziesz się zajmować?</h4>
          </div>
          <div class="job-cards">
            ${job.duties.map((p, i) => cardHTML(p, i)).join("")}
          </div>
        </div>

        ${job.footnote ? `<p class="job-footnote">${job.footnote}</p>` : ""}
      </div>
    `;

    const positionSelect = document.getElementById("f-position");
    panelWrap.querySelectorAll(".job-apply-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (positionSelect) positionSelect.value = link.dataset.position;
      });
    });
  }

  function cardHTML(item, i) {
    return `
      <div class="job-card">
        <span class="num">${i + 1}</span>
        <h5>${item.title}</h5>
        <p>${item.text}</p>
      </div>`;
  }

  function activateJob(id) {
    const job = jobs.find((j) => j.id === id) || jobs[0];
    renderTabs(job.id);
    renderPanel(job);
    tabsWrap.querySelectorAll(".job-tab").forEach((btn) => {
      btn.addEventListener("click", () => activateJob(btn.dataset.id));
    });
  }
  activateJob(jobs[0].id);

  /* ---------------------------------------------------------
     FAQ data + render (accordion)
  --------------------------------------------------------- */
  const faqs = [
    {
      q: "Na jak długo kogoś szukacie?",
      a: "Na długo. Zdecydowanie szukamy kogoś na stałe, kto wniesie długotrwałą wartość do firmy.",
    },
    {
      q: "Kiedy mogę spodziewać się kontaktu po przesłaniu aplikacji?",
      a: "Do 3 tygodni. Nasz proces rekrutacji z reguły wygląda tak, że zbieramy daną ilość CV i dopiero wtedy umawiamy się z wybranymi osobami na konkretny dzień.",
    },
    {
      q: "Czy muszę mieć 10 lat doświadczenia i skończone 2 kierunki studiów?",
      a: "Nie — chyba że masz zapał do wymagającej, lecz satysfakcjonującej pracy i chcesz się uczyć nowych rzeczy, to wtedy nie wymagamy skończonych 2 kierunków studiów i 10 lat doświadczenia. Właściwie doświadczenia nie wymagamy wcale w przypadku większości stanowisk 🙂",
    },
    {
      q: "Jakie są dni i godziny pracy?",
      a: "Pracujemy od poniedziałku do piątku w godzinach 9:00–17:00. W zależności od stanowiska w grę wchodzi też jedna sobota w miesiącu. Praca jest jednozmianowa.",
    },
    {
      q: "Czy to jest praca na cały etat?",
      a: "Tak, szukamy osób tylko na cały etat.",
    },
    {
      q: "Chcesz więcej informacji o nas?",
      a: 'Wpadnij na naszego Instagrama, może znajdziesz coś ciekawego 🙂 <a href="https://www.instagram.com/kursywordpress/" target="_blank" rel="noopener">Kliknij tutaj</a>.',
    },
  ];

  const faqList = document.getElementById("faq-list");
  faqList.innerHTML = faqs
    .map(
      (f, i) => `
    <div class="faq-item" data-open="false">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
        <span>${f.q}</span>
        <span class="plus" aria-hidden="true"></span>
      </button>
      <div class="faq-a-wrap">
        <div class="faq-a-inner">
          <p class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">${f.a}</p>
        </div>
      </div>
    </div>`
    )
    .join("");

  faqList.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.getAttribute("data-open") === "true";
      item.setAttribute("data-open", String(!isOpen));
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ---------------------------------------------------------
     Application form (front-end only — needs backend wiring)
  --------------------------------------------------------- */
  const form = document.getElementById("apply-form");
  const note = document.getElementById("form-note");
  const fileInput = document.getElementById("f-cv");
  const fileDrop = fileInput.closest(".file-drop");

  fileInput.addEventListener("change", () => {
    const fileDropText = fileDrop.querySelector(".file-drop-text");
    if (fileInput.files.length) {
      fileDrop.classList.add("has-file");
      fileDropText.innerHTML = `${fileInput.files[0].name}<br><small>Kliknij, aby zmienić plik</small>`;
    } else {
      fileDrop.classList.remove("has-file");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    note.textContent = "Dziękujemy! Twoja aplikacja została przygotowana do wysyłki — podłącz formularz do swojego systemu ATS/e-mail, aby zakończyć wdrożenie.";
    note.className = "form-note success";
    form.reset();
    fileDrop.classList.remove("has-file");
  });

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
