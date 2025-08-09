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
            { name: '番茄鸡蛋', ingredients: ['番茄', '鸡蛋', '葱'], difficulty: 1, time: 15 },
            { name: '红烧肉', ingredients: ['五花肉', '生抽', '老抽', '冰糖'], difficulty: 4, time: 90 },
            { name: '青椒土豆丝', ingredients: ['土豆', '青椒', '蒜'], difficulty: 2, time: 20 },
            { name: '宫保鸡丁', ingredients: ['鸡胸肉', '花生米', '干辣椒'], difficulty: 3, time: 30 },
            { name: '蒸蛋羹', ingredients: ['鸡蛋', '温水', '盐'], difficulty: 1, time: 25 },
            { name: '麻婆豆腐', ingredients: ['豆腐', '肉末', '豆瓣酱'], difficulty: 3, time: 25 },
            { name: '糖醋里脊', ingredients: ['里脊肉', '醋', '糖', '番茄酱'], difficulty: 3, time: 35 },
            { name: '白菜炖豆腐', ingredients: ['白菜', '豆腐', '粉条'], difficulty: 2, time: 30 },
            { name: '可乐鸡翅', ingredients: ['鸡翅', '可乐', '生抽'], difficulty: 2, time: 40 },
            { name: '蚂蚁上树', ingredients: ['粉条', '肉末', '豆瓣酱'], difficulty: 3, time: 25 }
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

    // 随机推荐
    randomRecommend() {
        if (this.dishes.length === 0) {
            this.showMessage('ERROR: 菜单为空', 'error');
            return;
        }

        const randomIndex = Math.floor(Math.random() * this.dishes.length);
        const dish = this.dishes[randomIndex];
        this.displayResult(dish, 'random');
        this.showMessage(`随机推荐: ${dish.name}`, 'success');
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

        const randomIndex = Math.floor(Math.random() * matchedDishes.length);
        const dish = matchedDishes[randomIndex];
        this.displayResult(dish, 'ingredient', ingredients);
        this.showMessage(`基于食材推荐: ${dish.name}`, 'success');
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

        const randomIndex = Math.floor(Math.random() * availableDishes.length);
        const dish = availableDishes[randomIndex];
        this.displayResult(dish, 'choose', dishNames);
        this.showMessage(`从指定菜品中选择: ${dish.name}`, 'success');
    }

    // 显示推荐结果
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
        
        messageEl.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}

// 初始化应用
let menuGenerator;
document.addEventListener('DOMContentLoaded', () => {
    menuGenerator = new MenuGenerator();
});