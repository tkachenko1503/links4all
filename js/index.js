var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$(document).ready(function () {
    var currentTab = $('#currentUrl');

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tabUrl;

        if (!tabs || !tabs.length) {
          return;
        }

        tabUrl = tabs[0].url;

        currentTab.text(tabUrl);
        initInput();
    });
});

function initInput () {
    $('#searchInput').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
    name: 'states',
        displayKey: 'value',
        source: substringMatcher(states)
    });
}

function substringMatcher (strs) {
    return function findMatches(q, cb) {
        var matches, substrRegex;

        matches = [];

        substrRegex = new RegExp(q, 'i');

        $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push({ value: str });
            }
        });

        cb(matches);
    };
}
