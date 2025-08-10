// 程序员菜单生成器 - 简化版本
class MenuGenerator {
    constructor() {
        this.dishes = [];
        this.currentMode = null;
        this.init();
    }

    init() {
        this.loadDefaultDishes();
        this.bindEvents();
        this.showMessage('系统初始化完成 ✓', 'success');
    }

    // 加载默认菜品
    loadDefaultDishes() {
        this.dishes = [
            // 经典家常菜
            { name: '番茄鸡蛋', ingredients: ['番茄', '鸡蛋', '葱'], difficulty: 1, time: 15 },
            { name: '红烧肉', ingredients: ['五花肉', '生抽', '老抽', '冰糖'], difficulty: 4, time: 90 },
            { name: '青椒土豆丝', ingredients: ['土豆', '青椒', '蒜'], difficulty: 2, time: 20 },
            { name: '宫保鸡丁', ingredients: ['鸡胸肉', '花生米', '干辣椒'], difficulty: 3, time: 30 },
            { name: '蒸蛋羹', ingredients: ['鸡蛋', '温水', '盐'], difficulty: 1, time: 25 },
            { name: '麻婆豆腐', ingredients: ['豆腐', '肉末', '豆瓣酱'], difficulty: 3, time: 25 },
            { name: '糖醋里脊', ingredients: ['里脊肉', '醋', '糖', '番茄酱'], difficulty: 3, time: 35 },
            { name: '白菜炖豆腐', ingredients: ['白菜', '豆腐', '粉条'], difficulty: 2, time: 30 },
            { name: '可乐鸡翅', ingredients: ['鸡翅', '可乐', '生抽'], difficulty: 2, time: 40 },
            { name: '蚂蚁上树', ingredients: ['粉条', '肉末', '豆瓣酱'], difficulty: 3, time: 25 },
            
            // 素菜系列
            { name: '地三鲜', ingredients: ['茄子', '土豆', '青椒', '蒜'], difficulty: 2, time: 25 },
            { name: '干煸豆角', ingredients: ['豆角', '肉末', '干辣椒', '花椒'], difficulty: 2, time: 20 },
            { name: '醋溜白菜', ingredients: ['白菜', '醋', '干辣椒', '花椒'], difficulty: 1, time: 15 },
            { name: '凉拌黄瓜', ingredients: ['黄瓜', '蒜', '醋', '香油'], difficulty: 1, time: 10 },
            { name: '韭菜炒蛋', ingredients: ['韭菜', '鸡蛋', '盐'], difficulty: 1, time: 12 },
            
            // 肉菜系列
            { name: '回锅肉', ingredients: ['五花肉', '豆瓣酱', '青椒', '蒜苗'], difficulty: 3, time: 35 },
            { name: '鱼香肉丝', ingredients: ['里脊肉', '木耳', '胡萝卜', '豆瓣酱'], difficulty: 3, time: 30 },
            { name: '红烧排骨', ingredients: ['排骨', '生抽', '老抽', '冰糖'], difficulty: 3, time: 60 },
            { name: '水煮肉片', ingredients: ['里脊肉', '白菜', '豆瓣酱', '花椒'], difficulty: 4, time: 40 },
            { name: '口水鸡', ingredients: ['鸡腿', '花椒', '辣椒油', '蒜泥'], difficulty: 3, time: 45 },
            
            // 汤品系列
            { name: '西红柿蛋花汤', ingredients: ['番茄', '鸡蛋', '葱花'], difficulty: 1, time: 15 },
            { name: '冬瓜排骨汤', ingredients: ['冬瓜', '排骨', '姜'], difficulty: 2, time: 80 },
            { name: '紫菜蛋花汤', ingredients: ['紫菜', '鸡蛋', '香油'], difficulty: 1, time: 10 },
            
            // 面食系列
            { name: '西红柿鸡蛋面', ingredients: ['面条', '番茄', '鸡蛋'], difficulty: 2, time: 20 },
            { name: '炸酱面', ingredients: ['面条', '肉末', '甜面酱', '黄瓜'], difficulty: 3, time: 30 },
            { name: '蛋炒饭', ingredients: ['米饭', '鸡蛋', '胡萝卜', '豌豆'], difficulty: 2, time: 15 },
            
            // 特色菜
            { name: '麻辣香锅', ingredients: ['土豆', '豆腐', '肉片', '麻辣料'], difficulty: 4, time: 45 },
            { name: '水煮鱼', ingredients: ['鱼片', '豆芽', '豆瓣酱', '花椒'], difficulty: 5, time: 50 },
            { name: '毛血旺', ingredients: ['鸭血', '豆腐', '豆芽', '辣椒'], difficulty: 4, time: 40 },
            { name: '酸菜鱼', ingredients: ['鱼片', '酸菜', '豆腐', '粉条'], difficulty: 4, time: 45 }
        ];
    }

