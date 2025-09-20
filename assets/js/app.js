// 访问历史记录
let visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '{}');

// 默认网站池（当历史记录不足时使用）
const defaultWebsites = [
    {
        name: "腾讯视频",
        description: "海量高清影视资源在线观看", 
        url: "https://v.qq.com",
        icon: "https://v.qq.com/favicon.ico"
    },
    {
        name: "爱奇艺",
        description: "热门剧集、综艺、电影一网打尽",
        url: "https://www.iqiyi.com/?vfm=f_588_wrb&fv=ac30238882b84c8c",
        icon: "https://www.iqiyi.com/favicon.ico"
    },
    {
        name: "优酷视频",
        description: "高清视频在线观看平台",
        url: "https://youku.com/",
        icon: "https://www.youku.com/favicon.ico"
    },
    {
        name: "芒果TV",
        description: "热门综艺和独家剧集",
        url: "https://www.mgtv.com/b/611422/20536518.html?cxid=bfan6mqcg",
        icon: "https://www.mgtv.com/favicon.ico"
    },
    {
        name: "哔哩哔哩",
        description: "年轻人的潮流文化娱乐社区",
        url: "https://www.bilibili.com",
        icon: "https://www.bilibili.com/favicon.ico"
    },
    {
        name: "YouTube",
        description: "全球最大的视频分享平台",
        url: "https://www.youtube.com",
        icon: "https://www.youtube.com/favicon.ico"
    },
    {
        name: "微博",
        description: "随时随地发现新鲜事",
        url: "https://weibo.com",
        icon: "https://weibo.com/favicon.ico"
    },
    {
        name: "知乎",
        description: "有问题，就会有答案",
        url: "https://www.zhihu.com",
        icon: "https://www.zhihu.com/favicon.ico"
    }
];

// 动态生成的网站卡片数据（基于访问历史）
let websiteCards = [];

// 初始化一些示例访问历史数据（仅在首次使用时）
function initSampleVisitHistory() {
    if (Object.keys(visitHistory).length === 0) {
        console.log('首次使用，初始化示例访问历史...');
        
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        // 模拟一些访问记录
        const sampleHistory = {
            'v.qq.com': {
                name: '腾讯视频',
                description: '海量高清影视资源在线观看',
                url: 'https://v.qq.com',
                icon: 'https://v.qq.com/favicon.ico',
                visits: {
                    [yesterdayStr]: 8,
                    [today]: 3
                },
                totalVisits: 25
            },
            'www.bilibili.com': {
                name: '哔哩哔哩',
                description: '年轻人的潮流文化娱乐社区',
                url: 'https://www.bilibili.com',
                icon: 'https://www.bilibili.com/favicon.ico',
                visits: {
                    [yesterdayStr]: 6,
                    [today]: 5
                },
                totalVisits: 18
            },
            'www.iqiyi.com': {
                name: '爱奇艺',
                description: '热门剧集、综艺、电影一网打尽',
                url: 'https://www.iqiyi.com',
                icon: 'https://www.iqiyi.com/favicon.ico',
                visits: {
                    [yesterdayStr]: 4,
                    [today]: 2
                },
                totalVisits: 12
            },
            'www.zhihu.com': {
                name: '知乎',
                description: '有问题，就会有答案',
                url: 'https://www.zhihu.com',
                icon: 'https://www.zhihu.com/favicon.ico',
                visits: {
                    [yesterdayStr]: 5,
                    [today]: 1
                },
                totalVisits: 15
            },
            'weibo.com': {
                name: '微博',
                description: '随时随地发现新鲜事',
                url: 'https://weibo.com',
                icon: 'https://weibo.com/favicon.ico',
                visits: {
                    [yesterdayStr]: 3,
                    [today]: 4
                },
                totalVisits: 10
            }
        };
        
        visitHistory = sampleHistory;
        localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
        console.log('示例访问历史已初始化');
    }
}

// 记录网站访问
function recordVisit(url, name, description, icon) {
    if (!url || url === '#') return; // 不记录空链接
    
    const today = new Date().toDateString();
    const domain = new URL(url).hostname;
    
    if (!visitHistory[domain]) {
        visitHistory[domain] = {
            name: name,
            description: description,
            url: url,
            icon: icon,
            visits: {},
            totalVisits: 0
        };
    }
    
    // 记录今日访问
    if (!visitHistory[domain].visits[today]) {
        visitHistory[domain].visits[today] = 0;
    }
    visitHistory[domain].visits[today]++;
    visitHistory[domain].totalVisits++;
    
    // 更新网站信息（可能用户编辑过）
    visitHistory[domain].name = name;
    visitHistory[domain].description = description;
    visitHistory[domain].icon = icon;
    
    // 保存到localStorage
    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
    
    console.log(`记录访问: ${name} (${domain})`);
}

// 获取访问频率最高的5个网站
function getTopVisitedWebsites() {
    // 计算每个网站的访问分数（昨天权重更高）
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    const today = new Date().toDateString();
    
    const scored = Object.entries(visitHistory).map(([domain, data]) => {
        const yesterdayVisits = data.visits[yesterdayStr] || 0;
        const todayVisits = data.visits[today] || 0;
        const totalVisits = data.totalVisits || 0;
        
        // 昨天访问权重为3，今天访问权重为2，总访问权重为1
        const score = yesterdayVisits * 3 + todayVisits * 2 + totalVisits * 1;
        
        return {
            domain,
            score,
            data: {
                name: data.name,
                description: data.description,
                url: data.url,
                icon: data.icon
            }
        };
    });
    
    // 按分数排序，取前5个
    const top5 = scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map(item => item.data);
    
    // 如果历史记录不足5个，用默认网站补充
    while (top5.length < 5 && top5.length < defaultWebsites.length) {
        const defaultSite = defaultWebsites[top5.length];
        // 确保不重复添加
        if (!top5.find(site => site.url === defaultSite.url)) {
            top5.push(defaultSite);
        }
    }
    
    console.log('Top 5 访问网站:', top5);
    return top5.slice(0, 5); // 确保只返回5个
}

// 初始化网站卡片数据
function initWebsiteCards() {
    // 首先初始化示例访问历史（仅在首次使用时）
    initSampleVisitHistory();
    
    // 获取访问最多的5个网站
    websiteCards = getTopVisitedWebsites();
    renderWebsiteCards();
}

