import { CongruenceCondition, MindMapNode, QuizQuestion } from '../types/geometry';

export const CONGRUENCE_CONDITIONS: CongruenceCondition[] = [
  {
    id: 'SAS',
    thaiName: 'ด้าน - มุม - ด้าน',
    thaiAbbr: 'ด.ม.ด.',
    englishName: 'Side - Angle - Side (SAS)',
    category: 'sides',
    summary: 'ด้านยาวเท่ากันสองคู่ และมุมในระหว่างด้านคู่ที่ยาวเท่ากันมีขนาดเท่ากัน',
    criteria: [
      'ด้านคู่ที่หนึ่งยาวเท่ากัน (Side 1)',
      'มุมในระหว่างด้านทั้งสองมีขนาดเท่ากัน (Included Angle)',
      'ด้านคู่ที่สองยาวเท่ากัน (Side 2)',
    ],
    memoryTrick: 'ตัว "ม." (มุม) ต้องถูกขนาบข้างด้วย "ด." สองตัวเสมอ ถ้ามุมกระเด็นไปอยู่นอกด้านคู่ที่เท่ากัน (ด.ด.ม.) จะใช้ไม่ได้!',
    dangerPitfall: 'ระวัง: ด.ด.ม. (SSA) ไม่สามารถสรุปได้ว่าเท่ากันทุกประการ เพราะสามารถสร้างสามเหลี่ยมที่ต่างกันได้สองแบบ (ยกเว้นกรณีมุมฉาก RHS)',
    correspondingElements: {
      sides: ['AB = DE (ขีด 1 ขีด)', 'AC = DF (ขีด 2 ขีด)', 'BC = EF (ผลตามมา)'],
      angles: ['∠A = ∠D (มุมในระหว่างด้าน)', '∠B = ∠E (ผลตามมา)', '∠C = ∠F (ผลตามมา)'],
    },
    svgData: {
      t1: {
        points: '30,120 130,120 70,30',
        labels: [
          { x: 18, y: 130, text: 'B' },
          { x: 136, y: 130, text: 'C' },
          { x: 70, y: 20, text: 'A' },
        ],
      },
      t2: {
        points: '190,120 290,120 230,30',
        labels: [
          { x: 178, y: 130, text: 'E' },
          { x: 296, y: 130, text: 'F' },
          { x: 230, y: 20, text: 'D' },
        ],
      },
      sideMarks: {
        t1Marks: [
          { p1: [30, 120], p2: [70, 30], count: 1 }, // Side AB: 1 tick
          { p1: [70, 30], p2: [130, 120], count: 2 }, // Side AC: 2 ticks
        ],
        t2Marks: [
          { p1: [190, 120], p2: [230, 30], count: 1 }, // Side DE: 1 tick
          { p1: [230, 30], p2: [290, 120], count: 2 }, // Side DF: 2 ticks
        ],
      },
      angleMarks: {
        t1Arcs: [{ cx: 70, cy: 30, r: 18, startAngle: 60, endAngle: 120, count: 1 }],
        t2Arcs: [{ cx: 230, cy: 30, r: 18, startAngle: 60, endAngle: 120, count: 1 }],
      },
    },
  },
  {
    id: 'ASA',
    thaiName: 'มุม - ด้าน - มุม',
    thaiAbbr: 'ม.ด.ม.',
    englishName: 'Angle - Side - Angle (ASA)',
    category: 'angles',
    summary: 'มุมมีขนาดเท่ากันสองคู่ และด้านซึ่งเป็นแขนร่วมของมุมทั้งสองยาวเท่ากัน',
    criteria: [
      'มุมคู่ที่หนึ่งมีขนาดเท่ากัน (Angle 1)',
      'ด้านซึ่งเป็นแขนร่วมของมุมทั้งสองยาวเท่ากัน (Included Side)',
      'มุมคู่ที่สองมีขนาดเท่ากัน (Angle 2)',
    ],
    memoryTrick: 'ตัว "ด." (ด้าน) อยู่ตรงกลางระหว่างมุมสองมุม หมายถึงต้องเป็น "ด้านฐานหรือแขนร่วม" ที่มุมทั้งสองวางอยู่บนปลายด้านนั้น',
    dangerPitfall: 'หากด้านที่เท่ากันไม่ใช่ด้านที่เป็นแขนร่วมของสองมุมนั้น จะกลายเป็นแบบ ม.ม.ด. (AAS) ซึ่งยังคงเท่ากันทุกประการ แต่ต้องอ้างเหตุผลให้ถูกเงื่อนไข',
    correspondingElements: {
      sides: ['BC = EF (แขนร่วมของมุม)', 'AB = DE (ผลตามมา)', 'AC = DF (ผลตามมา)'],
      angles: ['∠B = ∠E (มุมที่ฐาน 1)', '∠C = ∠F (มุมที่ฐาน 2)', '∠A = ∠D (ผลตามมา)'],
    },
    svgData: {
      t1: {
        points: '30,120 140,120 60,35',
        labels: [
          { x: 18, y: 130, text: 'B' },
          { x: 146, y: 130, text: 'C' },
          { x: 60, y: 25, text: 'A' },
        ],
      },
      t2: {
        points: '190,120 300,120 220,35',
        labels: [
          { x: 178, y: 130, text: 'E' },
          { x: 306, y: 130, text: 'F' },
          { x: 220, y: 25, text: 'D' },
        ],
      },
      sideMarks: {
        t1Marks: [
          { p1: [30, 120], p2: [140, 120], count: 1 }, // Base BC: 1 tick
        ],
        t2Marks: [
          { p1: [190, 120], p2: [300, 120], count: 1 }, // Base EF: 1 tick
        ],
      },
      angleMarks: {
        t1Arcs: [
          { cx: 30, cy: 120, r: 20, startAngle: 300, endAngle: 360, count: 1 },
          { cx: 140, cy: 120, r: 20, startAngle: 180, endAngle: 230, count: 2 },
        ],
        t2Arcs: [
          { cx: 190, cy: 120, r: 20, startAngle: 300, endAngle: 360, count: 1 },
          { cx: 300, cy: 120, r: 20, startAngle: 180, endAngle: 230, count: 2 },
        ],
      },
    },
  },
  {
    id: 'AAS',
    thaiName: 'มุม - มุม - ด้าน',
    thaiAbbr: 'ม.ม.ด.',
    englishName: 'Angle - Angle - Side (AAS)',
    category: 'angles',
    summary: 'มุมมีขนาดเท่ากันสองคู่ และด้านที่อยู่ตรงข้ามกับมุมคู่ใดคู่หนึ่งยาวเท่ากัน',
    criteria: [
      'มุมคู่ที่หนึ่งมีขนาดเท่ากัน (Angle 1)',
      'มุมคู่ที่สองมีขนาดเท่ากัน (Angle 2)',
      'ด้านที่อยู่ตรงข้ามกับมุมคู่ใดคู่หนึ่งยาวเท่ากัน (Non-included Side)',
    ],
    memoryTrick: 'เนื่องจากมุมภายในสามเหลี่ยมรวมกันได้ 180° เสมอ ถ้ามุมเท่ากัน 2 คู่แล้ว มุมที่ 3 ย่อมเท่ากันโดยอัตโนมัติ จึงแปลงกลับเป็น ม.ด.ม. ได้เสมอ',
    dangerPitfall: 'ต้องเช็กให้แน่ใจว่า ด้านที่ยาวเท่ากันนั้นอยู่ "ตรงข้ามกับมุมที่สมนัยกัน" ไม่ใช่ตรงข้ามกับคนละมุม',
    correspondingElements: {
      sides: ['AC = DF (ด้านตรงข้ามมุม ∠B และ ∠E)', 'AB = DE (ผลตามมา)', 'BC = EF (ผลตามมา)'],
      angles: ['∠B = ∠E', '∠C = ∠F', '∠A = ∠D (เพราะมุมภายในรวมกันได้ 180°)'],
    },
    svgData: {
      t1: {
        points: '30,120 140,120 80,40',
        labels: [
          { x: 18, y: 130, text: 'B' },
          { x: 146, y: 130, text: 'C' },
          { x: 80, y: 30, text: 'A' },
        ],
      },
      t2: {
        points: '190,120 300,120 240,40',
        labels: [
          { x: 178, y: 130, text: 'E' },
          { x: 306, y: 130, text: 'F' },
          { x: 240, y: 30, text: 'D' },
        ],
      },
      sideMarks: {
        t1Marks: [
          { p1: [80, 40], p2: [140, 120], count: 1 }, // Side AC: 1 tick
        ],
        t2Marks: [
          { p1: [240, 40], p2: [300, 120], count: 1 }, // Side DF: 1 tick
        ],
      },
      angleMarks: {
        t1Arcs: [
          { cx: 30, cy: 120, r: 20, startAngle: 300, endAngle: 360, count: 1 },
          { cx: 140, cy: 120, r: 20, startAngle: 180, endAngle: 230, count: 2 },
        ],
        t2Arcs: [
          { cx: 190, cy: 120, r: 20, startAngle: 300, endAngle: 360, count: 1 },
          { cx: 300, cy: 120, r: 20, startAngle: 180, endAngle: 230, count: 2 },
        ],
      },
    },
  },
  {
    id: 'SSS',
    thaiName: 'ด้าน - ด้าน - ด้าน',
    thaiAbbr: 'ด.ด.ด.',
    englishName: 'Side - Side - Side (SSS)',
    category: 'sides',
    summary: 'ด้านยาวเท่ากันสามคู่ ด้านต่อด้าน',
    criteria: [
      'ด้านคู่ที่หนึ่งยาวเท่ากัน (Side 1)',
      'ด้านคู่ที่สองยาวเท่ากัน (Side 2)',
      'ด้านคู่ที่สามยาวเท่ากัน (Side 3)',
    ],
    memoryTrick: 'รูปทรงของสามเหลี่ยมถูกล็อกตายตัวด้วยความยาวด้านทั้งสาม (Rigid Frame) เมื่อด้านเท่ากันทั้งสามด้าน มุมทั้งสามมุมจะถูกบังคับให้เท่ากันทันที!',
    dangerPitfall: 'ตรงกันข้ามกับ มุม-มุม-มุม (AAA) ซึ่งไม่ทำให้เท่ากันทุกประการ เพราะเป็นแค่ "คล้ายกัน" (Similar) แต่ขนาดอาจต่างกัน',
    correspondingElements: {
      sides: ['AB = DE (ขีด 1 ขีด)', 'BC = EF (ขีด 2 ขีด)', 'CA = FD (ขีด 3 ขีด)'],
      angles: ['∠A = ∠D (ผลตามมา)', '∠B = ∠E (ผลตามมา)', '∠C = ∠F (ผลตามมา)'],
    },
    svgData: {
      t1: {
        points: '30,120 135,120 90,30',
        labels: [
          { x: 18, y: 130, text: 'A' },
          { x: 142, y: 130, text: 'B' },
          { x: 90, y: 20, text: 'C' },
        ],
      },
      t2: {
        points: '190,120 295,120 250,30',
        labels: [
          { x: 178, y: 130, text: 'D' },
          { x: 302, y: 130, text: 'E' },
          { x: 250, y: 20, text: 'F' },
        ],
      },
      sideMarks: {
        t1Marks: [
          { p1: [30, 120], p2: [90, 30], count: 1 }, // Side AC: 1 tick
          { p1: [30, 120], p2: [135, 120], count: 2 }, // Side AB: 2 ticks
          { p1: [135, 120], p2: [90, 30], count: 3 }, // Side BC: 3 ticks
        ],
        t2Marks: [
          { p1: [190, 120], p2: [250, 30], count: 1 }, // Side DF: 1 tick
          { p1: [190, 120], p2: [295, 120], count: 2 }, // Side DE: 2 ticks
          { p1: [295, 120], p2: [250, 30], count: 3 }, // Side EF: 3 ticks
        ],
      },
      angleMarks: {
        t1Arcs: [],
        t2Arcs: [],
      },
    },
  },
  {
    id: 'RHS',
    thaiName: 'ฉาก - ด้าน - ด้าน',
    thaiAbbr: 'ฉ.ด.ด.',
    englishName: 'Right angle - Hypotenuse - Side (RHS / HL)',
    category: 'special',
    summary: 'รูปสามเหลี่ยมมุมฉากที่มีด้านตรงข้ามมุมฉากยาวเท่ากัน และด้านประกอบมุมฉากอีกด้านหนึ่งยาวเท่ากัน',
    criteria: [
      'ทั้งสองรูปเป็นรูปสามเหลี่ยมมุมฉาก (Right Angle)',
      'ด้านตรงข้ามมุมฉากยาวเท่ากัน (Hypotenuse)',
      'ด้านประกอบมุมฉากด้านใดด้านหนึ่งยาวเท่ากัน (Leg/Side)',
    ],
    memoryTrick: 'จากทฤษฎีบทพีทาโกรัส a² + b² = c² เมื่อรู้ด้านตรงข้ามมุมฉาก (c) และด้านประกอบมุมฉากด้านหนึ่ง (a) ด้านที่สาม (b) จะถูกล็อกค่าไว้ ทำให้กลายเป็น ด.ด.ด. เสมอ!',
    dangerPitfall: 'ใช้ได้เฉพาะ "รูปสามเหลี่ยมมุมฉาก" เท่านั้น! หากไม่ใช่สามเหลี่ยมมุมฉาก เงื่อนไขด้าน-ด้าน-มุม จะไม่รับประกันความเท่ากันทุกประการ',
    correspondingElements: {
      sides: ['AC = DF (ด้านตรงข้ามมุมฉาก - Hypotenuse)', 'BC = EF (ด้านประกอบมุมฉาก - Leg)', 'AB = DE (จากพีทาโกรัส)'],
      angles: ['∠B = ∠E = 90° (มุมฉาก)', '∠A = ∠D (ผลตามมา)', '∠C = ∠F (ผลตามมา)'],
    },
    svgData: {
      t1: {
        points: '30,120 120,120 30,35',
        labels: [
          { x: 18, y: 130, text: 'B' },
          { x: 126, y: 130, text: 'C' },
          { x: 18, y: 35, text: 'A' },
        ],
      },
      t2: {
        points: '190,120 280,120 190,35',
        labels: [
          { x: 178, y: 130, text: 'E' },
          { x: 286, y: 130, text: 'F' },
          { x: 178, y: 35, text: 'D' },
        ],
      },
      sideMarks: {
        t1Marks: [
          { p1: [30, 35], p2: [120, 120], count: 1 }, // Hypotenuse AC: 1 tick
          { p1: [30, 120], p2: [120, 120], count: 2 }, // Base Leg BC: 2 ticks
        ],
        t2Marks: [
          { p1: [190, 35], p2: [280, 120], count: 1 }, // Hypotenuse DF: 1 tick
          { p1: [190, 120], p2: [280, 120], count: 2 }, // Base Leg EF: 2 ticks
        ],
      },
      angleMarks: {
        t1Arcs: [{ cx: 30, cy: 120, r: 14, startAngle: 0, endAngle: 90, isRight: true }],
        t2Arcs: [{ cx: 190, cy: 120, r: 14, startAngle: 0, endAngle: 90, isRight: true }],
      },
    },
  },
];