    // 绑定事件
    bindEvents() {
        // 主要功能按钮
        document.getElementById('random-btn').addEventListener('click', () => this.randomRecommend());
        document.getElementById('ingredient-btn').addEventListener('click', () => this.showIngredientFilter());
        document.getElementById('choose-btn').addEventListener('click', () => this.showChooseFilter());
        
        // 筛选面板按钮
        document.getElementById('apply-btn').addEventListener('click', () => this.applyFilter());
        document.getElementById('cancel-btn').addEventListener('click', () => this.hideFilter());
        
        // 管理按钮
        document.getElementById('add-btn').addEventListener('click', () => this.showAddForm());
        document.getElementById('manage-btn').addEventListener('click', () => this.showDishList());
        
        // 表单相关
        document.getElementById('dish-form').addEventListener('submit', (e) => this.addDish(e));
        document.getElementById('close-add-btn').addEventListener('click', () => this.hideAddForm());
        document.getElementById('cancel-add-btn').addEventListener('click', () => this.hideAddForm());
        
        // 列表相关
        document.getElementById('close-list-btn').addEventListener('click', () => this.hideDishList());
    }

    // 随机推荐 - 添加滚动效果
    randomRecommend() {
        if (this.dishes.length === 0) {
            this.showMessage('ERROR: 菜单为空', 'error');
            return;
        }

        this.startSlotMachine(this.dishes, 'random');
    }

    // 显示食材筛选
    showIngredientFilter() {
        this.currentMode = 'ingredient';
        this.showFilter();
        document.getElementById('ingredient-filter').classList.remove('hidden');
        document.getElementById('choose-filter').classList.add('hidden');
    }

    // 显示指定选择
    showChooseFilter() {
        this.currentMode = 'choose';
        this.showFilter();
        document.getElementById('ingredient-filter').classList.add('hidden');
        document.getElementById('choose-filter').classList.remove('hidden');
    }

    // 显示筛选面板
    showFilter() {
        document.getElementById('filter-panel').classList.remove('hidden');
    }

    // 隐藏筛选面板
    hideFilter() {
        document.getElementById('filter-panel').classList.add('hidden');
        document.getElementById('ingredient-filter').classList.add('hidden');
        document.getElementById('choose-filter').classList.add('hidden');
        this.clearInputs();
    }

    // 应用筛选
    applyFilter() {
        if (this.currentMode === 'ingredient') {
            this.ingredientRecommend();
        } else if (this.currentMode === 'choose') {
            this.chooseRecommend();
        }
        this.hideFilter();
    }

    // 基于食材推荐
    ingredientRecommend() {
        const input = document.getElementById('ingredient-input').value.trim();
        if (!input) {
            this.showMessage('请输入食材', 'warning');
            return;
        }

        const ingredients = input.split(',').map(item => item.trim()).filter(item => item);
        const matchedDishes = this.dishes.filter(dish => 
            ingredients.some(ingredient => 
                dish.ingredients.some(dishIngredient => 
                    dishIngredient.includes(ingredient) || ingredient.includes(dishIngredient)
                )
            )
        );

        if (matchedDishes.length === 0) {
            this.showMessage(`未找到包含 [${ingredients.join(', ')}] 的菜品`, 'warning');
            this.displayNoResult('ingredient', ingredients);
            return;
        }

        this.startSlotMachine(matchedDishes, 'ingredient', ingredients);
    }

