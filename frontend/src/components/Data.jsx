// data.jsx — All content for the school site (in Albanian)

const QUOTES = [
  {
    text: "Shkolla në Katërkollë më e bukura në Mal të Zi dhe Jugosllavi.",
    author: "Shaban Sait Hoxhiqi"
  },
  {
    text: 'Shkolla fillore "Bedri Elezaga", Tempulli i diturisë që ruajti gjuhën, kulturën dhe traditën e lavdishme shqiptare.',
    author: "Gjeke Gjon Gjonaj"
  },
  {
    text: "Shkolla në Katërkollë, krijuesja e elitës intelektuale të rajonit.",
    author: "Hatixhe Gjoni"
  }
];

const NEWS = [
  {
    id: 1,
    title: "Nxënësit tanë fitojnë vendin e parë në olimpiadën komunale të matematikës",
    excerpt: "Ekipi i nxënësve të klasave VIII dhe IX u kthye me medaljen e artë nga gara vjetore rajonale, duke konkurruar me mbi 20 shkolla të tjera.",
    date: "14 Prill 2026",
    category: "Arritje",
    image: "Nxënës me medalje, gëzim",
    body: [
      "Me krenari të madhe ndajmë lajmin e mrekullueshëm që ekipi i nxënësve të Shkollës Fillore \"Bedri Elezaga\" fitoi vendin e parë në olimpiadën komunale të matematikës. Gara u mbajt më 12 prill në qendrën kulturore të qytetit dhe mblodhi nxënës nga 23 shkolla fillore të rajonit.",
      "Nxënësit tanë — Arta Krasniqi, Dorian Berisha, Leart Hoxha dhe Elda Gashi — nën udhëheqjen e mësueses Valbona Shala, treguan njohuri të thella në algjebër, gjeometri dhe zgjidhje problemesh logjike.",
      "Ky sukses vjen si rezultat i punës së vazhdueshme dhe i klubit të matematikës që funksionon çdo të premte pasdite. Gjithashtu, falenderojmë prindërit që e mbështetën këtë nismë nga fillimi.",
      "Gara e ardhshme do të jetë olimpiada kombëtare në qershor, ku ekipi ynë do të përfaqësojë komunën tonë. Urojmë suksese të mëtejshme!"
    ]
  },
  {
    id: 2,
    title: "Festa e Pranverës — një ditë plot ngjyra dhe krijimtari",
    excerpt: "Më 21 mars organizuam festën tradicionale të pranverës me pjesëmarrjen e të gjithë nxënësve, prindërve dhe komunitetit.",
    date: "22 Mars 2026",
    category: "Ngjarje",
    image: "Fëmijë duke vizatuar në oborr",
    body: [
      "E diela e 21 marsit ishte një ditë e mrekullueshme për familjen tonë shkollore. Oborri i shkollës u mbush me ngjyra, muzikë, dhe buzëqeshje të ndritshme.",
      "Nxënësit e klasave të ulëta përgatitën një performancë koreografike me temën \"Ardhja e pranverës\", ndërsa klasat e larta organizuan një ekspozitë arti me punë të krijuara gjatë muajit të kaluar.",
      "Ne falenderojmë të gjithë prindërit që ndihmuan në organizim dhe që sollën ushqim tradicional për pjesëmarrësit."
    ]
  },
  {
    id: 3,
    title: "Bibliotekë e re digjitale për nxënësit e shkollës sonë",
    excerpt: "Falë donacionit të Ministrisë së Arsimit, ne tani kemi një bibliotekë të re me mbi 500 libra fizikë dhe qasje digjitale.",
    date: "8 Mars 2026",
    category: "Lajme",
    image: "Raftet e reja të bibliotekës",
    body: [
      "Biblioteka e re u hap zyrtarisht më 8 mars dhe tashmë është në dispozicion për të gjithë nxënësit tanë. Koleksioni përfshin letërsi shqipe, letërsi të përkthyer, libra shkencorë për fëmijë dhe një seksion të pasur me libra interaktivë digjitalë.",
      "Biblioteka është e hapur çdo ditë pune nga ora 8:00 deri në 15:00, dhe nxënësit mund të huazojnë deri në 3 libra njëherësh për një periudhë dy-javore."
    ]
  },
  {
    id: 4,
    title: "Vizitë edukative në Muzeun Kombëtar për klasat VI dhe VII",
    excerpt: "Më 2 mars, 48 nxënës morën pjesë në një vizitë edukative për të mësuar më shumë rreth historisë kombëtare.",
    date: "3 Mars 2026",
    category: "Ngjarje",
    image: "Nxënës në muze",
    body: [
      "Vizita në Muzeun Kombëtar ishte pjesë e programit mësimor të historisë për klasat VI dhe VII. Nxënësit patën mundësinë të shohin nga afër artefaktet nga periudhat e ndryshme historike.",
      "Gjuhëtari i muzeut, z. Arben Vokshi, udhëhoqi vizitën dhe u përgjigj me durim pyetjeve të shumta nga nxënësit kureshtarë."
    ]
  },
  {
    id: 5,
    title: "Nisja e projektit \"Lexo me mua\" për leximin në familje",
    excerpt: "Një nismë e re që inkurajon leximin e përbashkët të prindërve me fëmijët e tyre çdo mbrëmje.",
    date: "25 Shkurt 2026",
    category: "Projekte",
    image: "Prind dhe fëmijë duke lexuar",
    body: [
      "Projekti \"Lexo me mua\" është frymëzuar nga hulumtimet që tregojnë se leximi i përbashkët ndërmjet prindërve dhe fëmijëve çon në zhvillimin më të mirë gjuhësor dhe emocional.",
      "Çdo familje e regjistruar do të marrë një paketë fillestare me 5 libra të përshtatshëm për moshën dhe një ditar leximi."
    ]
  },
  {
    id: 6,
    title: "Turneu i futbollit mes klasave — finalja më 18 prill",
    excerpt: "Turneu vjetor i futbollit ka nisur dhe entuziazmi është në nivele të larta në të gjitha klasat.",
    date: "20 Shkurt 2026",
    category: "Sport",
    image: "Fëmijë duke luajtur futboll",
    body: [
      "Turneu vjetor i futbollit është një nga ngjarjet më të pritura të vitit shkollor. Këtë vit po marrin pjesë 12 ekipe nga klasat V deri IX.",
      "Ndeshjet zhvillohen çdo të mërkurë dhe të premte pasdite në fushën e shkollës."
    ]
  }
];