export const MIND_MAP_DATA: MindMapNode = {
  id: 'root',
  title: 'ความเท่ากันทุกประการ (Congruence ≅)',
  subtitle: 'บทที่ 3 วิชาคณิตศาสตร์พื้นฐาน ม.2',
  description: 'รูปเรขาคณิตสองรูปเท่ากันทุกประการ ก็ต่อเมื่อ สามารถเคลื่อนที่รูปหนึ่งไปทับอีกรูปหนึ่งได้สนิทพอดี',
  iconName: 'Shapes',
  level: 0,
  children: [
    {
      id: 'superposition',
      title: '3.1 นิยาม & การทับสนิท',
      subtitle: 'Rigid Motion (การเคลื่อนที่แบบแข็ง)',
      description: 'การนำรูปหนึ่งไปซ้อนทับอีกรูปด้วย การเลื่อนขนาน (Translation), การหมุน (Rotation), หรือการสะท้อน (Reflection)',
      sectionId: 'simulator-section',
      iconName: 'Move',
      level: 1,
      children: [
        {
          id: 'rigid-properties',
          title: 'สมบัติการคงสภาพ',
          subtitle: 'คงระยะทางและขนาดมุม',
          description: 'รูปร่างและขนาดจะไม่เปลี่ยนแปลงจากการแปลงทางเรขาคณิต',
          iconName: 'ShieldCheck',
          level: 2,
        },
        {
          id: 'overlap-perfect',
          title: 'การทับกันสนิทพอดี',
          subtitle: 'A ≅ B',
          description: 'จุดทุกจุด ขอบทุกเส้น และพื้นที่ทั้งหมดทับกันได้พอดี 100%',
          iconName: 'Layers',
          level: 2,
        },
      ],
    },
    {
      id: 'triangle-conditions',
      title: '3.2 เงื่อนไขความเท่ากัน 5 แบบ',
      subtitle: 'ตรวจสอบโดยไม่ต้องวัดครบ 6 ส่วน',
      description: 'สามเหลี่ยมมี 6 องค์ประกอบ (ด้าน 3 ด้าน มุม 3 มุม) แต่ทราบเพียง 3 ส่วนตามเงื่อนไขก็สรุปได้',
      sectionId: 'conditions-section',
      iconName: 'Triangle',
      level: 1,
      children: [
        {
          id: 'cond-sas',
          title: 'ด.ม.ด. (SAS)',
          subtitle: 'ด้าน - มุมในระหว่าง - ด้าน',
          description: 'ด้านเท่ากัน 2 คู่ และมุมระหว่างด้านคู่ที่เท่ากันมีขนาดเท่ากัน',
          sectionId: 'conditions-section',
          iconName: 'Sparkles',
          level: 2,
        },
        {
          id: 'cond-asa-aas',
          title: 'ม.ด.ม. & ม.ม.ด.',
          subtitle: 'ASA & AAS',
          description: 'มุมเท่ากัน 2 คู่ พร้อมด้านแขนร่วม (ม.ด.ม.) หรือด้านตรงข้ามมุม (ม.ม.ด.)',
          sectionId: 'conditions-section',
          iconName: 'Maximize2',
          level: 2,
        },
        {
          id: 'cond-sss',
          title: 'ด.ด.ด. (SSS)',
          subtitle: 'ด้านเท่ากัน 3 คู่',
          description: 'ความยาวด้านล็อกรูปทรงของสามเหลี่ยมได้อย่างสมบูรณ์',
          sectionId: 'conditions-section',
          iconName: 'Box',
          level: 2,
        },
        {
          id: 'cond-rhs',
          title: 'ฉ.ด.ด. (RHS)',
          subtitle: 'ฉาก - ตรงข้ามฉาก - ด้าน',
          description: 'สามเหลี่ยมมุมฉากที่มีด้านตรงข้ามมุมฉากและด้านประกอบมุมฉากเท่ากัน',
          sectionId: 'conditions-section',
          iconName: 'CheckCircle2',
          level: 2,
        },
      ],
    },
    {
      id: 'pitfalls-proofs',
      title: '3.3 ม.ม.ม. รูปคล้าย ไม่ใช่เท่ากันทุกประการ',
      subtitle: 'มุมเท่ากัน 3 คู่ (AAA) vs เท่ากันทุกประการ',
      description: 'ทำไมมุมเท่ากันทั้ง 3 มุมถึงสรุปได้แค่ว่าคล้ายกัน (Similar) แต่ไม่เท่ากันทุกประการ',
      sectionId: 'pitfalls-section',
      iconName: 'Eye',
      level: 1,
      children: [
        {
          id: 'pitfall-aaa',
          title: 'ม.ม.ม. (AAA) รูปคล้าย ไม่ใช่เท่ากันทุกประการ',
          subtitle: 'ขนาดอาจย่อหรือขยายได้',
          description: 'มุมเท่ากัน 3 มุม รูปอาจย่อส่วนหรือขยายส่วน ไม่ได้รับประกันว่าจะเท่ากันทุกประการ',
          iconName: 'Eye',
          level: 2,
        },
      ],
    },
    {
      id: 'applications',
      title: '3.4 การนำไปใช้ & แบบทดสอบ',
      subtitle: 'การพิสูจน์ & หาค่าตัวแปร',
      description: 'เมื่อสามเหลี่ยมเท่ากันทุกประการแล้ว ด้านและมุมที่สมนัยกันจะเท่ากัน นำไปแก้สมการได้',
      sectionId: 'quiz-section',
      iconName: 'GraduationCap',
      level: 1,
      children: [
        {
          id: 'app-sides',
          title: 'การหามุมและด้านที่สมนัย',
          subtitle: 'CPCTC',
          description: 'Corresponding Parts of Congruent Triangles are Congruent',
          iconName: 'Compass',
          level: 2,
        },
        {
          id: 'app-quiz',
          title: 'แบบทดสอบ ม.2',
          subtitle: '7 ข้อ พร้อมคำใบ้และเฉลย',
          description: 'ทดสอบความเข้าใจและทักษะการวิเคราะห์รูปทรงเรขาคณิต',
          sectionId: 'quiz-section',
          iconName: 'CheckSquare',
          level: 2,
        },
      ],
    },
  ],
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'จากรูปที่กำหนด สามเหลี่ยมทั้งสองรูปเท่ากันทุกประการด้วยความสัมพันธ์ตามเงื่อนไขใด?',
    contextText: 'รูปสามเหลี่ยม ABC และ DEF มี AB = DE, AC = DF และมีมุม ∠BAC = ∠EDF เท่ากัน',
    diagramType: 'SAS',
    options: [
      { id: 'A', text: 'ด้าน - ด้าน - ด้าน (ด.ด.ด.)' },
      { id: 'B', text: 'ด้าน - มุม - ด้าน (ด.ม.ด.)' },
      { id: 'C', text: 'มุม - ด้าน - มุม (ม.ด.ม.)' },
      { id: 'D', text: 'ฉาก - ด้าน - ด้าน (ฉ.ด.ด.)' },
    ],
    correctOptionId: 'B',
    hint: 'สังเกตตำแหน่งของมุมที่กำหนดให้ มุมนี้อยู่ "ระหว่าง" ด้านคู่ที่ยาวเท่ากันทั้งสองด้านหรือไม่?',
    explanation: 'ถูกต้อง! ด้าน AB = DE และ AC = DF เป็นด้านที่ยาวเท่ากัน 2 คู่ โดยมีมุม ∠BAC และ ∠EDF เป็น "มุมในระหว่างด้านคู่ที่ยาวเท่ากัน" จึงเข้าเงื่อนไข ด้าน-มุม-ด้าน (ด.ม.ด. หรือ SAS)',
  },
  {
    id: 2,
    questionText: 'สามเหลี่ยมมุมฉากสองรูป มีด้านตรงข้ามมุมฉากยาว 10 ซม. เท่ากัน และมีด้านประกอบมุมฉากด้านหนึ่งยาว 6 ซม. เท่ากัน สามเหลี่ยมคู่นี้เท่ากันทุกประการด้วยเงื่อนไขใด?',
    contextText: 'กำหนดให้ทั้งสองรูปมีมุมหนึ่งเป็นมุมฉาก 90°',
    diagramType: 'RHS',
    options: [
      { id: 'A', text: 'มุม - ด้าน - มุม (ม.ด.ม.)' },
      { id: 'B', text: 'ฉาก - ด้าน - ด้าน (ฉ.ด.ด.)' },
      { id: 'C', text: 'ด้าน - ด้าน - ด้าน (ด.ด.ด.)' },
      { id: 'D', text: 'มุม - มุม - ด้าน (ม.ม.ด.)' },
    ],
    correctOptionId: 'B',
    hint: 'มีมุมฉาก (ฉ) + ด้านตรงข้ามมุมฉากยาวเท่ากัน (ด) + ด้านประกอบมุมฉากยาวเท่ากันอีก 1 ด้าน (ด)',
    explanation: 'ถูกต้อง! เข้าเงื่อนไข ฉาก-ด้าน-ด้าน (ฉ.ด.ด. หรือ RHS) โดยตรง เพราะเป็นสามเหลี่ยมมุมฉาก มีด้านตรงข้ามมุมฉาก (Hypotenuse) ยาวเท่ากัน และมีด้านประกอบมุมฉาก (Leg) ยาวเท่ากัน 1 คู่',
  },
  {
    id: 3,
    questionText: 'กำหนดให้ รูปสามเหลี่ยม ABC ≅ รูปสามเหลี่ยม XYZ ถ้ามุม ∠A = 48° และมุม ∠B = 72° มุม ∠Z จะมีขนาดกี่องศา?',
    contextText: 'จำไว้ว่า ผลรวมมุมภายในรูปสามเหลี่ยมเท่ากับ 180°',
    diagramType: 'MISSING_ANGLE',
    options: [
      { id: 'A', text: '48°' },
      { id: 'B', text: '60°' },
      { id: 'C', text: '72°' },
      { id: 'D', text: '80°' },
    ],
    correctOptionId: 'B',
    hint: 'หามุม ∠C ของรูปสามเหลี่ยม ABC ก่อน เพราะจุดยอด C สมนัยกับจุดยอด Z',
    explanation: 'ถูกต้อง! เพราะมุมภายในของ △ABC รวมกันได้ 180° ดังนั้น ∠C = 180° - (48° + 72°) = 180° - 120° = 60° และเนื่องจาก △ABC ≅ △XYZ จุดยอด C สมนัยกับ Z ทำให้ ∠Z = ∠C = 60°',
  },
  {
    id: 4,
    questionText: 'จากรูปสามเหลี่ยมหน้าจั่ว ABC มี AB = AC และลากเส้น AD มาตั้งฉากกับฐาน BC ที่จุด D รูปสามเหลี่ยม ABD เท่ากันทุกประการกับรูปสามเหลี่ยม ACD ด้วยเงื่อนไขใดที่ชัดเจนที่สุด?',
    contextText: 'พิจารณาด้านร่วม AD และมุมฉากที่จุด D',
    diagramType: 'ISOSCELES',
    options: [
      { id: 'A', text: 'ฉาก - ด้าน - ด้าน (ฉ.ด.ด.) หรือ ด้าน - ด้าน - ด้าน (ด.ด.ด.)' },
      { id: 'B', text: 'มุม - มุม - มุม (ม.ม.ม.)' },
      { id: 'C', text: 'ด้าน - ด้าน - มุม ที่มุมไม่ใช่มุมฉาก' },
      { id: 'D', text: 'ไม่สามารถสรุปได้ว่าเท่ากันทุกประการ' },
    ],
    correctOptionId: 'A',
    hint: '∠ADB = ∠ADC = 90° (ฉาก), ด้านตรงข้ามมุมฉาก AB = AC (ด้าน), และมีด้านร่วม AD (ด้าน)',
    explanation: 'ถูกต้อง! มีมุมฉาก ∠ADB = ∠ADC = 90°, ด้านตรงข้ามมุมฉาก AB = AC, และด้านประกอบมุมฉาก AD เป็นด้านร่วม (ยาวเท่ากันกับตัวเอง) จึงสรุปได้ด้วย ฉ.ด.ด. (RHS) หรือเมื่อ D แบ่งครึ่งฐานก็สรุปด้วย ด.ด.ด. ได้เช่นกัน',
  },
  {
    id: 5,
    questionText: 'จากรูปสี่เหลี่ยมด้านขนาน ABCD มีเส้นทแยงมุม AC รูปสามเหลี่ยม ABC และ CDA เท่ากันทุกประการด้วยเหตุผลคู่มุมและด้านใด?',
    contextText: 'อาศัยสมบัติของเส้นขนานที่ทำให้เกิด "มุมแย้ง" มีขนาดเท่ากัน และเส้นทแยงมุมเป็นด้านร่วม',
    diagramType: 'PARALLELOGRAM',
    options: [
      { id: 'A', text: 'มุม - ด้าน - มุม (ม.ด.ม.) โดยมี AC เป็นด้านร่วม' },
      { id: 'B', text: 'ฉาก - ด้าน - ด้าน (ฉ.ด.ด.)' },
      { id: 'C', text: 'มุม - มุม - มุม (ม.ม.ม.)' },
      { id: 'D', text: 'ด้าน - ด้าน - มุม (ด.ด.ม.)' },
    ],
    correctOptionId: 'A',
    hint: 'มุมแย้ง ∠BAC = ∠DCA (มุมคู่ที่ 1), ด้านร่วม AC = CA (ด้านแขนร่วม), และมุมแย้ง ∠BCA = ∠DAC (มุมคู่ที่ 2)',
    explanation: 'ถูกต้อง! เนื่องจาก AB ขนานกับ CD ทำให้มุมแย้ง ∠BAC = ∠DCA และ BC ขนานกับ AD ทำให้มุมแย้ง ∠BCA = ∠DAC โดยมีด้าน AC เป็นแขนร่วมที่ยาวเท่ากัน จึงสรุปได้ด้วย มุม-ด้าน-มุม (ม.ด.ม.)',
  },
  {
    id: 6,
    questionText: 'ทำไมเงื่อนไข "มุม - มุม - มุม (ม.ม.ม.)" จึงไม่เพียงพอที่จะสรุปว่ารูปสามเหลี่ยมสองรูปเท่ากันทุกประการ?',
    contextText: 'ลองนึกถึงรูปสามเหลี่ยมด้านเท่าขนาดเล็กและขนาดใหญ่',
    diagramType: 'ASA',
    options: [
      { id: 'A', text: 'เพราะมุมภายในสามเหลี่ยมไม่เท่ากับ 180°' },
      { id: 'B', text: 'เพราะรูปอาจมีขนาดต่างกัน (เป็นการขยายหรือย่อส่วน) เป็นเพียงรูปที่คล้ายกัน' },
      { id: 'C', text: 'เพราะมุมไม่สามารถวัดค่าได้แน่นอน' },
      { id: 'D', text: 'จริงๆ แล้ว ม.ม.ม. เท่ากันทุกประการเสมอ' },
    ],
    correctOptionId: 'B',
    hint: 'สามเหลี่ยมด้านเท่าทุกรูปมีมุม 60°, 60°, 60° เท่ากันหมด แต่ขนาดด้านเท่ากันไหม?',
    explanation: 'ถูกต้อง! ถ้ามุมเท่ากันทั้งสามมุม รูปจะมี "รูปร่างเหมือนกัน" แต่ขนาดความยาวด้านอาจยาว 1 ซม. กับอีกรูปยาว 10 ซม. ซึ่งจัดเป็นรูปสามเหลี่ยมที่ "คล้ายกัน" (Similar) แต่ไม่เท่ากันทุกประการ (Not Congruent) เพราะทับกันไม่สนิท',
  },
  {
    id: 7,
    questionText: 'ถ้าเขียนสัญลักษณ์แสดงความเท่ากันทุกประการว่า △PQR ≅ △XYZ ข้อใดต่อไปนี้ระบุคู่ด้านที่สมนัยกันได้ "ถูกต้องที่สุด"?',
    contextText: 'การเขียนชื่อรูปสามเหลี่ยมที่เท่ากันทุกประการ ต้องเรียงลำดับจุดยอดที่สมนัยกันตามลำดับเสมอ',
    diagramType: 'SSS',
    options: [
      { id: 'A', text: 'PQ สมนัยกับ YZ, QR สมนัยกับ XY, PR สมนัยกับ XZ' },
      { id: 'B', text: 'PQ สมนัยกับ XY, QR สมนัยกับ YZ, PR สมนัยกับ XZ' },
      { id: 'C', text: 'PQ สมนัยกับ XZ, QR สมนัยกับ XY, PR สมนัยกับ YZ' },
      { id: 'D', text: 'ด้านใดๆ ก็สมนัยกันได้ทั้งหมดโดยไม่ต้องดูตัวอักษร' },
    ],
    correctOptionId: 'B',
    hint: 'ดูตัวอักษรตัวที่ 1-2 (PQ จับคู่กับ XY), ตัวที่ 2-3 (QR กับ YZ), และตัวที่ 1-3 (PR กับ XZ)',
    explanation: 'ถูกต้อง! ตามหลักเรขาคณิต การเขียน △PQR ≅ △XYZ กำหนดให้จุดยอด P ↔ X, จุดยอด Q ↔ Y และจุดยอด R ↔ Z ดังนั้น ด้านที่สมนัยกันคือ ด้าน PQ = XY, ด้าน QR = YZ และด้าน PR = XZ เสมอ',
  },
];

