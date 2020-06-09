window.onload = function (e) {
    liff.init(function () {
        makeList();
        makeSticker();
        makePrank();
    });
};
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function makeList(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('txt')
        }]).then(function () {
            liff.closeWindow();
        });
    }
}
function makeSticker(){
    var tipe = getParameterByName('type');
    if (tipe === 'sticker') {
        var stk = getParameterByName('stk');
        var sid = getParameterByName('sid');
        var pkg = getParameterByName('pkg');
        var ep = '';
        var qr = '';
        if (stk === 'anim') {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/IOS/sticker_animation@2x.png";
            qr = "line://shop/sticker/detail/"+pkg;
        } else if (stk === 'noanim') {
            ep = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+sid+"/android/sticker.png";
            qr = "line://shop/sticker/detail/"+pkg;
        } else if (stk === 'popup') {
            ep = "https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/"+sid+"/IOS/sticker_popup.png";
            qr = "line://shop/sticker/detail/"+pkg;
        } else if (stk === 'sticon') {
            ep = "https://stickershop.line-scdn.net/sticonshop/v1/sticon/"+pkg+"/iPhone/"+sid+".png";
            qr = "line://ti/p/~shengye001";
        }
        liff.sendMessages([{
            type: "template",
            altText: "ShengYe-LINEBOT.",
            template: {
                type: "image_carousel",
                columns: [
                    {
                        "imageUrl": ep,
                        "action": {
                            "type": "uri",
                            "uri": qr
                        }
                    }
                ]
            }
        }]).then(function () {
            liff.closeWindow();
        });
    }
}
function makePrank(){
    var tipe = getParameterByName('type');
    if (tipe === 'vote') {
        var title = getParameterByName('title');
        var text = getParameterByName('text');
        liff.sendMessages([{
            type: "template",
            altText: "[投票] "+title,
            template: {
                type: "buttons",
                thumbnailImageUrl: "https://scdn.line-apps.com/n/_1/poll/static/icon-message-1024.971665e3.png",
                imageAspectRatio: "rectangle",
                imageSize: "cover",
                imageBackgroundColor: "#FFFFFF",
                title: "[投票] "+title,
                text: "請前往投票頁面中投票。",
                actions: [
                    {
                        type: "uri",
                        label: "立即投票",
                        uri: "line://app/1602913925-WRJvdgLX?type=text&txt="+text
                    }
                ]
            }
        }]).then(function () {
            liff.closeWindow();
        });
    }
}