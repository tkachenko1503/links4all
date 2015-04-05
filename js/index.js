var signatures = {
    api_key:'TuFgY0aCW4GjG5hKPVKwaagKK',
    shared_secret:'725htcgJJqqyjY294A9vEnpjLZJDYoYFjRU3pkp3hFFd3EOKRG'
}

var oa_token;
chrome.storage.sync.remove('oauth_token');
chrome.storage.sync.get('oauth_token', function(t) {
    //console.log(t)
    oa_token = t;
});

function authorizeApp() {
    var oauthObject = OAuthSimple().sign({path:'https://api.twitter.com/oauth/request_token',
        parameters: 'oauth_callback=oob',
        signatures: signatures
    });
    console.log(oauthObject);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var pairs = xhr.responseText.split('&');
            pairs.forEach(function(p) {
                console.log(kv);
                if (p.indexOf('oauth_token') == 0) {
                    var kv = p.split('=');
                    if (kv[0] == 'oauth_token') {
                        chrome.storage.sync.set({'oauth_token': kv[1]});
                        chrome.tabs.create({'url':'https://api.twitter.com/oauth/authenticate?oauth_token='+kv[1]});
                    }
                    //chrome.storage.sync.set({kv[0]: kv[1]});
                }
            });
        //  oauth_token=4t9y4BFuWGTy6qdJNipI8I1Q3WpM1SbR&oauth_token_secret=j6Z62eSlPvlCi2PssqQgswSZwDrL2Wmk&oauth_callback_confirmed=true
        }
    }
    xhr.open("GET", oauthObject.signed_url, true);
    xhr.send();
}