export const GLOSSARY_ITEMS = [
  {
    term: 'ความเท่ากันทุกประการ (Congruence)',
    symbol: '≅',
    def: 'รูปเรขาคณิตสองรูปเท่ากันทุกประการ ก็ต่อเมื่อ เคลื่อนที่รูปหนึ่งไปทับอีกรูปหนึ่งได้สนิทพอดี',
  },
  {
    term: 'สมนัยกัน (Corresponding)',
    symbol: '↔',
    def: 'การจับคู่ระหว่างจุดยอด มุม หรือด้านของรูปเรขาคณิตสองรูปที่มีตำแหน่งสอดคล้องกัน',
  },
  {
    term: 'การแปลงทางเรขาคณิต (Isometry / Rigid Motion)',
    symbol: 'T, R, M',
    def: 'การเคลื่อนที่โดยรักษาระยะทางและขนาดมุม ได้แก่ การเลื่อนขนาน (Translation), การหมุน (Rotation), และการสะท้อน (Reflection)',
  },
  {
    term: 'มุมในระหว่างด้าน (Included Angle)',
    symbol: '∠',
    def: 'มุมที่เกิดจากด้านสองด้านที่กำหนดมาบรรจบกันที่จุดยอดเดียวกัน (สำหรับ ด.ม.ด.)',
  },
  {
    term: 'ด้านแขนร่วม (Included Side)',
    symbol: '—',
    def: 'ด้านที่เป็นแขนของมุมทั้งสองมุมวางอยู่บนปลายด้านนั้น (สำหรับ ม.ด.ม.)',
  },
  {
    term: 'ด้านร่วม (Common Side)',
    symbol: '≡',
    def: 'ด้านของรูปเรขาคณิตที่เป็นด้านเดียวกันในสามเหลี่ยมสองรูปที่ติดกัน (ยาวเท่ากันเสมอ)',
  },
  {
    term: 'มุมแย้ง (Alternate Angles)',
    symbol: 'Z',
    def: 'เมื่อเส้นตรงเส้นหนึ่งตัดเส้นขนานคู่หนึ่ง มุมแย้งภายในจะมีขนาดเท่ากันเสมอ',
  },
];
