import type { ResumeData } from "./resume.types";

export const resumeData: ResumeData = {
  name: "Nicolas Nisoria",
  subtitle: "Starszy Inżynier Oprogramowania",
  headerLinks: [
    {
      label: "nicolas.nisoria@gmail.com",
      href: "mailto:nicolas.nisoria@gmail.com",
      icon: "email",
    },
    {
      label: "niconisoria",
      href: "https://linkedin.com/in/niconisoria",
      icon: "linkedin",
    },
    {
      label: "niconisoria",
      href: "https://github.com/niconisoria",
      icon: "github",
    },
    {
      label: "Umów rozmowę",
      href: "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3yZ09qpZX0Mhcm_V3JOd-nncW3GzShwl07WaBsNvbtH7wdNH69kF1ioKSySfZX894lpdFLG5Xa?gv=true",
      icon: "booking",
    },
  ],
  summary:
    "Starszy Inżynier Oprogramowania z **7+ letnim** doświadczeniem w kompleksowym prowadzeniu systemów na dużą skalę, od architektury po wdrożenie, w branżach fintech, edtech i hrtech, w modelu full-stack i międzyzespołowej współpracy. Praktyczne doświadczenie w programowaniu wspieranym agentami AI - buduje własne skille i subagenty przyspieszające dostarczanie, redukujące ręczną pracę programistyczną i podnoszące jakość kodu, jednocześnie przekładając potrzeby biznesowe na wydajne, trwałe rozwiązania techniczne i uzgadniając strategiczne decyzje techniczne między zespołami.",
  jobs: [
    {
      title: "Starszy Inżynier Oprogramowania",
      company: "Vention",
      companyHref: "https://ventionteams.com",
      location: "Hybrydowo - Warszawa",
      startDate: "10/2022",
      endDate: "Obecnie",
      achievements: [
        "Zaprojektował i dostarczył funkcje klasy w czasie rzeczywistym z użyciem WebSocketów **AnyCable**, obsługujące **tysiące jednoczesnych użytkowników**",
        "Zintegrował **AWS CloudFront** w celu odświeżania cache na żądanie, utrzymując aktualność treści bez ręcznych redeployów",
        "Prowadził modernizację kodu Ruby on Rails działającego **7+ lat w produkcji**, poprawiając stabilność systemu i wydajność zespołu",
        "Uczynił agentów AI stałym elementem procesu developerskiego w pracach nad funkcjami, code review i testowaniu, stosując [Spec-Driven Development](https://github.com/github/spec-kit) i projektując własne skille i subagenty do powtarzalnych zadań",
        "Zbudował pipeline'y ETL łączące platformę, CMS i LRS, zapewniając ciągły przepływ danych między systemami rozproszonymi",
        "Wykorzystywał narzędzia profilujące i diagnostyczne, w tym **Sentry**, do wykrywania wąskich gardeł wydajności, skracając czas odpowiedzi endpointów o **do 75%** (z ~2s do 500-600ms)",
        "Tworzył dokumentację techniczną i specyfikacje funkcji dla nowych komponentów systemu",
      ],
      stack: [
        "Ruby 2.7",
        "Rails 5.2",
        "PostgreSQL",
        "Redis",
        "Sidekiq",
        "AnyCable",
        "AWS",
        "CloudFront",
        "JavaScript",
        "React.js",
        "RSpec",
        "Sentry",
        "CI/CD",
      ],
    },
    {
      title: "Inżynier Oprogramowania",
      company: "The Codest",
      companyHref: "https://thecodest.co",
      location: "Zdalnie - Warszawa",
      startDate: "07/2021",
      endDate: "10/2022",
      projects: [
        {
          name: "Epassi",
          href: "https://www.epassi.com",
          achievements: [
            "Pracował w kodzie legacy liczącym **ponad 15 lat**, rozbudowując system uprawnień oparty na rolach o elastyczny interfejs i refaktoryzując w kierunku pełnego pokrycia testami",
            "Prowadził code review i współpracował międzyzespołowo przy dostarczaniu funkcji obejmujących platformy web i mobile",
          ],
        },
        {
          name: "System zarządzania żłobkiem",
          href: "https://www.youtube.com/watch?v=sjbl6tOyrIo",
          achievements: [
            "Prowadził ten system **od początku do końca** (projekt, implementacja, wdrożenie), utrzymując go w większości samodzielnie",
            "Wdrożył dynamiczne szablony edukacyjne oparte na fińskich standardach edukacyjnych, z własnymi komponentami i endpointami API",
            "Zbudował system czatu w czasie rzeczywistym umożliwiający płynną komunikację nauczyciel-rodzic",
            "Zaktualizował kod z **Rails 5 do 6**, przeprojektowując i refaktoryzując pod kątem utrzymywalności i czytelności całej aplikacji full-stack",
            "Ustanowił kompleksowe pokrycie testami akceptacyjnymi, integracyjnymi i jednostkowymi",
            "Współpracował w zespole agile, zapewniając wsparcie techniczne przy architekturze rozwiązań",
          ],
        },
      ],
      stack: [
        "Ruby 2.3/2.7",
        "Rails 2/5/6",
        "MySQL",
        "PostgreSQL",
        "Redis",
        "Sidekiq",
        "Devise",
        "JavaScript",
        "React.js",
        "Grape",
        "AWS",
        "RSpec",
        "Capybara",
      ],
    },
    {
      title: "Inżynier Oprogramowania",
      company: "GlobalLogic",
      companyHref: "https://www.globallogic.com",
      location: "Zdalnie - Buenos Aires",
      startDate: "10/2020",
      endDate: "07/2021",
      achievements: [
        "Zbudował konfigurowalne funkcje CMS dla wielodostępnych aplikacji web i mobile na platformie bankowości cyfrowej",
        "Zintegrował systemy bankowości rdzeniowej (First Data, FiServ) na potrzeby bezpiecznych operacji detalicznych",
        "Wzmocnił pokrycie testami integracji bankowości rdzeniowej, redukując ryzyko regresji",
        "Mentorował współpracowników w zakresie dobrych praktyk Ruby/Rails i wspierał onboarding nowych inżynierów",
        "Prowadził rozmowy rekrutacyjne na otwarte stanowiska inżynierskie w ramach procesu zatrudnienia",
        "Prowadził transfer wiedzy i dokumentował procesy zespołowe podczas [przejęcia Malauzai przez Finastrę](https://www.finastra.com/press-media/finastra-acquires-malauzai), zapewniając ciągłość pracy zespołów",
      ],
      stack: ["Ruby", "Rails", "MySQL", "Redis", "Sidekiq", "Devise", "RSpec"],
    },
    {
      title: "Młodszy Inżynier Oprogramowania",
      company: "Raxar",
      companyHref: "https://raxar.dev",
      location: "Zdalnie - Buenos Aires",
      startDate: "09/2019",
      endDate: "10/2020",
      achievements: [
        "Zaprojektował i zbudował **cały backend** dla [Trackin](https://trackin.com.ar) od podstaw",
        "Testował i naprawiał błędy w [Increase](https://increase.app), osobnej platformie klienckiej, poprawiając niezawodność",
        "Projektował rozwiązania techniczne dla nowych funkcji w projektach klienckich, ważąc kompromisy między szybkością dostarczenia a długoterminową utrzymywalnością",
      ],
      stack: [
        "Ruby",
        "Rails",
        "RSpec",
        "PHP",
        "Laravel",
        "Python",
        "Flask",
        "JavaScript",
        "React.js",
        "Vue.js",
        "PostgreSQL",
        "MySQL",
      ],
    },
  ],
  personalProjects: [
    {
      title: "Clank",
      href: "https://github.com/niconisoria/clank",
      achievements: [
        "Zbudował pipeline programowania sterowanego specyfikacją dla Claude Code: define, implement, review i validate połączone w łańcuch, każdy etap zablokowany twardym artefaktem (spisaną specyfikacją, przechodzącymi testami, czystym audytem) przed przejściem dalej",
        "Zaprojektował **pipeline oceny przez model**: dla każdego zadania generuje rozwiązanie zgodnie z definicją danego skilla, a następnie ocenia je względem kryteriów per-zadanie osobnym, niezależnym wywołaniem Claude pełniącym rolę sędziego",
        "Ustawił liczbowy próg zaliczenia i podłączył uruchomienia ewaluacji per-skill oraz pełnego zestawu, raportując podsumowanie zaliczono/niezaliczono wraz z szacowanym kosztem tokenów per uruchomienie",
      ],
      stack: ["Claude Code Skills", "Python", "Anthropic API"],
    },
    {
      title: "SCIM Bridge",
      href: "https://github.com/niconisoria/scim-bridge",
      achievements: [
        "Zbudował usługę Python/FastAPI tłumaczącą żądania Okta SCIM 2.0 na wywołania Brivo Access API, zarządzając pełnym cyklem życia użytkowników/grup przy **limitach zapytań i częściowych awariach**",
        "Zaprojektował orkiestrator oparty na wzorcu saga z **automatycznym wycofywaniem zmian** dla wieloetapowych operacji Brivo, zapewniając spójność w razie awarii",
        "Wdrożył mapowanie ID oparte na Redis i blokady idempotencji, zapobiegając duplikowaniu provisioningu przy równoległych ponowieniach",
        "Dodał limitowanie zapytań, logikę ponowień i ustrukturyzowane logowanie z identyfikatorami korelacji dla niezawodności i śledzenia",
        "Zbudował mock API Brivo i pełny zestaw testów (pytest, fakeredis, respx) do lokalnego developmentu i CI bez zależności na żywo",
      ],
      stack: ["Python 3.14", "FastAPI", "Redis", "Docker", "Pytest"],
    },
  ],
  sidebar: {
    certificates: {
      items: [
        {
          label: "Claude with the Anthropic API",
          href: "https://verify.skilljar.com/c/iv6y5rczvfc2",
        },
        {
          label: "Model Context Protocol",
          href: "https://verify.skilljar.com/c/u58s5s5ocyn7",
        },
        {
          label: "Claude Certified Architect - Foundations",
          href: "https://www.credly.com/badges/9340640e-48e1-4164-8389-0b882ba267f5/public_url",
        },
      ],
    },
    education: [
      {
        degree: "Magister inżynierii systemów",
        institution: "Universidad Tecnológica Nacional",
        institutionHref: "https://frt.utn.edu.ar",
        startDate: "2015",
        endDate: "2020",
      },
    ],
    languages: {
      caption: "Doświadczenie komercyjne / lata",
      items: [
        { label: "Ruby", years: 6 },
        { label: "Javascript", years: 6 },
        { label: "Python", years: 3 },
        { label: "PHP", years: 2 },
        { label: "Typescript", years: 1 },
      ],
      secondary: {
        caption: "Projekt poboczny / szybkie wdrożenie",
        items: ["Go", "Rust"],
      },
    },
    frameworks: {
      caption: "Doświadczenie komercyjne / lata",
      items: [
        { label: "Ruby on Rails", years: 6 },
        { label: "React.js - Vue.js", years: 3 },
        { label: "Django - FastAPI", years: 1 },
        { label: "Laravel", years: 1 },
      ],
      secondary: {
        caption: "Projekt poboczny / szybkie wdrożenie",
        items: ["Flask", "Astro.js", "Hotwire"],
      },
    },
    selectedWork: [
      {
        company: "Vention",
        project: "Aktywności na zajęciach",
        href: "https://learn.eltngl.com",
      },
      {
        company: "The Codest",
        project: "Zarządzanie benefitami",
        href: "https://www.epassi.com",
      },
      {
        company: "GlobalLogic",
        project: "Bankowość cyfrowa",
        href: "https://www.finastra.com",
      },
      {
        company: "Raxar",
        project: "Zarządzanie odpadami",
        href: "https://trackin.com.ar",
      },
    ],
  },
};
