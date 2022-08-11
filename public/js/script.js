function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
/*!
 * Splide.js
 * Version  : 4.0.7
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */


var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
var CREATED = 1;
var MOUNTED = 2;
var IDLE = 3;
var MOVING = 4;
var SCROLLING = 5;
var DRAGGING = 6;
var DESTROYED = 7;
var STATES = {
  CREATED: CREATED,
  MOUNTED: MOUNTED,
  IDLE: IDLE,
  MOVING: MOVING,
  SCROLLING: SCROLLING,
  DRAGGING: DRAGGING,
  DESTROYED: DESTROYED
};

function empty$2(array) {
  array.length = 0;
}

function slice$2(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}

function apply$2(func) {
  return func.bind.apply(func, [null].concat(slice$2(arguments, 1)));
}

var nextTick = setTimeout;

var noop = function noop() {};

function raf(func) {
  return requestAnimationFrame(func);
}

function typeOf$2(type, subject) {
  return typeof subject === type;
}

function isObject$1(subject) {
  return !isNull$1(subject) && typeOf$2("object", subject);
}

var isArray$2 = Array.isArray;
var isFunction = apply$2(typeOf$2, "function");
var isString$1 = apply$2(typeOf$2, "string");
var isUndefined$1 = apply$2(typeOf$2, "undefined");

function isNull$1(subject) {
  return subject === null;
}

function isHTMLElement$1(subject) {
  return subject instanceof HTMLElement;
}

function toArray$2(value) {
  return isArray$2(value) ? value : [value];
}

