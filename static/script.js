/* ═══════════════════════════════════════
   AI 营养师 — AI 引擎 & 交互逻辑
   ═══════════════════════════════════════ */

// ─── Meal Database ───
const Meals = {
  'fat-loss': {
    breakfast: [
      { name: '全麦元气早餐', cals: 320, desc: '全麦面包 2片 + 水煮蛋 1个 + 无糖豆浆 200ml + 圣女果 5颗', tags: ['高蛋白', '低脂'] },
      { name: '燕麦果香碗', cals: 290, desc: '燕麦片 35g + 脱脂牛奶 200ml + 蓝莓 50g + 核桃 2颗', tags: ['高纤维', '抗氧化'] },
      { name: '蛋白能量盘', cals: 310, desc: '蛋白 3个 + 全麦卷饼 1张 + 牛油果 30g + 菠菜 50g', tags: ['高蛋白', '低碳水'] },
    ],
    lunch: [
      { name: '轻盈鸡胸沙拉', cals: 420, desc: '香煎鸡胸肉 150g + 混合生菜 200g + 玉米粒 50g + 油醋汁', tags: ['高蛋白', '低卡'] },
      { name: '三文鱼糙米饭', cals: 450, desc: '烤三文鱼 120g + 糙米饭 100g + 西兰花 100g + 柠檬汁', tags: ['Omega-3', '优质碳水'] },
      { name: '豆腐蔬菜锅', cals: 380, desc: '老豆腐 150g + 菌菇 100g + 白菜 150g + 魔芋丝 50g', tags: ['植物蛋白', '低脂'] },
    ],
    dinner: [
      { name: '虾仁蔬菜荟', cals: 350, desc: '白灼虾 100g + 芦笋 100g + 玉米半根 + 紫薯 80g', tags: ['高蛋白', '高纤维'] },
      { name: '番茄菌菇汤', cals: 320, desc: '番茄 200g + 各类菌菇 150g + 嫩豆腐 100g + 青菜 100g', tags: ['低卡', '饱腹'] },
      { name: '鸡丝凉拌菜', cals: 330, desc: '鸡胸肉丝 100g + 黄瓜 100g + 魔芋结 100g + 芝麻酱 10g', tags: ['高蛋白', '清爽'] },
    ],
  },
  'muscle-gain': {
    breakfast: [
      { name: '增肌能量碗', cals: 480, desc: '鸡蛋 2个 + 全麦面包 2片 + 牛奶 250ml + 香蕉 1根 + 花生酱 15g', tags: ['高蛋白', '增肌'] },
      { name: '牛肉燕麦粥', cals: 450, desc: '瘦牛肉末 50g + 燕麦 50g + 鸡蛋 1个 + 葱花 + 坚果 10g', tags: ['高蛋白', '铁质'] },
      { name: '蛋白质奶昔碗', cals: 500, desc: '乳清蛋白粉 30g + 香蕉 1根 + 牛奶 200ml + 燕麦 30g + 奇亚籽 10g', tags: ['快速吸收', '高蛋白'] },
    ],
    lunch: [
      { name: '增肌牛肉饭', cals: 650, desc: '瘦牛肉 150g + 糙米饭 200g + 菠菜 150g + 彩椒 50g', tags: ['高蛋白', '碳水'] },
      { name: '鸡腿藜麦碗', cals: 620, desc: '去皮鸡腿肉 180g + 藜麦饭 150g + 番茄 100g + 西兰花 100g', tags: ['高蛋白', '均衡'] },
      { name: '金枪鱼意面', cals: 680, desc: '全麦意面 150g + 金枪鱼 120g + 蘑菇 100g + 橄榄油 10g', tags: ['高蛋白', '优质碳水'] },
    ],
    dinner: [
      { name: '鲈鱼蛋白餐', cals: 520, desc: '清蒸鲈鱼 200g + 红薯 150g + 秋葵 100g', tags: ['优质蛋白', '易消化'] },
      { name: '虾仁豆腐煲', cals: 490, desc: '虾仁 150g + 豆腐 120g + 鸡蛋 1个 + 香菇 50g + 青菜 100g', tags: ['高蛋白', '钙质'] },
      { name: '牛排蔬菜盘', cals: 550, desc: '煎牛排 150g + 烤土豆 100g + 芦笋 100g + 小番茄', tags: ['高蛋白', '铁质'] },
    ],
  },
  health: {
    breakfast: [
      { name: '均衡早餐盘', cals: 380, desc: '全麦面包 1片 + 鸡蛋 1个 + 牛奶 200ml + 苹果 1个 + 坚果 15g', tags: ['均衡', '全营养'] },
      { name: '养生红枣粥', cals: 350, desc: '小米粥 300ml + 红枣 5颗 + 蒸蛋 1个 + 凉拌木耳 50g', tags: ['养胃', '补气'] },
      { name: '紫薯酸奶碗', cals: 360, desc: '紫薯 100g + 无糖酸奶 150g + 麦片 20g + 猕猴桃 1个', tags: ['抗氧化', '益生菌'] },
    ],
    lunch: [
      { name: '健康便当盒', cals: 520, desc: '煎鸡胸 120g + 杂粮饭 120g + 胡萝卜丝 50g + 黄瓜 50g + 蛋皮', tags: ['均衡', '多彩'] },
      { name: '清蒸鱼套餐', cals: 500, desc: '清蒸鲈鱼 150g + 糙米饭 100g + 清炒时蔬 150g', tags: ['清淡', '优质蛋白'] },
      { name: '番茄牛肉面', cals: 540, desc: '全麦面条 120g + 瘦牛肉 80g + 番茄 200g + 青菜 100g', tags: ['补铁', '暖胃'] },
    ],
    dinner: [
      { name: '轻食晚餐', cals: 400, desc: '烤鸡胸 100g + 南瓜 100g + 沙拉 150g + 油醋汁', tags: ['清淡', '高纤维'] },
      { name: '菌菇豆腐汤', cals: 380, desc: '各类菌菇 150g + 豆腐 100g + 海带 50g + 鸡蛋 1个', tags: ['鲜香', '低脂'] },
      { name: '彩虹蔬菜碗', cals: 390, desc: '烤蔬菜 200g + 鹰嘴豆 50g + 藜麦 80g + 柠檬汁', tags: ['素食', '高纤维'] },
    ],
  },
  shaping: {
    breakfast: [
      { name: '纤体早餐', cals: 340, desc: '全麦吐司 1片 + 水煮蛋 1个 + 希腊酸奶 100g + 西柚 半个', tags: ['低卡', '高蛋白'] },
      { name: '奇亚籽布丁', cals: 310, desc: '奇亚籽 20g + 杏仁奶 200ml + 蜂蜜 5g + 树莓 50g + 椰子片', tags: ['高纤维', '抗氧化'] },
      { name: '蔬菜蛋饼', cals: 330, desc: '鸡蛋 2个 + 菠菜 50g + 蘑菇 30g + 全麦薄饼 1张', tags: ['高蛋白', '低碳水'] },
    ],
    lunch: [
      { name: '塑形鸡胸沙拉', cals: 440, desc: '鸡胸肉 130g + 混合生菜 150g + 牛油果 半颗 + 玉米粒 30g + 油醋汁', tags: ['优质脂肪', '蛋白'] },
      { name: '三文鱼牛油果碗', cals: 480, desc: '三文鱼 120g + 糙米 100g + 牛油果 半颗 + 毛豆 30g + 海苔', tags: ['Omega-3', '好脂肪'] },
      { name: '豆腐拌饭', cals: 410, desc: '嫩豆腐 150g + 紫米饭 100g + 海苔碎 + 黄瓜 50g + 芝麻', tags: ['植物蛋白', '清爽'] },
    ],
    dinner: [
      { name: '塑形晚餐', cals: 360, desc: '虾仁 100g + 西葫芦 100g + 番茄 100g + 魔芋面 150g', tags: ['低卡', '高蛋白'] },
      { name: '蒸菜拼盘', cals: 340, desc: '蒸鱼 100g + 蒸南瓜 80g + 蒸西兰花 100g + 蘸料', tags: ['清淡', '保留营养'] },
      { name: '蔬菜鸡肉汤', cals: 350, desc: '鸡胸肉 80g + 番茄 150g + 芹菜 50g + 卷心菜 100g + 香料', tags: ['排毒', '低脂'] },
    ],
  },
};

