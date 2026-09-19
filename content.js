/* =====================================================================
   content.js — サイトの「中身」はすべてこのファイルにあります。
   ---------------------------------------------------------------------
   書き方のルール
   * 英語と日本語で文言が違うものは  {en: '英語', ja: '日本語'}  と書く。
   * 両言語で同じ文字列（論文題目・人名・英語の会議名など）は  '文字列'  と書くだけでよい。
   * 文字列の中では HTML が使える（<a href="…">リンク</a>、<sub>3</sub>、<br> など）。
   * 項目を追加するときは、同じ配列の要素をコピーして書き換える。並び順は新しいものが上。
   * 発表の badges は kind: 'type'（Poster/Oral など）, 'status'（受賞・査読中）, 'plan'（発表予定）。
   * 自分の名前を太字下線にするには  ME_EN / ME_JA  を使う。
   ===================================================================== */

var ME_EN = '<span class="me">T. R. Fuchs</span>';
var ME_JA = '<span class="me">フックストリスタン龍馬</span>';
var AUTHORS_EN = ME_EN + ', T. Nomoto, H. Watanabe, R. Arita';
var AUTHORS_JA = ME_JA + '、野本拓也、渡邉光、有田亮太郎';

/* よく使うバッジ */
var POSTER   = { kind: 'type',   text: { en: 'Poster',            ja: 'ポスター' } };
var ORAL     = { kind: 'type',   text: { en: 'Oral',              ja: '口頭' } };
var UPCOMING = { kind: 'plan',   text: { en: 'Upcoming',          ja: '発表予定' } };
var BEST_POSTER = { kind: 'status', text: { en: 'Best Poster Award', ja: '優秀ポスター賞' } };