function forEach$2(values, iteratee) {
  toArray$2(values).forEach(iteratee);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function push$1(array, items) {
  array.push.apply(array, toArray$2(items));
  return array;
}

function toggleClass$1(elm, classes, add) {
  if (elm) {
    forEach$2(classes, function (name) {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

function addClass$1(elm, classes) {
  toggleClass$1(elm, isString$1(classes) ? classes.split(" ") : classes, true);
}

function append$1(parent, children) {
  forEach$2(children, parent.appendChild.bind(parent));
}

function before(nodes, ref) {
  forEach$2(nodes, function (node) {
    var parent = (ref || node).parentNode;

    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}

function matches$1(elm, selector) {
  return isHTMLElement$1(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

function children$1(parent, selector) {
  var children2 = parent ? slice$2(parent.children) : [];
  return selector ? children2.filter(function (child) {
    return matches$1(child, selector);
  }) : children2;
}

function child$1(parent, selector) {
  return selector ? children$1(parent, selector)[0] : parent.firstElementChild;
}

var ownKeys$2 = Object.keys;

function forOwn$2(object, iteratee, right) {
  if (object) {
    var keys = ownKeys$2(object);
    keys = right ? keys.reverse() : keys;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}

function assign$2(object) {
  slice$2(arguments, 1).forEach(function (source) {
    forOwn$2(source, function (value, key) {
      object[key] = source[key];
    });
  });
  return object;
}

function merge(object) {
  slice$2(arguments, 1).forEach(function (source) {
    forOwn$2(source, function (value, key) {
      if (isArray$2(value)) {
        object[key] = value.slice();
      } else if (isObject$1(value)) {
        object[key] = merge({}, isObject$1(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}

function omit$1(object, keys) {
  toArray$2(keys || ownKeys$2(object)).forEach(function (key) {
    delete object[key];
  });
}

function removeAttribute$1(elms, attrs) {
  forEach$2(elms, function (elm) {
    forEach$2(attrs, function (attr) {
      elm && elm.removeAttribute(attr);
    });
  });
}

function setAttribute$1(elms, attrs, value) {
  if (isObject$1(attrs)) {
    forOwn$2(attrs, function (value2, name) {
      setAttribute$1(elms, name, value2);
    });
  } else {
    forEach$2(elms, function (elm) {
      isNull$1(value) || value === "" ? removeAttribute$1(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}

function create$1(tag, attrs, parent) {
  var elm = document.createElement(tag);

  if (attrs) {
    isString$1(attrs) ? addClass$1(elm, attrs) : setAttribute$1(elm, attrs);
  }

  parent && append$1(parent, elm);
  return elm;
}

function style$1(elm, prop, value) {
  if (isUndefined$1(value)) {
    return getComputedStyle(elm)[prop];
  }

  if (!isNull$1(value)) {
    elm.style[prop] = "" + value;
  }
}

function display(elm, display2) {
  style$1(elm, "display", display2);
}

function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({
    preventScroll: true
  });
}

function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}

function hasClass$1(elm, className) {
  return elm && elm.classList.contains(className);
}

function rect(target) {
  return target.getBoundingClientRect();
}

function remove$1(nodes) {
  forEach$2(nodes, function (node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function parseHtml(html) {
  return child$1(new DOMParser().parseFromString(html, "text/html").body);
}

function prevent(e, stopPropagation) {
  e.preventDefault();

  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

function query(parent, selector) {
  return parent && parent.querySelector(selector);
}

function queryAll$1(parent, selector) {
  return selector ? slice$2(parent.querySelectorAll(selector)) : [];
}

function removeClass$1(elm, classes) {
  toggleClass$1(elm, classes, false);
}

function timeOf(e) {
  return e.timeStamp;
}

function unit$1(value) {
  return isString$1(value) ? value : value ? value + "px" : "";
}

var PROJECT_CODE$2 = "splide";
var DATA_ATTRIBUTE = "data-" + PROJECT_CODE$2;

function assert$1(condition, message) {
  if (!condition) {
    throw new Error("[" + PROJECT_CODE$2 + "] " + (message || ""));
  }
}

var min$1 = Math.min,
    max$1 = Math.max,
    floor$1 = Math.floor,
    ceil$1 = Math.ceil,
    abs$1 = Math.abs;

function approximatelyEqual(x, y, epsilon) {
  return abs$1(x - y) < epsilon;
}

function between(number, minOrMax, maxOrMin, exclusive) {
  var minimum = min$1(minOrMax, maxOrMin);
  var maximum = max$1(minOrMax, maxOrMin);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}

function clamp(number, x, y) {
  var minimum = min$1(x, y);
  var maximum = max$1(x, y);
  return min$1(max$1(minimum, number), maximum);
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function format(string, replacements) {
  forEach$2(replacements, function (replacement) {
    string = string.replace("%s", "" + replacement);
  });
  return string;
}

function pad$1(number) {
  return number < 10 ? "0" + number : "" + number;
}

var ids = {};

function uniqueId(prefix) {
  return "" + prefix + pad$1(ids[prefix] = (ids[prefix] || 0) + 1);
}

function EventBinder$1() {
  var listeners = [];

  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function (target, event, namespace) {
      var isEventTarget = ("addEventListener" in target);
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }

  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function (target, event, namespace) {
      listeners = listeners.filter(function (listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }

        return true;
      });
    });
  }

  function dispatch(target, type, detail) {
    var e;
    var bubbles = true;

    if (typeof CustomEvent === "function") {
      e = new CustomEvent(type, {
        bubbles: bubbles,
        detail: detail
      });
    } else {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, false, detail);
    }

    target.dispatchEvent(e);
    return e;
  }

  function forEachEvent(targets, events, iteratee) {
    forEach$2(targets, function (target) {
      target && forEach$2(events, function (events2) {
        events2.split(" ").forEach(function (eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }

  function destroy() {
    listeners.forEach(function (data) {
      data[4]();
    });
    empty$2(listeners);
  }

  return {
    bind: bind,
    unbind: unbind,
    dispatch: dispatch,
    destroy: destroy
  };
}

var EVENT_MOUNTED = "mounted";
var EVENT_READY = "ready";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_SHIFTED = "shifted";
var EVENT_CLICK = "click";
var EVENT_ACTIVE = "active";
var EVENT_INACTIVE = "inactive";
var EVENT_VISIBLE$1 = "visible";
var EVENT_HIDDEN$1 = "hidden";
var EVENT_SLIDE_KEYDOWN = "slide:keydown";
var EVENT_REFRESH$1 = "refresh";
var EVENT_UPDATED$1 = "updated";
var EVENT_RESIZE = "resize";
var EVENT_RESIZED = "resized";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_DRAGGED = "dragged";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_DESTROY$1 = "destroy";
var EVENT_ARROWS_MOUNTED = "arrows:mounted";
var EVENT_ARROWS_UPDATED = "arrows:updated";
var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
var EVENT_PAGINATION_UPDATED = "pagination:updated";
var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
var EVENT_AUTOPLAY_PLAY = "autoplay:play";
var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";

function EventInterface$1(Splide2) {
  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  var binder = EventBinder$1();

  function on(events, callback) {
    binder.bind(bus, toArray$2(events).join(" "), function (e) {
      callback.apply(callback, isArray$2(e.detail) ? e.detail : []);
    });
  }

  function emit(event) {
    binder.dispatch(bus, event, slice$2(arguments, 1));
  }

  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY$1, binder.destroy);
  }

  return assign$2(binder, {
    bus: bus,
    on: on,
    off: apply$2(binder.unbind, bus),
    emit: emit
  });
}

function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  var startTime;
  var rate = 0;
  var id;
  var paused = true;
  var count = 0;

  function update() {
    if (!paused) {
      rate = interval ? min$1((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);

      if (rate >= 1) {
        onInterval();
        startTime = now();

        if (limit && ++count >= limit) {
          return pause();
        }
      }

      raf(update);
    }
  }

  function start(resume) {
    !resume && cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    raf(update);
  }

  function pause() {
    paused = true;
  }

  function rewind() {
    startTime = now();
    rate = 0;

    if (onUpdate) {
      onUpdate(rate);
    }
  }

  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }

  function set(time) {
    interval = time;
  }

  function isPaused() {
    return paused;
  }

  return {
    start: start,
    rewind: rewind,
    pause: pause,
    cancel: cancel,
    set: set,
    isPaused: isPaused
  };
}

function State(initialState) {
  var state = initialState;

  function set(value) {
    state = value;
  }

  function is(states) {
    return includes(toArray$2(states), state);
  }

  return {
    set: set,
    is: is
  };
}

function Throttle(func, duration) {
  var interval;

  function throttled() {
    if (!interval) {
      interval = RequestInterval(duration || 0, function () {
        func();
        interval = null;
      }, null, 1);
      interval.start();
    }
  }

  return throttled;
}

function Media(Splide2, Components2, options) {
  var state = Splide2.state;
  var breakpoints = options.breakpoints || {};
  var reducedMotion = options.reducedMotion || {};
  var binder = EventBinder$1();
  var queries = [];

  function setup() {
    var isMin = options.mediaQuery === "min";
    ownKeys$2(breakpoints).sort(function (n, m) {
      return isMin ? +n - +m : +m - +n;
    }).forEach(function (key) {
      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }

  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }

  function register(options2, query) {
    var queryList = matchMedia(query);
    binder.bind(queryList, "change", update);
    queries.push([options2, queryList]);
  }

  function update() {
    var destroyed = state.is(DESTROYED);
    var direction = options.direction;
    var merged = queries.reduce(function (merged2, entry) {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit$1(options);
    set(merged);

    if (options.destroy) {
      Splide2.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }

  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit$1(options, ownKeys$2(reducedMotion));
    }
  }

  function set(opts, user) {
    merge(options, opts);
    user && merge(Object.getPrototypeOf(options), opts);

    if (!state.is(CREATED)) {
      Splide2.emit(EVENT_UPDATED$1, options);
    }
  }

  return {
    setup: setup,
    destroy: destroy,
    reduce: reduce,
    set: set
  };
}

var ARROW = "Arrow";
var ARROW_LEFT = ARROW + "Left";
var ARROW_RIGHT = ARROW + "Right";
var ARROW_UP = ARROW + "Up";
var ARROW_DOWN = ARROW + "Down";
var RTL = "rtl";
var TTB = "ttb";
var ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};

function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }

  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }

  return {
    resolve: resolve,
    orient: orient
  };
}

var ROLE = "role";
var TAB_INDEX = "tabindex";
var DISABLED = "disabled";
var ARIA_PREFIX = "aria-";
var ARIA_CONTROLS = ARIA_PREFIX + "controls";
var ARIA_CURRENT = ARIA_PREFIX + "current";
var ARIA_SELECTED = ARIA_PREFIX + "selected";
var ARIA_LABEL = ARIA_PREFIX + "label";
var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
var ARIA_LIVE = ARIA_PREFIX + "live";
var ARIA_BUSY = ARIA_PREFIX + "busy";
var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
var CLASS_ROOT$1 = PROJECT_CODE$2;
var CLASS_TRACK = PROJECT_CODE$2 + "__track";
var CLASS_LIST = PROJECT_CODE$2 + "__list";
var CLASS_SLIDE$1 = PROJECT_CODE$2 + "__slide";
var CLASS_CLONE = CLASS_SLIDE$1 + "--clone";
var CLASS_CONTAINER$1 = CLASS_SLIDE$1 + "__container";
var CLASS_ARROWS = PROJECT_CODE$2 + "__arrows";
var CLASS_ARROW = PROJECT_CODE$2 + "__arrow";
var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
var CLASS_PAGINATION = PROJECT_CODE$2 + "__pagination";
var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
var CLASS_PROGRESS = PROJECT_CODE$2 + "__progress";
var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
var CLASS_TOGGLE = PROJECT_CODE$2 + "__toggle";
var CLASS_SPINNER = PROJECT_CODE$2 + "__spinner";
var CLASS_SR = PROJECT_CODE$2 + "__sr";
var CLASS_INITIALIZED = "is-initialized";
var CLASS_ACTIVE = "is-active";
var CLASS_PREV = "is-prev";
var CLASS_NEXT = "is-next";
var CLASS_VISIBLE = "is-visible";
var CLASS_LOADING = "is-loading";
var CLASS_FOCUS_IN = "is-focus-in";
var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN];
var CLASSES = {
  slide: CLASS_SLIDE$1,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};

function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }

  var elm = from;

  while (elm && elm.nodeType === 1) {
    if (matches$1(elm, selector)) {
      break;
    }

    elm = elm.parentElement;
  }

  return elm;
}

var FRICTION = 5;
var LOG_INTERVAL = 200;
var POINTER_DOWN_EVENTS = "touchstart mousedown";
var POINTER_MOVE_EVENTS = "touchmove mousemove";
var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

function Elements(Splide2, Components2, options) {
  var _EventInterface = EventInterface$1(Splide2),
      on = _EventInterface.on,
      bind = _EventInterface.bind;

  var root = Splide2.root;
  var i18n = options.i18n;
  var elements = {};
  var slides = [];
  var rootClasses = [];
  var trackClasses = [];
  var track;
  var list;
  var isUsingKey;

  function setup() {
    collect();
    init();
    update();
  }

  function mount() {
    on(EVENT_REFRESH$1, destroy);
    on(EVENT_REFRESH$1, setup);
    on(EVENT_UPDATED$1, update);
    bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
      isUsingKey = e.type === "keydown";
    }, {
      capture: true
    });
    bind(root, "focusin", function () {
      toggleClass$1(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }

  function destroy(completely) {
    var attrs = ALL_ATTRIBUTES.concat("style");
    empty$2(slides);
    removeClass$1(root, rootClasses);
    removeClass$1(track, trackClasses);
    removeAttribute$1([track, list], attrs);
    removeAttribute$1(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }

  function update() {
    removeClass$1(root, rootClasses);
    removeClass$1(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT$1);
    trackClasses = getClasses(CLASS_TRACK);
    addClass$1(root, rootClasses);
    addClass$1(track, trackClasses);
    setAttribute$1(root, ARIA_LABEL, options.label);
    setAttribute$1(root, ARIA_LABELLEDBY, options.labelledby);
  }

  function collect() {
    track = find("." + CLASS_TRACK);
    list = child$1(track, "." + CLASS_LIST);
    assert$1(track && list, "A track/list element is missing.");
    push$1(slides, children$1(list, "." + CLASS_SLIDE$1 + ":not(." + CLASS_CLONE + ")"));
    forOwn$2({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE
    }, function (className, key) {
      elements[key] = find("." + className);
    });
    assign$2(elements, {
      root: root,
      track: track,
      list: list,
      slides: slides
    });
  }

  function init() {
    var id = root.id || uniqueId(PROJECT_CODE$2);
    var role = options.role;
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";

    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute$1(root, ROLE, role);
    }

    setAttribute$1(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute$1(list, ROLE, "presentation");
  }

  function find(selector) {
    var elm = query(root, selector);
    return elm && closest(elm, "." + CLASS_ROOT$1) === root ? elm : void 0;
  }

  function getClasses(base) {
    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT$1 && CLASS_ACTIVE];
  }

  return assign$2(elements, {
    setup: setup,
    mount: mount,
    destroy: destroy
  });
}

var SLIDE = "slide";
var LOOP = "loop";
var FADE = "fade";

function Slide$1(Splide2, index, slideIndex, slide) {
  var event = EventInterface$1(Splide2);
  var on = event.on,
      emit = event.emit,
      bind = event.bind;
  var Components = Splide2.Components,
      root = Splide2.root,
      options = Splide2.options;
  var isNavigation = options.isNavigation,
      updateOnMove = options.updateOnMove,
      i18n = options.i18n,
      pagination = options.pagination,
      slideFocus = options.slideFocus;
  var resolve = Components.Direction.resolve;
  var styles = getAttribute(slide, "style");
  var label = getAttribute(slide, ARIA_LABEL);
  var isClone = slideIndex > -1;
  var container = child$1(slide, "." + CLASS_CONTAINER$1);
  var focusableNodes = queryAll$1(slide, options.focusableNodes || "");
  var destroyed;

  function mount() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad$1(index + 1);
      setAttribute$1(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute$1(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute$1(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
    }

    listen();
  }

  function listen() {
    bind(slide, "click", apply$2(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply$2(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);

    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }

  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass$1(slide, STATUS_CLASSES);
    removeAttribute$1(slide, ALL_ATTRIBUTES);
    setAttribute$1(slide, "style", styles);
    setAttribute$1(slide, ARIA_LABEL, label || "");
  }

  function initNavigation() {
    var controls = Splide2.splides.map(function (target) {
      var Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute$1(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute$1(slide, ARIA_CONTROLS, controls);
    setAttribute$1(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute$1(slide, ARIA_ROLEDESCRIPTION);
  }

  function onMove() {
    if (!destroyed) {
      update();
    }
  }

  function update() {
    if (!destroyed) {
      var curr = Splide2.index;
      updateActivity();
      updateVisibility();
      toggleClass$1(slide, CLASS_PREV, index === curr - 1);
      toggleClass$1(slide, CLASS_NEXT, index === curr + 1);
    }
  }

  function updateActivity() {
    var active = isActive();

    if (active !== hasClass$1(slide, CLASS_ACTIVE)) {
      toggleClass$1(slide, CLASS_ACTIVE, active);
      setAttribute$1(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }

  function updateVisibility() {
    var visible = isVisible();
    var hidden = !visible && (!isActive() || isClone);

    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute$1(slide, ARIA_HIDDEN, hidden || "");
    }

    setAttribute$1(focusableNodes, TAB_INDEX, hidden ? -1 : "");

    if (slideFocus) {
      setAttribute$1(slide, TAB_INDEX, hidden ? -1 : 0);
    }

    if (visible !== hasClass$1(slide, CLASS_VISIBLE)) {
      toggleClass$1(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE$1 : EVENT_HIDDEN$1, self);
    }

    if (!visible && document.activeElement === slide) {
      var Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }

  function style$1$1(prop, value, useContainer) {
    style$1(useContainer && container || slide, prop, value);
  }

  function isActive() {
    var curr = Splide2.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }

  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }

    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve("left", true);
    var right = resolve("right", true);
    return floor$1(trackRect[left]) <= ceil$1(slideRect[left]) && floor$1(slideRect[right]) <= ceil$1(trackRect[right]);
  }

  function isWithin(from, distance) {
    var diff = abs$1(from - index);

    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min$1(diff, Splide2.length - diff);
    }

    return diff <= distance;
  }

  var self = {
    index: index,
    slideIndex: slideIndex,
    slide: slide,
    container: container,
    isClone: isClone,
    mount: mount,
    destroy: destroy,
    update: update,
    style: style$1$1,
    isWithin: isWithin
  };
  return self;
}

function Slides(Splide2, Components2, options) {
  var _EventInterface2 = EventInterface$1(Splide2),
      on = _EventInterface2.on,
      emit = _EventInterface2.emit,
      bind = _EventInterface2.bind;

  var _Components2$Elements = Components2.Elements,
      slides = _Components2$Elements.slides,
      list = _Components2$Elements.list;
  var Slides2 = [];

  function mount() {
    init();
    on(EVENT_REFRESH$1, destroy);
    on(EVENT_REFRESH$1, init);
    on([EVENT_MOUNTED, EVENT_REFRESH$1], function () {
      Slides2.sort(function (Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    });
  }

  function init() {
    slides.forEach(function (slide, index) {
      register(slide, index, -1);
    });
  }

  function destroy() {
    forEach$1(function (Slide2) {
      Slide2.destroy();
    });
    empty$2(Slides2);
  }

  function update() {
    forEach$1(function (Slide2) {
      Slide2.update();
    });
  }

  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
  }

  function get(excludeClones) {
    return excludeClones ? filter(function (Slide2) {
      return !Slide2.isClone;
    }) : Slides2;
  }

  function getIn(page) {
    var Controller = Components2.Controller;
    var index = Controller.toIndex(page);
    var max = Controller.hasFocus() ? 1 : options.perPage;
    return filter(function (Slide2) {
      return between(Slide2.index, index, index + max - 1);
    });
  }

  function getAt(index) {
    return filter(index)[0];
  }

  function add(items, index) {
    forEach$2(items, function (slide) {
      if (isString$1(slide)) {
        slide = parseHtml(slide);
      }

      if (isHTMLElement$1(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append$1(list, slide);
        addClass$1(slide, options.classes.slide);
        observeImages(slide, apply$2(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH$1);
  }

  function remove$1$1(matcher) {
    remove$1(filter(matcher).map(function (Slide2) {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH$1);
  }

  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }

  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
      return isString$1(matcher) ? matches$1(Slide2.slide, matcher) : includes(toArray$2(matcher), Slide2.index);
    });
  }

  function style(prop, value, useContainer) {
    forEach$1(function (Slide2) {
      Slide2.style(prop, value, useContainer);
    });
  }

  function observeImages(elm, callback) {
    var images = queryAll$1(elm, "img");
    var length = images.length;

    if (length) {
      images.forEach(function (img) {
        bind(img, "load error", function () {
          if (! --length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }

  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }

  function isEnough() {
    return Slides2.length > options.perPage;
  }

  return {
    mount: mount,
    destroy: destroy,
    update: update,
    register: register,
    get: get,
    getIn: getIn,
    getAt: getAt,
    add: add,
    remove: remove$1$1,
    forEach: forEach$1,
    filter: filter,
    style: style,
    getLength: getLength,
    isEnough: isEnough
  };
}

function Layout$1(Splide2, Components2, options) {
  var _EventInterface3 = EventInterface$1(Splide2),
      on = _EventInterface3.on,
      bind = _EventInterface3.bind,
      emit = _EventInterface3.emit;

  var Slides = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var _Components2$Elements2 = Components2.Elements,
      root = _Components2$Elements2.root,
      track = _Components2$Elements2.track,
      list = _Components2$Elements2.list;
  var getAt = Slides.getAt,
      styleSlides = Slides.style;
  var vertical;
  var rootRect;

  function mount() {
    init();
    bind(window, "resize load", Throttle(apply$2(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED$1, EVENT_REFRESH$1], init);
    on(EVENT_RESIZE, resize);
  }

  function init() {
    rootRect = null;
    vertical = options.direction === TTB;
    style$1(root, "maxWidth", unit$1(options.width));
    style$1(track, resolve("paddingLeft"), cssPadding(false));
    style$1(track, resolve("paddingRight"), cssPadding(true));
    resize();
  }

  function resize() {
    var newRect = rect(root);

    if (!rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style$1(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit$1(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
    }
  }

  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? "right" : "left");
    return padding && unit$1(padding[prop] || (isObject$1(padding) ? 0 : padding)) || "0px";
  }

  function cssTrackHeight() {
    var height = "";

    if (vertical) {
      height = cssHeight();
      assert$1(height, "height or heightRatio is missing.");
      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
    }

    return height;
  }

  function cssHeight() {
    return unit$1(options.height || rect(list).width * options.heightRatio);
  }

  function cssSlideWidth() {
    return options.autoWidth ? null : unit$1(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }

  function cssSlideHeight() {
    return unit$1(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }

  function cssSlideSize() {
    var gap = unit$1(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }

  function listSize() {
    return rect(list)[resolve("width")];
  }

  function slideSize(index, withoutGap) {
    var Slide = getAt(index || 0);
    return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }

  function totalSize(index, withoutGap) {
    var Slide = getAt(index);

    if (Slide) {
      var right = rect(Slide.slide)[resolve("right")];
      var left = rect(list)[resolve("left")];
      return abs$1(right - left) + (withoutGap ? 0 : getGap());
    }

    return 0;
  }

  function sliderSize() {
    return totalSize(Splide2.length - 1, true) - totalSize(-1, true);
  }

  function getGap() {
    var Slide = getAt(0);
    return Slide && parseFloat(style$1(Slide.slide, resolve("marginRight"))) || 0;
  }

  function getPadding(right) {
    return parseFloat(style$1(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
  }

  return {
    mount: mount,
    listSize: listSize,
    slideSize: slideSize,
    sliderSize: sliderSize,
    totalSize: totalSize,
    getPadding: getPadding
  };
}

var MULTIPLIER = 2;

function Clones(Splide2, Components2, options) {
  var _EventInterface4 = EventInterface$1(Splide2),
      on = _EventInterface4.on,
      emit = _EventInterface4.emit;

  var Elements = Components2.Elements,
      Slides = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var clones = [];
  var cloneCount;

  function mount() {
    init();
    on(EVENT_REFRESH$1, destroy);
    on(EVENT_REFRESH$1, init);
    on([EVENT_UPDATED$1, EVENT_RESIZE], observe);
  }

  function init() {
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      emit(EVENT_RESIZE);
    }
  }

  function destroy() {
    remove$1(clones);
    empty$2(clones);
  }

  function observe() {
    if (cloneCount < computeCloneCount()) {
      emit(EVENT_REFRESH$1);
    }
  }

  function generate(count) {
    var slides = Slides.get().slice();
    var length = slides.length;

    if (length) {
      while (slides.length < count) {
        push$1(slides, slides);
      }

      push$1(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
        var isHead = index < count;
        var clone = cloneDeep(Slide.slide, index);
        isHead ? before(clone, slides[0].slide) : append$1(Elements.list, clone);
        push$1(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }

  function cloneDeep(elm, index) {
    var clone = elm.cloneNode(true);
    addClass$1(clone, options.classes.clone);
    clone.id = Splide2.root.id + "-clone" + pad$1(index + 1);
    return clone;
  }

  function computeCloneCount() {
    var clones2 = options.clones;

    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (!clones2) {
      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      var fixedCount = fixedSize && ceil$1(rect(Elements.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
    }

    return clones2;
  }

  return {
    mount: mount,
    destroy: destroy
  };
}

function Move(Splide2, Components2, options) {
  var _EventInterface5 = EventInterface$1(Splide2),
      on = _EventInterface5.on,
      emit = _EventInterface5.emit;

  var set = Splide2.state.set;
  var _Components2$Layout = Components2.Layout,
      slideSize = _Components2$Layout.slideSize,
      getPadding = _Components2$Layout.getPadding,
      totalSize = _Components2$Layout.totalSize,
      listSize = _Components2$Layout.listSize,
      sliderSize = _Components2$Layout.sliderSize;
  var _Components2$Directio = Components2.Direction,
      resolve = _Components2$Directio.resolve,
      orient = _Components2$Directio.orient;
  var _Components2$Elements3 = Components2.Elements,
      list = _Components2$Elements3.list,
      track = _Components2$Elements3.track;
  var Transition;

  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED$1, EVENT_REFRESH$1], reposition);
  }

  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }

  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }

    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, function () {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }

  function jump(index) {
    translate(toPosition(index, true));
  }

  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      var destination = preventLoop ? position : loop(position);
      style$1(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
      position !== destination && emit(EVENT_SHIFTED);
    }
  }

  function loop(position) {
    if (Splide2.is(LOOP)) {
      var index = toIndex(position);
      var exceededMax = index > Components2.Controller.getEnd();
      var exceededMin = index < 0;

      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }

    return position;
  }

  function shift(position, backwards) {
    var excess = position - getLimit(backwards);
    var size = sliderSize();
    position -= orient(size * (ceil$1(abs$1(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }

  function cancel() {
    translate(getPosition());
    Transition.cancel();
  }

  function toIndex(position) {
    var Slides = Components2.Slides.get();
    var index = 0;
    var minDistance = Infinity;

    for (var i = 0; i < Slides.length; i++) {
      var slideIndex = Slides[i].index;
      var distance = abs$1(toPosition(slideIndex, true) - position);

      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }

    return index;
  }

  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }

  function getPosition() {
    var left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }

  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize() - listSize()));
    }

    return position;
  }

  function offset(index) {
    var focus = options.focus;
    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
  }

  function getLimit(max) {
    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }

  function canShift(backwards) {
    var shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
  }

  function exceededLimit(max, position) {
    position = isUndefined$1(position) ? getPosition() : position;
    var exceededMin = max !== true && orient(position) < orient(getLimit(false));
    var exceededMax = max !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }

  return {
    mount: mount,
    move: move,
    jump: jump,
    translate: translate,
    shift: shift,
    cancel: cancel,
    toIndex: toIndex,
    toPosition: toPosition,
    getPosition: getPosition,
    getLimit: getLimit,
    exceededLimit: exceededLimit,
    reposition: reposition
  };
}

function Controller(Splide2, Components2, options) {
  var _EventInterface6 = EventInterface$1(Splide2),
      on = _EventInterface6.on;

  var Move = Components2.Move;
  var getPosition = Move.getPosition,
      getLimit = Move.getLimit,
      toPosition = Move.toPosition;
  var _Components2$Slides = Components2.Slides,
      isEnough = _Components2$Slides.isEnough,
      getLength = _Components2$Slides.getLength;
  var isLoop = Splide2.is(LOOP);
  var isSlide = Splide2.is(SLIDE);
  var getNext = apply$2(getAdjacent, false);
  var getPrev = apply$2(getAdjacent, true);
  var currIndex = options.start || 0;
  var prevIndex = currIndex;
  var slideCount;
  var perMove;
  var perPage;

  function mount() {
    init();
    on([EVENT_UPDATED$1, EVENT_REFRESH$1], init);
  }

  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    var index = clamp(currIndex, 0, slideCount - 1);

    if (index !== currIndex) {
      currIndex = index;
      Move.reposition();
    }
  }

  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      var dest = parse(control);
      var index = loop(dest);

      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move.move(dest, index, prevIndex, callback);
      }
    }
  }

  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, function () {
      setIndex(loop(Move.toIndex(getPosition())));
      callback && callback();
    });
  }

  function parse(control) {
    var index = currIndex;

    if (isString$1(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [],
          indicator = _ref[1],
          number = _ref[2];

      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, getEnd());
    }

    return index;
  }

  function getAdjacent(prev, destination) {
    var number = perMove || (hasFocus() ? 1 : perPage);
    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));

    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : getEnd();
      }
    }

    return destination ? dest : loop(dest);
  }

  function computeDestIndex(dest, from, snapPage) {
    if (isEnough()) {
      var end = getEnd();
      var index = computeMovableDestIndex(dest);

      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }

      if (dest < 0 || dest > end) {
        if (!perMove && (between(0, dest, from, true) || between(end, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? end : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }

    return dest;
  }

  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      var position = getPosition();

      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }

    return dest;
  }

  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }

  function getEnd() {
    return max$1(slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage), 0);
  }

  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, getEnd());
  }

  function toPage(index) {
    return hasFocus() ? index : floor$1((index >= getEnd() ? slideCount - 1 : index) / perPage);
  }

  function toDest(destination) {
    var closest = Move.toIndex(destination);
    return isSlide ? clamp(closest, 0, getEnd()) : closest;
  }

  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }

  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }

  function hasFocus() {
    return !isUndefined$1(options.focus) || options.isNavigation;
  }

  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }

  return {
    mount: mount,
    go: go,
    scroll: scroll,
    getNext: getNext,
    getPrev: getPrev,
    getAdjacent: getAdjacent,
    getEnd: getEnd,
    setIndex: setIndex,
    getIndex: getIndex,
    toIndex: toIndex,
    toPage: toPage,
    toDest: toDest,
    hasFocus: hasFocus,
    isBusy: isBusy
  };
}

var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
var SIZE = 40;

function Arrows(Splide2, Components2, options) {
  var event = EventInterface$1(Splide2);
  var on = event.on,
      bind = event.bind,
      emit = event.emit;
  var classes = options.classes,
      i18n = options.i18n;
  var Elements = Components2.Elements,
      Controller = Components2.Controller;
  var userArrows = Elements.arrows,
      track = Elements.track;
  var wrapper = userArrows;
  var prev = Elements.prev;
  var next = Elements.next;
  var created;
  var wrapperClasses;
  var arrows = {};

  function mount() {
    init();
    on(EVENT_UPDATED$1, remount);
  }

  function remount() {
    destroy();
    mount();
  }

  function init() {
    var enabled = options.arrows;

    if (enabled && !(prev && next)) {
      createArrows();
    }

    if (prev && next) {
      assign$2(arrows, {
        prev: prev,
        next: next
      });
      display(wrapper, enabled ? "" : "none");
      addClass$1(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

      if (enabled) {
        listen();
        update();
        setAttribute$1([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }

  function destroy() {
    event.destroy();
    removeClass$1(wrapper, wrapperClasses);

    if (created) {
      remove$1(userArrows ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute$1([prev, next], ALL_ATTRIBUTES);
    }
  }

  function listen() {
    on([EVENT_MOVED, EVENT_REFRESH$1, EVENT_SCROLLED], update);
    bind(next, "click", apply$2(go, ">"));
    bind(prev, "click", apply$2(go, "<"));
  }

  function go(control) {
    Controller.go(control, true);
  }

  function createArrows() {
    wrapper = userArrows || create$1("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append$1(wrapper, [prev, next]);
    !userArrows && before(wrapper, track);
  }

  function createArrow(prev2) {
    var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
    return parseHtml(arrow);
  }

  function update() {
    var index = Splide2.index;
    var prevIndex = Controller.getPrev();
    var nextIndex = Controller.getNext();
    var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
    var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
    prev.disabled = prevIndex < 0;
    next.disabled = nextIndex < 0;
    setAttribute$1(prev, ARIA_LABEL, prevLabel);
    setAttribute$1(next, ARIA_LABEL, nextLabel);
    emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
  }

  return {
    arrows: arrows,
    mount: mount,
    destroy: destroy
  };
}

var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

function Autoplay(Splide2, Components2, options) {
  var _EventInterface7 = EventInterface$1(Splide2),
      on = _EventInterface7.on,
      bind = _EventInterface7.bind,
      emit = _EventInterface7.emit;

  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
  var isPaused = interval.isPaused;
  var Elements = Components2.Elements,
      _Components2$Elements4 = Components2.Elements,
      root = _Components2$Elements4.root,
      toggle = _Components2$Elements4.toggle;
  var autoplay = options.autoplay;
  var hovered;
  var focused;
  var stopped = autoplay === "pause";

  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute$1(toggle, ARIA_CONTROLS, Elements.track.id);
      stopped || play();
      update();
    }
  }

  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", function (e) {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }

    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", function (e) {
        focused = e.type === "focusin";
        autoToggle();
      });
    }

    if (toggle) {
      bind(toggle, "click", function () {
        stopped ? play() : pause(true);
      });
    }

    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH$1], interval.rewind);
    on(EVENT_MOVE, onMove);
  }

  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }

  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }

    stopped = !!stop;
    update();

    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }

  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }

  function update() {
    if (toggle) {
      toggleClass$1(toggle, CLASS_ACTIVE, !stopped);
      setAttribute$1(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }

  function onAnimationFrame(rate) {
    var bar = Elements.bar;
    bar && style$1(bar, "width", rate * 100 + "%");
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }

  function onMove(index) {
    var Slide = Components2.Slides.getAt(index);
    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }

  return {
    mount: mount,
    destroy: interval.cancel,
    play: play,
    pause: pause,
    isPaused: isPaused
  };
}

function Cover(Splide2, Components2, options) {
  var _EventInterface8 = EventInterface$1(Splide2),
      on = _EventInterface8.on;

  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, apply$2(toggle, true));
      on([EVENT_MOUNTED, EVENT_UPDATED$1, EVENT_REFRESH$1], apply$2(cover, true));
    }
  }

  function cover(cover2) {
    Components2.Slides.forEach(function (Slide) {
      var img = child$1(Slide.container || Slide.slide, "img");

      if (img && img.src) {
        toggle(cover2, img, Slide);
      }
    });
  }

  function toggle(cover2, img, Slide) {
    Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
    display(img, cover2 ? "none" : "");
  }

  return {
    mount: mount,
    destroy: apply$2(cover, false)
  };
}

var BOUNCE_DIFF_THRESHOLD = 10;
var BOUNCE_DURATION = 600;
var FRICTION_FACTOR = 0.6;
var BASE_VELOCITY = 1.5;
var MIN_DURATION = 800;

function Scroll(Splide2, Components2, options) {
  var _EventInterface9 = EventInterface$1(Splide2),
      on = _EventInterface9.on,
      emit = _EventInterface9.emit;

  var set = Splide2.state.set;
  var Move = Components2.Move;
  var getPosition = Move.getPosition,
      getLimit = Move.getLimit,
      exceededLimit = Move.exceededLimit,
      translate = Move.translate;
  var interval;
  var callback;
  var friction = 1;

  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED$1, EVENT_REFRESH$1], cancel);
  }

  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    var from = getPosition();
    clear();

    if (snap) {
      var size = Components2.Layout.sliderSize();
      var offset = sign(destination) * size * floor$1(abs$1(destination) / size) || 0;
      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }

    var noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max$1(abs$1(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply$2(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }

  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }

  function update(from, to, noConstrain, rate) {
    var position = getPosition();
    var target = from + (to - from) * easing(rate);
    var diff = (target - position) * friction;
    translate(position + diff);

    if (Splide2.is(SLIDE) && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;

      if (abs$1(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }

  function clear() {
    if (interval) {
      interval.cancel();
    }
  }

  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }

  function easing(t) {
    var easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }

  return {
    mount: mount,
    destroy: clear,
    scroll: scroll,
    cancel: cancel
  };
}

var SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true
};

function Drag(Splide2, Components2, options) {
  var _EventInterface10 = EventInterface$1(Splide2),
      on = _EventInterface10.on,
      emit = _EventInterface10.emit,
      bind = _EventInterface10.bind,
      unbind = _EventInterface10.unbind;

  var state = Splide2.state;
  var Move = Components2.Move,
      Scroll = Components2.Scroll,
      Controller = Components2.Controller,
      track = Components2.Elements.track,
      reduce = Components2.Media.reduce;
  var _Components2$Directio2 = Components2.Direction,
      resolve = _Components2$Directio2.resolve,
      orient = _Components2$Directio2.orient;
  var getPosition = Move.getPosition,
      exceededLimit = Move.exceededLimit;
  var basePosition;
  var baseEvent;
  var prevBaseEvent;
  var isFree;
  var dragging;
  var exceeded = false;
  var clickPrevented;
  var disabled;
  var target;

  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, {
      capture: true
    });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED$1], init);
  }

  function init() {
    var drag = options.drag;
    disable(!drag);
    isFree = drag === "free";
  }

  function onPointerDown(e) {
    clickPrevented = false;

    if (!disabled) {
      var isTouch = isTouchEvent(e);

      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move.cancel();
          Scroll.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }

  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }

    if (e.cancelable) {
      if (dragging) {
        Move.translate(basePosition + constrain(diffCoord(e)));
        var expired = diffTime(e) > LOG_INTERVAL;
        var hasExceeded = exceeded !== (exceeded = exceededLimit());

        if (expired || hasExceeded) {
          save(e);
        }

        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }

  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }

    if (dragging) {
      move(e);
      prevent(e);
    }

    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }

  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }

  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }

  function move(e) {
    var velocity = computeVelocity(e);
    var destination = computeDestination(velocity);
    var rewind = options.rewind && options.rewindByDrag;
    reduce(false);

    if (isFree) {
      Controller.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller.go(Controller.toDest(destination), true);
    }

    reduce(true);
  }

  function shouldStart(e) {
    var thresholds = options.dragMinThreshold;
    var isObj = isObject$1(thresholds);
    var mouse = isObj && thresholds.mouse || 0;
    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs$1(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }

  function isSliderDirection(e) {
    return abs$1(diffCoord(e)) > abs$1(diffCoord(e, true));
  }

  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !exceeded) {
      var time = diffTime(e);

      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }

    return 0;
  }

  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min$1(abs$1(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }

  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }

  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }

  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }

  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
  }

  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }

  function isDraggable(target2) {
    var noDrag = options.noDrag;
    return !matches$1(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches$1(target2, noDrag));
  }

  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }

  function isDragging() {
    return dragging;
  }

  function disable(value) {
    disabled = value;
  }

  return {
    mount: mount,
    disable: disable,
    isDragging: isDragging
  };
}