const STAFF_CATEGORIES = [
  { id: 'school_bodies', label: 'Organet e Shkollës', icon: 'M3 7h18M3 12h18M3 17h18' },
  { id: 'directorate', label: 'Drejtoria', icon: 'M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z' },
  { id: 'administration', label: 'Stafi Administrativ', icon: 'M9 17v-2a4 4 0 014-4h.01M15 7a3 3 0 11-6 0 3 3 0 016 0zM21 21l-3-3' },
  { id: 'professional_associates', label: 'Bashkëpunëtorët Profesionalë', icon: 'M12 4v16m8-8H4' },
  { id: 'teachers', label: 'Mësuesit', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 01-2.5-2.5v-15z' },
  { id: 'assistants', label: 'Asistentët', icon: 'M17 20h5v-2a4 4 0 00-3-3.87' },
  { id: 'maintenance', label: 'Stafi i Mirëmbajtjes', icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' },
];

const HISTORY_TIMELINE = [
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
];

const SCHOOL_BRANCHES = ['Krythë', 'Sukubinë', 'Rashtishë', 'Millë', 'Kravar', 'Shtodër', 'Kllezën', 'Fraskanjel'];

const HISTORY_DIRECTORS = [
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
];

const HISTORY_REFLECTION = {
  title: 'Hapja dhe rihapja e shkollave në Anë të Malit',
  paragraphs: [
    'Në Kronikën e Shkollës dhe Ekstraktin e saj, figuron se me mbarimin e Luftës së Parë Botërore, 1918, kjo trevë bie nën sundimin e Mbretërisë Jugosllave dhe shkollat e para në Anë të Malit janë hapur, më 1929, në Selitë, Kosiq dhe Sukubinë. Të njëjtat kanë punuar deri në fillimin e Luftës së Dytë Botërore dhe kapitullimin e atij shteti, më 1941.',
    'Ende pa mbaruar lufta, më 1945, Ana e Malit bie në Administrimin e Jugosllavisë Federative Popullore/Socialiste. Në shkurt të atij viti, shkolla në Katërkollë vazhdon punën dhe mësimi zhvillohet për herë të parë në gjuhën amtare — shqipe.',
    'Por të dhënat e gjetura më vonë, të shënuara në librin Monografi, "Shkolla Fillore Bedri Elezaga 1869–2019 Katërkollë" të autorit Rexhep Lleshi, dëshmojnë se mësimi këtu, në shkolla, ka filluar shumë më herët se që njeh Kronika dhe lidhet me hapjen e mejtepit — Shkollës fillore katërvjeçare, në kohën e Perandorisë Osmane, më 1869.',
    'Me fillimin e Luftës së Dytë Botërore, 1941, si të gjitha trevat shqiptare jashtë kufirit të shtetit Amë, edhe Ana e Malit bie në Administrimin e Shqipërisë, Prefekturës së Shkodrës. Përkundër rrethanave të gjendjes së rëndë jetësore, në vitet shkollore 1941/42 e 1942/43, Ministria e Arsimit të Shqipërisë edhe këtu, në Anë të Malit e Ulqin, dërgon mësues me bazë pedagogjike për punë me nxënës në shkollat në Katërkollë, Krythë dhe Sukubinë. Ashtu, në këto shkolla për herë të parë mësimi zhvillohet në gjuhën amtare shqipe.',
    'Andaj, Kronikës duhet përgjegjur e thënë se këtu, në Anë të Malit, shkolla e filloi punën më 1869, ndërsa në 1929 shkollat punën e rifilluan. Atë e vazhduan edhe gjatë Luftës… dhe mësimi në gjuhën amtare shqipe ka filluar më 1941, jo më 1945.',
  ],
};

export { QUOTES, NEWS, STAFF_CATEGORIES, HISTORY_TIMELINE, SCHOOL_BRANCHES, HISTORY_DIRECTORS, HISTORY_REFLECTION };