    // 指定选择推荐
    chooseRecommend() {
        const input = document.getElementById('choose-input').value.trim();
        if (!input) {
            this.showMessage('请输入菜品名称', 'warning');
            return;
        }

        const dishNames = input.split(',').map(item => item.trim()).filter(item => item);
        const availableDishes = this.dishes.filter(dish => 
            dishNames.some(name => dish.name.includes(name) || name.includes(dish.name))
        );

        if (availableDishes.length === 0) {
            this.showMessage(`未找到菜品: [${dishNames.join(', ')}]`, 'warning');
            this.displayNoResult('choose', dishNames);
            return;
        }

        this.startSlotMachine(availableDishes, 'choose', dishNames);
    }

    // 滚动老虎机效果
    startSlotMachine(candidates, mode, params = []) {
        const resultDisplay = document.getElementById('result-display');
        
        // 显示滚动界面
        resultDisplay.innerHTML = `
            <div class="slot-machine">
                <div class="slot-header">
                    <div class="slot-title">🎰 正在筛选中...</div>
                    <div class="slot-counter">候选菜品: ${candidates.length} 个</div>
                </div>
                <div class="slot-display">
                    <div class="slot-reel" id="slot-reel">
                        <!-- 滚动内容将在这里生成 -->
                    </div>
                </div>
                <div class="slot-footer">
                    <div class="loading-bar">
                        <div class="loading-progress" id="loading-progress"></div>
                    </div>
                    <div class="slot-status">系统正在计算最佳匹配...</div>
                </div>
            </div>
        `;

        // 开始滚动动画
        this.animateSlotMachine(candidates, mode, params);
    }

    // 滚动动画逻辑 - 使用抛物线缓动
    animateSlotMachine(candidates, mode, params) {
        const reel = document.getElementById('slot-reel');
        const progressBar = document.getElementById('loading-progress');
        
        // 创建扩展的候选列表（包含重复项以实现循环效果）
        const extendedCandidates = [];
        for (let i = 0; i < 15; i++) {
            extendedCandidates.push(...candidates);
        }
        
        // 最终选择的菜品
        const finalIndex = Math.floor(Math.random() * candidates.length);
        const finalDish = candidates[finalIndex];
        
        // 动画参数
        const totalDuration = 2500; // 总持续时间（毫秒）
        const startTime = Date.now();
        let currentIndex = 0;
        
        // 抛物线缓动函数 (easeOutQuad)
        const easeOutQuad = (t) => {
            return 1 - (1 - t) * (1 - t);
        };
        
        // 反向抛物线缓动函数 (easeInQuad) - 用于速度计算
        const easeInQuad = (t) => {
            return t * t;
        };
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            
            // 更新进度条
            progressBar.style.width = `${progress * 100}%`;
            
            // 使用缓动函数计算当前速度
            // 开始时快速滚动，然后平滑减速
            const speedProgress = easeInQuad(progress);
            const minInterval = 30;  // 最小间隔（最快速度）
            const maxInterval = 300; // 最大间隔（最慢速度）
            const currentInterval = minInterval + (maxInterval - minInterval) * speedProgress;
            
            // 显示前中后三个菜品，营造真实老虎机效果
            const prevIndex = (currentIndex - 1 + extendedCandidates.length) % extendedCandidates.length;
            const currIndex = currentIndex % extendedCandidates.length;
            const nextIndex = (currentIndex + 1) % extendedCandidates.length;
            
            const prevDish = extendedCandidates[prevIndex];
            const currentDish = extendedCandidates[currIndex];
            const nextDish = extendedCandidates[nextIndex];
            
            reel.innerHTML = `
                <div class="slot-item prev">
                    <div class="dish-name-slot">${prevDish.name}</div>
                </div>
                <div class="slot-item current">
                    <div class="dish-name-slot">${currentDish.name}</div>
                </div>
                <div class="slot-item next">
                    <div class="dish-name-slot">${nextDish.name}</div>
                </div>
            `;
            
            currentIndex++;
            
            if (progress < 1) {
                // 根据当前速度设置下一次动画的延迟
                setTimeout(animate, currentInterval);
            } else {
                // 滚动结束，显示最终结果
                setTimeout(() => {
                    this.displayFinalResult(finalDish, mode, params);
                    this.showMessage(`🎰 滚动完成! 推荐: ${finalDish.name}`, 'success');
                }, 200);
            }
        };
        
