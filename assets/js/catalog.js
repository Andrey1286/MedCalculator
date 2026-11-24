var CATALOG = [
  // Общие
  { id: 'bmi', title: 'ИМТ', description: 'Индекс массы тела. Вес / Рост²', category: 'Общие', file: 'calculators/general/bmi.html', comingSoon: false, tags: 'ожирение вес рост индекс массы тела adiposity obesity' },
  { id: 'whtr', title: 'ОТ/Рост', description: 'Отношение окружности талии к росту', category: 'Общие', file: 'calculators/general/whtr.html', comingSoon: false, tags: 'талия рост висцеральное ожирение абдоминальное waist height ratio' },
  { id: 'whr', title: 'ОТ/ОБ', description: 'Отношение талии к бёдрам', category: 'Общие', file: 'calculators/general/whr.html', comingSoon: false, tags: 'талия бёдра распределение жира андроидное гиноидное waist hip ratio' },

  // Эндокринология
  { id: 'ca', title: 'Кальций', description: 'Коррекция по альбумину', category: 'Эндокринология', file: 'calculators/endocrinology/calcium.html', comingSoon: false, tags: 'кальций альбумин гипокальциемия гиперкальциемия parathyroid щитовидная железа calcium albumin' },
  { id: 'ft', title: 'Свободный тестостерон', description: 'Расчёт по уравнению Vermeulen', category: 'Эндокринология', file: 'calculators/endocrinology/free-testosterone.html', comingSoon: false, tags: 'тестостерон свободный гспг shbg альбумин гипогонадизм андрогены testosterone' },
  { id: 'osmo-blood', title: 'Осмоляльность крови', description: 'Расчётная осмоляльность плазмы', category: 'Эндокринология', file: 'calculators/endocrinology/osmo-blood.html', comingSoon: false, tags: 'осмоляльность натрий калий глюкоза мочевина кровь плазма hyponatremia hypernatremia diabetes insipidus несахарный диабет' },
  { id: 'osmo-urine', title: 'Осмоляльность мочи', description: 'Оценка концентрационной способности почек', category: 'Эндокринология', file: 'calculators/endocrinology/osmo-urine.html', comingSoon: false, tags: 'осмоляльность моча почки полиурия несахарный диабет siadh концентрация urine osmolality kidney' },
  { id: 'a1c', title: 'HbA1c → eAG', description: 'Перевод гликированного гемоглобина в среднюю глюкозу', category: 'Эндокринология', file: 'calculators/endocrinology/hba1c.html', comingSoon: false, tags: 'гликированный гемоглобин hba1c глюкоза сахарный диабет средняя glycated hemoglobin diabetes glucose' },
  { id: 'target-a1c', title: 'Целевой HbA1c', description: 'Индивидуальная цель по гликированному гемоглобину', category: 'Эндокринология', file: 'calculators/endocrinology/target-a1c.html', comingSoon: false, tags: 'целевой hba1c диабет контроль гликемии осложнения target diabetes' },
  { id: 'vitd', title: 'Витамин D', description: 'Статус и ориентировочные дозы', category: 'Эндокринология', file: 'calculators/endocrinology/vitamin-d.html', comingSoon: false, tags: 'витамин d 25(oh)d дефицит недостаточность кальциферол osteoporosis bone кости vitamin d deficiency' },
  { id: 'insulin', title: 'Инсулин', description: 'Корректирующая доза по правилу 1800/1500', category: 'Эндокринология', file: 'calculators/endocrinology/insulin.html', comingSoon: false, tags: 'инсулин фчи чувствительность болюс коррекция сахарный диабет tdd basal bolus insulin sensitivity factor' },
  { id: 'findrisc', title: 'FINDRISC', description: 'Риск сахарного диабета 2 типа', category: 'Эндокринология', file: 'calculators/endocrinology/findrisc.html', comingSoon: false, tags: 'диабет риск предиабет скрининг findrisc diabetes risk score' },
  { id: 'score2dm', title: 'SCORE2-Diabetes', description: '10-летний риск ССЗ у пациентов с диабетом 2 типа', category: 'Эндокринология', file: 'calculators/endocrinology/score2-diabetes.html', comingSoon: false, tags: 'score2 диабет сердечно-сосудистый риск инфаркт инсульт cvd cardiovascular diabetes' },

  // Кардиология
  { id: 'score2', title: 'SCORE2', description: '10-летний риск сердечно-сосудистой смерти', category: 'Кардиология', file: 'calculators/cardiology/score2.html', comingSoon: false, tags: 'score2 холестерин лпвл давление курение риск инфаркт инсульт atherosclerosis lipid cardiovascular risk' },
  { id: 'htn-stage', title: 'Стадия АГ', description: 'Определение стадии гипертонической болезни', category: 'Кардиология', file: 'calculators/cardiology/htn-stage.html', comingSoon: false, tags: 'гипертония аргериальная гипертензия стадия пом акс давление сердце почки hypertension stage organ damage' },
  { id: 'chads', title: 'CHA₂DS₂-VASc', description: 'Риск инсульта при фибрилляции предсердий', category: 'Кардиология', file: 'calculators/cardiology/chads.html', comingSoon: false, tags: 'фибрилляция предсердий мерцательная аритмия инсульт тромбоэмболия антикоагулянты afib atrial fibrillation stroke anticoagulation' },
  { id: 'hasbled', title: 'HAS-BLED', description: 'Риск кровотечения на антикоагулянтах', category: 'Кардиология', file: 'calculators/cardiology/hasbled.html', comingSoon: false, tags: 'кровотечение риск антикоагулянты варфарин ноак has-bled bleeding anticoagulant safety' },
  { id: 'qt', title: 'QTc', description: 'Корригированный интервал QT по Базетту', category: 'Кардиология', file: 'calculators/cardiology/qtc.html', comingSoon: false, tags: 'qt экг интервал базетт тахикардия брадикардия torsades de pointes arrhythmia ecg electrocardiogram' },

  // Нефрология
  { id: 'ckd', title: 'СКФ (креатинин)', description: 'CKD-EPI 2021 · Кокрофт-Голт', category: 'Нефрология', file: 'calculators/nephrology/gfr-creatinine.html', comingSoon: false, tags: 'скф креатинин почки хбп ckd-epi коккрофт голт клиренс gfr creatinine kidney renal function ckdepi cockcroft-gault' },
  { id: 'ckd-cys', title: 'СКФ (цистатин C)', description: 'CKD-EPI 2012 по цистатину C', category: 'Нефрология', file: 'calculators/nephrology/gfr-cystatin.html', comingSoon: false, tags: 'скф цистатин c почки хбп cystatin c gfr kidney renal function' },

  // Гепатология
  { id: 'fib4', title: 'FIB-4', description: 'Неинвазивный индекс фиброза печени', category: 'Гепатология', file: 'calculators/hepatology/fib4.html', comingSoon: false, tags: 'фиброз печень fиб-4 масжбп нажбп аст алт тромбоциты steatosis mald nafld masld liver fibrosis hepatitis цирроз cirrhosis' },

  // Гематология
  { id: 'iron', title: 'Железо в/в', description: 'Расчёт дозы внутривенного железа по формуле Ганзони', category: 'Гематология', file: 'calculators/hematology/iron-iv.html', comingSoon: false, tags: 'железо внутривенное дефицит анемия гемоглобин ферритин ганзони iron iv anemia hemoglobin ferritin ganzoni' },
  { id: 'mentzer', title: 'Индекс Ментцера', description: 'Дифференциальная диагностика микроцитарной анемии', category: 'Гематология', file: 'calculators/hematology/mentzer.html', comingSoon: false, tags: 'ментцер mcv rbc эритроциты микроцитоз талассемия железодефицит mentzer index thalassemia iron deficiency anemia' },

  // Пульмонология / неотложка
  { id: 'curb', title: 'CURB-65', description: 'Тяжесть внебольничной пневмонии', category: 'Пульмонология / неотложка', file: 'calculators/emergency/curb65.html', comingSoon: false, tags: 'пневмония лёгкие госпитализация орит мочевина сознание curb65 pneumonia lung hospitalization icu respiratory' },
  { id: 'wells', title: 'Wells', description: 'Клиническая вероятность ТЭЛА', category: 'Пульмонология / неотложка', file: 'calculators/emergency/wells.html', comingSoon: false, tags: 'тэла тромбоэмболия лёгочная артерия d-димер wells pe pulmonary embolism thromboembolism d-dimer ct angiography' },

  // Диетология
  { id: 'calories', title: 'Калории/БЖУ', description: 'Норма калорий и макронутриентов по Миффлину–Сан Жеору', category: 'Диетология', file: 'calculators/dietology/calories.html', comingSoon: false, tags: 'калории бжу белки жиры углеводы похудение набор массы mifflin st jeor bmr tdee nutrition diet weight loss gain macros' },

  // Антикоагулянты
  { id: 'noac', title: 'НОАК', description: 'Подбор дозы при ФП с учётом СКФ, возраста и веса', category: 'Антикоагулянты', file: 'calculators/anticoagulants/noac.html', comingSoon: false, tags: 'ноак doac ривароксабан апиксабан дабигатран эдоксабан фп антикоагулянт почки rivaroxaban apixaban dabigatran edoxaban anticoagulant afib dose adjustment renal' },
  { id: 'lmwh', title: 'НМГ', description: 'Дозировка эноксапарина с учётом СКФ и веса', category: 'Антикоагулянты', file: 'calculators/anticoagulants/lmwh.html', comingSoon: false, tags: 'нмг эноксапарин клексан гепарин низкомолекулярный тэла тгв lmwh enoxaparin clexane heparin vte dvt pe prophylaxis treatment' },
  { id: 'warfarin', title: 'Варфарин', description: 'Стартовая доза и коррекция по МНО', category: 'Антикоагулянты', file: 'calculators/anticoagulants/warfarin.html', comingSoon: false, tags: 'варфарин мно inr антикоагулянт стартовая доза коррекция warfarin anticoagulant dose adjustment' },
  { id: 'heparin-iv', title: 'В/в гепарин', description: 'Болюс и инфузия нефракционированного гепарина', category: 'Антикоагулянты', file: 'calculators/anticoagulants/heparin-iv.html', comingSoon: false, tags: 'гепарин внутривенный нфг ачтт aptt болюс инфузия unfractionated heparin iv infusion bolus activated partial thromboplastin time' },

  // Психиатрия
  { id: 'gad7', title: 'GAD-7', description: 'Скрининг генерализованного тревожного расстройства', category: 'Психиатрия', file: 'calculators/psychiatry/gad7.html', comingSoon: false, tags: 'тревога гтр gad7 anxiety generalized disorder скрининг психиатрия psychiatry mental health' },
  { id: 'hads', title: 'HADS', description: 'Госпитальная шкала тревоги и депрессии', category: 'Психиатрия', file: 'calculators/psychiatry/hads.html', comingSoon: false, tags: 'тревога депрессия hads госпитальная шкала anxiety depression screening психиатрия psychiatry mental health' }
];