// 渲染网站卡片
function renderWebsiteCards() {
    const websitesGrid = document.querySelector('.websites-grid');
    if (!websitesGrid) return;
    
    websitesGrid.innerHTML = '';
    
    websiteCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'website-card';
        cardElement.setAttribute('data-card-id', index);
        cardElement.innerHTML = `
            <div class="card-edit-btn" title="编辑卡片" data-card-index="${index}">
                <i class="fas fa-edit"></i>
            </div>
            <img src="${card.icon}" alt="${card.name}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1673/1673188.png'">
            <h3>${card.name}</h3>
            <p>${card.description}</p>
            <a href="${card.url}" target="_blank" data-url="${card.url}" data-name="${card.name}" data-description="${card.description}" data-icon="${card.icon}">进入</a>
        `;
        websitesGrid.appendChild(cardElement);
    });
    
    // 添加点击链接时记录访问的事件监听
    document.querySelectorAll('.website-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('data-url');
            const name = this.getAttribute('data-name');
            const description = this.getAttribute('data-description');
            const icon = this.getAttribute('data-icon');
            
            // 记录访问
            recordVisit(url, name, description, icon);
            
            console.log(`用户点击访问: ${name}`);
        });
    });
}

// 保存卡片数据到localStorage（更新访问历史）
function saveWebsiteCards() {
    // 卡片数据现在基于访问历史，不再直接保存
    // 但需要重新获取最新的top5网站
    websiteCards = getTopVisitedWebsites();
    console.log('网站卡片已更新:', websiteCards);
}

// 从localStorage加载卡片数据（基于访问历史）
function loadWebsiteCards() {
    // 访问历史已在开头加载
    // 这里重新获取top5网站
    websiteCards = getTopVisitedWebsites();
    console.log('加载的网站卡片:', websiteCards);
}

// 编辑卡片功能
let currentEditingCardIndex = -1;

function openCardEditModal(cardIndex) {
    currentEditingCardIndex = cardIndex;
    const card = websiteCards[cardIndex];
    
    // 填充表单数据
    document.getElementById('card-name').value = card.name;
    document.getElementById('card-description').value = card.description;
    document.getElementById('card-url').value = card.url;
    document.getElementById('card-icon').value = card.icon;
    
    // 显示模态框
    document.getElementById('card-edit-modal').classList.add('active');
}

function closeCardEditModal() {
    document.getElementById('card-edit-modal').classList.remove('active');
    currentEditingCardIndex = -1;
    
    // 清空表单
    document.getElementById('card-name').value = '';
    document.getElementById('card-description').value = '';
    document.getElementById('card-url').value = '';
    document.getElementById('card-icon').value = '';
}

function saveCardEdit() {
    if (currentEditingCardIndex === -1) return;
    
    const name = document.getElementById('card-name').value.trim();
    const description = document.getElementById('card-description').value.trim();
    const url = document.getElementById('card-url').value.trim();
    const icon = document.getElementById('card-icon').value.trim();
    
    if (!name) {
        alert('请输入网站名称');
        return;
    }
    
    // 更新卡片数据
    websiteCards[currentEditingCardIndex] = {
        name: name,
        description: description || '暂无描述',
        url: url || '#',
        icon: icon || 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png'
    };
    
    // 如果是有效URL，更新访问历史中的信息
    if (url && url !== '#') {
        try {
            const domain = new URL(url).hostname;
            if (visitHistory[domain]) {
                visitHistory[domain].name = name;
                visitHistory[domain].description = description;
                visitHistory[domain].icon = icon;
                visitHistory[domain].url = url;
                localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
            }
        } catch (e) {
            console.log('URL格式无效，跳过访问历史更新');
        }
    }
    
    // 重新渲染卡片
    renderWebsiteCards();
    closeCardEditModal();
    
    showNotification('卡片更新成功！', 'success', 2000);
}

// 初始化卡片编辑功能
function initCardEditing() {
    console.log('Initializing card editing...');
    
    // 初始化网站卡片数据（基于访问历史）
    initWebsiteCards();
    
    // 卡片编辑按钮事件委托
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-edit-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const cardIndex = parseInt(e.target.closest('.card-edit-btn').getAttribute('data-card-index'));
            openCardEditModal(cardIndex);
        }
    });
    
    // 关闭模态框
    const closeBtn = document.getElementById('close-card-edit-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCardEditModal);
    }
    
    // 取消按钮
    const cancelBtn = document.getElementById('cancel-card-edit-form');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeCardEditModal);
    }
    
    // 保存按钮
    const saveBtn = document.getElementById('save-card-edit');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveCardEdit);
    }
    
    // 点击模态框外部关闭
    const modal = document.getElementById('card-edit-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCardEditModal();
            }
        });
    }
    
    console.log('Card editing initialized successfully');
}

// 用户设置
const userSettings = {
    layout: 'grid', 
    fontSize: 'medium',
    fontFamily: 'default',
    effects: {
        sakura: true,
        hearts: false,
        snow: false,
        ribbons: false
    },
    autoTheme: false
};

// 创建星空背景
function createStarryBackground() {
    const container = document.getElementById('starry-bg');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // 随机大小
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // 随机位置
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // 随机动画参数
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        star.style.animation = `twinkle ${duration}s infinite ${delay}s ease-in-out`;

        container.appendChild(star);
    }
}

// 樱花特效
function createSakuraEffect() {
    const sakuraContainer = document.getElementById('sakura-container');
    sakuraContainer.innerHTML = '';

    if (!userSettings.effects.sakura) return;

    const sakuraCount = 30;

    for (let i = 0; i < sakuraCount; i++) {
        const sakura = document.createElement('div');
        sakura.classList.add('sakura');
        sakura.innerHTML = '❀';

        // 随机位置
        sakura.style.left = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 15;
        sakura.style.fontSize = `${size}px`;

        // 随机颜色
        const colors = ['#ffb7c5', '#ff9eb5', '#ff85a5', '#ff6b95', '#ff5185'];
        sakura.style.color = colors[Math.floor(Math.random() * colors.length)];

        // 随机动画参数
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        sakura.style.animation = `fall ${duration}s linear ${delay}s infinite`;

        sakuraContainer.appendChild(sakura);
    }
}