// ─── Skincare Advice Database ───
const SkincareAdvice = {
  dry: {
    general: [
      '建议补充 Omega-3 的食物，如三文鱼、亚麻籽、核桃，帮助锁住皮肤水分',
      '多吃维生素 E 丰富的食物，如牛油果、杏仁、葵花籽，保护皮肤屏障',
      '每天保证 2000ml+ 饮水，少量多次饮用',
      '适量摄入优质脂肪，如橄榄油、鱼油，让皮肤重现光泽',
      '补充维生素 C 促进胶原蛋白合成，推荐奇异果、橙子、彩椒',
    ],
    menstrual: ['经期注意补铁补血，推荐红枣桂圆茶', '避免咖啡因过量，加重皮肤干燥', '多吃猪肝、菠菜等富含铁质的食物'],
    follicular: ['卵泡期皮肤吸收力好，此时补充胶原蛋白效果加倍', '多吃豆制品，天然植物雌激素有助于皮肤弹性'],
    ovulation: ['排卵期激素波动，注意补充维生素B族稳定情绪', '多吃深绿色蔬菜和全谷物'],
    luteal: ['黄体期容易皮肤暗沉，多补充维生素 C 和抗氧化食物', '减少盐分摄入，预防水肿'],
  },
  oily: {
    general: [
      '多吃含锌食物，如南瓜籽、牡蛎、瘦肉，帮助调节油脂分泌',
      '维生素 B 族有助于控制皮脂分泌，推荐全谷物、鸡蛋、绿叶蔬菜',
      '少吃高糖食物和精制碳水，减少 IG 因子对皮脂的刺激',
      '增加膳食纤维摄入，帮助肠道排毒，改善皮肤状态',
      '适量补充益生菌，如无糖酸奶、泡菜，调节肠道菌群平衡',
    ],
    menstrual: ['经期前容易爆痘，提前减少奶制品摄入', '多吃抗炎食物，如姜黄、绿茶、深色浆果'],
    follicular: ['卵泡期皮肤状态最佳，适合尝试新的护肤产品', '多吃富含维生素A的食物，如胡萝卜、南瓜'],
    ovulation: ['排卵期激素水平高峰，注意清淡饮食', '增加黄瓜、冬瓜等利水食物，预防浮肿'],
    luteal: ['黄体期是控油关键期，补充维生素 B6 调节激素', '多吃豆制品，平衡雌激素水平'],
  },
  combination: {
    general: [
      '均衡摄入各类营养素，保持皮肤水油平衡',
      '维生素C 是万能钥匙，每天保证足量摄入',
      '多吃彩色蔬果，获取不同种类的抗氧化剂',
      '优质蛋白是皮肤的基础，每餐都要有',
      '规律作息比任何护肤品都重要，争取 23:00 前入睡',
    ],
    menstrual: ['经期注意保暖，多吃温热食物', '补充铁质和维生素 B12，预防贫血引起的脸色苍白'],
    follicular: ['卵泡期新陈代谢旺盛，适合轻断食排毒', '多吃发芽类食物如豆芽、苗菜，富含活性酶'],
    ovulation: ['排卵期关注肠道健康，多吃发酵食品', '补充益生元养好肠道菌群'],
    luteal: ['黄体期容易情绪波动，多吃香蕉、黑巧克力稳定情绪', '镁元素有助于缓解经前综合征，推荐坚果和深绿色蔬菜'],
  },
  sensitive: {
    general: [
      '选择抗炎食物为主，如姜黄、生姜、绿茶、蓝莓',
      '补充槲皮素（天然抗组胺剂），洋葱、苹果、西兰花中含量丰富',
      '避免辛辣刺激食物和酒精，减少皮肤敏感反应',
      'Omega-3 有助于降低皮肤炎症反应，建议每天补充',
      '骨汤富含胶原蛋白和氨基酸，有助于修复肠道屏障',
    ],
    menstrual: ['经期皮肤更加敏感，避免尝试新食物', '米汤、燕麦水等温和食物可以舒缓肠胃'],
    follicular: ['卵泡期是修复黄金期，多吃胶原蛋白丰富的食物', '银耳、桃胶等植物性胶质也很适合'],
    ovulation: ['排卵期保持饮食清淡简单', '记录饮食日记，观察哪些食物容易引发敏感'],
    luteal: ['黄体期注意缓解压力，冥想或瑜伽有助降低皮质醇', '补充维生素 C 和 bioflavonoids 增强毛细血管弹性'],
  },
};

