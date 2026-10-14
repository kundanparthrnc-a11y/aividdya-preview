/* AI Viddya Lead CRM — fire-and-forget lead capture.
   Requires: supabase-js CDN + supabase-config.js loaded before this file.
   Never blocks or breaks the existing FormSubmit/email flow. */
(function () {
  'use strict';

  var _client = null;

  function getClient() {
    if (_client) return _client;
    try {
      if (!window.supabase || !window.AV_SUPABASE_URL || !window.AV_SUPABASE_ANON_KEY) return null;
      _client = window.supabase.createClient(window.AV_SUPABASE_URL, window.AV_SUPABASE_ANON_KEY);
      return _client;
    } catch (e) { return null; }
  }

  // data: {source, name, email, phone, interest, message}
  window.AV_saveLead = function (data) {
    try {
      var sb = getClient();
      if (!sb) return;
      var row = {
        source: String(data.source || 'website'),
        name: String(data.name || '').trim(),
        email: (data.email || '').toString().trim() || null,
        phone: (data.phone || '').toString().trim() || null,
        interest: (data.interest || '').toString().trim() || null,
        message: (data.message || '').toString().trim() || null,
        page_url: (typeof location !== 'undefined' ? location.href : null),
        // NOTE: send status explicitly (defense in depth — the RLS policy
        // only permits status='new'). Also: never use .select() after insert
        // here, because anon has no SELECT policy and PostgREST would then
        // reject the whole request with an RLS violation.
        status: 'new'
      };
      if (!row.name) return;
      // fire-and-forget: never reject, never block UI
      sb.from('leads').insert(row).then(function () {}, function (err) {
        if (window.console && console.warn) console.warn('lead save failed', err && err.message);
      });
    } catch (e) { /* never break the page */ }
  };
})();
