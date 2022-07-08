// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8DZoZ":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "3c3140f81e48e037";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, importScripts */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else if ("reload" in location) location.reload();
            else {
                // Web extension context
                var ext = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
                if (ext && ext.runtime && ext.runtime.reload) ext.runtime.reload();
            }
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                if (asset.type === "js") {
                    if (typeof document !== "undefined") {
                        let script = document.createElement("script");
                        script.src = asset.url;
                        return new Promise((resolve, reject)=>{
                            var _document$head;
                            script.onload = ()=>resolve(script);
                            script.onerror = reject;
                            (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
                        });
                    } else if (typeof importScripts === "function") return new Promise((resolve, reject)=>{
                        try {
                            importScripts(asset.url);
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id1][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"iXJ4r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _flagsJson = require("../data/flags.json");
var _flagsJsonDefault = parcelHelpers.interopDefault(_flagsJson);
"use strict";
const startQuizBtn = document.querySelector(".intro-section__btn");
const quizInterface = document.querySelector(".quiz-interface");
const startQuizPanel = document.querySelector(".intro-section");
const labelAnswersList = document.querySelectorAll(".answers-list__label");
const inputAnswerElements = [
    ...document.querySelectorAll(".answers-list__input")
];
const imgFlagElement = document.querySelector(".quiz-interface__flag-img");
const nextQuestionBtn = document.querySelector(".quiz-interface__give-answer-btn");
const incorrectAnswerNotyfication = document.querySelector(".quiz-interface__error");
const currentQuestionElement = document.querySelector(".quiz-interface__question-number > output");
const quizStatisticsDashboard = document.querySelector(".finished-quiz-result");
const quizStatisticsCorrectAnswers = document.querySelector(".quiz-statistics__output_correct");
const quizStatisticsBadAnswers = document.querySelector(".quiz-statistics__output_badly");
const resultInfoTitle = document.querySelector(".quiz-statistics__result-info");
const questionsNumberPreference = document.querySelector(".number-of-questions");
let currentFlagName;
let correctAnswersCounter = 0;
let badAnswersCounter = 0;
let currentQuestionNumber = 1;
const getOneCorrectCountryName = ()=>{
    const questionsAmount = questionsNumberPreference.textContent.length === 11 ? questionsNumberPreference.textContent.slice(0, 1) : questionsNumberPreference.textContent.slice(0, 2);
    if (!(currentQuestionNumber === Number(questionsAmount) + 1)) {
        const flagNameFromLabelElement = labelAnswersList[Math.trunc(Math.random() * 4)];
        imgFlagElement.src = `https://countryflagsapi.com/svg/${flagNameFromLabelElement.textContent}`;
        currentFlagName = flagNameFromLabelElement.textContent;
    }
};
const getRandomCountryNames = ()=>{
    const flagsListLength = Object.keys((0, _flagsJsonDefault.default)).length;
    labelAnswersList.forEach((el)=>{
        el.textContent = (0, _flagsJsonDefault.default)[Math.trunc(Math.random() * flagsListLength) + 1];
    });
    setTimeout(()=>{
        quizInterface.classList.remove("active");
    }, 1000);
};
const checkIfAnswerIsCorrect = ()=>{
    quizInterface.classList.add("active");
    inputAnswerElements.forEach((el)=>{
        if (el.checked) {
            const nextSiblingLabelElement = el.nextElementSibling;
            if (nextSiblingLabelElement.textContent === currentFlagName) {
                correctAnswersCounter++;
                console.log("Correct answer", correctAnswersCounter);
            } else if (nextSiblingLabelElement.textContent !== currentFlagName) {
                badAnswersCounter++;
                console.log("Bad answer", badAnswersCounter);
            }
        }
        const questionsAmount = questionsNumberPreference.textContent.length === 11 ? questionsNumberPreference.textContent.slice(0, 1) : questionsNumberPreference.textContent.slice(0, 2);
        if (currentQuestionNumber === Number(questionsAmount) + 1) handleFinalPlayerScores();
        el.checked = false;
    });
};
const handleFinalPlayerScores = ()=>{
    quizInterface.classList.remove("active");
    quizStatisticsDashboard.classList.add("active");
    if (correctAnswersCounter > badAnswersCounter) {
        resultInfoTitle.classList.add("quiz-statistics__result-info_good");
        resultInfoTitle.textContent = "Congratulations, you have answered most of the questions correctly !";
    } else if (correctAnswersCounter < badAnswersCounter) {
        resultInfoTitle.classList.add("quiz-statistics__result-info_bad");
        resultInfoTitle.textContent = "Please try again, your answers was incorrect.";
    }
    imgFlagElement.src = "#";
    quizStatisticsCorrectAnswers.textContent = correctAnswersCounter;
    quizStatisticsBadAnswers.textContent = badAnswersCounter;
};
nextQuestionBtn.addEventListener("click", ()=>{
    const isAnyAnswerChecked = inputAnswerElements.some((el)=>el.checked);
    if (isAnyAnswerChecked) {
        incorrectAnswerNotyfication.textContent = "";
        incorrectAnswerNotyfication.classList.remove("active");
        currentQuestionNumber++;
        currentQuestionElement.textContent = currentQuestionNumber;
        checkIfAnswerIsCorrect();
        getRandomCountryNames();
        getOneCorrectCountryName();
    } else {
        incorrectAnswerNotyfication.textContent = "Please select any answer !";
        incorrectAnswerNotyfication.classList.add("active");
    }
});
startQuizBtn.addEventListener("click", ()=>{
    startQuizBtn.textContent = "";
    startQuizBtn.classList.add("active");
    setTimeout(()=>{
        startQuizPanel.classList.add("hidden");
    }, 2500);
    setTimeout(()=>{
        quizInterface.classList.remove("hidden");
    }, 3500);
});
window.addEventListener("DOMContentLoaded", ()=>{
    getRandomCountryNames();
    getOneCorrectCountryName();
});

},{"../data/flags.json":"fbNpB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fbNpB":[function(require,module,exports) {
module.exports = JSON.parse('{"1":"United Arab Emirates","2":"Andorra","3":"Afghanistan","4":"Antigua And Barbuda","5":"Anguilla","6":"Albania","7":"Armenia","8":"Angola","9":"Antarctica","10":"Argentina","11":"American Samoa","12":"Austria","13":"Australia","14":"Aruba","15":"\xe5land Islands","16":"Azerbaijan","17":"Bosnia And Herzegovina","18":"Barbados","19":"Bangladesh","20":"Belgium","21":"Burkina Faso","22":"Bulgaria","23":"Bahrain","24":"Burundi","25":"Benin","26":"Saint Barth\xe9lemy","27":"Bermuda","28":"Brunei Darussalam","29":"Bolivia","30":"Bonaire","31":"Brazil","32":"The Bahamas","33":"Bhutan","34":"Bouvet Island","35":"Botswana","36":"Belarus","37":"Belize","38":"Canada","39":"The Cocos Islands","40":"Democratic Republic Of Congo","41":"The Central African Republic","42":"Congo","43":"Switzerland","44":"C\xf4te D\'ivoire","45":"The Cook Islands","46":"Chile","47":"Cameroon","48":"China","49":"Colombia","50":"Costa Rica","51":"Cuba","52":"Cabo Verde","53":"Cura\xe7ao","54":"Christmas Island","55":"Cyprus","56":"Czechia","57":"Germany","58":"Djibouti","59":"Denmark","60":"Dominica","61":"Dominican Republic","62":"Algeria","63":"Ecuador","64":"Estonia","65":"Egypt","66":"Western Sahara","67":"Eritrea","68":"Spain","69":"Ethiopia","70":"European Union","71":"Finland","72":"Fiji","73":"The Falkland Islands","74":"The Federated States Of Micronesia","75":"The Faroe Islands","76":"France","77":"Gabon","78":"England","79":"Northern Ireland","80":"Scotland","81":"Wales","82":"The United Kingdom Of Great Britain And Northern Ireland","83":"Grenada","84":"Georgia","85":"French Guiana","86":"Guernsey","87":"Ghana","88":"Gibraltar","89":"Greenland","90":"Gambia","91":"Guinea","92":"Guadeloupe","93":"Equatorial Guinea","94":"Greece","95":"South Georgia And The South Sandwich Islands","96":"Guatemala","97":"Guam","98":"Guinea-bissau","99":"Guyana","100":"Hong Kong","101":"Heard Island And Mcdonald Islands","102":"Honduras","103":"Croatia","104":"Haiti","105":"Hungary","106":"Indonesia","107":"Ireland","108":"Israel","109":"Isle Of Man","110":"India","111":"The British Indian Ocean Territory","112":"Iraq","113":"Iran","114":"Iceland","115":"Italy","116":"Jersey","117":"Jamaica","118":"Jordan","119":"Japan","120":"Kenya","121":"Kyrgyzstan","122":"Cambodia","123":"Kiribati","124":"The Comoros","125":"Saint Kitts And Nevis","126":"The Democratic People\'s Republic Of Korea","127":"The Republic Of Korea","128":"Kuwait","129":"The Cayman Islands","130":"Kazakhstan","131":"The Lao People\'s Democratic Republic","132":"Lebanon","133":"Saint Lucia","134":"Liechtenstein","135":"Sri Lanka","136":"Liberia","137":"Lesotho","138":"Lithuania","139":"Luxembourg","140":"Latvia","141":"Libya","142":"Morocco","143":"Monaco","144":"The Republic Of Moldova","145":"Montenegro","146":"Saint Martin","147":"Madagascar","148":"The Marshall Islands","149":"Republic Of North Macedonia","150":"Mali","151":"Myanmar","152":"Mongolia","153":"Macao","154":"The Northern Mariana Islands","155":"Martinique","156":"Mauritania","157":"Montserrat","158":"Malta","159":"Mauritius","160":"Maldives","161":"Malawi","162":"Mexico","163":"Malaysia","164":"Mozambique","165":"Namibia","166":"New Caledonia","167":"Niger","168":"Norfolk Island","169":"Nigeria","170":"Nicaragua","171":"Netherlands","172":"Norway","173":"Nepal","174":"Nauru","175":"Niue","176":"New Zealand","177":"Oman","178":"Panama","179":"Peru","180":"French Polynesia","181":"Papua New Guinea","182":"Philippines","183":"Pakistan","184":"Poland","185":"Saint Pierre And Miquelon","186":"Pitcairn","187":"Puerto Rico","188":"Palestine","189":"Portugal","190":"Palau","191":"Paraguay","192":"Qatar","193":"R\xe9union","194":"Romania","195":"Serbia","196":"Russian Federation","197":"Rwanda","198":"Saudi Arabia","199":"Solomon Islands","200":"Seychelles","201":"Sudan","202":"Sweden","203":"Singapore","204":"Saint Helena","205":"Slovenia","206":"Svalbard And Jan Mayen","207":"Slovakia","208":"Sierra Leone","209":"San Marino","210":"Senegal","211":"Somalia","212":"Suriname","213":"South Sudan","214":"Sao Tome And Principe","215":"El Salvador","216":"Sint Maarten","217":"Syrian Arab Republic","218":"Eswatini","219":"The Turks And Caicos Islands","220":"Chad","221":"The French Southern Territories","222":"Togo","223":"Thailand","224":"Tajikistan","225":"Tokelau","226":"Timor-leste","227":"Turkmenistan","228":"Tunisia","229":"Tonga","230":"Turkey","231":"Trinidad And Tobago","232":"Tuvalu","233":"Taiwan","234":"United Republic Of Tanzania","235":"Ukraine","236":"Uganda","237":"The United States Minor Outlying Islands","238":"The United States Of America","239":"Uruguay","240":"Uzbekistan","241":"The Holy See","242":"Saint Vincent And The Grenadines","243":"Venezuela","244":"British Virgin Islands","245":"Us Virgin Islands","246":"Viet Nam","247":"Vanuatu","248":"Wallis And Futuna","249":"Samoa","250":"Kosovo","251":"Yemen","252":"Mayotte","253":"South Africa","254":"Zambia","255":"Zimbabwe"}');

},{}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["8DZoZ","iXJ4r"], "iXJ4r", "parcelRequiree238")

//# sourceMappingURL=Flags-Quiz.1e48e037.js.map
