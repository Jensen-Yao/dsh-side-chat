// Deterministic integration provider for the isolated smoke profile only; never shipped or installed in user profiles.
import { LlmAdapter } from '@deepseek-ai/dsh-llm';
import { setTimeout } from 'node:timers/promises';

class FixtureAdapter extends LlmAdapter {
  providerInfo(provider) { return { id: provider, name: 'Side Chat Test' }; }
  async listModels(provider) { return [{ provider, id: 'fixture', name: '本地演示模型', inputModalities: ['text'] }]; }
  async *stream(options) {
    const inputs = options.messages.filter((message) => message.role === 'user');
    const text = JSON.stringify(inputs.map((message) => message.content));
    let answer = `侧边会话已收到 ${text.includes('STOP_TEST') ? 'STOP_TEST' : 'SIDE_CHAT_ISOLATION_2026'}。\n\n这是隔离测试模型的流式回复。主聊天保持独立。`;
    if (text.includes('发布清单')) answer = '## 发布前，再检查这四件事\n\n1. **功能**：独立会话、多标签和历史恢复。\n2. **安全**：主聊天草稿不变，权限沿用原生控件。\n3. **交付**：构建产物、版本标签和安装说明齐全。\n4. **文档**：截图只用演示数据，说明已验证的范围。\n\n可以先完成 README，再打包发布。';
    if (text.includes('README')) answer = '可以把开头收成一句：\n\n> 在主对话旁边，留一个独立思考的空间。\n\n再补一句具体说明：\n\n**DSH Side Chat** 为 DeepSeek Harness 右侧栏加入原生聊天。保留主线，随时追问、整理灵感，或从主对话分支继续。\n\n短一点，也更清楚。';
    if (options.purpose === 'session-title') answer = '侧边聊天验证';
    yield { type: 'block-start', index: 0, blockType: 'text' };
    for (const part of answer.match(/.{1,6}|\n/g) ?? []) {
      await setTimeout(text?.includes('STOP_TEST') ? 700 : 30, undefined, { signal: options.signal });
      yield { type: 'text-delta', index: 0, text: part };
    }
    yield { type: 'block-end', index: 0, block: { type: 'text', text: answer } };
    yield { type: 'finish', reason: 'stop' };
  }
}
export const inject = ['llm'];
export function apply(ctx) {
  ctx.effect(() => ctx.llm.registerAdapter(['side-chat-fixture'], new FixtureAdapter()));
}
