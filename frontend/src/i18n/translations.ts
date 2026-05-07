// Translations for the public site (sq = Albanian default, en = English, me = Montenegrin)
// Backend-sourced data (news, staff, documents, settings) is not translated here.

export type Lang = 'sq' | 'en' | 'me';

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'sq', label: 'Shqip',       short: 'SQ' },
  { code: 'en', label: 'English',     short: 'EN' },
  { code: 'me', label: 'Crnogorski',  short: 'ME' },
];

export const DATE_LOCALE: Record<Lang, string> = {
  sq: 'sq-AL',
  en: 'en-GB',
  me: 'cnr-ME',
};

export interface TimelineEntry { year: string; title: string; text: string }
export interface DirectorEntry { name: string; period: string; note?: string }
export interface QuoteEntry    { text: string; author: string }

export interface Dict {
  // common / generic
  common: {
    readMore: string;
    seeAll: string;
    back: string;
    next: string;
    previous: string;
    page: string;
    of: string;
    person_one: string;
    person_other: string;
    document_one: string;
    document_other: string;
    loading: string;
    errorGeneric: string;
    download: string;
    view: string;
    share: string;
    linkCopied: string;
    linkCopyFailed: string;
    schoolFullName: string;
    schoolShortName: string;
    schoolTagline: string;
  };

  // Nav (top + mobile + dropdowns)
  nav: {
    home: string;
    about: string;
    aboutHistoryTitle: string;
    aboutHistorySub: string;
    aboutMissionTitle: string;
    aboutMissionSub: string;
    aboutOverview: string;
    staff: string;
    students: string;
    studentsScheduleTitle: string;
    studentsScheduleSub: string;
    studentsRulesTitle: string;
    studentsRulesSub: string;
    studentsLibraryTitle: string;
    studentsLibrarySub: string;
    documents: string;
    news: string;
    contact: string;
    enroll: string;
    language: string;
  };

  // Home page
  home: {
    schoolYear: string;
    heroTitleA: string;
    heroTitleB: string;
    heroSubtitle: string;
    btnAboutUs: string;
    btnLatestNews: string;
    statFounded: string;
    statSchools: string;
    statYears: string;
    photoYard: string;
    photoClass: string;
    sinceBadge: string;
    quotesEyebrow: string;
    introEyebrow: string;
    introBadge: string;
    introTitle: string;
    introP1: string;
    introP2: string;
    introP3: string;
    directorRole: string;
    newsEyebrow: string;
    newsTitle: string;
    newsEmpty: string;
    valuesCare: { t: string; d: string };
    valuesKnowledge: { t: string; d: string };
    valuesCommunity: { t: string; d: string };
    valuesCreativity: { t: string; d: string };
  };

  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabHistory: string;
    tabMission: string;
  };

  history: {
    extractEyebrow: string;
    extractTitleA: string;
    extractTitleYear: string;
    extractTitleB: string;
    extractParagraph: string;
    branchesLabel: string;
    fact1869L: string;
    fact1869S: string;
    fact1945L: string;
    fact1945S: string;
    fact1961L: string;
    fact1961S: string;
    timelineEyebrow: string;
    timelineTitle: string;
    timelineSubtitle: string;
    directorsEyebrow: string;
    directorsTitle: string;
    directorsSubtitle: string;
    addendumEyebrow: string;
    addendumTitle: string;
    monographyNote: string;
    quoteText: string;
    quoteAuthor: string;
    timeline: TimelineEntry[];
    directors: DirectorEntry[];
    branches: string[];
    addendumParagraphs: string[];
    quotes: QuoteEntry[];
  };

  mission: {
    missionEyebrow: string;
    missionTitle: string;
    missionP1: string;
    missionP2: string;
    visionEyebrow: string;
    visionTitle: string;
    visionP1: string;
    visionP2: string;
    valuesEyebrow: string;
    valuesTitle: string;
    values: { t: string; d: string }[];
  };

  staff: {
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
    allFilter: string;
    categories: Record<string, string>;
  };

  students: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabSchedule: string;
    tabRules: string;
  };

  schedule: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    cardUpdated: string;
    btnDownload: string;
  };

  rules: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sections: { t: string; items: string[] }[];
    fullPdfTitle: string;
    fullPdfMeta: string;
    btnDownload: string;
    btnUnavailable: string;
  };

  documents: {
    eyebrow: string;
    title: string;
    subtitle: string;
    libraryTitle: string;
    searchPlaceholder: string;
    allFilter: string;
    colName: string;
    colCategory: string;
    colSize: string;
    colDate: string;
    colActions: string;
    emptyForSearch: string;
    emptyForCategory: string;
    actionView: string;
    actionDownload: string;
    categoryLabels: Record<string, string>;
    months: string[];
  };

  news: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allFilter: string;
    searchPlaceholder: string;
    loadError: string;
    emptyDefault: string;
    emptyForSearch: string;
    paginationLabel: string;
    prevPageAria: string;
    nextPageAria: string;
    readArticle: string;
    categoryLabels: Record<string, string>;
  };

  article: {
    notFoundTitle: string;
    errorTitle: string;
    notFoundMessage: string;
    errorMessage: string;
    backToAll: string;
    allNews: string;
    shareBtn: string;
    minutesRead: string;
    editor: string;
    editorFallbackName: string;
    galleryTitle: string;
    videoTitle: string;
    documentsTitle: string;
    galleryAria: string;
    videoAria: string;
    documentsAria: string;
    relatedEyebrow: string;
    relatedTitle: string;
    relatedSeeAll: string;
    fileFallback: string;
  };

  footer: {
    schoolDescription: string;
    visitUs: string;
    address: string;
    menuTitle: string;
    hoursTitle: string;
    hours: { d: string; h: string }[];
    rights: string;
    menu: { home: string; about: string; staff: string; students: string; documents: string; news: string };
  };

  teacher: {
    yearsBadge: string; // e.g. "{n}+ vite"
    yearsExperience: string; // e.g. "{n} vite përvojë"
    memberSince: string;
    factPosition: string;
    factMember: string;
    factExperience: string;
    factEmail: string;
    factPhone: string;
    aboutTitle: string; // "Për {first}"
    noDescription: string;
  };

  admin: {
    section: string;
    nav: {
      dashboard: string;
      news: string;
      staff: string;
      documents: string;
      settings: string;
      users: string;
    };
    logout: string;

    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      submit: string;
    };

    dashboard: {
      welcome: string;
      subtitle: string;
      newsTitle: string;
      newsHint: string;
      staffTitle: string;
      staffHint: string;
      docsTitle: string;
      docsHint: string;
      settingsTitle: string;
      settingsHint: string;
    };

    common: {
      edit: string;
      delete: string;
      browse: string;
      cancel: string;
      remove: string;
      save: string;
      saveChanges: string;
      add: string;
      back: string;
      next: string;
      pageOf: string; // "Faqe {page} nga {total}"
      totalArticles: string; // "{n} artikuj gjithsej"
      totalMembers: string;  // "{n} anëtarë gjithsej"
      totalDocuments: string;
      totalUsers: string;
      confirmDelete: string; // "A je i sigurt që dëshiron të fshish \"{name}\"?"
      categoryFilter: string;
      role: string;
    };

    news: {
      title: string;
      newButton: string;
      empty: string;
      authorBy: string; // "nga {name}"
      createTitle: string;
      editTitle: string;
    };

    staff: {
      title: string;
      newButton: string;
      empty: string;
      sinceShort: string; // "· që nga {y}"
      createTitle: string;
      editTitle: string;
    };

    documents: {
      title: string;
      newButton: string;
      empty: string;
      createTitle: string;
      editTitle: string;
    };

    users: {
      title: string;
      newButton: string;
      empty: string;
      youSuffix: string;
      roleAriaLabel: string;
      confirmDelete: string; // "Të fshihet \"{name}\"?"
      roleRegular: string;
      roleAdmin: string;
      roleRegularLong: string;
      roleAdminLong: string;
      createTitle: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    settings: {
      title: string;
      subtitle: string;
      schoolDataHeading: string;
      directorName: string;
      directorPlaceholder: string;
      filesHeading: string;
      timetable: string;
      rules: string;
      fileHint: string;
      currentFile: string;
      pendingUpload: string; // "{size} · do të ngarkohet pas ruajtjes"
      willBeRemoved: string;
      replaceFile: string;
      uploadFile: string;
      onlyAllowedFiles: string;
      passwordHeading: string;
      passwordSubtitle: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
      changeBtn: string;
    };

    forms: {
      news: {
        titleField: string;
        category: string;
        publishedAt: string;
        cover: string;
        content: string;
        addParagraph: string;
        paragraphPlaceholder: string;
        attachments: string;
        attachmentsHint: string;
        replaceCover: string;
        uploadCover: string;
        coverHint: string;
        coverMustBeImage: string;
        coverRequired: string;
        currentPhoto: string;
        replaceHint: string;
        publish: string;
        existing: string;
        uploading: string;
        uploaded: string;
        errorPrefix: string; // "Gabim: {msg}"
        attachmentsClickOrDrag: string;
        photo: string;
      };
      staff: {
        fullName: string;
        position: string;
        category: string;
        memberSinceLabel: string;
        emailOpt: string;
        phoneOpt: string;
        descriptionOpt: string;
        photo: string;
        replacePhoto: string;
        uploadPhoto: string;
        photoHint: string;
        photoMustBeImage: string;
        photoRequired: string;
      };
      documents: {
        nameField: string;
        category: string;
        file: string;
        replaceFile: string;
        uploadFile: string;
        fileHint: string;
        onlyAllowed: string;
        fileRequired: string;
      };
    };

    errors: {
      required: string;
      invalidEmail: string;
      passwordRequired: string;
      min2: string;
      min8: string;
      uppercase: string;
      lowercase: string;
      digit: string;
      special: string;
      passwordsDontMatch: string;
      newPasswordSameAsOld: string;
      titleRequired: string;
      nameRequired: string;
      positionRequired: string;
      dateRequired: string;
      atLeastOneParagraph: string;
      max120: string;
      max200: string;
      max255: string;
      max2000: string;
      max40: string;
      invalidYear: string;
      yearMin1900: string;
      yearMaxNow: string;
      phoneTooShort: string;
    };
  };
}