var NORMALIZATION_MAP = {
  Spacebar: " ",
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN
};

function normalizeKey(key) {
  key = isString$1(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}

var KEYBOARD_EVENT = "keydown";

function Keyboard(Splide2, Components2, options) {
  var _EventInterface11 = EventInterface$1(Splide2),
      on = _EventInterface11.on,
      bind = _EventInterface11.bind,
      unbind = _EventInterface11.unbind;

  var root = Splide2.root;
  var resolve = Components2.Direction.resolve;
  var target;
  var disabled;

  function mount() {
    init();
    on(EVENT_UPDATED$1, destroy);
    on(EVENT_UPDATED$1, init);
    on(EVENT_MOVE, onMove);
  }

  function init() {
    var keyboard = options.keyboard;

    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }

  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }

  function disable(value) {
    disabled = value;
  }

  function onMove() {
    var _disabled = disabled;
    disabled = true;
    nextTick(function () {
      disabled = _disabled;
    });
  }

  function onKeydown(e) {
    if (!disabled) {
      var key = normalizeKey(e);

      if (key === resolve(ARROW_LEFT)) {
        Splide2.go("<");
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide2.go(">");
      }
    }
  }

  return {
    mount: mount,
    destroy: destroy,
    disable: disable
  };
}

var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

