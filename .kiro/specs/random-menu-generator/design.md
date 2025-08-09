# 设计文档

## 概述

随机菜单生成器是一个简单的单页面Web应用，使用纯HTML、CSS和JavaScript实现。应用采用客户端存储，无需服务器，可以直接在浏览器中运行，提供直观的图形界面进行菜单管理和推荐。

## 架构

### 整体架构

```
menu-generator/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── app.js             # 主应用逻辑
│   ├── storage.js         # 本地存储管理
│   └── recommender.js     # 推荐引擎
├── data/
│   └── default-menu.json  # 默认菜单数据
└── README.md
```

### 技术栈

- **HTML5**: 页面结构和语义化标记
- **CSS3**: 样式设计和响应式布局
- **Vanilla JavaScript**: 应用逻辑和交互
- **localStorage**: 客户端数据持久化
- **JSON**: 数据存储格式

## 组件和接口

### 1. 数据模型 (app.js)

```javascript
class Dish {
    constructor(name, ingredients, difficulty, timeMinutes, tags = []) {
        this.id = Date.now().toString();
        this.name = name;
        this.ingredients = ingredients; // Array of strings
        this.difficulty = difficulty;   // 1-5级难度
        this.timeMinutes = timeMinutes;
        this.tags = tags;
        this.createdAt = new Date().toISOString();
    }
    
    matchesIngredients(required = [], excluded = []) {
        // 检查是否包含必需食材且不包含排除食材
    }
    
    toJSON() {
        return { ...this };
    }
    
    static fromJSON(data) {
        return Object.assign(new Dish(), data);
    }
}
```

### 2. 存储管理 (storage.js)

```javascript
class MenuStorage {
    constructor() {
        this.storageKey = 'menu-generator-dishes';
    }
    
    loadMenu() {
        // 从localStorage加载菜单数据
    }
    
    saveMenu(dishes) {
        // 保存菜单数据到localStorage
    }
    
    exportMenu() {
        // 导出菜单为JSON文件
    }
    
    importMenu(jsonData) {
        // 从JSON数据导入菜单
    }
    
    clearMenu() {
        // 清空所有菜单数据
    }
}
```

### 3. 推荐引擎 (recommender.js)

```javascript
class MenuRecommender {
    constructor(dishes) {
        this.dishes = dishes;
    }
    
    randomRecommend() {
        // 完全随机推荐一个菜品
    }
    
    recommendByIngredients(required = [], excluded = []) {
        // 基于食材推荐菜品
    }
    
    chooseFromOptions(dishNames) {
        // 从指定菜品中随机选择
    }
    
    filterByDifficulty(maxDifficulty) {
        // 按难度过滤菜品
    }
    
    filterByTime(maxTime) {
        // 按用时过滤菜品
    }
}
```

### 4. 用户界面 (index.html + app.js)

```javascript
class MenuApp {
    constructor() {
        this.storage = new MenuStorage();
        this.dishes = this.storage.loadMenu();
        this.recommender = new MenuRecommender(this.dishes);
        this.initializeUI();
    }
    
    initializeUI() {
        // 初始化界面事件监听器
    }
    
    addDish(dishData) {
        // 添加新菜品
    }
    
    removeDish(dishId) {
        // 删除菜品
    }
    
    updateDishList() {
        // 更新菜品列表显示
    }
    
    showRecommendation(dish) {
        // 显示推荐结果
    }
    
    handleRecommendRequest() {
        // 处理推荐请求
    }
}
```

## 数据模型

### 菜品数据结构

