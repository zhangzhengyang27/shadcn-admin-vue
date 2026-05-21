from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # 收集控制台日志
    console_logs = []
    page.on('console', lambda msg: console_logs.append(f'{msg.type}: {msg.text}'))

    # 收集页面错误
    page_errors = []
    page.on('pageerror', lambda err: page_errors.append(str(err)))

    # 访问页面
    print('正在访问 http://localhost:5175/ ...')
    try:
        page.goto('http://localhost:5175/', timeout=10000)
        page.wait_for_load_state('networkidle')
        print('✅ 页面加载完成')

        # 截图
        page.screenshot(path='page_screenshot.png', full_page=True)
        print('📸 截图已保存到 page_screenshot.png')

        # 获取页面内容
        content = page.content()
        print('\n📄 页面内容预览（前2000字符）：')
        print(content[:2000] if len(content) > 2000 else content)

    except Exception as e:
        print(f'❌ 页面访问失败: {e}')

    # 输出控制台日志
    print('\n📋 控制台日志：')
    if console_logs:
        for log in console_logs:
            print(log)
    else:
        print('(无控制台日志)')

    # 输出页面错误
    print('\n❌ 页面错误：')
    if page_errors:
        for error in page_errors:
            print(error)
    else:
        print('(无页面错误)')

    browser.close()