function LazyLoad(Splide2, Components2, options) {
  var _EventInterface12 = EventInterface$1(Splide2),
      on = _EventInterface12.on,
      off = _EventInterface12.off,
      bind = _EventInterface12.bind,
      emit = _EventInterface12.emit;

  var isSequential = options.lazyLoad === "sequential";
  var events = [EVENT_MOUNTED, EVENT_REFRESH$1, EVENT_MOVED, EVENT_SCROLLED];
  var entries = [];

  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH$1, init);
      isSequential || on(events, observe);
    }
  }

  function init() {
    empty$2(entries);
    Components2.Slides.forEach(function (Slide) {
      queryAll$1(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

        if (src !== img.src || srcset !== img.srcset) {
          var className = options.classes.spinner;
          var parent = img.parentElement;
          var spinner = child$1(parent, "." + className) || create$1("span", className, parent);
          entries.push([img, Slide, spinner]);
          img.src || display(img, "none");
        }
      });
    });
    isSequential && loadNext();
  }

  function observe() {
    entries = entries.filter(function (data) {
      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }

  function load(data) {
    var img = data[0];
    addClass$1(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply$2(onLoad, data));
    setAttribute$1(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute$1(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute$1(img, SRC_DATA_ATTRIBUTE);
    removeAttribute$1(img, SRCSET_DATA_ATTRIBUTE);
  }

  function onLoad(data, e) {
    var img = data[0],
        Slide = data[1];
    removeClass$1(Slide.slide, CLASS_LOADING);

    if (e.type !== "error") {
      remove$1(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
      emit(EVENT_RESIZE);
    }

    isSequential && loadNext();
  }

  function loadNext() {
    entries.length && load(entries.shift());
  }

  return {
    mount: mount,
    destroy: apply$2(empty$2, entries)
  };
}

function Pagination(Splide2, Components2, options) {
  var event = EventInterface$1(Splide2);
  var on = event.on,
      emit = event.emit,
      bind = event.bind;
  var Slides = Components2.Slides,
      Elements = Components2.Elements,
      Controller = Components2.Controller;
  var hasFocus = Controller.hasFocus,
      getIndex = Controller.getIndex,
      go = Controller.go;
  var resolve = Components2.Direction.resolve;
  var items = [];
  var list;
  var paginationClasses;

  function mount() {
    destroy();
    on([EVENT_UPDATED$1, EVENT_REFRESH$1], mount);

    if (options.pagination && Slides.isEnough()) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list: list,
        items: items
      }, getAt(Splide2.index));
    }
  }

  function destroy() {
    if (list) {
      remove$1(Elements.pagination ? slice$2(list.children) : list);
      removeClass$1(list, paginationClasses);
      empty$2(items);
      list = null;
    }

    event.destroy();
  }

  function createPagination() {
    var length = Splide2.length;
    var classes = options.classes,
        i18n = options.i18n,
        perPage = options.perPage;
    var max = hasFocus() ? length : ceil$1(length / perPage);
    list = Elements.pagination || create$1("ul", classes.pagination, Elements.track.parentElement);
    addClass$1(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
    setAttribute$1(list, ROLE, "tablist");
    setAttribute$1(list, ARIA_LABEL, i18n.select);
    setAttribute$1(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

    for (var i = 0; i < max; i++) {
      var li = create$1("li", null, list);
      var button = create$1("button", {
        class: classes.page,
        type: "button"
      }, li);
      var controls = Slides.getIn(i).map(function (Slide) {
        return Slide.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", apply$2(onClick, i));

      if (options.paginationKeyboard) {
        bind(button, "keydown", apply$2(onKeydown, i));
      }

      setAttribute$1(li, ROLE, "presentation");
      setAttribute$1(button, ROLE, "tab");
      setAttribute$1(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute$1(button, ARIA_LABEL, format(text, i + 1));
      setAttribute$1(button, TAB_INDEX, -1);
      items.push({
        li: li,
        button: button,
        page: i
      });
    }
  }

  function onClick(page) {
    go(">" + page, true);
  }

  function onKeydown(page, e) {
    var length = items.length;
    var key = normalizeKey(e);
    var dir = getDirection();
    var nextPage = -1;

    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }

    var item = items[nextPage];

    if (item) {
      focus(item.button);
      go(">" + nextPage);
      prevent(e, true);
    }
  }

  function getDirection() {
    return options.paginationDirection || options.direction;
  }

  function getAt(index) {
    return items[Controller.toPage(index)];
  }

  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());

    if (prev) {
      var button = prev.button;
      removeClass$1(button, CLASS_ACTIVE);
      removeAttribute$1(button, ARIA_SELECTED);
      setAttribute$1(button, TAB_INDEX, -1);
    }

    if (curr) {
      var _button = curr.button;
      addClass$1(_button, CLASS_ACTIVE);
      setAttribute$1(_button, ARIA_SELECTED, true);
      setAttribute$1(_button, TAB_INDEX, "");
    }

    emit(EVENT_PAGINATION_UPDATED, {
      list: list,
      items: items
    }, prev, curr);
  }

  return {
    items: items,
    mount: mount,
    destroy: destroy,
    getAt: getAt,
    update: update
  };
}

var TRIGGER_KEYS = [" ", "Enter"];

function Sync(Splide2, Components2, options) {
  var isNavigation = options.isNavigation,
      slideFocus = options.slideFocus;
  var events = [];

  function setup() {
    Splide2.options = {
      slideFocus: isUndefined$1(slideFocus) ? isNavigation : slideFocus
    };
  }

  function mount() {
    Splide2.splides.forEach(function (target) {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });

    if (isNavigation) {
      navigate();
    }
  }

  function destroy() {
    events.forEach(function (event) {
      event.destroy();
    });
    empty$2(events);
  }

  function remount() {
    destroy();
    mount();
  }

  function sync(splide, target) {
    var event = EventInterface$1(splide);
    event.on(EVENT_MOVE, function (index, prev, dest) {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }

  function navigate() {
    var event = EventInterface$1(Splide2);
    var on = event.on;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED$1], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }

  function update() {
    setAttribute$1(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
  }

  function onClick(Slide) {
    Splide2.go(Slide.index);
  }

  function onKeydown(Slide, e) {
    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
      onClick(Slide);
      prevent(e);
    }
  }

  return {
    setup: setup,
    mount: mount,
    destroy: destroy,
    remount: remount
  };
}

function Wheel(Splide2, Components2, options) {
  var _EventInterface13 = EventInterface$1(Splide2),
      bind = _EventInterface13.bind;

  var lastTime = 0;

  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }

  function onWheel(e) {
    if (e.cancelable) {
      var deltaY = e.deltaY;
      var backwards = deltaY < 0;
      var timeStamp = timeOf(e);

      var _min = options.wheelMinThreshold || 0;

      var sleep = options.wheelSleep || 0;

      if (abs$1(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }

      shouldPrevent(backwards) && prevent(e);
    }
  }

  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }

  return {
    mount: mount
  };
}

var SR_REMOVAL_DELAY = 90;

function Live(Splide2, Components2, options) {
  var _EventInterface14 = EventInterface$1(Splide2),
      on = _EventInterface14.on;

  var track = Components2.Elements.track;
  var enabled = options.live && !options.isNavigation;
  var sr = create$1("span", CLASS_SR);
  var interval = RequestInterval(SR_REMOVAL_DELAY, apply$2(toggle, false));

  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute$1(track, ARIA_ATOMIC, true);
      sr.textContent = "\u2026";
      on(EVENT_AUTOPLAY_PLAY, apply$2(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply$2(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply$2(toggle, true));
    }
  }

  function toggle(active) {
    setAttribute$1(track, ARIA_BUSY, active);

    if (active) {
      append$1(track, sr);
      interval.start();
    } else {
      remove$1(sr);
    }
  }

  function destroy() {
    removeAttribute$1(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove$1(sr);
  }

  function disable(disabled) {
    if (enabled) {
      setAttribute$1(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }

  return {
    mount: mount,
    disable: disable,
    destroy: destroy
  };
}

var ComponentConstructors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Media: Media,
  Direction: Direction,
  Elements: Elements,
  Slides: Slides,
  Layout: Layout$1,
  Clones: Clones,
  Move: Move,
  Controller: Controller,
  Arrows: Arrows,
  Autoplay: Autoplay,
  Cover: Cover,
  Scroll: Scroll,
  Drag: Drag,
  Keyboard: Keyboard,
  LazyLoad: LazyLoad,
  Pagination: Pagination,
  Sync: Sync,
  Wheel: Wheel,
  Live: Live
});
var I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};
var DEFAULTS$1 = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};

function Fade(Splide2, Components2, options) {
  var _EventInterface15 = EventInterface$1(Splide2),
      on = _EventInterface15.on;

  function mount() {
    on([EVENT_MOUNTED, EVENT_REFRESH$1], function () {
      nextTick(function () {
        Components2.Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
      });
    });
  }

  function start(index, done) {
    var track = Components2.Elements.track;
    style$1(track, "height", unit$1(rect(track).height));
    nextTick(function () {
      done();
      style$1(track, "height", "");
    });
  }

  return {
    mount: mount,
    start: start,
    cancel: noop
  };
}

function Slide(Splide2, Components2, options) {
  var _EventInterface16 = EventInterface$1(Splide2),
      bind = _EventInterface16.bind;

  var Move = Components2.Move,
      Controller = Components2.Controller,
      Scroll = Components2.Scroll;
  var list = Components2.Elements.list;
  var transition = apply$2(style$1, list, "transition");
  var endCallback;

  function mount() {
    bind(list, "transitionend", function (e) {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }

  function start(index, done) {
    var destination = Move.toPosition(index, true);
    var position = Move.getPosition();
    var speed = getSpeed(index);

    if (abs$1(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll.scroll(destination, speed, false, done);
      } else {
        transition("transform " + speed + "ms " + options.easing);
        Move.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move.jump(index);
      done();
    }
  }

  function cancel() {
    transition("");
    Scroll.cancel();
  }

  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;

    if (Splide2.is(SLIDE) && rewindSpeed) {
      var prev = Controller.getIndex(true);
      var end = Controller.getEnd();

      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }

    return options.speed;
  }

  return {
    mount: mount,
    start: start,
    cancel: cancel
  };
}

var _Splide = /*#__PURE__*/function () {
  function _Splide(target, options) {
    this.event = EventInterface$1();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    var root = isString$1(target) ? query(document, target) : target;
    assert$1(root, root + " is invalid.");
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS$1, _Splide.defaults, options || {});

    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert$1(false, "Invalid JSON");
    }

    this._o = Object.create(merge({}, options));
  }

  var _proto = _Splide.prototype;

  _proto.mount = function mount(Extensions, Transition) {
    var _this = this;

    var state = this.state,
        Components2 = this.Components;
    assert$1(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    var Constructors = assign$2({}, ComponentConstructors, this._E, {
      Transition: this._T
    });
    forOwn$2(Constructors, function (Component, key) {
      var component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn$2(Components2, function (component) {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass$1(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };

  _proto.sync = function sync(splide) {
    this.splides.push({
      splide: splide
    });
    splide.splides.push({
      splide: this,
      isParent: true
    });

    if (this.state.is(IDLE)) {
      this._C.Sync.remount();

      splide.Components.Sync.remount();
    }

    return this;
  };

  _proto.go = function go(control) {
    this._C.Controller.go(control);

    return this;
  };

  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  };

  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  };

  _proto.emit = function emit(event) {
    var _this$event;

    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice$2(arguments, 1)));

    return this;
  };

  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);

    return this;
  };

  _proto.remove = function remove(matcher) {
    this._C.Slides.remove(matcher);

    return this;
  };

  _proto.is = function is(type) {
    return this._o.type === type;
  };

  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH$1);
    return this;
  };

  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }

    var event = this.event,
        state = this.state;

    if (state.is(CREATED)) {
      EventInterface$1(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn$2(this._C, function (component) {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY$1);
      event.destroy();
      completely && empty$2(this.splides);
      state.set(DESTROYED);
    }

    return this;
  };

  _createClass(_Splide, [{
    key: "options",
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._C.Slides.getLength(true);
    }
  }, {
    key: "index",
    get: function get() {
      return this._C.Controller.getIndex();
    }
  }]);

  return _Splide;
}();

var Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;

function carouselBanner() {
  var carousel = new Splide(".bannerCarousel.splide", {
    perPage: 1,
    arrow: true,
    pagination: false
  });
  carousel.mount();
}

function carouselJackpot() {
  var carousel = new Splide(".jackpot__carousel", {
    pagination: false,
    arrows: true,
    perPage: 4,
    perMove: 1,
    gap: 15,
    breakpoints: {
      1600: {
        perPage: 3
      },
      1200: {
        perPage: 2,
        arrows: false
      }
    }
  });
  carousel.mount();
}

function carouselBets() {
  var carousel = new Splide(".carouselBets__carousel", {
    pagination: false,
    arrows: true,
    perPage: 5,
    perMove: 1,
    gap: 15,
    breakpoints: {
      1600: {
        perPage: 4
      },
      1200: {
        perPage: 3
      },
      992: {
        perPage: 2,
        padding: {
          left: 0,
          right: 50
        },
        arrows: false
      },
      767: {
        perPage: 1,
        padding: {
          left: 0,
          right: 50
        },
        arrows: false
      }
    }
  });
  carousel.mount();
}

const arrowArr = document.getElementsByClassName("js-arrow__grid");
const gridArr = document.getElementsByClassName("gridHalf__grid");

function collapseGrid() {
  for (let n = 0; n < arrowArr.length; n++) {
    arrowArr[n].addEventListener("click", () => {
      if (gridArr[n].classList.contains("active")) {
        gsap.timeline().to(arrowArr[n], {
          rotation: -90,
          duration: 0.3
        }).to(gridArr[n], {
          opacity: 0,
          duration: 0.6
        }).to(gridArr[n], {
          height: 0,
          duration: 0.3
        });
        gridArr[n].classList.remove("active");
      } else {
        gsap.timeline().to(arrowArr[n], {
          rotation: 0,
          duration: 0.3
        }).to(gridArr[n], {
          height: "auto",
          duration: 0.3
        }).to(gridArr[n], {
          opacity: 1,
          duration: 0.6
        });
        gridArr[n].classList.add("active");
      }
    });
  }
}