const Encouragements = {
  'fat-loss': [
    '每一次对美食的理智选择，都在悄悄塑造你想要的线条。减脂不是受苦，而是学会与身体温柔相处。你的坚持，终将花开。',
    '不要小看今天少吃的每一口零食，那都是你向目标迈出的一步。真正的改变发生在日复一日的微小选择中，你已经做得很棒了！',
    '减脂的路上不必追求完美，重要的是你始终没有放弃自己。欣赏镜子里的自己，她正在一天天变得更好。✨',
    '体重的数字只是表面的风景，真正的收获是越来越轻盈的身体和越来越自信的笑容。你比自己想象中更强大！',
    '健康减脂的核心，是学会倾听身体真实的需求。饿了就吃，饱了就停，与食物和解，与身体对话。',
  ],
  'muscle-gain': [
    '每一克肌肉的增长，都是你汗水的勋章。增肌是一场与时间的温柔较量，耐心和坚持是最好的伙伴，你的努力每一餐都在被记录！💪',
    '吃进去的每一口优质蛋白质，都在为你的力量添砖加瓦。不要着急看到变化，你的身体正在悄悄变得更强大。',
    '力量训练后的那一餐，是你送给肌肉最好的礼物。好好吃饭，好好休息，成长就在这日复一日的坚持中。',
    '增肌不是变成另一个人，而是成为更强的自己。享受力量提升的快乐，那是身体给你最真实的回应！',
    '你的身体值得最好的燃料，每一顿精心准备的健康餐，都是对自己的投资。耐心一点，时间会给你答案。',
  ],
  health: [
    '拥有健康，你就拥有了最奢侈的财富。每一口干净的食物，每一次早睡早起，都是对未来的自己最深情的告白。',
    '健康不是目标，而是一种生活方式。不必追求极端，在平衡中找到属于自己的节奏，就是最好的养生。',
    '真正的高级养生，是吃得好、睡得香、心情舒畅。你已经走在了正确的路上，继续保持这份对生活的热爱吧。',
    '善待身体，身体也会善待你。每一个微小的健康习惯，都在为未来的你储蓄能量。',
    '健康的意义不是为了活得更久，而是为了每一天都活得更有质量。享用你的健康餐，感受身体愉悦的回馈吧！',
  ],
  shaping: [
    '塑形是一场关于美的修行，不是为了取悦任何人，而是为了遇见那个更自信、更从容的自己。你值得所有的美好。',
    '好身材是健康生活的副产品，而不是目标本身。专注于每一个健康的选择，好身材自然会来。🌟',
    '塑造身材的过程，也是在塑造意志力。每天进步一点点，你会惊讶于自己的蜕变。',
    '不必和别人比较，你的身体独一无二。听从它的声音，给它需要的营养和运动，它就会展现出最美的状态。',
    '优雅的身材线条来自于坚持和自律，但别忘了偶尔也要犒劳自己。平衡的生活才能带来持久的美好。',
  ],
};

