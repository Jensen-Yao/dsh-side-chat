async (page) => {
  const check = (value, message) => { if (!value) throw new Error(message); };
  const side = page.getByRole('region', { name: '侧边聊天', exact: true });
  const mainId = await page.locator('[data-conversation-session]').first().getAttribute('data-conversation-session');
  const sideId = await side.locator('[data-conversation-session]').getAttribute('data-conversation-session');
  check(mainId !== sideId, 'Side chat reused the main session');
  await side.getByRole('button', { name: '重命名聊天', exact: true }).click();
  await side.getByRole('textbox', { name: '聊天名称', exact: true }).fill('侧聊验证 A');
  await side.getByRole('button', { name: '保存名称', exact: true }).click();
  await side.getByText('侧聊验证 A', { exact: true }).waitFor();
  await side.getByRole('button', { name: '新建侧边聊天', exact: true }).click();
  await side.getByRole('heading', { name: '侧边聊天', exact: true }).waitFor();
  const secondId = await side.locator('[data-conversation-session]').getAttribute('data-conversation-session');
  check(secondId !== sideId, 'New chat reused the preceding conversation');
  await side.getByRole('button', { name: '会话历史', exact: true }).click();
  await side.getByRole('textbox', { name: '搜索聊天', exact: true }).fill('侧聊验证 A');
  const row = side.locator('.dsc-history-row').filter({ hasText: '侧聊验证 A' });
  check(await row.count() === 1, 'History search did not select one matching conversation');
  if (await row.getByRole('button', { name: '取消置顶', exact: true }).count()) {
    await row.getByRole('button', { name: '取消置顶', exact: true }).click();
  }
  await row.getByRole('button', { name: '置顶聊天', exact: true }).click();
  await row.getByRole('button', { name: '取消置顶', exact: true }).waitFor();
  await row.locator('.dsc-history-pick').click();
  await side.getByText('SIDE_CHAT_ISOLATION_2026: 侧边聊天独立性验证', { exact: true }).waitFor();
  check(await side.locator('[data-conversation-session]').getAttribute('data-conversation-session') === sideId, 'History opened another session');
  check(await page.locator('[data-conversation-session]').first().getAttribute('data-conversation-session') === mainId, 'Side navigation changed the main selection');
  await page.screenshot({ path: 'output/playwright/side-chat-desktop.png', scale: 'css' });
  return { independentIds: true, rename: true, newConversation: true, historySearch: true, pin: true, restoreTranscript: true, mainSelectionUnchanged: true };
}