const hearts$1 = document.querySelectorAll(".is-favourite");

const filterCasino = () => {
  hearts$1.forEach(heart => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fav");

      if (heart.classList.contains("fav")) {
        heart.parentElement.parentElement.classList.add("favorito");
      } else {
        heart.parentElement.parentElement.classList.remove("favorito");
      }
    });
  });
  var mixerCasino = mixitup(".casinoFinder", {
    multifilter: {
      enable: true
    },
    controls: {
      enable: true
    },
    animation: {
      enable: false
    }
  });
  const container = document.querySelector(".casinoFinder");
  let totalContainer = document.querySelector("#is-showing");
  let items = document.querySelectorAll(".mix");
  let itemsHidden = document.querySelectorAll('.mix[style="display: none;"]');
  let itemsLeft = items.length - itemsHidden.length;
  document.querySelector('#removeFilters');
  totalContainer.innerText = items.length;
  console.log(mixerCasino.isMixing());
  container.addEventListener("mixEnd", () => {
    totalContainer.innerText = itemsLeft;
    console.log(mixerCasino.isMixing());
  }); // container.addEventListener("mixStart", () => {
  //   if (!mixerCasino.isMixing()) {
  //     removeBtn.style.display = "none";
  //   } else if (mixerCasino.isMixing()) {
  //     removeBtn.style.display = "inline-block";
  //   }
  // });
};