// ═══════════════════════════════════════
// DOM References
// ═══════════════════════════════════════

const $ = (id) => document.getElementById(id);
const ageSlider = $('age');
const heightSlider = $('height');
const weightSlider = $('weight');
const ageDisp = $('ageDisplay');
const heightDisp = $('heightDisplay');
const weightDisp = $('weightDisplay');
const generateBtn = $('generateBtn');
const loading = $('loading');
const results = $('results');

// ─── Slider Sync ───
ageSlider.addEventListener('input', () => { ageDisp.textContent = ageSlider.value; });
heightSlider.addEventListener('input', () => {
  heightDisp.innerHTML =
    heightSlider.value +
    ' <span style="font-size:14px;background:none;-webkit-text-fill-color:var(--text-light)">cm</span>';
});
weightSlider.addEventListener('input', () => {
  weightDisp.innerHTML =
    weightSlider.value +
    ' <span style="font-size:14px;background:none;-webkit-text-fill-color:var(--text-light)">kg</span>';
});

// ─── Helpers ───
function getSelectedGoal() {
  const el = document.querySelector('input[name="goal"]:checked');
  return el ? el.value : 'health';
}

function getGoalLabel() {
  const map = { 'fat-loss': '减脂', 'muscle-gain': '增肌', health: '保持健康', shaping: '塑形' };
  return map[getSelectedGoal()] || '保持健康';
}

function getCycleLabel() {
  const el = $('cycle');
  const map = { menstrual: '经期', follicular: '卵泡期', ovulation: '排卵期', luteal: '黄体期' };
  return map[el.value] || '';
}

function getSkinLabel() {
  const el = $('skinType');
  const map = { dry: '干性皮肤', oily: '油性皮肤', combination: '混合性皮肤', sensitive: '敏感性皮肤' };
  return map[el.value] || '';
}

// ═══════════════════════════════════════
// AI Engine
// ═══════════════════════════════════════

