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
    // 返回顶部
    document.getElementById('scroll-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        showNotification('已返回顶部', 'success', 2000);
    });
    
    // 随机网站
    document.getElementById('random-site').addEventListener('click', function() {
        const websites = document.querySelectorAll('.website-card a');
        if (websites.length > 0) {
            const randomIndex = Math.floor(Math.random() * websites.length);
            const randomSite = websites[randomIndex];
            randomSite.click();
            showNotification('正在打开随机网站...', 'info', 2000);
        }
    });
    
    // 全屏切换
    let isFullscreen = false;
    document.getElementById('fullscreen-toggle').addEventListener('click', function() {
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
    
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', function() {
        const fullscreenBtn = document.getElementById('fullscreen-toggle');
        if (!document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isFullscreen = false;
        }
    });
}

// 增强的搜索功能
function performSearchEnhanced() {
    const engineKey = document.getElementById('engine-select').value;
    const engine = searchEngines.find(e => e.id === engineKey);
    if (!engine) return;

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
    document.getElementById('theme-toggle').addEventListener('click', function(e) {
        toggleTheme(e);
    });
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

// 搜索引擎数据
let searchEngines = [
    {id: "baidu", name: "百度", url: "https://www.baidu.com/s?wd=", icon: "fab fa-baidu"},
    {id: "google", name: "谷歌", url: "https://www.google.com/search?q=", icon: "fab fa-google"},
    {id: "bing", name: "必应", url: "https://www.bing.com/search?q=", icon: "fab fa-microsoft"},
    {id: "sogou", name: "搜狗", url: "https://www.sogou.com/web?query=", icon: "fas fa-search"},
    {id: "360", name: "360搜索", url: "https://www.so.com/s?q=", icon: "fas fa-shield-alt"}
];

// 特效状态
let sakuraEnabled = true;
let heartsEnabled = false;
let bookmarksEnabled = true;

// 渲染收藏
function renderFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const emptyState = document.getElementById('empty-favorites');

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

// 更新搜索引擎显示
function updateEngineDisplay(engineKey) {
    const engine = searchEngines.find(e => e.id === engineKey);
    if (!engine) return;

    const engineIcon = document.getElementById('engine-icon-display');
    engineIcon.innerHTML = `<i class="${engine.icon}"></i>`;
    document.getElementById('current-engine').textContent = `当前引擎：${engine.name}`;

    // 添加动画效果
    engineIcon.style.animation = 'none';
    setTimeout(() => {
        engineIcon.style.animation = 'pulse 0.5s';
    }, 10);
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
    loadSettings();
    createStarryBackground();
    createSakuraEffect();
    createHeartsEffect();
    createSnowEffect();
    createRibbonsEffect();
    renderFavorites();
    renderEngineList();
    initClock();
    initNotes();
    initSearchSuggestions();
    initQuickAccess();
    initDataManagement();
    initWeather();
    initThemeToggle();
    initThemeKeyboard();
    startAutoThemeTimer();

    // 设置菜单功能
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettings = document.getElementById('close-settings');

    settingsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        settingsMenu.classList.toggle('active');
    });

    closeSettings.addEventListener('click', () => {
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

    // 初始化搜索引擎选择器
    const engineSelect = document.getElementById('engine-select');
    engineSelect.addEventListener('change', function() {
        updateEngineDisplay(this.value);
    });

    // 更新当前搜索引擎显示
    updateEngineDisplay(engineSelect.value);

    // 搜索框回车键支持
    const searchInput = document.querySelector('.search-text');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 导航链接点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            switchContent(target);
        });
    });

    // 添加收藏按钮点击事件
    document.getElementById('add-favorite-btn').addEventListener('click', function() {
        const name = prompt('请输入网站名称');
        if (!name) return;

        const url = prompt('请输入网站URL');
        if (!url) return;

        const icon = prompt('请输入网站图标类名（如：fab fa-google）', 'fas fa-globe');

        addFavorite(name, url, icon || 'fas fa-globe');
    });

    // 发现页面收藏按钮事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-fav-btn')) {
            const name = e.target.getAttribute('data-name');
            const url = e.target.getAttribute('data-url');
            const icon = e.target.getAttribute('data-icon');

            addFavorite(name, url, icon);

            // 添加成功反馈
            const originalHTML = e.target.innerHTML;
            e.target.innerHTML = '<i class="fas fa-check"></i> 已收藏';
            e.target.disabled = true;
            e.target.style.background = '#4CAF50';
            e.target.style.borderColor = '#4CAF50';

            setTimeout(() => {
                e.target.innerHTML = originalHTML;
                e.target.disabled = false;
                e.target.style.background = '';
                e.target.style.borderColor = '';
            }, 2000);
        }
    });

    // 为收藏页面添加事件委托
    document.getElementById('favorites-grid').addEventListener('click', function(e) {
        // 访问按钮
        if (e.target.closest('.visit-favorite')) {
            const btn = e.target.closest('.visit-favorite');
            const url = btn.getAttribute('data-url');
            window.open(url, '_blank');
        }

        // 删除按钮
        if (e.target.closest('.delete-favorite')) {
            const btn = e.target.closest('.delete-favorite');
            const index = parseInt(btn.getAttribute('data-index'));
            deleteFavorite(index);
        }

        // 编辑按钮
        if (e.target.closest('.edit-favorite')) {
            const btn = e.target.closest('.edit-favorite');
            const index = parseInt(btn.getAttribute('data-index'));
            editFavorite(index);
        }
    });

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