const filterPromo = () => {
  mixitup(".finder__promo", {
    controls: {
      enable: true
    },
    animation: {
      enable: false
    }
  });
  var carouselPromo = new Splide(".filter__promo .splide", {
    pagination: false,
    arrows: false,
    perPage: 3,
    padding: {
      left: 0,
      right: 30
    },
    perMove: 1,
    gap: 5
  });
  carouselPromo.mount();
};

const tags = document.querySelectorAll(".o-filter--slots-tag");
const hearts = document.querySelectorAll(".o-grid--games-fav");

const filterSlotsAll = () => {
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("fav");

      if (heart.classList.contains("fav")) {
        heart.parentElement.parentElement.classList.add("favorito");
      } else {
        heart.parentElement.parentElement.classList.remove("favorito");
      }
    });
  });
  tags.forEach(tag => {
    tag.addEventListener("click", e => {
      if (e.currentTarget.classList.contains("mixitup-control-active")) {
        e.currentTarget.firstElementChild.setAttribute("src", "img/icon-filter-noActive.svg");
      } else {
        e.currentTarget.firstElementChild.setAttribute("src", "img/icon-filter-active.svg");
      }
    });
  });
  mixitup(".m-slots--finder", {
    multifilter: {
      enable: true
    },
    controls: {
      enable: true
    },
    animation: {
      enable: false
    }
  });
};

function menuPoker() {
  const menuBtns = document.querySelectorAll(".menuPoker__btn");
  menuBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      menuBtns.forEach(btn => {
        btn.classList.remove("is-active");
      });
      e.currentTarget.classList.toggle("is-active");
    });
  });
}

function accorPoker() {
  const accorArrows = document.getElementsByClassName("accorArrow");
  const accorBody = document.getElementsByClassName("body");

  for (let n = 0; n < accorArrows.length; n++) {
    accorArrows[n].addEventListener("click", () => {
      if (accorBody[n].classList.contains("active")) {
        gsap.timeline().to(accorArrows[n], {
          rotation: -90,
          duration: 0.3
        }).to(accorBody[n], {
          opacity: 0,
          duration: 0.3
        }).to(accorBody[n], {
          height: 0,
          padding: 0,
          duration: 0.3
        });
        accorBody[n].classList.remove("active");
      } else {
        gsap.timeline().to(accorArrows[n], {
          rotation: 0,
          duration: 0.3
        }).to(accorBody[n], {
          height: "auto",
          padding: 15,
          duration: 0.3
        }).to(accorBody[n], {
          opacity: 1,
          duration: 0.3
        });
        accorBody[n].classList.add("active");
      }
    });
  }
}

/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.4.1
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
function empty$1(array) {
  array.length = 0;
}

function slice$1(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}

function apply$1(func) {
  return func.bind.apply(func, [null].concat(slice$1(arguments, 1)));
}

function typeOf$1(type, subject) {
  return typeof subject === type;
}

var isArray$1 = Array.isArray;
apply$1(typeOf$1, "function");
apply$1(typeOf$1, "string");
apply$1(typeOf$1, "undefined");

function toArray$1(value) {
  return isArray$1(value) ? value : [value];
}

function forEach$1(values, iteratee) {
  toArray$1(values).forEach(iteratee);
}

var ownKeys$1 = Object.keys;

function forOwn$1(object, iteratee, right) {
  if (object) {
    var keys = ownKeys$1(object);
    keys = right ? keys.reverse() : keys;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}

function assign$1(object) {
  slice$1(arguments, 1).forEach(function (source) {
    forOwn$1(source, function (value, key) {
      object[key] = source[key];
    });
  });
  return object;
}

var PROJECT_CODE$1 = "splide";

function EventBinder() {
  var listeners = [];

  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function (target, event, namespace) {
      var isEventTarget = ("addEventListener" in target);
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }

  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function (target, event, namespace) {
      listeners = listeners.filter(function (listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }

        return true;
      });
    });
  }

  function dispatch(target, type, detail) {
    var e;
    var bubbles = true;

    if (typeof CustomEvent === "function") {
      e = new CustomEvent(type, {
        bubbles: bubbles,
        detail: detail
      });
    } else {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, false, detail);
    }

    target.dispatchEvent(e);
    return e;
  }

  function forEachEvent(targets, events, iteratee) {
    forEach$1(targets, function (target) {
      target && forEach$1(events, function (events2) {
        events2.split(" ").forEach(function (eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }

  function destroy() {
    listeners.forEach(function (data) {
      data[4]();
    });
    empty$1(listeners);
  }

  return {
    bind: bind,
    unbind: unbind,
    dispatch: dispatch,
    destroy: destroy
  };
}

var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_DESTROY = "destroy";

function EventInterface(Splide2) {
  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  var binder = EventBinder();

  function on(events, callback) {
    binder.bind(bus, toArray$1(events).join(" "), function (e) {
      callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
    });
  }

  function emit(event) {
    binder.dispatch(bus, event, slice$1(arguments, 1));
  }

  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY, binder.destroy);
  }

  return assign$1(binder, {
    bus: bus,
    on: on,
    off: apply$1(binder.unbind, bus),
    emit: emit
  });
}

var CLASS_ROOT = PROJECT_CODE$1;
var CLASS_SLIDE = PROJECT_CODE$1 + "__slide";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";

function empty(array) {
  array.length = 0;
}

function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}

function apply(func) {
  return func.bind(null, ...slice(arguments, 1));
}

function typeOf(type, subject) {
  return typeof subject === type;
}

function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}

const isArray = Array.isArray;
apply(typeOf, "function");
const isString = apply(typeOf, "string");
const isUndefined = apply(typeOf, "undefined");

function isNull(subject) {
  return subject === null;
}

function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}

function toArray(value) {
  return isArray(value) ? value : [value];
}

function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

function push(array, items) {
  array.push(...toArray(items));
  return array;
}

function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, name => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}

function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}

function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

function children(parent, selector) {
  const children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter(child => matches(child, selector)) : children2;
}

function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}

const ownKeys = Object.keys;

function forOwn(object, iteratee, right) {
  if (object) {
    let keys = ownKeys(object);
    keys = right ? keys.reverse() : keys;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }

  return object;
}

function assign(object) {
  slice(arguments, 1).forEach(source => {
    forOwn(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

function omit(object, keys) {
  toArray(keys || ownKeys(object)).forEach(key => {
    delete object[key];
  });
}

function removeAttribute(elms, attrs) {
  forEach(elms, elm => {
    forEach(attrs, attr => {
      elm && elm.removeAttribute(attr);
    });
  });
}

function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, elm => {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}

function create(tag, attrs, parent) {
  const elm = document.createElement(tag);

  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }

  parent && append(parent, elm);
  return elm;
}

function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }

  if (!isNull(value)) {
    elm.style[prop] = `${value}`;
  }
}

function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}

function remove(nodes) {
  forEach(nodes, node => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}

function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}

function unit(value) {
  return isString(value) ? value : value ? `${value}px` : "";
}