function AIAnalyze(age, height, weight, goal, cycle, skin) {
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  const tdee = Math.round(bmr * 1.45);

  const goalDeficit = { 'fat-loss': -350, 'muscle-gain': 300, health: 0, shaping: -150 };
  const calories = Math.round(tdee + (goalDeficit[goal] || 0));

  const baseWater = weight * 35;
  const goalWater = { 'fat-loss': 1.1, 'muscle-gain': 1.15, health: 1.0, shaping: 1.05 };
  const water = Math.round(baseWater * (goalWater[goal] || 1));

  const bmi = weight / ((height / 100) ** 2);
  let score = 85;
  if (bmi >= 18.5 && bmi <= 24) score += 8;
  else if (bmi >= 17 && bmi < 18.5) score += 4;
  else if (bmi > 24 && bmi <= 27) score += 3;
  if (age >= 18 && age <= 35) score += 4;
  else if (age > 35 && age <= 50) score += 2;
  else score += 1;
  if (
    (goal === 'fat-loss' && bmi > 22) ||
    (goal === 'muscle-gain' && bmi < 21) ||
    (goal === 'health' && bmi >= 18.5 && bmi <= 24)
  ) {
    score += 5;
  } else if (goal === 'shaping' && bmi >= 19 && bmi <= 23) {
    score += 5;
  } else {
    score += 2;
  }
  score = Math.min(100, Math.max(70, score));

  const goalMeals = Meals[goal] || Meals.health;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const breakfast = pick(goalMeals.breakfast);
  const lunch = pick(goalMeals.lunch);
  const dinner = pick(goalMeals.dinner);

  const skinAdvice = SkincareAdvice[skin] || SkincareAdvice.combination;
  const cycleAdvice = skinAdvice[cycle] || [];
  const generalAdvice = (skinAdvice.general || []).slice(0, 4);
  const skincareTips = [...cycleAdvice, ...generalAdvice];

  const encList = Encouragements[goal] || Encouragements.health;
  const encouragement = pick(encList);

  let label = '💪 还不错！让 AI 帮你优化饮食方案吧';
  if (score >= 90) label = '🌟 太棒了！你的身体状态非常理想';
  else if (score >= 80) label = '✨ 很优秀！继续保持健康的生活方式';

  return { bmr, calories, water, score, label, breakfast, lunch, dinner, skincareTips, encouragement };
}

// ═══════════════════════════════════════
// Generate Plan
// ═══════════════════════════════════════

generateBtn.addEventListener('click', generatePlan);

function generatePlan() {
  const age = parseInt(ageSlider.value);
  const height = parseInt(heightSlider.value);
  const weight = parseFloat(weightSlider.value);
  const goal = getSelectedGoal();
  const cycle = $('cycle').value;
  const skin = $('skinType').value;

  generateBtn.disabled = true;
  generateBtn.textContent = '✨ 生成中...';
  loading.classList.add('show');
  results.classList.remove('show');

  setTimeout(() => {
    const plan = AIAnalyze(age, height, weight, goal, cycle, skin);
    renderResults(plan);
    loading.classList.remove('show');
    results.classList.add('show');
    generateBtn.disabled = false;
    generateBtn.textContent = '✨ 生成我的专属方案';
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });

    requestAnimationFrame(() => {
      $('scoreCircle').style.strokeDashoffset = 377 * (1 - plan.score / 100);
      $('waterFill').style.width = Math.min(100, (plan.water / 2500) * 100) + '%';
    });
    animateNumber('scoreNum', 0, plan.score, 1200);
  }, 1800);
}

function renderResults(plan) {
  $('scoreLabel').textContent = plan.label;
  $('calories').textContent = plan.calories;
  $('bmrDisplay').innerHTML = plan.bmr + ' <span class="unit">kcal</span>';
  $('waterAmount').textContent = plan.water;

  renderMeal('breakfastMeal', plan.breakfast);
  renderMeal('lunchMeal', plan.lunch);
  renderMeal('dinnerMeal', plan.dinner);

  const list = $('skincareList');
  list.innerHTML = '';
  plan.skincareTips.forEach((tip) => {
    const li = document.createElement('li');
    li.textContent = tip;
    list.appendChild(li);
  });

  $('encourageText').textContent = plan.encouragement;
}

