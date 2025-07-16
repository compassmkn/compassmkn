document.addEventListener('DOMContentLoaded', () => {

    // --- データ定義 ---
    const heritageSites = [
        // 自然遺産
        { id: 'shiretoko', name: '知床', type: 'natural', region: 'hokkaido_tohoku', theme: 'ocean', activity: 'active', scale: 'grand', description: '流氷が育む豊かな海洋生態系とヒグマが暮らす原生的な自然。クルーズや自然散策でその雄大さを体感できます。' },
        { id: 'shirakami', name: '白神山地', type: 'natural', region: 'hokkaido_tohoku', theme: 'forest', activity: 'active', scale: 'serene', description: '世界最大級の原生的なブナ林が広がる地域。手つかずの自然の中で静寂なトレッキングを楽しめます。' },
        { id: 'ogasawara', name: '小笠原諸島', type: 'natural', region: 'islands', theme: 'ocean', activity: 'active', scale: 'grand', description: '独自の進化を遂げた固有種が多く「東洋のガラパゴス」と呼ばれる。ホエールウォッチングやドルフィンスイムが人気。' },
        { id: 'yakushima', name: '屋久島', type: 'natural', region: 'kyushu_okinawa', theme: 'forest', activity: 'active', scale: 'serene', description: '樹齢数千年の縄文杉が象徴的な、神秘的な苔むす森。多彩なトレッキングコースで自然の奥深さに触れられます。' },
        { id: 'amami_okinawa', name: '奄美大島、徳之島、沖縄島北部及び西表島', type: 'natural', region: 'kyushu_okinawa', theme: 'forest', activity: 'active', scale: 'serene', description: 'アマミノクロウサギやヤンバルクイナなど絶滅危惧種が多く生息する亜熱帯の森。カヌーやジャングルトレッキングが魅力。' },
        
        // 文化遺産
        { id: 'hiraizumi', name: '平泉', type: 'cultural', region: 'hokkaido_tohoku', theme: 'religion', activity: 'relax', scale: 'serene', description: '奥州藤原氏が築いた仏国土（理想郷）。金色堂の輝きと浄土庭園の美しさが、往時の栄華を物語ります。' },
        { id: 'jomon', name: '北海道・北東北の縄文遺跡群', type: 'cultural', region: 'hokkaido_tohoku', theme: 'ancient', activity: 'relax', scale: 'serene', description: '1万年以上にわたる縄文時代の生活や精神文化を伝える集落跡。三内丸山遺跡などが有名です。' },
        { id: 'nikko', name: '日光の社寺', type: 'cultural', region: 'kanto_chubu', theme: 'religion', activity: 'relax', scale: 'grand', description: '徳川家康を祀る日光東照宮をはじめとする豪華絢爛な建築群。自然と信仰が融合した聖地です。' },
        { id: 'tomioka', name: '富岡製糸場と絹産業遺産群', type: 'cultural', region: 'kanto_chubu', theme: 'industry', activity: 'relax', scale: 'grand', description: '日本の近代化を支えた絹産業の歴史を物語る工場や施設。明治時代の技術革新の息吹を感じられます。' },
        { id: 'fuji', name: '富士山－信仰の対象と芸術の源泉', type: 'cultural', region: 'kanto_chubu', theme: 'religion', activity: 'active', scale: 'grand', description: '古くから信仰の対象とされ、数多くの芸術作品に描かれてきた日本の象徴。登山だけでなく、周辺の神社や湖からの眺めも格別。' },
        { id: 'lecorbusier', name: 'ル・コルビュジエの建築作品（国立西洋美術館）', type: 'cultural', region: 'kanto_chubu', theme: 'modern', activity: 'relax', scale: 'serene', description: '近代建築の巨匠ル・コルビュジエが設計した美術館。光と空間が巧みに操られた芸術的な建築です。' },
        { id: 'kyoto', name: '古都京都の文化財', type: 'cultural', region: 'kinki', theme: 'religion', activity: 'relax', scale: 'serene', description: '日本の伝統文化の中心地。清水寺や金閣寺など、歴史ある神社仏閣や庭園が数多く点在します。' },
        { id: 'nara', name: '古都奈良の文化財', type: 'cultural', region: 'kinki', theme: 'ancient', activity: 'relax', scale: 'grand', description: '東大寺の大仏や春日大社の社殿など、天平文化が華開いた時代の壮大な歴史遺産が残ります。' },
        { id: 'kii', name: '紀伊山地の霊場と参詣道', type: 'cultural', region: 'kinki', theme: 'religion', activity: 'active', scale: 'serene', description: '熊野古道などの巡礼路が、吉野・大峯、熊野三山、高野山の三大霊場を結ぶ、自然と信仰が織りなす聖地。' },
        { id: 'himeji', name: '姫路城', type: 'cultural', region: 'kinki', theme: 'history', activity: 'relax', scale: 'grand', description: '白鷺が羽を広げたような優美な姿から「白鷺城」と称される、日本で最も美しいとされる城。' },
        { id: 'mozu_furuichi', name: '百舌鳥・古市古墳群', type: 'cultural', region: 'kinki', theme: 'ancient', activity: 'relax', scale: 'grand', description: '仁徳天皇陵古墳をはじめとする、巨大な鍵穴形の古墳が点在。古代日本の権力の大きさを物語ります。' },
        { id: 'genbaku', name: '原爆ドーム', type: 'cultural', region: 'chugoku_shikoku', theme: 'history', activity: 'relax', scale: 'serene', description: '核兵器の惨禍を今に伝え、恒久平和を訴えかける人類の負の遺産。静かに歴史と向き合う場所です。' },
        { id: 'itsukushima', name: '厳島神社', type: 'cultural', region: 'chugoku_shikoku', theme: 'religion', activity: 'relax', scale: 'serene', description: '海に浮かぶように建つ朱塗りの社殿と大鳥居が幻想的な神社。自然と一体となった景観美は必見です。' },
        { id: 'iwami', name: '石見銀山遺跡とその文化的景観', type: 'cultural', region: 'chugoku_shikoku', theme: 'industry', activity: 'active', scale: 'serene', description: 'かつて世界の銀産出量の一角を担った銀山。自然の中に溶け込むように残る町並みや坑道跡を散策できます。' },
        { id: 'sado', name: '佐渡島の金山', type: 'cultural', region: 'kanto_chubu', theme: 'industry', activity: 'relax', scale: 'grand', description: '江戸時代から平成まで続いた日本最大の金銀山。当時の採掘の様子を再現した坑道を見学できます。' },
        { id: 'okinoshima', name: '「神宿る島」宗像・沖ノ島と関連遺産群', type: 'cultural', region: 'kyushu_okinawa', theme: 'religion', activity: 'relax', scale: 'serene', description: '島全体が御神体とされ、女人禁制など厳しい禁忌が今も残る。古代祭祀の跡が手つかずで発見されています。' },
        { id: 'nagasaki_church', name: '長崎と天草地方の潜伏キリシタン関連遺産', type: 'cultural', region: 'kyushu_okinawa', theme: 'religion', activity: 'relax', scale: 'serene', description: '厳しい弾圧の中、信仰を守り抜いた潜伏キリシタンの歴史を物語る教会や集落跡が点在します。' },
        { id: 'meiji_sangyo', name: '明治日本の産業革命遺産', type: 'cultural', region: 'kyushu_okinawa', theme: 'industry', activity: 'relax', scale: 'grand', description: '幕末から明治にかけ、日本の重工業化を支えた遺産群。軍艦島（端島炭鉱）もこれに含まれます。' },
        { id:g: 'gusuku', name: '琉球王国のグスク及び関連遺産群', type: 'cultural', region: 'kyushu_okinawa', theme: 'history', activity: 'relax', scale: 'grand', description: 'かつて存在した琉球王国の歴史と独特の文化を伝える城（グスク）跡。首里城跡などが代表的です。' }
    ];

    const questions = [
        { key: 'type', text: 'Q1. どんなテーマに惹かれる？', options: { natural: '🏞️ 自然の絶景', cultural: '🏯 歴史や文化' } },
        { key: 'region', text: 'Q2. どのエリアを旅したい？', options: { hokkaido_tohoku: '北海道・東北', kanto_chubu: '関東・中部', kinki: '近畿', chugoku_shikoku: '中国・四国', kyushu_okinawa: '九州・沖縄', islands: '離島' } },
        { key: 'theme', text: 'Q3. 特に興味があるのは？', options: { ocean: '海・島', forest: '森・山', religion: '寺社・信仰', history: '城・歴史', ancient: '古代のロマン', industry: '近代産業', modern: '現代建築' } },
        { key: 'activity', text: 'Q4. どんな風に過ごしたい？', options: { active: '🧗 アクティブに体験', relax: '🖼️ じっくり鑑賞' } },
        { key: 'scale', text: 'Q5. どんな雰囲気が好き？', options: { grand: '웅대 壮大・ダイナミック', serene: '静寂 静か・神秘的' } }
    ];

    // --- DOM要素 ---
    const screens = {
        start: document.getElementById('start-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen'),
    };
    const startButton = document.getElementById('start-button');
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const restartButton = document.getElementById('restart-button');

    // --- 状態管理 ---
    let currentQuestionIndex = 0;
    let userAnswers = {};

    // --- 関数 ---
    function showScreen(screenId) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenId].classList.add('active');
    }

    function renderQuestion() {
        if (currentQuestionIndex >= questions.length) {
            diagnose();
            return;
        }

        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = ''; // コンテナをクリア

        const questionText = document.createElement('h2');
        questionText.textContent = question.text;
        questionContainer.appendChild(questionText);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'answer-options';

        for (const [value, text] of Object.entries(question.options)) {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = text;
            button.dataset.value = value;
            button.addEventListener('click', handleAnswer);
            optionsContainer.appendChild(button);
        }
        questionContainer.appendChild(optionsContainer);

        // プログレスバー更新
        const progress = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function handleAnswer(event) {
        userAnswers[questions[currentQuestionIndex].key] = event.target.dataset.value;
        currentQuestionIndex++;
        renderQuestion();
    }



    function diagnose() {
        let scores = heritageSites.map(site => {
            let score = 0;
            if (site.type === userAnswers.type) score += 2; // 最初の質問は重要度を高く
            if (site.region === userAnswers.region) score++;
            if (site.theme === userAnswers.theme) score++;
            if (site.activity === userAnswers.activity) score++;
            if (site.scale === userAnswers.scale) score++;
            return { ...site, score };
        });

        scores.sort((a, b) => b.score - a.score);
        
        const topScore = scores[0].score;
        const topSites = scores.filter(site => site.score === topScore);
        const result = topSites[Math.floor(Math.random() * topSites.length)]; // 同点の場合はランダムに選出

        displayResult(result);
    }

    function displayResult(result) {
        progressBar.style.width = '100%';
        document.getElementById('result-image').src = `images/${result.id}.jpg`;
        document.getElementById('result-image').alt = result.name;
        document.getElementById('result-name').textContent = result.name;
        document.getElementById('result-description').textContent = result.description;
        showScreen('result');
    }

    function reset() {
        currentQuestionIndex = 0;
        userAnswers = {};
        progressBar.style.width = '0%';
        showScreen('start');
    }

    // --- イベントリスナー ---
    startButton.addEventListener('click', () => {
        showScreen('quiz');
        renderQuestion();
    });
    restartButton.addEventListener('click', reset);
});