// ---------------------------------------------------------------------------
// Albanian (default)
// ---------------------------------------------------------------------------
const sq: Dict = {
  common: {
    readMore: 'Lexo më shumë',
    seeAll: 'Shiko të gjitha',
    back: 'Mbrapa',
    next: 'Para',
    previous: 'E mëparshme',
    page: 'Faqe',
    of: 'nga',
    person_one: 'person',
    person_other: 'persona',
    document_one: 'dokument',
    document_other: 'dokumente',
    loading: 'Duke ngarkuar…',
    errorGeneric: 'Ndodhi një gabim',
    download: 'Shkarko',
    view: 'Shiko',
    share: 'Ndaj',
    linkCopied: 'Lidhja u kopjua',
    linkCopyFailed: 'Nuk u arrit të kopjohet lidhja',
    schoolFullName: 'Shkolla Fillore "Bedri Elezaga"',
    schoolShortName: 'Bedri Elezaga',
    schoolTagline: 'Shkollë Fillore · e themeluar më 1992',
  },
  nav: {
    home: 'Ballina',
    about: 'Rreth Shkollës',
    aboutHistoryTitle: 'Historiku i Shkollës',
    aboutHistorySub: 'Nga viti 1968 deri sot',
    aboutMissionTitle: 'Misioni dhe Vizioni',
    aboutMissionSub: 'Vlerat që na udhëheqin',
    aboutOverview: 'Prezantimi',
    staff: 'Stafi',
    students: 'Nxënësit',
    studentsScheduleTitle: 'Orari mësimor',
    studentsScheduleSub: 'Orari i javës sipas klasave',
    studentsRulesTitle: 'Rregullorja',
    studentsRulesSub: 'Rregullat e shkollës',
    studentsLibraryTitle: 'Biblioteka',
    studentsLibrarySub: 'Biblioteka jonë digjitale',
    documents: 'Dokumente',
    news: 'Lajme',
    contact: 'Kontakt',
    enroll: 'Regjistrohu',
    language: 'Gjuha',
  },
  home: {
    schoolYear: 'Viti shkollor',
    heroTitleA: 'Një shkollë ku çdo fëmijë',
    heroTitleB: 'gjen dritën e vet.',
    heroSubtitle: 'Në zemër të Anës së Malit, Shkolla Fillore "Bedri Elezaga" mëson breza të tërë në gjuhën amtare shqipe — me një rrjet shkollash që lidh fshatra të tëra në një familje të vetme arsimore.',
    btnAboutUs: 'Njihuni me ne',
    btnLatestNews: 'Lajmet e fundit',
    statFounded: 'Themeluar',
    statSchools: 'Shkolla',
    statYears: 'Vite mësimi',
    photoYard: 'Foto e oborrit të shkollës',
    photoClass: 'Nxënës në klasë',
    sinceBadge: 'Që nga viti 1929',
    quotesEyebrow: 'Fjalë që na udhëheqin',
    introEyebrow: 'Prezantim',
    introBadge: 'Një familje, jo vetëm një shkollë',
    introTitle: 'Mësojmë për jetën, së bashku.',
    introP1: 'Për gati një shekull, Shkolla Fillore "Bedri Elezaga" ka qenë një shtëpi e dytë për gjenerata të tëra fëmijësh të Anës së Malit. Këtu, çdo ditë fillon me kuriozitet dhe përfundon me një dije të re — në gjuhën që u dha mësuesit e parë në vitin 1941.',
    introP2: 'Shkolla amë në Vlladimir dhe tetë paralelet e ndara — në Krythë, Sukubinë, Rashtishë, Millë, Kravar, Shtodër, Kllezën e Fraskanjel — formojnë një rrjet të vetëm arsimor. Ky rrjet siguron që asnjë fëmijë i Anës së Malit, sado i largët, të mos mbetet pa shkollë në gjuhën e vet.',
    introP3: 'Misioni ynë është i thjeshtë dhe i qartë: të vazhdojmë atë që mësuesit e parë e nisën më 1929 — të përgatisim qytetarë të ndërgjegjshëm, krijues dhe të vetëbesueshëm, me dinjitet, me dashuri për gjuhën amtare, dhe me kuriozitet për botën që vjen.',
    directorRole: 'Drejtor',
    newsEyebrow: 'Dinamika jonë',
    newsTitle: 'Lajmet dhe aktivitetet e fundit',
    newsEmpty: 'Nuk ka lajme për momentin.',
    valuesCare: { t: 'Kujdes', d: 'Mjedis i ngrohtë ku çdo fëmijë ndihet i sigurt dhe i parë.' },
    valuesKnowledge: { t: 'Dije', d: 'Kurrikul i pasur që ushqen kuriozitetin natyral të fëmijëve.' },
    valuesCommunity: { t: 'Komunitet', d: 'Prindër, mësues dhe nxënës që punojnë si një familje.' },
    valuesCreativity: { t: 'Krijimtari', d: 'Art, muzikë dhe shkencë si mjete për të eksploruar botën.' },
  },
  about: {
    eyebrow: 'Rreth Shkollës',
    title: 'Një shtëpi ku dija rritet me dashuri.',
    subtitle: 'Njihuni me historinë, misionin dhe vlerat që na kanë udhëhequr për mbi pesë dekada.',
    tabHistory: 'Historiku i Shkollës',
    tabMission: 'Misioni dhe Vizioni',
  },
  history: {
    extractEyebrow: 'Ekstrakti i Kronikës',
    extractTitleA: 'Një trashëgimi që rrjedh nga viti',
    extractTitleYear: '1869',
    extractTitleB: '.',
    extractParagraph: 'IP Shkolla fillore "Bedri Elezaga" në Vlladimir, komuna Ulqin, përbëhet nga shkolla amë dhe tetë paralele të ndara nëpër fshatrat e Anës së Malit. Kjo është rruga e saj — nga mejtepi i Selitës deri te institucioni i sotëm.',
    branchesLabel: 'Paralelet e ndara',
    fact1869L: 'Viti i parë i mësimit',
    fact1869S: 'Mejtepi në Katërkollë',
    fact1945L: 'Mësimi në shqip',
    fact1945S: 'Vazhdimi pas Luftës',
    fact1961L: 'Emri "Bedri Elezaga"',
    fact1961S: 'Në nder të revolucionarit nga Ulqini',
    timelineEyebrow: 'Kronologjia',
    timelineTitle: 'Vite, mësues, gjenerata.',
    timelineSubtitle: 'Çdo datë në këtë kronikë mban brenda emra mësuesish, fshatra dhe nxënës që e ndërtuan këtë shkollë me duart e tyre.',
    directorsEyebrow: 'Drejtorët ndër vite',
    directorsTitle: 'Njerëz që e udhëhoqën shkollën.',
    directorsSubtitle: 'Nga viti 1945 e këtej, drejtuesit e shkollës i kanë dhënë vazhdimësi e drejtim këtij institucioni, secili në kohën e vet.',
    addendumEyebrow: 'Plotësim i kronikës',
    addendumTitle: 'Hapja dhe rihapja e shkollave në Anë të Malit',
    monographyNote: 'Sipas Monografisë "Shkolla Fillore Bedri Elezaga 1869–2019 Katërkollë" — Rexhep Lleshi',
    quoteText: 'Bedri Elezaga ishte një mësues që besonte se çdo fëmijë ka dritën e vet — detyra jonë si edukatorë është vetëm ta ndihmojmë të shkëlqejë.',
    quoteAuthor: '— Nga kujtimet e ish-nxënësve të tij, 1972',
    branches: ['Krythë', 'Sukubinë', 'Rashtishë', 'Millë', 'Kravar', 'Shtodër', 'Kllezën', 'Fraskanjel'],
    timeline: [
      { year: '1929', title: 'Hapja e shkollave të para', text: 'Shkolla themelohet në ndërtesën e mejtepit në Selitë, komuna Katërkollë. Po atë vit hapen shkollat në Kosiq dhe Sukubinë. Mësuesit e parë: Jozica Mariniq (Selitë), Milenko Guberiniq (Kosiq) dhe Vllado Miniq (Sukubinë). Mësimi zhvillohej në gjuhë jo amtare — serbe.' },
      { year: '1932', title: 'Ndërtesa të reja shkollore', text: 'Ndërtohen shkolla të reja në Katërkollë–Vlladimir, Krythë dhe Sukubinë, ku zhvillohet mësimi në klasët I–IV. Mësues të rinj i bashkohen kolektivit, ndër ta Andrija e Jullka Uskoviq (Vlladimir), Bosilka Strugar (Krythë) dhe Jelena Miniq (Sukubinë).' },
      { year: '1941', title: 'Ndërprerja e punës', text: 'Shkollat e ndërpresin punën për shkak të kapitullimit të Jugosllavisë së vjetër. Ana e Malit kalon në Administrimin e Shqipërisë, Prefekturës së Shkodrës.' },
      { year: '1941–1943', title: 'Mësimi në gjuhën amtare', text: 'Përkundër rrethanave të rënda të luftës, Ministria e Arsimit të Shqipërisë dërgon mësues me bazë pedagogjike në Katërkollë, Krythë dhe Sukubinë. Për herë të parë, mësimi këtu zhvillohet në gjuhën amtare shqipe.' },
      { year: 'Shkurt 1945', title: 'Rifillimi në gjuhën shqipe', text: 'Shkolla në Vlladimir e vazhdon punën nën drejtuesin e parë Minja Nikollaidis nga Ulqini. Në klasët I–IV regjistrohen 45 nxënës–djem. Formohet Këshilli i parë i shkollës me kryetar Musa Llollën.' },
      { year: '1945/46', title: 'Shkolla të përkohshme', text: 'Hapen shkolla të përkohshme ku mësuesit punojnë pa pagesë: Ramazan Jahoviq në Krythë, Jullka Nikoliq në Sukubinë, Daut Hoxhiq dhe Nikolla Nrekiq në Kllezën të Naltë, Prena Jankoviq në Kllezën të Poshtme dhe Marko Shkrela në Ambull.' },
      { year: '1946/47', title: 'Mësues të rajonit', text: 'Pas kursit pedagogjik, caktohen mësuesit nga vetë rajoni. Vlladimiri ka 4 klasë me 195 nxënës, Krytha 2 klasë me 146, Sukubina 4 klasë me 165 dhe Ambulli 86 nxënës.' },
      { year: '1947/48', title: 'Shkollë shtatë klasëshe', text: 'Shkolla në Vlladimir rritet në shkollë fillore shtatë klasëshe. Për drejtor emërohet Junuz Divanoviqi, mësues nga Tivari. Hapet shkolla e re në Kravar me 1 klasë dhe 76 nxënës nën mësuesin Meto Cucoviq.' },
      { year: '1948/49', title: 'Shkolla në Kllezën të Poshtme', text: 'Hapet shkolla në Kllezën të Poshtme, duke zgjeruar më tej rrjetin e shkollave të ndara nëpër fshatra.' },
      { year: '1949/50', title: 'Sekretaria dhe gjenerata e parë', text: 'Shkolla në Vlladimir fiton sekretarin e vet — që nga viti 1951 me të drejtë të plotë punon Shaban Hoxhiq. Diplomohet gjenerata e parë e shkollës shtatëvjeçare: Elez Mustafoviq, Haxhija dhe Fadil Taipoviq, Sabrija dhe Xhevdet Holloviq, Shaban Hoxhiq dhe Vata Elezoviq.' },
      { year: '1951/52', title: 'Shkollë tetëvjeçare', text: 'Shkolla në Vlladimir rritet në shkollë fillore tetëvjeçare, duke shtuar një klasë mbi sistemin e mëparshëm.' },
      { year: '1953/54', title: 'Shkolla në Millë', text: 'Hapet Shkolla fillore në Millë me 4 klasë dhe 73 nxënës.' },
      { year: '1956/57', title: 'Gjuha frënge', text: 'Në shkollë vendoset frëngjishtja si gjuhë e huaj. Mësohet deri në vitin 1961.' },
      { year: '1958/59', title: 'Mësuesja e parë vendase', text: 'Diplomohet nxënësja Rrukije Likoviq, e cila në vitin 1964/65 do të bëhet mësuesja e parë vendase në shkollë.' },
      { year: '1961/62', title: 'Gjuha ruse', text: 'Në programin shkollor vendoset rusishtja si gjuhë e huaj. Do të mësohet deri në vitin 1992.' },
      { year: 'Dhjetor 1961', title: 'Emri "Bedri Elezaga"', text: 'Shkolla fillore në Vlladimir e merr emrin e revolucionarit të ri nga Ulqini, Bedri Elezaga.' },
      { year: '1962/63', title: 'Shkolla në Shtodër', text: 'Hapet Shkolla fillore në Shtodër me 4 klasë dhe 71 nxënës. Mësues: Halit Avdiq dhe Hasan Salaj.' },
      { year: '1964', title: 'Këshilli i shkollës', text: 'Formohet organi i parë vetëqeverisës — Këshilli i shkollës, me kryetar Faik Cekoviqin.' },
      { year: '1966', title: 'Largimi i Junuz Divanoviqit', text: 'Drejtori Junuz Divanoviq, i cili kontriboi shumë në arsimimin e njerëzve të këtij vendi me punë e vetësakrificë, shkon në pension.' },
      { year: '1967/68', title: 'Shkolla në Fraskanjel', text: 'Hapet shkolla e ndarë në Fraskanjel me 4 klasë dhe 24 nxënës. Mësues: Mehmet Peroviq.' },
      { year: '1972/73', title: 'Objekti i ri dhe shkolla në Rashtishë', text: 'Lëshohet ndërtesa e vjetër dhe puna vazhdon në objektin e ri, ku organizohet mësimi në kabinete. Po atë vit hapet shkolla e ndarë në Rashtishë me 4 klasë. Mësues: Idriz Kallaboviq dhe Osman Mustafoviq.' },
      { year: '1975/76', title: 'Transporti me autobus', text: 'Organizohet bartja e nxënësve me autobus deri në shkollë dhe anasjelltas — një lehtësim i madh për familjet e fshatrave të largëta.' },
      { year: '1977/78', title: 'Gjuha angleze', text: 'Anglishtja vendoset si gjuhë e huaj e dytë në programin mësimor.' },
      { year: '1979', title: 'Dita e Shkollës', text: 'Caktohet 15 maji si Dita e Shkollës — datë që festohet ende sot.' },
      { year: '1981/82', title: 'Pedagogu i shkollës', text: 'Fillon punën pedagogu i shkollës, Sulejman Gjoni.' },
      { year: '1982/83', title: 'Java 5-ditore', text: 'Në shkollë vendoset java 5-ditore e punës.' },
      { year: '1987/88', title: 'Stomatologjia dhe ushqimi', text: 'Fillon punën ambulanca stomatologjike e nxënësve. Po atë vit organizohet ushqimi i përditshëm për nxënësit.' },
      { year: '1989/90', title: 'Punëtori më i mirë i arsimit', text: 'Mësuesi i shkollës Ibrahim Cucoviq shpallet punëtori më i mirë i arsimit në Komunën e Ulqinit. I jepet diplomë dhe shpërblim në para.' },
      { year: '1992', title: 'Institucion publik', text: 'Shkolla bëhet Institucion publik dhe merr emrin e plotë: IP Shkolla fillore "Bedri Elezaga" Vlladimir.' },
      { year: '1992/93', title: 'Kalendar i veçantë e gjermanishtja', text: 'Vendoset kalendari i parë shkollor i veçantë në Mal të Zi, me numër të njëjtë të ditëve javore të mësimit. Gjermanishtja shtohet si gjuhë e dytë e huaj.' },
      { year: '1993/94', title: 'Bibliotekisti i shkollës', text: 'Avni Kurti fillon punën me të drejtë të plotë si bibliotekist i shkollës.' },
      { year: '1997', title: 'Nderim për Junuz Divanoviqin', text: 'Në organizimin e Art Club-it, mbahet Akademia në shenjë kujtese dhe falënderimi për ish-drejtorin Junuz Divanoviq, me rastin e 50-vjetorit të ardhjes së tij në Vlladimir.' },
      { year: '1998', title: 'Llogaritari i shkollës', text: 'Ilir Lleshi fillon punën me të drejtë të plotë si llogaritar i shkollës.' },
      { year: '1998/99', title: 'Mësimi eksperimental', text: 'Vendoset mësimi eksperimental në klasën e parë në shkollën amë.' },
      { year: '2003/04', title: 'Era digjitale', text: 'Shkolla pajiset me kompjuterë dhe organizohet kursi i parë i punës me kompjuter.' },
      { year: '2005/06', title: 'Shkolla nëntëvjeçare', text: 'Vendoset programi arsimor i shkollës fillore nëntëvjeçare/klasëshe, duke filluar nga klasa e parë.' },
      { year: 'Shkurt 2006', title: 'Në portalin web', text: 'Me urdhër të Ministrisë së Arsimit dhe Shkencës të Malit të Zi, shkolla paraqitet në Web portalin e shkollave të Malit të Zi. Tekstin në shqip e malazeze, Ekstraktin e Kronikës etj. e përgatit nëndrejtori Rexhep Lleshi; punët teknike-figurative e shkrimin kompjuterik i bën llogaritari Ilir Lleshi.' },
    ],
    directors: [
      { name: 'Minja Nikollaidis', period: '1945', note: 'Drejtori i parë pas Luftës' },
      { name: 'Junuz Divanoviqi', period: '1947–1966', note: 'Mësues nga Tivari' },
      { name: 'Sabrija Holloviq', period: '1966–1970' },
      { name: 'Elez Muçoviq', period: '1970–1973 dhe 1982–1985' },
      { name: 'Faik Cekoviq', period: '1973' },
      { name: 'Xhevdet Holloviq', period: '1973–1977' },
      { name: 'Rexhep Kokaj', period: '1977–1981' },
      { name: 'Idriz Kallaboviq', period: '1981' },
      { name: 'Rexhep Lleshi', period: '1985–1998' },
      { name: 'Nail Draga', period: '1998–2003' },
      { name: 'Ali Muçaj', period: '2003 — sot' },
    ],
    addendumParagraphs: [
      'Në Kronikën e Shkollës dhe Ekstraktin e saj, figuron se me mbarimin e Luftës së Parë Botërore, 1918, kjo trevë bie nën sundimin e Mbretërisë Jugosllave dhe shkollat e para në Anë të Malit janë hapur, më 1929, në Selitë, Kosiq dhe Sukubinë. Të njëjtat kanë punuar deri në fillimin e Luftës së Dytë Botërore dhe kapitullimin e atij shteti, më 1941.',
      'Ende pa mbaruar lufta, më 1945, Ana e Malit bie në Administrimin e Jugosllavisë Federative Popullore/Socialiste. Në shkurt të atij viti, shkolla në Katërkollë vazhdon punën dhe mësimi zhvillohet për herë të parë në gjuhën amtare — shqipe.',
      'Por të dhënat e gjetura më vonë, të shënuara në librin Monografi, "Shkolla Fillore Bedri Elezaga 1869–2019 Katërkollë" të autorit Rexhep Lleshi, dëshmojnë se mësimi këtu, në shkolla, ka filluar shumë më herët se që njeh Kronika dhe lidhet me hapjen e mejtepit — Shkollës fillore katërvjeçare, në kohën e Perandorisë Osmane, më 1869.',
      'Me fillimin e Luftës së Dytë Botërore, 1941, si të gjitha trevat shqiptare jashtë kufirit të shtetit Amë, edhe Ana e Malit bie në Administrimin e Shqipërisë, Prefekturës së Shkodrës. Përkundër rrethanave të gjendjes së rëndë jetësore, në vitet shkollore 1941/42 e 1942/43, Ministria e Arsimit të Shqipërisë edhe këtu, në Anë të Malit e Ulqin, dërgon mësues me bazë pedagogjike për punë me nxënës në shkollat në Katërkollë, Krythë dhe Sukubinë. Ashtu, në këto shkolla për herë të parë mësimi zhvillohet në gjuhën amtare shqipe.',
      'Andaj, Kronikës duhet përgjegjur e thënë se këtu, në Anë të Malit, shkolla e filloi punën më 1869, ndërsa në 1929 shkollat punën e rifilluan. Atë e vazhduan edhe gjatë Luftës… dhe mësimi në gjuhën amtare shqipe ka filluar më 1941, jo më 1945.',
    ],
    quotes: [
      { text: 'Shkolla në Katërkollë më e bukura në Mal të Zi dhe Jugosllavi.', author: 'Shaban Sait Hoxhiqi' },
      { text: 'Shkolla fillore "Bedri Elezaga", Tempulli i diturisë që ruajti gjuhën, kulturën dhe traditën e lavdishme shqiptare.', author: 'Gjeke Gjon Gjonaj' },
      { text: 'Shkolla në Katërkollë, krijuesja e elitës intelektuale të rajonit.', author: 'Hatixhe Gjoni' },
    ],
  },
  mission: {
    missionEyebrow: 'Misioni ynë',
    missionTitle: 'Të rrisim qytetarë të ndërgjegjshëm, krijues dhe të vetëbesueshëm.',
    missionP1: 'Ne besojmë se arsimi fillor është themeli mbi të cilin ndërtohet gjithçka. Prandaj, misioni ynë është të krijojmë një mjedis ku çdo fëmijë ndihet i sigurt, i dashur dhe i aftë për të mësuar — jo nga frika, por nga kurioziteti.',
    missionP2: 'Ne përgatitim fëmijët jo thjesht për provimet e nesërme, por për jetën që vjen. Për këtë, i mësojmë të mendojnë në mënyrë kritike, të bashkëpunojnë me respekt, dhe të shohin ndryshimin si një mundësi — jo si një kërcënim.',
    visionEyebrow: 'Vizioni ynë',
    visionTitle: "Të ruajmë rrënjët e Anës së Malit — dhe t'i hapim degët drejt botës që vjen.",
    visionP1: 'Pothuajse një shekull pas mësuesve të parë që erdhën në Selitë, Kosiq e Sukubinë, ne synojmë të mbetemi ajo që na thanë gjeneratat para nesh — Tempulli i diturisë që ruan gjuhën, kulturën dhe traditën shqiptare. Shkolla amë dhe tetë paralelet e ndara nëpër fshatra mbajnë gjallë të njëjtin mision: t\'i mësojnë fëmijët në gjuhën e tyre amtare, pa lënë mbrapa askënd.',
    visionP2: 'Por nuk duam të jemi vetëm rojtarë të së kaluarës. Dëshirojmë që çdo nxënës që del prej dyerve tona — qoftë nga Vlladimiri, Krytha, Sukubina apo Fraskanjeli — të dalë i hapur ndaj botës: me njohuri të gjuhëve të huaja, me mjete digjitale në duar, dhe me besimin se trashëgimia e tij nuk e kufizon, por e fuqizon për kohën që vjen.',
    valuesEyebrow: 'Vlerat tona',
    valuesTitle: 'Pesë parime që na udhëheqin çdo ditë.',
    values: [
      { t: 'Respekti', d: 'Për secilin fëmijë, mësues dhe prind — pa përjashtim.' },
      { t: 'Përgjegjësia', d: 'Për mësimin tonë, për fjalët dhe për veprimet tona.' },
      { t: 'Kurioziteti', d: 'Mbajmë gjallë dëshirën për të pyetur dhe për të zbuluar.' },
      { t: 'Empatia', d: 'Të kuptojmë botën nga këndvështrimi i të tjerëve.' },
      { t: 'Përsosmëria', d: 'Japim më të mirën tonë, pa kërkuar përsosmëri.' },
    ],
  },
  staff: {
    eyebrow: 'Stafi',
    title: 'Njerëzit që e bëjnë shkollën tonë të gjallë.',
    subtitle: 'Nga drejtuesit te mësuesit, nga bashkëpunëtorët profesionalë te stafi i mirëmbajtjes — secili luan një rol të pazëvendësueshëm.',
    empty: 'Nuk ka anëtarë në këtë kategori.',
    allFilter: 'Të gjithë',
    categories: {
      school_bodies: 'Organet e Shkollës',
      directorate: 'Drejtoria',
      administration: 'Stafi Administrativ',
      professional_associates: 'Bashkëpunëtorët Profesionalë',
      teachers: 'Mësuesit',
      assistants: 'Asistentët',
      maintenance: 'Stafi i Mirëmbajtjes',
    },
  },
  students: {
    eyebrow: 'Nxënësit',
    title: 'Gjithçka që u duhet nxënësve tanë.',
    subtitle: 'Orari mësimor dhe rregullorja e shkollës — në një vend të vetëm.',
    tabSchedule: 'Orari mësimor',
    tabRules: 'Rregullorja',
  },
  schedule: {
    eyebrow: 'Orari mësimor 2025/26',
    title: 'Orari i javës',
    subtitle: 'Shkarkoni orarin e plotë javor me lëndët, orët dhe pushimet për të gjitha klasat.',
    cardTitle: 'Orari i javës (PDF)',
    cardUpdated: 'Përditësuar më 1 Shtator 2025',
    btnDownload: 'Shkarko PDF',
  },
  rules: {
    eyebrow: 'Rregullorja e brendshme',
    title: 'Parimet që ne i ndajmë së bashku.',
    subtitle: 'Këto rregulla janë krijuar për të mbrojtur kohën, komoditetin dhe dinjitetin e çdo nxënësi e mësuesi. Ato nuk janë kufizime — janë premtime që bëjmë ndaj njëri-tjetrit.',
    sections: [
      { t: 'Prezenca dhe vonesat', items: [
        'Nxënësit duhet të arrijnë në shkollë të paktën 10 minuta para fillimit të orës së parë.',
        'Vonesa mbi 15 minuta regjistrohet si mungesë e paarsyetuar.',
        'Mungesat duhet të arsyetohen me shkresë nga prindi brenda 3 ditësh.',
      ]},
      { t: 'Sjellja dhe komunikimi', items: [
        'Respektojmë mësuesit, bashkënxënësit dhe të gjithë stafin e shkollës.',
        'Përdorim gjuhë të pastër dhe të kulturuar në çdo situatë.',
        'Zgjidhjen e mosmarrëveshjeve e kërkojmë te mësuesit ose psikologia.',
      ]},
      { t: 'Uniforma dhe pamja', items: [
        'Uniforma e shkollës është e detyrueshme nga e hëna në të premte.',
        'Këpucët duhet të jenë të pastra dhe të përshtatshme për aktivitet.',
        'Bizhuteritë e mëdha dhe grimi nuk janë të lejuara.',
      ]},
      { t: 'Teknologjia dhe telefoni', items: [
        'Telefonat duhet të mbahen në modalitet të heshtur gjatë orës.',
        'Përdorimi i pajisjeve lejohet vetëm kur udhëzohet nga mësuesi.',
        'Rrjetet sociale dhe lojërat nuk lejohen në ambientet e shkollës.',
      ]},
      { t: 'Kujdesi për mjedisin', items: [
        'Mbajmë pastër klasat, koridoret dhe oborrin.',
        'Riciklojmë letrën, plastikën dhe mbeturinat organike.',
        'Nderojmë pajisjet dhe librat që na ofron shkolla.',
      ]},
    ],
    fullPdfTitle: 'Rregullorja e plotë (PDF)',
    fullPdfMeta: '16 faqe · Përditësuar më 1 Shtator 2025',
    btnDownload: 'Shkarko PDF',
    btnUnavailable: 'Skedari nuk është i disponueshëm',
  },
  documents: {
    eyebrow: 'Dokumente',
    title: 'Dokumentet dhe formularët e shkollës.',
    subtitle: 'Kalendari shkollor, formularët, rregulloret dhe dokumentet e rëndësishme — të gjitha në një vend, gati për shkarkim.',
    libraryTitle: 'Biblioteka e dokumenteve',
    searchPlaceholder: 'Kërko...',
    allFilter: 'Të gjitha',
    colName: 'Emri i dokumentit',
    colCategory: 'Kategoria',
    colSize: 'Madhësia',
    colDate: 'Data',
    colActions: 'Veprime',
    emptyForSearch: 'Asnjë dokument për këtë kërkim.',
    emptyForCategory: 'Asnjë dokument në këtë kategori.',
    actionView: 'Shiko',
    actionDownload: 'Shkarko',
    categoryLabels: {
      calendar: 'Kalendar',
      form: 'Formular',
      regulation: 'Rregullore',
      curriculum: 'Kurrikul',
      event: 'Ngjarje',
      other: 'Tjera',
    },
    months: ['Janar','Shkurt','Mars','Prill','Maj','Qershor','Korrik','Gusht','Shtator','Tetor','Nëntor','Dhjetor'],
  },
  news: {
    eyebrow: 'Lajme & Njoftime',
    title: 'Çfarë po ndodh në shkollën tonë.',
    subtitle: 'Ngjarjet, arritjet dhe momentet që e bëjnë çdo ditë në shkollën "Bedri Elezaga" të veçantë.',
    allFilter: 'Të gjitha',
    searchPlaceholder: 'Kërko lajme...',
    loadError: 'Ndodhi një gabim gjatë ngarkimit të lajmeve. Provo përsëri më vonë.',
    emptyDefault: 'Nuk ka lajme për momentin.',
    emptyForSearch: 'Asnjë lajm për "{q}".',
    paginationLabel: 'Faqet e lajmeve',
    prevPageAria: 'Faqja e mëparshme',
    nextPageAria: 'Faqja tjetër',
    readArticle: 'Lexo artikullin',
    categoryLabels: {
      Arritje: 'Arritje',
      Ngjarje: 'Ngjarje',
      Lajme: 'Lajme',
      Projekte: 'Projekte',
      Sport: 'Sport',
      Tjera: 'Tjera',
    },
  },
  article: {
    notFoundTitle: 'Lajmi nuk u gjet',
    errorTitle: 'Ndodhi një gabim',
    notFoundMessage: 'Ky lajm mund të jetë fshirë ose lidhja është e gabuar.',
    errorMessage: 'Provo përsëri më vonë.',
    backToAll: 'Kthehu te të gjitha lajmet',
    allNews: 'Të gjitha lajmet',
    shareBtn: 'Ndaj',
    minutesRead: 'min lexim',
    editor: 'Redaksia e shkollës',
    editorFallbackName: 'Redaksia e shkollës',
    galleryTitle: 'Galeria',
    videoTitle: 'Video',
    documentsTitle: 'Dokumente',
    galleryAria: 'Galeria e fotove',
    videoAria: 'Video',
    documentsAria: 'Dokumente',
    relatedEyebrow: 'Vazhdoni leximin',
    relatedTitle: 'Lajme të ngjashme',
    relatedSeeAll: 'Shiko të gjitha',
    fileFallback: 'Skedar',
  },
  footer: {
    schoolDescription: 'Një vend ku fëmijët rriten me dashuri, dije dhe vlera që zgjasin gjithë jetën.',
    visitUs: 'Na vizitoni',
    address: '85366 Katërkollë - Ulqin',
    menuTitle: 'Menu',
    hoursTitle: 'Orari',
    hours: [
      { d: 'E hënë – E premte', h: '07:45 – 15:30' },
      { d: 'E shtunë',          h: 'Mbyllur' },
      { d: 'E diel',            h: 'Mbyllur' },
    ],
    rights: '© 2026 Shkolla Fillore "Bedri Elezaga". Të gjitha të drejtat e rezervuara.',
    menu: {
      home: 'Ballina',
      about: 'Rreth Shkollës',
      staff: 'Stafi',
      students: 'Nxënësit',
      documents: 'Dokumente',
      news: 'Lajme & Njoftime',
    },
  },
  teacher: {
    yearsBadge: '{n}+ vite',
    yearsExperience: '{n} vite përvojë',
    memberSince: 'Anëtar që nga {y}',
    factPosition: 'Pozita',
    factMember: 'Anëtar që nga',
    factExperience: 'Përvoja',
    factEmail: 'Email',
    factPhone: 'Telefon',
    aboutTitle: 'Për {first}',
    noDescription: 'Nuk ka përshkrim të disponueshëm.',
  },
  admin: {
    section: 'Admin',
    nav: {
      dashboard: 'Paneli',
      news: 'Lajmet',
      staff: 'Stafi',
      documents: 'Dokumentet',
      settings: 'Cilësimet',
      users: 'Përdoruesit',
    },
    logout: 'Dil',
    login: {
      title: 'Hyr në Admin',
      subtitle: 'Bedri Elezaga',
      email: 'Email',
      password: 'Fjalëkalimi',
      submit: 'Hyr',
    },
    dashboard: {
      welcome: 'Mirë se erdhët',
      subtitle: 'Zgjidh një veprim nga menyja anash ose më poshtë.',
      newsTitle: 'Lajmet',
      newsHint: 'Shiko, krijo, edito ose fshi artikuj',
      staffTitle: 'Stafi',
      staffHint: 'Menaxho anëtarët dhe pozicionet',
      docsTitle: 'Dokumentet',
      docsHint: 'Ngarko dhe menaxho PDF, DOC, DOCX',
      settingsTitle: 'Cilësimet',
      settingsHint: 'Drejtori, orari mësimor dhe rregullorja',
    },
    common: {
      edit: 'Edito',
      delete: 'Fshi',
      browse: 'Shfleto',
      cancel: 'Anulo',
      remove: 'Hiq',
      save: 'Ruaj',
      saveChanges: 'Ruaj ndryshimet',
      add: 'Shto',
      back: 'Mbrapa',
      next: 'Para',
      pageOf: 'Faqe {page} nga {total}',
      totalArticles: '{n} artikuj gjithsej',
      totalMembers: '{n} anëtarë gjithsej',
      totalDocuments: '{n} dokumente gjithsej',
      totalUsers: '{n} përdorues gjithsej',
      confirmDelete: 'A je i sigurt që dëshiron të fshish "{name}"?',
      categoryFilter: 'Filtër kategorie',
      role: 'Roli',
    },
    news: {
      title: 'Lajmet',
      newButton: 'Krijo lajm të ri',
      empty: 'Nuk ka asnjë artikull ende.',
      authorBy: 'nga {name}',
      createTitle: 'Krijo lajm',
      editTitle: 'Edito lajmin',
    },
    staff: {
      title: 'Stafi',
      newButton: 'Shto anëtar',
      empty: 'Nuk ka anëtarë në këtë kategori.',
      sinceShort: '· që nga {y}',
      createTitle: 'Shto anëtar të stafit',
      editTitle: 'Edito anëtarin',
    },
    documents: {
      title: 'Dokumentet',
      newButton: 'Shto dokument',
      empty: 'Nuk ka dokumente në këtë kategori.',
      createTitle: 'Shto dokument',
      editTitle: 'Edito dokumentin',
    },
    users: {
      title: 'Përdoruesit',
      newButton: 'Shto përdorues',
      empty: 'Nuk ka përdorues.',
      youSuffix: '(ti)',
      roleAriaLabel: 'Roli',
      confirmDelete: 'Të fshihet "{name}"?',
      roleRegular: 'I rregullt',
      roleAdmin: 'Admin',
      roleRegularLong: 'Përdorues i rregullt',
      roleAdminLong: 'Administrator',
      createTitle: 'Shto përdorues',
      firstName: 'Emri',
      lastName: 'Mbiemri',
      email: 'Email',
      password: 'Fjalëkalimi',
    },
    settings: {
      title: 'Cilësimet',
      subtitle: 'Të dhënat e shkollës dhe skedarët që shfaqen publikisht.',
      schoolDataHeading: 'Të dhënat e shkollës',
      directorName: 'Emri i drejtorit',
      directorPlaceholder: 'P.sh. Mustafe Bardhi',
      filesHeading: 'Skedarët publikë',
      timetable: 'Orari mësimor',
      rules: 'Rregullorja e shkollës',
      fileHint: 'PDF, DOC ose DOCX — max 25 MB',
      currentFile: 'Skedari aktual',
      pendingUpload: '{size} · do të ngarkohet pas ruajtjes',
      willBeRemoved: 'Skedari do të hiqet pas ruajtjes.',
      replaceFile: 'Zëvendëso skedarin',
      uploadFile: 'Kliko ose tërhiq skedarin',
      onlyAllowedFiles: 'Lejohen vetëm PDF, DOC ose DOCX',
      passwordHeading: 'Llogaria ime',
      passwordSubtitle: 'Ndrysho fjalëkalimin tënd.',
      currentPassword: 'Fjalëkalimi aktual',
      newPassword: 'Fjalëkalimi i ri',
      confirmPassword: 'Konfirmo fjalëkalimin',
      changeBtn: 'Ndrysho fjalëkalimin',
    },
    forms: {
      news: {
        titleField: 'Titulli',
        category: 'Kategoria',
        publishedAt: 'Data e publikimit',
        cover: 'Foto kryesore',
        content: 'Përmbajtja (paragrafë)',
        addParagraph: '+ Shto paragraf',
        paragraphPlaceholder: 'Paragraf {n}',
        attachments: 'Bashkëngjitje',
        attachmentsHint: 'Foto, video, PDF, DOC — disa njëkohësisht',
        replaceCover: 'Zëvendëso foton kryesore',
        uploadCover: 'Kliko ose tërhiq foton kryesore',
        coverHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        coverMustBeImage: 'Foto kryesore duhet të jetë imazh',
        coverRequired: 'Foto kryesore është e detyrueshme',
        currentPhoto: 'Foto aktuale',
        replaceHint: 'Tërhiq ose kliko mëposhtë për të zëvendësuar',
        publish: 'Publiko',
        existing: 'ekzistuese',
        uploading: 'Duke u ngarkuar...',
        uploaded: 'Ngarkuar',
        errorPrefix: 'Gabim: {msg}',
        attachmentsClickOrDrag: 'Kliko ose tërhiq skedarë',
        photo: 'Fotoja',
      },
      staff: {
        fullName: 'Emri i plotë',
        position: 'Pozicioni',
        category: 'Kategoria',
        memberSinceLabel: 'Anëtar që nga (vit)',
        emailOpt: 'Email (opsionale)',
        phoneOpt: 'Telefon (opsionale)',
        descriptionOpt: 'Përshkrim (opsionale)',
        photo: 'Fotoja',
        replacePhoto: 'Zëvendëso foton',
        uploadPhoto: 'Kliko ose tërhiq foton',
        photoHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        photoMustBeImage: 'Fotoja duhet të jetë imazh',
        photoRequired: 'Fotoja është e detyrueshme',
      },
      documents: {
        nameField: 'Emri',
        category: 'Kategoria',
        file: 'Skedari',
        replaceFile: 'Zëvendëso skedarin',
        uploadFile: 'Kliko ose tërhiq skedarin',
        fileHint: 'PDF, DOC, DOCX — max 25 MB',
        onlyAllowed: 'Lejohen vetëm PDF, DOC ose DOCX',
        fileRequired: 'Skedari është i detyrueshëm',
      },
    },
    errors: {
      required: 'I detyrueshëm',
      invalidEmail: 'Email i pavlefshëm',
      passwordRequired: 'Fjalëkalimi është i detyrueshëm',
      min2: 'Min 2 karaktere',
      min8: 'Të paktën 8 karaktere',
      uppercase: 'Duhet një shkronjë e madhe',
      lowercase: 'Duhet një shkronjë e vogël',
      digit: 'Duhet një shifër',
      special: 'Duhet një karakter special',
      passwordsDontMatch: 'Fjalëkalimet nuk përputhen',
      newPasswordSameAsOld: 'Fjalëkalimi i ri duhet të jetë ndryshe nga ai aktual',
      titleRequired: 'Titulli është i detyrueshëm',
      nameRequired: 'Emri është i detyrueshëm',
      positionRequired: 'Pozicioni është i detyrueshëm',
      dateRequired: 'Data është e detyrueshme',
      atLeastOneParagraph: 'Të paktën një paragraf duhet të përmbajë tekst',
      max120: 'Maksimumi 120 karaktere',
      max200: 'Maksimumi 200 karaktere',
      max255: 'Maksimumi 255 karaktere',
      max2000: 'Maksimumi 2000 karaktere',
      max40: 'Maksimumi 40 karaktere',
      invalidYear: 'Vit i pavlefshëm',
      yearMin1900: 'Viti duhet të jetë ≥ 1900',
      yearMaxNow: 'Viti nuk mund të jetë në të ardhmen',
      phoneTooShort: 'Numri është shumë i shkurtër',
    },
  },
};

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
const en: Dict = {
  common: {
    readMore: 'Read more',
    seeAll: 'See all',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    of: 'of',
    person_one: 'person',
    person_other: 'people',
    document_one: 'document',
    document_other: 'documents',
    loading: 'Loading…',
    errorGeneric: 'Something went wrong',
    download: 'Download',
    view: 'View',
    share: 'Share',
    linkCopied: 'Link copied',
    linkCopyFailed: 'Could not copy link',
    schoolFullName: 'Primary School "Bedri Elezaga"',
    schoolShortName: 'Bedri Elezaga',
    schoolTagline: 'Primary School · founded in 1992',
  },
  nav: {
    home: 'Home',
    about: 'About the School',
    aboutHistoryTitle: 'School History',
    aboutHistorySub: 'From 1968 until today',
    aboutMissionTitle: 'Mission and Vision',
    aboutMissionSub: 'The values that guide us',
    aboutOverview: 'Overview',
    staff: 'Staff',
    students: 'Students',
    studentsScheduleTitle: 'Class Schedule',
    studentsScheduleSub: 'Weekly schedule by class',
    studentsRulesTitle: 'Regulations',
    studentsRulesSub: 'School rules',
    studentsLibraryTitle: 'Library',
    studentsLibrarySub: 'Our digital library',
    documents: 'Documents',
    news: 'News',
    contact: 'Contact',
    enroll: 'Enroll',
    language: 'Language',
  },
  home: {
    schoolYear: 'School year',
    heroTitleA: 'A school where every child',
    heroTitleB: 'finds their own light.',
    heroSubtitle: 'In the heart of Ana e Malit, "Bedri Elezaga" Primary School has been teaching generations in their native Albanian language — through a network of schools that connects entire villages into one educational family.',
    btnAboutUs: 'Get to know us',
    btnLatestNews: 'Latest news',
    statFounded: 'Founded',
    statSchools: 'Schools',
    statYears: 'Years of teaching',
    photoYard: 'Photo of the schoolyard',
    photoClass: 'Students in class',
    sinceBadge: 'Since 1929',
    quotesEyebrow: 'Words that guide us',
    introEyebrow: 'Introduction',
    introBadge: 'A family, not just a school',
    introTitle: 'We learn for life, together.',
    introP1: 'For nearly a century, "Bedri Elezaga" Primary School has been a second home for entire generations of children of Ana e Malit. Here, every day starts with curiosity and ends with new knowledge — in the language given by the first teachers in 1941.',
    introP2: 'The main school in Vlladimir and the eight branch schools — in Krythë, Sukubinë, Rashtishë, Millë, Kravar, Shtodër, Kllezën and Fraskanjel — form a single educational network. This network ensures that no child of Ana e Malit, however remote, is left without a school in their own language.',
    introP3: 'Our mission is simple and clear: to continue what the first teachers began in 1929 — to prepare conscious, creative and self-confident citizens, with dignity, with love for the mother tongue, and with curiosity for the world to come.',
    directorRole: 'Principal',
    newsEyebrow: 'Our daily life',
    newsTitle: 'Latest news and activities',
    newsEmpty: 'No news at the moment.',
    valuesCare: { t: 'Care', d: 'A warm environment where every child feels safe and seen.' },
    valuesKnowledge: { t: 'Knowledge', d: 'A rich curriculum that nourishes children\'s natural curiosity.' },
    valuesCommunity: { t: 'Community', d: 'Parents, teachers and students working as one family.' },
    valuesCreativity: { t: 'Creativity', d: 'Art, music and science as tools to explore the world.' },
  },
  about: {
    eyebrow: 'About the School',
    title: 'A home where knowledge grows with love.',
    subtitle: 'Get to know the history, mission and values that have guided us for over five decades.',
    tabHistory: 'School History',
    tabMission: 'Mission and Vision',
  },
  history: {
    extractEyebrow: 'Chronicle Excerpt',
    extractTitleA: 'A heritage flowing from the year',
    extractTitleYear: '1869',
    extractTitleB: '.',
    extractParagraph: 'PI "Bedri Elezaga" Primary School in Vlladimir, municipality of Ulqin, consists of the main school and eight branch schools across the villages of Ana e Malit. This is its journey — from the mejtep in Selitë to today\'s institution.',
    branchesLabel: 'Branch schools',
    fact1869L: 'First year of teaching',
    fact1869S: 'The mejtep in Katërkollë',
    fact1945L: 'Teaching in Albanian',
    fact1945S: 'Continuation after the War',
    fact1961L: 'The name "Bedri Elezaga"',
    fact1961S: 'In honor of the revolutionary from Ulqin',
    timelineEyebrow: 'Timeline',
    timelineTitle: 'Years, teachers, generations.',
    timelineSubtitle: 'Every date in this chronicle holds the names of teachers, villages and students who built this school with their own hands.',
    directorsEyebrow: 'Principals through the years',
    directorsTitle: 'People who led the school.',
    directorsSubtitle: 'From 1945 onward, the school\'s leaders have given continuity and direction to this institution, each in their own time.',
    addendumEyebrow: 'Chronicle addendum',
    addendumTitle: 'The opening and reopening of schools in Ana e Malit',
    monographyNote: 'According to the Monograph "Primary School Bedri Elezaga 1869–2019 Katërkollë" — Rexhep Lleshi',
    quoteText: 'Bedri Elezaga was a teacher who believed every child has their own light — our duty as educators is simply to help it shine.',
    quoteAuthor: '— From the memories of his former students, 1972',
    branches: ['Krythë', 'Sukubinë', 'Rashtishë', 'Millë', 'Kravar', 'Shtodër', 'Kllezën', 'Fraskanjel'],
    timeline: [
      { year: '1929', title: 'Opening of the first schools', text: 'The school is founded in the building of the mejtep in Selitë, municipality of Katërkollë. The same year, schools open in Kosiq and Sukubinë. The first teachers: Jozica Mariniq (Selitë), Milenko Guberiniq (Kosiq) and Vllado Miniq (Sukubinë). Lessons were held in a non-native language — Serbian.' },
      { year: '1932', title: 'New school buildings', text: 'New schools are built in Katërkollë–Vlladimir, Krythë and Sukubinë, where lessons are held for grades I–IV. New teachers join the staff, including Andrija and Jullka Uskoviq (Vlladimir), Bosilka Strugar (Krythë) and Jelena Miniq (Sukubinë).' },
      { year: '1941', title: 'Work interrupted', text: 'The schools cease their work due to the capitulation of the old Yugoslavia. Ana e Malit passes under the Administration of Albania, Prefecture of Shkodra.' },
      { year: '1941–1943', title: 'Lessons in the mother tongue', text: 'Despite the harsh wartime conditions, the Albanian Ministry of Education sends pedagogically trained teachers to Katërkollë, Krythë and Sukubinë. For the first time, lessons here are held in the native Albanian language.' },
      { year: 'February 1945', title: 'Restart in Albanian', text: 'The school in Vlladimir continues its work under its first principal, Minja Nikollaidis from Ulqin. 45 boys are enrolled in grades I–IV. The first School Council is formed, chaired by Musa Llolla.' },
      { year: '1945/46', title: 'Temporary schools', text: 'Temporary schools open where teachers work without pay: Ramazan Jahoviq in Krythë, Jullka Nikoliq in Sukubinë, Daut Hoxhiq and Nikolla Nrekiq in Upper Kllezën, Prena Jankoviq in Lower Kllezën and Marko Shkrela in Ambull.' },
      { year: '1946/47', title: 'Local teachers', text: 'After a pedagogical course, teachers from the region itself are appointed. Vlladimir has 4 classes with 195 students, Krytha 2 classes with 146, Sukubina 4 classes with 165 and Ambulli 86 students.' },
      { year: '1947/48', title: 'Seven-grade school', text: 'The school in Vlladimir grows into a seven-grade primary school. Junuz Divanoviqi, a teacher from Tivar, is appointed principal. A new school opens in Kravar with 1 class and 76 students under teacher Meto Cucoviq.' },
      { year: '1948/49', title: 'School in Lower Kllezën', text: 'The school in Lower Kllezën opens, further expanding the network of branch schools across the villages.' },
      { year: '1949/50', title: 'Secretariat and the first generation', text: 'The school in Vlladimir gets its own secretary — from 1951 Shaban Hoxhiq works there full-time. The first generation of the seven-year school graduates: Elez Mustafoviq, Haxhija and Fadil Taipoviq, Sabrija and Xhevdet Holloviq, Shaban Hoxhiq and Vata Elezoviq.' },
      { year: '1951/52', title: 'Eight-grade school', text: 'The school in Vlladimir grows into an eight-grade primary school, adding one class above the previous system.' },
      { year: '1953/54', title: 'School in Millë', text: 'The Primary School in Millë opens with 4 classes and 73 students.' },
      { year: '1956/57', title: 'French language', text: 'French is introduced as a foreign language in the school. It is taught until 1961.' },
      { year: '1958/59', title: 'First local teacher', text: 'Student Rrukije Likoviq graduates and in 1964/65 becomes the first local teacher at the school.' },
      { year: '1961/62', title: 'Russian language', text: 'Russian is introduced as a foreign language in the curriculum. It will be taught until 1992.' },
      { year: 'December 1961', title: 'The name "Bedri Elezaga"', text: 'The Primary School in Vlladimir takes the name of the young revolutionary from Ulqin, Bedri Elezaga.' },
      { year: '1962/63', title: 'School in Shtodër', text: 'The Primary School in Shtodër opens with 4 classes and 71 students. Teachers: Halit Avdiq and Hasan Salaj.' },
      { year: '1964', title: 'School Council', text: 'The first self-governing body — the School Council — is formed, chaired by Faik Cekoviq.' },
      { year: '1966', title: 'Departure of Junuz Divanoviqi', text: 'Principal Junuz Divanoviqi, who contributed greatly to the education of the people of this place through work and self-sacrifice, retires.' },
      { year: '1967/68', title: 'School in Fraskanjel', text: 'The branch school in Fraskanjel opens with 4 classes and 24 students. Teacher: Mehmet Peroviq.' },
      { year: '1972/73', title: 'New building and school in Rashtishë', text: 'The old building is vacated and work continues in the new building, where classes are held in subject rooms. The same year a branch school opens in Rashtishë with 4 classes. Teachers: Idriz Kallaboviq and Osman Mustafoviq.' },
      { year: '1975/76', title: 'Bus transport', text: 'Bus transport is organized to take students to school and back — a great relief for families in distant villages.' },
      { year: '1977/78', title: 'English language', text: 'English is introduced as a second foreign language in the curriculum.' },
      { year: '1979', title: 'School Day', text: 'May 15 is set as School Day — a date still celebrated today.' },
      { year: '1981/82', title: 'School pedagogue', text: 'Sulejman Gjoni begins work as the school pedagogue.' },
      { year: '1982/83', title: 'Five-day week', text: 'A five-day work week is introduced at the school.' },
      { year: '1987/88', title: 'Dental care and meals', text: 'A student dental clinic begins operation. The same year, daily meals for students are organized.' },
      { year: '1989/90', title: 'Best education worker', text: 'School teacher Ibrahim Cucoviq is named the best education worker in the Municipality of Ulqin. He is given a diploma and a monetary award.' },
      { year: '1992', title: 'Public institution', text: 'The school becomes a Public Institution and takes its full name: PI Primary School "Bedri Elezaga" Vlladimir.' },
      { year: '1992/93', title: 'Special calendar and German', text: 'The first special school calendar in Montenegro is introduced, with the same number of weekly teaching days. German is added as a second foreign language.' },
      { year: '1993/94', title: 'School librarian', text: 'Avni Kurti begins working full-time as the school librarian.' },
      { year: '1997', title: 'Tribute to Junuz Divanoviqi', text: 'Organized by the Art Club, an Academy is held in memory and gratitude to former principal Junuz Divanoviqi, on the 50th anniversary of his arrival in Vlladimir.' },
      { year: '1998', title: 'School accountant', text: 'Ilir Lleshi begins working full-time as the school accountant.' },
      { year: '1998/99', title: 'Experimental teaching', text: 'Experimental teaching is introduced in the first grade of the main school.' },
      { year: '2003/04', title: 'Digital era', text: 'The school is equipped with computers and the first computer literacy course is organized.' },
      { year: '2005/06', title: 'Nine-grade school', text: 'The nine-grade primary school program is introduced, starting from first grade.' },
      { year: 'February 2006', title: 'On the web portal', text: 'By order of the Ministry of Education and Science of Montenegro, the school is featured on the Montenegro schools web portal. The text in Albanian and Montenegrin and the Chronicle Excerpt are prepared by deputy principal Rexhep Lleshi; the technical-graphic work and computer typing is done by accountant Ilir Lleshi.' },
    ],
    directors: [
      { name: 'Minja Nikollaidis', period: '1945', note: 'First principal after the War' },
      { name: 'Junuz Divanoviqi', period: '1947–1966', note: 'Teacher from Tivar' },
      { name: 'Sabrija Holloviq', period: '1966–1970' },
      { name: 'Elez Muçoviq', period: '1970–1973 and 1982–1985' },
      { name: 'Faik Cekoviq', period: '1973' },
      { name: 'Xhevdet Holloviq', period: '1973–1977' },
      { name: 'Rexhep Kokaj', period: '1977–1981' },
      { name: 'Idriz Kallaboviq', period: '1981' },
      { name: 'Rexhep Lleshi', period: '1985–1998' },
      { name: 'Nail Draga', period: '1998–2003' },
      { name: 'Ali Muçaj', period: '2003 — present' },
    ],
    addendumParagraphs: [
      'In the School Chronicle and its Excerpt, it is recorded that with the end of the First World War in 1918, this region falls under the rule of the Yugoslav Kingdom, and the first schools in Ana e Malit were opened in 1929 in Selitë, Kosiq and Sukubinë. They operated until the start of the Second World War and the capitulation of that state in 1941.',
      'Even before the war ended, in 1945, Ana e Malit fell under the Administration of Federal People\'s/Socialist Yugoslavia. In February of that year, the school in Katërkollë continued its work and lessons were held for the first time in the mother tongue — Albanian.',
      'But the data discovered later, recorded in the book Monograph "Primary School Bedri Elezaga 1869–2019 Katërkollë" by author Rexhep Lleshi, prove that teaching here, in schools, began much earlier than the Chronicle acknowledges and is connected to the opening of the mejtep — a four-year primary school during the Ottoman Empire, in 1869.',
      'With the start of the Second World War in 1941, like all Albanian-inhabited regions outside the borders of the homeland, Ana e Malit also fell under the Administration of Albania, Prefecture of Shkodra. Despite the harsh living conditions, in the school years 1941/42 and 1942/43, the Albanian Ministry of Education here too, in Ana e Malit and Ulqin, sent pedagogically trained teachers to work with students in the schools in Katërkollë, Krythë and Sukubinë. Thus, in these schools, lessons were held for the first time in the native Albanian language.',
      'Therefore, the Chronicle should be amended to say that here, in Ana e Malit, the school began work in 1869, while in 1929 the schools resumed work. They continued during the War… and teaching in the native Albanian language began in 1941, not 1945.',
    ],
    quotes: [
      { text: 'The school in Katërkollë, the most beautiful in Montenegro and Yugoslavia.', author: 'Shaban Sait Hoxhiqi' },
      { text: '"Bedri Elezaga" Primary School, the temple of knowledge that preserved the language, culture and glorious tradition of the Albanians.', author: 'Gjeke Gjon Gjonaj' },
      { text: 'The school in Katërkollë, the creator of the intellectual elite of the region.', author: 'Hatixhe Gjoni' },
    ],
  },
  mission: {
    missionEyebrow: 'Our Mission',
    missionTitle: 'To raise conscious, creative and self-confident citizens.',
    missionP1: 'We believe primary education is the foundation on which everything is built. Our mission is therefore to create an environment where every child feels safe, loved and able to learn — not out of fear, but out of curiosity.',
    missionP2: 'We prepare children not just for tomorrow\'s exams, but for the life that lies ahead. To do this, we teach them to think critically, to cooperate respectfully, and to see change as an opportunity — not a threat.',
    visionEyebrow: 'Our Vision',
    visionTitle: 'To preserve the roots of Ana e Malit — and to open its branches to the world ahead.',
    visionP1: 'Almost a century after the first teachers came to Selitë, Kosiq and Sukubinë, we aim to remain what generations before us called us — the temple of knowledge that preserves the Albanian language, culture and tradition. The main school and the eight branch schools across the villages keep the same mission alive: to teach children in their mother tongue, leaving no one behind.',
    visionP2: 'But we do not want to be only guardians of the past. We want every student who walks out of our doors — whether from Vlladimir, Krytha, Sukubina or Fraskanjeli — to step into the world: with knowledge of foreign languages, with digital tools in hand, and with the belief that their heritage does not limit them but empowers them for the time to come.',
    valuesEyebrow: 'Our Values',
    valuesTitle: 'Five principles that guide us every day.',
    values: [
      { t: 'Respect', d: 'For every child, teacher and parent — without exception.' },
      { t: 'Responsibility', d: 'For our learning, for our words and for our actions.' },
      { t: 'Curiosity', d: 'We keep alive the desire to ask and to discover.' },
      { t: 'Empathy', d: 'To understand the world from others\' perspectives.' },
      { t: 'Excellence', d: 'We give our best, without demanding perfection.' },
    ],
  },
  staff: {
    eyebrow: 'Staff',
    title: 'The people who bring our school to life.',
    subtitle: 'From leaders to teachers, from professional associates to maintenance staff — each plays an irreplaceable role.',
    empty: 'There are no members in this category.',
    allFilter: 'All',
    categories: {
      school_bodies: 'School Bodies',
      directorate: 'Directorate',
      administration: 'Administrative Staff',
      professional_associates: 'Professional Associates',
      teachers: 'Teachers',
      assistants: 'Assistants',
      maintenance: 'Maintenance Staff',
    },
  },
  students: {
    eyebrow: 'Students',
    title: 'Everything our students need.',
    subtitle: 'Class schedule and school regulations — all in one place.',
    tabSchedule: 'Class Schedule',
    tabRules: 'Regulations',
  },
  schedule: {
    eyebrow: 'Class schedule 2025/26',
    title: 'Weekly schedule',
    subtitle: 'Download the full weekly schedule with subjects, hours and breaks for all classes.',
    cardTitle: 'Weekly schedule (PDF)',
    cardUpdated: 'Updated September 1, 2025',
    btnDownload: 'Download PDF',
  },
  rules: {
    eyebrow: 'Internal regulations',
    title: 'Principles we share together.',
    subtitle: 'These rules are designed to protect the time, comfort and dignity of every student and teacher. They are not restrictions — they are promises we make to one another.',
    sections: [
      { t: 'Attendance and lateness', items: [
        'Students must arrive at school at least 10 minutes before the first class.',
        'Lateness over 15 minutes is recorded as an unjustified absence.',
        'Absences must be justified in writing by the parent within 3 days.',
      ]},
      { t: 'Behavior and communication', items: [
        'We respect teachers, classmates and all school staff.',
        'We use clean and respectful language in every situation.',
        'We seek resolution of disputes through teachers or the school psychologist.',
      ]},
      { t: 'Uniform and appearance', items: [
        'The school uniform is mandatory from Monday to Friday.',
        'Shoes must be clean and suitable for activity.',
        'Large jewelry and makeup are not allowed.',
      ]},
      { t: 'Technology and phones', items: [
        'Phones must be kept on silent during class.',
        'Use of devices is allowed only when instructed by the teacher.',
        'Social networks and games are not allowed on school premises.',
      ]},
      { t: 'Care for the environment', items: [
        'We keep classrooms, hallways and the schoolyard clean.',
        'We recycle paper, plastic and organic waste.',
        'We respect the equipment and books the school provides.',
      ]},
    ],
    fullPdfTitle: 'Full regulations (PDF)',
    fullPdfMeta: '16 pages · Updated September 1, 2025',
    btnDownload: 'Download PDF',
    btnUnavailable: 'File not available',
  },
  documents: {
    eyebrow: 'Documents',
    title: 'School documents and forms.',
    subtitle: 'School calendar, forms, regulations and important documents — all in one place, ready to download.',
    libraryTitle: 'Document library',
    searchPlaceholder: 'Search...',
    allFilter: 'All',
    colName: 'Document name',
    colCategory: 'Category',
    colSize: 'Size',
    colDate: 'Date',
    colActions: 'Actions',
    emptyForSearch: 'No documents for this search.',
    emptyForCategory: 'No documents in this category.',
    actionView: 'View',
    actionDownload: 'Download',
    categoryLabels: {
      calendar: 'Calendar',
      form: 'Form',
      regulation: 'Regulation',
      curriculum: 'Curriculum',
      event: 'Event',
      other: 'Other',
    },
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  },
  news: {
    eyebrow: 'News & Announcements',
    title: "What's happening at our school.",
    subtitle: 'The events, achievements and moments that make every day at "Bedri Elezaga" school special.',
    allFilter: 'All',
    searchPlaceholder: 'Search news...',
    loadError: 'An error occurred while loading the news. Please try again later.',
    emptyDefault: 'No news at the moment.',
    emptyForSearch: 'No news for "{q}".',
    paginationLabel: 'News pages',
    prevPageAria: 'Previous page',
    nextPageAria: 'Next page',
    readArticle: 'Read article',
    categoryLabels: {
      Arritje: 'Achievements',
      Ngjarje: 'Events',
      Lajme: 'News',
      Projekte: 'Projects',
      Sport: 'Sports',
      Tjera: 'Other',
    },
  },
  article: {
    notFoundTitle: 'Article not found',
    errorTitle: 'Something went wrong',
    notFoundMessage: 'This article may have been deleted or the link is incorrect.',
    errorMessage: 'Please try again later.',
    backToAll: 'Back to all news',
    allNews: 'All news',
    shareBtn: 'Share',
    minutesRead: 'min read',
    editor: 'School editorial team',
    editorFallbackName: 'School editorial team',
    galleryTitle: 'Gallery',
    videoTitle: 'Video',
    documentsTitle: 'Documents',
    galleryAria: 'Photo gallery',
    videoAria: 'Video',
    documentsAria: 'Documents',
    relatedEyebrow: 'Keep reading',
    relatedTitle: 'Related news',
    relatedSeeAll: 'See all',
    fileFallback: 'File',
  },
  footer: {
    schoolDescription: 'A place where children grow up with love, knowledge and values that last a lifetime.',
    visitUs: 'Visit us',
    address: '85366 Katërkollë - Ulqin',
    menuTitle: 'Menu',
    hoursTitle: 'Hours',
    hours: [
      { d: 'Monday – Friday', h: '07:45 – 15:30' },
      { d: 'Saturday',        h: 'Closed' },
      { d: 'Sunday',          h: 'Closed' },
    ],
    rights: '© 2026 Primary School "Bedri Elezaga". All rights reserved.',
    menu: {
      home: 'Home',
      about: 'About the School',
      staff: 'Staff',
      students: 'Students',
      documents: 'Documents',
      news: 'News & Announcements',
    },
  },
  teacher: {
    yearsBadge: '{n}+ years',
    yearsExperience: '{n} years experience',
    memberSince: 'Member since {y}',
    factPosition: 'Position',
    factMember: 'Member since',
    factExperience: 'Experience',
    factEmail: 'Email',
    factPhone: 'Phone',
    aboutTitle: 'About {first}',
    noDescription: 'No description available.',
  },
  admin: {
    section: 'Admin',
    nav: {
      dashboard: 'Dashboard',
      news: 'News',
      staff: 'Staff',
      documents: 'Documents',
      settings: 'Settings',
      users: 'Users',
    },
    logout: 'Sign out',
    login: {
      title: 'Sign in to Admin',
      subtitle: 'Bedri Elezaga',
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
    },
    dashboard: {
      welcome: 'Welcome',
      subtitle: 'Pick an action from the side menu or below.',
      newsTitle: 'News',
      newsHint: 'View, create, edit or delete articles',
      staffTitle: 'Staff',
      staffHint: 'Manage members and positions',
      docsTitle: 'Documents',
      docsHint: 'Upload and manage PDF, DOC, DOCX',
      settingsTitle: 'Settings',
      settingsHint: 'Principal, class schedule and regulations',
    },
    common: {
      edit: 'Edit',
      delete: 'Delete',
      browse: 'Browse',
      cancel: 'Cancel',
      remove: 'Remove',
      save: 'Save',
      saveChanges: 'Save changes',
      add: 'Add',
      back: 'Back',
      next: 'Next',
      pageOf: 'Page {page} of {total}',
      totalArticles: '{n} articles in total',
      totalMembers: '{n} members in total',
      totalDocuments: '{n} documents in total',
      totalUsers: '{n} users in total',
      confirmDelete: 'Are you sure you want to delete "{name}"?',
      categoryFilter: 'Category filter',
      role: 'Role',
    },
    news: {
      title: 'News',
      newButton: 'Create new article',
      empty: 'No articles yet.',
      authorBy: 'by {name}',
      createTitle: 'Create article',
      editTitle: 'Edit article',
    },
    staff: {
      title: 'Staff',
      newButton: 'Add member',
      empty: 'No members in this category.',
      sinceShort: '· since {y}',
      createTitle: 'Add staff member',
      editTitle: 'Edit member',
    },
    documents: {
      title: 'Documents',
      newButton: 'Add document',
      empty: 'No documents in this category.',
      createTitle: 'Add document',
      editTitle: 'Edit document',
    },
    users: {
      title: 'Users',
      newButton: 'Add user',
      empty: 'No users.',
      youSuffix: '(you)',
      roleAriaLabel: 'Role',
      confirmDelete: 'Delete "{name}"?',
      roleRegular: 'Regular',
      roleAdmin: 'Admin',
      roleRegularLong: 'Regular user',
      roleAdminLong: 'Administrator',
      createTitle: 'Add user',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
    },
    settings: {
      title: 'Settings',
      subtitle: 'School details and files shown publicly.',
      schoolDataHeading: 'School details',
      directorName: 'Principal name',
      directorPlaceholder: 'e.g. Mustafe Bardhi',
      filesHeading: 'Public files',
      timetable: 'Class schedule',
      rules: 'School regulations',
      fileHint: 'PDF, DOC or DOCX — max 25 MB',
      currentFile: 'Current file',
      pendingUpload: '{size} · will be uploaded on save',
      willBeRemoved: 'The file will be removed on save.',
      replaceFile: 'Replace file',
      uploadFile: 'Click or drop the file',
      onlyAllowedFiles: 'Only PDF, DOC or DOCX are allowed',
      passwordHeading: 'My account',
      passwordSubtitle: 'Change your password.',
      currentPassword: 'Current password',
      newPassword: 'New password',
      confirmPassword: 'Confirm password',
      changeBtn: 'Change password',
    },
    forms: {
      news: {
        titleField: 'Title',
        category: 'Category',
        publishedAt: 'Publish date',
        cover: 'Cover image',
        content: 'Content (paragraphs)',
        addParagraph: '+ Add paragraph',
        paragraphPlaceholder: 'Paragraph {n}',
        attachments: 'Attachments',
        attachmentsHint: 'Photos, videos, PDF, DOC — multiple at once',
        replaceCover: 'Replace cover image',
        uploadCover: 'Click or drop the cover image',
        coverHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        coverMustBeImage: 'Cover image must be an image',
        coverRequired: 'Cover image is required',
        currentPhoto: 'Current photo',
        replaceHint: 'Drop or click below to replace',
        publish: 'Publish',
        existing: 'existing',
        uploading: 'Uploading...',
        uploaded: 'Uploaded',
        errorPrefix: 'Error: {msg}',
        attachmentsClickOrDrag: 'Click or drop files',
        photo: 'Photo',
      },
      staff: {
        fullName: 'Full name',
        position: 'Position',
        category: 'Category',
        memberSinceLabel: 'Member since (year)',
        emailOpt: 'Email (optional)',
        phoneOpt: 'Phone (optional)',
        descriptionOpt: 'Description (optional)',
        photo: 'Photo',
        replacePhoto: 'Replace photo',
        uploadPhoto: 'Click or drop the photo',
        photoHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        photoMustBeImage: 'Photo must be an image',
        photoRequired: 'Photo is required',
      },
      documents: {
        nameField: 'Name',
        category: 'Category',
        file: 'File',
        replaceFile: 'Replace file',
        uploadFile: 'Click or drop the file',
        fileHint: 'PDF, DOC, DOCX — max 25 MB',
        onlyAllowed: 'Only PDF, DOC or DOCX are allowed',
        fileRequired: 'File is required',
      },
    },
    errors: {
      required: 'Required',
      invalidEmail: 'Invalid email',
      passwordRequired: 'Password is required',
      min2: 'Min 2 characters',
      min8: 'At least 8 characters',
      uppercase: 'Needs an uppercase letter',
      lowercase: 'Needs a lowercase letter',
      digit: 'Needs a digit',
      special: 'Needs a special character',
      passwordsDontMatch: 'Passwords do not match',
      newPasswordSameAsOld: 'New password must differ from the current one',
      titleRequired: 'Title is required',
      nameRequired: 'Name is required',
      positionRequired: 'Position is required',
      dateRequired: 'Date is required',
      atLeastOneParagraph: 'At least one paragraph must contain text',
      max120: 'Max 120 characters',
      max200: 'Max 200 characters',
      max255: 'Max 255 characters',
      max2000: 'Max 2000 characters',
      max40: 'Max 40 characters',
      invalidYear: 'Invalid year',
      yearMin1900: 'Year must be ≥ 1900',
      yearMaxNow: 'Year cannot be in the future',
      phoneTooShort: 'Phone number is too short',
    },
  },
};

