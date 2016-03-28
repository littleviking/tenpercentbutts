var save_values,
    input_auto = document.getElementById('ten-percent-butts-auto'),
    input_range = document.getElementById('ten-percent-butts-percent'),
    input_run = document.getElementById('ten-percent-butts-run'),
    input_range_readout = document.getElementById('ten-percent-butts-percent-value');

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get({
    auto: false,
    percent: 10
  }, function(settings) {
    input_auto.checked = settings.auto;
    input_range.value = settings.percent;
    input_range_readout.innerHTML = settings.percent;
  });
});

save_values = function() {
  chrome.storage.sync.set({
    auto: input_auto.checked,
    percent: input_range.value
  }, function() {
    input_range_readout.innerHTML = input_range.value;
  });
};

input_auto.addEventListener('change', save_values);
input_range.addEventListener('input', save_values);
input_run.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "clickedBrowserAction" });
  });
});