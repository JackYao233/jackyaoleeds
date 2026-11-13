(function () {
  const storageKey = 'jack-yao-theme';
  const deviceTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';

  function validPreference(value) {
    return ['system', 'light', 'dark'].includes(value) ? value : 'system';
  }

  try {
    preference = validPreference(localStorage.getItem(storageKey));
  } catch (error) {}

  function applyTheme() {
    document.documentElement.dataset.theme = preference === 'system'
      ? (deviceTheme.matches ? 'dark' : 'light')
      : preference;
    const select = document.getElementById('theme-select');
    if (select) select.value = preference;
  }

  applyTheme();

  document.addEventListener('DOMContentLoaded', function () {
    const select = document.getElementById('theme-select');
    if (!select) return;
    select.value = preference;
    select.addEventListener('change', function () {
      preference = validPreference(select.value);
      try {
        localStorage.setItem(storageKey, preference);
      } catch (error) {}
      applyTheme();
    });
  });

  deviceTheme.addEventListener('change', function () {
    if (preference === 'system') applyTheme();
  });

  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) {
      preference = validPreference(event.newValue);
      applyTheme();
    }
  });
}());
