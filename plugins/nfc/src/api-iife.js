if("__TAURI__"in window){var __TAURI_NFC__=function(n){"use strict";var a,e;return n.ScanKind=void 0,(a=n.ScanKind||(n.ScanKind={}))[a.Ndef=0]="Ndef",a[a.Tag=1]="Tag",n.NFCTypeNameFormat=void 0,(e=n.NFCTypeNameFormat||(n.NFCTypeNameFormat={}))[e.Empty=0]="Empty",e[e.NfcWellKnown=1]="NfcWellKnown",e[e.Media=2]="Media",e[e.AbsoluteURI=3]="AbsoluteURI",e[e.NfcExternal=4]="NfcExternal",e[e.Unknown=5]="Unknown",e[e.Unchanged=6]="Unchanged",n.isAvailable=async function(){return await window.__TAURI_INVOKE__("plugin:nfc|isAvailable")},n.scan=async function(a,e){return await window.__TAURI_INVOKE__("plugin:nfc|scan",{kind:a===n.ScanKind.Ndef?"ndef":"tag",...e})},n.write=async function(n){return await window.__TAURI_INVOKE__("plugin:nfc|write",{records:n})},n}({});Object.defineProperty(window.__TAURI__,"nfc",{value:__TAURI_NFC__})}