const PROJECT_CODE = "splide";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[${PROJECT_CODE}] ${message || ""}`);
  }
}

const {
  min,
  max,
  floor,
  ceil,
  abs
} = Math;

function pad(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

const CLASS_SLIDE_ROW = `${CLASS_SLIDE}__row`;
const CLASS_SLIDE_COL = `${CLASS_SLIDE}--col`;
const DEFAULTS = {
  rows: 1,
  cols: 1,
  dimensions: [],
  gap: {}
};

function Dimension(options) {
  function normalize() {
    const {
      rows,
      cols,
      dimensions
    } = options;
    return isArray(dimensions) && dimensions.length ? dimensions : [[rows, cols]];
  }

  function get(index) {
    const dimensions = normalize();
    return dimensions[min(index, dimensions.length - 1)];
  }

  function getAt(index) {
    const dimensions = normalize();
    let rows,
        cols,
        aggregator = 0;

    for (let i = 0; i < dimensions.length; i++) {
      const dimension = dimensions[i];
      rows = dimension[0] || 1;
      cols = dimension[1] || 1;
      aggregator += rows * cols;

      if (index < aggregator) {
        break;
      }
    }

    assert(rows && cols, "Invalid dimension");
    return [rows, cols];
  }

  return {
    get,
    getAt
  };
}

function Layout(Splide2, gridOptions, Dimension) {
  const {
    on,
    destroy: destroyEvent
  } = EventInterface(Splide2);
  const {
    Components,
    options
  } = Splide2;
  const {
    resolve
  } = Components.Direction;
  const {
    forEach
  } = Components.Slides;

  function mount() {
    layout();

    if (options.slideFocus) {
      on(EVENT_VISIBLE, onVisible);
      on(EVENT_HIDDEN, onHidden);
    }
  }

  function destroy() {
    forEach(Slide => {
      const {
        slide
      } = Slide;
      toggleTabIndex(slide, false);
      getRowsIn(slide).forEach(cell => {
        removeAttribute(cell, "style");
      });
      getColsIn(slide).forEach(colSlide => {
        cover(colSlide, true);
        removeAttribute(colSlide, "style");
      });
    });
    destroyEvent();
  }

  function layout() {
    forEach(Slide => {
      const {
        slide
      } = Slide;
      const [rows, cols] = Dimension.get(Slide.isClone ? Slide.slideIndex : Slide.index);
      layoutRow(rows, slide);
      layoutCol(cols, slide);
      getColsIn(Slide.slide).forEach((colSlide, index) => {
        colSlide.id = `${Slide.slide.id}-col${pad(index + 1)}`;

        if (Splide2.options.cover) {
          cover(colSlide);
        }
      });
    });
  }

  function layoutRow(rows, slide) {
    const {
      row: rowGap
    } = gridOptions.gap;
    const height = `calc(${100 / rows}%${rowGap ? ` - ${unit(rowGap)} * ${(rows - 1) / rows}` : ""})`;
    getRowsIn(slide).forEach((rowElm, index, rowElms) => {
      style(rowElm, "height", height);
      style(rowElm, "display", "flex");
      style(rowElm, "margin", `0 0 ${unit(rowGap)} 0`);
      style(rowElm, "padding", 0);

      if (index === rowElms.length - 1) {
        style(rowElm, "marginBottom", 0);
      }
    });
  }

  function layoutCol(cols, slide) {
    const {
      col: colGap
    } = gridOptions.gap;
    const width = `calc(${100 / cols}%${colGap ? ` - ${unit(colGap)} * ${(cols - 1) / cols}` : ""})`;
    getColsIn(slide).forEach((colElm, index, colElms) => {
      style(colElm, "width", width);

      if (index !== colElms.length - 1) {
        style(colElm, resolve("marginRight"), unit(colGap));
      }
    });
  }

  function cover(colSlide, uncover) {
    const container = child(colSlide, `.${CLASS_CONTAINER}`);
    const img = child(container || colSlide, "img");

    if (img && img.src) {
      style(container || colSlide, "background", uncover ? "" : `center/cover no-repeat url("${img.src}")`);
      style(img, "display", uncover ? "" : "none");
    }
  }

  function getRowsIn(slide) {
    return queryAll(slide, `.${CLASS_SLIDE_ROW}`);
  }

  function getColsIn(slide) {
    return queryAll(slide, `.${CLASS_SLIDE_COL}`);
  }

  function toggleTabIndex(slide, add) {
    getColsIn(slide).forEach(colSlide => {
      setAttribute(colSlide, "tabindex", add ? 0 : null);
    });
  }

  function onVisible(Slide) {
    toggleTabIndex(Slide.slide, true);
  }

  function onHidden(Slide) {
    toggleTabIndex(Slide.slide, false);
  }

  return {
    mount,
    destroy
  };
}

function Grid(Splide2, Components2, options) {
  const {
    on,
    off
  } = EventInterface(Splide2);
  const {
    Elements
  } = Components2;
  const gridOptions = {};
  const Dimension$1 = Dimension(gridOptions);
  const Layout$1 = Layout(Splide2, gridOptions, Dimension$1);
  const modifier = `${CLASS_ROOT}--grid`;
  const originalSlides = [];

  function mount() {
    init();
    on(EVENT_UPDATED, init);
  }

  function init() {
    omit(gridOptions);
    assign(gridOptions, DEFAULTS, options.grid || {});

    if (shouldBuild()) {
      destroy();
      push(originalSlides, Elements.slides);
      addClass(Splide2.root, modifier);
      append(Elements.list, build());
      off(EVENT_REFRESH);
      on(EVENT_REFRESH, layout);
      refresh();
    } else if (isActive()) {
      destroy();
      refresh();
    }
  }

  function destroy() {
    if (isActive()) {
      const {
        slides
      } = Elements;
      Layout$1.destroy();
      originalSlides.forEach(slide => {
        removeClass(slide, CLASS_SLIDE_COL);
        append(Elements.list, slide);
      });
      remove(slides);
      removeClass(Splide2.root, modifier);
      empty(slides);
      push(slides, originalSlides);
      empty(originalSlides);
      off(EVENT_REFRESH);
    }
  }

  function refresh() {
    Splide2.refresh();
  }

  function layout() {
    if (isActive()) {
      Layout$1.mount();
    }
  }

  function build() {
    const outerSlides = [];
    let row = 0,
        col = 0;
    let outerSlide, rowSlide;
    originalSlides.forEach((slide, index) => {
      const [rows, cols] = Dimension$1.getAt(index);

      if (!col) {
        if (!row) {
          outerSlide = create(slide.tagName, CLASS_SLIDE);
          outerSlides.push(outerSlide);
        }

        rowSlide = buildRow(rows, slide, outerSlide);
      }

      buildCol(cols, slide, rowSlide);

      if (++col >= cols) {
        col = 0;
        row = ++row >= rows ? 0 : row;
      }
    });
    return outerSlides;
  }

  function buildRow(rows, slide, outerSlide) {
    const tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
    return create(tag, CLASS_SLIDE_ROW, outerSlide);
  }

  function buildCol(cols, slide, rowSlide) {
    addClass(slide, CLASS_SLIDE_COL);
    append(rowSlide, slide);
    return slide;
  }

  function shouldBuild() {
    if (options.grid) {
      const {
        rows,
        cols,
        dimensions
      } = gridOptions;
      return rows > 1 || cols > 1 || isArray(dimensions) && dimensions.length > 0;
    }

    return false;
  }

  function isActive() {
    return hasClass(Splide2.root, modifier);
  }

  return {
    mount,
    destroy
  };
}

function carouselFull() {
  const gridFull = document.querySelector(".gridFull .splide");
  const order = gridFull.dataset.order - 1;
  const item = [1, 1];
  const arrDim = [[2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2]];
  arrDim.splice(order, 0, item);
  const splideGrid = new Splide(gridFull, {
    perPage: 4,
    perMove: 1,
    pagination: false,
    gap: 6,
    grid: {
      dimensions: arrDim,
      gap: {
        row: 6,
        col: 6
      }
    },
    breakpoints: {
      991: {
        perPage: 1,
        arrows: false,
        drag: 'free',
        grid: {
          rows: 2,
          cols: 2
        }
      }
    }
  });
  splideGrid.mount({
    Grid
  });
}

const carouselBannerExist = document.getElementsByClassName("bannerCarousel");
const carouselJackpotExist = document.getElementsByClassName("jackpot__carousel");
const carouselBetsExist = document.getElementsByClassName("carouselBets__carousel");
const gridHalfExist = document.getElementsByClassName("gridHalf");
const casinoFinderExist = document.getElementsByClassName("casinoFinder");
const slotsAllFinderExist = document.getElementsByClassName("m-slots--finder");
const promoFinderExist = document.getElementsByClassName("finder__promo");
const menuPokerExist = document.getElementsByClassName("menuPoker");
const carouselFullExist = document.getElementsByClassName("gridFull");
window.addEventListener("load", () => {
  if (carouselBannerExist.length > 0) {
    carouselBanner();
  }

  if (carouselJackpotExist.length > 0) {
    carouselJackpot();
  }

  if (carouselBetsExist.length > 0) {
    carouselBets();
  }

  if (gridHalfExist.length > 0) {
    collapseGrid();
  }

  if (casinoFinderExist.length > 0) {
    filterCasino();
  }

  if (slotsAllFinderExist.length > 0) {
    filterSlotsAll();
  }

  if (promoFinderExist.length > 0) {
    filterPromo();
  }

  if (menuPokerExist.length > 0) {
    menuPoker();
    accorPoker();
  }

  if (carouselFullExist.length > 0) {
    carouselFull();
  }
});
var carouselPoker = new Splide(".menuPoker .splide", {
  pagination: false,
  arrows: false,
  perPage: 3,
  padding: {
    left: 0,
    right: 30
  },
  perMove: 1
});
carouselPoker.mount();
//# sourceMappingURL=script.js.map