// 爱心特效
function createHeartsEffect() {
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.innerHTML = '';

    if (!userSettings.effects.hearts) return;

    // 点击页面时创建爱心
    document.body.addEventListener('click', function(e) {
        if (!userSettings.effects.hearts) return;

        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // 位置在点击处
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;

        // 随机大小
        const size = Math.random() * 30 + 20;
        heart.style.fontSize = `${size}px`;

        // 随机颜色
        const colors = ['#ff6b6b', '#ff8e8e', '#ff5252', '#ff3838', '#ff1e1e'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        // 随机动画参数
        const duration = Math.random() * 3 + 2;
        heart.style.animation = `fall-heart ${duration}s linear forwards`;

        heartsContainer.appendChild(heart);

        // 动画结束后移除爱心
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    });
}

// 雪花特效
function createSnowEffect() {
    const snowContainer = document.getElementById('snow-container');
    snowContainer.innerHTML = '';

    if (!userSettings.effects.snow) return;

    const snowCount = 30;

    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';

        // 随机位置
        snowflake.style.left = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 15;
        snowflake.style.fontSize = `${size}px`;

        // 随机动画参数
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite`;

        snowContainer.appendChild(snowflake);
    }
}

// 彩带特效
function createRibbonsEffect() {
    const ribbonsContainer = document.getElementById('ribbons-container');
    ribbonsContainer.innerHTML = '';

    if (!userSettings.effects.ribbons) return;

    const ribbonsCount = 5;
    const colors = ['#ff6b6b', '#4169e1', '#8a2be2', '#2ecc71', '#e67e22'];

    for (let i = 0; i < ribbonsCount; i++) {
        const ribbon = document.createElement('div');
        ribbon.classList.add('ribbon');
        ribbon.innerHTML = '🎀';

        // 随机位置
        ribbon.style.left = `${Math.random() * 100}%`;
        ribbon.style.top = `${Math.random() * 100}%`;

        // 随机大小
        const size = Math.random() * 20 + 20;
        ribbon.style.fontSize = `${size}px`;

        // 设置颜色
        ribbon.style.color = colors[i % colors.length];

        // 随机动画延迟
        ribbon.style.animationDelay = `${Math.random() * 5}s`;

        ribbonsContainer.appendChild(ribbon);
    }
}

// 时钟功能
function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const date = document.getElementById('date');
    
    // 更新时间
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
    
    // 更新日期
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    date.textContent = now.toLocaleDateString('zh-CN', options);
}

// 备忘录功能
let notes = [];

function initNotes() {
    loadNotes();
    renderNotes();
    
    // 添加备忘录事件监听
    document.getElementById('add-note-btn').addEventListener('click', addNote);
    document.getElementById('note-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNote();
        }
    });
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="text-align: center; opacity: 0.7;">暂无备忘录</p>';
        return;
    }
    
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
            <div class="note-text">${note}</div>
            <div class="note-actions">
                <button class="note-btn edit-note" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="note-btn delete-note" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(noteItem);
    });
    
    // 添加删除和编辑事件
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteNote(index);
        });
    });
    
    document.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            editNote(index);
        });
    });
}

function addNote() {
    const noteInput = document.getElementById('note-input');
    const text = noteInput.value.trim();
    
    if (text) {
        notes.push(text);
        saveNotes();
        renderNotes();
        noteInput.value = '';
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function editNote(index) {
    const newText = prompt('编辑备忘录:', notes[index]);
    if (newText !== null) {
        notes[index] = newText.trim();
        saveNotes();
        renderNotes();
    }
}

// 搜索历史和建议
let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
const searchSuggestions = [
    '天气预报', '在线翻译', '新闻资讯', '股票行情', '电影推荐',
    '音乐播放', '小说阅读', '游戏下载', '学习资料', '技术教程'
];

// 通知系统
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // 显示通知
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => container.removeChild(notification), 300);
    }, duration);
}

// 搜索建议功能
function initSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        // 合并搜索历史和预设建议
        const allSuggestions = [...new Set([...searchHistory, ...searchSuggestions])];
        const filteredSuggestions = allSuggestions
            .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 8);
        
        if (filteredSuggestions.length > 0) {
            suggestionsContainer.innerHTML = filteredSuggestions
                .map(suggestion => `
                    <div class="search-suggestion-item" data-suggestion="${suggestion}">
                        <i class="fas fa-search search-suggestion-icon"></i>
                        <span>${suggestion}</span>
                    </div>
                `).join('');
            
            suggestionsContainer.style.display = 'block';
            
            // 添加点击事件
            suggestionsContainer.querySelectorAll('.search-suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const suggestion = this.getAttribute('data-suggestion');
                    searchInput.value = suggestion;
                    suggestionsContainer.style.display = 'none';
                    performSearch();
                });
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // 点击外部隐藏建议
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// 快速访问功能
function initQuickAccess() {
    console.log('Initializing quick access buttons...');
    
    // 返回顶部
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            console.log('Scroll to top clicked');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            showNotification('已返回顶部', 'success', 2000);
        });
        console.log('Scroll to top button initialized');
    } else {
        console.error('Scroll to top button not found');
    }
    
    // 随机网站
    const randomSiteBtn = document.getElementById('random-site');
    if (randomSiteBtn) {
        randomSiteBtn.addEventListener('click', function() {
            console.log('Random site clicked');
            const websites = document.querySelectorAll('.website-card a');
            if (websites.length > 0) {
                const randomIndex = Math.floor(Math.random() * websites.length);
                const randomSite = websites[randomIndex];
                randomSite.click();
                showNotification('正在打开随机网站...', 'info', 2000);
            }
        });
        console.log('Random site button initialized');
    } else {
        console.error('Random site button not found');
    }
    
    // 全屏切换
    let isFullscreen = false;
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            console.log('Fullscreen toggle clicked');
            if (!isFullscreen) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
                this.innerHTML = '<i class="fas fa-compress"></i>';
                showNotification('已进入全屏模式', 'success', 2000);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                this.innerHTML = '<i class="fas fa-expand"></i>';
                showNotification('已退出全屏模式', 'success', 2000);
            }
            isFullscreen = !isFullscreen;
        });
        console.log('Fullscreen button initialized');
    } else {
        console.error('Fullscreen button not found');
    }
    
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', function() {
        const fullscreenBtn = document.getElementById('fullscreen-toggle');
        if (fullscreenBtn && !document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isFullscreen = false;
        }
    });
    
    console.log('Quick access initialization complete');
}

// 增强的搜索功能
function performSearchEnhanced() {
    // 使用当前选择的搜索引擎
    const engine = searchEngines.find(e => e.id === currentSearchEngine);
    if (!engine) {
        console.error('未找到搜索引擎:', currentSearchEngine);
        return;
    }

    const query = document.getElementById('search-input').value.trim();

    if (query) {
        // 添加到搜索历史
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 10); // 只保留最近10条
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
        
        // 显示加载状态
        const searchBtn = document.querySelector('.search-btn');
        const originalHTML = searchBtn.innerHTML;
        searchBtn.innerHTML = '<div class="loading-spinner"></div>';
        
        // 模拟加载延迟
        setTimeout(() => {
            searchBtn.innerHTML = originalHTML;
            window.open(engine.url + encodeURIComponent(query), '_blank');
            showNotification(`正在使用${engine.name}搜索: ${query}`, 'info', 2000);
        }, 500);
        
        // 隐藏建议框
        document.getElementById('search-suggestions').style.display = 'none';
    } else {
        // 添加抖动效果提示用户输入
        const searchBox = document.querySelector('.search-box');
        searchBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            searchBox.style.animation = '';
        }, 500);
        showNotification('请输入搜索关键词', 'error', 2000);
    }
}

// 主题切换功能
let isDarkTheme = true;

function initThemeToggle() {
    console.log('Initializing theme toggle...');
    
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkTheme = false;
        document.body.classList.add('light-theme');
    } else {
        isDarkTheme = true;
        document.body.classList.remove('light-theme');
    }
    
    // 主题切换按钮点击事件
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            console.log('Theme toggle clicked');
            toggleTheme(e);
        });
        console.log('Theme toggle button initialized');
    } else {
        console.error('Theme toggle button not found');
    }
}

function toggleTheme(event) {
    const themeToggle = document.getElementById('theme-toggle');
    const overlay = document.getElementById('theme-transition-overlay');
    
    // 获取点击位置
    const rect = themeToggle.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    
    // 设置过渡遮罩的中心点
    overlay.style.setProperty('--x', x + '%');
    overlay.style.setProperty('--y', y + '%');
    
    // 添加旋转动画
    themeToggle.classList.add('rotating');
    
    // 显示过渡遮罩
    overlay.classList.add('active');
    
    // 延迟切换主题
    setTimeout(() => {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            showNotification('已切换到黑夜模式 🌙', 'success', 2000);
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            showNotification('已切换到白天模式 ☀️', 'success', 2000);
        }
        
        // 保存设置
        saveSettings();
        
    }, 250);
    
    // 移除过渡效果
    setTimeout(() => {
        overlay.classList.remove('active');
        themeToggle.classList.remove('rotating');
    }, 600);
}

// 根据时间自动切换主题
function autoThemeSwitch() {
    if (!userSettings.autoTheme) return;
    
    const hour = new Date().getHours();
    const isNightTime = hour >= 19 || hour < 7; // 晚上7点到早上7点
    
    if (isNightTime && !isDarkTheme) {
        toggleTheme();
        showNotification('已自动切换到夜间模式 🌙', 'info', 2000);
    } else if (!isNightTime && isDarkTheme) {
        toggleTheme();
        showNotification('已自动切换到日间模式 ☀️', 'info', 2000);
    }
}

// 启动自动主题检查定时器
function startAutoThemeTimer() {
    // 每30分钟检查一次
    setInterval(() => {
        if (userSettings.autoTheme) {
            autoThemeSwitch();
        }
    }, 30 * 60 * 1000);
}

// 定期刷新网站卡片（检查访问历史变化）
function startCardRefreshTimer() {
    // 每30分钟检查一次是否需要更新卡片显示
    setInterval(() => {
        const newTopSites = getTopVisitedWebsites();
        
        // 检查是否有变化
        const hasChanged = JSON.stringify(newTopSites) !== JSON.stringify(websiteCards);
        
        if (hasChanged) {
            console.log('检测到访问历史变化，正在更新网站卡片...');
            websiteCards = newTopSites;
            renderWebsiteCards();
            showNotification('网站卡片已根据访问记录更新', 'info', 3000);
        }
    }, 30 * 60 * 1000); // 30分钟
}

// 键盘快捷键切换主题
function initThemeKeyboard() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + Shift + T 切换主题
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// 天气功能
let currentCity = '北京';

function initWeather() {
    loadWeatherData();
    
    // 刷新天气按钮
    document.getElementById('refresh-weather').addEventListener('click', function() {
        this.style.animation = 'spin 1s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
        loadWeatherData();
        showNotification('正在刷新天气信息...', 'info', 2000);
    });
    
    // 更改城市按钮
    document.getElementById('change-location').addEventListener('click', function() {
        const newCity = prompt('请输入城市名称:', currentCity);
        if (newCity && newCity.trim() !== '') {
            currentCity = newCity.trim();
            localStorage.setItem('weather_city', currentCity);
            loadWeatherData();
            showNotification(`已切换到${currentCity}`, 'success', 2000);
        }
    });
    
    // 从localStorage读取保存的城市
    const savedCity = localStorage.getItem('weather_city');
    if (savedCity) {
        currentCity = savedCity;
    }
}

function loadWeatherData() {
    const weatherDisplay = document.getElementById('weather-display');
    const locationText = document.getElementById('location-text');
    
    locationText.textContent = currentCity;
    
    // 显示加载状态
    weatherDisplay.innerHTML = `
        <div class="weather-loading">
            <div class="loading-spinner"></div>
            <span>正在获取天气信息...</span>
        </div>
    `;
    
    // 模拟天气数据（实际应用中应该调用真实的天气API）
    setTimeout(() => {
        const mockWeatherData = generateMockWeather();
        displayWeatherData(mockWeatherData);
    }, 1500);
}

function generateMockWeather() {
    const conditions = [
        { icon: 'fas fa-sun', class: 'sunny', desc: '晴朗', temp: 25 },
        { icon: 'fas fa-cloud-sun', class: 'cloudy', desc: '多云', temp: 22 },
        { icon: 'fas fa-cloud-rain', class: 'rainy', desc: '小雨', temp: 18 },
        { icon: 'fas fa-snowflake', class: 'snowy', desc: '小雪', temp: -2 }
    ];
    
    const current = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
        city: currentCity,
        current: {
            temperature: current.temp + Math.floor(Math.random() * 10 - 5),
            condition: current.desc,
            icon: current.icon,
            iconClass: current.class,
            humidity: 45 + Math.floor(Math.random() * 40),
            windSpeed: Math.floor(Math.random() * 15) + 3,
            pressure: 1010 + Math.floor(Math.random() * 40),
            visibility: 8 + Math.floor(Math.random() * 12)
        },
        forecast: generateForecast()
    };
}

function generateForecast() {
    const days = ['今天', '明天', '后天', '周四', '周五'];
    const icons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud-rain', 'fas fa-cloud'];
    
    return days.slice(0, 4).map((day, index) => ({
        day: day,
        icon: icons[Math.floor(Math.random() * icons.length)],
        high: 20 + Math.floor(Math.random() * 15),
        low: 10 + Math.floor(Math.random() * 10)
    }));
}

function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weather-display');
    
    weatherDisplay.innerHTML = `
        <div class="weather-info loaded">
            <div class="weather-main">
                <div class="weather-icon ${data.current.iconClass}">
                    <i class="${data.current.icon}"></i>
                </div>
                <div class="weather-temp">${data.current.temperature}°C</div>
            </div>
            <div class="weather-description">${data.current.condition}</div>
            <div class="weather-details">
                <div class="weather-detail-item">
                    <i class="fas fa-tint"></i>
                    <span>湿度 ${data.current.humidity}%</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-wind"></i>
                    <span>风速 ${data.current.windSpeed} km/h</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-thermometer-half"></i>
                    <span>气压 ${data.current.pressure} hPa</span>
                </div>
                <div class="weather-detail-item">
                    <i class="fas fa-eye"></i>
                    <span>能见度 ${data.current.visibility} km</span>
                </div>
            </div>
            <div class="weather-forecast">
                <div class="forecast-title">未来几天</div>
                <div class="forecast-items">
                    ${data.forecast.map(item => `
                        <div class="forecast-item">
                            <div class="forecast-day">${item.day}</div>
                            <div class="forecast-icon">
                                <i class="${item.icon}"></i>
                            </div>
                            <div class="forecast-temp">${item.high}°/${item.low}°</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// 用户收藏
let userFavorites = [
    {name: "GitHub", url: "https://github.com", icon: "fab fa-github"},
    {name: "YouTube", url: "https://www.youtube.com", icon: "fab fa-youtube"}
];

// 搜索引擎数据（只保留Google和Bing）
let searchEngines = [
    {id: "google", name: "谷歌", url: "https://www.google.com/search?q=", icon: "fab fa-google"},
    {id: "bing", name: "必应", url: "https://www.bing.com/search?q=", icon: "fab fa-microsoft"}
];

// 当前选择的搜索引擎
let currentSearchEngine = 'google';

// 网络检测状态
let networkStatus = {
    canAccessGoogle: false,
    userLocation: null,
    isChina: false,
    lastChecked: null
};

// 特效状态
let sakuraEnabled = true;
let heartsEnabled = false;
let bookmarksEnabled = true;

// 渲染收藏
function renderFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('empty-favorites');

    // 如果页面上没有收藏相关元素，直接返回
    if (!favoritesGrid || !emptyState) {
        console.log('Favorites elements not found, skipping renderFavorites');
        return;
    }

    if (userFavorites.length === 0) {
        favoritesGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    favoritesGrid.innerHTML = '';

    userFavorites.forEach((favorite, index) => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'favorite-card';
        favoriteCard.innerHTML = `
            <div class="favorite-card-header">
                <div class="favorite-icon">
                    <i class="${favorite.icon}"></i>
                </div>
                <div class="favorite-title">${favorite.name}</div>
            </div>
            <div class="favorite-url">${favorite.url}</div>
            <div class="favorite-actions">
                <button class="favorite-btn visit-favorite" data-url="${favorite.url}">
                    <i class="fas fa-external-link-alt"></i> 访问
                </button>
                <button class="favorite-btn edit-favorite" data-index="${index}">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="favorite-btn delete-favorite" data-index="${index}">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </div>
        `;
        favoritesGrid.appendChild(favoriteCard);
    });

    // 添加事件监听器
    document.querySelectorAll('.visit-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            window.open(url, '_blank');
        });
    });

    document.querySelectorAll('.delete-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteFavorite(index);
        });
    });

    document.querySelectorAll('.edit-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editFavorite(index);
        });
    });
}

// 添加收藏
function addFavorite(name, url, icon) {
    userFavorites.push({ name, url, icon });
    renderFavorites();
}

// 删除收藏
function deleteFavorite(index) {
    if (confirm(`确定要删除"${userFavorites[index].name}"吗？`)) {
        userFavorites.splice(index, 1);
        renderFavorites();
    }
}

// 编辑收藏
function editFavorite(index) {
    const favorite = userFavorites[index];
    const newName = prompt('请输入新的网站名称', favorite.name);
    if (newName !== null && newName.trim() !== '') {
        userFavorites[index].name = newName.trim();
        renderFavorites();
    }
}

// 渲染搜索引擎列表
function renderEngineList() {
    const engineList = document.getElementById('engine-list');
    
    // 如果页面上没有engine-list元素，直接返回
    if (!engineList) {
        console.log('Engine list element not found, skipping renderEngineList');
        return;
    }
    
    engineList.innerHTML = '';

    searchEngines.forEach((engine, index) => {
        const engineItem = document.createElement('div');
        engineItem.className = 'engine-item';
        engineItem.innerHTML = `
            <div class="engine-item-icon">
                <i class="${engine.icon}"></i>
            </div>
            <div class="engine-item-name">${engine.name}</div>
            <div class="engine-item-actions">
                <button class="favorite-btn edit-engine" data-index="${index}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="favorite-btn delete-engine" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        engineList.appendChild(engineItem);
    });

    // 添加事件监听器
    document.querySelectorAll('.edit-engine').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            editEngine(index);
        });
    });

    document.querySelectorAll('.delete-engine').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteEngine(index);
        });
    });
}

