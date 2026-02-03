// daily-update.js - AI宝网每日更新脚本
// 这个脚本负责处理网站的每日自动更新功能

class DailyUpdater {
    constructor() {
        this.lastUpdateKey = 'aibao_last_update';
        this.newsDataKey = 'aibao_news_data';
        this.toolsDataKey = 'aibao_tools_data';
        this.trendingDataKey = 'aibao_trending_data';
        
        // 初始化
        this.init();
    }
    
    init() {
        // 检查是否需要更新
        this.checkAndUpdate();
        
        // 设置每日凌晨2点自动检查更新
        this.setupAutoUpdate();
    }
    
    // 获取当前日期（格式：YYYY-MM-DD）
    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }
    
    // 获取上次更新日期
    getLastUpdateDate() {
        return localStorage.getItem(this.lastUpdateKey) || '';
    }
    
    // 设置更新日期
    setLastUpdateDate(date) {
        localStorage.setItem(this.lastUpdateKey, date);
    }
    
    // 检查是否需要更新
    checkAndUpdate() {
        const currentDate = this.getCurrentDate();
        const lastUpdateDate = this.getLastUpdateDate();
        
        if (currentDate !== lastUpdateDate) {
            console.log(`执行每日更新: ${currentDate}`);
            this.performUpdate();
            this.setLastUpdateDate(currentDate);
            
            // 更新页面显示日期
            this.updatePageDate(currentDate);
        } else {
            console.log(`今日已更新: ${currentDate}`);
        }
    }
    
    // 执行更新操作
    async performUpdate() {
        try {
            // 这里可以添加实际的API调用逻辑
            // 例如从服务器获取最新的新闻和工具数据
            
            // 模拟API调用
            const updatedData = await this.fetchUpdatedData();
            
            // 更新本地存储的数据
            this.updateLocalData(updatedData);
            
            // 更新页面内容
            this.updatePageContent(updatedData);
            
            console.log('每日更新完成');
        } catch (error) {
            console.error('更新失败:', error);
        }
    }
    
    // 模拟获取更新数据
    async fetchUpdatedData() {
        // 在实际应用中，这里应该调用后端API
        // 返回示例数据
        return {
            news: this.generateDailyNews(),
            trending: this.generateTrendingTopics(),
            tools: this.getToolsData() // 工具数据通常变化较慢
        };
    }
    
    // 生成每日新闻
    generateDailyNews() {
        const newsTemplates = [
            {
                title: "AI在{领域}领域取得新突破",
                categories: ["技术突破", "行业动态", "研究进展"],
                domains: ["医疗", "金融", "教育", "制造", "交通"]
            },
            {
                title: "{公司}发布新一代AI产品",
                categories: ["产品发布", "企业动态"],
                companies: ["OpenAI", "Google", "Microsoft", "Meta", "Amazon"]
            },
            {
                title: "AI伦理与监管政策更新",
                categories: ["政策法规", "AI伦理"],
                regions: ["欧盟", "美国", "中国", "英国", "日本"]
            }
        ];
        
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        
        // 生成3-5条新闻
        const newsCount = 3 + Math.floor(Math.random() * 3);
        const news = [];
        
        for (let i = 0; i < newsCount; i++) {
            const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
            const category = template.categories[Math.floor(Math.random() * template.categories.length)];
            
            let title = template.title;
            if (template.domains) {
                const domain = template.domains[Math.floor(Math.random() * template.domains.length)];
                title = title.replace('{领域}', domain);
            } else if (template.companies) {
                const company = template.companies[Math.floor(Math.random() * template.companies.length)];
                title = title.replace('{公司}', company);
            } else if (template.regions) {
                const region = template.regions[Math.floor(Math.random() * template.regions.length)];
                title = title.replace('{区域}', region);
            }
            
            news.push({
                id: Date.now() + i,
                title: title,
                summary: `这是${dateStr}的AI领域最新动态，展示了人工智能技术的快速发展。`,
                category: category,
                date: dateStr,
                readTime: `${3 + Math.floor(Math.random() * 3)}分钟`
            });
        }
        
        return news;
    }
    
    // 生成热门话题
    generateTrendingTopics() {
        const baseTopics = [
            "生成式AI发展趋势",
            "多模态AI应用",
            "AI伦理与安全",
            "边缘计算AI",
            "AI在金融领域的应用",
            "自动驾驶技术进展",
            "AI芯片技术突破",
            "AI内容创作工具",
            "大语言模型优化",
            "AI辅助医疗诊断",
            "智能客服系统",
            "AI艺术创作",
            "机器学习算法",
            "深度学习框架",
            "计算机视觉技术"
        ];
        
        // 随机选择8个话题
        const shuffled = [...baseTopics].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 8);
    }
    
    // 获取工具数据
    getToolsData() {
        // 在实际应用中，这里可以调用API获取最新的工具数据
        // 返回静态数据或从API获取
        return [
            {
                id: 1,
                name: "ChatGPT",
                icon: "fas fa-comments",
                description: "OpenAI开发的对话式AI模型，支持自然语言对话、文本生成、代码编写等多种功能。",
                category: "文本生成",
                tags: ["对话AI", "文本生成", "编程助手"],
                link: "https://chat.openai.com"
            },
            {
                id: 2,
                name: "Midjourney",
                icon: "fas fa-palette",
                description: "强大的AI图像生成工具，通过文本描述创建高质量的艺术作品和图像。",
                category: "图像创作",
                tags: ["AI绘画", "图像生成", "艺术创作"],
                link: "https://www.midjourney.com"
            },
            {
                id: 3,
                name: "GitHub Copilot",
                icon: "fas fa-code",
                description: "AI编程助手，在编写代码时提供智能建议和自动补全功能。",
                category: "代码编程",
                tags: ["编程助手", "代码补全", "开发工具"],
                link: "https://github.com/features/copilot"
            }
        ];
    }
    
    // 更新本地存储的数据
    updateLocalData(data) {
        if (data.news) {
            localStorage.setItem(this.newsDataKey, JSON.stringify(data.news));
        }
        
        if (data.trending) {
            localStorage.setItem(this.trendingDataKey, JSON.stringify(data.trending));
        }
        
        if (data.tools) {
            localStorage.setItem(this.toolsDataKey, JSON.stringify(data.tools));
        }
    }
    
    // 更新页面内容
    updatePageContent(data) {
        // 更新新闻列表
        if (data.news && document.getElementById('newsList')) {
            this.updateNewsList(data.news);
        }
        
        // 更新热门话题
        if (data.trending && document.getElementById('trendingList')) {
            this.updateTrendingList(data.trending);
        }
        
        // 显示更新通知
        this.showUpdateNotification();
    }
    
    // 更新新闻列表
    updateNewsList(news) {
        const newsList = document.getElementById('newsList');
        if (!newsList) return;
        
        newsList.innerHTML = '';
        
        news.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <div class="news-meta">
                    <span class="news-category">${item.category}</span>
                    <span>${item.date} · ${item.readTime}</span>
                </div>
            `;
            newsList.appendChild(newsItem);
        });
    }
    
    // 更新热门话题列表
    updateTrendingList(topics) {
        const trendingList = document.getElementById('trendingList');
        if (!trendingList) return;
        
        trendingList.innerHTML = '';
        
        topics.forEach(topic => {
            const listItem = document.createElement('li');
            listItem.className = 'trending-item';
            listItem.innerHTML = `<a href="#">${topic}</a>`;
            trendingList.appendChild(listItem);
        });
    }
    
    // 更新页面显示日期
    updatePageDate(date) {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            dateElement.textContent = date;
        }
    }
    
    // 显示更新通知
    showUpdateNotification() {
        // 在实际应用中，可以显示一个toast通知
        console.log('页面内容已更新');
        
        // 示例：在控制台显示通知
        if (console && console.log) {
            console.log('%c📰 AI宝网内容已更新！', 'color: #2563eb; font-weight: bold; font-size: 14px;');
        }
    }
    
    // 设置自动更新检查
    setupAutoUpdate() {
        // 计算到明天凌晨2点的时间
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(2, 0, 0, 0);
        
        const timeUntilUpdate = tomorrow.getTime() - now.getTime();
        
        // 设置定时器
        setTimeout(() => {
            this.checkAndUpdate();
            // 设置每日重复
            this.setupAutoUpdate();
        }, timeUntilUpdate);
        
        console.log(`下次自动更新: ${tomorrow.toLocaleString()}`);
    }
    
    // 手动触发更新
    manualUpdate() {
        console.log('手动触发更新...');
        this.performUpdate();
        this.setLastUpdateDate(this.getCurrentDate());
    }
}

// 导出更新器实例
const dailyUpdater = new DailyUpdater();

// 在全局对象中暴露手动更新方法
window.dailyUpdater = dailyUpdater;