// ---------------------------------------------------------------------------
// Montenegrin (Latin)
// ---------------------------------------------------------------------------
const me: Dict = {
  common: {
    readMore: 'Pročitaj više',
    seeAll: 'Vidi sve',
    back: 'Nazad',
    next: 'Naprijed',
    previous: 'Prethodna',
    page: 'Strana',
    of: 'od',
    person_one: 'osoba',
    person_other: 'osoba',
    document_one: 'dokument',
    document_other: 'dokumenata',
    loading: 'Učitavanje…',
    errorGeneric: 'Došlo je do greške',
    download: 'Preuzmi',
    view: 'Pregledaj',
    share: 'Podijeli',
    linkCopied: 'Link je kopiran',
    linkCopyFailed: 'Nije moguće kopirati link',
    schoolFullName: 'Osnovna škola "Bedri Elezaga"',
    schoolShortName: 'Bedri Elezaga',
    schoolTagline: 'Osnovna škola · osnovana 1992.',
  },
  nav: {
    home: 'Početna',
    about: 'O školi',
    aboutHistoryTitle: 'Istorijat škole',
    aboutHistorySub: 'Od 1968. do danas',
    aboutMissionTitle: 'Misija i vizija',
    aboutMissionSub: 'Vrijednosti koje nas vode',
    aboutOverview: 'Pregled',
    staff: 'Osoblje',
    students: 'Učenici',
    studentsScheduleTitle: 'Raspored časova',
    studentsScheduleSub: 'Sedmični raspored po razredima',
    studentsRulesTitle: 'Pravilnik',
    studentsRulesSub: 'Školska pravila',
    studentsLibraryTitle: 'Biblioteka',
    studentsLibrarySub: 'Naša digitalna biblioteka',
    documents: 'Dokumenti',
    news: 'Vijesti',
    contact: 'Kontakt',
    enroll: 'Upiši se',
    language: 'Jezik',
  },
  home: {
    schoolYear: 'Školska godina',
    heroTitleA: 'Škola u kojoj svako dijete',
    heroTitleB: 'pronalazi svoju svjetlost.',
    heroSubtitle: 'U srcu Ane e Malita, Osnovna škola "Bedri Elezaga" generacijama uči djecu na maternjem albanskom jeziku — kroz mrežu škola koja povezuje čitava sela u jednu obrazovnu porodicu.',
    btnAboutUs: 'Upoznajte nas',
    btnLatestNews: 'Najnovije vijesti',
    statFounded: 'Osnovana',
    statSchools: 'Škola',
    statYears: 'Godina nastave',
    photoYard: 'Fotografija školskog dvorišta',
    photoClass: 'Učenici u učionici',
    sinceBadge: 'Od 1929.',
    quotesEyebrow: 'Riječi koje nas vode',
    introEyebrow: 'Predstavljanje',
    introBadge: 'Porodica, a ne samo škola',
    introTitle: 'Učimo za život, zajedno.',
    introP1: 'Skoro čitav vijek, Osnovna škola "Bedri Elezaga" bila je drugi dom čitavim generacijama djece Ane e Malita. Ovdje svaki dan počinje radoznalošću, a završava novim znanjem — na jeziku koji su donijeli prvi učitelji 1941. godine.',
    introP2: 'Matična škola u Vladimiru i osam izdvojenih odjeljenja — u Krythi, Sukubinu, Raštišu, Milama, Kravaru, Štodru, Klezni i Fraskanjelu — čine jedinstvenu obrazovnu mrežu. Ova mreža osigurava da nijedno dijete Ane e Malita, koliko god udaljeno, ne ostane bez škole na svom jeziku.',
    introP3: 'Naša misija je jednostavna i jasna: nastaviti ono što su prvi učitelji započeli 1929. — pripremiti svjesne, kreativne i samouvjerene građane, sa dostojanstvom, ljubavlju prema maternjem jeziku i radoznalošću prema svijetu koji dolazi.',
    directorRole: 'Direktor',
    newsEyebrow: 'Naša svakodnevica',
    newsTitle: 'Najnovije vijesti i aktivnosti',
    newsEmpty: 'Trenutno nema vijesti.',
    valuesCare: { t: 'Briga', d: 'Topla sredina u kojoj se svako dijete osjeća sigurno i viđeno.' },
    valuesKnowledge: { t: 'Znanje', d: 'Bogat program koji hrani prirodnu radoznalost djece.' },
    valuesCommunity: { t: 'Zajednica', d: 'Roditelji, nastavnici i učenici koji rade kao jedna porodica.' },
    valuesCreativity: { t: 'Kreativnost', d: 'Umjetnost, muzika i nauka kao alati za istraživanje svijeta.' },
  },
  about: {
    eyebrow: 'O školi',
    title: 'Dom u kojem znanje raste s ljubavlju.',
    subtitle: 'Upoznajte istoriju, misiju i vrijednosti koje nas vode više od pet decenija.',
    tabHistory: 'Istorijat škole',
    tabMission: 'Misija i vizija',
  },
  history: {
    extractEyebrow: 'Izvod iz Hronike',
    extractTitleA: 'Nasljeđe koje teče od godine',
    extractTitleYear: '1869.',
    extractTitleB: '',
    extractParagraph: 'JU Osnovna škola "Bedri Elezaga" u Vladimiru, opština Ulcinj, sastoji se od matične škole i osam izdvojenih odjeljenja po selima Ane e Malita. Ovo je njen put — od mejtepa u Selitu do današnje ustanove.',
    branchesLabel: 'Izdvojena odjeljenja',
    fact1869L: 'Prva godina nastave',
    fact1869S: 'Mejtep u Katërkollu',
    fact1945L: 'Nastava na albanskom',
    fact1945S: 'Nastavak poslije Rata',
    fact1961L: 'Naziv "Bedri Elezaga"',
    fact1961S: 'U čast revolucionara iz Ulcinja',
    timelineEyebrow: 'Hronologija',
    timelineTitle: 'Godine, učitelji, generacije.',
    timelineSubtitle: 'Svaki datum u ovoj hronici nosi imena učitelja, sela i učenika koji su svojim rukama gradili ovu školu.',
    directorsEyebrow: 'Direktori kroz godine',
    directorsTitle: 'Ljudi koji su vodili školu.',
    directorsSubtitle: 'Od 1945. nadalje, rukovodioci škole davali su kontinuitet i smjer ovoj ustanovi, svako u svom vremenu.',
    addendumEyebrow: 'Dopuna hronike',
    addendumTitle: 'Otvaranje i ponovno otvaranje škola u Ani e Malitu',
    monographyNote: 'Prema Monografiji "Osnovna škola Bedri Elezaga 1869–2019 Katërkollë" — Rexhep Lleshi',
    quoteText: 'Bedri Elezaga je bio učitelj koji je vjerovao da svako dijete ima svoju svjetlost — naša dužnost kao vaspitača je samo da mu pomognemo da zasija.',
    quoteAuthor: '— Iz sjećanja njegovih nekadašnjih učenika, 1972.',
    branches: ['Krythë', 'Sukubinë', 'Rashtishë', 'Millë', 'Kravar', 'Shtodër', 'Kllezën', 'Fraskanjel'],
    timeline: [
      { year: '1929.', title: 'Otvaranje prvih škola', text: 'Škola se osniva u zgradi mejtepa u Selitu, opština Katërkollë. Iste godine otvaraju se škole u Kosiqu i Sukubinu. Prvi učitelji: Jozica Mariniq (Selitë), Milenko Guberiniq (Kosiq) i Vllado Miniq (Sukubinë). Nastava se izvodila na nematernjem jeziku — srpskom.' },
      { year: '1932.', title: 'Nove školske zgrade', text: 'Grade se nove škole u Katërkollu–Vladimiru, Krythi i Sukubinu, gdje se izvodi nastava za razrede I–IV. Novi učitelji se pridružuju kolektivu, među njima Andrija i Jullka Uskoviq (Vladimir), Bosilka Strugar (Krythë) i Jelena Miniq (Sukubinë).' },
      { year: '1941.', title: 'Prekid rada', text: 'Škole prekidaju rad zbog kapitulacije stare Jugoslavije. Ana e Malita prelazi pod Upravu Albanije, Prefekture Skadra.' },
      { year: '1941–1943.', title: 'Nastava na maternjem jeziku', text: 'Uprkos teškim ratnim uslovima, Ministarstvo prosvjete Albanije šalje pedagoški obučene učitelje u Katërkollë, Krythu i Sukubinu. Po prvi put, nastava se ovdje izvodi na maternjem albanskom jeziku.' },
      { year: 'Februar 1945.', title: 'Ponovni početak na albanskom', text: 'Škola u Vladimiru nastavlja rad pod prvim direktorom Minja Nikollaidisom iz Ulcinja. U razredima I–IV upisano je 45 dječaka. Formira se prvi Školski savjet sa predsjednikom Musom Llollom.' },
      { year: '1945/46.', title: 'Privremene škole', text: 'Otvaraju se privremene škole u kojima učitelji rade bez plate: Ramazan Jahoviq u Krythi, Jullka Nikoliq u Sukubinu, Daut Hoxhiq i Nikolla Nrekiq u Gornjoj Klezni, Prena Jankoviq u Donjoj Klezni i Marko Shkrela u Ambullu.' },
      { year: '1946/47.', title: 'Učitelji iz regiona', text: 'Nakon pedagoškog kursa, postavljaju se učitelji iz samog regiona. Vladimir ima 4 razreda sa 195 učenika, Krytha 2 razreda sa 146, Sukubina 4 razreda sa 165 i Ambulli 86 učenika.' },
      { year: '1947/48.', title: 'Sedmorazredna škola', text: 'Škola u Vladimiru prerasta u sedmorazrednu osnovnu školu. Za direktora se postavlja Junuz Divanoviqi, učitelj iz Bara. Otvara se nova škola u Kravaru sa 1 razredom i 76 učenika pod učiteljem Metom Cucoviqem.' },
      { year: '1948/49.', title: 'Škola u Donjoj Klezni', text: 'Otvara se škola u Donjoj Klezni, čime se dalje širi mreža izdvojenih odjeljenja po selima.' },
      { year: '1949/50.', title: 'Sekretarijat i prva generacija', text: 'Škola u Vladimiru dobija svog sekretara — od 1951. punim radnim vremenom radi Shaban Hoxhiq. Diplomira prva generacija sedmogodišnje škole: Elez Mustafoviq, Haxhija i Fadil Taipoviq, Sabrija i Xhevdet Holloviq, Shaban Hoxhiq i Vata Elezoviq.' },
      { year: '1951/52.', title: 'Osmorazredna škola', text: 'Škola u Vladimiru prerasta u osmorazrednu osnovnu školu, dodajući jedan razred iznad ranijeg sistema.' },
      { year: '1953/54.', title: 'Škola u Milama', text: 'Otvara se Osnovna škola u Milama sa 4 razreda i 73 učenika.' },
      { year: '1956/57.', title: 'Francuski jezik', text: 'U školu se uvodi francuski kao strani jezik. Uči se do 1961. godine.' },
      { year: '1958/59.', title: 'Prva mještanka učiteljica', text: 'Diplomira učenica Rrukije Likoviq, koja će 1964/65. postati prva učiteljica iz mjesta u školi.' },
      { year: '1961/62.', title: 'Ruski jezik', text: 'U školski program uvodi se ruski kao strani jezik. Učiće se do 1992.' },
      { year: 'Decembar 1961.', title: 'Naziv "Bedri Elezaga"', text: 'Osnovna škola u Vladimiru dobija ime mladog revolucionara iz Ulcinja, Bedrija Elezage.' },
      { year: '1962/63.', title: 'Škola u Štodru', text: 'Otvara se Osnovna škola u Štodru sa 4 razreda i 71 učenikom. Učitelji: Halit Avdiq i Hasan Salaj.' },
      { year: '1964.', title: 'Školski savjet', text: 'Formira se prvi samoupravni organ — Školski savjet, sa predsjednikom Faikom Cekoviqem.' },
      { year: '1966.', title: 'Odlazak Junuza Divanoviqija', text: 'Direktor Junuz Divanoviqi, koji je velikim trudom i samopožrtvovanjem doprinio obrazovanju ljudi ovog kraja, odlazi u penziju.' },
      { year: '1967/68.', title: 'Škola u Fraskanjelu', text: 'Otvara se izdvojeno odjeljenje u Fraskanjelu sa 4 razreda i 24 učenika. Učitelj: Mehmet Peroviq.' },
      { year: '1972/73.', title: 'Nova zgrada i škola u Raštišu', text: 'Napušta se stara zgrada i rad se nastavlja u novom objektu, gdje se nastava organizuje u kabinetima. Iste godine otvara se izdvojeno odjeljenje u Raštišu sa 4 razreda. Učitelji: Idriz Kallaboviq i Osman Mustafoviq.' },
      { year: '1975/76.', title: 'Prevoz autobusom', text: 'Organizuje se prevoz učenika autobusom do škole i nazad — veliko olakšanje za porodice iz udaljenih sela.' },
      { year: '1977/78.', title: 'Engleski jezik', text: 'Engleski se uvodi kao drugi strani jezik u nastavnom programu.' },
      { year: '1979.', title: 'Dan škole', text: 'Određuje se 15. maj kao Dan škole — datum koji se i danas slavi.' },
      { year: '1981/82.', title: 'Pedagog škole', text: 'Sulejman Gjoni počinje rad kao pedagog škole.' },
      { year: '1982/83.', title: 'Petodnevna sedmica', text: 'U školi se uvodi petodnevna radna sedmica.' },
      { year: '1987/88.', title: 'Stomatologija i ishrana', text: 'Počinje rad učeničke stomatološke ambulante. Iste godine organizuje se svakodnevna ishrana učenika.' },
      { year: '1989/90.', title: 'Najbolji prosvjetni radnik', text: 'Učitelj škole Ibrahim Cucoviq proglašava se najboljim prosvjetnim radnikom Opštine Ulcinj. Dobija diplomu i novčanu nagradu.' },
      { year: '1992.', title: 'Javna ustanova', text: 'Škola postaje Javna ustanova i dobija puno ime: JU Osnovna škola "Bedri Elezaga" Vladimir.' },
      { year: '1992/93.', title: 'Poseban kalendar i njemački', text: 'Uvodi se prvi poseban školski kalendar u Crnoj Gori, sa istim brojem nastavnih dana sedmično. Njemački se dodaje kao drugi strani jezik.' },
      { year: '1993/94.', title: 'Bibliotekar škole', text: 'Avni Kurti počinje rad punim radnim vremenom kao bibliotekar škole.' },
      { year: '1997.', title: 'Počast Junuzu Divanoviqu', text: 'U organizaciji Art Cluba, održava se Akademija u znak sjećanja i zahvalnosti bivšem direktoru Junuzu Divanoviqu, povodom 50-godišnjice njegovog dolaska u Vladimir.' },
      { year: '1998.', title: 'Računovođa škole', text: 'Ilir Lleshi počinje rad punim radnim vremenom kao računovođa škole.' },
      { year: '1998/99.', title: 'Eksperimentalna nastava', text: 'Uvodi se eksperimentalna nastava u prvom razredu matične škole.' },
      { year: '2003/04.', title: 'Digitalna era', text: 'Škola se opskrbljuje računarima i organizuje se prvi kurs rada na računaru.' },
      { year: '2005/06.', title: 'Devetorazredna škola', text: 'Uvodi se nastavni program devetorazredne osnovne škole, počev od prvog razreda.' },
      { year: 'Februar 2006.', title: 'Na web portalu', text: 'Po nalogu Ministarstva prosvjete i nauke Crne Gore, škola se predstavlja na Web portalu škola Crne Gore. Tekst na albanskom i crnogorskom, Izvod iz Hronike i drugo priprema pomoćnik direktora Rexhep Lleshi; tehničko-grafičke poslove i kompjutersko unošenje obavlja računovođa Ilir Lleshi.' },
    ],
    directors: [
      { name: 'Minja Nikollaidis', period: '1945.', note: 'Prvi direktor poslije Rata' },
      { name: 'Junuz Divanoviqi', period: '1947–1966.', note: 'Učitelj iz Bara' },
      { name: 'Sabrija Holloviq', period: '1966–1970.' },
      { name: 'Elez Muçoviq', period: '1970–1973. i 1982–1985.' },
      { name: 'Faik Cekoviq', period: '1973.' },
      { name: 'Xhevdet Holloviq', period: '1973–1977.' },
      { name: 'Rexhep Kokaj', period: '1977–1981.' },
      { name: 'Idriz Kallaboviq', period: '1981.' },
      { name: 'Rexhep Lleshi', period: '1985–1998.' },
      { name: 'Nail Draga', period: '1998–2003.' },
      { name: 'Ali Muçaj', period: '2003. — danas' },
    ],
    addendumParagraphs: [
      'U Hronici škole i njenom Izvodu navodi se da je završetkom Prvog svjetskog rata 1918. godine ovaj kraj potpao pod vlast Kraljevine Jugoslavije i da su prve škole u Ani e Malitu otvorene 1929. u Selitu, Kosiqu i Sukubinu. Iste su radile do početka Drugog svjetskog rata i kapitulacije te države 1941.',
      'Još prije završetka rata, 1945. godine, Ana e Malita potpada pod Upravu Federativne Narodne/Socijalističke Jugoslavije. U februaru te godine, škola u Katërkollu nastavlja rad i nastava se po prvi put održava na maternjem — albanskom jeziku.',
      'Ali kasnije pronađeni podaci, zabilježeni u knjizi Monografija "Osnovna škola Bedri Elezaga 1869–2019 Katërkollë" autora Rexhepa Lleshija, dokazuju da je nastava ovdje, u školama, počela mnogo prije nego što Hronika priznaje i vezuje se za otvaranje mejtepa — četvorogodišnje osnovne škole, u vrijeme Osmanskog carstva, 1869. godine.',
      'Sa početkom Drugog svjetskog rata 1941, kao i sve albanske oblasti izvan granice matične države, i Ana e Malita potpada pod Upravu Albanije, Prefekture Skadra. Uprkos teškim životnim okolnostima, u školskim godinama 1941/42. i 1942/43, Ministarstvo prosvjete Albanije i ovdje, u Ani e Malitu i Ulcinju, šalje pedagoški obučene učitelje za rad sa učenicima u školama u Katërkollu, Krythi i Sukubinu. Tako se u tim školama po prvi put nastava izvodi na maternjem albanskom jeziku.',
      'Stoga, Hronici treba dopuniti i reći da je ovdje, u Ani e Malitu, škola počela rad 1869, a 1929. su škole rad nastavile. Nastavile su ga i tokom Rata… a nastava na maternjem albanskom jeziku počela je 1941, a ne 1945. godine.',
    ],
    quotes: [
      { text: 'Škola u Katërkollu je najljepša u Crnoj Gori i Jugoslaviji.', author: 'Shaban Sait Hoxhiqi' },
      { text: 'Osnovna škola "Bedri Elezaga", hram znanja koji je sačuvao jezik, kulturu i slavnu albansku tradiciju.', author: 'Gjeke Gjon Gjonaj' },
      { text: 'Škola u Katërkollu, stvaralac intelektualne elite regiona.', author: 'Hatixhe Gjoni' },
    ],
  },
  mission: {
    missionEyebrow: 'Naša misija',
    missionTitle: 'Da odgajamo svjesne, kreativne i samouvjerene građane.',
    missionP1: 'Vjerujemo da je osnovno obrazovanje temelj na kojem se sve gradi. Zato je naša misija da stvorimo sredinu u kojoj se svako dijete osjeća sigurno, voljeno i sposobno da uči — ne iz straha, već iz radoznalosti.',
    missionP2: 'Pripremamo djecu ne samo za sjutrašnje ispite, već i za život koji dolazi. Zato ih učimo da kritički razmišljaju, da sarađuju s poštovanjem i da promjenu vide kao priliku — a ne kao prijetnju.',
    visionEyebrow: 'Naša vizija',
    visionTitle: 'Da sačuvamo korijene Ane e Malita — i otvorimo grane prema svijetu koji dolazi.',
    visionP1: 'Skoro vijek nakon prvih učitelja koji su došli u Selitu, Kosiq i Sukubinu, želimo da ostanemo ono što su nas zvale generacije prije nas — hram znanja koji čuva albanski jezik, kulturu i tradiciju. Matična škola i osam izdvojenih odjeljenja po selima održavaju istu misiju: učiti djecu na njihovom maternjem jeziku, ne ostavljajući nikoga iza.',
    visionP2: 'Ali ne želimo biti samo čuvari prošlosti. Želimo da svaki učenik koji izađe iz naših vrata — bilo iz Vladimira, Krythe, Sukubine ili Fraskanjela — istupi otvoren ka svijetu: sa znanjem stranih jezika, sa digitalnim alatima u rukama, i sa uvjerenjem da ga njegovo nasljeđe ne ograničava, već osnažuje za vrijeme koje dolazi.',
    valuesEyebrow: 'Naše vrijednosti',
    valuesTitle: 'Pet principa koji nas vode svaki dan.',
    values: [
      { t: 'Poštovanje', d: 'Prema svakom djetetu, učitelju i roditelju — bez izuzetka.' },
      { t: 'Odgovornost', d: 'Za naše učenje, naše riječi i naša djela.' },
      { t: 'Radoznalost', d: 'Održavamo živom želju da pitamo i otkrivamo.' },
      { t: 'Empatija', d: 'Da svijet razumijemo iz tuđe perspektive.' },
      { t: 'Izvrsnost', d: 'Dajemo najbolje od sebe, ne tražeći savršenstvo.' },
    ],
  },
  staff: {
    eyebrow: 'Osoblje',
    title: 'Ljudi koji našu školu čine živom.',
    subtitle: 'Od rukovodilaca do nastavnika, od stručnih saradnika do osoblja održavanja — svako igra nezamjenljivu ulogu.',
    empty: 'U ovoj kategoriji nema članova.',
    allFilter: 'Svi',
    categories: {
      school_bodies: 'Organi škole',
      directorate: 'Direkcija',
      administration: 'Administrativno osoblje',
      professional_associates: 'Stručni saradnici',
      teachers: 'Nastavnici',
      assistants: 'Asistenti',
      maintenance: 'Osoblje održavanja',
    },
  },
  students: {
    eyebrow: 'Učenici',
    title: 'Sve što našim učenicima treba.',
    subtitle: 'Raspored časova i školski pravilnik — sve na jednom mjestu.',
    tabSchedule: 'Raspored časova',
    tabRules: 'Pravilnik',
  },
  schedule: {
    eyebrow: 'Raspored časova 2025/26',
    title: 'Sedmični raspored',
    subtitle: 'Preuzmite kompletan sedmični raspored sa predmetima, časovima i odmorima za sve razrede.',
    cardTitle: 'Sedmični raspored (PDF)',
    cardUpdated: 'Ažurirano 1. septembra 2025.',
    btnDownload: 'Preuzmi PDF',
  },
  rules: {
    eyebrow: 'Interni pravilnik',
    title: 'Načela koja zajedno dijelimo.',
    subtitle: 'Ova pravila stvorena su da zaštite vrijeme, udobnost i dostojanstvo svakog učenika i nastavnika. Ona nisu ograničenja — ona su obećanja koja dajemo jedni drugima.',
    sections: [
      { t: 'Prisustvo i kašnjenje', items: [
        'Učenici moraju doći u školu najmanje 10 minuta prije početka prvog časa.',
        'Kašnjenje preko 15 minuta evidentira se kao neopravdani izostanak.',
        'Izostanci se moraju opravdati pisanim putem od strane roditelja u roku od 3 dana.',
      ]},
      { t: 'Ponašanje i komunikacija', items: [
        'Poštujemo nastavnike, vršnjake i sve školsko osoblje.',
        'Koristimo čist i kulturan jezik u svakoj situaciji.',
        'Rješavanje sporova tražimo kod nastavnika ili psihologa.',
      ]},
      { t: 'Uniforma i izgled', items: [
        'Školska uniforma je obavezna od ponedjeljka do petka.',
        'Obuća mora biti čista i prikladna za aktivnosti.',
        'Velik nakit i šminka nisu dozvoljeni.',
      ]},
      { t: 'Tehnologija i telefoni', items: [
        'Telefoni moraju biti utišani tokom časa.',
        'Korišćenje uređaja dozvoljeno je samo po uputstvu nastavnika.',
        'Društvene mreže i igrice nisu dozvoljene u prostorijama škole.',
      ]},
      { t: 'Briga o okolini', items: [
        'Održavamo čistim učionice, hodnike i dvorište.',
        'Recikliramo papir, plastiku i organski otpad.',
        'Poštujemo opremu i knjige koje nam škola pruža.',
      ]},
    ],
    fullPdfTitle: 'Cjelokupan pravilnik (PDF)',
    fullPdfMeta: '16 strana · Ažurirano 1. septembra 2025.',
    btnDownload: 'Preuzmi PDF',
    btnUnavailable: 'Datoteka nije dostupna',
  },
  documents: {
    eyebrow: 'Dokumenti',
    title: 'Dokumenti i obrasci škole.',
    subtitle: 'Školski kalendar, obrasci, pravilnici i važni dokumenti — sve na jednom mjestu, spremno za preuzimanje.',
    libraryTitle: 'Biblioteka dokumenata',
    searchPlaceholder: 'Pretraga...',
    allFilter: 'Svi',
    colName: 'Naziv dokumenta',
    colCategory: 'Kategorija',
    colSize: 'Veličina',
    colDate: 'Datum',
    colActions: 'Radnje',
    emptyForSearch: 'Nema dokumenata za ovu pretragu.',
    emptyForCategory: 'Nema dokumenata u ovoj kategoriji.',
    actionView: 'Pregledaj',
    actionDownload: 'Preuzmi',
    categoryLabels: {
      calendar: 'Kalendar',
      form: 'Obrazac',
      regulation: 'Pravilnik',
      curriculum: 'Nastavni plan',
      event: 'Događaj',
      other: 'Ostalo',
    },
    months: ['januar','februar','mart','april','maj','jun','jul','avgust','septembar','oktobar','novembar','decembar'],
  },
  news: {
    eyebrow: 'Vijesti i obavještenja',
    title: 'Šta se dešava u našoj školi.',
    subtitle: 'Događaji, postignuća i trenuci koji svaki dan u školi "Bedri Elezaga" čine posebnim.',
    allFilter: 'Sve',
    searchPlaceholder: 'Pretraži vijesti...',
    loadError: 'Došlo je do greške pri učitavanju vijesti. Pokušajte ponovo kasnije.',
    emptyDefault: 'Trenutno nema vijesti.',
    emptyForSearch: 'Nema vijesti za "{q}".',
    paginationLabel: 'Stranice vijesti',
    prevPageAria: 'Prethodna stranica',
    nextPageAria: 'Sljedeća stranica',
    readArticle: 'Pročitaj članak',
    categoryLabels: {
      Arritje: 'Postignuća',
      Ngjarje: 'Događaji',
      Lajme: 'Vijesti',
      Projekte: 'Projekti',
      Sport: 'Sport',
      Tjera: 'Ostalo',
    },
  },
  article: {
    notFoundTitle: 'Vijest nije pronađena',
    errorTitle: 'Došlo je do greške',
    notFoundMessage: 'Ova vijest je možda obrisana ili je link netačan.',
    errorMessage: 'Pokušajte ponovo kasnije.',
    backToAll: 'Nazad na sve vijesti',
    allNews: 'Sve vijesti',
    shareBtn: 'Podijeli',
    minutesRead: 'min čitanja',
    editor: 'Školska redakcija',
    editorFallbackName: 'Školska redakcija',
    galleryTitle: 'Galerija',
    videoTitle: 'Video',
    documentsTitle: 'Dokumenti',
    galleryAria: 'Galerija fotografija',
    videoAria: 'Video',
    documentsAria: 'Dokumenti',
    relatedEyebrow: 'Nastavite čitati',
    relatedTitle: 'Slične vijesti',
    relatedSeeAll: 'Vidi sve',
    fileFallback: 'Datoteka',
  },
  footer: {
    schoolDescription: 'Mjesto gdje djeca odrastaju s ljubavlju, znanjem i vrijednostima koje traju cijelog života.',
    visitUs: 'Posjetite nas',
    address: '85366 Katërkollë - Ulcinj',
    menuTitle: 'Meni',
    hoursTitle: 'Radno vrijeme',
    hours: [
      { d: 'Ponedjeljak – Petak', h: '07:45 – 15:30' },
      { d: 'Subota',              h: 'Zatvoreno' },
      { d: 'Nedjelja',            h: 'Zatvoreno' },
    ],
    rights: '© 2026. Osnovna škola "Bedri Elezaga". Sva prava zadržana.',
    menu: {
      home: 'Početna',
      about: 'O školi',
      staff: 'Osoblje',
      students: 'Učenici',
      documents: 'Dokumenti',
      news: 'Vijesti i obavještenja',
    },
  },
  teacher: {
    yearsBadge: '{n}+ god.',
    yearsExperience: '{n} godina iskustva',
    memberSince: 'Član od {y}.',
    factPosition: 'Pozicija',
    factMember: 'Član od',
    factExperience: 'Iskustvo',
    factEmail: 'Email',
    factPhone: 'Telefon',
    aboutTitle: 'O {first}',
    noDescription: 'Opis nije dostupan.',
  },
  admin: {
    section: 'Admin',
    nav: {
      dashboard: 'Komandna tabla',
      news: 'Vijesti',
      staff: 'Osoblje',
      documents: 'Dokumenti',
      settings: 'Podešavanja',
      users: 'Korisnici',
    },
    logout: 'Odjavi se',
    login: {
      title: 'Prijava na Admin',
      subtitle: 'Bedri Elezaga',
      email: 'Email',
      password: 'Lozinka',
      submit: 'Prijavi se',
    },
    dashboard: {
      welcome: 'Dobrodošli',
      subtitle: 'Izaberite radnju iz bočnog menija ili ispod.',
      newsTitle: 'Vijesti',
      newsHint: 'Pregledaj, kreiraj, uredi ili obriši članke',
      staffTitle: 'Osoblje',
      staffHint: 'Upravljaj članovima i pozicijama',
      docsTitle: 'Dokumenti',
      docsHint: 'Otpremi i upravljaj PDF, DOC, DOCX',
      settingsTitle: 'Podešavanja',
      settingsHint: 'Direktor, raspored časova i pravilnik',
    },
    common: {
      edit: 'Uredi',
      delete: 'Obriši',
      browse: 'Pregledaj',
      cancel: 'Otkaži',
      remove: 'Ukloni',
      save: 'Sačuvaj',
      saveChanges: 'Sačuvaj izmjene',
      add: 'Dodaj',
      back: 'Nazad',
      next: 'Naprijed',
      pageOf: 'Strana {page} od {total}',
      totalArticles: 'Ukupno {n} članaka',
      totalMembers: 'Ukupno {n} članova',
      totalDocuments: 'Ukupno {n} dokumenata',
      totalUsers: 'Ukupno {n} korisnika',
      confirmDelete: 'Da li ste sigurni da želite obrisati "{name}"?',
      categoryFilter: 'Filter kategorije',
      role: 'Uloga',
    },
    news: {
      title: 'Vijesti',
      newButton: 'Kreiraj novu vijest',
      empty: 'Još nema članaka.',
      authorBy: 'od {name}',
      createTitle: 'Kreiraj vijest',
      editTitle: 'Uredi vijest',
    },
    staff: {
      title: 'Osoblje',
      newButton: 'Dodaj člana',
      empty: 'Nema članova u ovoj kategoriji.',
      sinceShort: '· od {y}.',
      createTitle: 'Dodaj člana osoblja',
      editTitle: 'Uredi člana',
    },
    documents: {
      title: 'Dokumenti',
      newButton: 'Dodaj dokument',
      empty: 'Nema dokumenata u ovoj kategoriji.',
      createTitle: 'Dodaj dokument',
      editTitle: 'Uredi dokument',
    },
    users: {
      title: 'Korisnici',
      newButton: 'Dodaj korisnika',
      empty: 'Nema korisnika.',
      youSuffix: '(vi)',
      roleAriaLabel: 'Uloga',
      confirmDelete: 'Obrisati "{name}"?',
      roleRegular: 'Običan',
      roleAdmin: 'Admin',
      roleRegularLong: 'Običan korisnik',
      roleAdminLong: 'Administrator',
      createTitle: 'Dodaj korisnika',
      firstName: 'Ime',
      lastName: 'Prezime',
      email: 'Email',
      password: 'Lozinka',
    },
    settings: {
      title: 'Podešavanja',
      subtitle: 'Podaci škole i datoteke koje se javno prikazuju.',
      schoolDataHeading: 'Podaci škole',
      directorName: 'Ime direktora',
      directorPlaceholder: 'npr. Mustafe Bardhi',
      filesHeading: 'Javne datoteke',
      timetable: 'Raspored časova',
      rules: 'Pravilnik škole',
      fileHint: 'PDF, DOC ili DOCX — max 25 MB',
      currentFile: 'Trenutna datoteka',
      pendingUpload: '{size} · biće otpremljena nakon čuvanja',
      willBeRemoved: 'Datoteka će biti uklonjena nakon čuvanja.',
      replaceFile: 'Zamijeni datoteku',
      uploadFile: 'Kliknite ili prevucite datoteku',
      onlyAllowedFiles: 'Dozvoljeni su samo PDF, DOC ili DOCX',
      passwordHeading: 'Moj nalog',
      passwordSubtitle: 'Promijenite svoju lozinku.',
      currentPassword: 'Trenutna lozinka',
      newPassword: 'Nova lozinka',
      confirmPassword: 'Potvrdi lozinku',
      changeBtn: 'Promijeni lozinku',
    },
    forms: {
      news: {
        titleField: 'Naslov',
        category: 'Kategorija',
        publishedAt: 'Datum objave',
        cover: 'Naslovna slika',
        content: 'Sadržaj (paragrafi)',
        addParagraph: '+ Dodaj paragraf',
        paragraphPlaceholder: 'Paragraf {n}',
        attachments: 'Prilozi',
        attachmentsHint: 'Fotografije, video, PDF, DOC — više odjednom',
        replaceCover: 'Zamijeni naslovnu sliku',
        uploadCover: 'Kliknite ili prevucite naslovnu sliku',
        coverHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        coverMustBeImage: 'Naslovna mora biti slika',
        coverRequired: 'Naslovna slika je obavezna',
        currentPhoto: 'Trenutna fotografija',
        replaceHint: 'Prevucite ili kliknite ispod da zamijenite',
        publish: 'Objavi',
        existing: 'postojeće',
        uploading: 'Otpremanje...',
        uploaded: 'Otpremljeno',
        errorPrefix: 'Greška: {msg}',
        attachmentsClickOrDrag: 'Kliknite ili prevucite datoteke',
        photo: 'Fotografija',
      },
      staff: {
        fullName: 'Puno ime',
        position: 'Pozicija',
        category: 'Kategorija',
        memberSinceLabel: 'Član od (godina)',
        emailOpt: 'Email (opciono)',
        phoneOpt: 'Telefon (opciono)',
        descriptionOpt: 'Opis (opciono)',
        photo: 'Fotografija',
        replacePhoto: 'Zamijeni fotografiju',
        uploadPhoto: 'Kliknite ili prevucite fotografiju',
        photoHint: 'JPG, PNG, WEBP, AVIF — max 10 MB',
        photoMustBeImage: 'Fotografija mora biti slika',
        photoRequired: 'Fotografija je obavezna',
      },
      documents: {
        nameField: 'Naziv',
        category: 'Kategorija',
        file: 'Datoteka',
        replaceFile: 'Zamijeni datoteku',
        uploadFile: 'Kliknite ili prevucite datoteku',
        fileHint: 'PDF, DOC, DOCX — max 25 MB',
        onlyAllowed: 'Dozvoljeni su samo PDF, DOC ili DOCX',
        fileRequired: 'Datoteka je obavezna',
      },
    },
    errors: {
      required: 'Obavezno',
      invalidEmail: 'Neispravan email',
      passwordRequired: 'Lozinka je obavezna',
      min2: 'Min 2 znaka',
      min8: 'Najmanje 8 znakova',
      uppercase: 'Potrebno veliko slovo',
      lowercase: 'Potrebno malo slovo',
      digit: 'Potrebna cifra',
      special: 'Potreban specijalni znak',
      passwordsDontMatch: 'Lozinke se ne podudaraju',
      newPasswordSameAsOld: 'Nova lozinka mora biti različita od trenutne',
      titleRequired: 'Naslov je obavezan',
      nameRequired: 'Naziv je obavezan',
      positionRequired: 'Pozicija je obavezna',
      dateRequired: 'Datum je obavezan',
      atLeastOneParagraph: 'Bar jedan paragraf mora sadržati tekst',
      max120: 'Maksimalno 120 znakova',
      max200: 'Maksimalno 200 znakova',
      max255: 'Maksimalno 255 znakova',
      max2000: 'Maksimalno 2000 znakova',
      max40: 'Maksimalno 40 znakova',
      invalidYear: 'Neispravna godina',
      yearMin1900: 'Godina mora biti ≥ 1900.',
      yearMaxNow: 'Godina ne može biti u budućnosti',
      phoneTooShort: 'Broj je prekratak',
    },
  },
};

export const dictionaries: Record<Lang, Dict> = { sq, en, me };