// 添加搜索引擎
function addEngine(name, url, icon) {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    searchEngines.push({id, name, url, icon});
    renderEngineList();
    updateEngineSelect();
}

// 编辑搜索引擎
function editEngine(index) {
    const engine = searchEngines[index];
    document.getElementById('engine-name').value = engine.name;
    document.getElementById('engine-url').value = engine.url;
    document.getElementById('engine-icon').value = engine.icon;

    // 设置编辑模式
    document.getElementById('save-engine').setAttribute('data-index', index);
}

// 保存搜索引擎
function saveEngine() {
    const name = document.getElementById('engine-name').value;
    const url = document.getElementById('engine-url').value;
    const icon = document.getElementById('engine-icon').value;

    if (!name || !url) {
        alert('请填写搜索引擎名称和URL');
        return;
    }

    const index = document.getElementById('save-engine').getAttribute('data-index');

    if (index) {
        // 编辑现有引擎
        searchEngines[index].name = name;
        searchEngines[index].url = url;
        searchEngines[index].icon = icon;
    } else {
        // 添加新引擎
        addEngine(name, url, icon);
    }

    // 重置表单
    document.getElementById('engine-name').value = '';
    document.getElementById('engine-url').value = '';
    document.getElementById('engine-icon').value = '';
    document.getElementById('save-engine').removeAttribute('data-index');

    renderEngineList();
    updateEngineSelect();
}

