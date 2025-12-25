function showPage(pageId) {
    const contentArea = document.getElementById('content-area');
    
    // ナビゲーションのactiveクラス更新
    document.querySelectorAll('#main-nav button').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById('btn-' + (pageId === 'article-detail' ? 'articles' : pageId));
    if (activeBtn) activeBtn.classList.add('active');

    // ページごとのHTML生成
    switch(pageId) {
        case 'home':
            const latest = ARTICLES[0];
            contentArea.innerHTML = `
                <h2>最新の記事</h2>
                <div class="card" onclick="viewDetail(${latest.id})" style="cursor:pointer">
                    <span class="date">${latest.date}</span>
                    <h3>${latest.title}</h3>
                    <p>${latest.content.substring(0, 50)}...</p>
                    <small>続きを読む →</small>
                </div>`;
            break;

        case 'articles':
            const list = ARTICLES.map(art => `
                <div class="article-item" onclick="viewDetail(${art.id})">
                    <span class="date">${art.date}</span>
                    <span class="article-title">${art.title}</span>
                </div>`).join('');
            contentArea.innerHTML = `<h2>記事一覧</h2><div class="card">${list}</div>`;
            break;

        case 'diary':
            const diaries = DIARIES.map(d => `
                <div class="card">
                    <span class="date">${d.date}</span>
                    <h3>${d.title}</h3>
                    <p>${d.content}</p>
                    <img src="diary_photo/赤茄子.jpg" alt="日記画像" class="diary-img">
                </div>`).join('');
            contentArea.innerHTML = `<h2>日記</h2>${diaries}`;
            break;

        case 'profile':
            contentArea.innerHTML = `<h2>プロフィール</h2><div class="card"><p>赤茄子です。社会人です。</p></div>`;
            break;

        case 'links':
            contentArea.innerHTML = `<h2>リンク</h2><div class="card"><ul><li><a href="#">X (Twitter)</a></li></ul></div>`;
            break;
    }
    window.scrollTo(0, 0);
}

function viewDetail(id) {
    const article = ARTICLES.find(a => a.id === id);
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = `
        <div onclick="showPage('articles')" class="back-btn">← 一覧に戻る</div>
        <div class="card">
            <span class="date">${article.date}</span>
            <h2>${article.title}</h2>
            <hr>
            <p>${article.content}</p>
        </div>`;
}

// 初回読み込み

window.onload = () => showPage('home');
