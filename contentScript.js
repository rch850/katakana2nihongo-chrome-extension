const dict = [
    ['プロモーション', '促進'],
    ['フォトジェニック', '写真映えする'],
    ['インフルエンサー', '影響力のある人'],
    ['カタカナ', '片仮名'],
    ['キャッチフレーズ', '売り文句'],
    ['ロゴ', 'ろご'],
    ['エリアブランディング', '地域活性化'],
    ['ポータルサイト', 'やふう'],
    ['インスタグラマー', '影響力のある人'],
    ['ホームページ', '家頁'],
]

function translate(html, dict) {
    return dict.reduce((tmpHtml, dictElem) => {
        return tmpHtml.replace(new RegExp(dictElem[0], 'g'), dictElem[1])
    }, html)
}

document.body.innerHTML = translate(document.body.innerHTML, dict)
