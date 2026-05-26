import os
import logging
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from openai import OpenAI

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# ── DeepSeek client ──
DEEPSEEK_API_KEY = os.environ.get('DEEPSEEK_API_KEY')
client = None
if DEEPSEEK_API_KEY:
    client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url='https://api.deepseek.com')
    logger.info('DeepSeek client ready')
else:
    logger.warning('DEEPSEEK_API_KEY not set — chat unavailable')

SYSTEM_PROMPT = """你是「小膳」，一个温柔专业的AI女性营养师。你是用户专属的健康美丽顾问，以温暖亲切的语气与用户交流，像闺蜜一样贴心。

【你的能力】
1. 提供个性化的饮食和营养建议
2. 根据用户的身体数据、健身目标和生理期阶段给出专业饮食指导
3. 推荐适合的食谱和食材搭配
4. 解答美容养肤相关的饮食问题（如皮肤干燥、痘痘、暗沉等）
5. 给予温暖的鼓励和支持，帮助用户坚持健康生活方式
6. 推荐适合的运动方式和作息建议

【回答要求】
1. 语气温柔亲切，用中文回答
2. 适当使用颜文字和温馨表情，如 (◕‿◕✿)、💕、✨、🌸
3. 专业建议 + 情感支持并重，让用户感受到被关心
4. 每条回复控制在200字以内，简洁温暖
5. 多鼓励用户，不制造身材焦虑
6. 尊重身体多样性，不推崇极端审美
7. 根据用户的生理期和皮肤状态给出针对性建议

【重要原则】
1. 不做医学诊断，不替代医生建议
2. 不推荐极端节食或过度运动
3. 宣扬均衡营养、快乐健康的饮食理念
4. 如果用户提到严重身体症状，温柔建议就医
5. 不讨论与健康无关的话题，婉拒后友好引导回健康话题"""


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    if not client:
        return jsonify({'error': 'DeepSeek API 未配置。请设置 DEEPSEEK_API_KEY 环境变量后再试～'}), 503

    try:
        data = request.get_json()
        messages = data.get('messages', [])
        user_info = data.get('userInfo', {})

        # Build system message with user context
        system_content = SYSTEM_PROMPT
        if user_info and any(v for v in user_info.values() if v):
            info_lines = [f"{k}：{v}" for k, v in user_info.items() if v]
            if info_lines:
                system_content += '\n\n【用户当前信息】\n' + '\n'.join(info_lines)

        resp = client.chat.completions.create(
            model='deepseek-chat',
            messages=[{'role': 'system', 'content': system_content}] + messages,
            temperature=0.7,
            max_tokens=1000,
            stream=False,
        )
        reply = resp.choices[0].message.content
        return jsonify({'reply': reply})

    except Exception as e:
        logger.error(f'Chat error: {e}')
        return jsonify({'error': '小膳暂时有点忙，请稍后再来问我吧～💕'}), 500


@app.route('/api/health')
def health():
    return jsonify({'status': 'ok', 'deepseek_ready': client is not None})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', port=port, debug=debug, use_reloader=False)