function renderMeal(id, meal) {
  const el = document.getElementById(id);
  if (!el || !meal) return;
  el.querySelector('.mi-name').textContent = meal.name;
  el.querySelector('.mi-cals').textContent = meal.cals + ' kcal';
  el.querySelector('.mi-desc').textContent = meal.desc;
  const tags = el.querySelector('.mi-tags');
  tags.innerHTML = '';
  meal.tags.forEach((t) => {
    const span = document.createElement('span');
    span.className = 'mi-tag';
    span.textContent = t;
    tags.appendChild(span);
  });
}

function animateNumber(elId, from, to, duration) {
  const el = document.getElementById(elId);
  const start = performance.now();
  function step(now) {
    const p = Math.min(1, (now - start) / duration);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ═══════════════════════════════════════
// Chat — 与 DeepSeek 对话
// ═══════════════════════════════════════

const chatFab = $('chatFab');
const chatPanel = $('chatPanel');
const chatOverlay = $('chatOverlay');
const chatMessages = $('chatMessages');
const chatInput = $('chatInput');
const chatSend = $('chatSend');
const chatClose = $('chatClose');
const chatSuggestions = $('chatSuggestions');

let chatOpen = false;
let isSending = false;
let messageHistory = [];

// ─── Welcome message ───
function addWelcomeMessage() {
  messageHistory = [];
  chatMessages.innerHTML = '';
  appendMessage(
    'ai',
    '嗨～我是小膳，你的专属 AI 营养师 (◕‿◕✿)\n\n我可以回答你关于健康饮食、营养搭配、美容养肤的问题，也可以根据你的身体情况给建议哦～\n\n想问什么都可以告诉我 💕'
  );
}
addWelcomeMessage();

// ─── Toggle ───
function toggleChat(open) {
  chatOpen = open !== undefined ? open : !chatOpen;
  chatFab.classList.toggle('active', chatOpen);
  chatPanel.classList.toggle('show', chatOpen);
  chatOverlay.classList.toggle('show', chatOpen);
  if (chatOpen) {
    chatInput.focus();
    chatFab.classList.add('hide-badge');
    scrollChat();
  }
}

chatFab.addEventListener('click', () => toggleChat(true));
chatOverlay.addEventListener('click', () => toggleChat(false));
chatClose.addEventListener('click', () => toggleChat(false));

// ─── Send ───
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text || isSending) return;

  chatInput.value = '';
  isSending = true;
  chatSend.disabled = true;

  appendMessage('user', text);
  messageHistory.push({ role: 'user', content: text });

  chatSuggestions.style.display = 'none';
  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messageHistory.slice(-16),
        userInfo: {
          年龄: ageSlider.value + ' 岁',
          身高: heightSlider.value + ' cm',
          体重: weightSlider.value + ' kg',
          健身目标: getGoalLabel(),
          生理期阶段: getCycleLabel(),
          皮肤类型: getSkinLabel(),
        },
      }),
    });

    hideTyping();
    const data = await res.json();

    if (data.reply) {
      appendMessage('ai', data.reply);
      messageHistory.push({ role: 'assistant', content: data.reply });
    } else {
      appendMessage('ai', data.error || '唔…小膳暂时没想好怎么回答，换个问题试试？🌸');
    }
  } catch {
    hideTyping();
    appendMessage('ai', '网络好像开小差了，稍后再问我吧～💕');
  }

  isSending = false;
  chatSend.disabled = false;
  chatInput.focus();
}

// ─── Append Message ───
function appendMessage(type, text) {
  const div = document.createElement('div');
  div.className = `message ${type}`;

  if (type === 'ai') {
    div.innerHTML = `
      <div class="msg-avatar">🌸</div>
      <div class="msg-bubble">${formatMsg(text)}</div>`;
  } else {
    div.innerHTML = `
      <div class="msg-avatar">💕</div>
      <div class="msg-bubble">${escapeHtml(text)}</div>`;
  }

  chatMessages.appendChild(div);
  scrollChat();
}

// ─── Typing ───
function showTyping() {
  const div = document.createElement('div');
  div.className = 'message ai';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar">🌸</div>
    <div class="msg-bubble typing"><span class="dot-group"><span></span><span></span><span></span></span></div>`;
  chatMessages.appendChild(div);
  scrollChat();
}

function hideTyping() {
  const el = $('typingIndicator');
  if (el) el.remove();
}

// ─── Suggestion chips ───
document.querySelectorAll('.suggestion-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    chatInput.value = chip.textContent;
    sendMessage();
  });
});

// ─── Helpers ───
function scrollChat() {
  requestAnimationFrame(() => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function formatMsg(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/\n/g, '<br>');
  return html;
}