window.SITE = {

  /* ---------- ブラウザのタブに出るタイトル ---------- */
  title: {
    en: 'フックストリスタン龍馬',
    ja: 'フックストリスタン龍馬'
  },

  /* ---------- 読み上げ用ラベル（画面には出ない） ---------- */
  aria: {
    en: { lang: 'Language', sections: 'Sections', top: 'Back to top', photo: 'Portrait of Tristan Ryoma Fuchs',
          toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
    ja: { lang: '言語',     sections: '目次',     top: 'ページ上部へ', photo: 'フックストリスタン龍馬の写真',
          toDark: 'ダークモードに切り替え', toLight: 'ライトモードに切り替え' }
  },

  /* ---------- サイドバー ---------- */
  profile: {
    photo: 'assets/profile.jpg',   // 無い場合はイニシャルを表示
    initials: 'TF',
    name:    { en: 'Tristan Ryoma Fuchs', ja: 'フックストリスタン龍馬' },
    nameSub: { en: 'フックストリスタン龍馬', ja: 'Tristan Ryoma Fuchs' },
    role:    { en: 'Master’s Student (M2)', ja: '修士課程2年' },
    affiliation: {
      en: '<a href="https://arita-lab.phys.s.u-tokyo.ac.jp/index_en.html" target="_blank" rel="noopener">Arita Group</a>, <a href="https://www.phys.s.u-tokyo.ac.jp/en/" target="_blank" rel="noopener">Department of Physics</a><br>' +
          '<a href="https://www.u-tokyo.ac.jp/en/" target="_blank" rel="noopener">The University of Tokyo</a><br>' +
          '<a href="https://www.merit.t.u-tokyo.ac.jp/merit/en/index.html" target="_blank" rel="noopener">MERIT-WINGS</a> program student',
      ja: '<a href="https://www.u-tokyo.ac.jp/ja/" target="_blank" rel="noopener">東京大学大学院</a> 理学系研究科<br>' +
          '<a href="https://www.phys.s.u-tokyo.ac.jp/" target="_blank" rel="noopener">物理学専攻</a> <a href="https://arita-lab.phys.s.u-tokyo.ac.jp/index.html" target="_blank" rel="noopener">有田研究室</a><br>' +
          '<a href="https://www.merit.t.u-tokyo.ac.jp/merit/index.html" target="_blank" rel="noopener">MERIT-WINGS</a> コース生'
    },
    bio: {
      en: 'Hi, I’m Tristan. Half Japanese, half German, I grew up in Shanghai, where I went to school from elementary through high school. In my free time I go motorcycling.',
      ja: '日本とドイツのハーフで、小学校から高校までは中国・上海で過ごしました。趣味はバイクで、休みの日はよくツーリングに出かけます。いまは歯列矯正中です。'
    },
    interests: { en: 'Interests: Superconductivity · DFT', ja: '興味：超伝導・DFT' },

    /* 連絡先。メールのボタンは押すと「user at domain」の形でクリップボードにコピーされる（@ は書かない） */
    email: { user: 'tristan', domain: 'g.ecc.u-tokyo.ac.jp' },
    cv: 'assets/cv.pdf',
    labels: {
      contact:  { en: 'Contact',  ja: '連絡先' },
      email:    { en: 'Email',    ja: 'メール' },
      copied:   { en: 'Copied!',  ja: 'コピー済み' },     // 「履歴書 (PDF)」が次の行に落ちない長さにしておく
      cv:       { en: 'CV (PDF)', ja: '履歴書 (PDF)' },
      profiles: { en: 'Profiles', ja: 'アカウント' },
      sections: { en: 'Sections', ja: '目次' }
    },
    /* 外部アカウント */
    profiles: [
      { label: 'ORCID',  url: 'https://orcid.org/0009-0008-1109-7449', title: 'ORCID iD 0009-0008-1109-7449' },
      { label: 'GitHub', url: 'https://github.com/TristanFuchs1024' },
      { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=8yZOrnUAAAAJ' }
    ],
    updated: { en: 'Last updated: September 2026', ja: '最終更新：2026年9月' }
  },

  /* ---------- 本文の各セクション（この順番で表示され、目次もこの順） ---------- */
  sections: [

    /* ===== 論文 ===== */
    {
      id: 'publications',
      title: { en: 'Publications', ja: '論文' },
      type: 'publications',
      items: [
        {
          authors: ME_EN + ', T. Nomoto, H. Watanabe, and R. Arita',
          title: 'Microscopic calculation of coherence lengths and magnetic penetration depth in multiband superconductors',
          // 掲載後は venue を誌名・巻・ページ（DOI リンク）に書き換え、badge を外す
          venue: '<a href="https://arxiv.org/abs/2609.06014" target="_blank" rel="noopener">arXiv:2609.06014</a> [cond-mat.supr-con] (2026)',
          badge: { kind: 'status', text: { en: 'Under review', ja: '査読中' } }
        }
      ]
    },

    /* ===== 学会発表 ===== */
    {
      id: 'presentations',
      title: { en: 'Presentations', ja: '学会発表' },
      type: 'groups',
      groups: [
        {
          /* 国際会議: 題目・著者・会場はすべて英語（日本語ページでも英語のまま） */
          title: { en: 'International', ja: '国際会議' },
          items: [
            {
              id: 'pres-iqms2026',
              when: { en: 'Nov–Dec 2026', ja: '2026年11–12月' },
              title: 'Microscopic Calculation of Characteristic Length Scales in Multi-Band Superconductors',
              badges: [POSTER, UPCOMING],
              meta: AUTHORS_EN + ' — International Quantum Materials Symposium (i‑QMS 2026), Phoenix Island Resort, Jeju, Korea'
            },
            {
              id: 'pres-sces2026',
              when: { en: 'Sep 2026', ja: '2026年9月' },
              title: 'Microscopic Calculation of Characteristic Length Scales in Multi-band Superconductors',
              badges: [POSTER, UPCOMING],
              meta: AUTHORS_EN + ' — International Conference on Strongly Correlated Electron Systems (SCES 2026), Toyama International Conference Center, Toyama, Japan'
            },
            {
              id: 'pres-asymmetry2026',
              when: { en: 'Sep 2026', ja: '2026年9月' },
              title: 'Microscopic Calculation of Coherence Lengths and Magnetic Penetration Depth in Multi-Band Superconductors',
              badges: [POSTER, UPCOMING],
              meta: AUTHORS_EN + ' — International Conference on Asymmetric Quantum Matters (Asymmetry 2026), Osaka University Hall, Toyonaka, Osaka, Japan'
            },
            {
              when: { en: 'Feb 2026', ja: '2026年2月' },
              title: 'Microscopic Calculation of Coherence Lengths and Magnetic Penetration Depth in Two Band Superconductors',
              badges: [POSTER],
              meta: AUTHORS_EN + ' — CEMS Topical Meeting on Recent Trends in Superconductivity, RIKEN Center for Emergent Matter Science, Wako, Japan'
            },
            {
              when: { en: 'Sep 2025', ja: '2025年9月' },
              title: 'Microscopic Calculation of Coherence Length and Magnetic Penetration Depth in Superconductors',
              badges: [POSTER],
              meta: AUTHORS_EN + ' — Autumn School on Correlated Electrons: Understanding Correlated Materials with DMFT, Forschungszentrum Jülich, Germany'
            }
          ]
        },
        {
          /* 国内会議: 題目・著者・会場は日本語（英語ページでも日本語のまま） */
          title: { en: 'Domestic', ja: '国内会議' },
          items: [
            {
              id: 'pres-jps2026a',
              when: { en: 'Sep 2026', ja: '2026年9月' },
              title: '実空間BdG法に基づくコヒーレンス長と磁場侵入長の計算',
              badges: [POSTER],
              meta: AUTHORS_JA + ' — 日本物理学会 第81回年次大会（領域6、東京大学 駒場キャンパス）'
            },
            {
              id: 'pres-merit-camp',
              when: { en: 'Sep 2026', ja: '2026年9月' },
              title: '多バンド超伝導体における長さスケールの拡張GL法に基づく微視的計算',
              badges: [POSTER, BEST_POSTER],
              meta: AUTHORS_JA + ' — MERITキャンプ2026（いこいの村ヘリテイジ美の山、埼玉県皆野町）'
            },
            {
              id: 'pres-wakate-talk',
              when: { en: 'Aug 2026', ja: '2026年8月' },
              title: '多バンド超伝導体におけるコヒーレンス長と磁場侵入長の拡張GL理論に基づく微視的計算',
              badges: [ORAL],
              meta: AUTHORS_JA + ' — 第71回物性若手夏の学校（阿蘇プラザホテル、熊本県阿蘇市）'
            },
            {
              id: 'pres-wakate-poster',
              when: { en: 'Aug 2026', ja: '2026年8月' },
              title: '多バンド超伝導体におけるコヒーレンス長と磁場侵入長の拡張GL理論に基づく微視的計算',
              badges: [POSTER],
              meta: AUTHORS_JA + ' — 第71回物性若手夏の学校（阿蘇プラザホテル、熊本県阿蘇市）'
            },
            {
              when: { en: 'May 2026', ja: '2026年5月' },
              title: '多バンド超伝導体におけるコヒーレンス長および磁場侵入長の微視的計算',
              badges: [POSTER],
              meta: AUTHORS_JA + ' — 学術変革領域研究(A)「アシンメトリ量子」領域全体会議・公募研究キックオフ（ラフォーレ那須、栃木県那須町）'
            },
            {
              when: { en: 'Mar 2026', ja: '2026年3月' },
              title: '2バンド超伝導体におけるコヒーレンス長と磁場侵入長の微視的計算',
              badges: [ORAL],
              meta: AUTHORS_JA + ' — 日本物理学会 2026年春季大会（領域6、オンライン開催）'
            },
            {
              id: 'pres-keisan2026',
              when: { en: 'Mar 2026', ja: '2026年3月' },
              title: '2バンド超伝導体におけるコヒーレンス長および磁場侵入長の微視的計算',
              badges: [POSTER, BEST_POSTER],
              meta: AUTHORS_JA + ' — 計算物理春の学校2026（沖縄）'
            }
          ]
        }
      ]
    },

    /* ===== 受賞 ===== */
    {
      id: 'awards',
      title: { en: 'Awards &amp; Honors', ja: '受賞' },
      type: 'entries',
      items: [
        {
          id: 'award-merit-camp',
          when: { en: 'Sep 2026', ja: '2026年9月' },
          title: { en: 'Best Poster Award', ja: '優秀ポスター賞' },
          meta: '<a href="#pres-merit-camp">MERITキャンプ2026</a>'
        },
        {
          when: { en: 'Mar 2026', ja: '2026年3月' },
          title: { en: 'Best Poster Award', ja: '優秀ポスター賞' },
          meta: '<a href="#pres-keisan2026">計算物理春の学校2026</a>'
        }
      ]
    },

    /* ===== フェローシップ ===== */
    {
      id: 'fellowships',
      title: { en: 'Fellowships', ja: 'フェローシップ' },
      type: 'entries',
      items: [
        {
          when: { en: 'Oct 2025 – present', ja: '2025年10月 – 現在' },
          title: { en: 'MERIT-WINGS Program, The University of Tokyo', ja: 'MERIT-WINGS コース生' },
          metaLines: [
            { en: '<a href="https://www.merit.t.u-tokyo.ac.jp/merit/en/index.html" target="_blank" rel="noopener">World-leading Innovative Graduate Study Program for Materials Research, Information, and Technology</a> (統合物質・情報国際卓越大学院) — program student' },
            { ja: '<a href="https://www.merit.t.u-tokyo.ac.jp/merit/index.html" target="_blank" rel="noopener">東京大学 統合物質・情報国際卓越大学院（MERIT-WINGS）</a>' }
          ]
        }
      ]
    },

    /* ===== 学歴 ===== */
    {
      id: 'education',
      title: { en: 'Education', ja: '学歴' },
      type: 'entries',
      items: [
        {
          when: { en: 'Apr 2025 – present', ja: '2025年4月 – 現在' },
          title: { en: 'Master’s Program in Physics', ja: '東京大学大学院 理学系研究科 物理学専攻 修士課程 在学中' },
          meta: { en: 'Department of Physics, Graduate School of Science, The University of Tokyo' },   // 英語ページのみ
          notes: [
            { en: 'Supervisor: <a href="https://arita-lab.phys.s.u-tokyo.ac.jp/index_en.html" target="_blank" rel="noopener">Ryotaro Arita</a>',
              ja: '指導教員：<a href="https://arita-lab.phys.s.u-tokyo.ac.jp/index.html" target="_blank" rel="noopener">有田亮太郎</a>' }
          ]
        },
        {
          when: { en: 'Apr 2021 – Mar 2025', ja: '2021年4月 – 2025年3月' },
          title: { en: 'B.Sc. in Physics', ja: '東北大学 理学部 物理学科 卒業' },
          meta: { en: 'Department of Physics, Faculty of Science, Tohoku University' },
          notes: [
            { en: 'Supervisor: <a href="http://www.cmpt.phys.tohoku.ac.jp/u/koretsune/index.html" target="_blank" rel="noopener">Takashi Koretsune</a>',
              ja: '指導教員：<a href="http://www.cmpt.phys.tohoku.ac.jp/u/koretsune/index_j.html" target="_blank" rel="noopener">是常隆</a>' },
            { en: 'First-principles Migdal–Eliashberg calculation of the superconducting gap functions of Al and H<sub>3</sub>S',
              ja: '卒業研究：Al と H<sub>3</sub>S の超伝導ギャップ関数の第一原理 Migdal–Eliashberg 計算' }
          ]
        },
        {
          when: { en: 'Sep 2016 – Jun 2020', ja: '2016年9月 – 2020年6月' },
          title: { en: 'Shanghai Jincai High School, International Division', ja: '上海市進才中学 国際部' },
          meta: { en: 'Shanghai, China — Grades 9–12 (<a href="https://www.jcid.cn/" target="_blank" rel="noopener">Official site</a>)',
                  ja: '中国・上海 — 9〜12年生（<a href="https://www.jcid.cn/" target="_blank" rel="noopener">公式サイト</a>）' },
          callout: {
            label: { en: 'Interview', ja: 'インタビュー' },
            text: {
              en: '<a href="https://www.spring-js.com/global/5831/" target="_blank" rel="noopener">“Why the International Baccalaureate?” Part 8: Japanese Universities</a> (<em>Spring</em>, March 2023, in Japanese) — on why I chose the International Baccalaureate in Grades 11–12 and how it helped me at university.',
              ja: '<a href="https://www.spring-js.com/global/5831/" target="_blank" rel="noopener">なぜ「国際バカロレア」なのか 第8回 日本の大学編</a>（<em>Spring</em>、2023年3月）— 11・12年生で国際バカロレアを選んだ理由と、そこでの学びが大学でどう活きているかを話しました。'
            }
          }
        },
        {
          when: { en: 'Apr 2008 – Aug 2016', ja: '2008年4月 – 2016年8月' },
          title: { en: 'Shanghai Japanese School, Pudong Campus', ja: '上海日本人学校 浦東校' },
          meta: { en: 'Shanghai, China — Grades 1–9 (<a href="https://srx2.net.cn/sjs-pudong/" target="_blank" rel="noopener">Official site</a>)',
                  ja: '中国・上海 — 小学1年〜中学3年（<a href="https://srx2.net.cn/sjs-pudong/" target="_blank" rel="noopener">公式サイト</a>）' }
        }
      ]
    },

    /* ===== 経歴・活動 ===== */
    {
      id: 'experience',
      title: { en: 'Experience', ja: '経歴・活動' },
      type: 'groups',
      groups: [
        {
          title: { en: 'Teaching', ja: '教育活動' },
          items: [
            {
              when: { en: 'Spring 2024', ja: '2024年度 前期' },
              title: { en: 'Teaching Assistant — 学問論 (first-year general education course)', ja: 'ティーチング・アシスタント — 学問論' },
              meta: { en: 'General Education, Tohoku University', ja: '東北大学 全学教育' }
            }
          ]
        },
        {
          title: { en: 'Industry', ja: '企業での活動' },
          items: [
            {
              when: { en: 'Dec 2023 – present', ja: '2023年12月 – 現在' },
              title: { en: 'Student Staff Lead — Nagase Brothers Inc.', ja: '教務研究員リーダー — 株式会社ナガセ' },
              notes: [
                { en: 'Oct 2024 – present: development of internal automation tools at Yotsuya Otsuka',
                  ja: '2024年10月 – 現在：四谷大塚での業務自動化ツール開発' },
                { en: 'Dec 2023 – Mar 2026: project management at Toshin Digital University',
                  ja: '2023年12月 – 2026年3月：東進デジタルユニバーシティでのプロジェクト管理' }
              ]
            }
          ]
        },
        {
          title: { en: 'Extracurricular Activities', ja: '課外活動' },
          items: [
            {
              when: { en: 'Oct 2025 – Sep 2026', ja: '2025年10月 – 2026年9月' },
              title: { en: 'Deputy Organizer, MERIT Camp', ja: 'MERITキャンプ 副代表' },
              meta: { en: 'The University of Tokyo', ja: '東京大学' }
            },
            {
              when: { en: 'Oct 2023 – Mar 2025', ja: '2023年10月 – 2025年3月' },
              title: { en: 'Student Staff, Kita-Aobayama Library (Science &amp; Pharmacy Library)', ja: '附属図書館 北青葉山分館（理薬図書館） 学生スタッフ' },
              meta: { en: 'Tohoku University', ja: '東北大学' }
            },
            {
              when: { en: 'Apr 2022 – Mar 2023', ja: '2022年4月 – 2023年3月' },
              title: { en: 'Vice President, 物理の会 (“Butsuri no Kai”, physics seminar society)', ja: 'ゼミサークル「物理の会」副代表' },
              meta: { en: 'Tohoku University', ja: '東北大学' }
            }
          ]
        }
      ]
    },

    /* ===== 資格 ===== */
    {
      id: 'certifications',
      title: { en: 'Certifications', ja: '資格' },
      type: 'entries',
      items: [
        { when: { en: '2026', ja: '2026年' }, title: { en: 'EIKEN Grade 1 (実用英語技能検定 1級)', ja: '実用英語技能検定（英検）1級' } },
        { when: { en: '2025', ja: '2025年' }, title: { en: 'Applied Information Technology Engineer Examination (応用情報技術者試験) — passed', ja: '応用情報技術者試験 合格' } },
        { when: { en: '2024', ja: '2024年' }, title: 'TOEFL iBT 105' },
        { when: { en: '2024', ja: '2024年' }, title: 'TOEIC Listening &amp; Reading 960' },
        { when: { en: '2022', ja: '2022年' }, title: { en: 'HSK Level 4 (Chinese Proficiency Test, 汉语水平考试)', ja: 'HSK（汉语水平考试）4級' } }
      ]
    }
  ],

  /* ---------- ページ末尾 ---------- */
  footer: {
    en: 'Tristan Ryoma Fuchs · Department of Physics, The University of Tokyo',
    ja: 'フックストリスタン龍馬｜東京大学大学院 理学系研究科 物理学専攻'
  }
};