// 删除搜索引擎
function deleteEngine(index) {
    if (searchEngines.length <= 1) {
        alert('至少需要保留一个搜索引擎');
        return;
    }

    if (confirm(`确定要删除"${searchEngines[index].name}"吗？`)) {
        searchEngines.splice(index, 1);
        renderEngineList();
        updateEngineSelect();
    }
}

// 更新搜索引擎选择器
function updateEngineSelect() {
    const engineSelect = document.getElementById('engine-select');
    engineSelect.innerHTML = '';

    searchEngines.forEach(engine => {
        const option = document.createElement('option');
        option.value = engine.id;
        option.textContent = engine.name;
        engineSelect.appendChild(option);
    });

    updateEngineDisplay(engineSelect.value);
}

// 更新搜索引擎显示（简化版，因为UI中已移除选择器）
function updateEngineDisplay(engineKey) {
    const engine = searchEngines.find(e => e.id === engineKey);
    if (!engine) return;
    
    console.log(`当前搜索引擎: ${engine.name}`);
}

// 网络检测功能
async function checkNetworkStatus() {
    console.log('开始检测网络状态和Google访问性...');
    
    try {
        // 检测Google访问性
        const googleAccessible = await checkGoogleAccess();
        
        // 获取用户地理位置
        const locationInfo = await getUserLocation();
        
        // 更新网络状态
        networkStatus = {
            canAccessGoogle: googleAccessible,
            userLocation: locationInfo.location,
            isChina: locationInfo.isChina,
            lastChecked: new Date().toISOString()
        };
        
        console.log('网络检测结果:', networkStatus);
        
        // 根据检测结果选择搜索引擎
        selectOptimalSearchEngine();
        
        // 如果是中国IP且尝试使用Google，显示提示
        if (networkStatus.isChina && currentSearchEngine === 'google') {
            showGoogleAccessWarning();
        }
        
    } catch (error) {
        console.log('网络检测失败，使用默认配置:', error);
        // 检测失败时默认使用Bing
        currentSearchEngine = 'bing';
        updateEngineDisplay('bing');
    }
}

