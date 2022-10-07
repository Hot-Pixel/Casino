(function () {
  'use strict';

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

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

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass$1(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass$1(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = (ref || node).parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector ? children2.filter(function (child) {
      return matches(child, selector);
    }) : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = ownKeys(object);
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

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function omit(object, keys) {
    toArray(keys || ownKeys(object)).forEach(function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

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
      elm.style[prop] = "" + value;
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
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

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass$1(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
      max = Math.max,
      floor = Math.floor,
      ceil = Math.ceil,
      abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, minOrMax, maxOrMin, exclusive) {
    var minimum = min(minOrMax, maxOrMin);
    var maximum = max(minOrMax, maxOrMin);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
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
      forEach(targets, function (target) {
        target && forEach(events, function (events2) {
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
      empty(listeners);
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
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_SLIDE_KEYDOWN = "slide:keydown";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
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
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
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
      return includes(toArray(states), state);
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
    var binder = EventBinder();
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function (n, m) {
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
      omit(options);
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
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }

    function set(opts, user) {
      merge(options, opts);
      user && merge(Object.getPrototypeOf(options), opts);

      if (!state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
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
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = PROJECT_CODE + "__track";
  var CLASS_LIST = PROJECT_CODE + "__list";
  var CLASS_SLIDE = PROJECT_CODE + "__slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = PROJECT_CODE + "__arrows";
  var CLASS_ARROW = PROJECT_CODE + "__arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = PROJECT_CODE + "__pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = PROJECT_CODE + "__progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = PROJECT_CODE + "__toggle";
  var CLASS_SPINNER = PROJECT_CODE + "__spinner";
  var CLASS_SR = PROJECT_CODE + "__sr";
  var CLASS_INITIALIZED = "is-initialized";
  var CLASS_ACTIVE = "is-active";
  var CLASS_PREV = "is-prev";
  var CLASS_NEXT = "is-next";
  var CLASS_VISIBLE = "is-visible";
  var CLASS_LOADING = "is-loading";
  var CLASS_FOCUS_IN = "is-focus-in";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN];
  var CLASSES = {
    slide: CLASS_SLIDE,
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
      if (matches(elm, selector)) {
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
    var _EventInterface = EventInterface(Splide2),
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
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
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
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }

    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }

    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function (className, key) {
        elements[key] = find("." + className);
      });
      assign(elements, {
        root: root,
        track: track,
        list: list,
        slides: slides
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";

      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }

      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }

    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }

    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
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
    var container = child(slide, "." + CLASS_CONTAINER);
    var focusableNodes = queryAll(slide, options.focusableNodes || "");
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad$1(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }

      listen();
    }

    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }

    function initNavigation() {
      var controls = Splide2.splides.map(function (target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
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

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass$1(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);

      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }

      setAttribute(focusableNodes, TAB_INDEX, hidden ? -1 : "");

      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass$1(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }

      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }

    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
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
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
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
      style: style$1,
      isWithin: isWithin
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
        on = _EventInterface2.on,
        emit = _EventInterface2.emit,
        bind = _EventInterface2.bind;

    var _Components2$Elements = Components2.Elements,
        slides = _Components2$Elements.slides,
        list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
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
      empty(Slides2);
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
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(filter(matcher).map(function (Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
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
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
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
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      rootRect = null;
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize();
    }

    function resize() {
      var newRect = rect(root);

      if (!rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
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
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize() {
      return totalSize(Splide2.length - 1, true) - totalSize(-1, true);
    }

    function getGap() {
      var Slide = getAt(0);
      return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
    }

    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
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
    var _EventInterface4 = EventInterface(Splide2),
        on = _EventInterface4.on,
        emit = _EventInterface4.emit;

    var Elements = Components2.Elements,
        Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);
    }

    function init() {
      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        emit(EVENT_RESIZE);
      }
    }

    function destroy() {
      remove(clones);
      empty(clones);
    }

    function observe() {
      if (cloneCount < computeCloneCount()) {
        emit(EVENT_REFRESH);
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad$1(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (!clones2) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
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
    var _EventInterface5 = EventInterface(Splide2),
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
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
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
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
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
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
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
        var distance = abs(toPosition(slideIndex, true) - position);

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
      position = isUndefined(position) ? getPosition() : position;
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
    var _EventInterface6 = EventInterface(Splide2),
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
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH], init);
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

      if (isString(control)) {
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
      return max(slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage), 0);
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, getEnd());
    }

    function toPage(index) {
      return hasFocus() ? index : floor((index >= getEnd() ? slideCount - 1 : index) / perPage);
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
      return !isUndefined(options.focus) || options.isNavigation;
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
    var event = EventInterface(Splide2);
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
      on(EVENT_UPDATED, remount);
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
        assign(arrows, {
          prev: prev,
          next: next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);

        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }

    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);

      if (created) {
        remove(userArrows ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      on([EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }

    function go(control) {
      Controller.go(control, true);
    }

    function createArrows() {
      wrapper = userArrows || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
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
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
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
    var _EventInterface7 = EventInterface(Splide2),
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
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
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

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
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
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }

    function onAnimationFrame(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
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
    var _EventInterface8 = EventInterface(Splide2),
        on = _EventInterface8.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

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
      destroy: apply(cover, false)
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
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
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();

      if (snap) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }

      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
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

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
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
    var _EventInterface10 = EventInterface(Splide2),
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
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
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
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
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
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
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
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
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
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }

  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
        on = _EventInterface11.on,
        bind = _EventInterface11.bind,
        unbind = _EventInterface11.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
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
    var _EventInterface12 = EventInterface(Splide2),
        on = _EventInterface12.on,
        off = _EventInterface12.off,
        bind = _EventInterface12.bind,
        emit = _EventInterface12.emit;

    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOUNTED, EVENT_REFRESH, EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
        isSequential || on(events, observe);
      }
    }

    function init() {
      empty(entries);
      Components2.Slides.forEach(function (Slide) {
        queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
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
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }

    function onLoad(data, e) {
      var img = data[0],
          Slide = data[1];
      removeClass(Slide.slide, CLASS_LOADING);

      if (e.type !== "error") {
        remove(data[2]);
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
      destroy: apply(empty, entries)
    };
  }

  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
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
      on([EVENT_UPDATED, EVENT_REFRESH], mount);

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
        remove(Elements.pagination ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }

      event.destroy();
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
          i18n = options.i18n,
          perPage = options.perPage;
      var max = hasFocus() ? length : ceil(length / perPage);
      list = Elements.pagination || create("ul", classes.pagination, Elements.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));

        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }

        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
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
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }

      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
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
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
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
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function (index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
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
    var _EventInterface13 = EventInterface(Splide2),
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

        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
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
    var _EventInterface14 = EventInterface(Splide2),
        on = _EventInterface14.on;

    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }

    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);

      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
      }
    }

    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
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
    Layout: Layout,
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
  var DEFAULTS = {
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
    var _EventInterface15 = EventInterface(Splide2),
        on = _EventInterface15.on;

    function mount() {
      on([EVENT_MOUNTED, EVENT_REFRESH], function () {
        nextTick(function () {
          Components2.Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
        });
      });
    }

    function start(index, done) {
      var track = Components2.Elements.track;
      style(track, "height", unit(rect(track).height));
      nextTick(function () {
        done();
        style(track, "height", "");
      });
    }

    return {
      mount: mount,
      start: start,
      cancel: noop
    };
  }

  function Slide(Splide2, Components2, options) {
    var _EventInterface16 = EventInterface(Splide2),
        bind = _EventInterface16.bind;

    var Move = Components2.Move,
        Controller = Components2.Controller,
        Scroll = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
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

      if (abs(destination - position) >= 1 && speed >= 1) {
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
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide.defaults, options || {});

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._o = Object.create(merge({}, options));
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;

      var state = this.state,
          Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
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

      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));

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
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
          state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function (component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
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

  function carouselMenuHistory() {
    var carousel = new Splide(".splide", {
      pagination: false,
      arrows: false,
      perPage: 2,
      padding: { left: 0, right: 80 },
      perMove: 1,
      drag: "free",
      breakpoints: {
        768: {
          perPage: 3,
          padding: { left: 0, right: 80 },
        },
        576: {
          perPage: 2,
          padding: { left: 0, right: 80 },
        }
      }
    });

    carousel.mount();
  }

  var HOOKS = [
      "onChange",
      "onClose",
      "onDayCreate",
      "onDestroy",
      "onKeyDown",
      "onMonthChange",
      "onOpen",
      "onParseConfig",
      "onReady",
      "onValueUpdate",
      "onYearChange",
      "onPreCalendarPosition",
  ];
  var defaults = {
      _disable: [],
      allowInput: false,
      allowInvalidPreload: false,
      altFormat: "F j, Y",
      altInput: false,
      altInputClass: "form-control input",
      animate: typeof window === "object" &&
          window.navigator.userAgent.indexOf("MSIE") === -1,
      ariaDateFormat: "F j, Y",
      autoFillDefaultTime: true,
      clickOpens: true,
      closeOnSelect: true,
      conjunction: ", ",
      dateFormat: "Y-m-d",
      defaultHour: 12,
      defaultMinute: 0,
      defaultSeconds: 0,
      disable: [],
      disableMobile: false,
      enableSeconds: false,
      enableTime: false,
      errorHandler: function (err) {
          return typeof console !== "undefined" && console.warn(err);
      },
      getWeek: function (givenDate) {
          var date = new Date(givenDate.getTime());
          date.setHours(0, 0, 0, 0);
          date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
          var week1 = new Date(date.getFullYear(), 0, 4);
          return (1 +
              Math.round(((date.getTime() - week1.getTime()) / 86400000 -
                  3 +
                  ((week1.getDay() + 6) % 7)) /
                  7));
      },
      hourIncrement: 1,
      ignoredFocusElements: [],
      inline: false,
      locale: "default",
      minuteIncrement: 5,
      mode: "single",
      monthSelectorType: "dropdown",
      nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
      noCalendar: false,
      now: new Date(),
      onChange: [],
      onClose: [],
      onDayCreate: [],
      onDestroy: [],
      onKeyDown: [],
      onMonthChange: [],
      onOpen: [],
      onParseConfig: [],
      onReady: [],
      onValueUpdate: [],
      onYearChange: [],
      onPreCalendarPosition: [],
      plugins: [],
      position: "auto",
      positionElement: undefined,
      prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
      shorthandCurrentMonth: false,
      showMonths: 1,
      static: false,
      time_24hr: false,
      weekNumbers: false,
      wrap: false,
  };

  var english = {
      weekdays: {
          shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          longhand: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
          ],
      },
      months: {
          shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
          ],
          longhand: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
          ],
      },
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      firstDayOfWeek: 0,
      ordinal: function (nth) {
          var s = nth % 100;
          if (s > 3 && s < 21)
              return "th";
          switch (s % 10) {
              case 1:
                  return "st";
              case 2:
                  return "nd";
              case 3:
                  return "rd";
              default:
                  return "th";
          }
      },
      rangeSeparator: " to ",
      weekAbbreviation: "Wk",
      scrollTitle: "Scroll to increment",
      toggleTitle: "Click to toggle",
      amPM: ["AM", "PM"],
      yearAriaLabel: "Year",
      monthAriaLabel: "Month",
      hourAriaLabel: "Hour",
      minuteAriaLabel: "Minute",
      time_24hr: false,
  };

  var pad = function (number, length) {
      if (length === void 0) { length = 2; }
      return ("000" + number).slice(length * -1);
  };
  var int = function (bool) { return (bool === true ? 1 : 0); };
  function debounce(fn, wait) {
      var t;
      return function () {
          var _this = this;
          var args = arguments;
          clearTimeout(t);
          t = setTimeout(function () { return fn.apply(_this, args); }, wait);
      };
  }
  var arrayify = function (obj) {
      return obj instanceof Array ? obj : [obj];
  };

  function toggleClass(elem, className, bool) {
      if (bool === true)
          return elem.classList.add(className);
      elem.classList.remove(className);
  }
  function createElement(tag, className, content) {
      var e = window.document.createElement(tag);
      className = className || "";
      content = content || "";
      e.className = className;
      if (content !== undefined)
          e.textContent = content;
      return e;
  }
  function clearNode(node) {
      while (node.firstChild)
          node.removeChild(node.firstChild);
  }
  function findParent(node, condition) {
      if (condition(node))
          return node;
      else if (node.parentNode)
          return findParent(node.parentNode, condition);
      return undefined;
  }
  function createNumberInput(inputClassName, opts) {
      var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
      if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
          numInput.type = "number";
      }
      else {
          numInput.type = "text";
          numInput.pattern = "\\d*";
      }
      if (opts !== undefined)
          for (var key in opts)
              numInput.setAttribute(key, opts[key]);
      wrapper.appendChild(numInput);
      wrapper.appendChild(arrowUp);
      wrapper.appendChild(arrowDown);
      return wrapper;
  }
  function getEventTarget(event) {
      try {
          if (typeof event.composedPath === "function") {
              var path = event.composedPath();
              return path[0];
          }
          return event.target;
      }
      catch (error) {
          return event.target;
      }
  }

  var doNothing = function () { return undefined; };
  var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
  var revFormat = {
      D: doNothing,
      F: function (dateObj, monthName, locale) {
          dateObj.setMonth(locale.months.longhand.indexOf(monthName));
      },
      G: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      H: function (dateObj, hour) {
          dateObj.setHours(parseFloat(hour));
      },
      J: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      K: function (dateObj, amPM, locale) {
          dateObj.setHours((dateObj.getHours() % 12) +
              12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
      },
      M: function (dateObj, shortMonth, locale) {
          dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
      },
      S: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
      W: function (dateObj, weekNum, locale) {
          var weekNumber = parseInt(weekNum);
          var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
          date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
          return date;
      },
      Y: function (dateObj, year) {
          dateObj.setFullYear(parseFloat(year));
      },
      Z: function (_, ISODate) { return new Date(ISODate); },
      d: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      h: function (dateObj, hour) {
          dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
      },
      i: function (dateObj, minutes) {
          dateObj.setMinutes(parseFloat(minutes));
      },
      j: function (dateObj, day) {
          dateObj.setDate(parseFloat(day));
      },
      l: doNothing,
      m: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      n: function (dateObj, month) {
          dateObj.setMonth(parseFloat(month) - 1);
      },
      s: function (dateObj, seconds) {
          dateObj.setSeconds(parseFloat(seconds));
      },
      u: function (_, unixMillSeconds) {
          return new Date(parseFloat(unixMillSeconds));
      },
      w: doNothing,
      y: function (dateObj, year) {
          dateObj.setFullYear(2000 + parseFloat(year));
      },
  };
  var tokenRegex = {
      D: "",
      F: "",
      G: "(\\d\\d|\\d)",
      H: "(\\d\\d|\\d)",
      J: "(\\d\\d|\\d)\\w+",
      K: "",
      M: "",
      S: "(\\d\\d|\\d)",
      U: "(.+)",
      W: "(\\d\\d|\\d)",
      Y: "(\\d{4})",
      Z: "(.+)",
      d: "(\\d\\d|\\d)",
      h: "(\\d\\d|\\d)",
      i: "(\\d\\d|\\d)",
      j: "(\\d\\d|\\d)",
      l: "",
      m: "(\\d\\d|\\d)",
      n: "(\\d\\d|\\d)",
      s: "(\\d\\d|\\d)",
      u: "(.+)",
      w: "(\\d\\d|\\d)",
      y: "(\\d{2})",
  };
  var formats = {
      Z: function (date) { return date.toISOString(); },
      D: function (date, locale, options) {
          return locale.weekdays.shorthand[formats.w(date, locale, options)];
      },
      F: function (date, locale, options) {
          return monthToStr(formats.n(date, locale, options) - 1, false, locale);
      },
      G: function (date, locale, options) {
          return pad(formats.h(date, locale, options));
      },
      H: function (date) { return pad(date.getHours()); },
      J: function (date, locale) {
          return locale.ordinal !== undefined
              ? date.getDate() + locale.ordinal(date.getDate())
              : date.getDate();
      },
      K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
      M: function (date, locale) {
          return monthToStr(date.getMonth(), true, locale);
      },
      S: function (date) { return pad(date.getSeconds()); },
      U: function (date) { return date.getTime() / 1000; },
      W: function (date, _, options) {
          return options.getWeek(date);
      },
      Y: function (date) { return pad(date.getFullYear(), 4); },
      d: function (date) { return pad(date.getDate()); },
      h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
      i: function (date) { return pad(date.getMinutes()); },
      j: function (date) { return date.getDate(); },
      l: function (date, locale) {
          return locale.weekdays.longhand[date.getDay()];
      },
      m: function (date) { return pad(date.getMonth() + 1); },
      n: function (date) { return date.getMonth() + 1; },
      s: function (date) { return date.getSeconds(); },
      u: function (date) { return date.getTime(); },
      w: function (date) { return date.getDay(); },
      y: function (date) { return String(date.getFullYear()).substring(2); },
  };

  var createDateFormatter = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
      return function (dateObj, frmt, overrideLocale) {
          var locale = overrideLocale || l10n;
          if (config.formatDate !== undefined && !isMobile) {
              return config.formatDate(dateObj, frmt, locale);
          }
          return frmt
              .split("")
              .map(function (c, i, arr) {
              return formats[c] && arr[i - 1] !== "\\"
                  ? formats[c](dateObj, locale, config)
                  : c !== "\\"
                      ? c
                      : "";
          })
              .join("");
      };
  };
  var createDateParser = function (_a) {
      var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
      return function (date, givenFormat, timeless, customLocale) {
          if (date !== 0 && !date)
              return undefined;
          var locale = customLocale || l10n;
          var parsedDate;
          var dateOrig = date;
          if (date instanceof Date)
              parsedDate = new Date(date.getTime());
          else if (typeof date !== "string" &&
              date.toFixed !== undefined)
              parsedDate = new Date(date);
          else if (typeof date === "string") {
              var format = givenFormat || (config || defaults).dateFormat;
              var datestr = String(date).trim();
              if (datestr === "today") {
                  parsedDate = new Date();
                  timeless = true;
              }
              else if (config && config.parseDate) {
                  parsedDate = config.parseDate(date, format);
              }
              else if (/Z$/.test(datestr) ||
                  /GMT$/.test(datestr)) {
                  parsedDate = new Date(date);
              }
              else {
                  var matched = void 0, ops = [];
                  for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                      var token = format[i];
                      var isBackSlash = token === "\\";
                      var escaped = format[i - 1] === "\\" || isBackSlash;
                      if (tokenRegex[token] && !escaped) {
                          regexStr += tokenRegex[token];
                          var match = new RegExp(regexStr).exec(date);
                          if (match && (matched = true)) {
                              ops[token !== "Y" ? "push" : "unshift"]({
                                  fn: revFormat[token],
                                  val: match[++matchIndex],
                              });
                          }
                      }
                      else if (!isBackSlash)
                          regexStr += ".";
                  }
                  parsedDate =
                      !config || !config.noCalendar
                          ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                          : new Date(new Date().setHours(0, 0, 0, 0));
                  ops.forEach(function (_a) {
                      var fn = _a.fn, val = _a.val;
                      return (parsedDate = fn(parsedDate, val, locale) || parsedDate);
                  });
                  parsedDate = matched ? parsedDate : undefined;
              }
          }
          if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
              config.errorHandler(new Error("Invalid date provided: " + dateOrig));
              return undefined;
          }
          if (timeless === true)
              parsedDate.setHours(0, 0, 0, 0);
          return parsedDate;
      };
  };
  function compareDates(date1, date2, timeless) {
      if (timeless === void 0) { timeless = true; }
      if (timeless !== false) {
          return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
              new Date(date2.getTime()).setHours(0, 0, 0, 0));
      }
      return date1.getTime() - date2.getTime();
  }
  var isBetween = function (ts, ts1, ts2) {
      return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
  };
  var calculateSecondsSinceMidnight = function (hours, minutes, seconds) {
      return hours * 3600 + minutes * 60 + seconds;
  };
  var parseSeconds = function (secondsSinceMidnight) {
      var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
      return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
  };
  var duration = {
      DAY: 86400000,
  };
  function getDefaultHours(config) {
      var hours = config.defaultHour;
      var minutes = config.defaultMinute;
      var seconds = config.defaultSeconds;
      if (config.minDate !== undefined) {
          var minHour = config.minDate.getHours();
          var minMinutes = config.minDate.getMinutes();
          var minSeconds = config.minDate.getSeconds();
          if (hours < minHour) {
              hours = minHour;
          }
          if (hours === minHour && minutes < minMinutes) {
              minutes = minMinutes;
          }
          if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
              seconds = config.minDate.getSeconds();
      }
      if (config.maxDate !== undefined) {
          var maxHr = config.maxDate.getHours();
          var maxMinutes = config.maxDate.getMinutes();
          hours = Math.min(hours, maxHr);
          if (hours === maxHr)
              minutes = Math.min(maxMinutes, minutes);
          if (hours === maxHr && minutes === maxMinutes)
              seconds = config.maxDate.getSeconds();
      }
      return { hours: hours, minutes: minutes, seconds: seconds };
  }

  if (typeof Object.assign !== "function") {
      Object.assign = function (target) {
          var args = [];
          for (var _i = 1; _i < arguments.length; _i++) {
              args[_i - 1] = arguments[_i];
          }
          if (!target) {
              throw TypeError("Cannot convert undefined or null to object");
          }
          var _loop_1 = function (source) {
              if (source) {
                  Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
              }
          };
          for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
              var source = args_1[_a];
              _loop_1(source);
          }
          return target;
      };
  }

  var __assign = (undefined && undefined.__assign) || function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var __spreadArrays$1 = (undefined && undefined.__spreadArrays) || function () {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  };
  var DEBOUNCED_CHANGE_MS = 300;
  function FlatpickrInstance(element, instanceConfig) {
      var self = {
          config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
          l10n: english,
      };
      self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      self._handlers = [];
      self.pluginElements = [];
      self.loadedPlugins = [];
      self._bind = bind;
      self._setHoursFromDate = setHoursFromDate;
      self._positionCalendar = positionCalendar;
      self.changeMonth = changeMonth;
      self.changeYear = changeYear;
      self.clear = clear;
      self.close = close;
      self.onMouseOver = onMouseOver;
      self._createElement = createElement;
      self.createDay = createDay;
      self.destroy = destroy;
      self.isEnabled = isEnabled;
      self.jumpToDate = jumpToDate;
      self.updateValue = updateValue;
      self.open = open;
      self.redraw = redraw;
      self.set = set;
      self.setDate = setDate;
      self.toggle = toggle;
      function setupHelperFunctions() {
          self.utils = {
              getDaysInMonth: function (month, yr) {
                  if (month === void 0) { month = self.currentMonth; }
                  if (yr === void 0) { yr = self.currentYear; }
                  if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                      return 29;
                  return self.l10n.daysInMonth[month];
              },
          };
      }
      function init() {
          self.element = self.input = element;
          self.isOpen = false;
          parseConfig();
          setupLocale();
          setupInputs();
          setupDates();
          setupHelperFunctions();
          if (!self.isMobile)
              build();
          bindEvents();
          if (self.selectedDates.length || self.config.noCalendar) {
              if (self.config.enableTime) {
                  setHoursFromDate(self.config.noCalendar ? self.latestSelectedDateObj : undefined);
              }
              updateValue(false);
          }
          setCalendarWidth();
          var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (!self.isMobile && isSafari) {
              positionCalendar();
          }
          triggerEvent("onReady");
      }
      function getClosestActiveElement() {
          var _a;
          return (((_a = self.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode())
              .activeElement || document.activeElement);
      }
      function bindToInstance(fn) {
          return fn.bind(self);
      }
      function setCalendarWidth() {
          var config = self.config;
          if (config.weekNumbers === false && config.showMonths === 1) {
              return;
          }
          else if (config.noCalendar !== true) {
              window.requestAnimationFrame(function () {
                  if (self.calendarContainer !== undefined) {
                      self.calendarContainer.style.visibility = "hidden";
                      self.calendarContainer.style.display = "block";
                  }
                  if (self.daysContainer !== undefined) {
                      var daysWidth = (self.days.offsetWidth + 1) * config.showMonths;
                      self.daysContainer.style.width = daysWidth + "px";
                      self.calendarContainer.style.width =
                          daysWidth +
                              (self.weekWrapper !== undefined
                                  ? self.weekWrapper.offsetWidth
                                  : 0) +
                              "px";
                      self.calendarContainer.style.removeProperty("visibility");
                      self.calendarContainer.style.removeProperty("display");
                  }
              });
          }
      }
      function updateTime(e) {
          if (self.selectedDates.length === 0) {
              var defaultDate = self.config.minDate === undefined ||
                  compareDates(new Date(), self.config.minDate) >= 0
                  ? new Date()
                  : new Date(self.config.minDate.getTime());
              var defaults = getDefaultHours(self.config);
              defaultDate.setHours(defaults.hours, defaults.minutes, defaults.seconds, defaultDate.getMilliseconds());
              self.selectedDates = [defaultDate];
              self.latestSelectedDateObj = defaultDate;
          }
          if (e !== undefined && e.type !== "blur") {
              timeWrapper(e);
          }
          var prevValue = self._input.value;
          setHoursFromInputs();
          updateValue();
          if (self._input.value !== prevValue) {
              self._debouncedChange();
          }
      }
      function ampm2military(hour, amPM) {
          return (hour % 12) + 12 * int(amPM === self.l10n.amPM[1]);
      }
      function military2ampm(hour) {
          switch (hour % 24) {
              case 0:
              case 12:
                  return 12;
              default:
                  return hour % 12;
          }
      }
      function setHoursFromInputs() {
          if (self.hourElement === undefined || self.minuteElement === undefined)
              return;
          var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
              ? (parseInt(self.secondElement.value, 10) || 0) % 60
              : 0;
          if (self.amPM !== undefined) {
              hours = ampm2military(hours, self.amPM.textContent);
          }
          var limitMinHours = self.config.minTime !== undefined ||
              (self.config.minDate &&
                  self.minDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                      0);
          var limitMaxHours = self.config.maxTime !== undefined ||
              (self.config.maxDate &&
                  self.maxDateHasTime &&
                  self.latestSelectedDateObj &&
                  compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                      0);
          if (self.config.maxTime !== undefined &&
              self.config.minTime !== undefined &&
              self.config.minTime > self.config.maxTime) {
              var minBound = calculateSecondsSinceMidnight(self.config.minTime.getHours(), self.config.minTime.getMinutes(), self.config.minTime.getSeconds());
              var maxBound = calculateSecondsSinceMidnight(self.config.maxTime.getHours(), self.config.maxTime.getMinutes(), self.config.maxTime.getSeconds());
              var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
              if (currentTime > maxBound && currentTime < minBound) {
                  var result = parseSeconds(minBound);
                  hours = result[0];
                  minutes = result[1];
                  seconds = result[2];
              }
          }
          else {
              if (limitMaxHours) {
                  var maxTime = self.config.maxTime !== undefined
                      ? self.config.maxTime
                      : self.config.maxDate;
                  hours = Math.min(hours, maxTime.getHours());
                  if (hours === maxTime.getHours())
                      minutes = Math.min(minutes, maxTime.getMinutes());
                  if (minutes === maxTime.getMinutes())
                      seconds = Math.min(seconds, maxTime.getSeconds());
              }
              if (limitMinHours) {
                  var minTime = self.config.minTime !== undefined
                      ? self.config.minTime
                      : self.config.minDate;
                  hours = Math.max(hours, minTime.getHours());
                  if (hours === minTime.getHours() && minutes < minTime.getMinutes())
                      minutes = minTime.getMinutes();
                  if (minutes === minTime.getMinutes())
                      seconds = Math.max(seconds, minTime.getSeconds());
              }
          }
          setHours(hours, minutes, seconds);
      }
      function setHoursFromDate(dateObj) {
          var date = dateObj || self.latestSelectedDateObj;
          if (date && date instanceof Date) {
              setHours(date.getHours(), date.getMinutes(), date.getSeconds());
          }
      }
      function setHours(hours, minutes, seconds) {
          if (self.latestSelectedDateObj !== undefined) {
              self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
          }
          if (!self.hourElement || !self.minuteElement || self.isMobile)
              return;
          self.hourElement.value = pad(!self.config.time_24hr
              ? ((12 + hours) % 12) + 12 * int(hours % 12 === 0)
              : hours);
          self.minuteElement.value = pad(minutes);
          if (self.amPM !== undefined)
              self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
          if (self.secondElement !== undefined)
              self.secondElement.value = pad(seconds);
      }
      function onYearInput(event) {
          var eventTarget = getEventTarget(event);
          var year = parseInt(eventTarget.value) + (event.delta || 0);
          if (year / 1000 > 1 ||
              (event.key === "Enter" && !/[^\d]/.test(year.toString()))) {
              changeYear(year);
          }
      }
      function bind(element, event, handler, options) {
          if (event instanceof Array)
              return event.forEach(function (ev) { return bind(element, ev, handler, options); });
          if (element instanceof Array)
              return element.forEach(function (el) { return bind(el, event, handler, options); });
          element.addEventListener(event, handler, options);
          self._handlers.push({
              remove: function () { return element.removeEventListener(event, handler, options); },
          });
      }
      function triggerChange() {
          triggerEvent("onChange");
      }
      function bindEvents() {
          if (self.config.wrap) {
              ["open", "close", "toggle", "clear"].forEach(function (evt) {
                  Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                      return bind(el, "click", self[evt]);
                  });
              });
          }
          if (self.isMobile) {
              setupMobile();
              return;
          }
          var debouncedResize = debounce(onResize, 50);
          self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
          if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
              bind(self.daysContainer, "mouseover", function (e) {
                  if (self.config.mode === "range")
                      onMouseOver(getEventTarget(e));
              });
          bind(self._input, "keydown", onKeyDown);
          if (self.calendarContainer !== undefined) {
              bind(self.calendarContainer, "keydown", onKeyDown);
          }
          if (!self.config.inline && !self.config.static)
              bind(window, "resize", debouncedResize);
          if (window.ontouchstart !== undefined)
              bind(window.document, "touchstart", documentClick);
          else
              bind(window.document, "mousedown", documentClick);
          bind(window.document, "focus", documentClick, { capture: true });
          if (self.config.clickOpens === true) {
              bind(self._input, "focus", self.open);
              bind(self._input, "click", self.open);
          }
          if (self.daysContainer !== undefined) {
              bind(self.monthNav, "click", onMonthNavClick);
              bind(self.monthNav, ["keyup", "increment"], onYearInput);
              bind(self.daysContainer, "click", selectDate);
          }
          if (self.timeContainer !== undefined &&
              self.minuteElement !== undefined &&
              self.hourElement !== undefined) {
              var selText = function (e) {
                  return getEventTarget(e).select();
              };
              bind(self.timeContainer, ["increment"], updateTime);
              bind(self.timeContainer, "blur", updateTime, { capture: true });
              bind(self.timeContainer, "click", timeIncrement);
              bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
              if (self.secondElement !== undefined)
                  bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
              if (self.amPM !== undefined) {
                  bind(self.amPM, "click", function (e) {
                      updateTime(e);
                  });
              }
          }
          if (self.config.allowInput) {
              bind(self._input, "blur", onBlur);
          }
      }
      function jumpToDate(jumpDate, triggerChange) {
          var jumpTo = jumpDate !== undefined
              ? self.parseDate(jumpDate)
              : self.latestSelectedDateObj ||
                  (self.config.minDate && self.config.minDate > self.now
                      ? self.config.minDate
                      : self.config.maxDate && self.config.maxDate < self.now
                          ? self.config.maxDate
                          : self.now);
          var oldYear = self.currentYear;
          var oldMonth = self.currentMonth;
          try {
              if (jumpTo !== undefined) {
                  self.currentYear = jumpTo.getFullYear();
                  self.currentMonth = jumpTo.getMonth();
              }
          }
          catch (e) {
              e.message = "Invalid date supplied: " + jumpTo;
              self.config.errorHandler(e);
          }
          if (triggerChange && self.currentYear !== oldYear) {
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          if (triggerChange &&
              (self.currentYear !== oldYear || self.currentMonth !== oldMonth)) {
              triggerEvent("onMonthChange");
          }
          self.redraw();
      }
      function timeIncrement(e) {
          var eventTarget = getEventTarget(e);
          if (~eventTarget.className.indexOf("arrow"))
              incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
      }
      function incrementNumInput(e, delta, inputElem) {
          var target = e && getEventTarget(e);
          var input = inputElem ||
              (target && target.parentNode && target.parentNode.firstChild);
          var event = createEvent("increment");
          event.delta = delta;
          input && input.dispatchEvent(event);
      }
      function build() {
          var fragment = window.document.createDocumentFragment();
          self.calendarContainer = createElement("div", "flatpickr-calendar");
          self.calendarContainer.tabIndex = -1;
          if (!self.config.noCalendar) {
              fragment.appendChild(buildMonthNav());
              self.innerContainer = createElement("div", "flatpickr-innerContainer");
              if (self.config.weekNumbers) {
                  var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                  self.innerContainer.appendChild(weekWrapper);
                  self.weekNumbers = weekNumbers;
                  self.weekWrapper = weekWrapper;
              }
              self.rContainer = createElement("div", "flatpickr-rContainer");
              self.rContainer.appendChild(buildWeekdays());
              if (!self.daysContainer) {
                  self.daysContainer = createElement("div", "flatpickr-days");
                  self.daysContainer.tabIndex = -1;
              }
              buildDays();
              self.rContainer.appendChild(self.daysContainer);
              self.innerContainer.appendChild(self.rContainer);
              fragment.appendChild(self.innerContainer);
          }
          if (self.config.enableTime) {
              fragment.appendChild(buildTime());
          }
          toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
          toggleClass(self.calendarContainer, "animate", self.config.animate === true);
          toggleClass(self.calendarContainer, "multiMonth", self.config.showMonths > 1);
          self.calendarContainer.appendChild(fragment);
          var customAppend = self.config.appendTo !== undefined &&
              self.config.appendTo.nodeType !== undefined;
          if (self.config.inline || self.config.static) {
              self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
              if (self.config.inline) {
                  if (!customAppend && self.element.parentNode)
                      self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                  else if (self.config.appendTo !== undefined)
                      self.config.appendTo.appendChild(self.calendarContainer);
              }
              if (self.config.static) {
                  var wrapper = createElement("div", "flatpickr-wrapper");
                  if (self.element.parentNode)
                      self.element.parentNode.insertBefore(wrapper, self.element);
                  wrapper.appendChild(self.element);
                  if (self.altInput)
                      wrapper.appendChild(self.altInput);
                  wrapper.appendChild(self.calendarContainer);
              }
          }
          if (!self.config.static && !self.config.inline)
              (self.config.appendTo !== undefined
                  ? self.config.appendTo
                  : window.document.body).appendChild(self.calendarContainer);
      }
      function createDay(className, date, _dayNumber, i) {
          var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
          dayElement.dateObj = date;
          dayElement.$i = i;
          dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
          if (className.indexOf("hidden") === -1 &&
              compareDates(date, self.now) === 0) {
              self.todayDateElem = dayElement;
              dayElement.classList.add("today");
              dayElement.setAttribute("aria-current", "date");
          }
          if (dateIsEnabled) {
              dayElement.tabIndex = -1;
              if (isDateSelected(date)) {
                  dayElement.classList.add("selected");
                  self.selectedDateElem = dayElement;
                  if (self.config.mode === "range") {
                      toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                          compareDates(date, self.selectedDates[0], true) === 0);
                      toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                          compareDates(date, self.selectedDates[1], true) === 0);
                      if (className === "nextMonthDay")
                          dayElement.classList.add("inRange");
                  }
              }
          }
          else {
              dayElement.classList.add("flatpickr-disabled");
          }
          if (self.config.mode === "range") {
              if (isDateInRange(date) && !isDateSelected(date))
                  dayElement.classList.add("inRange");
          }
          if (self.weekNumbers &&
              self.config.showMonths === 1 &&
              className !== "prevMonthDay" &&
              i % 7 === 6) {
              self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
          }
          triggerEvent("onDayCreate", dayElement);
          return dayElement;
      }
      function focusOnDayElem(targetNode) {
          targetNode.focus();
          if (self.config.mode === "range")
              onMouseOver(targetNode);
      }
      function getFirstAvailableDay(delta) {
          var startMonth = delta > 0 ? 0 : self.config.showMonths - 1;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          for (var m = startMonth; m != endMonth; m += delta) {
              var month = self.daysContainer.children[m];
              var startIndex = delta > 0 ? 0 : month.children.length - 1;
              var endIndex = delta > 0 ? month.children.length : -1;
              for (var i = startIndex; i != endIndex; i += delta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
                      return c;
              }
          }
          return undefined;
      }
      function getNextAvailableDay(current, delta) {
          var givenMonth = current.className.indexOf("Month") === -1
              ? current.dateObj.getMonth()
              : self.currentMonth;
          var endMonth = delta > 0 ? self.config.showMonths : -1;
          var loopDelta = delta > 0 ? 1 : -1;
          for (var m = givenMonth - self.currentMonth; m != endMonth; m += loopDelta) {
              var month = self.daysContainer.children[m];
              var startIndex = givenMonth - self.currentMonth === m
                  ? current.$i + delta
                  : delta < 0
                      ? month.children.length - 1
                      : 0;
              var numMonthDays = month.children.length;
              for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
                  var c = month.children[i];
                  if (c.className.indexOf("hidden") === -1 &&
                      isEnabled(c.dateObj) &&
                      Math.abs(current.$i - i) >= Math.abs(delta))
                      return focusOnDayElem(c);
              }
          }
          self.changeMonth(loopDelta);
          focusOnDay(getFirstAvailableDay(loopDelta), 0);
          return undefined;
      }
      function focusOnDay(current, offset) {
          var activeElement = getClosestActiveElement();
          var dayFocused = isInView(activeElement || document.body);
          var startElem = current !== undefined
              ? current
              : dayFocused
                  ? activeElement
                  : self.selectedDateElem !== undefined && isInView(self.selectedDateElem)
                      ? self.selectedDateElem
                      : self.todayDateElem !== undefined && isInView(self.todayDateElem)
                          ? self.todayDateElem
                          : getFirstAvailableDay(offset > 0 ? 1 : -1);
          if (startElem === undefined) {
              self._input.focus();
          }
          else if (!dayFocused) {
              focusOnDayElem(startElem);
          }
          else {
              getNextAvailableDay(startElem, offset);
          }
      }
      function buildMonthDays(year, month) {
          var firstOfMonth = (new Date(year, month, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7;
          var prevMonthDays = self.utils.getDaysInMonth((month - 1 + 12) % 12, year);
          var daysInMonth = self.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
          var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
          for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
          }
          for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
          }
          for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth &&
              (self.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
              days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
          }
          var dayContainer = createElement("div", "dayContainer");
          dayContainer.appendChild(days);
          return dayContainer;
      }
      function buildDays() {
          if (self.daysContainer === undefined) {
              return;
          }
          clearNode(self.daysContainer);
          if (self.weekNumbers)
              clearNode(self.weekNumbers);
          var frag = document.createDocumentFragment();
          for (var i = 0; i < self.config.showMonths; i++) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
          }
          self.daysContainer.appendChild(frag);
          self.days = self.daysContainer.firstChild;
          if (self.config.mode === "range" && self.selectedDates.length === 1) {
              onMouseOver();
          }
      }
      function buildMonthSwitch() {
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType !== "dropdown")
              return;
          var shouldBuildMonth = function (month) {
              if (self.config.minDate !== undefined &&
                  self.currentYear === self.config.minDate.getFullYear() &&
                  month < self.config.minDate.getMonth()) {
                  return false;
              }
              return !(self.config.maxDate !== undefined &&
                  self.currentYear === self.config.maxDate.getFullYear() &&
                  month > self.config.maxDate.getMonth());
          };
          self.monthsDropdownContainer.tabIndex = -1;
          self.monthsDropdownContainer.innerHTML = "";
          for (var i = 0; i < 12; i++) {
              if (!shouldBuildMonth(i))
                  continue;
              var month = createElement("option", "flatpickr-monthDropdown-month");
              month.value = new Date(self.currentYear, i).getMonth().toString();
              month.textContent = monthToStr(i, self.config.shorthandCurrentMonth, self.l10n);
              month.tabIndex = -1;
              if (self.currentMonth === i) {
                  month.selected = true;
              }
              self.monthsDropdownContainer.appendChild(month);
          }
      }
      function buildMonth() {
          var container = createElement("div", "flatpickr-month");
          var monthNavFragment = window.document.createDocumentFragment();
          var monthElement;
          if (self.config.showMonths > 1 ||
              self.config.monthSelectorType === "static") {
              monthElement = createElement("span", "cur-month");
          }
          else {
              self.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
              self.monthsDropdownContainer.setAttribute("aria-label", self.l10n.monthAriaLabel);
              bind(self.monthsDropdownContainer, "change", function (e) {
                  var target = getEventTarget(e);
                  var selectedMonth = parseInt(target.value, 10);
                  self.changeMonth(selectedMonth - self.currentMonth);
                  triggerEvent("onMonthChange");
              });
              buildMonthSwitch();
              monthElement = self.monthsDropdownContainer;
          }
          var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
          var yearElement = yearInput.getElementsByTagName("input")[0];
          yearElement.setAttribute("aria-label", self.l10n.yearAriaLabel);
          if (self.config.minDate) {
              yearElement.setAttribute("min", self.config.minDate.getFullYear().toString());
          }
          if (self.config.maxDate) {
              yearElement.setAttribute("max", self.config.maxDate.getFullYear().toString());
              yearElement.disabled =
                  !!self.config.minDate &&
                      self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
          }
          var currentMonth = createElement("div", "flatpickr-current-month");
          currentMonth.appendChild(monthElement);
          currentMonth.appendChild(yearInput);
          monthNavFragment.appendChild(currentMonth);
          container.appendChild(monthNavFragment);
          return {
              container: container,
              yearElement: yearElement,
              monthElement: monthElement,
          };
      }
      function buildMonths() {
          clearNode(self.monthNav);
          self.monthNav.appendChild(self.prevMonthNav);
          if (self.config.showMonths) {
              self.yearElements = [];
              self.monthElements = [];
          }
          for (var m = self.config.showMonths; m--;) {
              var month = buildMonth();
              self.yearElements.push(month.yearElement);
              self.monthElements.push(month.monthElement);
              self.monthNav.appendChild(month.container);
          }
          self.monthNav.appendChild(self.nextMonthNav);
      }
      function buildMonthNav() {
          self.monthNav = createElement("div", "flatpickr-months");
          self.yearElements = [];
          self.monthElements = [];
          self.prevMonthNav = createElement("span", "flatpickr-prev-month");
          self.prevMonthNav.innerHTML = self.config.prevArrow;
          self.nextMonthNav = createElement("span", "flatpickr-next-month");
          self.nextMonthNav.innerHTML = self.config.nextArrow;
          buildMonths();
          Object.defineProperty(self, "_hidePrevMonthArrow", {
              get: function () { return self.__hidePrevMonthArrow; },
              set: function (bool) {
                  if (self.__hidePrevMonthArrow !== bool) {
                      toggleClass(self.prevMonthNav, "flatpickr-disabled", bool);
                      self.__hidePrevMonthArrow = bool;
                  }
              },
          });
          Object.defineProperty(self, "_hideNextMonthArrow", {
              get: function () { return self.__hideNextMonthArrow; },
              set: function (bool) {
                  if (self.__hideNextMonthArrow !== bool) {
                      toggleClass(self.nextMonthNav, "flatpickr-disabled", bool);
                      self.__hideNextMonthArrow = bool;
                  }
              },
          });
          self.currentYearElement = self.yearElements[0];
          updateNavigationCurrentMonth();
          return self.monthNav;
      }
      function buildTime() {
          self.calendarContainer.classList.add("hasTime");
          if (self.config.noCalendar)
              self.calendarContainer.classList.add("noCalendar");
          var defaults = getDefaultHours(self.config);
          self.timeContainer = createElement("div", "flatpickr-time");
          self.timeContainer.tabIndex = -1;
          var separator = createElement("span", "flatpickr-time-separator", ":");
          var hourInput = createNumberInput("flatpickr-hour", {
              "aria-label": self.l10n.hourAriaLabel,
          });
          self.hourElement = hourInput.getElementsByTagName("input")[0];
          var minuteInput = createNumberInput("flatpickr-minute", {
              "aria-label": self.l10n.minuteAriaLabel,
          });
          self.minuteElement = minuteInput.getElementsByTagName("input")[0];
          self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
          self.hourElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getHours()
              : self.config.time_24hr
                  ? defaults.hours
                  : military2ampm(defaults.hours));
          self.minuteElement.value = pad(self.latestSelectedDateObj
              ? self.latestSelectedDateObj.getMinutes()
              : defaults.minutes);
          self.hourElement.setAttribute("step", self.config.hourIncrement.toString());
          self.minuteElement.setAttribute("step", self.config.minuteIncrement.toString());
          self.hourElement.setAttribute("min", self.config.time_24hr ? "0" : "1");
          self.hourElement.setAttribute("max", self.config.time_24hr ? "23" : "12");
          self.hourElement.setAttribute("maxlength", "2");
          self.minuteElement.setAttribute("min", "0");
          self.minuteElement.setAttribute("max", "59");
          self.minuteElement.setAttribute("maxlength", "2");
          self.timeContainer.appendChild(hourInput);
          self.timeContainer.appendChild(separator);
          self.timeContainer.appendChild(minuteInput);
          if (self.config.time_24hr)
              self.timeContainer.classList.add("time24hr");
          if (self.config.enableSeconds) {
              self.timeContainer.classList.add("hasSeconds");
              var secondInput = createNumberInput("flatpickr-second");
              self.secondElement = secondInput.getElementsByTagName("input")[0];
              self.secondElement.value = pad(self.latestSelectedDateObj
                  ? self.latestSelectedDateObj.getSeconds()
                  : defaults.seconds);
              self.secondElement.setAttribute("step", self.minuteElement.getAttribute("step"));
              self.secondElement.setAttribute("min", "0");
              self.secondElement.setAttribute("max", "59");
              self.secondElement.setAttribute("maxlength", "2");
              self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
              self.timeContainer.appendChild(secondInput);
          }
          if (!self.config.time_24hr) {
              self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                  ? self.hourElement.value
                  : self.config.defaultHour) > 11)]);
              self.amPM.title = self.l10n.toggleTitle;
              self.amPM.tabIndex = -1;
              self.timeContainer.appendChild(self.amPM);
          }
          return self.timeContainer;
      }
      function buildWeekdays() {
          if (!self.weekdayContainer)
              self.weekdayContainer = createElement("div", "flatpickr-weekdays");
          else
              clearNode(self.weekdayContainer);
          for (var i = self.config.showMonths; i--;) {
              var container = createElement("div", "flatpickr-weekdaycontainer");
              self.weekdayContainer.appendChild(container);
          }
          updateWeekdays();
          return self.weekdayContainer;
      }
      function updateWeekdays() {
          if (!self.weekdayContainer) {
              return;
          }
          var firstDayOfWeek = self.l10n.firstDayOfWeek;
          var weekdays = __spreadArrays$1(self.l10n.weekdays.shorthand);
          if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
              weekdays = __spreadArrays$1(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
          }
          for (var i = self.config.showMonths; i--;) {
              self.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
          }
      }
      function buildWeeks() {
          self.calendarContainer.classList.add("hasWeeks");
          var weekWrapper = createElement("div", "flatpickr-weekwrapper");
          weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
          var weekNumbers = createElement("div", "flatpickr-weeks");
          weekWrapper.appendChild(weekNumbers);
          return {
              weekWrapper: weekWrapper,
              weekNumbers: weekNumbers,
          };
      }
      function changeMonth(value, isOffset) {
          if (isOffset === void 0) { isOffset = true; }
          var delta = isOffset ? value : value - self.currentMonth;
          if ((delta < 0 && self._hidePrevMonthArrow === true) ||
              (delta > 0 && self._hideNextMonthArrow === true))
              return;
          self.currentMonth += delta;
          if (self.currentMonth < 0 || self.currentMonth > 11) {
              self.currentYear += self.currentMonth > 11 ? 1 : -1;
              self.currentMonth = (self.currentMonth + 12) % 12;
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
          buildDays();
          triggerEvent("onMonthChange");
          updateNavigationCurrentMonth();
      }
      function clear(triggerChangeEvent, toInitial) {
          if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
          if (toInitial === void 0) { toInitial = true; }
          self.input.value = "";
          if (self.altInput !== undefined)
              self.altInput.value = "";
          if (self.mobileInput !== undefined)
              self.mobileInput.value = "";
          self.selectedDates = [];
          self.latestSelectedDateObj = undefined;
          if (toInitial === true) {
              self.currentYear = self._initialDate.getFullYear();
              self.currentMonth = self._initialDate.getMonth();
          }
          if (self.config.enableTime === true) {
              var _a = getDefaultHours(self.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
              setHours(hours, minutes, seconds);
          }
          self.redraw();
          if (triggerChangeEvent)
              triggerEvent("onChange");
      }
      function close() {
          self.isOpen = false;
          if (!self.isMobile) {
              if (self.calendarContainer !== undefined) {
                  self.calendarContainer.classList.remove("open");
              }
              if (self._input !== undefined) {
                  self._input.classList.remove("active");
              }
          }
          triggerEvent("onClose");
      }
      function destroy() {
          if (self.config !== undefined)
              triggerEvent("onDestroy");
          for (var i = self._handlers.length; i--;) {
              self._handlers[i].remove();
          }
          self._handlers = [];
          if (self.mobileInput) {
              if (self.mobileInput.parentNode)
                  self.mobileInput.parentNode.removeChild(self.mobileInput);
              self.mobileInput = undefined;
          }
          else if (self.calendarContainer && self.calendarContainer.parentNode) {
              if (self.config.static && self.calendarContainer.parentNode) {
                  var wrapper = self.calendarContainer.parentNode;
                  wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
                  if (wrapper.parentNode) {
                      while (wrapper.firstChild)
                          wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
                      wrapper.parentNode.removeChild(wrapper);
                  }
              }
              else
                  self.calendarContainer.parentNode.removeChild(self.calendarContainer);
          }
          if (self.altInput) {
              self.input.type = "text";
              if (self.altInput.parentNode)
                  self.altInput.parentNode.removeChild(self.altInput);
              delete self.altInput;
          }
          if (self.input) {
              self.input.type = self.input._type;
              self.input.classList.remove("flatpickr-input");
              self.input.removeAttribute("readonly");
          }
          [
              "_showTimeInput",
              "latestSelectedDateObj",
              "_hideNextMonthArrow",
              "_hidePrevMonthArrow",
              "__hideNextMonthArrow",
              "__hidePrevMonthArrow",
              "isMobile",
              "isOpen",
              "selectedDateElem",
              "minDateHasTime",
              "maxDateHasTime",
              "days",
              "daysContainer",
              "_input",
              "_positionElement",
              "innerContainer",
              "rContainer",
              "monthNav",
              "todayDateElem",
              "calendarContainer",
              "weekdayContainer",
              "prevMonthNav",
              "nextMonthNav",
              "monthsDropdownContainer",
              "currentMonthElement",
              "currentYearElement",
              "navigationCurrentMonth",
              "selectedDateElem",
              "config",
          ].forEach(function (k) {
              try {
                  delete self[k];
              }
              catch (_) { }
          });
      }
      function isCalendarElem(elem) {
          return self.calendarContainer.contains(elem);
      }
      function documentClick(e) {
          if (self.isOpen && !self.config.inline) {
              var eventTarget_1 = getEventTarget(e);
              var isCalendarElement = isCalendarElem(eventTarget_1);
              var isInput = eventTarget_1 === self.input ||
                  eventTarget_1 === self.altInput ||
                  self.element.contains(eventTarget_1) ||
                  (e.path &&
                      e.path.indexOf &&
                      (~e.path.indexOf(self.input) ||
                          ~e.path.indexOf(self.altInput)));
              var lostFocus = !isInput &&
                  !isCalendarElement &&
                  !isCalendarElem(e.relatedTarget);
              var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                  return elem.contains(eventTarget_1);
              });
              if (lostFocus && isIgnored) {
                  if (self.config.allowInput) {
                      self.setDate(self._input.value, false, self.config.altInput
                          ? self.config.altFormat
                          : self.config.dateFormat);
                  }
                  if (self.timeContainer !== undefined &&
                      self.minuteElement !== undefined &&
                      self.hourElement !== undefined &&
                      self.input.value !== "" &&
                      self.input.value !== undefined) {
                      updateTime();
                  }
                  self.close();
                  if (self.config &&
                      self.config.mode === "range" &&
                      self.selectedDates.length === 1)
                      self.clear(false);
              }
          }
      }
      function changeYear(newYear) {
          if (!newYear ||
              (self.config.minDate && newYear < self.config.minDate.getFullYear()) ||
              (self.config.maxDate && newYear > self.config.maxDate.getFullYear()))
              return;
          var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
          self.currentYear = newYearNum || self.currentYear;
          if (self.config.maxDate &&
              self.currentYear === self.config.maxDate.getFullYear()) {
              self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
          }
          else if (self.config.minDate &&
              self.currentYear === self.config.minDate.getFullYear()) {
              self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
          }
          if (isNewYear) {
              self.redraw();
              triggerEvent("onYearChange");
              buildMonthSwitch();
          }
      }
      function isEnabled(date, timeless) {
          var _a;
          if (timeless === void 0) { timeless = true; }
          var dateToCheck = self.parseDate(date, undefined, timeless);
          if ((self.config.minDate &&
              dateToCheck &&
              compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
              (self.config.maxDate &&
                  dateToCheck &&
                  compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
              return false;
          if (!self.config.enable && self.config.disable.length === 0)
              return true;
          if (dateToCheck === undefined)
              return false;
          var bool = !!self.config.enable, array = (_a = self.config.enable) !== null && _a !== void 0 ? _a : self.config.disable;
          for (var i = 0, d = void 0; i < array.length; i++) {
              d = array[i];
              if (typeof d === "function" &&
                  d(dateToCheck))
                  return bool;
              else if (d instanceof Date &&
                  dateToCheck !== undefined &&
                  d.getTime() === dateToCheck.getTime())
                  return bool;
              else if (typeof d === "string") {
                  var parsed = self.parseDate(d, undefined, true);
                  return parsed && parsed.getTime() === dateToCheck.getTime()
                      ? bool
                      : !bool;
              }
              else if (typeof d === "object" &&
                  dateToCheck !== undefined &&
                  d.from &&
                  d.to &&
                  dateToCheck.getTime() >= d.from.getTime() &&
                  dateToCheck.getTime() <= d.to.getTime())
                  return bool;
          }
          return !bool;
      }
      function isInView(elem) {
          if (self.daysContainer !== undefined)
              return (elem.className.indexOf("hidden") === -1 &&
                  elem.className.indexOf("flatpickr-disabled") === -1 &&
                  self.daysContainer.contains(elem));
          return false;
      }
      function onBlur(e) {
          var isInput = e.target === self._input;
          var valueChanged = self._input.value.trimEnd() !== getDateStr();
          if (isInput &&
              valueChanged &&
              !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
              self.setDate(self._input.value, true, e.target === self.altInput
                  ? self.config.altFormat
                  : self.config.dateFormat);
          }
      }
      function onKeyDown(e) {
          var eventTarget = getEventTarget(e);
          var isInput = self.config.wrap
              ? element.contains(eventTarget)
              : eventTarget === self._input;
          var allowInput = self.config.allowInput;
          var allowKeydown = self.isOpen && (!allowInput || !isInput);
          var allowInlineKeydown = self.config.inline && isInput && !allowInput;
          if (e.keyCode === 13 && isInput) {
              if (allowInput) {
                  self.setDate(self._input.value, true, eventTarget === self.altInput
                      ? self.config.altFormat
                      : self.config.dateFormat);
                  self.close();
                  return eventTarget.blur();
              }
              else {
                  self.open();
              }
          }
          else if (isCalendarElem(eventTarget) ||
              allowKeydown ||
              allowInlineKeydown) {
              var isTimeObj = !!self.timeContainer &&
                  self.timeContainer.contains(eventTarget);
              switch (e.keyCode) {
                  case 13:
                      if (isTimeObj) {
                          e.preventDefault();
                          updateTime();
                          focusAndClose();
                      }
                      else
                          selectDate(e);
                      break;
                  case 27:
                      e.preventDefault();
                      focusAndClose();
                      break;
                  case 8:
                  case 46:
                      if (isInput && !self.config.allowInput) {
                          e.preventDefault();
                          self.clear();
                      }
                      break;
                  case 37:
                  case 39:
                      if (!isTimeObj && !isInput) {
                          e.preventDefault();
                          var activeElement = getClosestActiveElement();
                          if (self.daysContainer !== undefined &&
                              (allowInput === false ||
                                  (activeElement && isInView(activeElement)))) {
                              var delta_1 = e.keyCode === 39 ? 1 : -1;
                              if (!e.ctrlKey)
                                  focusOnDay(undefined, delta_1);
                              else {
                                  e.stopPropagation();
                                  changeMonth(delta_1);
                                  focusOnDay(getFirstAvailableDay(1), 0);
                              }
                          }
                      }
                      else if (self.hourElement)
                          self.hourElement.focus();
                      break;
                  case 38:
                  case 40:
                      e.preventDefault();
                      var delta = e.keyCode === 40 ? 1 : -1;
                      if ((self.daysContainer &&
                          eventTarget.$i !== undefined) ||
                          eventTarget === self.input ||
                          eventTarget === self.altInput) {
                          if (e.ctrlKey) {
                              e.stopPropagation();
                              changeYear(self.currentYear - delta);
                              focusOnDay(getFirstAvailableDay(1), 0);
                          }
                          else if (!isTimeObj)
                              focusOnDay(undefined, delta * 7);
                      }
                      else if (eventTarget === self.currentYearElement) {
                          changeYear(self.currentYear - delta);
                      }
                      else if (self.config.enableTime) {
                          if (!isTimeObj && self.hourElement)
                              self.hourElement.focus();
                          updateTime(e);
                          self._debouncedChange();
                      }
                      break;
                  case 9:
                      if (isTimeObj) {
                          var elems = [
                              self.hourElement,
                              self.minuteElement,
                              self.secondElement,
                              self.amPM,
                          ]
                              .concat(self.pluginElements)
                              .filter(function (x) { return x; });
                          var i = elems.indexOf(eventTarget);
                          if (i !== -1) {
                              var target = elems[i + (e.shiftKey ? -1 : 1)];
                              e.preventDefault();
                              (target || self._input).focus();
                          }
                      }
                      else if (!self.config.noCalendar &&
                          self.daysContainer &&
                          self.daysContainer.contains(eventTarget) &&
                          e.shiftKey) {
                          e.preventDefault();
                          self._input.focus();
                      }
                      break;
              }
          }
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              switch (e.key) {
                  case self.l10n.amPM[0].charAt(0):
                  case self.l10n.amPM[0].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[0];
                      setHoursFromInputs();
                      updateValue();
                      break;
                  case self.l10n.amPM[1].charAt(0):
                  case self.l10n.amPM[1].charAt(0).toLowerCase():
                      self.amPM.textContent = self.l10n.amPM[1];
                      setHoursFromInputs();
                      updateValue();
                      break;
              }
          }
          if (isInput || isCalendarElem(eventTarget)) {
              triggerEvent("onKeyDown", e);
          }
      }
      function onMouseOver(elem, cellClass) {
          if (cellClass === void 0) { cellClass = "flatpickr-day"; }
          if (self.selectedDates.length !== 1 ||
              (elem &&
                  (!elem.classList.contains(cellClass) ||
                      elem.classList.contains("flatpickr-disabled"))))
              return;
          var hoverDate = elem
              ? elem.dateObj.getTime()
              : self.days.firstElementChild.dateObj.getTime(), initialDate = self.parseDate(self.selectedDates[0], undefined, true).getTime(), rangeStartDate = Math.min(hoverDate, self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self.selectedDates[0].getTime());
          var containsDisabled = false;
          var minRange = 0, maxRange = 0;
          for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
              if (!isEnabled(new Date(t), true)) {
                  containsDisabled =
                      containsDisabled || (t > rangeStartDate && t < rangeEndDate);
                  if (t < initialDate && (!minRange || t > minRange))
                      minRange = t;
                  else if (t > initialDate && (!maxRange || t < maxRange))
                      maxRange = t;
              }
          }
          var hoverableCells = Array.from(self.rContainer.querySelectorAll("*:nth-child(-n+" + self.config.showMonths + ") > ." + cellClass));
          hoverableCells.forEach(function (dayElem) {
              var date = dayElem.dateObj;
              var timestamp = date.getTime();
              var outOfRange = (minRange > 0 && timestamp < minRange) ||
                  (maxRange > 0 && timestamp > maxRange);
              if (outOfRange) {
                  dayElem.classList.add("notAllowed");
                  ["inRange", "startRange", "endRange"].forEach(function (c) {
                      dayElem.classList.remove(c);
                  });
                  return;
              }
              else if (containsDisabled && !outOfRange)
                  return;
              ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                  dayElem.classList.remove(c);
              });
              if (elem !== undefined) {
                  elem.classList.add(hoverDate <= self.selectedDates[0].getTime()
                      ? "startRange"
                      : "endRange");
                  if (initialDate < hoverDate && timestamp === initialDate)
                      dayElem.classList.add("startRange");
                  else if (initialDate > hoverDate && timestamp === initialDate)
                      dayElem.classList.add("endRange");
                  if (timestamp >= minRange &&
                      (maxRange === 0 || timestamp <= maxRange) &&
                      isBetween(timestamp, initialDate, hoverDate))
                      dayElem.classList.add("inRange");
              }
          });
      }
      function onResize() {
          if (self.isOpen && !self.config.static && !self.config.inline)
              positionCalendar();
      }
      function open(e, positionElement) {
          if (positionElement === void 0) { positionElement = self._positionElement; }
          if (self.isMobile === true) {
              if (e) {
                  e.preventDefault();
                  var eventTarget = getEventTarget(e);
                  if (eventTarget) {
                      eventTarget.blur();
                  }
              }
              if (self.mobileInput !== undefined) {
                  self.mobileInput.focus();
                  self.mobileInput.click();
              }
              triggerEvent("onOpen");
              return;
          }
          else if (self._input.disabled || self.config.inline) {
              return;
          }
          var wasOpen = self.isOpen;
          self.isOpen = true;
          if (!wasOpen) {
              self.calendarContainer.classList.add("open");
              self._input.classList.add("active");
              triggerEvent("onOpen");
              positionCalendar(positionElement);
          }
          if (self.config.enableTime === true && self.config.noCalendar === true) {
              if (self.config.allowInput === false &&
                  (e === undefined ||
                      !self.timeContainer.contains(e.relatedTarget))) {
                  setTimeout(function () { return self.hourElement.select(); }, 50);
              }
          }
      }
      function minMaxDateSetter(type) {
          return function (date) {
              var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
              var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
              if (dateObj !== undefined) {
                  self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                      dateObj.getHours() > 0 ||
                          dateObj.getMinutes() > 0 ||
                          dateObj.getSeconds() > 0;
              }
              if (self.selectedDates) {
                  self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                  if (!self.selectedDates.length && type === "min")
                      setHoursFromDate(dateObj);
                  updateValue();
              }
              if (self.daysContainer) {
                  redraw();
                  if (dateObj !== undefined)
                      self.currentYearElement[type] = dateObj.getFullYear().toString();
                  else
                      self.currentYearElement.removeAttribute(type);
                  self.currentYearElement.disabled =
                      !!inverseDateObj &&
                          dateObj !== undefined &&
                          inverseDateObj.getFullYear() === dateObj.getFullYear();
              }
          };
      }
      function parseConfig() {
          var boolOpts = [
              "wrap",
              "weekNumbers",
              "allowInput",
              "allowInvalidPreload",
              "clickOpens",
              "time_24hr",
              "enableTime",
              "noCalendar",
              "altInput",
              "shorthandCurrentMonth",
              "inline",
              "static",
              "enableSeconds",
              "disableMobile",
          ];
          var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element.dataset || {}))), instanceConfig);
          var formats = {};
          self.config.parseDate = userConfig.parseDate;
          self.config.formatDate = userConfig.formatDate;
          Object.defineProperty(self.config, "enable", {
              get: function () { return self.config._enable; },
              set: function (dates) {
                  self.config._enable = parseDateRules(dates);
              },
          });
          Object.defineProperty(self.config, "disable", {
              get: function () { return self.config._disable; },
              set: function (dates) {
                  self.config._disable = parseDateRules(dates);
              },
          });
          var timeMode = userConfig.mode === "time";
          if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
              var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
              formats.dateFormat =
                  userConfig.noCalendar || timeMode
                      ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                      : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
          }
          if (userConfig.altInput &&
              (userConfig.enableTime || timeMode) &&
              !userConfig.altFormat) {
              var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
              formats.altFormat =
                  userConfig.noCalendar || timeMode
                      ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                      : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
          }
          Object.defineProperty(self.config, "minDate", {
              get: function () { return self.config._minDate; },
              set: minMaxDateSetter("min"),
          });
          Object.defineProperty(self.config, "maxDate", {
              get: function () { return self.config._maxDate; },
              set: minMaxDateSetter("max"),
          });
          var minMaxTimeSetter = function (type) { return function (val) {
              self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i:S");
          }; };
          Object.defineProperty(self.config, "minTime", {
              get: function () { return self.config._minTime; },
              set: minMaxTimeSetter("min"),
          });
          Object.defineProperty(self.config, "maxTime", {
              get: function () { return self.config._maxTime; },
              set: minMaxTimeSetter("max"),
          });
          if (userConfig.mode === "time") {
              self.config.noCalendar = true;
              self.config.enableTime = true;
          }
          Object.assign(self.config, formats, userConfig);
          for (var i = 0; i < boolOpts.length; i++)
              self.config[boolOpts[i]] =
                  self.config[boolOpts[i]] === true ||
                      self.config[boolOpts[i]] === "true";
          HOOKS.filter(function (hook) { return self.config[hook] !== undefined; }).forEach(function (hook) {
              self.config[hook] = arrayify(self.config[hook] || []).map(bindToInstance);
          });
          self.isMobile =
              !self.config.disableMobile &&
                  !self.config.inline &&
                  self.config.mode === "single" &&
                  !self.config.disable.length &&
                  !self.config.enable &&
                  !self.config.weekNumbers &&
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          for (var i = 0; i < self.config.plugins.length; i++) {
              var pluginConf = self.config.plugins[i](self) || {};
              for (var key in pluginConf) {
                  if (HOOKS.indexOf(key) > -1) {
                      self.config[key] = arrayify(pluginConf[key])
                          .map(bindToInstance)
                          .concat(self.config[key]);
                  }
                  else if (typeof userConfig[key] === "undefined")
                      self.config[key] = pluginConf[key];
              }
          }
          if (!userConfig.altInputClass) {
              self.config.altInputClass =
                  getInputElem().className + " " + self.config.altInputClass;
          }
          triggerEvent("onParseConfig");
      }
      function getInputElem() {
          return self.config.wrap
              ? element.querySelector("[data-input]")
              : element;
      }
      function setupLocale() {
          if (typeof self.config.locale !== "object" &&
              typeof flatpickr.l10ns[self.config.locale] === "undefined")
              self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
          self.l10n = __assign(__assign({}, flatpickr.l10ns.default), (typeof self.config.locale === "object"
              ? self.config.locale
              : self.config.locale !== "default"
                  ? flatpickr.l10ns[self.config.locale]
                  : undefined));
          tokenRegex.D = "(" + self.l10n.weekdays.shorthand.join("|") + ")";
          tokenRegex.l = "(" + self.l10n.weekdays.longhand.join("|") + ")";
          tokenRegex.M = "(" + self.l10n.months.shorthand.join("|") + ")";
          tokenRegex.F = "(" + self.l10n.months.longhand.join("|") + ")";
          tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
          var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element.dataset || {})));
          if (userConfig.time_24hr === undefined &&
              flatpickr.defaultConfig.time_24hr === undefined) {
              self.config.time_24hr = self.l10n.time_24hr;
          }
          self.formatDate = createDateFormatter(self);
          self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
      }
      function positionCalendar(customPositionElement) {
          if (typeof self.config.position === "function") {
              return void self.config.position(self, customPositionElement);
          }
          if (self.calendarContainer === undefined)
              return;
          triggerEvent("onPreCalendarPosition");
          var positionElement = customPositionElement || self._positionElement;
          var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, (function (acc, child) { return acc + child.offsetHeight; }), 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" ||
              (configPosVertical !== "below" &&
                  distanceFromBottom < calendarHeight &&
                  inputBounds.top > calendarHeight);
          var top = window.pageYOffset +
              inputBounds.top +
              (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
          toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
          toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
          if (self.config.inline)
              return;
          var left = window.pageXOffset + inputBounds.left;
          var isCenter = false;
          var isRight = false;
          if (configPosHorizontal === "center") {
              left -= (calendarWidth - inputBounds.width) / 2;
              isCenter = true;
          }
          else if (configPosHorizontal === "right") {
              left -= calendarWidth - inputBounds.width;
              isRight = true;
          }
          toggleClass(self.calendarContainer, "arrowLeft", !isCenter && !isRight);
          toggleClass(self.calendarContainer, "arrowCenter", isCenter);
          toggleClass(self.calendarContainer, "arrowRight", isRight);
          var right = window.document.body.offsetWidth -
              (window.pageXOffset + inputBounds.right);
          var rightMost = left + calendarWidth > window.document.body.offsetWidth;
          var centerMost = right + calendarWidth > window.document.body.offsetWidth;
          toggleClass(self.calendarContainer, "rightMost", rightMost);
          if (self.config.static)
              return;
          self.calendarContainer.style.top = top + "px";
          if (!rightMost) {
              self.calendarContainer.style.left = left + "px";
              self.calendarContainer.style.right = "auto";
          }
          else if (!centerMost) {
              self.calendarContainer.style.left = "auto";
              self.calendarContainer.style.right = right + "px";
          }
          else {
              var doc = getDocumentStyleSheet();
              if (doc === undefined)
                  return;
              var bodyWidth = window.document.body.offsetWidth;
              var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
              var centerBefore = ".flatpickr-calendar.centerMost:before";
              var centerAfter = ".flatpickr-calendar.centerMost:after";
              var centerIndex = doc.cssRules.length;
              var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
              toggleClass(self.calendarContainer, "rightMost", false);
              toggleClass(self.calendarContainer, "centerMost", true);
              doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
              self.calendarContainer.style.left = centerLeft + "px";
              self.calendarContainer.style.right = "auto";
          }
      }
      function getDocumentStyleSheet() {
          var editableSheet = null;
          for (var i = 0; i < document.styleSheets.length; i++) {
              var sheet = document.styleSheets[i];
              if (!sheet.cssRules)
                  continue;
              try {
                  sheet.cssRules;
              }
              catch (err) {
                  continue;
              }
              editableSheet = sheet;
              break;
          }
          return editableSheet != null ? editableSheet : createStyleSheet();
      }
      function createStyleSheet() {
          var style = document.createElement("style");
          document.head.appendChild(style);
          return style.sheet;
      }
      function redraw() {
          if (self.config.noCalendar || self.isMobile)
              return;
          buildMonthSwitch();
          updateNavigationCurrentMonth();
          buildDays();
      }
      function focusAndClose() {
          self._input.focus();
          if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
              navigator.msMaxTouchPoints !== undefined) {
              setTimeout(self.close, 0);
          }
          else {
              self.close();
          }
      }
      function selectDate(e) {
          e.preventDefault();
          e.stopPropagation();
          var isSelectable = function (day) {
              return day.classList &&
                  day.classList.contains("flatpickr-day") &&
                  !day.classList.contains("flatpickr-disabled") &&
                  !day.classList.contains("notAllowed");
          };
          var t = findParent(getEventTarget(e), isSelectable);
          if (t === undefined)
              return;
          var target = t;
          var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
          var shouldChangeMonth = (selectedDate.getMonth() < self.currentMonth ||
              selectedDate.getMonth() >
                  self.currentMonth + self.config.showMonths - 1) &&
              self.config.mode !== "range";
          self.selectedDateElem = target;
          if (self.config.mode === "single")
              self.selectedDates = [selectedDate];
          else if (self.config.mode === "multiple") {
              var selectedIndex = isDateSelected(selectedDate);
              if (selectedIndex)
                  self.selectedDates.splice(parseInt(selectedIndex), 1);
              else
                  self.selectedDates.push(selectedDate);
          }
          else if (self.config.mode === "range") {
              if (self.selectedDates.length === 2) {
                  self.clear(false, false);
              }
              self.latestSelectedDateObj = selectedDate;
              self.selectedDates.push(selectedDate);
              if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                  self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
          }
          setHoursFromInputs();
          if (shouldChangeMonth) {
              var isNewYear = self.currentYear !== selectedDate.getFullYear();
              self.currentYear = selectedDate.getFullYear();
              self.currentMonth = selectedDate.getMonth();
              if (isNewYear) {
                  triggerEvent("onYearChange");
                  buildMonthSwitch();
              }
              triggerEvent("onMonthChange");
          }
          updateNavigationCurrentMonth();
          buildDays();
          updateValue();
          if (!shouldChangeMonth &&
              self.config.mode !== "range" &&
              self.config.showMonths === 1)
              focusOnDayElem(target);
          else if (self.selectedDateElem !== undefined &&
              self.hourElement === undefined) {
              self.selectedDateElem && self.selectedDateElem.focus();
          }
          if (self.hourElement !== undefined)
              self.hourElement !== undefined && self.hourElement.focus();
          if (self.config.closeOnSelect) {
              var single = self.config.mode === "single" && !self.config.enableTime;
              var range = self.config.mode === "range" &&
                  self.selectedDates.length === 2 &&
                  !self.config.enableTime;
              if (single || range) {
                  focusAndClose();
              }
          }
          triggerChange();
      }
      var CALLBACKS = {
          locale: [setupLocale, updateWeekdays],
          showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
          minDate: [jumpToDate],
          maxDate: [jumpToDate],
          positionElement: [updatePositionElement],
          clickOpens: [
              function () {
                  if (self.config.clickOpens === true) {
                      bind(self._input, "focus", self.open);
                      bind(self._input, "click", self.open);
                  }
                  else {
                      self._input.removeEventListener("focus", self.open);
                      self._input.removeEventListener("click", self.open);
                  }
              },
          ],
      };
      function set(option, value) {
          if (option !== null && typeof option === "object") {
              Object.assign(self.config, option);
              for (var key in option) {
                  if (CALLBACKS[key] !== undefined)
                      CALLBACKS[key].forEach(function (x) { return x(); });
              }
          }
          else {
              self.config[option] = value;
              if (CALLBACKS[option] !== undefined)
                  CALLBACKS[option].forEach(function (x) { return x(); });
              else if (HOOKS.indexOf(option) > -1)
                  self.config[option] = arrayify(value);
          }
          self.redraw();
          updateValue(true);
      }
      function setSelectedDate(inputDate, format) {
          var dates = [];
          if (inputDate instanceof Array)
              dates = inputDate.map(function (d) { return self.parseDate(d, format); });
          else if (inputDate instanceof Date || typeof inputDate === "number")
              dates = [self.parseDate(inputDate, format)];
          else if (typeof inputDate === "string") {
              switch (self.config.mode) {
                  case "single":
                  case "time":
                      dates = [self.parseDate(inputDate, format)];
                      break;
                  case "multiple":
                      dates = inputDate
                          .split(self.config.conjunction)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
                  case "range":
                      dates = inputDate
                          .split(self.l10n.rangeSeparator)
                          .map(function (date) { return self.parseDate(date, format); });
                      break;
              }
          }
          else
              self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
          self.selectedDates = (self.config.allowInvalidPreload
              ? dates
              : dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); }));
          if (self.config.mode === "range")
              self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
      }
      function setDate(date, triggerChange, format) {
          if (triggerChange === void 0) { triggerChange = false; }
          if (format === void 0) { format = self.config.dateFormat; }
          if ((date !== 0 && !date) || (date instanceof Array && date.length === 0))
              return self.clear(triggerChange);
          setSelectedDate(date, format);
          self.latestSelectedDateObj =
              self.selectedDates[self.selectedDates.length - 1];
          self.redraw();
          jumpToDate(undefined, triggerChange);
          setHoursFromDate();
          if (self.selectedDates.length === 0) {
              self.clear(false);
          }
          updateValue(triggerChange);
          if (triggerChange)
              triggerEvent("onChange");
      }
      function parseDateRules(arr) {
          return arr
              .slice()
              .map(function (rule) {
              if (typeof rule === "string" ||
                  typeof rule === "number" ||
                  rule instanceof Date) {
                  return self.parseDate(rule, undefined, true);
              }
              else if (rule &&
                  typeof rule === "object" &&
                  rule.from &&
                  rule.to)
                  return {
                      from: self.parseDate(rule.from, undefined),
                      to: self.parseDate(rule.to, undefined),
                  };
              return rule;
          })
              .filter(function (x) { return x; });
      }
      function setupDates() {
          self.selectedDates = [];
          self.now = self.parseDate(self.config.now) || new Date();
          var preloadedDate = self.config.defaultDate ||
              ((self.input.nodeName === "INPUT" ||
                  self.input.nodeName === "TEXTAREA") &&
                  self.input.placeholder &&
                  self.input.value === self.input.placeholder
                  ? null
                  : self.input.value);
          if (preloadedDate)
              setSelectedDate(preloadedDate, self.config.dateFormat);
          self._initialDate =
              self.selectedDates.length > 0
                  ? self.selectedDates[0]
                  : self.config.minDate &&
                      self.config.minDate.getTime() > self.now.getTime()
                      ? self.config.minDate
                      : self.config.maxDate &&
                          self.config.maxDate.getTime() < self.now.getTime()
                          ? self.config.maxDate
                          : self.now;
          self.currentYear = self._initialDate.getFullYear();
          self.currentMonth = self._initialDate.getMonth();
          if (self.selectedDates.length > 0)
              self.latestSelectedDateObj = self.selectedDates[0];
          if (self.config.minTime !== undefined)
              self.config.minTime = self.parseDate(self.config.minTime, "H:i");
          if (self.config.maxTime !== undefined)
              self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
          self.minDateHasTime =
              !!self.config.minDate &&
                  (self.config.minDate.getHours() > 0 ||
                      self.config.minDate.getMinutes() > 0 ||
                      self.config.minDate.getSeconds() > 0);
          self.maxDateHasTime =
              !!self.config.maxDate &&
                  (self.config.maxDate.getHours() > 0 ||
                      self.config.maxDate.getMinutes() > 0 ||
                      self.config.maxDate.getSeconds() > 0);
      }
      function setupInputs() {
          self.input = getInputElem();
          if (!self.input) {
              self.config.errorHandler(new Error("Invalid input element specified"));
              return;
          }
          self.input._type = self.input.type;
          self.input.type = "text";
          self.input.classList.add("flatpickr-input");
          self._input = self.input;
          if (self.config.altInput) {
              self.altInput = createElement(self.input.nodeName, self.config.altInputClass);
              self._input = self.altInput;
              self.altInput.placeholder = self.input.placeholder;
              self.altInput.disabled = self.input.disabled;
              self.altInput.required = self.input.required;
              self.altInput.tabIndex = self.input.tabIndex;
              self.altInput.type = "text";
              self.input.setAttribute("type", "hidden");
              if (!self.config.static && self.input.parentNode)
                  self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
          }
          if (!self.config.allowInput)
              self._input.setAttribute("readonly", "readonly");
          updatePositionElement();
      }
      function updatePositionElement() {
          self._positionElement = self.config.positionElement || self._input;
      }
      function setupMobile() {
          var inputType = self.config.enableTime
              ? self.config.noCalendar
                  ? "time"
                  : "datetime-local"
              : "date";
          self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
          self.mobileInput.tabIndex = 1;
          self.mobileInput.type = inputType;
          self.mobileInput.disabled = self.input.disabled;
          self.mobileInput.required = self.input.required;
          self.mobileInput.placeholder = self.input.placeholder;
          self.mobileFormatStr =
              inputType === "datetime-local"
                  ? "Y-m-d\\TH:i:S"
                  : inputType === "date"
                      ? "Y-m-d"
                      : "H:i:S";
          if (self.selectedDates.length > 0) {
              self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
          }
          if (self.config.minDate)
              self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
          if (self.config.maxDate)
              self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
          if (self.input.getAttribute("step"))
              self.mobileInput.step = String(self.input.getAttribute("step"));
          self.input.type = "hidden";
          if (self.altInput !== undefined)
              self.altInput.type = "hidden";
          try {
              if (self.input.parentNode)
                  self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
          }
          catch (_a) { }
          bind(self.mobileInput, "change", function (e) {
              self.setDate(getEventTarget(e).value, false, self.mobileFormatStr);
              triggerEvent("onChange");
              triggerEvent("onClose");
          });
      }
      function toggle(e) {
          if (self.isOpen === true)
              return self.close();
          self.open(e);
      }
      function triggerEvent(event, data) {
          if (self.config === undefined)
              return;
          var hooks = self.config[event];
          if (hooks !== undefined && hooks.length > 0) {
              for (var i = 0; hooks[i] && i < hooks.length; i++)
                  hooks[i](self.selectedDates, self.input.value, self, data);
          }
          if (event === "onChange") {
              self.input.dispatchEvent(createEvent("change"));
              self.input.dispatchEvent(createEvent("input"));
          }
      }
      function createEvent(name) {
          var e = document.createEvent("Event");
          e.initEvent(name, true, true);
          return e;
      }
      function isDateSelected(date) {
          for (var i = 0; i < self.selectedDates.length; i++) {
              var selectedDate = self.selectedDates[i];
              if (selectedDate instanceof Date &&
                  compareDates(selectedDate, date) === 0)
                  return "" + i;
          }
          return false;
      }
      function isDateInRange(date) {
          if (self.config.mode !== "range" || self.selectedDates.length < 2)
              return false;
          return (compareDates(date, self.selectedDates[0]) >= 0 &&
              compareDates(date, self.selectedDates[1]) <= 0);
      }
      function updateNavigationCurrentMonth() {
          if (self.config.noCalendar || self.isMobile || !self.monthNav)
              return;
          self.yearElements.forEach(function (yearElement, i) {
              var d = new Date(self.currentYear, self.currentMonth, 1);
              d.setMonth(self.currentMonth + i);
              if (self.config.showMonths > 1 ||
                  self.config.monthSelectorType === "static") {
                  self.monthElements[i].textContent =
                      monthToStr(d.getMonth(), self.config.shorthandCurrentMonth, self.l10n) + " ";
              }
              else {
                  self.monthsDropdownContainer.value = d.getMonth().toString();
              }
              yearElement.value = d.getFullYear().toString();
          });
          self._hidePrevMonthArrow =
              self.config.minDate !== undefined &&
                  (self.currentYear === self.config.minDate.getFullYear()
                      ? self.currentMonth <= self.config.minDate.getMonth()
                      : self.currentYear < self.config.minDate.getFullYear());
          self._hideNextMonthArrow =
              self.config.maxDate !== undefined &&
                  (self.currentYear === self.config.maxDate.getFullYear()
                      ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                      : self.currentYear > self.config.maxDate.getFullYear());
      }
      function getDateStr(specificFormat) {
          var format = specificFormat ||
              (self.config.altInput ? self.config.altFormat : self.config.dateFormat);
          return self.selectedDates
              .map(function (dObj) { return self.formatDate(dObj, format); })
              .filter(function (d, i, arr) {
              return self.config.mode !== "range" ||
                  self.config.enableTime ||
                  arr.indexOf(d) === i;
          })
              .join(self.config.mode !== "range"
              ? self.config.conjunction
              : self.l10n.rangeSeparator);
      }
      function updateValue(triggerChange) {
          if (triggerChange === void 0) { triggerChange = true; }
          if (self.mobileInput !== undefined && self.mobileFormatStr) {
              self.mobileInput.value =
                  self.latestSelectedDateObj !== undefined
                      ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                      : "";
          }
          self.input.value = getDateStr(self.config.dateFormat);
          if (self.altInput !== undefined) {
              self.altInput.value = getDateStr(self.config.altFormat);
          }
          if (triggerChange !== false)
              triggerEvent("onValueUpdate");
      }
      function onMonthNavClick(e) {
          var eventTarget = getEventTarget(e);
          var isPrevMonth = self.prevMonthNav.contains(eventTarget);
          var isNextMonth = self.nextMonthNav.contains(eventTarget);
          if (isPrevMonth || isNextMonth) {
              changeMonth(isPrevMonth ? -1 : 1);
          }
          else if (self.yearElements.indexOf(eventTarget) >= 0) {
              eventTarget.select();
          }
          else if (eventTarget.classList.contains("arrowUp")) {
              self.changeYear(self.currentYear + 1);
          }
          else if (eventTarget.classList.contains("arrowDown")) {
              self.changeYear(self.currentYear - 1);
          }
      }
      function timeWrapper(e) {
          e.preventDefault();
          var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
          if (self.amPM !== undefined && eventTarget === self.amPM) {
              self.amPM.textContent =
                  self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
          }
          var min = parseFloat(input.getAttribute("min")), max = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta ||
              (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
          var newValue = curValue + step * delta;
          if (typeof input.value !== "undefined" && input.value.length === 2) {
              var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
              if (newValue < min) {
                  newValue =
                      max +
                          newValue +
                          int(!isHourElem) +
                          (int(isHourElem) && int(!self.amPM));
                  if (isMinuteElem)
                      incrementNumInput(undefined, -1, self.hourElement);
              }
              else if (newValue > max) {
                  newValue =
                      input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                  if (isMinuteElem)
                      incrementNumInput(undefined, 1, self.hourElement);
              }
              if (self.amPM &&
                  isHourElem &&
                  (step === 1
                      ? newValue + curValue === 23
                      : Math.abs(newValue - curValue) > step)) {
                  self.amPM.textContent =
                      self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
              }
              input.value = pad(newValue);
          }
      }
      init();
      return self;
  }
  function _flatpickr(nodeList, config) {
      var nodes = Array.prototype.slice
          .call(nodeList)
          .filter(function (x) { return x instanceof HTMLElement; });
      var instances = [];
      for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          try {
              if (node.getAttribute("data-fp-omit") !== null)
                  continue;
              if (node._flatpickr !== undefined) {
                  node._flatpickr.destroy();
                  node._flatpickr = undefined;
              }
              node._flatpickr = FlatpickrInstance(node, config || {});
              instances.push(node._flatpickr);
          }
          catch (e) {
              console.error(e);
          }
      }
      return instances.length === 1 ? instances[0] : instances;
  }
  if (typeof HTMLElement !== "undefined" &&
      typeof HTMLCollection !== "undefined" &&
      typeof NodeList !== "undefined") {
      HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
      HTMLElement.prototype.flatpickr = function (config) {
          return _flatpickr([this], config);
      };
  }
  var flatpickr = function (selector, config) {
      if (typeof selector === "string") {
          return _flatpickr(window.document.querySelectorAll(selector), config);
      }
      else if (selector instanceof Node) {
          return _flatpickr([selector], config);
      }
      else {
          return _flatpickr(selector, config);
      }
  };
  flatpickr.defaultConfig = {};
  flatpickr.l10ns = {
      en: __assign({}, english),
      default: __assign({}, english),
  };
  flatpickr.localize = function (l10n) {
      flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
  };
  flatpickr.setDefaults = function (config) {
      flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
  };
  flatpickr.parseDate = createDateParser({});
  flatpickr.formatDate = createDateFormatter({});
  flatpickr.compareDates = compareDates;
  if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
      jQuery.fn.flatpickr = function (config) {
          return _flatpickr(this, config);
      };
  }
  Date.prototype.fp_incr = function (days) {
      return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
  };
  if (typeof window !== "undefined") {
      window.flatpickr = flatpickr;
  }

  var fp = typeof window !== "undefined" && window.flatpickr !== undefined
      ? window.flatpickr
      : {
          l10ns: {},
      };
  var Spanish = {
      weekdays: {
          shorthand: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          longhand: [
              "Domingo",
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
          ],
      },
      months: {
          shorthand: [
              "Ene",
              "Feb",
              "Mar",
              "Abr",
              "May",
              "Jun",
              "Jul",
              "Ago",
              "Sep",
              "Oct",
              "Nov",
              "Dic",
          ],
          longhand: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
          ],
      },
      ordinal: function () {
          return "º";
      },
      firstDayOfWeek: 1,
      rangeSeparator: " a ",
      time_24hr: true,
  };
  fp.l10ns.es = Spanish;
  fp.l10ns;

  var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  };
  function rangePlugin(config) {
      if (config === void 0) { config = {}; }
      return function (fp) {
          var dateFormat = "", secondInput, _secondInputFocused, _prevDates;
          var createSecondInput = function () {
              if (config.input) {
                  secondInput =
                      config.input instanceof Element
                          ? config.input
                          : window.document.querySelector(config.input);
                  if (!secondInput) {
                      fp.config.errorHandler(new Error("Invalid input element specified"));
                      return;
                  }
                  if (fp.config.wrap) {
                      secondInput = secondInput.querySelector("[data-input]");
                  }
              }
              else {
                  secondInput = fp._input.cloneNode();
                  secondInput.removeAttribute("id");
                  secondInput._flatpickr = undefined;
              }
              if (secondInput.value) {
                  var parsedDate = fp.parseDate(secondInput.value);
                  if (parsedDate)
                      fp.selectedDates.push(parsedDate);
              }
              secondInput.setAttribute("data-fp-omit", "");
              if (fp.config.clickOpens) {
                  fp._bind(secondInput, ["focus", "click"], function () {
                      if (fp.selectedDates[1]) {
                          fp.latestSelectedDateObj = fp.selectedDates[1];
                          fp._setHoursFromDate(fp.selectedDates[1]);
                          fp.jumpToDate(fp.selectedDates[1]);
                      }
                      _secondInputFocused = true;
                      fp.isOpen = false;
                      fp.open(undefined, config.position === "left" ? fp._input : secondInput);
                  });
                  fp._bind(fp._input, ["focus", "click"], function (e) {
                      e.preventDefault();
                      fp.isOpen = false;
                      fp.open();
                  });
              }
              if (fp.config.allowInput)
                  fp._bind(secondInput, "keydown", function (e) {
                      if (e.key === "Enter") {
                          fp.setDate([fp.selectedDates[0], secondInput.value], true, dateFormat);
                          secondInput.click();
                      }
                  });
              if (!config.input)
                  fp._input.parentNode &&
                      fp._input.parentNode.insertBefore(secondInput, fp._input.nextSibling);
          };
          var plugin = {
              onParseConfig: function () {
                  fp.config.mode = "range";
                  dateFormat = fp.config.altInput
                      ? fp.config.altFormat
                      : fp.config.dateFormat;
              },
              onReady: function () {
                  createSecondInput();
                  fp.config.ignoredFocusElements.push(secondInput);
                  if (fp.config.allowInput) {
                      fp._input.removeAttribute("readonly");
                      secondInput.removeAttribute("readonly");
                  }
                  else {
                      secondInput.setAttribute("readonly", "readonly");
                  }
                  fp._bind(fp._input, "focus", function () {
                      fp.latestSelectedDateObj = fp.selectedDates[0];
                      fp._setHoursFromDate(fp.selectedDates[0]);
                      _secondInputFocused = false;
                      fp.jumpToDate(fp.selectedDates[0]);
                  });
                  if (fp.config.allowInput)
                      fp._bind(fp._input, "keydown", function (e) {
                          if (e.key === "Enter")
                              fp.setDate([fp._input.value, fp.selectedDates[1]], true, dateFormat);
                      });
                  fp.setDate(fp.selectedDates, false);
                  plugin.onValueUpdate(fp.selectedDates);
                  fp.loadedPlugins.push("range");
              },
              onPreCalendarPosition: function () {
                  if (_secondInputFocused) {
                      fp._positionElement = secondInput;
                      setTimeout(function () {
                          fp._positionElement = fp._input;
                      }, 0);
                  }
              },
              onChange: function () {
                  if (!fp.selectedDates.length) {
                      setTimeout(function () {
                          if (fp.selectedDates.length)
                              return;
                          secondInput.value = "";
                          _prevDates = [];
                      }, 10);
                  }
                  if (_secondInputFocused) {
                      setTimeout(function () {
                          secondInput.focus();
                      }, 0);
                  }
              },
              onDestroy: function () {
                  if (!config.input)
                      secondInput.parentNode &&
                          secondInput.parentNode.removeChild(secondInput);
              },
              onValueUpdate: function (selDates) {
                  var _a, _b, _c;
                  if (!secondInput)
                      return;
                  _prevDates =
                      !_prevDates || selDates.length >= _prevDates.length
                          ? __spreadArrays(selDates) : _prevDates;
                  if (_prevDates.length > selDates.length) {
                      var newSelectedDate = selDates[0];
                      var newDates = _secondInputFocused
                          ? [_prevDates[0], newSelectedDate]
                          : [newSelectedDate, _prevDates[1]];
                      if (newDates[0].getTime() > newDates[1].getTime()) {
                          if (_secondInputFocused) {
                              newDates[0] = newDates[1];
                          }
                          else {
                              newDates[1] = newDates[0];
                          }
                      }
                      fp.setDate(newDates, false);
                      _prevDates = __spreadArrays(newDates);
                  }
                  _a = fp.selectedDates.map(function (d) { return fp.formatDate(d, dateFormat); }), _b = _a[0], fp._input.value = _b === void 0 ? "" : _b, _c = _a[1], secondInput.value = _c === void 0 ? "" : _c;
              },
          };
          return plugin;
      };
  }

  function calendarHistory() {
    console.log("calendarHistory");
    flatpickr("#startDate", {
      locale: 'es',
      plugins: [new rangePlugin({ input: "#endDate" })],
      dateFormat: "d-m-Y",
      disableMobile: "true"
    });
  }

  function historyNavBar() {
    const historyNav = document.querySelectorAll(".history__nav");
    const historyBlock = document.querySelectorAll(".block");

    historyNav.forEach((nav) => {
      nav.addEventListener("click", (e) => {
        historyBlock.forEach((block) => {
          block.classList.remove("active-block");
        });
        historyNav.forEach((nav) => {
          nav.classList.remove("is-active");
        });
        e.currentTarget.classList.add("is-active");
        let dataBlock = e.currentTarget.dataset.block;
        console.log(dataBlock);
        let target = document.querySelector(dataBlock);
        target.classList.add("active-block");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    historyNavBar();
    carouselMenuHistory();
    calendarHistory();
  });

})();