        // 开始动画
        animate();
    }

    // 显示最终结果
    displayFinalResult(dish, mode, params = []) {
        const difficultyStars = '★'.repeat(dish.difficulty) + '☆'.repeat(5 - dish.difficulty);
        const modeText = {
            'random': '随机推荐',
            'ingredient': `食材筛选: ${params.join(', ')}`,
            'choose': `指定选择: ${params.join(', ')}`
        };

        document.getElementById('result-display').innerHTML = `
            <div class="dish-result final-result">
                <div class="result-header">
                    <div class="winner-badge">🏆 推荐结果</div>
                    <h2 class="dish-name">${dish.name}</h2>
                    <div class="mode-info"># ${modeText[mode]}</div>
                </div>
                <div class="dish-info">
                    <div class="info-item">
                        <span class="label">食材:</span>
                        <span class="value">[${dish.ingredients.join(', ')}]</span>
                    </div>
                    <div class="info-item">
                        <span class="label">难度:</span>
                        <span class="value">${difficultyStars} (${dish.difficulty}/5)</span>
                    </div>
                    <div class="info-item">
                        <span class="label">时间:</span>
                        <span class="value">${dish.time} 分钟</span>
                    </div>
                </div>
                <div class="result-footer">
                    <small>推荐时间: ${new Date().toLocaleString()}</small>
                </div>
            </div>
        `;
    }

    // 显示推荐结果（保留原方法作为备用）
    displayResult(dish, mode, params = []) {
        const difficultyStars = '★'.repeat(dish.difficulty) + '☆'.repeat(5 - dish.difficulty);
        const modeText = {
            'random': '随机推荐',
            'ingredient': `食材筛选: ${params.join(', ')}`,
            'choose': `指定选择: ${params.join(', ')}`
        };

        document.getElementById('result-display').innerHTML = `
            <div class="dish-result">
                <div class="result-header">
                    <h2 class="dish-name">${dish.name}</h2>
                    <div class="mode-info"># ${modeText[mode]}</div>
                </div>
                <div class="dish-info">
                    <div class="info-item">
                        <span class="label">食材:</span>
                        <span class="value">[${dish.ingredients.join(', ')}]</span>
                    </div>
                    <div class="info-item">
                        <span class="label">难度:</span>
                        <span class="value">${difficultyStars} (${dish.difficulty}/5)</span>
                    </div>
                    <div class="info-item">
                        <span class="label">时间:</span>
                        <span class="value">${dish.time} 分钟</span>
                    </div>
                </div>
                <div class="result-footer">
                    <small>推荐时间: ${new Date().toLocaleString()}</small>
                </div>
            </div>
        `;
    }

    // 显示无结果
    displayNoResult(mode, params) {
        const suggestions = this.getSuggestions(mode, params);
        document.getElementById('result-display').innerHTML = `
            <div class="no-result">
                <div class="error-icon">❌</div>
                <h3>未找到匹配结果</h3>
                <div class="suggestions">
                    <p>建议:</p>
                    <ul>
                        ${suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // 获取建议
    getSuggestions(mode, params) {
        if (mode === 'ingredient') {
            const allIngredients = [...new Set(this.dishes.flatMap(dish => dish.ingredients))];
            return [
                `可用食材: ${allIngredients.slice(0, 10).join(', ')}...`,
                '尝试使用更常见的食材',
                '检查输入的食材名称是否正确'
            ];
        } else if (mode === 'choose') {
            const allDishes = this.dishes.map(dish => dish.name);
            return [
                `可选菜品: ${allDishes.slice(0, 5).join(', ')}...`,
                '检查菜品名称是否正确',
                '可以输入菜品名称的一部分'
            ];
        }
        return [];
    }

    // 显示添加表单
    showAddForm() {
        document.getElementById('add-dish-form').classList.remove('hidden');
    }

    // 隐藏添加表单
    hideAddForm() {
        document.getElementById('add-dish-form').classList.add('hidden');
        document.getElementById('dish-form').reset();
    }

    // 添加菜品
    addDish(e) {
        e.preventDefault();
        
        const name = document.getElementById('dish-name').value.trim();
        const ingredients = document.getElementById('dish-ingredients').value.trim().split(',').map(item => item.trim());
        const difficulty = parseInt(document.getElementById('dish-difficulty').value);
        const time = parseInt(document.getElementById('dish-time').value);

        if (!name || ingredients.length === 0) {
            this.showMessage('请填写完整信息', 'error');
            return;
        }

        // 检查是否已存在
        if (this.dishes.some(dish => dish.name === name)) {
            this.showMessage('菜品已存在', 'warning');
            return;
        }

        const newDish = { name, ingredients, difficulty, time };
        this.dishes.push(newDish);
        
        this.hideAddForm();
        this.showMessage(`成功添加菜品: ${name}`, 'success');
    }

    // 显示菜品列表
    showDishList() {
        document.getElementById('dish-list').classList.remove('hidden');
        this.renderDishList();
    }

    // 隐藏菜品列表
    hideDishList() {
        document.getElementById('dish-list').classList.add('hidden');
    }

    // 渲染菜品列表
    renderDishList() {
        const container = document.getElementById('dishes-container');
        if (this.dishes.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>暂无菜品</p></div>';
            return;
        }

        container.innerHTML = this.dishes.map((dish, index) => `
            <div class="dish-item">
                <div class="dish-header">
                    <h3>${dish.name}</h3>
                    <button class="btn btn-small" onclick="menuGenerator.removeDish(${index})">删除</button>
                </div>
                <div class="dish-details">
                    <p><strong>食材:</strong> ${dish.ingredients.join(', ')}</p>
                    <p><strong>难度:</strong> ${'★'.repeat(dish.difficulty)}${'☆'.repeat(5 - dish.difficulty)} (${dish.difficulty}/5)</p>
                    <p><strong>时间:</strong> ${dish.time} 分钟</p>
                </div>
            </div>
        `).join('');
    }

    // 删除菜品
    removeDish(index) {
        if (confirm(`确定删除 "${this.dishes[index].name}" 吗？`)) {
            const dishName = this.dishes[index].name;
            this.dishes.splice(index, 1);
            this.renderDishList();
            this.showMessage(`已删除: ${dishName}`, 'success');
        }
    }

    // 清空输入
    clearInputs() {
        document.getElementById('ingredient-input').value = '';
        document.getElementById('choose-input').value = '';
    }

    // 显示消息
    showMessage(message, type = 'info') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toast-message');
        
        // 清除之前的定时器
        if (this.toastTimer) {
            clearTimeout(this.toastTimer);
        }
        
        // 设置消息内容和样式
        messageEl.textContent = message;
        toast.className = `toast ${type}`;
        
        // 显示toast
        toast.classList.remove('hidden');
        
        // 设置自动隐藏
        this.toastTimer = setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// 初始化应用
let menuGenerator;
document.addEventListener('DOMContentLoaded', () => {
    menuGenerator = new MenuGenerator();
});