// 检测Google访问性
async function checkGoogleAccess() {
    try {
        // 尝试访问Google的favicon（较小的请求）
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒超时
        
        const response = await fetch('https://www.google.com/favicon.ico', {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal,
            cache: 'no-cache'
        });
        
        clearTimeout(timeoutId);
        console.log('Google访问检测: 可访问');
        return true;
    } catch (error) {
        console.log('Google访问检测: 无法访问 -', error.message);
        return false;
    }
}

// 获取用户地理位置信息
async function getUserLocation() {
    try {
        // 使用免费的IP地理位置服务
        const response = await fetch('https://ipapi.co/json/', {
            timeout: 5000
        });
        
        if (!response.ok) {
            throw new Error('IP地理位置服务不可用');
        }
        
        const data = await response.json();
        
        // 检查是否为中国地区（包括大陆、香港、台湾、澳门）
        const chinaRegions = ['CN', 'HK', 'TW', 'MO'];
        const isChina = chinaRegions.includes(data.country_code);
        
        console.log('地理位置检测:', {
            country: data.country_name,
            countryCode: data.country_code,
            region: data.region,
            city: data.city,
            isChina: isChina
        });
        
        return {
            location: `${data.city}, ${data.region}, ${data.country_name}`,
            isChina: isChina,
            countryCode: data.country_code,
            country: data.country_name
        };
        
    } catch (error) {
        console.log('地理位置检测失败:', error);
        return {
            location: '未知位置',
            isChina: false,
            countryCode: 'Unknown',
            country: '未知'
        };
    }
}

// 根据网络状态选择最优搜索引擎
function selectOptimalSearchEngine() {
    if (networkStatus.canAccessGoogle) {
        currentSearchEngine = 'google';
        console.log('Google可访问，使用Google搜索');
    } else {
        currentSearchEngine = 'bing';
        console.log('Google不可访问，切换到Bing搜索');
        showNotification('检测到Google无法访问，已自动切换到Bing', 'info', 4000);
    }
    
    // 更新搜索引擎显示
    updateEngineDisplay(currentSearchEngine);
}

// 显示Google访问警告（针对中国用户）
function showGoogleAccessWarning() {
    const warningMessage = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle" style="color: #ff9800;"></i>
            <div>
                <div>检测到您位于${networkStatus.userLocation}</div>
                <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 2px;">
                    Google在中国地区可能无法正常访问，建议使用Bing搜索
                </div>
            </div>
        </div>
    `;
    
    // 创建自定义通知
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 15px 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 4px solid #ff9800;
        box-shadow: var(--shadow);
        z-index: 2001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        color: var(--light);
    `;
    notification.innerHTML = warningMessage;
    
    document.getElementById('notification-container').appendChild(notification);
    
    // 显示通知
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 8000);
}

// 手动刷新网络检测
function refreshNetworkStatus() {
    showNotification('正在检测网络状态...', 'info', 2000);
    checkNetworkStatus();
}

// 执行搜索
function performSearch() {
    performSearchEnhanced();
}

// 切换内容区域
function switchContent(targetId) {
    // 隐藏所有内容区域
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // 显示目标内容区域
    document.getElementById(targetId).classList.add('active');

    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 激活当前链接
    document.querySelector(`.nav-link[data-target="${targetId}"]`).classList.add('active');
}

// 应用设置
function applySettings() {
    // 应用样式设置
    document.body.className = '';
    document.body.classList.add(`layout-${userSettings.layout}`);
    document.body.classList.add(`font-${userSettings.fontSize}`);
    document.body.classList.add(`font-${userSettings.fontFamily}`);
    
    // 主题由独立的主题切换系统管理
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // 应用特效
    createSakuraEffect();
    createHeartsEffect();
    createSnowEffect();
    createRibbonsEffect();

    // 更新UI
    updateSettingsUI();
}

function updateSettingsUI() {
    document.getElementById('layout-select').value = userSettings.layout;
    document.getElementById('font-size-select').value = userSettings.fontSize;
    document.getElementById('font-family-select').value = userSettings.fontFamily;
    document.getElementById('sakura-setting').checked = userSettings.effects.sakura;
    document.getElementById('hearts-setting').checked = userSettings.effects.hearts;
    document.getElementById('snow-setting').checked = userSettings.effects.snow;
    document.getElementById('ribbons-setting').checked = userSettings.effects.ribbons;
    document.getElementById('auto-theme-setting').checked = userSettings.autoTheme;
}

function loadSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        Object.assign(userSettings, parsedSettings);
    }
    applySettings();
}

function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    applySettings();
}

// 访问历史管理功能
function initVisitHistoryManagement() {
    // 查看访问历史按钮
    const viewHistoryBtn = document.getElementById('view-history-btn');
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', function() {
            showVisitHistoryModal();
        });
    }
    
    // 清空访问历史按钮
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            if (confirm('确定要清空所有访问历史记录吗？这将重置网站卡片显示。')) {
                visitHistory = {};
                localStorage.removeItem('visitHistory');
                // 重新初始化示例数据
                initSampleVisitHistory();
                // 更新网站卡片
                websiteCards = getTopVisitedWebsites();
                renderWebsiteCards();
                showNotification('访问历史已清空并重新初始化', 'success', 3000);
            }
        });
    }
}

// 显示访问历史模态框
function showVisitHistoryModal() {
    const historyData = Object.entries(visitHistory)
        .sort((a, b) => b[1].totalVisits - a[1].totalVisits)
        .slice(0, 10); // 显示前10个最常访问的网站
    
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    let historyContent = '<div style="max-height: 400px; overflow-y: auto;">';
    
    if (historyData.length === 0) {
        historyContent += '<p style="text-align: center; opacity: 0.7;">暂无访问历史记录</p>';
    } else {
        historyContent += '<div style="margin-bottom: 15px; font-size: 0.9rem; opacity: 0.8;">访问次数统计（按总访问量排序）</div>';
        
        historyData.forEach(([domain, data], index) => {
            const todayVisits = data.visits[today] || 0;
            const yesterdayVisits = data.visits[yesterdayStr] || 0;
            const totalVisits = data.totalVisits || 0;
            
            historyContent += `
                <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${data.icon}" alt="${data.name}" style="width: 24px; height: 24px;" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1673/1673188.png'">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; margin-bottom: 2px;">${data.name}</div>
                            <div style="font-size: 0.8rem; opacity: 0.7;">${domain}</div>
                        </div>
                        <div style="text-align: right; font-size: 0.8rem;">
                            <div>总计: ${totalVisits}次</div>
                            <div>昨天: ${yesterdayVisits}次</div>
                            <div>今天: ${todayVisits}次</div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    historyContent += '</div>';
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'card-edit-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="card-edit-modal-content" style="max-width: 600px;">
            <div class="card-edit-modal-header">
                <h2 class="card-edit-modal-title">访问历史记录</h2>
                <button class="close-card-edit-modal" onclick="this.closest('.card-edit-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="color: var(--light);">
                ${historyContent}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// 数据管理功能
function initDataManagement() {
    // 导出数据
    document.getElementById('export-data-btn').addEventListener('click', function() {
        const data = {
            userSettings: userSettings,
            userFavorites: userFavorites,
            searchHistory: searchHistory,
            notes: notes,
            searchEngines: searchEngines,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `星辰导航_数据备份_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        showNotification('数据导出成功！', 'success');
    });
    
    // 导入数据
    document.getElementById('import-data-btn').addEventListener('click', function() {
        document.getElementById('import-file-input').click();
    });
    
    document.getElementById('import-file-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // 验证数据格式
                    if (data.userSettings) {
                        Object.assign(userSettings, data.userSettings);
                        localStorage.setItem('userSettings', JSON.stringify(userSettings));
                    }
                    if (data.userFavorites) {
                        userFavorites = data.userFavorites;
                    }
                    if (data.searchHistory) {
                        searchHistory = data.searchHistory;
                        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                    }
                    if (data.notes) {
                        notes = data.notes;
                        localStorage.setItem('notes', JSON.stringify(notes));
                    }
                    if (data.searchEngines) {
                        searchEngines = data.searchEngines;
                    }
                    
                    // 重新渲染界面
                    applySettings();
                    renderFavorites();
                    renderEngineList();
                    renderNotes();
                    updateEngineSelect();
                    
                    showNotification('数据导入成功！页面将刷新以应用设置。', 'success', 2000);
                    
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    
                } catch (error) {
                    showNotification('数据格式错误，导入失败！', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
    
    // 重置数据
    document.getElementById('reset-data-btn').addEventListener('click', function() {
        if (confirm('确定要重置所有数据吗？这将清除您的所有设置、收藏和记录！')) {
            localStorage.clear();
            showNotification('数据已重置！页面将刷新。', 'info', 2000);
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    });
}

// DOM内容加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization...');
    
    loadSettings();
    createStarryBackground();
    createSakuraEffect();
    createHeartsEffect();
    createSnowEffect();
    createRibbonsEffect();
    // renderFavorites(); // 暂时注释掉，因为页面上没有收藏元素
    // renderEngineList(); // 暂时注释掉，因为页面上没有引擎列表元素
    initClock();
    initNotes();
    initSearchSuggestions();
    initQuickAccess();
    initDataManagement();
    initVisitHistoryManagement(); // 添加访问历史管理初始化
    initWeather();
    initThemeToggle();
    initThemeKeyboard();
    startAutoThemeTimer();
    startCardRefreshTimer(); // 启动卡片刷新定时器
    initCardEditing(); // 添加卡片编辑功能初始化

    // 启动网络检测（延迟启动，避免阻塞页面加载）
    setTimeout(() => {
        checkNetworkStatus();
    }, 1000);

    // 显示功能状态信息
    console.log('=== 星辰导航功能状态 ===');
    console.log('📊 访问历史记录数量:', Object.keys(visitHistory).length);
    console.log('🎯 当前显示网站卡片:', websiteCards.length);
    console.log('🔍 当前搜索引擎:', currentSearchEngine);
    console.log('🌐 网络检测状态:', networkStatus);
    console.log('💾 localStorage使用情况:');
    console.log('  - visitHistory:', localStorage.getItem('visitHistory') ? '已保存' : '未保存');
    console.log('  - userSettings:', localStorage.getItem('userSettings') ? '已保存' : '未保存');
    console.log('✅ 所有功能初始化完成');
    console.log('========================');
    
    // 显示卡片信息
    if (websiteCards.length > 0) {
        console.log('当前显示的网站卡片:');
        websiteCards.forEach((card, index) => {
            console.log(`  ${index + 1}. ${card.name} - ${card.url}`);
        });
    }

    // 设置菜单功能
    console.log('Initializing settings menu...');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettings = document.getElementById('close-settings');

    console.log('Found elements:', {
        settingsToggle: !!settingsToggle,
        settingsMenu: !!settingsMenu,
        closeSettings: !!closeSettings
    });

    if (settingsToggle && settingsMenu && closeSettings) {
        settingsToggle.addEventListener('click', (e) => {
            console.log('Settings toggle clicked');
            e.preventDefault();
            settingsMenu.classList.toggle('active');
        });

        closeSettings.addEventListener('click', () => {
            console.log('Close settings clicked');
            settingsMenu.classList.remove('active');
        });

        // 点击外部关闭设置菜单
        document.addEventListener('click', (e) => {
            if (!settingsMenu.contains(e.target) &&
                e.target !== settingsToggle &&
                !settingsToggle.contains(e.target)) {
                settingsMenu.classList.remove('active');
            }
        });
        console.log('Settings menu initialized successfully');
    } else {
        console.error('Settings elements not found:', {
            settingsToggle: !!settingsToggle,
            settingsMenu: !!settingsMenu,
            closeSettings: !!closeSettings
        });
    }

    // 布局选择
    document.getElementById('layout-select').addEventListener('change', function() {
        userSettings.layout = this.value;
        saveSettings();
    });

    // 字体大小选择
    document.getElementById('font-size-select').addEventListener('change', function() {
        userSettings.fontSize = this.value;
        saveSettings();
    });

    // 字体样式选择
    document.getElementById('font-family-select').addEventListener('change', function() {
        userSettings.fontFamily = this.value;
        saveSettings();
    });

    // 樱花特效开关
    const sakuraSetting = document.getElementById('sakura-setting');
    sakuraSetting.addEventListener('change', function() {
        userSettings.effects.sakura = this.checked;
        saveSettings();
    });

    // 爱心特效开关
    const heartsSetting = document.getElementById('hearts-setting');
    heartsSetting.addEventListener('change', function() {
        userSettings.effects.hearts = this.checked;
        saveSettings();
    });

    // 雪花特效开关
    const snowSetting = document.getElementById('snow-setting');
    snowSetting.addEventListener('change', function() {
        userSettings.effects.snow = this.checked;
        saveSettings();
    });

    // 彩带特效开关
    const ribbonsSetting = document.getElementById('ribbons-setting');
    ribbonsSetting.addEventListener('change', function() {
        userSettings.effects.ribbons = this.checked;
        saveSettings();
    });

    // 自动主题切换开关
    const autoThemeSetting = document.getElementById('auto-theme-setting');
    autoThemeSetting.addEventListener('change', function() {
        userSettings.autoTheme = this.checked;
        if (this.checked) {
            // 启用自动主题切换，立即检查是否需要切换
            autoThemeSwitch();
            showNotification('已开启自动主题切换 🕐', 'success', 2000);
        } else {
            showNotification('已关闭自动主题切换', 'info', 2000);
        }
        saveSettings();
    });

    // 网络状态检测按钮
    const refreshNetworkBtn = document.getElementById('refresh-network-btn');
    if (refreshNetworkBtn) {
        refreshNetworkBtn.addEventListener('click', function() {
            refreshNetworkStatus();
        });
    }

    // 收藏栏开关
    const bookmarksSetting = document.getElementById('bookmarks-setting');
    bookmarksSetting.addEventListener('change', function() {
        bookmarksEnabled = this.checked;
        // 这里可以添加显示/隐藏收藏栏的逻辑
        alert(`收藏栏已${bookmarksEnabled ? '显示' : '隐藏'}`);
    });

    // 保存设置按钮
    document.getElementById('save-settings-btn').addEventListener('click', function() {
        // 保存设置到localStorage
        localStorage.setItem('sakuraEnabled', sakuraEnabled);
        localStorage.setItem('heartsEnabled', heartsEnabled);
        localStorage.setItem('bookmarksEnabled', bookmarksEnabled);

        alert('设置已保存！');
        settingsMenu.classList.remove('active');
    });

    // 搜索框回车键支持
    const searchInput = document.querySelector('.search-text');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 搜索按钮点击事件
    document.getElementById('search-btn').addEventListener('click', performSearch);

    // 添加收藏按钮点击事件（如果存在的话）
    const addFavoriteBtn = document.getElementById('add-favorite-btn');
    if (addFavoriteBtn) {
        addFavoriteBtn.addEventListener('click', function() {
            const name = prompt('请输入网站名称');
            if (!name) return;

            const url = prompt('请输入网站URL');
            if (!url) return;

            const icon = prompt('请输入网站图标类名（如：fab fa-google）', 'fas fa-globe');

            addFavorite(name, url, icon || 'fas fa-globe');
        });
    }

    // 搜索引擎管理按钮
    document.getElementById('manage-engines-btn').addEventListener('click', function() {
        document.getElementById('engine-modal').classList.add('active');
    });

    // 关闭搜索引擎管理模态框
    document.getElementById('close-engine-modal').addEventListener('click', function() {
        document.getElementById('engine-modal').classList.remove('active');
        // 重置表单
        document.getElementById('engine-name').value = '';
        document.getElementById('engine-url').value = '';
        document.getElementById('engine-icon').value = '';
        document.getElementById('save-engine').removeAttribute('data-index');
    });

    // 取消按钮
    document.getElementById('cancel-engine-form').addEventListener('click', function() {
        document.getElementById('engine-modal').classList.remove('active');
        // 重置表单
        document.getElementById('engine-name').value = '';
        document.getElementById('engine-url').value = '';
        document.getElementById('engine-icon').value = '';
        document.getElementById('save-engine').removeAttribute('data-index');
    });

    // 保存搜索引擎
    document.getElementById('save-engine').addEventListener('click', saveEngine);

    // 点击模态框外部关闭
    document.getElementById('engine-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            // 重置表单
            document.getElementById('engine-name').value = '';
            document.getElementById('engine-url').value = '';
            document.getElementById('engine-icon').value = '';
            document.getElementById('save-engine').removeAttribute('data-index');
        }
    });

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // 搜索快捷键 (Ctrl+K 或 /)
        if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
            e.preventDefault();
            document.querySelector('.search-text').focus();
        }
        
        // 打开设置快捷键 (Ctrl+,)
        if (e.ctrlKey && e.key === ',') {
            e.preventDefault();
            settingsMenu.classList.toggle('active');
        }
    });
});