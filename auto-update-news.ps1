# auto-update-news.ps1
# IT宝网 AI新闻自动更新脚本
# 每天早上8点由Windows任务计划程序触发

$ErrorActionPreference = "Stop"
$env:PYTHONIOENCODING = 'utf-8'

$SITE_DIR = "C:\Users\bogao\Desktop\itboaowang"
$INDEX_FILE = "$SITE_DIR\index.html"
$WEBSEARCH = "$env:USERPROFILE\.agents\skills\autoglm-websearch\websearch.py"
$LOG_FILE = "$SITE_DIR\update-log.txt"

function Write-Log($msg) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $msg" | Out-File $LOG_FILE -Append -Encoding UTF8
}

try {
    Write-Log "===== 开始每日AI新闻更新 ====="

    $queries = @(
        "2026年AI人工智能最新新闻热点",
        "人工智能大模型最新动态2026",
        "AI芯片机器人智能体新闻2026"
    )

    $allResults = @()

    foreach ($q in $queries) {
        Write-Log "搜索: $q"
        $result = python $WEBSEARCH $q 2>&1
        $json = $result | Out-String
        $data = $json | ConvertFrom-Json

        if ($data.code -eq 0 -and $data.data.results) {
            foreach ($r in $data.data.results) {
                if ($r.webPages -and $r.webPages.value) {
                    foreach ($page in $r.webPages.value) {
                        $allResults += @{
                            name    = $page.name
                            url     = $page.url
                            snippet = $page.snippet
                        }
                    }
                }
            }
        }
        Start-Sleep -Seconds 2
    }

    Write-Log "共获取 $($allResults.Count) 条结果"

    # 去重
    $seen = @{}
    $uniqueResults = @()
    foreach ($item in $allResults) {
        if (-not $seen.ContainsKey($item.url)) {
            $seen[$item.url] = $true
            $uniqueResults += $item
        }
    }

    $topNews = $uniqueResults | Select-Object -First 20
    Write-Log "去重后取前 $($topNews.Count) 条"

    if ($topNews.Count -eq 0) {
        Write-Log "未获取到新闻，跳过更新"
        exit 0
    }

    # 生成新闻HTML
    $today = Get-Date -Format "yyyy年M月d日"
    $newsCards = @()
    foreach ($item in $topNews) {
        $name = ($item.name -replace '<[^>]+>', '') -replace '"', '&quot;'
        $snippet = ($item.snippet -replace '<[^>]+>', '') -replace '"', '&quot;'
        if ($snippet.Length -gt 200) {
            $snippet = $snippet.Substring(0, 200) + "..."
        }
        $url = $item.url

        $card = "                <article class=`"news-card`">`n                    <div class=`"news-content`">`n                        <h3 class=`"news-title`">$name</h3>`n                        <p class=`"news-desc`">$snippet</p>`n                        <div class=`"news-meta`">`n                            <span>来源：综合报道</span>`n                            <a href=`"$url`" class=`"read-more`" target=`"_blank`">阅读原文 →</a>`n                        </div>`n                    </div>`n                </article>`n`n"
        $newsCards += $card
    }

    $newsHtml = $newsCards -join ""

    # 替换index.html
    $content = Get-Content $INDEX_FILE -Raw -Encoding UTF8
    $content = $content -replace '🔥 \d{4}年\d+月\d+日 AI热点新闻', "🔥 ${today} AI热点新闻"

    $pattern = '(?s)(<div class="news-grid">)(.*?)(</div>\s*</section>)'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, "<div class=`"news-grid`">`n$newsHtml            </div>`n        </section>"
    }

    [System.IO.File]::WriteAllText($INDEX_FILE, $content, [System.Text.UTF8Encoding]::new($false))
    Write-Log "index.html 更新完成"

    Set-Location $SITE_DIR
    git add index.html
    $commitMsg = "auto: daily AI news update - $today"
    git commit -m $commitMsg
    git push origin master 2>&1

    Write-Log "Git推送完成: $commitMsg"
    Write-Log "===== 更新成功 ====="

} catch {
    Write-Log "ERROR: $_"
    Write-Log "===== 更新失败 ====="
}