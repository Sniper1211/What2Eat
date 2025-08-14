// 程序员菜单生成器 - 简化版本
class MenuGenerator {
    constructor() {
        this.dishes = [];
        this.currentMode = null;
        this.directorMode = false; // 导演模式状态
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
            { name: '番茄鸡蛋', ingredients: ['番茄', '鸡蛋', '葱'], difficulty: 1, time: 15, marked: false },
            { name: '红烧肉', ingredients: ['五花肉', '生抽', '老抽', '冰糖'], difficulty: 4, time: 90, marked: false },
            { name: '青椒土豆丝', ingredients: ['土豆', '青椒', '蒜'], difficulty: 2, time: 20, marked: false },
            { name: '宫保鸡丁', ingredients: ['鸡胸肉', '花生米', '干辣椒'], difficulty: 3, time: 30, marked: false },
            { name: '蒸蛋羹', ingredients: ['鸡蛋', '温水', '盐'], difficulty: 1, time: 25, marked: false },
            { name: '麻婆豆腐', ingredients: ['豆腐', '肉末', '豆瓣酱'], difficulty: 3, time: 25, marked: false },
            { name: '糖醋里脊', ingredients: ['里脊肉', '醋', '糖', '番茄酱'], difficulty: 3, time: 35, marked: false },
            { name: '白菜炖豆腐', ingredients: ['白菜', '豆腐', '粉条'], difficulty: 2, time: 30, marked: false },
            { name: '可乐鸡翅', ingredients: ['鸡翅', '可乐', '生抽'], difficulty: 2, time: 40, marked: false },
            { name: '蚂蚁上树', ingredients: ['粉条', '肉末', '豆瓣酱'], difficulty: 3, time: 25, marked: false },

            // 素菜系列
            { name: '地三鲜', ingredients: ['茄子', '土豆', '青椒', '蒜'], difficulty: 2, time: 25, marked: false },
            { name: '干煸豆角', ingredients: ['豆角', '肉末', '干辣椒', '花椒'], difficulty: 2, time: 20, marked: false },
            { name: '醋溜白菜', ingredients: ['白菜', '醋', '干辣椒', '花椒'], difficulty: 1, time: 15, marked: false },
            { name: '凉拌黄瓜', ingredients: ['黄瓜', '蒜', '醋', '香油'], difficulty: 1, time: 10, marked: false },
            { name: '韭菜炒蛋', ingredients: ['韭菜', '鸡蛋', '盐'], difficulty: 1, time: 12, marked: false },

            // 肉菜系列
            { name: '回锅肉', ingredients: ['五花肉', '豆瓣酱', '青椒', '蒜苗'], difficulty: 3, time: 35, marked: false },
            { name: '鱼香肉丝', ingredients: ['里脊肉', '木耳', '胡萝卜', '豆瓣酱'], difficulty: 3, time: 30, marked: false },
            { name: '红烧排骨', ingredients: ['排骨', '生抽', '老抽', '冰糖'], difficulty: 3, time: 60, marked: false },
            { name: '水煮肉片', ingredients: ['里脊肉', '白菜', '豆瓣酱', '花椒'], difficulty: 4, time: 40, marked: false },
            { name: '口水鸡', ingredients: ['鸡腿', '花椒', '辣椒油', '蒜泥'], difficulty: 3, time: 45, marked: false },

            // 汤品系列
            { name: '西红柿蛋花汤', ingredients: ['番茄', '鸡蛋', '葱花'], difficulty: 1, time: 15, marked: false },
            { name: '冬瓜排骨汤', ingredients: ['冬瓜', '排骨', '姜'], difficulty: 2, time: 80, marked: false },
            { name: '紫菜蛋花汤', ingredients: ['紫菜', '鸡蛋', '香油'], difficulty: 1, time: 10, marked: false },

            // 面食系列
            { name: '西红柿鸡蛋面', ingredients: ['面条', '番茄', '鸡蛋'], difficulty: 2, time: 20, marked: false },
            { name: '炸酱面', ingredients: ['面条', '肉末', '甜面酱', '黄瓜'], difficulty: 3, time: 30, marked: false },
            { name: '蛋炒饭', ingredients: ['米饭', '鸡蛋', '胡萝卜', '豌豆'], difficulty: 2, time: 15, marked: false },

            // 特色菜
            { name: '麻辣香锅', ingredients: ['土豆', '豆腐', '肉片', '麻辣料'], difficulty: 4, time: 45, marked: false },
            { name: '水煮鱼', ingredients: ['鱼片', '豆芽', '豆瓣酱', '花椒'], difficulty: 5, time: 50, marked: false },
            { name: '毛血旺', ingredients: ['鸭血', '豆腐', '豆芽', '辣椒'], difficulty: 4, time: 40, marked: false },
            { name: '酸菜鱼', ingredients: ['鱼片', '酸菜', '豆腐', '粉条'], difficulty: 4, time: 45, marked: false }
        ];
    }

    // 绑定事件
    bindEvents() {
        // 主要功能按钮
        document.getElementById('random-btn').addEventListener('click', () => this.randomRecommend());

        // 导演模式开关
        document.getElementById('director-mode-toggle').addEventListener('change', (e) => {
            this.directorMode = e.target.checked;
            this.showMessage(
                this.directorMode ? '🎬 导演模式已开启' : '🎬 导演模式已关闭',
                'info'
            );
        });

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

        // 导演模式：预设结果但视觉上显示所有菜品
        let finalDish = null;
        if (this.directorMode) {
            const markedDishes = this.dishes.filter(dish => dish.marked);
            if (markedDishes.length > 0) {
                if (markedDishes.length > 1) {
                    this.showMessage('🎬 导演模式：请只标记一个菜品', 'warning');
                    return;
                }
                finalDish = markedDishes[0];
                this.showMessage('🎬 导演模式：已内定结果', 'info');
            } else {
                this.showMessage('🎬 导演模式：未找到标记菜品，请先标记一个菜品', 'warning');
                return;
            }
        }

        // 视觉上始终显示所有菜品参与滚动
        this.startSlotMachine(this.dishes, 'random', [], finalDish);
    }



    // 滚动老虎机效果
    startSlotMachine(candidates, mode, params = [], presetResult = null) {
        const resultDisplay = document.getElementById('result-display');

        // 显示滚动界面
        resultDisplay.innerHTML = `
            <div class="slot-machine">
                <div class="slot-header">
                    <div class="slot-title">🎰 正在选择菜品...</div>
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
                    <div class="slot-status">正在从菜单中随机选择...</div>
                </div>
            </div>
        `;

        // 开始滚动动画
        this.animateSlotMachine(candidates, mode, params, presetResult);
    }

    // 滚动动画逻辑 - 使用抛物线缓动
    animateSlotMachine(candidates, mode, params, presetResult = null) {
        const reel = document.getElementById('slot-reel');
        const progressBar = document.getElementById('loading-progress');

        // 创建扩展的候选列表（包含重复项以实现循环效果）
        const extendedCandidates = [];
        for (let i = 0; i < 15; i++) {
            extendedCandidates.push(...candidates);
        }

        // 最终选择的菜品
        let finalDish, finalIndex;
        if (presetResult) {
            // 导演模式：使用预设结果
            finalDish = presetResult;
            finalIndex = candidates.findIndex(dish => dish.name === presetResult.name);
        } else {
            // 普通模式：真随机选择
            finalIndex = Math.floor(Math.random() * candidates.length);
            finalDish = candidates[finalIndex];
        }

        // 动画参数 - 增加滚动时长
        const totalDuration = 4000; // 总持续时间（毫秒）- 从2.5秒增加到4秒
        const startTime = Date.now();

        // 抛物线缓动函数 (easeOutQuad)
        const easeOutQuad = (t) => {
            return 1 - (1 - t) * (1 - t);
        };

        // 反向抛物线缓动函数 (easeInQuad) - 用于速度计算
        const easeInQuad = (t) => {
            return t * t;
        };

        // 滚动参数
        let scrollPosition = 0;
        const itemHeight = 60; // 每个菜品项的高度

        // 计算目标滚动距离，确保最终自然停在finalDish上
        const containerHeight = 180;
        const baseScrollDistance = itemHeight * 50; // 增加基础滚动距离，让滚动更长

        // 关键：计算精确的停止位置
        // 当滚动停止时，我们希望 finalIndex 对应的菜品正好在屏幕中心
        // 滚动位置的计算：让目标菜品的索引位置对应到中心
        const cycleLength = candidates.length * itemHeight;

        // 计算多少个完整周期后，再加上目标菜品的偏移
        const fullCycles = Math.floor(baseScrollDistance / cycleLength);
        const remainingDistance = baseScrollDistance % cycleLength;

        // 计算中心位置对应的索引
        const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;
        const centerItemIndex = Math.floor(visibleItems / 2);

        // 我们希望当滚动停止时，中心位置(centerItemIndex)显示finalIndex对应的菜品
        // itemIndex = Math.floor(scrollPosition / itemHeight) + centerItemIndex
        // 我们希望 itemIndex % candidates.length === finalIndex
        // 所以 Math.floor(scrollPosition / itemHeight) + centerItemIndex ≡ finalIndex (mod candidates.length)
        // 即 Math.floor(scrollPosition / itemHeight) ≡ finalIndex - centerItemIndex (mod candidates.length)

        // 重新分析：我们需要让finalIndex对应的菜品出现在itemPosition=60px的位置
        // itemPosition = (i * itemHeight) - (scrollPosition % itemHeight) = 60
        // 我们需要找到哪个i值对应finalIndex，然后让这个i对应的itemPosition=60

        // 当滚动停止时，我们希望某个i值满足：
        // 1. itemIndex = Math.floor(scrollPosition / itemHeight) + i
        // 2. itemIndex % candidates.length === finalIndex  
        // 3. (i * itemHeight) - (scrollPosition % itemHeight) = 60

        // 从条件3：i * 60 - (scrollPosition % 60) = 60
        // 即：i = 1 + (scrollPosition % 60) / 60
        // 为了让i是整数，我们需要scrollPosition % 60 = 0，即i = 1

        // 从条件1和2：Math.floor(scrollPosition / 60) + 1 ≡ finalIndex (mod candidates.length)
        // 即：Math.floor(scrollPosition / 60) ≡ finalIndex - 1 (mod candidates.length)

        // 确保滚动距离是itemHeight的整数倍，这样菜品才能对齐
        const targetScrollFloor = (finalIndex - 1 + candidates.length) % candidates.length;
        const totalTargetDistance = fullCycles * cycleLength + targetScrollFloor * itemHeight;

        console.log(`导演模式调试:
            finalIndex=${finalIndex}, 
            finalDish=${finalDish.name},
            targetScrollFloor=${targetScrollFloor},
            totalTargetDistance=${totalTargetDistance},
            candidates.length=${candidates.length}`);


        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const timeProgress = Math.min(elapsed / totalDuration, 1);

            // 使用基于目标距离的滚动计算
            const distanceProgress = easeOutQuad(timeProgress);
            scrollPosition = totalTargetDistance * distanceProgress;

            // 抛物线进度条：起步猛+中间快+结尾缓
            const enhancedProgress = timeProgress < 0.1
                ? timeProgress * 3  // 前10%时间，进度条快速到30%
                : 0.3 + (distanceProgress - 0.3) * 0.7 / 0.7; // 后90%时间，剩余70%进度用抛物线

            progressBar.style.width = `${Math.min(enhancedProgress, 1) * 100}%`;

            // 当时间到了就结束
            const shouldEnd = timeProgress >= 1;

            // 创建连续滚动的菜品列表
            const containerHeight = 180;
            const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;

            let itemsHTML = '';
            for (let i = 0; i < visibleItems; i++) {
                const itemIndex = Math.floor(scrollPosition / itemHeight) + i;

                // 始终从候选列表中循环选择，让滚动看起来自然
                const dish = candidates[itemIndex % candidates.length];

                // 计算每个菜品的垂直位置
                const itemPosition = (i * itemHeight) - (scrollPosition % itemHeight);
                const centerPosition = containerHeight / 2;
                const distanceFromCenter = Math.abs(itemPosition + itemHeight / 2 - centerPosition);



                // 根据距离中心的位置确定样式
                let opacity, scale, blur;
                if (distanceFromCenter < itemHeight / 2) {
                    // 中心菜品
                    opacity = 1;
                    scale = 1.05;
                    blur = 0;
                } else if (distanceFromCenter < itemHeight * 1.5) {
                    // 临近菜品
                    opacity = 0.65;
                    scale = 0.9;
                    blur = 0.3;
                } else {
                    // 远离菜品
                    opacity = 0.3;
                    scale = 0.8;
                    blur = 1;
                }

                itemsHTML += `
                    <div class="slot-item-flowing" style="
                        position: absolute;
                        top: ${itemPosition}px;
                        left: 0;
                        right: 0;
                        height: ${itemHeight}px;
                        opacity: ${opacity};
                        transform: scale(${scale});
                        filter: blur(${blur}px);
                        transition: all 0.1s ease-out;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">
                        <div class="dish-name-slot">${dish.name}</div>
                    </div>
                `;
            }

            reel.innerHTML = itemsHTML;

            if (!shouldEnd) {
                requestAnimationFrame(animate);
            } else {
                // 滚动自然结束，添加最终选中的特殊效果
                // 根据调试信息，真正在中心的是i=1的元素
                const finalElements = reel.querySelectorAll('.dish-name-slot');
                const centerElement = finalElements[1]; // 直接使用索引1，因为调试显示i=1在中心
                if (centerElement) {
                    centerElement.classList.add('final-selected', 'pulsing-final');

                }

                // 更新文案：从"正在选择"改为"选好了"
                const slotTitle = document.querySelector('.slot-title');
                const slotStatus = document.querySelector('.slot-status');
                if (slotTitle) {
                    slotTitle.textContent = '🎉 选好了！';
                }
                if (slotStatus) {
                    slotStatus.textContent = `今天就做：${finalDish.name}`;
                }

                // 显示完成消息
                setTimeout(() => {
                    this.showMessage(`🎰 推荐完成! 今天就做: ${finalDish.name}`, 'success');
                }, 1000);
            }
        };

        // 开始动画
        animate();
    }

    // 显示最终选中菜品的特殊效果
    showFinalSelection(reel, finalDish, containerHeight, itemHeight, mode, params) {
        const centerPosition = containerHeight / 2;

        // 获取前后菜品（从候选列表中）
        const candidates = this.dishes; // 使用原始菜品列表
        const finalIndex = candidates.findIndex(dish => dish.name === finalDish.name);
        const prevDish = candidates[(finalIndex - 1 + candidates.length) % candidates.length];
        const nextDish = candidates[(finalIndex + 1) % candidates.length];

        // 显示三个菜品：前、中（选中）、后，前后菜品更透明
        reel.innerHTML = `
            <!-- 前一个菜品 - 很透明 -->
            <div class="slot-item-final-context" style="
                position: absolute;
                top: ${centerPosition - itemHeight * 1.5}px;
                left: 0;
                right: 0;
                height: ${itemHeight}px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.15;
                transform: scale(0.8);
                z-index: 5;
            ">
                <div class="dish-name-slot">${prevDish.name}</div>
            </div>
            
            <!-- 当前选中菜品 - 闪烁高亮 -->
            <div class="slot-item-final" style="
                position: absolute;
                top: ${centerPosition - itemHeight / 2}px;
                left: 0;
                right: 0;
                height: ${itemHeight}px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 1;
                transform: scale(1);
                z-index: 20;
            ">
                <div class="dish-name-slot final-selected">${finalDish.name}</div>
            </div>
            
            <!-- 后一个菜品 - 很透明 -->
            <div class="slot-item-final-context" style="
                position: absolute;
                top: ${centerPosition + itemHeight * 0.5}px;
                left: 0;
                right: 0;
                height: ${itemHeight}px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.15;
                transform: scale(0.8);
                z-index: 5;
            ">
                <div class="dish-name-slot">${nextDish.name}</div>
            </div>
        `;

        // 添加闪烁动画类
        const finalElement = reel.querySelector('.final-selected');
        if (finalElement) {
            finalElement.classList.add('pulsing-final');
        }

        // 更新文案：从"正在选择"改为"选好了"
        const slotTitle = document.querySelector('.slot-title');
        const slotStatus = document.querySelector('.slot-status');
        if (slotTitle) {
            slotTitle.textContent = '🎉 选好了！';
        }
        if (slotStatus) {
            slotStatus.textContent = `今天就做：${finalDish.name}`;
        }

        // 只显示消息，不跳转到结果页面
        setTimeout(() => {
            this.showMessage(`🎰 推荐完成! 今天就做: ${finalDish.name}`, 'success');
        }, 1000);
    }

    // 显示最终结果
    displayFinalResult(dish, mode, params = []) {
        const difficultyStars = '★'.repeat(dish.difficulty) + '☆'.repeat(5 - dish.difficulty);

        document.getElementById('result-display').innerHTML = `
            <div class="dish-result final-result">
                <div class="result-header">
                    <div class="winner-badge">🏆 推荐结果</div>
                    <h2 class="dish-name">${dish.name}</h2>
                    <div class="mode-info"># 随机推荐</div>
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

        document.getElementById('result-display').innerHTML = `
            <div class="dish-result">
                <div class="result-header">
                    <h2 class="dish-name">${dish.name}</h2>
                    <div class="mode-info"># 随机推荐</div>
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

        const newDish = { name, ingredients, difficulty, time, marked: false };
        this.dishes.unshift(newDish); // 使用unshift将新菜品添加到数组开头

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
            <div class="dish-item ${dish.marked ? 'marked' : ''}">
                <div class="dish-header">
                    <div class="dish-title-section">
                        <h3>${dish.name}</h3>
                        ${dish.marked ? '<span class="director-badge">🎬</span>' : ''}
                    </div>
                    <div class="dish-actions">
                        <button class="btn btn-small ${dish.marked ? 'btn-marked' : 'btn-outline'}" 
                                onclick="menuGenerator.toggleMark(${index})">
                            ${dish.marked ? '🌟 已标记' : '⭐ 标记'}
                        </button>
                        <button class="btn btn-small btn-danger" onclick="menuGenerator.removeDish(${index})">删除</button>
                    </div>
                </div>
                <div class="dish-details">
                    <p><strong>食材:</strong> ${dish.ingredients.join(', ')}</p>
                    <p><strong>难度:</strong> ${'★'.repeat(dish.difficulty)}${'☆'.repeat(5 - dish.difficulty)} (${dish.difficulty}/5)</p>
                    <p><strong>时间:</strong> ${dish.time} 分钟</p>
                </div>
            </div>
        `).join('');
    }

    // 切换菜品标记状态
    toggleMark(index) {
        const dish = this.dishes[index];

        if (!dish.marked) {
            // 标记新菜品前，先取消其他菜品的标记（导演模式只能标记一个）
            this.dishes.forEach(d => d.marked = false);
            dish.marked = true;
            this.showMessage(`🎬 已标记导演菜品: ${dish.name}`, 'success');
        } else {
            // 取消标记
            dish.marked = false;
            this.showMessage(`取消标记: ${dish.name}`, 'success');
        }

        this.renderDishList();
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