```json
{
  "dishes": [
    {
      "id": "1704067200000",
      "name": "宫保鸡丁",
      "ingredients": ["鸡胸肉", "花生米", "干辣椒", "花椒"],
      "difficulty": 3,
      "timeMinutes": 30,
      "tags": ["川菜", "下饭"],
      "createdAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### localStorage存储结构

```javascript
// localStorage key: 'menu-generator-dishes'
{
  "dishes": [...],
  "settings": {
    "defaultDifficulty": 3,
    "maxRecommendations": 5,
    "theme": "light"
  },
  "version": "1.0",
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

## 错误处理

### 错误类型定义

```javascript
class MenuGeneratorError extends Error {
    constructor(message, type = 'GENERAL') {
        super(message);
        this.name = 'MenuGeneratorError';
        this.type = type;
    }
}

// 错误类型常量
const ERROR_TYPES = {
    DISH_NOT_FOUND: 'DISH_NOT_FOUND',
    INVALID_DATA: 'INVALID_DATA',
    STORAGE_ERROR: 'STORAGE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR'
};
```

### 错误处理策略

1. **存储操作错误**: 使用try-catch包装localStorage操作，提供友好的错误提示
2. **数据验证错误**: 在表单提交前进行客户端验证，显示具体的错误信息
3. **用户输入错误**: 实时验证用户输入，提供即时反馈
4. **浏览器兼容性**: 检测localStorage支持，提供降级方案

## 测试策略

### 手动测试

- **功能测试**: 验证所有菜单管理和推荐功能
- **界面测试**: 测试用户界面的交互和响应
- **数据持久化测试**: 验证localStorage的保存和加载
- **浏览器兼容性测试**: 在不同浏览器中测试功能

### 用户体验测试

- **操作流程**: 测试完整的用户操作流程
- **错误处理**: 验证错误情况下的用户体验
- **响应式设计**: 测试在不同设备上的显示效果

### 测试数据

```javascript
const SAMPLE_DISHES = [
    {
        id: "1",
        name: "番茄鸡蛋",
        ingredients: ["番茄", "鸡蛋", "葱"],
        difficulty: 1,
        timeMinutes: 15,
        tags: ["家常菜", "简单"],
        createdAt: "2024-01-01T12:00:00.000Z"
    },
    {
        id: "2", 
        name: "红烧肉",
        ingredients: ["五花肉", "生抽", "老抽", "冰糖"],
        difficulty: 4,
        timeMinutes: 90,
        tags: ["荤菜", "费时"],
        createdAt: "2024-01-01T12:30:00.000Z"
    }
];
```

## 用户体验设计

### 界面设计原则

1. **简洁性**: 界面简洁明了，突出核心功能
2. **直观性**: 使用图标和颜色提升可读性
3. **响应式**: 适配桌面和移动设备
4. **可访问性**: 支持键盘导航和屏幕阅读器

### 界面布局设计

```
┌─────────────────────────────────────┐
│           随机菜单生成器              │
├─────────────────────────────────────┤
│  [随机推荐] [食材推荐] [菜品选择]     │
├─────────────────────────────────────┤
│                                     │
│         推荐结果显示区域              │
│    🍽️ 宫保鸡丁                      │
│    📋 鸡胸肉, 花生米, 干辣椒, 花椒    │
│    ⭐ ★★★☆☆ (3/5)                   │
│    ⏱️ 30分钟                        │
│                                     │
├─────────────────────────────────────┤
│  [添加菜品] [管理菜单] [导入/导出]    │
└─────────────────────────────────────┘
```

### 交互设计

- **推荐按钮**: 大按钮设计，一键获取推荐
- **筛选条件**: 可折叠的高级选项面板
- **菜品卡片**: 卡片式设计展示菜品信息
- **操作反馈**: 动画效果和状态提示

### 主题和样式

- **配色方案**: 温暖的橙色主题，符合美食氛围
- **字体选择**: 易读的无衬线字体
- **图标系统**: 统一的图标风格
- **动画效果**: 平滑的过渡动画

## 性能考虑

### 客户端性能优化

- **数据缓存**: 在内存中缓存菜单数据，避免频繁读取localStorage
- **DOM操作优化**: 使用文档片段批量更新DOM
- **事件委托**: 使用事件委托减少事件监听器数量
- **防抖处理**: 对搜索和筛选操作进行防抖处理

### 存储优化

- **数据压缩**: 对大量数据进行JSON压缩存储
- **增量更新**: 只更新变更的数据项
- **存储限制**: 监控localStorage使用量，提供清理选项

## 扩展性设计

### 功能扩展

- **菜谱详情**: 支持添加详细的制作步骤
- **营养信息**: 添加卡路里和营养成分信息
- **图片支持**: 支持为菜品添加图片
- **评分系统**: 支持对菜品进行评分和收藏

### 数据扩展

- **导入导出**: 支持多种格式的数据导入导出
- **云同步**: 未来可扩展支持云端数据同步
- **分享功能**: 支持菜单分享和社区功能

### 技术扩展

```javascript
// 未来可扩展的模块化架构
class MenuGeneratorCore {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
    }
    
    registerPlugin(name, plugin) {
        this.plugins.set(name, plugin);
    }
    
    executeHook(hookName, data) {
        // 执行注册的钩子函数
    }
}
```