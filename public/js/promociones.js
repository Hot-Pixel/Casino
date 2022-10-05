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

  function toArray$1(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray$1(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray$1(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
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
    toArray$1(keys || ownKeys(object)).forEach(function (key) {
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
    toggleClass(elm, classes, false);
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

  function clamp$1(number, x, y) {
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

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
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
      binder.bind(bus, toArray$1(events).join(" "), function (e) {
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
      return includes(toArray$1(states), state);
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
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
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
        slide.id = root.id + "-slide" + pad(index + 1);
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
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }

    function updateActivity() {
      var active = isActive();

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
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
        toggleClass(slide, CLASS_VISIBLE, visible);
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
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray$1(matcher), Slide2.index);
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
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
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
        position = clamp$1(position, 0, orient(sliderSize() - listSize()));
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
      var index = clamp$1(currIndex, 0, slideCount - 1);

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
        index = isLoop ? control : clamp$1(control, 0, getEnd());
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
      return clamp$1(hasFocus() ? page : perPage * page, 0, getEnd());
    }

    function toPage(index) {
      return hasFocus() ? index : floor((index >= getEnd() ? slideCount - 1 : index) / perPage);
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp$1(closest, 0, getEnd()) : closest;
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
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
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

  var mixitup$1 = {exports: {}};

  /**!
   * MixItUp v3.3.1
   * A high-performance, dependency-free library for animated filtering, sorting and more
   * Build 94e0fbf6-cd0b-4987-b3c0-14b59b67b8a0
   *
   * @copyright Copyright 2014-2018 KunkaLabs Limited.
   * @author    KunkaLabs Limited.
   * @link      https://www.kunkalabs.com/mixitup/
   *
   * @license   Commercial use requires a commercial license.
   *            https://www.kunkalabs.com/mixitup/licenses/
   *
   *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
   *            http://creativecommons.org/licenses/by-nc/3.0/
   */

  (function (module, exports) {
  	(function(window) {

  	    var mixitup = null,
  	        h       = null;

  	    (function() {
  	        var VENDORS = ['webkit', 'moz', 'o', 'ms'],
  	            canary  = window.document.createElement('div'),
  	            i       = -1;

  	        // window.requestAnimationFrame

  	        for (i = 0; i < VENDORS.length && !window.requestAnimationFrame; i++) {
  	            window.requestAnimationFrame = window[VENDORS[i] + 'RequestAnimationFrame'];
  	        }

  	        // Element.nextElementSibling

  	        if (typeof canary.nextElementSibling === 'undefined') {
  	            Object.defineProperty(window.Element.prototype, 'nextElementSibling', {
  	                get: function() {
  	                    var el = this.nextSibling;

  	                    while (el) {
  	                        if (el.nodeType === 1) {
  	                            return el;
  	                        }

  	                        el = el.nextSibling;
  	                    }

  	                    return null;
  	                }
  	            });
  	        }

  	        // Element.matches

  	        (function(ElementPrototype) {
  	            ElementPrototype.matches =
  	                ElementPrototype.matches ||
  	                ElementPrototype.machesSelector ||
  	                ElementPrototype.mozMatchesSelector ||
  	                ElementPrototype.msMatchesSelector ||
  	                ElementPrototype.oMatchesSelector ||
  	                ElementPrototype.webkitMatchesSelector ||
  	                function (selector) {
  	                    return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(selector), this) > -1;
  	                };
  	        })(window.Element.prototype);

  	        // Object.keys
  	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

  	        if (!Object.keys) {
  	            Object.keys = (function() {
  	                var hasOwnProperty      = Object.prototype.hasOwnProperty,
  	                    hasDontEnumBug      = false,
  	                    dontEnums           = [],
  	                    dontEnumsLength     = -1;

  	                hasDontEnumBug = !({
  	                    toString: null
  	                })
  	                    .propertyIsEnumerable('toString');

  	                dontEnums = [
  	                    'toString',
  	                    'toLocaleString',
  	                    'valueOf',
  	                    'hasOwnProperty',
  	                    'isPrototypeOf',
  	                    'propertyIsEnumerable',
  	                    'constructor'
  	                ];

  	                dontEnumsLength = dontEnums.length;

  	                return function(obj) {
  	                    var result  = [],
  	                        prop    = '',
  	                        i       = -1;

  	                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
  	                        throw new TypeError('Object.keys called on non-object');
  	                    }

  	                    for (prop in obj) {
  	                        if (hasOwnProperty.call(obj, prop)) {
  	                            result.push(prop);
  	                        }
  	                    }

  	                    if (hasDontEnumBug) {
  	                        for (i = 0; i < dontEnumsLength; i++) {
  	                            if (hasOwnProperty.call(obj, dontEnums[i])) {
  	                                result.push(dontEnums[i]);
  	                            }
  	                        }
  	                    }

  	                    return result;
  	                };
  	            }());
  	        }

  	        // Array.isArray
  	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

  	        if (!Array.isArray) {
  	            Array.isArray = function(arg) {
  	                return Object.prototype.toString.call(arg) === '[object Array]';
  	            };
  	        }

  	        // Object.create
  	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create

  	        if (typeof Object.create !== 'function') {
  	            Object.create = (function(undefined$1) {
  	                var Temp = function() {};

  	                return function (prototype, propertiesObject) {
  	                    if (prototype !== Object(prototype) && prototype !== null) {
  	                        throw TypeError('Argument must be an object, or null');
  	                    }

  	                    Temp.prototype = prototype || {};

  	                    var result = new Temp();

  	                    Temp.prototype = null;

  	                    if (propertiesObject !== undefined$1) {
  	                        Object.defineProperties(result, propertiesObject);
  	                    }

  	                    if (prototype === null) {
  	                        /* jshint ignore:start */
  	                        result.__proto__ = null;
  	                        /* jshint ignore:end */
  	                    }

  	                    return result;
  	                };
  	            })();
  	        }

  	        // String.prototyoe.trim

  	        if (!String.prototype.trim) {
  	            String.prototype.trim = function() {
  	                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  	            };
  	        }

  	        // Array.prototype.indexOf
  	        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

  	        if (!Array.prototype.indexOf) {
  	            Array.prototype.indexOf = function(searchElement) {
  	                var n, k, t, len;

  	                if (this === null) {
  	                    throw new TypeError();
  	                }

  	                t = Object(this);

  	                len = t.length >>> 0;

  	                if (len === 0) {
  	                    return -1;
  	                }

  	                n = 0;

  	                if (arguments.length > 1) {
  	                    n = Number(arguments[1]);

  	                    if (n !== n) {
  	                        n = 0;
  	                    } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
  	                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
  	                    }
  	                }

  	                if (n >= len) {
  	                    return -1;
  	                }

  	                for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
  	                    if (k in t && t[k] === searchElement) {
  	                        return k;
  	                    }
  	                }

  	                return -1;
  	            };
  	        }

  	        // Function.prototype.bind
  	        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind

  	        if (!Function.prototype.bind) {
  	            Function.prototype.bind = function(oThis) {
  	                var aArgs, self, FNOP, fBound;

  	                if (typeof this !== 'function') {
  	                    throw new TypeError();
  	                }

  	                aArgs = Array.prototype.slice.call(arguments, 1);

  	                self = this;

  	                FNOP = function() {};

  	                fBound = function() {
  	                    return self.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
  	                };

  	                if (this.prototype) {
  	                    FNOP.prototype = this.prototype;
  	                }

  	                fBound.prototype = new FNOP();

  	                return fBound;
  	            };
  	        }

  	        // Element.prototype.dispatchEvent

  	        if (!window.Element.prototype.dispatchEvent) {
  	            window.Element.prototype.dispatchEvent = function(event) {
  	                try {
  	                    return this.fireEvent('on' + event.type, event);
  	                } catch (err) {}
  	            };
  	        }
  	    })();

  	    /**
  	     * The `mixitup()` "factory" function creates and returns individual instances
  	     * of MixItUp, known as "mixers", on which API methods can be called.
  	     *
  	     * When loading MixItUp via a script tag, the factory function is accessed
  	     * via the global variable `mixitup`. When using a module loading
  	     * system (e.g. ES2015, CommonJS, RequireJS), the factory function is
  	     * exported into your module when you require the MixItUp library.
  	     *
  	     * @example
  	     * mixitup(container [,config] [,foreignDoc])
  	     *
  	     * @example <caption>Example 1: Creating a mixer instance with an element reference</caption>
  	     * var containerEl = document.querySelector('.container');
  	     *
  	     * var mixer = mixitup(containerEl);
  	     *
  	     * @example <caption>Example 2: Creating a mixer instance with a selector string</caption>
  	     * var mixer = mixitup('.container');
  	     *
  	     * @example <caption>Example 3: Passing a configuration object</caption>
  	     * var mixer = mixitup(containerEl, {
  	     *     animation: {
  	     *         effects: 'fade scale(0.5)'
  	     *     }
  	     * });
  	     *
  	     * @example <caption>Example 4: Passing an iframe reference</caption>
  	     * var mixer = mixitup(containerEl, config, foreignDocument);
  	     *
  	     * @global
  	     * @namespace
  	     * @public
  	     * @kind        function
  	     * @since       3.0.0
  	     * @param       {(Element|string)}  container
  	     *      A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
  	     * @param       {object}            [config]
  	     *      An optional "configuration object" used to customize the behavior of the MixItUp instance.
  	     * @param       {object}            [foreignDoc]
  	     *      An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
  	     * @return      {mixitup.Mixer}
  	     *      A "mixer" object holding the MixItUp instance.
  	     */

  	    mixitup = function(container, config, foreignDoc) {
  	        var el                  = null,
  	            returnCollection    = false,
  	            instance            = null,
  	            facade              = null,
  	            doc                 = null,
  	            output              = null,
  	            instances           = [],
  	            id                  = '',
  	            elements            = [],
  	            i                   = -1;

  	        doc = foreignDoc || window.document;

  	        if (returnCollection = arguments[3]) {
  	            // A non-documented 4th paramater enabling control of multiple instances

  	            returnCollection = typeof returnCollection === 'boolean';
  	        }

  	        if (typeof container === 'string') {
  	            elements = doc.querySelectorAll(container);
  	        } else if (container && typeof container === 'object' && h.isElement(container, doc)) {
  	            elements = [container];
  	        } else if (container && typeof container === 'object' && container.length) {
  	            // Although not documented, the container may also be an array-like list of
  	            // elements such as a NodeList or jQuery collection, is returnCollection is true

  	            elements = container;
  	        } else {
  	            throw new Error(mixitup.messages.errorFactoryInvalidContainer());
  	        }

  	        if (elements.length < 1) {
  	            throw new Error(mixitup.messages.errorFactoryContainerNotFound());
  	        }

  	        for (i = 0; el = elements[i]; i++) {
  	            if (i > 0 && !returnCollection) break;

  	            if (!el.id) {
  	                id = 'MixItUp' + h.randomHex();

  	                el.id = id;
  	            } else {
  	                id = el.id;
  	            }

  	            if (mixitup.instances[id] instanceof mixitup.Mixer) {
  	                instance = mixitup.instances[id];

  	                if (!config || (config && config.debug && config.debug.showWarnings !== false)) {
  	                    console.warn(mixitup.messages.warningFactoryPreexistingInstance());
  	                }
  	            } else {
  	                instance = new mixitup.Mixer();

  	                instance.attach(el, doc, id, config);

  	                mixitup.instances[id] = instance;
  	            }

  	            facade = new mixitup.Facade(instance);

  	            if (config && config.debug && config.debug.enable) {
  	                instances.push(instance);
  	            } else {
  	                instances.push(facade);
  	            }
  	        }

  	        if (returnCollection) {
  	            output = new mixitup.Collection(instances);
  	        } else {
  	            // Return the first instance regardless

  	            output = instances[0];
  	        }

  	        return output;
  	    };

  	    /**
  	     * The `.use()` static method is used to extend the functionality of mixitup with compatible
  	     * extensions and libraries in an environment with modular scoping e.g. ES2015, CommonJS, or RequireJS.
  	     *
  	     * You need only call the `.use()` function once per project, per extension, as module loaders
  	     * will cache a single reference to MixItUp inclusive of all changes made.
  	     *
  	     * @example
  	     * mixitup.use(extension)
  	     *
  	     * @example <caption>Example 1: Extending MixItUp with the Pagination Extension</caption>
  	     *
  	     * import mixitup from 'mixitup';
  	     * import mixitupPagination from 'mixitup-pagination';
  	     *
  	     * mixitup.use(mixitupPagination);
  	     *
  	     * // All mixers created by the factory function in all modules will now
  	     * // have pagination functionality
  	     *
  	     * var mixer = mixitup('.container');
  	     *
  	     * @public
  	     * @name     use
  	     * @memberof mixitup
  	     * @kind     function
  	     * @static
  	     * @since    3.0.0
  	     * @param    {*}  extension   A reference to the extension or library to be used.
  	     * @return   {void}
  	     */

  	    mixitup.use = function(extension) {
  	        mixitup.Base.prototype.callActions.call(mixitup, 'beforeUse', arguments);

  	        // Call the extension's factory function, passing
  	        // the mixitup factory as a paramater

  	        if (typeof extension === 'function' && extension.TYPE === 'mixitup-extension') {
  	            // Mixitup extension

  	            if (typeof mixitup.extensions[extension.NAME] === 'undefined') {
  	                extension(mixitup);

  	                mixitup.extensions[extension.NAME] = extension;
  	            }
  	        } else if (extension.fn && extension.fn.jquery) {
  	            // jQuery

  	            mixitup.libraries.$ = extension;
  	        }

  	        mixitup.Base.prototype.callActions.call(mixitup, 'afterUse', arguments);
  	    };

  	    mixitup.instances   = {};
  	    mixitup.extensions  = {};
  	    mixitup.libraries   = {};

  	    /**
  	     * @private
  	     */

  	    h = {

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        cls
  	         * @return  {boolean}
  	         */

  	        hasClass: function(el, cls) {
  	            return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        cls
  	         * @return  {void}
  	         */

  	        addClass: function(el, cls) {
  	            if (!this.hasClass(el, cls)) el.className += el.className ? ' ' + cls : cls;
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        cls
  	         * @return  {void}
  	         */

  	        removeClass: function(el, cls) {
  	            if (this.hasClass(el, cls)) {
  	                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');

  	                el.className = el.className.replace(reg, ' ').trim();
  	            }
  	        },

  	        /**
  	         * Merges the properties of the source object onto the
  	         * target object. Alters the target object.
  	         *
  	         * @private
  	         * @param   {object}    destination
  	         * @param   {object}    source
  	         * @param   {boolean}   [deep=false]
  	         * @param   {boolean}   [handleErrors=false]
  	         * @return  {void}
  	         */

  	        extend: function(destination, source, deep, handleErrors) {
  	            var sourceKeys  = [],
  	                key         = '',
  	                i           = -1;

  	            deep = deep || false;
  	            handleErrors = handleErrors || false;

  	            try {
  	                if (Array.isArray(source)) {
  	                    for (i = 0; i < source.length; i++) {
  	                        sourceKeys.push(i);
  	                    }
  	                } else if (source) {
  	                    sourceKeys = Object.keys(source);
  	                }

  	                for (i = 0; i < sourceKeys.length; i++) {
  	                    key = sourceKeys[i];

  	                    if (!deep || typeof source[key] !== 'object' || this.isElement(source[key])) {
  	                        // All non-object properties, or all properties if shallow extend

  	                        destination[key] = source[key];
  	                    } else if (Array.isArray(source[key])) {
  	                        // Arrays

  	                        if (!destination[key]) {
  	                            destination[key] = [];
  	                        }

  	                        this.extend(destination[key], source[key], deep, handleErrors);
  	                    } else {
  	                        // Objects

  	                        if (!destination[key]) {
  	                            destination[key] = {};
  	                        }

  	                        this.extend(destination[key], source[key], deep, handleErrors);
  	                    }
  	                }
  	            } catch(err) {
  	                if (handleErrors) {
  	                    this.handleExtendError(err, destination);
  	                } else {
  	                    throw err;
  	                }
  	            }

  	            return destination;
  	        },

  	        /**
  	         * @private
  	         * @param   {Error}  err
  	         * @param   {object} destination
  	         * @return  {void}
  	         */

  	        handleExtendError: function(err, destination) {
  	            var re                  = /property "?(\w*)"?[,:] object/i,
  	                matches             = null,
  	                erroneous           = '',
  	                message             = '',
  	                suggestion          = '',
  	                probableMatch       = '',
  	                key                 = '',
  	                mostMatchingChars   = -1,
  	                i                   = -1;

  	            if (err instanceof TypeError && (matches = re.exec(err.message))) {
  	                erroneous = matches[1];

  	                for (key in destination) {
  	                    i = 0;

  	                    while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
  	                        i++;
  	                    }

  	                    if (i > mostMatchingChars) {
  	                        mostMatchingChars = i;
  	                        probableMatch = key;
  	                    }
  	                }

  	                if (mostMatchingChars > 1) {
  	                    suggestion = mixitup.messages.errorConfigInvalidPropertySuggestion({
  	                        probableMatch: probableMatch
  	                    });
  	                }

  	                message = mixitup.messages.errorConfigInvalidProperty({
  	                    erroneous: erroneous,
  	                    suggestion: suggestion
  	                });

  	                throw new TypeError(message);
  	            }

  	            throw err;
  	        },

  	        /**
  	         * @private
  	         * @param   {string} str
  	         * @return  {function}
  	         */

  	        template: function(str) {
  	            var re          = /\${([\w]*)}/g,
  	                dynamics    = {},
  	                matches     = null;

  	            while ((matches = re.exec(str))) {
  	                dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
  	            }

  	            return function(data) {
  	                var key     = '',
  	                    output  = str;

  	                data = data || {};

  	                for (key in dynamics) {
  	                    output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
  	                }

  	                return output;
  	            };
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        type
  	         * @param   {function}      fn
  	         * @param   {boolean}       useCapture
  	         * @return  {void}
  	         */

  	        on: function(el, type, fn, useCapture) {
  	            if (!el) return;

  	            if (el.addEventListener) {
  	                el.addEventListener(type, fn, useCapture);
  	            } else if (el.attachEvent) {
  	                el['e' + type + fn] = fn;

  	                el[type + fn] = function() {
  	                    el['e' + type + fn](window.event);
  	                };

  	                el.attachEvent('on' + type, el[type + fn]);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        type
  	         * @param   {function}      fn
  	         * @return  {void}
  	         */

  	        off: function(el, type, fn) {
  	            if (!el) return;

  	            if (el.removeEventListener) {
  	                el.removeEventListener(type, fn, false);
  	            } else if (el.detachEvent) {
  	                el.detachEvent('on' + type, el[type + fn]);
  	                el[type + fn] = null;
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {string}      eventType
  	         * @param   {object}      detail
  	         * @param   {Document}    [doc]
  	         * @return  {CustomEvent}
  	         */

  	        getCustomEvent: function(eventType, detail, doc) {
  	            var event = null;

  	            doc = doc || window.document;

  	            if (typeof window.CustomEvent === 'function') {
  	                event = new window.CustomEvent(eventType, {
  	                    detail: detail,
  	                    bubbles: true,
  	                    cancelable: true
  	                });
  	            } else if (typeof doc.createEvent === 'function') {
  	                event = doc.createEvent('CustomEvent');
  	                event.initCustomEvent(eventType, true, true, detail);
  	            } else {
  	                event = doc.createEventObject(),
  	                event.type = eventType;

  	                event.returnValue = false;
  	                event.cancelBubble = false;
  	                event.detail = detail;
  	            }

  	            return event;
  	        },

  	        /**
  	         * @private
  	         * @param   {Event} e
  	         * @return  {Event}
  	         */

  	        getOriginalEvent: function(e) {
  	            if (e.touches && e.touches.length) {
  	                return e.touches[0];
  	            } else if (e.changedTouches && e.changedTouches.length) {
  	                return e.changedTouches[0];
  	            } else {
  	                return e;
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        selector
  	         * @return  {Number}
  	         */

  	        index: function(el, selector) {
  	            var i = 0;

  	            while ((el = el.previousElementSibling) !== null) {
  	                if (!selector || el.matches(selector)) {
  	                    ++i;
  	                }
  	            }

  	            return i;
  	        },

  	        /**
  	         * Converts a dash or snake-case string to camel case.
  	         *
  	         * @private
  	         * @param   {string}    str
  	         * @param   {boolean}   [isPascal]
  	         * @return  {string}
  	         */

  	        camelCase: function(str) {
  	            return str.toLowerCase().replace(/([_-][a-z])/g, function($1) {
  	                return $1.toUpperCase().replace(/[_-]/, '');
  	            });
  	        },

  	        /**
  	         * Converts a dash or snake-case string to pascal case.
  	         *
  	         * @private
  	         * @param   {string}    str
  	         * @param   {boolean}   [isPascal]
  	         * @return  {string}
  	         */

  	        pascalCase: function(str) {
  	            return (str = this.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
  	        },

  	        /**
  	         * Converts a camel or pascal-case string to dash case.
  	         *
  	         * @private
  	         * @param   {string}    str
  	         * @return  {string}
  	         */

  	        dashCase: function(str) {
  	            return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}       el
  	         * @param   {HTMLHtmlElement}   [doc]
  	         * @return  {boolean}
  	         */

  	        isElement: function(el, doc) {
  	            doc = doc || window.document;

  	            if (
  	                window.HTMLElement &&
  	                el instanceof window.HTMLElement
  	            ) {
  	                return true;
  	            } else if (
  	                doc.defaultView &&
  	                doc.defaultView.HTMLElement &&
  	                el instanceof doc.defaultView.HTMLElement
  	            ) {
  	                return true;
  	            } else {
  	                return (
  	                    el !== null &&
  	                    el.nodeType === 1 &&
  	                    typeof el.nodeName === 'string'
  	                );
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {string}            htmlString
  	         * @param   {HTMLHtmlElement}   [doc]
  	         * @return  {DocumentFragment}
  	         */

  	        createElement: function(htmlString, doc) {
  	            var frag = null,
  	                temp = null;

  	            doc = doc || window.document;

  	            frag = doc.createDocumentFragment();
  	            temp = doc.createElement('div');

  	            temp.innerHTML = htmlString.trim();

  	            while (temp.firstChild) {
  	                frag.appendChild(temp.firstChild);
  	            }

  	            return frag;
  	        },

  	        /**
  	         * @private
  	         * @param   {Node} node
  	         * @return  {void}
  	         */

  	        removeWhitespace: function(node) {
  	            var deleting;

  	            while (node && node.nodeName === '#text') {
  	                deleting = node;

  	                node = node.previousSibling;

  	                deleting.parentElement && deleting.parentElement.removeChild(deleting);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {Array<*>}  a
  	         * @param   {Array<*>}  b
  	         * @return  {boolean}
  	         */

  	        isEqualArray: function(a, b) {
  	            var i = a.length;

  	            if (i !== b.length) return false;

  	            while (i--) {
  	                if (a[i] !== b[i]) return false;
  	            }

  	            return true;
  	        },

  	        /**
  	         * @private
  	         * @param   {object}  a
  	         * @param   {object}  b
  	         * @return  {boolean}
  	         */

  	        deepEquals: function(a, b) {
  	            var key;

  	            if (typeof a === 'object' && a && typeof b === 'object' && b) {
  	                if (Object.keys(a).length !== Object.keys(b).length) return false;

  	                for (key in a) {
  	                    if (!b.hasOwnProperty(key) || !this.deepEquals(a[key], b[key])) return false;
  	                }
  	            } else if (a !== b) {
  	                return false;
  	            }

  	            return true;
  	        },

  	        /**
  	         * @private
  	         * @param   {Array<*>}  oldArray
  	         * @return  {Array<*>}
  	         */

  	        arrayShuffle: function(oldArray) {
  	            var newArray    = oldArray.slice(),
  	                len         = newArray.length,
  	                i           = len,
  	                p           = -1,
  	                t           = [];

  	            while (i--) {
  	                p = ~~(Math.random() * len);
  	                t = newArray[i];

  	                newArray[i] = newArray[p];
  	                newArray[p] = t;
  	            }

  	            return newArray;
  	        },

  	        /**
  	         * @private
  	         * @param   {object}    list
  	         */

  	        arrayFromList: function(list) {
  	            var output, i;

  	            try {
  	                return Array.prototype.slice.call(list);
  	            } catch(err) {
  	                output = [];

  	                for (i = 0; i < list.length; i++) {
  	                    output.push(list[i]);
  	                }

  	                return output;
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {function}  func
  	         * @param   {Number}    wait
  	         * @param   {boolean}   immediate
  	         * @return  {function}
  	         */

  	        debounce: function(func, wait, immediate) {
  	            var timeout;

  	            return function() {
  	                var self     = this,
  	                    args     = arguments,
  	                    callNow  = immediate && !timeout,
  	                    later    = null;

  	                later = function() {
  	                    timeout  = null;

  	                    if (!immediate) {
  	                        func.apply(self, args);
  	                    }
  	                };

  	                clearTimeout(timeout);

  	                timeout = setTimeout(later, wait);

  	                if (callNow) func.apply(self, args);
  	            };
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   element
  	         * @return  {object}
  	         */

  	        position: function(element) {
  	            var xPosition       = 0,
  	                yPosition       = 0,
  	                offsetParent    = element;

  	            while (element) {
  	                xPosition -= element.scrollLeft;
  	                yPosition -= element.scrollTop;

  	                if (element === offsetParent) {
  	                    xPosition += element.offsetLeft;
  	                    yPosition += element.offsetTop;

  	                    offsetParent = element.offsetParent;
  	                }

  	                element = element.parentElement;
  	            }

  	            return {
  	                x: xPosition,
  	                y: yPosition
  	            };
  	        },

  	        /**
  	         * @private
  	         * @param   {object}    node1
  	         * @param   {object}    node2
  	         * @return  {Number}
  	         */

  	        getHypotenuse: function(node1, node2) {
  	            var distanceX = node1.x - node2.x,
  	                distanceY = node1.y - node2.y;

  	            distanceX = distanceX < 0 ? distanceX * -1 : distanceX,
  	            distanceY = distanceY < 0 ? distanceY * -1 : distanceY;

  	            return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  	        },

  	        /**
  	         * Calcuates the area of intersection between two rectangles and expresses it as
  	         * a ratio in comparison to the area of the first rectangle.
  	         *
  	         * @private
  	         * @param   {Rect}  box1
  	         * @param   {Rect}  box2
  	         * @return  {number}
  	         */

  	        getIntersectionRatio: function(box1, box2) {
  	            var controlArea         = box1.width * box1.height,
  	                intersectionX       = -1,
  	                intersectionY       = -1,
  	                intersectionArea    = -1,
  	                ratio               = -1;

  	            intersectionX =
  	                Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));

  	            intersectionY =
  	                Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));

  	            intersectionArea = intersectionY * intersectionX;

  	            ratio = intersectionArea / controlArea;

  	            return ratio;
  	        },

  	        /**
  	         * @private
  	         * @param   {object}            el
  	         * @param   {string}            selector
  	         * @param   {boolean}           [includeSelf]
  	         * @param   {HTMLHtmlElement}   [doc]
  	         * @return  {Element|null}
  	         */

  	        closestParent: function(el, selector, includeSelf, doc) {
  	            var parent  = el.parentNode;

  	            doc = doc || window.document;

  	            if (includeSelf && el.matches(selector)) {
  	                return el;
  	            }

  	            while (parent && parent != doc.body) {
  	                if (parent.matches && parent.matches(selector)) {
  	                    return parent;
  	                } else if (parent.parentNode) {
  	                    parent = parent.parentNode;
  	                } else {
  	                    return null;
  	                }
  	            }

  	            return null;
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}       el
  	         * @param   {string}            selector
  	         * @param   {HTMLHtmlElement}   [doc]
  	         * @return  {NodeList}
  	         */

  	        children: function(el, selector, doc) {
  	            var children    = [],
  	                tempId      = '';

  	            doc = doc || window.doc;

  	            if (el) {
  	                if (!el.id) {
  	                    tempId = 'Temp' + this.randomHexKey();

  	                    el.id = tempId;
  	                }

  	                children = doc.querySelectorAll('#' + el.id + ' > ' + selector);

  	                if (tempId) {
  	                    el.removeAttribute('id');
  	                }
  	            }

  	            return children;
  	        },

  	        /**
  	         * Creates a clone of a provided array, with any empty strings removed.
  	         *
  	         * @private
  	         * @param   {Array<*>} originalArray
  	         * @return  {Array<*>}
  	         */

  	        clean: function(originalArray) {
  	            var cleanArray = [],
  	                i = -1;

  	            for (i = 0; i < originalArray.length; i++) {
  	                if (originalArray[i] !== '') {
  	                    cleanArray.push(originalArray[i]);
  	                }
  	            }

  	            return cleanArray;
  	        },

  	        /**
  	         * Abstracts an ES6 promise into a q-like deferred interface for storage and deferred resolution.
  	         *
  	         * @private
  	         * @param  {object} libraries
  	         * @return {h.Deferred}
  	         */

  	        defer: function(libraries) {
  	            var deferred       = null,
  	                promiseWrapper = null,
  	                $              = null;

  	            promiseWrapper = new this.Deferred();

  	            if (mixitup.features.has.promises) {
  	                // ES6 native promise or polyfill

  	                promiseWrapper.promise = new Promise(function(resolve, reject) {
  	                    promiseWrapper.resolve = resolve;
  	                    promiseWrapper.reject  = reject;
  	                });
  	            } else if (($ = (window.jQuery || libraries.$)) && typeof $.Deferred === 'function') {
  	                // jQuery

  	                deferred = $.Deferred();

  	                promiseWrapper.promise = deferred.promise();
  	                promiseWrapper.resolve = deferred.resolve;
  	                promiseWrapper.reject  = deferred.reject;
  	            } else if (window.console) {
  	                // No implementation

  	                console.warn(mixitup.messages.warningNoPromiseImplementation());
  	            }

  	            return promiseWrapper;
  	        },

  	        /**
  	         * @private
  	         * @param   {Array<Promise>}    tasks
  	         * @param   {object}            libraries
  	         * @return  {Promise<Array>}
  	         */

  	        all: function(tasks, libraries) {
  	            var $ = null;

  	            if (mixitup.features.has.promises) {
  	                return Promise.all(tasks);
  	            } else if (($ = (window.jQuery || libraries.$)) && typeof $.when === 'function') {
  	                return $.when.apply($, tasks)
  	                    .done(function() {
  	                        // jQuery when returns spread arguments rather than an array or resolutions

  	                        return arguments;
  	                    });
  	            }

  	            // No implementation

  	            if (window.console) {
  	                console.warn(mixitup.messages.warningNoPromiseImplementation());
  	            }

  	            return [];
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @param   {string}        property
  	         * @param   {Array<string>} vendors
  	         * @return  {string}
  	         */

  	        getPrefix: function(el, property, vendors) {
  	            var i       = -1,
  	                prefix  = '';

  	            if (h.dashCase(property) in el.style) return '';

  	            for (i = 0; prefix = vendors[i]; i++) {
  	                if (prefix + property in el.style) {
  	                    return prefix.toLowerCase();
  	                }
  	            }

  	            return 'unsupported';
  	        },

  	        /**
  	         * @private
  	         * @return  {string}
  	         */

  	        randomHex: function() {
  	            return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLDocument}  [doc]
  	         * @return  {object}
  	         */

  	        getDocumentState: function(doc) {
  	            doc = typeof doc.body === 'object' ? doc : window.document;

  	            return {
  	                scrollTop: window.pageYOffset,
  	                scrollLeft: window.pageXOffset,
  	                docHeight: doc.documentElement.scrollHeight,
  	                docWidth: doc.documentElement.scrollWidth,
  	                viewportHeight: doc.documentElement.clientHeight,
  	                viewportWidth: doc.documentElement.clientWidth
  	            };
  	        },

  	        /**
  	         * @private
  	         * @param   {object}    obj
  	         * @param   {function}  fn
  	         * @return  {function}
  	         */

  	        bind: function(obj, fn) {
  	            return function() {
  	                return fn.apply(obj, arguments);
  	            };
  	        },

  	        /**
  	         * @private
  	         * @param   {HTMLElement}   el
  	         * @return  {boolean}
  	         */

  	        isVisible: function(el) {
  	            var styles = null;

  	            if (el.offsetParent) return true;

  	            styles = window.getComputedStyle(el);

  	            if (
  	                styles.position === 'fixed' &&
  	                styles.visibility !== 'hidden' &&
  	                styles.opacity !== '0'
  	            ) {
  	                // Fixed elements report no offsetParent,
  	                // but may still be invisible

  	                return true;
  	            }

  	            return false;
  	        },

  	        /**
  	         * @private
  	         * @param   {object}    obj
  	         */

  	        seal: function(obj) {
  	            if (typeof Object.seal === 'function') {
  	                Object.seal(obj);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {object}    obj
  	         */

  	        freeze: function(obj) {
  	            if (typeof Object.freeze === 'function') {
  	                Object.freeze(obj);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @param   {string}    control
  	         * @param   {string}    specimen
  	         * @return  {boolean}
  	         */

  	        compareVersions: function(control, specimen) {
  	            var controlParts    = control.split('.'),
  	                specimenParts   = specimen.split('.'),
  	                controlPart     = -1,
  	                specimenPart    = -1,
  	                i               = -1;

  	            for (i = 0; i < controlParts.length; i++) {
  	                controlPart     = parseInt(controlParts[i].replace(/[^\d.]/g, ''));
  	                specimenPart    = parseInt(specimenParts[i].replace(/[^\d.]/g, '') || 0);

  	                if (specimenPart < controlPart) {
  	                    return false;
  	                } else if (specimenPart > controlPart) {
  	                    return true;
  	                }
  	            }

  	            return true;
  	        },

  	        /**
  	         * @private
  	         * @constructor
  	         */

  	        Deferred: function() {
  	            this.promise    = null;
  	            this.resolve    = null;
  	            this.reject     = null;
  	            this.id         = h.randomHex();
  	        },

  	        /**
  	         * @private
  	         * @param   {object}  obj
  	         * @return  {boolean}
  	         */

  	        isEmptyObject: function(obj) {
  	            var key = '';

  	            if (typeof Object.keys === 'function') {
  	                return Object.keys(obj).length === 0;
  	            }

  	            for (key in obj) {
  	                if (obj.hasOwnProperty(key)) {
  	                    return false;
  	                }
  	            }

  	            return true;
  	        },

  	        /**
  	         * @param   {mixitup.Config.ClassNames}   classNames
  	         * @param   {string}                      elementName
  	         * @param   {string}                      [modifier]
  	         * @return  {string}
  	         */

  	        getClassname: function(classNames, elementName, modifier) {
  	            var classname = '';

  	            classname += classNames.block;

  	            if (classname.length) {
  	                classname += classNames.delineatorElement;
  	            }

  	            classname += classNames['element' + this.pascalCase(elementName)];

  	            if (!modifier) return classname;

  	            if (classname.length) {
  	                classname += classNames.delineatorModifier;
  	            }

  	            classname += modifier;

  	            return classname;
  	        },

  	        /**
  	         * Returns the value of a property on a given object via its string key.
  	         *
  	         * @param   {object}    obj
  	         * @param   {string}    stringKey
  	         * @return  {*} value
  	         */

  	        getProperty: function(obj, stringKey) {
  	            var parts           = stringKey.split('.'),
  	                returnCurrent   = null,
  	                current         = '',
  	                i               = 0;

  	            if (!stringKey) {
  	                return obj;
  	            }

  	            returnCurrent = function(obj) {
  	                if (!obj) {
  	                    return null;
  	                } else {
  	                    return obj[current];
  	                }
  	            };

  	            while (i < parts.length) {
  	                current = parts[i];

  	                obj = returnCurrent(obj);

  	                i++;
  	            }

  	            if (typeof obj !== 'undefined') {
  	                return obj;
  	            } else {
  	                return null;
  	            }
  	        }
  	    };

  	    mixitup.h = h;

  	    /**
  	     * The Base class adds instance methods to all other extensible MixItUp classes,
  	     * enabling the calling of any registered hooks.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Base = function() {};

  	    mixitup.Base.prototype = {
  	        constructor: mixitup.Base,

  	        /**
  	         * Calls any registered hooks for the provided action.
  	         *
  	         * @memberof    mixitup.Base
  	         * @private
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {string}    actionName
  	         * @param       {Array<*>}  args
  	         * @return      {void}
  	         */

  	        callActions: function(actionName, args) {
  	            var self            = this,
  	                hooks           = self.constructor.actions[actionName],
  	                extensionName   = '';

  	            if (!hooks || h.isEmptyObject(hooks)) return;

  	            for (extensionName in hooks) {
  	                hooks[extensionName].apply(self, args);
  	            }
  	        },

  	        /**
  	         * Calls any registered hooks for the provided filter.
  	         *
  	         * @memberof    mixitup.Base
  	         * @private
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {string}    filterName
  	         * @param       {*}         input
  	         * @param       {Array<*>}  args
  	         * @return      {*}
  	         */

  	        callFilters: function(filterName, input, args) {
  	            var self            = this,
  	                hooks           = self.constructor.filters[filterName],
  	                output          = input,
  	                extensionName   = '';

  	            if (!hooks || h.isEmptyObject(hooks)) return output;

  	            args = args || [];

  	            for (extensionName in hooks) {
  	                args = h.arrayFromList(args);

  	                args.unshift(output);

  	                output = hooks[extensionName].apply(self, args);
  	            }

  	            return output;
  	        }
  	    };

  	    /**
  	     * The BaseStatic class holds a set of static methods which are then added to all other
  	     * extensible MixItUp classes as a means of integrating extensions via the addition of new
  	     * methods and/or actions and hooks.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.BaseStatic = function() {
  	        this.actions = {};
  	        this.filters = {};

  	        /**
  	         * Performs a shallow extend on the class's prototype, adding one or more new members to
  	         * the class in a single operation.
  	         *
  	         * @memberof    mixitup.BaseStatic
  	         * @public
  	         * @static
  	         * @since       2.1.0
  	         * @param       {object} extension
  	         * @return      {void}
  	         */

  	        this.extend = function(extension) {
  	            h.extend(this.prototype, extension);
  	        };

  	        /**
  	         * Registers a function to be called on the action hook of the provided name.
  	         *
  	         * @memberof    mixitup.BaseStatic
  	         * @public
  	         * @static
  	         * @since       2.1.0
  	         * @param       {string}    hookName
  	         * @param       {string}    extensionName
  	         * @param       {function}  func
  	         * @return      {void}
  	         */

  	        this.registerAction = function(hookName, extensionName, func) {
  	            (this.actions[hookName] = this.actions[hookName] || {})[extensionName] = func;
  	        };

  	        /**
  	         * Registers a function to be called on the filter of the provided name.
  	         *
  	         * @memberof    mixitup.BaseStatic
  	         * @public
  	         * @static
  	         * @since       2.1.0
  	         * @param       {string}    hookName
  	         * @param       {string}    extensionName
  	         * @param       {function}  func
  	         * @return      {void}
  	         */

  	        this.registerFilter = function(hookName, extensionName, func) {
  	            (this.filters[hookName] = this.filters[hookName] || {})[extensionName] = func;
  	        };
  	    };

  	    /**
  	     * The `mixitup.Features` class performs all feature and CSS prefix detection
  	     * neccessary for MixItUp to function correctly, as well as storing various
  	     * string and array constants. All feature decection is on evaluation of the
  	     * library and stored in a singleton instance for use by other internal classes.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Features = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.boxSizingPrefix            = '';
  	        this.transformPrefix            = '';
  	        this.transitionPrefix           = '';

  	        this.boxSizingPrefix            = '';
  	        this.transformProp              = '';
  	        this.transformRule              = '';
  	        this.transitionProp             = '';
  	        this.perspectiveProp            = '';
  	        this.perspectiveOriginProp      = '';

  	        this.has                        = new mixitup.Has();

  	        this.canary                     = null;

  	        this.BOX_SIZING_PROP            = 'boxSizing';
  	        this.TRANSITION_PROP            = 'transition';
  	        this.TRANSFORM_PROP             = 'transform';
  	        this.PERSPECTIVE_PROP           = 'perspective';
  	        this.PERSPECTIVE_ORIGIN_PROP    = 'perspectiveOrigin';
  	        this.VENDORS                    = ['Webkit', 'moz', 'O', 'ms'];

  	        this.TWEENABLE = [
  	            'opacity',
  	            'width', 'height',
  	            'marginRight', 'marginBottom',
  	            'x', 'y',
  	            'scale',
  	            'translateX', 'translateY', 'translateZ',
  	            'rotateX', 'rotateY', 'rotateZ'
  	        ];

  	        this.callActions('afterConstruct');
  	    };

  	    mixitup.BaseStatic.call(mixitup.Features);

  	    mixitup.Features.prototype = Object.create(mixitup.Base.prototype);

  	    h.extend(mixitup.Features.prototype,
  	    /** @lends mixitup.Features */
  	    {
  	        constructor: mixitup.Features,

  	        /**
  	         * @private
  	         * @return  {void}
  	         */

  	        init: function() {
  	            var self = this;

  	            self.callActions('beforeInit', arguments);

  	            self.canary = document.createElement('div');

  	            self.setPrefixes();
  	            self.runTests();

  	            self.callActions('beforeInit', arguments);
  	        },

  	        /**
  	         * @private
  	         * @return  {void}
  	         */

  	        runTests: function() {
  	            var self = this;

  	            self.callActions('beforeRunTests', arguments);

  	            self.has.promises       = typeof window.Promise === 'function';
  	            self.has.transitions    = self.transitionPrefix !== 'unsupported';

  	            self.callActions('afterRunTests', arguments);

  	            h.freeze(self.has);
  	        },

  	        /**
  	         * @private
  	         * @return  {void}
  	         */

  	        setPrefixes: function() {
  	            var self = this;

  	            self.callActions('beforeSetPrefixes', arguments);

  	            self.transitionPrefix   = h.getPrefix(self.canary, 'Transition', self.VENDORS);
  	            self.transformPrefix    = h.getPrefix(self.canary, 'Transform', self.VENDORS);
  	            self.boxSizingPrefix    = h.getPrefix(self.canary, 'BoxSizing', self.VENDORS);

  	            self.boxSizingProp = self.boxSizingPrefix ?
  	                self.boxSizingPrefix + h.pascalCase(self.BOX_SIZING_PROP) : self.BOX_SIZING_PROP;

  	            self.transitionProp = self.transitionPrefix ?
  	                self.transitionPrefix + h.pascalCase(self.TRANSITION_PROP) : self.TRANSITION_PROP;

  	            self.transformProp = self.transformPrefix ?
  	                self.transformPrefix + h.pascalCase(self.TRANSFORM_PROP) : self.TRANSFORM_PROP;

  	            self.transformRule = self.transformPrefix ?
  	                '-' + self.transformPrefix + '-' + self.TRANSFORM_PROP : self.TRANSFORM_PROP;

  	            self.perspectiveProp = self.transformPrefix ?
  	                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_PROP) : self.PERSPECTIVE_PROP;

  	            self.perspectiveOriginProp = self.transformPrefix ?
  	                self.transformPrefix + h.pascalCase(self.PERSPECTIVE_ORIGIN_PROP) :
  	                self.PERSPECTIVE_ORIGIN_PROP;

  	            self.callActions('afterSetPrefixes', arguments);
  	        }
  	    });

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Has = function() {
  	        this.transitions    = false;
  	        this.promises       = false;

  	        h.seal(this);
  	    };

  	    // Assign a singleton instance to `mixitup.features` and initialise:

  	    mixitup.features = new mixitup.Features();

  	    mixitup.features.init();

  	    /**
  	     * A group of properties defining the mixer's animation and effects settings.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        animation
  	     * @namespace
  	     * @public
  	     * @since       2.0.0
  	     */

  	    mixitup.ConfigAnimation = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A boolean dictating whether or not animation should be enabled for the MixItUp instance.
  	         * If `false`, all operations will occur instantly and syncronously, although callback
  	         * functions and any returned promises will still be fulfilled.
  	         *
  	         * @example <caption>Example: Create a mixer with all animations disabled</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         enable: false
  	         *     }
  	         * });
  	         *
  	         * @name        enable
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.enable = true;

  	        /**
  	         * A string of one or more space-seperated properties to which transitions will be
  	         * applied for all filtering animations.
  	         *
  	         * Properties can be listed any order or combination, although they will be applied in a specific
  	         * predefined order to produce consistent results.
  	         *
  	         * To learn more about available effects, experiment with our <a href="https://www.kunkalabs.com/mixitup/">
  	         * sandbox demo</a> and try out the "Export config" button in the Animation options drop down.
  	         *
  	         * @example <caption>Example: Apply "fade" and "translateZ" effects to all animations</caption>
  	         * // As targets are filtered in and out, they will fade between
  	         * // opacity 1 and 0 and transform between translateZ(-100px) and
  	         * // translateZ(0).
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'fade translateZ(-100px)'
  	         *     }
  	         * });
  	         *
  	         * @name        effects
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     'fade scale'
  	         */

  	        this.effects = 'fade scale';

  	        /**
  	         * A string of one or more space-seperated effects to be applied only to filter-in
  	         * animations, overriding `config.animation.effects` if set.
  	         *
  	         * @example <caption>Example: Apply downwards vertical translate to targets being filtered in</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effectsIn: 'fade translateY(-100%)'
  	         *     }
  	         * });
  	         *
  	         * @name        effectsIn
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.effectsIn = '';

  	        /**
  	         * A string of one or more space-seperated effects to be applied only to filter-out
  	         * animations, overriding `config.animation.effects` if set.
  	         *
  	         * @example <caption>Example: Apply upwards vertical translate to targets being filtered out</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effectsOut: 'fade translateY(-100%)'
  	         *     }
  	         * });
  	         *
  	         * @name        effectsOut
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.effectsOut = '';

  	        /**
  	         * An integer dictating the duration of all MixItUp animations in milliseconds, not
  	         * including any additional delay apllied via the `'stagger'` effect.
  	         *
  	         * @example <caption>Example: Apply an animation duration of 200ms to all mixitup animations</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         duration: 200
  	         *     }
  	         * });
  	         *
  	         * @name        duration
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {number}
  	         * @default     600
  	         */

  	        this.duration = 600;

  	        /**
  	         * A valid CSS3 transition-timing function or shorthand. For a full list of accepted
  	         * values, visit <a href="http://easings.net" target="_blank">easings.net</a>.
  	         *
  	         * @example <caption>Example 1: Apply "ease-in-out" easing to all animations</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         easing: 'ease-in-out'
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Apply a custom "cubic-bezier" easing function to all animations</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  	         *     }
  	         * });
  	         *
  	         * @name        easing
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     'ease'
  	         */

  	        this.easing = 'ease';

  	        /**
  	         * A boolean dictating whether or not to apply perspective to the MixItUp container
  	         * during animations. By default, perspective is always applied and creates the
  	         * illusion of three-dimensional space for effects such as `translateZ`, `rotateX`,
  	         * and `rotateY`.
  	         *
  	         * You may wish to disable this and define your own perspective settings via CSS.
  	         *
  	         * @example <caption>Example: Prevent perspective from being applied to any 3D transforms</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         applyPerspective: false
  	         *     }
  	         * });
  	         *
  	         * @name        applyPerspective
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {bolean}
  	         * @default     true
  	         */

  	        this.applyPerspective = true;

  	        /**
  	         * The perspective distance value to be applied to the container during animations,
  	         * affecting any 3D-transform-based effects.
  	         *
  	         * @example <caption>Example: Set a perspective distance of 2000px</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'rotateY(-25deg)',
  	         *         perspectiveDistance: '2000px'
  	         *     }
  	         * });
  	         *
  	         * @name        perspectiveDistance
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     '3000px'
  	         */

  	        this.perspectiveDistance = '3000px';

  	        /**
  	         * The perspective-origin value to be applied to the container during animations,
  	         * affecting any 3D-transform-based effects.
  	         *
  	         * @example <caption>Example: Set a perspective origin in the top-right of the container</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'transateZ(-200px)',
  	         *         perspectiveOrigin: '100% 0'
  	         *     }
  	         * });
  	         *
  	         * @name        perspectiveOrigin
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {string}
  	         * @default     '50% 50%'
  	         */

  	        this.perspectiveOrigin = '50% 50%';

  	        /**
  	         * A boolean dictating whether or not to enable the queuing of operations.
  	         *
  	         * If `true` (default), and a control is clicked or an API call is made while another
  	         * operation is progress, the operation will go into the queue and will be automatically exectuted
  	         * when the previous operaitons is finished.
  	         *
  	         * If `false`, any requested operations will be ignored, and the `onMixBusy` callback and `mixBusy`
  	         * event will be fired. If `debug.showWarnings` is enabled, a console warning will also occur.
  	         *
  	         * @example <caption>Example: Disable queuing</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         queue: false
  	         *     }
  	         * });
  	         *
  	         * @name        queue
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.queue = true;

  	        /**
  	         * An integer dictacting the maximum number of operations allowed in the queue at
  	         * any time, when queuing is enabled.
  	         *
  	         * @example <caption>Example: Allow a maximum of 5 operations in the queue at any time</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         queueLimit: 5
  	         *     }
  	         * });
  	         *
  	         * @name        queueLimit
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {number}
  	         * @default     3
  	         */

  	        this.queueLimit = 3;

  	        /**
  	         * A boolean dictating whether or not to transition the height and width of the
  	         * container as elements are filtered in and out. If disabled, the container height
  	         * will change abruptly.
  	         *
  	         * It may be desirable to disable this on mobile devices as the CSS `height` and
  	         * `width` properties do not receive GPU-acceleration and can therefore cause stuttering.
  	         *
  	         * @example <caption>Example 1: Disable the transitioning of the container height and/or width</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         animateResizeContainer: false
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Disable the transitioning of the container height and/or width for mobile devices only</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         animateResizeContainer: myFeatureTests.isMobile ? false : true
  	         *     }
  	         * });
  	         *
  	         * @name        animateResizeContainer
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.animateResizeContainer = true;

  	        /**
  	         * A boolean dictating whether or not to transition the height and width of target
  	         * elements as they change throughout the course of an animation.
  	         *
  	         * This is often a must for flex-box grid layouts where the size of target elements may change
  	         * depending on final their position in relation to their siblings, or for `.changeLayout()`
  	         * operations where the size of targets change between layouts.
  	         *
  	         * NB: This feature requires additional calculations and manipulation to non-hardware-accelerated
  	         * properties which may adversely affect performance on slower devices, and is therefore
  	         * disabled by default.
  	         *
  	         * @example <caption>Example: Enable the transitioning of target widths and heights</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         animateResizeTargets: true
  	         *     }
  	         * });
  	         *
  	         * @name        animateResizeTargets
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.animateResizeTargets = false;

  	        /**
  	         * A custom function used to manipulate the order in which the stagger delay is
  	         * incremented when using the ‘stagger’ effect.
  	         *
  	         * When using the 'stagger' effect, the delay applied to each target element is incremented
  	         * based on its index. You may create a custom function to manipulate the order in which the
  	         * delay is incremented and create engaging non-linear stagger effects.
  	         *
  	         * The function receives the index of the target element as a parameter, and must
  	         * return an integer which serves as the multiplier for the stagger delay.
  	         *
  	         * @example <caption>Example 1: Stagger target elements by column in a 3-column grid</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'fade stagger(100ms)',
  	         *         staggerSequence: function(i) {
  	         *             return i % 3;
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Using an algorithm to produce a more complex sequence</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'fade stagger(100ms)',
  	         *         staggerSequence: function(i) {
  	         *             return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        staggerSequence
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.staggerSequence = null;

  	        /**
  	         * A boolean dictating whether or not to reverse the direction of `translate`
  	         * and `rotate` transforms for elements being filtered out.
  	         *
  	         * It can be used to create carousel-like animations where elements enter and exit
  	         * from opposite directions. If enabled, the effect `translateX(-100%)` for elements
  	         * being filtered in would become `translateX(100%)` for targets being filtered out.
  	         *
  	         * This functionality can also be achieved by providing seperate effects
  	         * strings for `config.animation.effectsIn` and `config.animation.effectsOut`.
  	         *
  	         * @example <caption>Example: Reverse the desired direction on any translate/rotate effect for targets being filtered out</caption>
  	         * // Elements being filtered in will be translated from '100%' to '0' while
  	         * // elements being filtered out will be translated from 0 to '-100%'
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         effects: 'fade translateX(100%)',
  	         *         reverseOut: true,
  	         *         nudge: false // Disable nudging to create a carousel-like effect
  	         *     }
  	         * });
  	         *
  	         * @name        reverseOut
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.reverseOut = false;

  	        /**
  	         * A boolean dictating whether or not to "nudge" the animation path of targets
  	         * when they are being filtered in and out simulatenously.
  	         *
  	         * This has been the default behavior of MixItUp since version 1, but it
  	         * may be desirable to disable this effect when filtering directly from
  	         * one exclusive set of targets to a different exclusive set of targets,
  	         * to create a carousel-like effect, or a generally more subtle animation.
  	         *
  	         * @example <caption>Example: Disable the "nudging" of targets being filtered in and out simulatenously</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         nudge: false
  	         *     }
  	         * });
  	         *
  	         * @name        nudge
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.nudge = true;

  	        /**
  	         * A boolean dictating whether or not to clamp the height of the container while MixItUp's
  	         * geometry tests are carried out before an operation.
  	         *
  	         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
  	         * height of the container might affect its vertical positioning in the viewport
  	         * (e.g. a vertically-centered container), this should be turned off to ensure accurate
  	         * test results and a smooth animation.
  	         *
  	         * @example <caption>Example: Disable container height-clamping</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         clampHeight: false
  	         *     }
  	         * });
  	         *
  	         * @name        clampHeight
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.clampHeight = true;

  	        /**
  	         * A boolean dictating whether or not to clamp the width of the container while MixItUp's
  	         * geometry tests are carried out before an operation.
  	         *
  	         * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
  	         * width of the container might affect its horitzontal positioning in the viewport
  	         * (e.g. a horizontall-centered container), this should be turned off to ensure accurate
  	         * test results and a smooth animation.
  	         *
  	         * @example <caption>Example: Disable container width-clamping</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     animation: {
  	         *         clampWidth: false
  	         *     }
  	         * });
  	         *
  	         * @name        clampWidth
  	         * @memberof    mixitup.Config.animation
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.clampWidth = true;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigAnimation);

  	    mixitup.ConfigAnimation.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigAnimation.prototype.constructor = mixitup.ConfigAnimation;

  	    /**
  	     * A group of properties relating to the behavior of the Mixer.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        behavior
  	     * @namespace
  	     * @public
  	     * @since       3.1.12
  	     */

  	    mixitup.ConfigBehavior = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A boolean dictating whether to allow "live" sorting of the mixer.
  	         *
  	         * Because of the expensive nature of sorting, MixItUp makes use of several
  	         * internal optimizations to skip redundant sorting operations, such as when
  	         * the newly requested sort command is the same as the active one. The caveat
  	         * to this optimization is that "live" edits to the value of a target's sorting
  	         * attribute will be ignored when requesting a re-sort by the same attribute.
  	         *
  	         * By setting to `behavior.liveSort` to `true`, the mixer will always re-sort
  	         * regardless of whether or not the sorting attribute and order have changed.
  	         *
  	         * @example <caption>Example: Enabling `liveSort` to allow for re-sorting</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     behavior: {
  	         *         liveSort: true
  	         *     },
  	         *     load: {
  	         *         sort: 'edited:desc'
  	         *     }
  	         * });
  	         *
  	         * var target = containerEl.children[3];
  	         *
  	         * console.log(target.getAttribute('data-edited')); // '2015-04-24'
  	         *
  	         * target.setAttribute('data-edited', '2017-08-10'); // Update the target's edited date
  	         *
  	         * mixer.sort('edited:desc')
  	         *     .then(function(state) {
  	         *         // The target is now at the top of the list
  	         *
  	         *         console.log(state.targets[0] === target); // true
  	         *     });
  	         *
  	         * @name        liveSort
  	         * @memberof    mixitup.Config.behavior
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.liveSort = false;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigBehavior);

  	    mixitup.ConfigBehavior.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigBehavior.prototype.constructor = mixitup.ConfigBehavior;

  	    /**
  	     * A group of optional callback functions to be invoked at various
  	     * points within the lifecycle of a mixer operation.
  	     *
  	     * Each function is analogous to an event of the same name triggered from the
  	     * container element, and is invoked immediately after it.
  	     *
  	     * All callback functions receive the current `state` object as their first
  	     * argument, as well as other more specific arguments described below.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        callbacks
  	     * @namespace
  	     * @public
  	     * @since       2.0.0
  	     */

  	    mixitup.ConfigCallbacks = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A callback function invoked immediately after any MixItUp operation is requested
  	         * and before animations have begun.
  	         *
  	         * A second `futureState` argument is passed to the function which represents the final
  	         * state of the mixer once the requested operation has completed.
  	         *
  	         * @example <caption>Example: Adding an `onMixStart` callback function</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixStart: function(state, futureState) {
  	         *              console.log('Starting operation...');
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        onMixStart
  	         * @memberof    mixitup.Config.callbacks
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.onMixStart = null;

  	        /**
  	         * A callback function invoked when a MixItUp operation is requested while another
  	         * operation is in progress, and the animation queue is full, or queueing
  	         * is disabled.
  	         *
  	         * @example <caption>Example: Adding an `onMixBusy` callback function</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixBusy: function(state) {
  	         *              console.log('Mixer busy');
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        onMixBusy
  	         * @memberof    mixitup.Config.callbacks
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.onMixBusy  = null;

  	        /**
  	         * A callback function invoked after any MixItUp operation has completed, and the
  	         * state has been updated.
  	         *
  	         * @example <caption>Example: Adding an `onMixEnd` callback function</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixEnd: function(state) {
  	         *              console.log('Operation complete');
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        onMixEnd
  	         * @memberof    mixitup.Config.callbacks
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.onMixEnd   = null;

  	        /**
  	         * A callback function invoked whenever an operation "fails", i.e. no targets
  	         * could be found matching the requested filter.
  	         *
  	         * @example <caption>Example: Adding an `onMixFail` callback function</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixFail: function(state) {
  	         *              console.log('No items could be found matching the requested filter');
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        onMixFail
  	         * @memberof    mixitup.Config.callbacks
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.onMixFail  = null;

  	        /**
  	         * A callback function invoked whenever a MixItUp control is clicked, and before its
  	         * respective operation is requested.
  	         *
  	         * The clicked element is assigned to the `this` keyword within the function. The original
  	         * click event is passed to the function as the second argument, which can be useful if
  	         * using `<a>` tags as controls where the default behavior needs to be prevented.
  	         *
  	         * Returning `false` from the callback will prevent the control click from triggering
  	         * an operation.
  	         *
  	         * @example <caption>Example 1: Adding an `onMixClick` callback function</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixClick: function(state, originalEvent) {
  	         *              console.log('The control "' + this.innerText + '" was clicked');
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Using `onMixClick` to manipulate the original click event</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixClick: function(state, originalEvent) {
  	         *              // Prevent original click event from bubbling up:
  	         *              originalEvent.stopPropagation();
  	         *
  	         *              // Prevent default behavior of clicked element:
  	         *              originalEvent.preventDefault();
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 3: Using `onMixClick` to conditionally cancel operations</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixClick: function(state, originalEvent) {
  	         *              // Perform some conditional check:
  	         *
  	         *              if (myApp.isLoading) {
  	         *                  // By returning false, we can prevent the control click from triggering an operation.
  	         *
  	         *                  return false;
  	         *              }
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        onMixClick
  	         * @memberof    mixitup.Config.callbacks
  	         * @instance
  	         * @type        {function}
  	         * @default     null
  	         */

  	        this.onMixClick = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigCallbacks);

  	    mixitup.ConfigCallbacks.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigCallbacks.prototype.constructor = mixitup.ConfigCallbacks;

  	    /**
  	     * A group of properties relating to clickable control elements.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        controls
  	     * @namespace
  	     * @public
  	     * @since       2.0.0
  	     */

  	    mixitup.ConfigControls = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A boolean dictating whether or not controls should be enabled for the mixer instance.
  	         *
  	         * If `true` (default behavior), MixItUp will search the DOM for any clickable elements with
  	         * `data-filter`, `data-sort` or `data-toggle` attributes, and bind them for click events.
  	         *
  	         * If `false`, no click handlers will be bound, and all functionality must therefore be performed
  	         * via the mixer's API methods.
  	         *
  	         * If you do not intend to use the default controls, setting this property to `false` will
  	         * marginally improve the startup time of your mixer instance, and will also prevent any other active
  	         * mixer instances in the DOM which are bound to controls from controlling the instance.
  	         *
  	         * @example <caption>Example: Disabling controls</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     controls: {
  	         *         enable: false
  	         *     }
  	         * });
  	         *
  	         * // With the default controls disabled, we can only control
  	         * // the mixer via its API methods, e.g.:
  	         *
  	         * mixer.filter('.cat-1');
  	         *
  	         * @name        enable
  	         * @memberof    mixitup.Config.controls
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.enable = true;

  	        /**
  	         * A boolean dictating whether or not to use event delegation when binding click events
  	         * to the default controls.
  	         *
  	         * If `false` (default behavior), each control button in the DOM will be found and
  	         * individually bound when a mixer is instantiated, with their corresponding actions
  	         * cached for performance.
  	         *
  	         * If `true`, a single click handler will be applied to the `window` (or container element - see
  	         * `config.controls.scope`), and any click events triggered by elements with `data-filter`,
  	         * `data-sort` or `data-toggle` attributes present will be handled as they propagate upwards.
  	         *
  	         * If you require a user interface where control buttons may be added, removed, or changed during the
  	         * lifetime of a mixer, `controls.live` should be set to `true`. There is a marginal but unavoidable
  	         * performance deficit when using live controls, as the value of each control button must be read
  	         * from the DOM in real time once the click event has propagated.
  	         *
  	         * @example <caption>Example: Setting live controls</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     controls: {
  	         *         live: true
  	         *     }
  	         * });
  	         *
  	         * // Control buttons can now be added, remove and changed without breaking
  	         * // the mixer's UI
  	         *
  	         * @name        live
  	         * @memberof    mixitup.Config.controls
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.live = false;

  	        /**
  	         * A string dictating the "scope" to use when binding or querying the default controls. The available
  	         * values are `'global'` or `'local'`.
  	         *
  	         * When set to `'global'` (default behavior), MixItUp will query the entire document for control buttons
  	         * to bind, or delegate click events from (see `config.controls.live`).
  	         *
  	         * When set to `'local'`, MixItUp will only query (or bind click events to) its own container element.
  	         * This may be desireable if you require multiple active mixer instances within the same document, with
  	         * controls that would otherwise intefere with each other if scoped globally.
  	         *
  	         * Conversely, if you wish to control multiple instances with a single UI, you would create one
  	         * set of controls and keep the controls scope of each mixer set to `global`.
  	         *
  	         * @example <caption>Example: Setting 'local' scoped controls</caption>
  	         * var mixerOne = mixitup(containerOne, {
  	         *     controls: {
  	         *         scope: 'local'
  	         *     }
  	         * });
  	         *
  	         * var mixerTwo = mixitup(containerTwo, {
  	         *     controls: {
  	         *         scope: 'local'
  	         *     }
  	         * });
  	         *
  	         * // Both mixers can now exist within the same document with
  	         * // isolated controls placed within their container elements.
  	         *
  	         * @name        scope
  	         * @memberof    mixitup.Config.controls
  	         * @instance
  	         * @type        {string}
  	         * @default     'global'
  	         */

  	        this.scope = 'global'; // enum: ['local' ,'global']

  	        /**
  	         * A string dictating the type of logic to apply when concatenating the filter selectors of
  	         * active toggle buttons (i.e. any clickable element with a `data-toggle` attribute).
  	         *
  	         * If set to `'or'` (default behavior), selectors will be concatenated together as
  	         * a comma-seperated list. For example:
  	         *
  	         * `'.cat-1, .cat-2'` (shows any elements matching `'.cat-1'` OR `'.cat-2'`)
  	         *
  	         * If set to `'and'`, selectors will be directly concatenated together. For example:
  	         *
  	         * `'.cat-1.cat-2'` (shows any elements which match both `'.cat-1'` AND `'.cat-2'`)
  	         *
  	         * @example <caption>Example: Setting "and" toggle logic</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     controls: {
  	         *         toggleLogic: 'and'
  	         *     }
  	         * });
  	         *
  	         * @name        toggleLogic
  	         * @memberof    mixitup.Config.controls
  	         * @instance
  	         * @type        {string}
  	         * @default     'or'
  	         */

  	        this.toggleLogic = 'or'; // enum: ['or', 'and']

  	        /**
  	         * A string dictating the filter behavior when all toggles are inactive.
  	         *
  	         * When set to `'all'` (default behavior), *all* targets will be shown by default
  	         * when no toggles are active, or at the moment all active toggles are toggled off.
  	         *
  	         * When set to `'none'`, no targets will be shown by default when no toggles are
  	         * active, or at the moment all active toggles are toggled off.
  	         *
  	         * @example <caption>Example 1: Setting the default toggle behavior to `'all'`</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     controls: {
  	         *         toggleDefault: 'all'
  	         *     }
  	         * });
  	         *
  	         * mixer.toggleOn('.cat-2')
  	         *     .then(function() {
  	         *         // Deactivate all active toggles
  	         *
  	         *         return mixer.toggleOff('.cat-2')
  	         *     })
  	         *     .then(function(state) {
  	         *          console.log(state.activeFilter.selector); // 'all'
  	         *          console.log(state.totalShow); // 12
  	         *     });
  	         *
  	         * @example <caption>Example 2: Setting the default toggle behavior to `'none'`</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     controls: {
  	         *         toggleDefault: 'none'
  	         *     }
  	         * });
  	         *
  	         * mixer.toggleOn('.cat-2')
  	         *     .then(function() {
  	         *         // Deactivate all active toggles
  	         *
  	         *         return mixer.toggleOff('.cat-2')
  	         *     })
  	         *     .then(function(state) {
  	         *          console.log(state.activeFilter.selector); // 'none'
  	         *          console.log(state.totalShow); // 0
  	         *     });
  	         *
  	         * @name        toggleDefault
  	         * @memberof    mixitup.Config.controls
  	         * @instance
  	         * @type        {string}
  	         * @default     'all'
  	         */

  	        this.toggleDefault = 'all'; // enum: ['all', 'none']

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigControls);

  	    mixitup.ConfigControls.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigControls.prototype.constructor = mixitup.ConfigControls;

  	    /**
  	     * A group of properties defining the output and structure of class names programmatically
  	     * added to controls and containers to reflect the state of the mixer.
  	     *
  	     * Most commonly, class names are added to controls by MixItUp to indicate that
  	     * the control is active so that it can be styled accordingly - `'mixitup-control-active'` by default.
  	     *
  	     * Using a "BEM" like structure, each classname is broken into the three parts:
  	     * a block namespace (`'mixitup'`), an element name (e.g. `'control'`), and an optional modifier
  	     * name (e.g. `'active'`) reflecting the state of the element.
  	     *
  	     * By default, each part of the classname is concatenated together using single hyphens as
  	     * delineators, but this can be easily customised to match the naming convention and style of
  	     * your project.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        classNames
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigClassNames = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * The "block" portion, or top-level namespace added to the start of any class names created by MixItUp.
  	         *
  	         * @example <caption>Example 1: changing the `config.classNames.block` value</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: 'portfolio'
  	         *     }
  	         * });
  	         *
  	         * // Active control output: "portfolio-control-active"
  	         *
  	         * @example <caption>Example 2: Removing `config.classNames.block`</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: ''
  	         *     }
  	         * });
  	         *
  	         * // Active control output: "control-active"
  	         *
  	         * @name        block
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'mixitup'
  	         */

  	        this.block = 'mixitup';

  	        /**
  	         * The "element" portion of the class name added to container.
  	         *
  	         * @name        elementContainer
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'container'
  	         */

  	        this.elementContainer = 'container';

  	        /**
  	         * The "element" portion of the class name added to filter controls.
  	         *
  	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
  	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
  	         *
  	         * @example <caption>Example 1: changing the `config.classNames.elementFilter` value</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         elementFilter: 'filter'
  	         *     }
  	         * });
  	         *
  	         * // Active filter output: "mixitup-filter-active"
  	         *
  	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementFilter` values</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: 'portfolio',
  	         *         elementFilter: 'filter'
  	         *     }
  	         * });
  	         *
  	         * // Active filter output: "portfolio-filter-active"
  	         *
  	         * @name        elementFilter
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'control'
  	         */

  	        this.elementFilter = 'control';

  	        /**
  	         * The "element" portion of the class name added to sort controls.
  	         *
  	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
  	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
  	         *
  	         * @example <caption>Example 1: changing the `config.classNames.elementSort` value</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         elementSort: 'sort'
  	         *     }
  	         * });
  	         *
  	         * // Active sort output: "mixitup-sort-active"
  	         *
  	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementSort` values</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: 'portfolio',
  	         *         elementSort: 'sort'
  	         *     }
  	         * });
  	         *
  	         * // Active sort output: "portfolio-sort-active"
  	         *
  	         * @name        elementSort
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'control'
  	         */

  	        this.elementSort = 'control';

  	        /**
  	         * The "element" portion of the class name added to multimix controls.
  	         *
  	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
  	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
  	         *
  	         * @example <caption>Example 1: changing the `config.classNames.elementMultimix` value</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         elementMultimix: 'multimix'
  	         *     }
  	         * });
  	         *
  	         * // Active multimix output: "mixitup-multimix-active"
  	         *
  	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementMultimix` values</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: 'portfolio',
  	         *         elementSort: 'multimix'
  	         *     }
  	         * });
  	         *
  	         * // Active multimix output: "portfolio-multimix-active"
  	         *
  	         * @name        elementMultimix
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'control'
  	         */

  	        this.elementMultimix = 'control';

  	        /**
  	         * The "element" portion of the class name added to toggle controls.
  	         *
  	         * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
  	         * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
  	         *
  	         * @example <caption>Example 1: changing the `config.classNames.elementToggle` value</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         elementToggle: 'toggle'
  	         *     }
  	         * });
  	         *
  	         * // Active toggle output: "mixitup-toggle-active"
  	         *
  	         * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementToggle` values</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         block: 'portfolio',
  	         *         elementToggle: 'toggle'
  	         *     }
  	         * });
  	         *
  	         * // Active toggle output: "portfolio-toggle-active"
  	         *
  	         * @name        elementToggle
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'control'
  	         */

  	        this.elementToggle = 'control';

  	        /**
  	         * The "modifier" portion of the class name added to active controls.
  	         * @name        modifierActive
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'active'
  	         */

  	        this.modifierActive = 'active';

  	        /**
  	         * The "modifier" portion of the class name added to disabled controls.
  	         *
  	         * @name        modifierDisabled
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'disabled'
  	         */

  	        this.modifierDisabled = 'disabled';

  	        /**
  	         * The "modifier" portion of the class name added to the container when in a "failed" state.
  	         *
  	         * @name        modifierFailed
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     'failed'
  	         */

  	        this.modifierFailed = 'failed';

  	        /**
  	         * The delineator used between the "block" and "element" portions of any class name added by MixItUp.
  	         *
  	         * If the block portion is ommited by setting it to an empty string, no delineator will be added.
  	         *
  	         * @example <caption>Example: changing the delineator to match BEM convention</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         delineatorElement: '__'
  	         *     }
  	         * });
  	         *
  	         * // example active control output: "mixitup__control-active"
  	         *
  	         * @name        delineatorElement
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     '-'
  	         */

  	        this.delineatorElement = '-';

  	        /**
  	         * The delineator used between the "element" and "modifier" portions of any class name added by MixItUp.
  	         *
  	         * If the element portion is ommited by setting it to an empty string, no delineator will be added.
  	         *
  	         * @example <caption>Example: changing both delineators to match BEM convention</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     classNames: {
  	         *         delineatorElement: '__'
  	         *         delineatorModifier: '--'
  	         *     }
  	         * });
  	         *
  	         * // Active control output: "mixitup__control--active"
  	         *
  	         * @name        delineatorModifier
  	         * @memberof    mixitup.Config.classNames
  	         * @instance
  	         * @type        {string}
  	         * @default     '-'
  	         */

  	        this.delineatorModifier = '-';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigClassNames);

  	    mixitup.ConfigClassNames.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigClassNames.prototype.constructor = mixitup.ConfigClassNames;

  	    /**
  	     * A group of properties relating to MixItUp's dataset API.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        data
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigData = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A string specifying the name of the key containing your data model's unique
  	         * identifier (UID). To use the dataset API, a UID key must be specified and
  	         * be present and unique on all objects in the dataset you provide to MixItUp.
  	         *
  	         * For example, if your dataset is made up of MongoDB documents, the UID
  	         * key would be `'id'` or `'_id'`.
  	         *
  	         * @example <caption>Example: Setting the UID to `'id'`</caption>
  	         * var mixer = mixitup(containerEl, {
  	         *     data: {
  	         *         uidKey: 'id'
  	         *     }
  	         * });
  	         *
  	         * @name        uidKey
  	         * @memberof    mixitup.Config.data
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.uidKey = '';

  	        /**
  	         * A boolean dictating whether or not MixItUp should "dirty check" each object in
  	         * your dataset for changes whenever `.dataset()` is called, and re-render any targets
  	         * for which a change is found.
  	         *
  	         * Depending on the complexity of your data model, dirty checking can be expensive
  	         * and is therefore disabled by default.
  	         *
  	         * NB: For changes to be detected, a new immutable instance of the edited model must be
  	         * provided to mixitup, rather than manipulating properties on the existing instance.
  	         * If your changes are a result of a DB write and read, you will most likely be calling
  	         * `.dataset()` with a clean set of objects each time, so this will not be an issue.
  	         *
  	         * @example <caption>Example: Enabling dirty checking</caption>
  	         *
  	         * var myDataset = [
  	         *     {
  	         *         id: 0,
  	         *         title: "Blog Post Title 0"
  	         *         ...
  	         *     },
  	         *     {
  	         *         id: 1,
  	         *         title: "Blog Post Title 1"
  	         *         ...
  	         *     }
  	         * ];
  	         *
  	         * // Instantiate a mixer with a pre-loaded dataset, and a target renderer
  	         * // function defined
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     data: {
  	         *         uidKey: 'id',
  	         *         dirtyCheck: true
  	         *     },
  	         *     load: {
  	         *         dataset: myDataset
  	         *     },
  	         *     render: {
  	         *         target: function() { ... }
  	         *     }
  	         * });
  	         *
  	         * // For illustration, we will clone and edit the second object in the dataset.
  	         * // NB: this would typically be done server-side in response to a DB update,
  	         * and then re-queried via an API.
  	         *
  	         * myDataset[1] = Object.assign({}, myDataset[1]);
  	         *
  	         * myDataset[1].title = 'Blog Post Title 11';
  	         *
  	         * mixer.dataset(myDataset)
  	         *    .then(function() {
  	         *        // the target with ID "1", will be re-rendered reflecting its new title
  	         *    });
  	         *
  	         * @name        dirtyCheck
  	         * @memberof    mixitup.Config.data
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.dirtyCheck = false;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigData);

  	    mixitup.ConfigData.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigData.prototype.constructor = mixitup.ConfigData;

  	    /**
  	     * A group of properties allowing the toggling of various debug features.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        debug
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigDebug = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A boolean dictating whether or not the mixer instance returned by the
  	         * `mixitup()` factory function should expose private properties and methods.
  	         *
  	         * By default, mixer instances only expose their public API, but enabling
  	         * debug mode will give you access to various mixer internals which may aid
  	         * in debugging, or the authoring of extensions.
  	         *
  	         * @example <caption>Example: Enabling debug mode</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     debug: {
  	         *         enable: true
  	         *     }
  	         * });
  	         *
  	         * // Private properties and methods will now be visible on the mixer instance:
  	         *
  	         * console.log(mixer);
  	         *
  	         * @name        enable
  	         * @memberof    mixitup.Config.debug
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.enable = false;

  	        /**
  	         * A boolean dictating whether or not warnings should be shown when various
  	         * common gotchas occur.
  	         *
  	         * Warnings are intended to provide insights during development when something
  	         * occurs that is not a fatal, but may indicate an issue with your integration,
  	         * and are therefore turned on by default. However, you may wish to disable
  	         * them in production.
  	         *
  	         * @example <caption>Example 1: Disabling warnings</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     debug: {
  	         *         showWarnings: false
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Disabling warnings based on environment</caption>
  	         *
  	         * var showWarnings = myAppConfig.environment === 'development' ? true : false;
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     debug: {
  	         *         showWarnings: showWarnings
  	         *     }
  	         * });
  	         *
  	         * @name        showWarnings
  	         * @memberof    mixitup.Config.debug
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.showWarnings = true;

  	        /**
  	         * Used for server-side testing only.
  	         *
  	         * @private
  	         * @name        fauxAsync
  	         * @memberof    mixitup.Config.debug
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.fauxAsync = false;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigDebug);

  	    mixitup.ConfigDebug.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigDebug.prototype.constructor = mixitup.ConfigDebug;

  	    /**
  	     * A group of properties relating to the layout of the container.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        layout
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigLayout = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A boolean dictating whether or not mixitup should query all descendants
  	         * of the container for targets, or only immediate children.
  	         *
  	         * By default, mixitup will query all descendants matching the
  	         * `selectors.target` selector when indexing targets upon instantiation.
  	         * This allows for targets to be nested inside a sub-container which is
  	         * useful when ring-fencing targets from locally scoped controls in your
  	         * markup (see `controls.scope`).
  	         *
  	         * However, if you are building a more complex UI requiring the nesting
  	         * of mixers within mixers, you will most likely want to limit targets to
  	         * immediate children of the container by setting this property to `false`.
  	         *
  	         * @example <caption>Example: Restricting targets to immediate children</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     layout: {
  	         *         allowNestedTargets: false
  	         *     }
  	         * });
  	         *
  	         * @name        allowNestedTargets
  	         * @memberof    mixitup.Config.layout
  	         * @instance
  	         * @type        {boolean}
  	         * @default     true
  	         */

  	        this.allowNestedTargets = true;

  	        /**
  	         * A string specifying an optional class name to apply to the container when in
  	         * its default state.
  	         *
  	         * By changing this class name or adding a class name to the container via the
  	         * `.changeLayout()` API method, the CSS layout of the container can be changed,
  	         * and MixItUp will attemp to gracefully animate the container and its targets
  	         * between states.
  	         *
  	         * @example <caption>Example 1: Specifying a container class name</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     layout: {
  	         *         containerClassName: 'grid'
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Changing the default class name with `.changeLayout()`</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     layout: {
  	         *         containerClassName: 'grid'
  	         *     }
  	         * });
  	         *
  	         * mixer.changeLayout('list')
  	         *     .then(function(state) {
  	         *          console.log(state.activeContainerClass); // "list"
  	         *     });
  	         *
  	         * @name        containerClassName
  	         * @memberof    mixitup.Config.layout
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.containerClassName = '';

  	        /**
  	         * A reference to a non-target sibling element after which to insert targets
  	         * when there are no targets in the container.
  	         *
  	         * @example <caption>Example: Setting a `siblingBefore` reference element</caption>
  	         *
  	         * var addButton = containerEl.querySelector('button');
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     layout: {
  	         *         siblingBefore: addButton
  	         *     }
  	         * });
  	         *
  	         * @name        siblingBefore
  	         * @memberof    mixitup.Config.layout
  	         * @instance
  	         * @type        {HTMLElement}
  	         * @default     null
  	         */

  	        this.siblingBefore = null;

  	        /**
  	         * A reference to a non-target sibling element before which to insert targets
  	         * when there are no targets in the container.
  	         *
  	         * @example <caption>Example: Setting an `siblingAfter` reference element</caption>
  	         *
  	         * var gap = containerEl.querySelector('.gap');
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     layout: {
  	         *         siblingAfter: gap
  	         *     }
  	         * });
  	         *
  	         * @name        siblingAfter
  	         * @memberof    mixitup.Config.layout
  	         * @instance
  	         * @type        {HTMLElement}
  	         * @default     null
  	         */

  	        this.siblingAfter = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigLayout);

  	    mixitup.ConfigLayout.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigLayout.prototype.constructor = mixitup.ConfigLayout;

  	    /**
  	     * A group of properties defining the initial state of the mixer on load (instantiation).
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        load
  	     * @namespace
  	     * @public
  	     * @since       2.0.0
  	     */

  	    mixitup.ConfigLoad = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A string defining any filtering to be statically applied to the mixer on load.
  	         * As per the `.filter()` API, this can be any valid selector string, or the
  	         * values `'all'` or `'none'`.
  	         *
  	         * @example <caption>Example 1: Defining an initial filter selector to be applied on load</caption>
  	         *
  	         * // The mixer will show only those targets matching '.category-a' on load.
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     load: {
  	         *         filter: '.category-a'
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Hiding all targets on load</caption>
  	         *
  	         * // The mixer will show hide all targets on load.
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     load: {
  	         *         filter: 'none'
  	         *     }
  	         * });
  	         *
  	         * @name        filter
  	         * @memberof    mixitup.Config.load
  	         * @instance
  	         * @type        {string}
  	         * @default     'all'
  	         */

  	        this.filter = 'all';

  	        /**
  	         * A string defining any sorting to be statically applied to the mixer on load.
  	         * As per the `.sort()` API, this should be a valid "sort string" made up of
  	         * an attribute to sort by (or `'default'`) followed by an optional sorting
  	         * order, or the value `'random'`;
  	         *
  	         * @example <caption>Example: Defining sorting to be applied on load</caption>
  	         *
  	         * // The mixer will sort the container by the value of the `data-published-date`
  	         * // attribute, in descending order.
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     load: {
  	         *         sort: 'published-date:desc'
  	         *     }
  	         * });
  	         *
  	         * @name        sort
  	         * @memberof    mixitup.Config.load
  	         * @instance
  	         * @type        {string}
  	         * @default     'default:asc'
  	         */

  	        this.sort = 'default:asc';

  	        /**
  	         * An array of objects representing the underlying data of any pre-rendered targets,
  	         * when using the `.dataset()` API.
  	         *
  	         * NB: If targets are pre-rendered when the mixer is instantiated, this must be set.
  	         *
  	         * @example <caption>Example: Defining the initial underyling dataset</caption>
  	         *
  	         * var myDataset = [
  	         *     {
  	         *         id: 0,
  	         *         title: "Blog Post Title 0",
  	         *         ...
  	         *     },
  	         *     {
  	         *         id: 1,
  	         *         title: "Blog Post Title 1",
  	         *         ...
  	         *     }
  	         * ];
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     data: {
  	         *         uidKey: 'id'
  	         *     },
  	         *     load: {
  	         *         dataset: myDataset
  	         *     }
  	         * });
  	         *
  	         * @name        dataset
  	         * @memberof    mixitup.Config.load
  	         * @instance
  	         * @type        {Array.<object>}
  	         * @default     null
  	         */

  	        this.dataset = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigLoad);

  	    mixitup.ConfigLoad.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigLoad.prototype.constructor = mixitup.ConfigLoad;

  	    /**
  	     * A group of properties defining the selectors used to query elements within a mixitup container.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        selectors
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigSelectors = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A selector string used to query and index target elements within the container.
  	         *
  	         * By default, the class selector `'.mix'` is used, but this can be changed to an
  	         * attribute or element selector to match the style of your project.
  	         *
  	         * @example <caption>Example 1: Changing the target selector</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     selectors: {
  	         *         target: '.portfolio-item'
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Using an attribute selector as a target selector</caption>
  	         *
  	         * // The mixer will search for any children with the attribute `data-ref="mix"`
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     selectors: {
  	         *         target: '[data-ref="mix"]'
  	         *     }
  	         * });
  	         *
  	         * @name        target
  	         * @memberof    mixitup.Config.selectors
  	         * @instance
  	         * @type        {string}
  	         * @default     '.mix'
  	         */

  	        this.target = '.mix';

  	        /**
  	         * A optional selector string used to add further specificity to the querying of control elements,
  	         * in addition to their mandatory data attribute (e.g. `data-filter`, `data-toggle`, `data-sort`).
  	         *
  	         * This can be used if other elements in your document must contain the above attributes
  	         * (e.g. for use in third-party scripts), and would otherwise interfere with MixItUp. Adding
  	         * an additional `control` selector of your choice allows MixItUp to restrict event handling
  	         * to only those elements matching the defined selector.
  	         *
  	         * @name        control
  	         * @memberof    mixitup.Config.selectors
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         *
  	         * @example <caption>Example 1: Adding a `selectors.control` selector</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     selectors: {
  	         *         control: '.mixitup-control'
  	         *     }
  	         * });
  	         *
  	         * // Will not be handled:
  	         * // <button data-filter=".category-a"></button>
  	         *
  	         * // Will be handled:
  	         * // <button class="mixitup-control" data-filter=".category-a"></button>
  	         */

  	        this.control = '';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigSelectors);

  	    mixitup.ConfigSelectors.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigSelectors.prototype.constructor = mixitup.ConfigSelectors;

  	    /**
  	     * A group of optional render functions for creating and updating elements.
  	     *
  	     * All render functions receive a data object, and should return a valid HTML string.
  	     *
  	     * @constructor
  	     * @memberof    mixitup.Config
  	     * @name        render
  	     * @namespace
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigRender = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A function returning an HTML string representing a target element, or a reference to a
  	         * single DOM element.
  	         *
  	         * The function is invoked as part of the `.dataset()` API, whenever a new item is added
  	         * to the dataset, or an item in the dataset changes (if `dataset.dirtyCheck` is enabled).
  	         *
  	         * The function receives the relevant dataset item as its first parameter.
  	         *
  	         * @example <caption>Example 1: Using string concatenation</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     render: {
  	         *         target: function(item) {
  	         *             return (
  	         *                 '&lt;div class="mix"&gt;' +
  	         *                     '&lt;h2&gt;' + item.title + '&lt;/h2&gt;' +
  	         *                 '&lt;/div&gt;'
  	         *             );
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Using an ES2015 template literal</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     render: {
  	         *         target: function(item) {
  	         *             return (
  	         *                 `&lt;div class="mix"&gt;
  	         *                     &lt;h2&gt;${item.title}&lt;/h2&gt;
  	         *                  &lt;/div&gt;`
  	         *             );
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 3: Using a Handlebars template</caption>
  	         *
  	         * var targetTemplate = Handlebars.compile('&lt;div class="mix"&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;/div&gt;');
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     render: {
  	         *         target: targetTemplate
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 4: Returning a DOM element</caption>
  	         *
  	         * var mixer = mixitup(containerEl, {
  	         *     render: {
  	         *         target: function(item) {
  	         *              // Create a single element using your framework's built-in renderer
  	         *
  	         *              var el = ...
  	         *
  	         *              return el;
  	         *         }
  	         *     }
  	         * });
  	         *
  	         * @name        target
  	         * @memberof    mixitup.Config.render
  	         * @instance
  	         * @type        {function}
  	         * @default     'null'
  	         */

  	        this.target = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigRender);

  	    mixitup.ConfigRender.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigRender.prototype.constructor = mixitup.ConfigRender;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.ConfigTemplates = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ConfigTemplates);

  	    mixitup.ConfigTemplates.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ConfigTemplates.prototype.constructor = mixitup.ConfigTemplates;

  	    /**
  	     * `mixitup.Config` is an interface used for customising the functionality of a
  	     * mixer instance. It is organised into several semantically distinct sub-objects,
  	     * each one pertaining to a particular aspect of MixItUp functionality.
  	     *
  	     * An object literal containing any or all of the available properies,
  	     * known as the "configuration object", can be passed as the second parameter to
  	     * the `mixitup` factory function when creating a mixer instance to customise its
  	     * functionality as needed.
  	     *
  	     * If no configuration object is passed, the mixer instance will take on the default
  	     * configuration values detailed below.
  	     *
  	     * @example <caption>Example 1: Creating and passing the configuration object</caption>
  	     * // Create a configuration object with desired values
  	     *
  	     * var config = {
  	     *     animation: {
  	     *         enable: false
  	     *     },
  	     *     selectors: {
  	     *         target: '.item'
  	     *     }
  	     * };
  	     *
  	     * // Pass the configuration object to the mixitup factory function
  	     *
  	     * var mixer = mixitup(containerEl, config);
  	     *
  	     * @example <caption>Example 2: Passing the configuration object inline</caption>
  	     * // Typically, the configuration object is passed inline for brevity.
  	     *
  	     * var mixer = mixitup(containerEl, {
  	     *     controls: {
  	     *         live: true,
  	     *         toggleLogic: 'and'
  	     *     }
  	     * });
  	     *
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @namespace
  	     * @public
  	     * @since       2.0.0
  	     */

  	    mixitup.Config = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.animation          = new mixitup.ConfigAnimation();
  	        this.behavior           = new mixitup.ConfigBehavior();
  	        this.callbacks          = new mixitup.ConfigCallbacks();
  	        this.controls           = new mixitup.ConfigControls();
  	        this.classNames         = new mixitup.ConfigClassNames();
  	        this.data               = new mixitup.ConfigData();
  	        this.debug              = new mixitup.ConfigDebug();
  	        this.layout             = new mixitup.ConfigLayout();
  	        this.load               = new mixitup.ConfigLoad();
  	        this.selectors          = new mixitup.ConfigSelectors();
  	        this.render             = new mixitup.ConfigRender();
  	        this.templates          = new mixitup.ConfigTemplates();

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Config);

  	    mixitup.Config.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.Config.prototype.constructor = mixitup.Config;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.MixerDom = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.document               = null;
  	        this.body                   = null;
  	        this.container              = null;
  	        this.parent                 = null;
  	        this.targets                = [];

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.MixerDom);

  	    mixitup.MixerDom.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.MixerDom.prototype.constructor = mixitup.MixerDom;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.UiClassNames = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.base       = '';
  	        this.active     = '';
  	        this.disabled   = '';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.UiClassNames);

  	    mixitup.UiClassNames.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.UiClassNames.prototype.constructor = mixitup.UiClassNames;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.dataset()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandDataset = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.dataset = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandDataset);

  	    mixitup.CommandDataset.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandDataset.prototype.constructor = mixitup.CommandDataset;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.multimix()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandMultimix = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.filter       = null;
  	        this.sort         = null;
  	        this.insert       = null;
  	        this.remove       = null;
  	        this.changeLayout = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandMultimix);

  	    mixitup.CommandMultimix.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandMultimix.prototype.constructor = mixitup.CommandMultimix;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.filter()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandFilter = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.selector   = '';
  	        this.collection = null;
  	        this.action     = 'show'; // enum: ['show', 'hide']

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandFilter);

  	    mixitup.CommandFilter.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandFilter.prototype.constructor = mixitup.CommandFilter;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.sort()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandSort = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.sortString = '';
  	        this.attribute  = '';
  	        this.order      = 'asc';
  	        this.collection = null;
  	        this.next       = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandSort);

  	    mixitup.CommandSort.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandSort.prototype.constructor = mixitup.CommandSort;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.insert()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandInsert = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.index      = 0;
  	        this.collection = [];
  	        this.position   = 'before'; // enum: ['before', 'after']
  	        this.sibling    = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandInsert);

  	    mixitup.CommandInsert.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandInsert.prototype.constructor = mixitup.CommandInsert;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.remove()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandRemove = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.targets    = [];
  	        this.collection = [];

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandRemove);

  	    mixitup.CommandRemove.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandRemove.prototype.constructor = mixitup.CommandRemove;

  	    /**
  	     * An object into which all arbitrary arguments sent to '.changeLayout()' are mapped.
  	     *
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.CommandChangeLayout = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.containerClassName = '';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.CommandChangeLayout);

  	    mixitup.CommandChangeLayout.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.CommandChangeLayout.prototype.constructor = mixitup.CommandChangeLayout;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     * @param       {string}        type
  	     * @param       {string}        selector
  	     * @param       {boolean}       [live]
  	     * @param       {string}        [parent]
  	     *     An optional string representing the name of the mixer.dom property containing a reference to a parent element.
  	     */

  	    mixitup.ControlDefinition = function(type, selector, live, parent) {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.type    = type;
  	        this.selector  = selector;
  	        this.live      = live || false;
  	        this.parent    = parent || '';

  	        this.callActions('afterConstruct');

  	        h.freeze(this);
  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.ControlDefinition);

  	    mixitup.ControlDefinition.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.ControlDefinition.prototype.constructor = mixitup.ControlDefinition;

  	    mixitup.controlDefinitions = [];

  	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('multimix', '[data-filter][data-sort]'));
  	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('filter', '[data-filter]'));
  	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('sort', '[data-sort]'));
  	    mixitup.controlDefinitions.push(new mixitup.ControlDefinition('toggle', '[data-toggle]'));

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Control = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.el         = null;
  	        this.selector   = '';
  	        this.bound      = [];
  	        this.pending    = -1;
  	        this.type       = '';
  	        this.status     = 'inactive'; // enum: ['inactive', 'active', 'disabled', 'live']
  	        this.filter     = '';
  	        this.sort       = '';
  	        this.canDisable = false;
  	        this.handler    = null;
  	        this.classNames = new mixitup.UiClassNames();

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Control);

  	    mixitup.Control.prototype = Object.create(mixitup.Base.prototype);

  	    h.extend(mixitup.Control.prototype,
  	    /** @lends mixitup.Control */
  	    {
  	        constructor: mixitup.Control,

  	        /**
  	         * @private
  	         * @param {HTMLElement} el
  	         * @param {string}      type
  	         * @param {string}      selector
  	         */

  	        init: function(el, type, selector) {
  	            var self = this;

  	            this.callActions('beforeInit', arguments);

  	            self.el         = el;
  	            self.type       = type;
  	            self.selector   = selector;

  	            if (self.selector) {
  	                self.status = 'live';
  	            } else {
  	                self.canDisable = typeof self.el.disable === 'boolean';

  	                switch (self.type) {
  	                    case 'filter':
  	                        self.filter = self.el.getAttribute('data-filter');

  	                        break;
  	                    case 'toggle':
  	                        self.filter = self.el.getAttribute('data-toggle');

  	                        break;
  	                    case 'sort':
  	                        self.sort   = self.el.getAttribute('data-sort');

  	                        break;
  	                    case 'multimix':
  	                        self.filter = self.el.getAttribute('data-filter');
  	                        self.sort   = self.el.getAttribute('data-sort');

  	                        break;
  	                }
  	            }

  	            self.bindClick();

  	            mixitup.controls.push(self);

  	            this.callActions('afterInit', arguments);
  	        },

  	        /**
  	         * @private
  	         * @param  {mixitup.Mixer} mixer
  	         * @return {boolean}
  	         */

  	        isBound: function(mixer) {
  	            var self    = this,
  	                isBound = false;

  	            this.callActions('beforeIsBound', arguments);

  	            isBound = self.bound.indexOf(mixer) > -1;

  	            return self.callFilters('afterIsBound', isBound, arguments);
  	        },

  	        /**
  	         * @private
  	         * @param  {mixitup.Mixer} mixer
  	         * @return {void}
  	         */

  	        addBinding: function(mixer) {
  	            var self = this;

  	            this.callActions('beforeAddBinding', arguments);

  	            if (!self.isBound()) {
  	                self.bound.push(mixer);
  	            }

  	            this.callActions('afterAddBinding', arguments);
  	        },

  	        /**
  	         * @private
  	         * @param  {mixitup.Mixer} mixer
  	         * @return {void}
  	         */

  	        removeBinding: function(mixer) {
  	            var self        = this,
  	                removeIndex = -1;

  	            this.callActions('beforeRemoveBinding', arguments);

  	            if ((removeIndex = self.bound.indexOf(mixer)) > -1) {
  	                self.bound.splice(removeIndex, 1);
  	            }

  	            if (self.bound.length < 1) {
  	                // No bindings exist, unbind event click handlers

  	                self.unbindClick();

  	                // Remove from `mixitup.controls` list

  	                removeIndex = mixitup.controls.indexOf(self);

  	                mixitup.controls.splice(removeIndex, 1);

  	                if (self.status === 'active') {
  	                    self.renderStatus(self.el, 'inactive');
  	                }
  	            }

  	            this.callActions('afterRemoveBinding', arguments);
  	        },

  	        /**
  	         * @private
  	         * @return {void}
  	         */

  	        bindClick: function() {
  	            var self = this;

  	            this.callActions('beforeBindClick', arguments);

  	            self.handler = function(e) {
  	                self.handleClick(e);
  	            };

  	            h.on(self.el, 'click', self.handler);

  	            this.callActions('afterBindClick', arguments);
  	        },

  	        /**
  	         * @private
  	         * @return {void}
  	         */

  	        unbindClick: function() {
  	            var self = this;

  	            this.callActions('beforeUnbindClick', arguments);

  	            h.off(self.el, 'click', self.handler);

  	            self.handler = null;

  	            this.callActions('afterUnbindClick', arguments);
  	        },

  	        /**
  	         * @private
  	         * @param   {MouseEvent} e
  	         * @return  {void}
  	         */

  	        handleClick: function(e) {
  	            var self        = this,
  	                button      = null,
  	                mixer       = null,
  	                isActive    = false,
  	                returnValue = void(0),
  	                command     = {},
  	                clone       = null,
  	                commands    = [],
  	                i           = -1;

  	            this.callActions('beforeHandleClick', arguments);

  	            this.pending = 0;

  	            mixer = self.bound[0];

  	            if (!self.selector) {
  	                button = self.el;
  	            } else {
  	                button = h.closestParent(e.target, mixer.config.selectors.control + self.selector, true, mixer.dom.document);
  	            }

  	            if (!button) {
  	                self.callActions('afterHandleClick', arguments);

  	                return;
  	            }

  	            switch (self.type) {
  	                case 'filter':
  	                    command.filter = self.filter || button.getAttribute('data-filter');

  	                    break;
  	                case 'sort':
  	                    command.sort = self.sort || button.getAttribute('data-sort');

  	                    break;
  	                case 'multimix':
  	                    command.filter  = self.filter || button.getAttribute('data-filter');
  	                    command.sort    = self.sort || button.getAttribute('data-sort');

  	                    break;
  	                case 'toggle':
  	                    command.filter  = self.filter || button.getAttribute('data-toggle');

  	                    if (self.status === 'live') {
  	                        isActive = h.hasClass(button, self.classNames.active);
  	                    } else {
  	                        isActive = self.status === 'active';
  	                    }

  	                    break;
  	            }

  	            for (i = 0; i < self.bound.length; i++) {
  	                // Create a clone of the command for each bound mixer instance

  	                clone = new mixitup.CommandMultimix();

  	                h.extend(clone, command);

  	                commands.push(clone);
  	            }

  	            commands = self.callFilters('commandsHandleClick', commands, arguments);

  	            self.pending = self.bound.length;

  	            for (i = 0; mixer = self.bound[i]; i++) {
  	                command = commands[i];

  	                if (!command) {
  	                    // An extension may set a command null to indicate that the click should not be handled

  	                    continue;
  	                }

  	                if (!mixer.lastClicked) {
  	                    mixer.lastClicked = button;
  	                }

  	                mixitup.events.fire('mixClick', mixer.dom.container, {
  	                    state: mixer.state,
  	                    instance: mixer,
  	                    originalEvent: e,
  	                    control: mixer.lastClicked
  	                }, mixer.dom.document);

  	                if (typeof mixer.config.callbacks.onMixClick === 'function') {
  	                    returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, mixer);

  	                    if (returnValue === false) {
  	                        // User has returned `false` from the callback, so do not handle click

  	                        continue;
  	                    }
  	                }

  	                if (self.type === 'toggle') {
  	                    isActive ? mixer.toggleOff(command.filter) : mixer.toggleOn(command.filter);
  	                } else {
  	                    mixer.multimix(command);
  	                }
  	            }

  	            this.callActions('afterHandleClick', arguments);
  	        },

  	        /**
  	         * @param   {object}          command
  	         * @param   {Array<string>}   toggleArray
  	         * @return  {void}
  	         */

  	        update: function(command, toggleArray) {
  	            var self    = this,
  	                actions = new mixitup.CommandMultimix();

  	            self.callActions('beforeUpdate', arguments);

  	            self.pending--;

  	            self.pending = Math.max(0, self.pending);

  	            if (self.pending > 0) return;

  	            if (self.status === 'live') {
  	                // Live control (status unknown)

  	                self.updateLive(command, toggleArray);
  	            } else {
  	                // Static control

  	                actions.sort    = self.sort;
  	                actions.filter  = self.filter;

  	                self.callFilters('actionsUpdate', actions, arguments);

  	                self.parseStatusChange(self.el, command, actions, toggleArray);
  	            }

  	            self.callActions('afterUpdate', arguments);
  	        },

  	        /**
  	         * @param   {mixitup.CommandMultimix} command
  	         * @param   {Array<string>}           toggleArray
  	         * @return  {void}
  	         */

  	        updateLive: function(command, toggleArray) {
  	            var self            = this,
  	                controlButtons  = null,
  	                actions         = null,
  	                button          = null,
  	                i               = -1;

  	            self.callActions('beforeUpdateLive', arguments);

  	            if (!self.el) return;

  	            controlButtons = self.el.querySelectorAll(self.selector);

  	            for (i = 0; button = controlButtons[i]; i++) {
  	                actions = new mixitup.CommandMultimix();

  	                switch (self.type) {
  	                    case 'filter':
  	                        actions.filter = button.getAttribute('data-filter');

  	                        break;
  	                    case 'sort':
  	                        actions.sort = button.getAttribute('data-sort');

  	                        break;
  	                    case 'multimix':
  	                        actions.filter  = button.getAttribute('data-filter');
  	                        actions.sort    = button.getAttribute('data-sort');

  	                        break;
  	                    case 'toggle':
  	                        actions.filter  = button.getAttribute('data-toggle');

  	                        break;
  	                }

  	                actions = self.callFilters('actionsUpdateLive', actions, arguments);

  	                self.parseStatusChange(button, command, actions, toggleArray);
  	            }

  	            self.callActions('afterUpdateLive', arguments);
  	        },

  	        /**
  	         * @param   {HTMLElement}             button
  	         * @param   {mixitup.CommandMultimix} command
  	         * @param   {mixitup.CommandMultimix} actions
  	         * @param   {Array<string>}           toggleArray
  	         * @return  {void}
  	         */

  	        parseStatusChange: function(button, command, actions, toggleArray) {
  	            var self    = this,
  	                alias   = '',
  	                toggle  = '',
  	                i       = -1;

  	            self.callActions('beforeParseStatusChange', arguments);

  	            switch (self.type) {
  	                case 'filter':
  	                    if (command.filter === actions.filter) {
  	                        self.renderStatus(button, 'active');
  	                    } else {
  	                        self.renderStatus(button, 'inactive');
  	                    }

  	                    break;
  	                case 'multimix':
  	                    if (command.sort === actions.sort && command.filter === actions.filter) {
  	                        self.renderStatus(button, 'active');
  	                    } else {
  	                        self.renderStatus(button, 'inactive');
  	                    }

  	                    break;
  	                case 'sort':
  	                    if (command.sort.match(/:asc/g)) {
  	                        alias = command.sort.replace(/:asc/g, '');
  	                    }

  	                    if (command.sort === actions.sort || alias === actions.sort) {
  	                        self.renderStatus(button, 'active');
  	                    } else {
  	                        self.renderStatus(button, 'inactive');
  	                    }

  	                    break;
  	                case 'toggle':
  	                    if (toggleArray.length < 1) self.renderStatus(button, 'inactive');

  	                    if (command.filter === actions.filter) {
  	                        self.renderStatus(button, 'active');
  	                    }

  	                    for (i = 0; i < toggleArray.length; i++) {
  	                        toggle = toggleArray[i];

  	                        if (toggle === actions.filter) {
  	                            // Button matches one active toggle

  	                            self.renderStatus(button, 'active');

  	                            break;
  	                        }

  	                        self.renderStatus(button, 'inactive');
  	                    }

  	                    break;
  	            }

  	            self.callActions('afterParseStatusChange', arguments);
  	        },

  	        /**
  	         * @param   {HTMLElement}   button
  	         * @param   {string}        status
  	         * @return  {void}
  	         */

  	        renderStatus: function(button, status) {
  	            var self = this;

  	            self.callActions('beforeRenderStatus', arguments);

  	            switch (status) {
  	                case 'active':
  	                    h.addClass(button, self.classNames.active);
  	                    h.removeClass(button, self.classNames.disabled);

  	                    if (self.canDisable) self.el.disabled = false;

  	                    break;
  	                case 'inactive':
  	                    h.removeClass(button, self.classNames.active);
  	                    h.removeClass(button, self.classNames.disabled);

  	                    if (self.canDisable) self.el.disabled = false;

  	                    break;
  	                case 'disabled':
  	                    if (self.canDisable) self.el.disabled = true;

  	                    h.addClass(button, self.classNames.disabled);
  	                    h.removeClass(button, self.classNames.active);

  	                    break;
  	            }

  	            if (self.status !== 'live') {
  	                // Update the control's status propery if not live

  	                self.status = status;
  	            }

  	            self.callActions('afterRenderStatus', arguments);
  	        }
  	    });

  	    mixitup.controls = [];

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.StyleData = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.x              = 0;
  	        this.y              = 0;
  	        this.top            = 0;
  	        this.right          = 0;
  	        this.bottom         = 0;
  	        this.left           = 0;
  	        this.width          = 0;
  	        this.height         = 0;
  	        this.marginRight    = 0;
  	        this.marginBottom   = 0;
  	        this.opacity        = 0;
  	        this.scale          = new mixitup.TransformData();
  	        this.translateX     = new mixitup.TransformData();
  	        this.translateY     = new mixitup.TransformData();
  	        this.translateZ     = new mixitup.TransformData();
  	        this.rotateX        = new mixitup.TransformData();
  	        this.rotateY        = new mixitup.TransformData();
  	        this.rotateZ        = new mixitup.TransformData();

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.StyleData);

  	    mixitup.StyleData.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.StyleData.prototype.constructor = mixitup.StyleData;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.TransformData = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.value  = 0;
  	        this.unit   = '';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.TransformData);

  	    mixitup.TransformData.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.TransformData.prototype.constructor = mixitup.TransformData;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.TransformDefaults = function() {
  	        mixitup.StyleData.apply(this);

  	        this.callActions('beforeConstruct');

  	        this.scale.value        = 0.01;
  	        this.scale.unit         = '';

  	        this.translateX.value   = 20;
  	        this.translateX.unit    = 'px';

  	        this.translateY.value   = 20;
  	        this.translateY.unit    = 'px';

  	        this.translateZ.value   = 20;
  	        this.translateZ.unit    = 'px';

  	        this.rotateX.value      = 90;
  	        this.rotateX.unit       = 'deg';

  	        this.rotateY.value      = 90;
  	        this.rotateY.unit       = 'deg';

  	        this.rotateX.value      = 90;
  	        this.rotateX.unit       = 'deg';

  	        this.rotateZ.value      = 180;
  	        this.rotateZ.unit       = 'deg';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.TransformDefaults);

  	    mixitup.TransformDefaults.prototype = Object.create(mixitup.StyleData.prototype);

  	    mixitup.TransformDefaults.prototype.constructor = mixitup.TransformDefaults;

  	    /**
  	     * @private
  	     * @static
  	     * @since   3.0.0
  	     * @type    {mixitup.TransformDefaults}
  	     */

  	    mixitup.transformDefaults = new mixitup.TransformDefaults();

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.EventDetail = function() {
  	        this.state          = null;
  	        this.futureState    = null;
  	        this.instance       = null;
  	        this.originalEvent  = null;
  	    };

  	    /**
  	     * The `mixitup.Events` class contains all custom events dispatched by MixItUp at various
  	     * points within the lifecycle of a mixer operation.
  	     *
  	     * Each event is analogous to the callback function of the same name defined in
  	     * the `callbacks` configuration object, and is triggered immediately before it.
  	     *
  	     * Events are always triggered from the container element on which MixItUp is instantiated
  	     * upon.
  	     *
  	     * As with any event, registered event handlers receive the event object as a parameter
  	     * which includes a `detail` property containting references to the current `state`,
  	     * the `mixer` instance, and other event-specific properties described below.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.Events = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * A custom event triggered immediately after any MixItUp operation is requested
  	         * and before animations have begun.
  	         *
  	         * The `mixStart` event also exposes a `futureState` property via the
  	         * `event.detail` object, which represents the final state of the mixer once
  	         * the requested operation has completed.
  	         *
  	         * @name        mixStart
  	         * @memberof    mixitup.Events
  	         * @static
  	         * @type        {CustomEvent}
  	         */

  	        this.mixStart = null;

  	        /**
  	         * A custom event triggered when a MixItUp operation is requested while another
  	         * operation is in progress, and the animation queue is full, or queueing
  	         * is disabled.
  	         *
  	         * @name        mixBusy
  	         * @memberof    mixitup.Events
  	         * @static
  	         * @type        {CustomEvent}
  	         */

  	        this.mixBusy = null;

  	        /**
  	         * A custom event triggered after any MixItUp operation has completed, and the
  	         * state has been updated.
  	         *
  	         * @name        mixEnd
  	         * @memberof    mixitup.Events
  	         * @static
  	         * @type        {CustomEvent}
  	         */

  	        this.mixEnd = null;

  	        /**
  	         * A custom event triggered whenever a filter operation "fails", i.e. no targets
  	         * could be found matching the requested filter.
  	         *
  	         * @name        mixFail
  	         * @memberof    mixitup.Events
  	         * @static
  	         * @type        {CustomEvent}
  	         */

  	        this.mixFail = null;

  	        /**
  	         * A custom event triggered whenever a MixItUp control is clicked, and before its
  	         * respective operation is requested.
  	         *
  	         * This event also exposes an `originalEvent` property via the `event.detail`
  	         * object, which holds a reference to the original click event.
  	         *
  	         * @name        mixClick
  	         * @memberof    mixitup.Events
  	         * @static
  	         * @type        {CustomEvent}
  	         */

  	        this.mixClick = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Events);

  	    mixitup.Events.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.Events.prototype.constructor = mixitup.Events;

  	    /**
  	     * @private
  	     * @param   {string}      eventType
  	     * @param   {Element}     el
  	     * @param   {object}      detail
  	     * @param   {Document}    [doc]
  	     */

  	    mixitup.Events.prototype.fire = function(eventType, el, detail, doc) {
  	        var self        = this,
  	            event       = null,
  	            eventDetail = new mixitup.EventDetail();

  	        self.callActions('beforeFire', arguments);

  	        if (typeof self[eventType] === 'undefined') {
  	            throw new Error('Event type "' + eventType + '" not found.');
  	        }

  	        eventDetail.state = new mixitup.State();

  	        h.extend(eventDetail.state, detail.state);

  	        if (detail.futureState) {
  	            eventDetail.futureState = new mixitup.State();

  	            h.extend(eventDetail.futureState, detail.futureState);
  	        }

  	        eventDetail.instance = detail.instance;

  	        if (detail.originalEvent) {
  	            eventDetail.originalEvent = detail.originalEvent;
  	        }

  	        event = h.getCustomEvent(eventType, eventDetail, doc);

  	        self.callFilters('eventFire', event, arguments);

  	        el.dispatchEvent(event);
  	    };

  	    // Asign a singleton instance to `mixitup.events`:

  	    mixitup.events = new mixitup.Events();

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.QueueItem = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.args           = [];
  	        this.instruction    = null;
  	        this.triggerElement = null;
  	        this.deferred       = null;
  	        this.isToggling     = false;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.QueueItem);

  	    mixitup.QueueItem.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.QueueItem.prototype.constructor = mixitup.QueueItem;

  	    /**
  	     * The `mixitup.Mixer` class is used to hold discreet, user-configured
  	     * instances of MixItUp on a provided container element.
  	     *
  	     * Mixer instances are returned whenever the `mixitup()` factory function is called,
  	     * which expose a range of methods enabling API-based filtering, sorting,
  	     * insertion, removal and more.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.Mixer = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.config            = new mixitup.Config();

  	        this.id                = '';

  	        this.isBusy            = false;
  	        this.isToggling        = false;
  	        this.incPadding        = true;

  	        this.controls          = [];
  	        this.targets           = [];
  	        this.origOrder         = [];
  	        this.cache             = {};

  	        this.toggleArray       = [];

  	        this.targetsMoved      = 0;
  	        this.targetsImmovable  = 0;
  	        this.targetsBound      = 0;
  	        this.targetsDone       = 0;

  	        this.staggerDuration   = 0;
  	        this.effectsIn         = null;
  	        this.effectsOut        = null;
  	        this.transformIn       = [];
  	        this.transformOut      = [];
  	        this.queue             = [];

  	        this.state             = null;
  	        this.lastOperation     = null;
  	        this.lastClicked       = null;
  	        this.userCallback      = null;
  	        this.userDeferred      = null;

  	        this.dom               = new mixitup.MixerDom();

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Mixer);

  	    mixitup.Mixer.prototype = Object.create(mixitup.Base.prototype);

  	    h.extend(mixitup.Mixer.prototype,
  	    /** @lends mixitup.Mixer */
  	    {
  	        constructor: mixitup.Mixer,

  	        /**
  	         * @private
  	         * @instance
  	         * @since 3.0.0
  	         * @param {HTMLElement} container
  	         * @param {HTMLElement} document
  	         * @param {string}      id
  	         * @param {object}      [config]
  	         */

  	        attach: function(container, document, id, config) {
  	            var self    = this,
  	                target  = null,
  	                i       = -1;

  	            self.callActions('beforeAttach', arguments);

  	            self.id = id;

  	            if (config) {
  	                h.extend(self.config, config, true, true);
  	            }

  	            self.sanitizeConfig();

  	            self.cacheDom(container, document);

  	            if (self.config.layout.containerClassName) {
  	                h.addClass(self.dom.container, self.config.layout.containerClassName);
  	            }

  	            if (!mixitup.features.has.transitions) {
  	                self.config.animation.enable = false;
  	            }

  	            if (typeof window.console === 'undefined') {
  	                self.config.debug.showWarnings = false;
  	            }

  	            if (self.config.data.uidKey) {
  	                // If the dataset API is in use, force disable controls

  	                self.config.controls.enable = false;
  	            }

  	            self.indexTargets();

  	            self.state = self.getInitialState();

  	            for (i = 0; target = self.lastOperation.toHide[i]; i++) {
  	                target.hide();
  	            }

  	            if (self.config.controls.enable) {
  	                self.initControls();

  	                self.buildToggleArray(null, self.state);

  	                self.updateControls({
  	                    filter: self.state.activeFilter,
  	                    sort: self.state.activeSort
  	                });
  	            }

  	            self.parseEffects();

  	            self.callActions('afterAttach', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since 3.0.0
  	         * @return {void}
  	         */

  	        sanitizeConfig: function() {
  	            var self = this;

  	            self.callActions('beforeSanitizeConfig', arguments);

  	            // Sanitize enum/string config options

  	            self.config.controls.scope          = self.config.controls.scope.toLowerCase().trim();
  	            self.config.controls.toggleLogic    = self.config.controls.toggleLogic.toLowerCase().trim();
  	            self.config.controls.toggleDefault  = self.config.controls.toggleDefault.toLowerCase().trim();

  	            self.config.animation.effects       = self.config.animation.effects.trim();

  	            self.callActions('afterSanitizeConfig', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {mixitup.State}
  	         */

  	        getInitialState: function() {
  	            var self        = this,
  	                state       = new mixitup.State(),
  	                operation   = new mixitup.Operation();

  	            self.callActions('beforeGetInitialState', arguments);

  	            // Map initial values into a mock state object in order to construct an operation

  	            state.activeContainerClassName = self.config.layout.containerClassName;

  	            if (self.config.load.dataset) {
  	                // Dataset API

  	                if (!self.config.data.uidKey || typeof self.config.data.uidKey !== 'string') {
  	                    throw new TypeError(mixitup.messages.errorConfigDataUidKeyNotSet());
  	                }

  	                operation.startDataset = operation.newDataset = state.activeDataset = self.config.load.dataset.slice();
  	                operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
  	                operation.show = self.targets.slice();

  	                state = self.callFilters('stateGetInitialState', state, arguments);
  	            } else {
  	                // DOM API

  	                state.activeFilter              = self.parseFilterArgs([self.config.load.filter]).command;
  	                state.activeSort                = self.parseSortArgs([self.config.load.sort]).command;
  	                state.totalTargets              = self.targets.length;

  	                state = self.callFilters('stateGetInitialState', state, arguments);

  	                if (
  	                    state.activeSort.collection || state.activeSort.attribute ||
  	                    state.activeSort.order === 'random' || state.activeSort.order === 'desc'
  	                ) {
  	                    // Sorting on load

  	                    operation.newSort = state.activeSort;

  	                    self.sortOperation(operation);

  	                    self.printSort(false, operation);

  	                    self.targets = operation.newOrder;
  	                } else {
  	                    operation.startOrder = operation.newOrder = self.targets;
  	                }

  	                operation.startFilter               = operation.newFilter               = state.activeFilter;
  	                operation.startSort                 = operation.newSort                 = state.activeSort;
  	                operation.startContainerClassName   = operation.newContainerClassName   = state.activeContainerClassName;

  	                if (operation.newFilter.selector === 'all') {
  	                    operation.newFilter.selector = self.config.selectors.target;
  	                } else if (operation.newFilter.selector === 'none') {
  	                    operation.newFilter.selector = '';
  	                }
  	            }

  	            operation = self.callFilters('operationGetInitialState', operation, [state]);

  	            self.lastOperation = operation;

  	            if (operation.newFilter) {
  	                self.filterOperation(operation);
  	            }

  	            state = self.buildState(operation);

  	            return state;
  	        },

  	        /**
  	         * Caches references of DOM elements neccessary for the mixer's functionality.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {HTMLElement}       el
  	         * @param   {HTMLHtmlElement}   document
  	         * @return  {void}
  	         */

  	        cacheDom: function(el, document) {
  	            var self    = this;

  	            self.callActions('beforeCacheDom', arguments);

  	            self.dom.document  = document;
  	            self.dom.body      = self.dom.document.querySelector('body');
  	            self.dom.container = el;
  	            self.dom.parent    = el;

  	            self.callActions('afterCacheDom', arguments);
  	        },

  	        /**
  	         * Indexes all child elements of the mixer matching the `selectors.target`
  	         * selector, instantiating a mixitup.Target for each one.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {void}
  	         */

  	        indexTargets: function() {
  	            var self            = this,
  	                target          = null,
  	                el              = null,
  	                dataset         = null,
  	                i               = -1;

  	            self.callActions('beforeIndexTargets', arguments);

  	            self.dom.targets = self.config.layout.allowNestedTargets ?
  	                self.dom.container.querySelectorAll(self.config.selectors.target) :
  	                h.children(self.dom.container, self.config.selectors.target, self.dom.document);

  	            self.dom.targets = h.arrayFromList(self.dom.targets);

  	            self.targets = [];

  	            if ((dataset = self.config.load.dataset) && dataset.length !== self.dom.targets.length) {
  	                throw new Error(mixitup.messages.errorDatasetPrerenderedMismatch());
  	            }

  	            if (self.dom.targets.length) {
  	                for (i = 0; el = self.dom.targets[i]; i++) {
  	                    target = new mixitup.Target();

  	                    target.init(el, self, dataset ? dataset[i] : void(0));

  	                    target.isInDom = true;

  	                    self.targets.push(target);
  	                }

  	                self.dom.parent = self.dom.targets[0].parentElement === self.dom.container ?
  	                    self.dom.container :
  	                    self.dom.targets[0].parentElement;
  	            }

  	            self.origOrder = self.targets;

  	            self.callActions('afterIndexTargets', arguments);
  	        },

  	        initControls: function() {
  	            var self                = this,
  	                definition          = '',
  	                controlElements     = null,
  	                el                  = null,
  	                parent              = null,
  	                delagators          = null,
  	                control             = null,
  	                i                   = -1,
  	                j                   = -1;

  	            self.callActions('beforeInitControls', arguments);

  	            switch (self.config.controls.scope) {
  	                case 'local':
  	                    parent = self.dom.container;

  	                    break;
  	                case 'global':
  	                    parent = self.dom.document;

  	                    break;
  	                default:
  	                    throw new Error(mixitup.messages.errorConfigInvalidControlsScope());
  	            }

  	            for (i = 0; definition = mixitup.controlDefinitions[i]; i++) {
  	                if (self.config.controls.live || definition.live) {
  	                    if (definition.parent) {
  	                        delagators = self.dom[definition.parent];

  	                        if (!delagators || delagators.length < 0) continue;

  	                        if (typeof delagators.length !== 'number') {
  	                            delagators = [delagators];
  	                        }
  	                    } else {
  	                        delagators = [parent];
  	                    }

  	                    for (j = 0; (el = delagators[j]); j++) {
  	                        control = self.getControl(el,  definition.type, definition.selector);

  	                        self.controls.push(control);
  	                    }
  	                } else {
  	                    controlElements = parent.querySelectorAll(self.config.selectors.control + definition.selector);

  	                    for (j = 0; (el = controlElements[j]); j++) {
  	                        control = self.getControl(el, definition.type, '');

  	                        if (!control) continue;

  	                        self.controls.push(control);
  	                    }
  	                }
  	            }

  	            self.callActions('afterInitControls', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {HTMLElement} el
  	         * @param   {string}      type
  	         * @param   {string}      selector
  	         * @return  {mixitup.Control|null}
  	         */

  	        getControl: function(el, type, selector) {
  	            var self    = this,
  	                control = null,
  	                i       = -1;

  	            self.callActions('beforeGetControl', arguments);

  	            if (!selector) {
  	                // Static controls only

  	                for (i = 0; control = mixitup.controls[i]; i++) {
  	                    if (control.el === el && control.isBound(self)) {
  	                        // Control already bound to this mixer (as another type).

  	                        // NB: This prevents duplicate controls from being registered where a selector
  	                        // might collide, eg: "[data-filter]" and "[data-filter][data-sort]"

  	                        return self.callFilters('controlGetControl', null, arguments);
  	                    } else if (control.el === el && control.type === type && control.selector === selector) {
  	                        // Another mixer is already using this control, add this mixer as a binding

  	                        control.addBinding(self);

  	                        return self.callFilters('controlGetControl', control, arguments);
  	                    }
  	                }
  	            }

  	            // Create new control

  	            control = new mixitup.Control();

  	            control.init(el, type, selector);

  	            control.classNames.base     = h.getClassname(self.config.classNames, type);
  	            control.classNames.active   = h.getClassname(self.config.classNames, type, self.config.classNames.modifierActive);
  	            control.classNames.disabled = h.getClassname(self.config.classNames, type, self.config.classNames.modifierDisabled);

  	            // Add a reference to this mixer as a binding

  	            control.addBinding(self);

  	            return self.callFilters('controlGetControl', control, arguments);
  	        },

  	        /**
  	         * Creates a compound selector by joining the `toggleArray` value as per the
  	         * defined toggle logic.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {string}
  	         */

  	        getToggleSelector: function() {
  	            var self            = this,
  	                delineator      = self.config.controls.toggleLogic === 'or' ? ', ' : '',
  	                toggleSelector  = '';

  	            self.callActions('beforeGetToggleSelector', arguments);

  	            self.toggleArray = h.clean(self.toggleArray);

  	            toggleSelector = self.toggleArray.join(delineator);

  	            if (toggleSelector === '') {
  	                toggleSelector = self.config.controls.toggleDefault;
  	            }

  	            return self.callFilters('selectorGetToggleSelector', toggleSelector, arguments);
  	        },

  	        /**
  	         * Breaks compound selector strings in an array of discreet selectors,
  	         * as per the active `controls.toggleLogic` configuration option. Accepts
  	         * either a dynamic command object, or a state object.
  	         *
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {object}        [command]
  	         * @param   {mixitup.State} [state]
  	         * @return  {void}
  	         */

  	        buildToggleArray: function(command, state) {
  	            var self                    = this,
  	                activeFilterSelector    = '';

  	            self.callActions('beforeBuildToggleArray', arguments);

  	            if (command && command.filter) {
  	                activeFilterSelector = command.filter.selector.replace(/\s/g, '');
  	            } else if (state) {
  	                activeFilterSelector = state.activeFilter.selector.replace(/\s/g, '');
  	            } else {
  	                return;
  	            }

  	            if (activeFilterSelector === self.config.selectors.target || activeFilterSelector === 'all') {
  	                activeFilterSelector = '';
  	            }

  	            if (self.config.controls.toggleLogic === 'or') {
  	                self.toggleArray = activeFilterSelector.split(',');
  	            } else {
  	                self.toggleArray = self.splitCompoundSelector(activeFilterSelector);
  	            }

  	            self.toggleArray = h.clean(self.toggleArray);

  	            self.callActions('afterBuildToggleArray', arguments);
  	        },

  	        /**
  	         * Takes a compound selector (e.g. `.cat-1.cat-2`, `[data-cat="1"][data-cat="2"]`)
  	         * and breaks into its individual selectors.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string} compoundSelector
  	         * @return  {string[]}
  	         */

  	        splitCompoundSelector: function(compoundSelector) {
  	            // Break at a `.` or `[`, capturing the delineator

  	            var partials    = compoundSelector.split(/([\.\[])/g),
  	                toggleArray = [],
  	                selector    = '',
  	                i           = -1;

  	            if (partials[0] === '') {
  	                partials.shift();
  	            }

  	            for (i = 0; i < partials.length; i++) {
  	                if (i % 2 === 0) {
  	                    selector = '';
  	                }

  	                selector += partials[i];

  	                if (i % 2 !== 0) {
  	                    toggleArray.push(selector);
  	                }
  	            }

  	            return toggleArray;
  	        },

  	        /**
  	         * Updates controls to their active/inactive state based on the command or
  	         * current state of the mixer.
  	         *
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {object} command
  	         * @return  {void}
  	         */

  	        updateControls: function(command) {
  	            var self    = this,
  	                control = null,
  	                output  = new mixitup.CommandMultimix(),
  	                i       = -1;

  	            self.callActions('beforeUpdateControls', arguments);

  	            // Sanitise to defaults

  	            if (command.filter) {
  	                output.filter = command.filter.selector;
  	            } else {
  	                output.filter = self.state.activeFilter.selector;
  	            }

  	            if (command.sort) {
  	                output.sort = self.buildSortString(command.sort);
  	            } else {
  	                output.sort = self.buildSortString(self.state.activeSort);
  	            }

  	            if (output.filter === self.config.selectors.target) {
  	                output.filter = 'all';
  	            }

  	            if (output.filter === '') {
  	                output.filter = 'none';
  	            }

  	            h.freeze(output);

  	            for (i = 0; control = self.controls[i]; i++) {
  	                control.update(output, self.toggleArray);
  	            }

  	            self.callActions('afterUpdateControls', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.CommandSort}   command
  	         * @return  {string}
  	         */

  	        buildSortString: function(command) {
  	            var self    = this;
  	            var output  = '';

  	            output += command.sortString;

  	            if (command.next) {
  	                output += ' ' + self.buildSortString(command.next);
  	            }

  	            return output;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {object}        command
  	         * @param   {Operation}     operation
  	         * @return  {Promise.<mixitup.State>}
  	         */

  	        insertTargets: function(command, operation) {
  	            var self            = this,
  	                nextSibling     = null,
  	                insertionIndex  = -1,
  	                frag            = null,
  	                target          = null,
  	                el              = null,
  	                i               = -1;

  	            self.callActions('beforeInsertTargets', arguments);

  	            if (typeof command.index === 'undefined') command.index = 0;

  	            nextSibling = self.getNextSibling(command.index, command.sibling, command.position);
  	            frag        = self.dom.document.createDocumentFragment();

  	            if (nextSibling) {
  	                insertionIndex = h.index(nextSibling, self.config.selectors.target);
  	            } else {
  	                insertionIndex = self.targets.length;
  	            }

  	            if (command.collection) {
  	                for (i = 0; el = command.collection[i]; i++) {
  	                    if (self.dom.targets.indexOf(el) > -1) {
  	                        throw new Error(mixitup.messages.errorInsertPreexistingElement());
  	                    }

  	                    // Ensure elements are hidden when they are added to the DOM, so they can
  	                    // be animated in gracefully

  	                    el.style.display = 'none';

  	                    frag.appendChild(el);
  	                    frag.appendChild(self.dom.document.createTextNode(' '));

  	                    if (!h.isElement(el, self.dom.document) || !el.matches(self.config.selectors.target)) continue;

  	                    target = new mixitup.Target();

  	                    target.init(el, self);

  	                    target.isInDom = true;

  	                    self.targets.splice(insertionIndex, 0, target);

  	                    insertionIndex++;
  	                }

  	                self.dom.parent.insertBefore(frag, nextSibling);
  	            }

  	            // Since targets have been added, the original order must be updated

  	            operation.startOrder = self.origOrder = self.targets;

  	            self.callActions('afterInsertTargets', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Number}      [index]
  	         * @param   {Element}     [sibling]
  	         * @param   {string}      [position]
  	         * @return  {Element}
  	         */

  	        getNextSibling: function(index, sibling, position) {
  	            var self    = this,
  	                element = null;

  	            index = Math.max(index, 0);

  	            if (sibling && position === 'before') {
  	                // Explicit sibling

  	                element = sibling;
  	            } else if (sibling && position === 'after') {
  	                // Explicit sibling

  	                element = sibling.nextElementSibling || null;
  	            } else if (self.targets.length > 0 && typeof index !== 'undefined') {
  	                // Index and targets exist

  	                element = (index < self.targets.length || !self.targets.length) ?
  	                    self.targets[index].dom.el :
  	                    self.targets[self.targets.length - 1].dom.el.nextElementSibling;
  	            } else if (self.targets.length === 0 && self.dom.parent.children.length > 0) {
  	                // No targets but other siblings

  	                if (self.config.layout.siblingAfter) {
  	                    element = self.config.layout.siblingAfter;
  	                } else if (self.config.layout.siblingBefore) {
  	                    element = self.config.layout.siblingBefore.nextElementSibling;
  	                } else {
  	                    self.dom.parent.children[0];
  	                }
  	            } else ;

  	            return self.callFilters('elementGetNextSibling', element, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        filterOperation: function(operation) {
  	            var self        = this,
  	                testResult  = false,
  	                index       = -1,
  	                action      = '',
  	                target      = null,
  	                i           = -1;

  	            self.callActions('beforeFilterOperation', arguments);

  	            action = operation.newFilter.action;

  	            for (i = 0; target = operation.newOrder[i]; i++) {
  	                if (operation.newFilter.collection) {
  	                    // show via collection

  	                    testResult = operation.newFilter.collection.indexOf(target.dom.el) > -1;
  	                } else {
  	                    // show via selector

  	                    if (operation.newFilter.selector === '') {
  	                        testResult = false;
  	                    } else {
  	                        testResult = target.dom.el.matches(operation.newFilter.selector);
  	                    }
  	                }

  	                self.evaluateHideShow(testResult, target, action, operation);
  	            }

  	            if (operation.toRemove.length) {
  	                for (i = 0; target = operation.show[i]; i++) {
  	                    if (operation.toRemove.indexOf(target) > -1) {
  	                        // If any shown targets should be removed, move them into the toHide array

  	                        operation.show.splice(i, 1);

  	                        if ((index = operation.toShow.indexOf(target)) > -1) {
  	                            operation.toShow.splice(index, 1);
  	                        }

  	                        operation.toHide.push(target);
  	                        operation.hide.push(target);

  	                        i--;
  	                    }
  	                }
  	            }

  	            operation.matching = operation.show.slice();

  	            if (operation.show.length === 0 && operation.newFilter.selector !== '' && self.targets.length !== 0) {
  	                operation.hasFailed = true;
  	            }

  	            self.callActions('afterFilterOperation', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {boolean}   testResult
  	         * @param   {Element}   target
  	         * @param   {string}    action
  	         * @param   {Operation} operation
  	         * @return  {void}
  	         */

  	        evaluateHideShow: function(testResult, target, action, operation) {
  	            var self = this,
  	                filteredTestResult = false,
  	                args = Array.prototype.slice.call(arguments, 1);

  	            filteredTestResult = self.callFilters('testResultEvaluateHideShow', testResult, args);

  	            self.callActions('beforeEvaluateHideShow', arguments);

  	            if (
  	                filteredTestResult === true && action === 'show' ||
  	                filteredTestResult === false && action === 'hide'
  	            ) {
  	                operation.show.push(target);

  	                !target.isShown && operation.toShow.push(target);
  	            } else {
  	                operation.hide.push(target);

  	                target.isShown && operation.toHide.push(target);
  	            }

  	            self.callActions('afterEvaluateHideShow', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        sortOperation: function(operation) {
  	            var self     = this,
  	                newOrder = [],
  	                target   = null,
  	                el       = null,
  	                i        = -1;

  	            self.callActions('beforeSortOperation', arguments);

  	            operation.startOrder = self.targets;

  	            if (operation.newSort.collection) {
  	                // Sort by collection

  	                newOrder = [];

  	                for (i = 0; (el = operation.newSort.collection[i]); i++) {
  	                    if (self.dom.targets.indexOf(el) < 0) {
  	                        throw new Error(mixitup.messages.errorSortNonExistentElement());
  	                    }

  	                    target = new mixitup.Target();

  	                    target.init(el, self);

  	                    target.isInDom = true;

  	                    newOrder.push(target);
  	                }

  	                operation.newOrder = newOrder;
  	            } else if (operation.newSort.order === 'random') {
  	                // Sort random

  	                operation.newOrder = h.arrayShuffle(operation.startOrder);
  	            } else if (operation.newSort.attribute === '') {
  	                // Sort by default

  	                operation.newOrder = self.origOrder.slice();

  	                if (operation.newSort.order === 'desc') {
  	                    operation.newOrder.reverse();
  	                }
  	            } else {
  	                // Sort by attribute

  	                operation.newOrder = operation.startOrder.slice();

  	                operation.newOrder.sort(function(a, b) {
  	                    return self.compare(a, b, operation.newSort);
  	                });
  	            }

  	            if (h.isEqualArray(operation.newOrder, operation.startOrder)) {
  	                operation.willSort = false;
  	            }

  	            self.callActions('afterSortOperation', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {mixitup.Target}        a
  	         * @param   {mixitup.Target}        b
  	         * @param   {mixitup.CommandSort}   command
  	         * @return  {Number}
  	         */

  	        compare: function(a, b, command) {
  	            var self        = this,
  	                order       = command.order,
  	                attrA       = self.getAttributeValue(a, command.attribute),
  	                attrB       = self.getAttributeValue(b, command.attribute);

  	            if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
  	                attrA = attrA.toLowerCase();
  	                attrB = attrB.toLowerCase();
  	            } else {
  	                attrA = attrA * 1;
  	                attrB = attrB * 1;
  	            }

  	            if (attrA < attrB) {
  	                return order === 'asc' ? -1 : 1;
  	            }

  	            if (attrA > attrB) {
  	                return order === 'asc' ? 1 : -1;
  	            }

  	            if (attrA === attrB && command.next) {
  	                return self.compare(a, b, command.next);
  	            }

  	            return 0;
  	        },

  	        /**
  	         * Reads the values of any data attributes present the provided target element
  	         * which match the current sort command.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.Target}    target
  	         * @param   {string}            [attribute]
  	         * @return  {(String|Number)}
  	         */

  	        getAttributeValue: function(target, attribute) {
  	            var self    = this,
  	                value   = '';

  	            value = target.dom.el.getAttribute('data-' + attribute);

  	            if (value === null) {
  	                if (self.config.debug.showWarnings) {
  	                    // Encourage users to assign values to all targets to avoid erroneous sorting
  	                    // when types are mixed

  	                    console.warn(mixitup.messages.warningInconsistentSortingAttributes({
  	                        attribute: 'data-' + attribute
  	                    }));
  	                }
  	            }

  	            // If an attribute is not present, return 0 as a safety value

  	            return self.callFilters('valueGetAttributeValue', value || 0, arguments);
  	        },

  	        /**
  	         * Inserts elements into the DOM in the appropriate
  	         * order using a document fragment for minimal
  	         * DOM thrashing
  	         *
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {boolean}   isResetting
  	         * @param   {Operation} operation
  	         * @return  {void}
  	         */

  	        printSort: function(isResetting, operation) {
  	            var self        = this,
  	                startOrder  = isResetting ? operation.newOrder : operation.startOrder,
  	                newOrder    = isResetting ? operation.startOrder : operation.newOrder,
  	                nextSibling = startOrder.length ? startOrder[startOrder.length - 1].dom.el.nextElementSibling : null,
  	                frag        = window.document.createDocumentFragment(),
  	                whitespace  = null,
  	                target      = null,
  	                el          = null,
  	                i           = -1;

  	            self.callActions('beforePrintSort', arguments);

  	            // Empty the container

  	            for (i = 0; target = startOrder[i]; i++) {
  	                el = target.dom.el;

  	                if (el.style.position === 'absolute') continue;

  	                h.removeWhitespace(el.previousSibling);

  	                el.parentElement.removeChild(el);
  	            }

  	            whitespace = nextSibling ? nextSibling.previousSibling : self.dom.parent.lastChild;

  	            if (whitespace && whitespace.nodeName === '#text') {
  	                h.removeWhitespace(whitespace);
  	            }

  	            for (i = 0; target = newOrder[i]; i++) {
  	                // Add targets into a document fragment

  	                el = target.dom.el;

  	                if (h.isElement(frag.lastChild)) {
  	                    frag.appendChild(window.document.createTextNode(' '));
  	                }

  	                frag.appendChild(el);
  	            }

  	            // Insert the document fragment into the container
  	            // before any other non-target elements

  	            if (self.dom.parent.firstChild && self.dom.parent.firstChild !== nextSibling) {
  	                frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
  	            }

  	            if (nextSibling) {
  	                frag.appendChild(window.document.createTextNode(' '));

  	                self.dom.parent.insertBefore(frag, nextSibling);
  	            } else {
  	                self.dom.parent.appendChild(frag);
  	            }

  	            self.callActions('afterPrintSort', arguments);
  	        },

  	        /**
  	         * Parses user-defined sort strings (i.e. `default:asc`) into sort commands objects.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string}                sortString
  	         * @param   {mixitup.CommandSort}   command
  	         * @return  {mixitup.CommandSort}
  	         */

  	        parseSortString: function(sortString, command) {
  	            var self        = this,
  	                rules       = sortString.split(' '),
  	                current     = command,
  	                rule        = [],
  	                i           = -1;

  	            // command.sortString = sortString;

  	            for (i = 0; i < rules.length; i++) {
  	                rule = rules[i].split(':');

  	                current.sortString  = rules[i];
  	                current.attribute   = h.dashCase(rule[0]);
  	                current.order       = rule[1] || 'asc';

  	                switch (current.attribute) {
  	                    case 'default':
  	                        // treat "default" as sorting by no attribute

  	                        current.attribute = '';

  	                        break;
  	                    case 'random':
  	                        // treat "random" as an order not an attribute

  	                        current.attribute   = '';
  	                        current.order       = 'random';

  	                        break;
  	                }

  	                if (!current.attribute || current.order === 'random') break;

  	                if (i < rules.length - 1) {
  	                    // Embed reference to the next command

  	                    current.next = new mixitup.CommandSort();

  	                    h.freeze(current);

  	                    current = current.next;
  	                }
  	            }

  	            return self.callFilters('commandsParseSort', command, arguments);
  	        },

  	        /**
  	         * Parses all effects out of the user-defined `animation.effects` string into
  	         * their respective properties and units.
  	         *
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @return  {void}
  	         */

  	        parseEffects: function() {
  	            var self            = this,
  	                transformName   = '',
  	                effectsIn       = self.config.animation.effectsIn || self.config.animation.effects,
  	                effectsOut      = self.config.animation.effectsOut || self.config.animation.effects;

  	            self.callActions('beforeParseEffects', arguments);

  	            self.effectsIn      = new mixitup.StyleData();
  	            self.effectsOut     = new mixitup.StyleData();
  	            self.transformIn    = [];
  	            self.transformOut   = [];

  	            self.effectsIn.opacity = self.effectsOut.opacity = 1;

  	            self.parseEffect('fade', effectsIn, self.effectsIn, self.transformIn);
  	            self.parseEffect('fade', effectsOut, self.effectsOut, self.transformOut, true);

  	            for (transformName in mixitup.transformDefaults) {
  	                if (!(mixitup.transformDefaults[transformName] instanceof mixitup.TransformData)) {
  	                    continue;
  	                }

  	                self.parseEffect(transformName, effectsIn, self.effectsIn, self.transformIn);
  	                self.parseEffect(transformName, effectsOut, self.effectsOut, self.transformOut, true);
  	            }

  	            self.parseEffect('stagger', effectsIn, self.effectsIn, self.transformIn);
  	            self.parseEffect('stagger', effectsOut, self.effectsOut, self.transformOut, true);

  	            self.callActions('afterParseEffects', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {string}    effectName
  	         * @param   {string}    effectString
  	         * @param   {StyleData} effects
  	         * @param   {String[]}  transform
  	         * @param   {boolean}   [isOut]
  	         */

  	        parseEffect: function(effectName, effectString, effects, transform, isOut) {
  	            var self        = this,
  	                re          = /\(([^)]+)\)/,
  	                propIndex   = -1,
  	                str         = '',
  	                match       = [],
  	                val         = '',
  	                units       = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'],
  	                unit        = '',
  	                i           = -1;

  	            self.callActions('beforeParseEffect', arguments);

  	            if (typeof effectString !== 'string') {
  	                throw new TypeError(mixitup.messages.errorConfigInvalidAnimationEffects());
  	            }

  	            if (effectString.indexOf(effectName) < 0) {
  	                // The effect is not present in the effects string

  	                if (effectName === 'stagger') {
  	                    // Reset stagger to 0

  	                    self.staggerDuration = 0;
  	                }

  	                return;
  	            }

  	            // The effect is present

  	            propIndex = effectString.indexOf(effectName + '(');

  	            if (propIndex > -1) {
  	                // The effect has a user defined value in parentheses

  	                // Extract from the first parenthesis to the end of string

  	                str = effectString.substring(propIndex);

  	                // Match any number of characters between "(" and ")"

  	                match = re.exec(str);

  	                val = match[1];
  	            }

  	            switch (effectName) {
  	                case 'fade':
  	                    effects.opacity = val ? parseFloat(val) : 0;

  	                    break;
  	                case 'stagger':
  	                    self.staggerDuration = val ? parseFloat(val) : 100;

  	                    // TODO: Currently stagger must be applied globally, but
  	                    // if seperate values are specified for in/out, this should
  	                    // be respected

  	                    break;
  	                default:
  	                    // All other effects are transforms following the same structure

  	                    if (isOut && self.config.animation.reverseOut && effectName !== 'scale') {
  	                        effects[effectName].value =
  	                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value) * -1;
  	                    } else {
  	                        effects[effectName].value =
  	                            (val ? parseFloat(val) : mixitup.transformDefaults[effectName].value);
  	                    }

  	                    if (val) {
  	                        for (i = 0; unit = units[i]; i++) {
  	                            if (val.indexOf(unit) > -1) {
  	                                effects[effectName].unit = unit;

  	                                break;
  	                            }
  	                        }
  	                    } else {
  	                        effects[effectName].unit = mixitup.transformDefaults[effectName].unit;
  	                    }

  	                    transform.push(
  	                        effectName +
  	                        '(' +
  	                        effects[effectName].value +
  	                        effects[effectName].unit +
  	                        ')'
  	                    );
  	            }

  	            self.callActions('afterParseEffect', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {State}
  	         */

  	        buildState: function(operation) {
  	            var self        = this,
  	                state       = new mixitup.State(),
  	                target      = null,
  	                i           = -1;

  	            self.callActions('beforeBuildState', arguments);

  	            // Map target elements into state arrays.
  	            // the real target objects should never be exposed

  	            for (i = 0; target = self.targets[i]; i++) {
  	                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
  	                    state.targets.push(target.dom.el);
  	                }
  	            }

  	            for (i = 0; target = operation.matching[i]; i++) {
  	                state.matching.push(target.dom.el);
  	            }

  	            for (i = 0; target = operation.show[i]; i++) {
  	                state.show.push(target.dom.el);
  	            }

  	            for (i = 0; target = operation.hide[i]; i++) {
  	                if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
  	                    state.hide.push(target.dom.el);
  	                }
  	            }

  	            state.id                        = self.id;
  	            state.container                 = self.dom.container;
  	            state.activeFilter              = operation.newFilter;
  	            state.activeSort                = operation.newSort;
  	            state.activeDataset             = operation.newDataset;
  	            state.activeContainerClassName  = operation.newContainerClassName;
  	            state.hasFailed                 = operation.hasFailed;
  	            state.totalTargets              = self.targets.length;
  	            state.totalShow                 = operation.show.length;
  	            state.totalHide                 = operation.hide.length;
  	            state.totalMatching             = operation.matching.length;
  	            state.triggerElement            = operation.triggerElement;

  	            return self.callFilters('stateBuildState', state, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {boolean}   shouldAnimate
  	         * @param   {Operation} operation
  	         * @return  {void}
  	         */

  	        goMix: function(shouldAnimate, operation) {
  	            var self        = this,
  	                deferred    = null;

  	            self.callActions('beforeGoMix', arguments);

  	            // If the animation duration is set to 0ms,
  	            // or no effects specified,
  	            // or the container is hidden
  	            // then abort animation

  	            if (
  	                !self.config.animation.duration || !self.config.animation.effects || !h.isVisible(self.dom.container)
  	            ) {
  	                shouldAnimate = false;
  	            }

  	            if (
  	                !operation.toShow.length &&
  	                !operation.toHide.length &&
  	                !operation.willSort &&
  	                !operation.willChangeLayout
  	            ) {
  	                // If nothing to show or hide, and not sorting or
  	                // changing layout

  	                shouldAnimate = false;
  	            }

  	            if (
  	                !operation.startState.show.length &&
  	                !operation.show.length
  	            ) {
  	                // If nothing currently shown, nothing to show

  	                shouldAnimate = false;
  	            }

  	            mixitup.events.fire('mixStart', self.dom.container, {
  	                state: operation.startState,
  	                futureState: operation.newState,
  	                instance: self
  	            }, self.dom.document);

  	            if (typeof self.config.callbacks.onMixStart === 'function') {
  	                self.config.callbacks.onMixStart.call(
  	                    self.dom.container,
  	                    operation.startState,
  	                    operation.newState,
  	                    self
  	                );
  	            }

  	            h.removeClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));

  	            if (!self.userDeferred) {
  	                // Queue empty, no pending operations

  	                deferred = self.userDeferred = h.defer(mixitup.libraries);
  	            } else {
  	                // Use existing deferred

  	                deferred = self.userDeferred;
  	            }

  	            self.isBusy = true;

  	            if (!shouldAnimate || !mixitup.features.has.transitions) {
  	                // Abort

  	                if (self.config.debug.fauxAsync) {
  	                    setTimeout(function() {
  	                        self.cleanUp(operation);
  	                    }, self.config.animation.duration);
  	                } else {
  	                    self.cleanUp(operation);
  	                }

  	                return self.callFilters('promiseGoMix', deferred.promise, arguments);
  	            }

  	            // If we should animate and the platform supports transitions, go for it

  	            if (window.pageYOffset !== operation.docState.scrollTop) {
  	                window.scrollTo(operation.docState.scrollLeft, operation.docState.scrollTop);
  	            }

  	            if (self.config.animation.applyPerspective) {
  	                self.dom.parent.style[mixitup.features.perspectiveProp] =
  	                    self.config.animation.perspectiveDistance;

  	                self.dom.parent.style[mixitup.features.perspectiveOriginProp] =
  	                    self.config.animation.perspectiveOrigin;
  	            }

  	            if (
  	                self.config.animation.animateResizeContainer &&
  	                operation.startHeight !== operation.newHeight &&
  	                operation.viewportDeltaY !== operation.startHeight - operation.newHeight
  	            ) {
  	                self.dom.parent.style.height = operation.startHeight + 'px';
  	            }

  	            if (
  	                self.config.animation.animateResizeContainer &&
  	                operation.startWidth !== operation.newWidth &&
  	                operation.viewportDeltaX !== operation.startWidth - operation.newWidth
  	            ) {
  	                self.dom.parent.style.width = operation.startWidth + 'px';
  	            }

  	            if (operation.startHeight === operation.newHeight) {
  	                self.dom.parent.style.height = operation.startHeight + 'px';
  	            }

  	            if (operation.startWidth === operation.newWidth) {
  	                self.dom.parent.style.width = operation.startWidth + 'px';
  	            }

  	            if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
  	                self.dom.parent.style.overflow = 'hidden';
  	            }

  	            requestAnimationFrame(function() {
  	                self.moveTargets(operation);
  	            });

  	            return self.callFilters('promiseGoMix', deferred.promise, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        getStartMixData: function(operation) {
  	            var self        = this,
  	                parentStyle = window.getComputedStyle(self.dom.parent),
  	                parentRect  = self.dom.parent.getBoundingClientRect(),
  	                target      = null,
  	                data        = {},
  	                i           = -1,
  	                boxSizing   = parentStyle[mixitup.features.boxSizingProp];

  	            self.incPadding = (boxSizing === 'border-box');

  	            self.callActions('beforeGetStartMixData', arguments);

  	            for (i = 0; target = operation.show[i]; i++) {
  	                data = target.getPosData();

  	                operation.showPosData[i] = {
  	                    startPosData: data
  	                };
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                data = target.getPosData();

  	                operation.toHidePosData[i] = {
  	                    startPosData: data
  	                };
  	            }

  	            operation.startX = parentRect.left;
  	            operation.startY = parentRect.top;

  	            operation.startHeight = self.incPadding ?
  	                parentRect.height :
  	                parentRect.height -
  	                    parseFloat(parentStyle.paddingTop) -
  	                    parseFloat(parentStyle.paddingBottom) -
  	                    parseFloat(parentStyle.borderTop) -
  	                    parseFloat(parentStyle.borderBottom);

  	            operation.startWidth = self.incPadding ?
  	                parentRect.width :
  	                parentRect.width -
  	                    parseFloat(parentStyle.paddingLeft) -
  	                    parseFloat(parentStyle.paddingRight) -
  	                    parseFloat(parentStyle.borderLeft) -
  	                    parseFloat(parentStyle.borderRight);

  	            self.callActions('afterGetStartMixData', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        setInter: function(operation) {
  	            var self    = this,
  	                target  = null,
  	                i       = -1;

  	            self.callActions('beforeSetInter', arguments);

  	            // Prevent scrollbar flicker on non-inertial scroll platforms by clamping height/width

  	            if (self.config.animation.clampHeight) {
  	                self.dom.parent.style.height    = operation.startHeight + 'px';
  	                self.dom.parent.style.overflow  = 'hidden';
  	            }

  	            if (self.config.animation.clampWidth) {
  	                self.dom.parent.style.width     = operation.startWidth + 'px';
  	                self.dom.parent.style.overflow  = 'hidden';
  	            }

  	            for (i = 0; target = operation.toShow[i]; i++) {
  	                target.show();
  	            }

  	            if (operation.willChangeLayout) {
  	                h.removeClass(self.dom.container, operation.startContainerClassName);
  	                h.addClass(self.dom.container, operation.newContainerClassName);
  	            }

  	            self.callActions('afterSetInter', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        getInterMixData: function(operation) {
  	            var self    = this,
  	                target  = null,
  	                i       = -1;

  	            self.callActions('beforeGetInterMixData', arguments);

  	            for (i = 0; target = operation.show[i]; i++) {
  	                operation.showPosData[i].interPosData = target.getPosData();
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                operation.toHidePosData[i].interPosData = target.getPosData();
  	            }

  	            self.callActions('afterGetInterMixData', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        setFinal: function(operation) {
  	            var self    = this,
  	                target  = null,
  	                i       = -1;

  	            self.callActions('beforeSetFinal', arguments);

  	            operation.willSort && self.printSort(false, operation);

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                target.hide();
  	            }

  	            self.callActions('afterSetFinal', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        getFinalMixData: function(operation) {
  	            var self        = this,
  	                parentStyle = null,
  	                parentRect  = null,
  	                target      = null,
  	                i           = -1;

  	            self.callActions('beforeGetFinalMixData', arguments);

  	            for (i = 0; target = operation.show[i]; i++) {
  	                operation.showPosData[i].finalPosData = target.getPosData();
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                operation.toHidePosData[i].finalPosData = target.getPosData();
  	            }

  	            // Remove clamping

  	            if (self.config.animation.clampHeight || self.config.animation.clampWidth) {
  	                self.dom.parent.style.height    =
  	                self.dom.parent.style.width     =
  	                self.dom.parent.style.overflow  = '';
  	            }

  	            if (!self.incPadding) {
  	                parentStyle = window.getComputedStyle(self.dom.parent);
  	            }

  	            parentRect  = self.dom.parent.getBoundingClientRect();

  	            operation.newX = parentRect.left;
  	            operation.newY = parentRect.top;

  	            operation.newHeight = self.incPadding ?
  	                parentRect.height :
  	                parentRect.height -
  	                    parseFloat(parentStyle.paddingTop) -
  	                    parseFloat(parentStyle.paddingBottom) -
  	                    parseFloat(parentStyle.borderTop) -
  	                    parseFloat(parentStyle.borderBottom);

  	            operation.newWidth = self.incPadding ?
  	                parentRect.width :
  	                parentRect.width -
  	                    parseFloat(parentStyle.paddingLeft) -
  	                    parseFloat(parentStyle.paddingRight) -
  	                    parseFloat(parentStyle.borderLeft) -
  	                    parseFloat(parentStyle.borderRight);

  	            operation.viewportDeltaX = operation.docState.viewportWidth - this.dom.document.documentElement.clientWidth;
  	            operation.viewportDeltaY = operation.docState.viewportHeight - this.dom.document.documentElement.clientHeight;

  	            if (operation.willSort) {
  	                self.printSort(true, operation);
  	            }

  	            for (i = 0; target = operation.toShow[i]; i++) {
  	                target.hide();
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                target.show();
  	            }

  	            if (operation.willChangeLayout) {
  	                h.removeClass(self.dom.container, operation.newContainerClassName);
  	                h.addClass(self.dom.container, self.config.layout.containerClassName);
  	            }

  	            self.callActions('afterGetFinalMixData', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since    3.0.0
  	         * @param    {Operation}     operation
  	         */

  	        getTweenData: function(operation) {
  	            var self            = this,
  	                target          = null,
  	                posData         = null,
  	                effectNames     = Object.getOwnPropertyNames(self.effectsIn),
  	                effectName      = '',
  	                effect          = null,
  	                widthChange     = -1,
  	                heightChange    = -1,
  	                i               = -1,
  	                j               = -1;

  	            self.callActions('beforeGetTweenData', arguments);

  	            for (i = 0; target = operation.show[i]; i++) {
  	                posData             = operation.showPosData[i];
  	                posData.posIn       = new mixitup.StyleData();
  	                posData.posOut      = new mixitup.StyleData();
  	                posData.tweenData   = new mixitup.StyleData();

  	                // Process x and y

  	                if (target.isShown) {
  	                    posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
  	                    posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
  	                } else {
  	                    posData.posIn.x = posData.posIn.y = 0;
  	                }

  	                posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
  	                posData.posOut.y = posData.finalPosData.y - posData.interPosData.y;

  	                // Process opacity

  	                posData.posIn.opacity       = target.isShown ? 1 : self.effectsIn.opacity;
  	                posData.posOut.opacity      = 1;
  	                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

  	                // Adjust x and y if not nudging

  	                if (!target.isShown && !self.config.animation.nudge) {
  	                    posData.posIn.x = posData.posOut.x;
  	                    posData.posIn.y = posData.posOut.y;
  	                }

  	                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
  	                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

  	                // Process width, height, and margins

  	                if (self.config.animation.animateResizeTargets) {
  	                    posData.posIn.width     = posData.startPosData.width;
  	                    posData.posIn.height    = posData.startPosData.height;

  	                    // "||" Prevents width/height change from including 0 width/height if hiding or showing

  	                    widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;

  	                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

  	                    heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;

  	                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;

  	                    posData.posOut.width    = posData.finalPosData.width;
  	                    posData.posOut.height   = posData.finalPosData.height;

  	                    widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;

  	                    posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;

  	                    heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;

  	                    posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;

  	                    posData.tweenData.width         = posData.posOut.width - posData.posIn.width;
  	                    posData.tweenData.height        = posData.posOut.height - posData.posIn.height;
  	                    posData.tweenData.marginRight   = posData.posOut.marginRight - posData.posIn.marginRight;
  	                    posData.tweenData.marginBottom  = posData.posOut.marginBottom - posData.posIn.marginBottom;
  	                }

  	                // Process transforms

  	                for (j = 0; effectName = effectNames[j]; j++) {
  	                    effect = self.effectsIn[effectName];

  	                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

  	                    posData.posIn[effectName].value     = effect.value;
  	                    posData.posOut[effectName].value    = 0;

  	                    posData.tweenData[effectName].value =
  	                        posData.posOut[effectName].value - posData.posIn[effectName].value;

  	                    posData.posIn[effectName].unit =
  	                        posData.posOut[effectName].unit =
  	                        posData.tweenData[effectName].unit =
  	                        effect.unit;
  	                }
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                posData             = operation.toHidePosData[i];
  	                posData.posIn       = new mixitup.StyleData();
  	                posData.posOut      = new mixitup.StyleData();
  	                posData.tweenData   = new mixitup.StyleData();

  	                // Process x and y

  	                posData.posIn.x     = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
  	                posData.posIn.y     = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
  	                posData.posOut.x    = self.config.animation.nudge ? 0 : posData.posIn.x;
  	                posData.posOut.y    = self.config.animation.nudge ? 0 : posData.posIn.y;
  	                posData.tweenData.x = posData.posOut.x - posData.posIn.x;
  	                posData.tweenData.y = posData.posOut.y - posData.posIn.y;

  	                // Process width, height, and margins

  	                if (self.config.animation.animateResizeTargets) {
  	                    posData.posIn.width         = posData.startPosData.width;
  	                    posData.posIn.height        = posData.startPosData.height;

  	                    widthChange = posData.startPosData.width - posData.interPosData.width;

  	                    posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;

  	                    heightChange = posData.startPosData.height - posData.interPosData.height;

  	                    posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
  	                }

  	                // Process opacity

  	                posData.posIn.opacity       = 1;
  	                posData.posOut.opacity      = self.effectsOut.opacity;
  	                posData.tweenData.opacity   = posData.posOut.opacity - posData.posIn.opacity;

  	                // Process transforms

  	                for (j = 0; effectName = effectNames[j]; j++) {
  	                    effect = self.effectsOut[effectName];

  	                    if (!(effect instanceof mixitup.TransformData) || !effect.value) continue;

  	                    posData.posIn[effectName].value     = 0;
  	                    posData.posOut[effectName].value    = effect.value;

  	                    posData.tweenData[effectName].value =
  	                        posData.posOut[effectName].value - posData.posIn[effectName].value;

  	                    posData.posIn[effectName].unit =
  	                        posData.posOut[effectName].unit =
  	                        posData.tweenData[effectName].unit =
  	                        effect.unit;
  	                }
  	            }

  	            self.callActions('afterGetTweenData', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        moveTargets: function(operation) {
  	            var self            = this,
  	                target          = null,
  	                moveData        = null,
  	                posData         = null,
  	                statusChange    = '',
  	                willTransition  = false,
  	                staggerIndex    = -1,
  	                i               = -1,
  	                checkProgress   = self.checkProgress.bind(self);

  	            self.callActions('beforeMoveTargets', arguments);

  	            // TODO: this is an extra loop in addition to the calcs
  	            // done in getOperation, could some of this be done there?

  	            for (i = 0; target = operation.show[i]; i++) {
  	                moveData    = new mixitup.IMoveData();
  	                posData     = operation.showPosData[i];

  	                statusChange = target.isShown ? 'none' : 'show';

  	                willTransition = self.willTransition(
  	                    statusChange,
  	                    operation.hasEffect,
  	                    posData.posIn,
  	                    posData.posOut
  	                );

  	                if (willTransition) {
  	                    // Prevent non-transitioning targets from incrementing the staggerIndex

  	                    staggerIndex++;
  	                }

  	                target.show();

  	                moveData.posIn          = posData.posIn;
  	                moveData.posOut         = posData.posOut;
  	                moveData.statusChange   = statusChange;
  	                moveData.staggerIndex   = staggerIndex;
  	                moveData.operation      = operation;
  	                moveData.callback       = willTransition ? checkProgress : null;

  	                target.move(moveData);
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                posData  = operation.toHidePosData[i];
  	                moveData = new mixitup.IMoveData();

  	                statusChange = 'hide';

  	                willTransition = self.willTransition(statusChange, posData.posIn, posData.posOut);

  	                moveData.posIn          = posData.posIn;
  	                moveData.posOut         = posData.posOut;
  	                moveData.statusChange   = statusChange;
  	                moveData.staggerIndex   = i;
  	                moveData.operation      = operation;
  	                moveData.callback       = willTransition ? checkProgress : null;

  	                target.move(moveData);
  	            }

  	            if (self.config.animation.animateResizeContainer) {
  	                self.dom.parent.style[mixitup.features.transitionProp] =
  	                    'height ' + self.config.animation.duration + 'ms ease, ' +
  	                    'width ' + self.config.animation.duration + 'ms ease ';

  	                requestAnimationFrame(function() {
  	                    if (
  	                        operation.startHeight !== operation.newHeight &&
  	                        operation.viewportDeltaY !== operation.startHeight - operation.newHeight
  	                    ) {
  	                        self.dom.parent.style.height = operation.newHeight + 'px';
  	                    }

  	                    if (
  	                        operation.startWidth !== operation.newWidth &&
  	                        operation.viewportDeltaX !== operation.startWidth - operation.newWidth
  	                    ) {
  	                        self.dom.parent.style.width = operation.newWidth + 'px';
  	                    }
  	                });
  	            }

  	            if (operation.willChangeLayout) {
  	                h.removeClass(self.dom.container, self.config.layout.ContainerClassName);
  	                h.addClass(self.dom.container, operation.newContainerClassName);
  	            }

  	            self.callActions('afterMoveTargets', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @return  {boolean}
  	         */

  	        hasEffect: function() {
  	            var self        = this,
  	                EFFECTABLES = [
  	                    'scale',
  	                    'translateX', 'translateY', 'translateZ',
  	                    'rotateX', 'rotateY', 'rotateZ'
  	                ],
  	                effectName  = '',
  	                effect      = null,
  	                result      = false,
  	                value       = -1,
  	                i           = -1;

  	            if (self.effectsIn.opacity !== 1) {
  	                return self.callFilters('resultHasEffect', true, arguments);
  	            }

  	            for (i = 0; effectName = EFFECTABLES[i]; i++) {
  	                effect  = self.effectsIn[effectName];
  	                value   = (typeof effect && effect.value !== 'undefined') ?
  	                    effect.value : effect;

  	                if (value !== 0) {
  	                    result = true;

  	                    break;
  	                }
  	            }

  	            return self.callFilters('resultHasEffect', result, arguments);
  	        },

  	        /**
  	         * Determines if a target element will transition in
  	         * some fasion and therefore requires binding of
  	         * transitionEnd
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string}        statusChange
  	         * @param   {boolean}       hasEffect
  	         * @param   {StyleData}     posIn
  	         * @param   {StyleData}     posOut
  	         * @return  {boolean}
  	         */

  	        willTransition: function(statusChange, hasEffect, posIn, posOut) {
  	            var self    = this,
  	                result  = false;

  	            if (!h.isVisible(self.dom.container)) {
  	                // If the container is not visible, the transitionEnd
  	                // event will not occur and MixItUp will hang

  	                result = false;
  	            } else if (
  	                (statusChange !== 'none' && hasEffect) ||
  	                posIn.x !== posOut.x ||
  	                posIn.y !== posOut.y
  	            ) {
  	                // If opacity and/or translate will change

  	                result = true;
  	            } else if (self.config.animation.animateResizeTargets) {
  	                // Check if width, height or margins will change

  	                result = (
  	                    posIn.width !== posOut.width ||
  	                    posIn.height !== posOut.height ||
  	                    posIn.marginRight !== posOut.marginRight ||
  	                    posIn.marginTop !== posOut.marginTop
  	                );
  	            } else {
  	                result = false;
  	            }

  	            return self.callFilters('resultWillTransition', result, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        checkProgress: function(operation) {
  	            var self = this;

  	            self.targetsDone++;

  	            if (self.targetsBound === self.targetsDone) {
  	                self.cleanUp(operation);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Operation}     operation
  	         * @return  {void}
  	         */

  	        cleanUp: function(operation) {
  	            var self                = this,
  	                target              = null,
  	                whitespaceBefore    = null,
  	                whitespaceAfter     = null,
  	                nextInQueue         = null,
  	                i                   = -1;

  	            self.callActions('beforeCleanUp', arguments);

  	            self.targetsMoved          =
  	                self.targetsImmovable  =
  	                self.targetsBound      =
  	                self.targetsDone       = 0;

  	            for (i = 0; target = operation.show[i]; i++) {
  	                target.cleanUp();

  	                target.show();
  	            }

  	            for (i = 0; target = operation.toHide[i]; i++) {
  	                target.cleanUp();

  	                target.hide();
  	            }

  	            if (operation.willSort) {
  	                self.printSort(false, operation);
  	            }

  	            // Remove any styles applied to the parent container

  	            self.dom.parent.style[mixitup.features.transitionProp]             =
  	                self.dom.parent.style.height                                   =
  	                self.dom.parent.style.width                                    =
  	                self.dom.parent.style.overflow                                 =
  	                self.dom.parent.style[mixitup.features.perspectiveProp]        =
  	                self.dom.parent.style[mixitup.features.perspectiveOriginProp]  = '';

  	            if (operation.willChangeLayout) {
  	                h.removeClass(self.dom.container, operation.startContainerClassName);
  	                h.addClass(self.dom.container, operation.newContainerClassName);
  	            }

  	            if (operation.toRemove.length) {
  	                for (i = 0; target = self.targets[i]; i++) {
  	                    if (operation.toRemove.indexOf(target) > -1) {
  	                        if (
  	                            (whitespaceBefore = target.dom.el.previousSibling) && whitespaceBefore.nodeName === '#text' &&
  	                            (whitespaceAfter = target.dom.el.nextSibling) && whitespaceAfter.nodeName === '#text'
  	                        ) {
  	                            h.removeWhitespace(whitespaceBefore);
  	                        }

  	                        if (!operation.willSort) {
  	                            // NB: Sorting will remove targets as a bi-product of `printSort()`

  	                            self.dom.parent.removeChild(target.dom.el);
  	                        }

  	                        self.targets.splice(i, 1);

  	                        target.isInDom = false;

  	                        i--;
  	                    }
  	                }

  	                // Since targets have been removed, the original order must be updated

  	                self.origOrder = self.targets;
  	            }

  	            if (operation.willSort) {
  	                self.targets = operation.newOrder;
  	            }

  	            self.state = operation.newState;
  	            self.lastOperation = operation;

  	            self.dom.targets = self.state.targets;

  	            // mixEnd

  	            mixitup.events.fire('mixEnd', self.dom.container, {
  	                state: self.state,
  	                instance: self
  	            }, self.dom.document);

  	            if (typeof self.config.callbacks.onMixEnd === 'function') {
  	                self.config.callbacks.onMixEnd.call(self.dom.container, self.state, self);
  	            }

  	            if (operation.hasFailed) {
  	                // mixFail

  	                mixitup.events.fire('mixFail', self.dom.container, {
  	                    state: self.state,
  	                    instance: self
  	                }, self.dom.document);

  	                if (typeof self.config.callbacks.onMixFail === 'function') {
  	                    self.config.callbacks.onMixFail.call(self.dom.container, self.state, self);
  	                }

  	                h.addClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));
  	            }

  	            // User-defined callback function

  	            if (typeof self.userCallback === 'function') {
  	                self.userCallback.call(self.dom.container, self.state, self);
  	            }

  	            if (typeof self.userDeferred.resolve === 'function') {
  	                self.userDeferred.resolve(self.state);
  	            }

  	            self.userCallback  = null;
  	            self.userDeferred  = null;
  	            self.lastClicked   = null;
  	            self.isToggling    = false;
  	            self.isBusy        = false;

  	            if (self.queue.length) {
  	                self.callActions('beforeReadQueueCleanUp', arguments);

  	                nextInQueue = self.queue.shift();

  	                // Update non-public API properties stored in queue

  	                self.userDeferred  = nextInQueue.deferred;
  	                self.isToggling    = nextInQueue.isToggling;
  	                self.lastClicked   = nextInQueue.triggerElement;

  	                if (nextInQueue.instruction.command instanceof mixitup.CommandMultimix) {
  	                    self.multimix.apply(self, nextInQueue.args);
  	                } else {
  	                    self.dataset.apply(self, nextInQueue.args);
  	                }
  	            }

  	            self.callActions('afterCleanUp', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseMultimixArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandMultimix();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                if (typeof arg === 'object') {
  	                    h.extend(instruction.command, arg);
  	                } else if (typeof arg === 'boolean') {
  	                    instruction.animate = arg;
  	                } else if (typeof arg === 'function') {
  	                    instruction.callback = arg;
  	                }
  	            }

  	            // Coerce arbitrary command arguments into typed command objects

  	            if (instruction.command.insert && !(instruction.command.insert instanceof mixitup.CommandInsert)) {
  	                instruction.command.insert = self.parseInsertArgs([instruction.command.insert]).command;
  	            }

  	            if (instruction.command.remove && !(instruction.command.remove instanceof mixitup.CommandRemove)) {
  	                instruction.command.remove = self.parseRemoveArgs([instruction.command.remove]).command;
  	            }

  	            if (instruction.command.filter && !(instruction.command.filter instanceof mixitup.CommandFilter)) {
  	                instruction.command.filter = self.parseFilterArgs([instruction.command.filter]).command;
  	            }

  	            if (instruction.command.sort && !(instruction.command.sort instanceof mixitup.CommandSort)) {
  	                instruction.command.sort = self.parseSortArgs([instruction.command.sort]).command;
  	            }

  	            if (instruction.command.changeLayout && !(instruction.command.changeLayout instanceof mixitup.CommandChangeLayout)) {
  	                instruction.command.changeLayout = self.parseChangeLayoutArgs([instruction.command.changeLayout]).command;
  	            }

  	            instruction = self.callFilters('instructionParseMultimixArgs', instruction, arguments);

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseFilterArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandFilter();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (typeof arg === 'string') {
  	                    // Selector

  	                    instruction.command.selector = arg;
  	                } else if (arg === null) {
  	                    instruction.command.collection = [];
  	                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
  	                    // Single element

  	                    instruction.command.collection = [arg];
  	                } else if (typeof arg === 'object' && typeof arg.length !== 'undefined') {
  	                    // Multiple elements in array, NodeList or jQuery collection

  	                    instruction.command.collection = h.arrayFromList(arg);
  	                } else if (typeof arg === 'object') {
  	                    // Filter command

  	                    h.extend(instruction.command, arg);
  	                } else if (typeof arg === 'boolean') {
  	                    instruction.animate = arg;
  	                } else if (typeof arg === 'function') {
  	                    instruction.callback = arg;
  	                }
  	            }

  	            if (instruction.command.selector && instruction.command.collection) {
  	                throw new Error(mixitup.messages.errorFilterInvalidArguments());
  	            }

  	            instruction = self.callFilters('instructionParseFilterArgs', instruction, arguments);

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        parseSortArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                sortString  = '',
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandSort();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                switch (typeof arg) {
  	                    case 'string':
  	                        // Sort string

  	                        sortString = arg;

  	                        break;
  	                    case 'object':
  	                        // Array of element references

  	                        if (arg.length) {
  	                            instruction.command.collection = h.arrayFromList(arg);
  	                        }

  	                        break;
  	                    case 'boolean':
  	                        instruction.animate = arg;

  	                        break;
  	                    case 'function':
  	                        instruction.callback = arg;

  	                        break;
  	                }
  	            }

  	            if (sortString) {
  	                instruction.command = self.parseSortString(sortString, instruction.command);
  	            }

  	            instruction = self.callFilters('instructionParseSortArgs', instruction, arguments);

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseInsertArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandInsert();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                if (typeof arg === 'number') {
  	                    // Insert index

  	                    instruction.command.index = arg;
  	                } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
  	                    // 'before'/'after'

  	                    instruction.command.position = arg;
  	                } else if (typeof arg === 'string') {
  	                    // Markup

  	                    instruction.command.collection =
  	                        h.arrayFromList(h.createElement(arg).childNodes);
  	                } else if (typeof arg === 'object' && h.isElement(arg, self.dom.document)) {
  	                    // Single element

  	                    !instruction.command.collection.length ?
  	                        (instruction.command.collection = [arg]) :
  	                        (instruction.command.sibling = arg);
  	                } else if (typeof arg === 'object' && arg.length) {
  	                    // Multiple elements in array or jQuery collection

  	                    !instruction.command.collection.length ?
  	                        (instruction.command.collection = arg) :
  	                        instruction.command.sibling = arg[0];
  	                } else if (typeof arg === 'object' && arg.childNodes && arg.childNodes.length) {
  	                    // Document fragment

  	                    !instruction.command.collection.length ?
  	                        instruction.command.collection = h.arrayFromList(arg.childNodes) :
  	                        instruction.command.sibling = arg.childNodes[0];
  	                } else if (typeof arg === 'object') {
  	                    // Insert command

  	                    h.extend(instruction.command, arg);
  	                } else if (typeof arg === 'boolean') {
  	                    instruction.animate = arg;
  	                } else if (typeof arg === 'function') {
  	                    instruction.callback = arg;
  	                }
  	            }

  	            if (instruction.command.index && instruction.command.sibling) {
  	                throw new Error(mixitup.messages.errorInsertInvalidArguments());
  	            }

  	            if (!instruction.command.collection.length && self.config.debug.showWarnings) {
  	                console.warn(mixitup.messages.warningInsertNoElements());
  	            }

  	            instruction = self.callFilters('instructionParseInsertArgs', instruction, arguments);

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseRemoveArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                target      = null,
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandRemove();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                switch (typeof arg) {
  	                    case 'number':
  	                        if (self.targets[arg]) {
  	                            instruction.command.targets[0] = self.targets[arg];
  	                        }

  	                        break;
  	                    case 'string':
  	                        instruction.command.collection = h.arrayFromList(self.dom.parent.querySelectorAll(arg));

  	                        break;
  	                    case 'object':
  	                        if (arg && arg.length) {
  	                            instruction.command.collection = arg;
  	                        } else if (h.isElement(arg, self.dom.document)) {
  	                            instruction.command.collection = [arg];
  	                        } else {
  	                            // Remove command

  	                            h.extend(instruction.command, arg);
  	                        }

  	                        break;
  	                    case 'boolean':
  	                        instruction.animate = arg;

  	                        break;
  	                    case 'function':
  	                        instruction.callback = arg;

  	                        break;
  	                }
  	            }

  	            if (instruction.command.collection.length) {
  	                for (i = 0; target = self.targets[i]; i++) {
  	                    if (instruction.command.collection.indexOf(target.dom.el) > -1) {
  	                        instruction.command.targets.push(target);
  	                    }
  	                }
  	            }

  	            if (!instruction.command.targets.length && self.config.debug.showWarnings) {
  	                console.warn(mixitup.messages.warningRemoveNoElements());
  	            }

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseDatasetArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandDataset();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                switch (typeof arg) {
  	                    case 'object':
  	                        if (Array.isArray(arg) || typeof arg.length === 'number') {
  	                            instruction.command.dataset = arg;
  	                        } else {
  	                            // Change layout command

  	                            h.extend(instruction.command, arg);
  	                        }

  	                        break;
  	                    case 'boolean':
  	                        instruction.animate = arg;

  	                        break;
  	                    case 'function':
  	                        instruction.callback = arg;

  	                        break;
  	                }
  	            }

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Array<*>}  args
  	         * @return  {mixitup.UserInstruction}
  	         */

  	        parseChangeLayoutArgs: function(args) {
  	            var self        = this,
  	                instruction = new mixitup.UserInstruction(),
  	                arg         = null,
  	                i           = -1;

  	            instruction.animate = self.config.animation.enable;
  	            instruction.command = new mixitup.CommandChangeLayout();

  	            for (i = 0; i < args.length; i++) {
  	                arg = args[i];

  	                if (arg === null) continue;

  	                switch (typeof arg) {
  	                    case 'string':
  	                        instruction.command.containerClassName = arg;

  	                        break;
  	                    case 'object':
  	                        // Change layout command

  	                        h.extend(instruction.command, arg);

  	                        break;
  	                    case 'boolean':
  	                        instruction.animate = arg;

  	                        break;
  	                    case 'function':
  	                        instruction.callback = arg;

  	                        break;
  	                }
  	            }

  	            h.freeze(instruction);

  	            return instruction;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {mixitup.QueueItem}         queueItem
  	         * @return      {Promise.<mixitup.State>}
  	         */

  	        queueMix: function(queueItem) {
  	            var self            = this,
  	                deferred        = null,
  	                toggleSelector  = '';

  	            self.callActions('beforeQueueMix', arguments);

  	            deferred = h.defer(mixitup.libraries);

  	            if (self.config.animation.queue && self.queue.length < self.config.animation.queueLimit) {
  	                queueItem.deferred = deferred;

  	                self.queue.push(queueItem);

  	                // Keep controls in sync with user interactions. Mixer will catch up as it drains the queue.

  	                if (self.config.controls.enable) {
  	                    if (self.isToggling) {
  	                        self.buildToggleArray(queueItem.instruction.command);

  	                        toggleSelector = self.getToggleSelector();

  	                        self.updateControls({
  	                            filter: {
  	                                selector: toggleSelector
  	                            }
  	                        });
  	                    } else {
  	                        self.updateControls(queueItem.instruction.command);
  	                    }
  	                }
  	            } else {
  	                if (self.config.debug.showWarnings) {
  	                    console.warn(mixitup.messages.warningMultimixInstanceQueueFull());
  	                }

  	                deferred.resolve(self.state);

  	                mixitup.events.fire('mixBusy', self.dom.container, {
  	                    state: self.state,
  	                    instance: self
  	                }, self.dom.document);

  	                if (typeof self.config.callbacks.onMixBusy === 'function') {
  	                    self.config.callbacks.onMixBusy.call(self.dom.container, self.state, self);
  	                }
  	            }

  	            return self.callFilters('promiseQueueMix', deferred.promise, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Array.<object>}    newDataset
  	         * @return  {Operation}
  	         */

  	        getDataOperation: function(newDataset) {
  	            var self                = this,
  	                operation           = new mixitup.Operation(),
  	                startDataset        = [];

  	            operation = self.callFilters('operationUnmappedGetDataOperation', operation, arguments);

  	            if (self.dom.targets.length && !(startDataset = (self.state.activeDataset || [])).length) {
  	                throw new Error(mixitup.messages.errorDatasetNotSet());
  	            }

  	            operation.id            = h.randomHex();
  	            operation.startState    = self.state;
  	            operation.startDataset  = startDataset;
  	            operation.newDataset    = newDataset.slice();

  	            self.diffDatasets(operation);

  	            operation.startOrder = self.targets;
  	            operation.newOrder = operation.show;

  	            if (self.config.animation.enable) {
  	                self.getStartMixData(operation);
  	                self.setInter(operation);

  	                operation.docState = h.getDocumentState(self.dom.document);

  	                self.getInterMixData(operation);
  	                self.setFinal(operation);
  	                self.getFinalMixData(operation);

  	                self.parseEffects();

  	                operation.hasEffect = self.hasEffect();

  	                self.getTweenData(operation);
  	            }

  	            self.targets = operation.show.slice();

  	            operation.newState = self.buildState(operation);

  	            // NB: Targets to be removed must be included in `self.targets` for removal during clean up,
  	            // but are added after state is built so that state is accurate

  	            Array.prototype.push.apply(self.targets, operation.toRemove);

  	            operation = self.callFilters('operationMappedGetDataOperation', operation, arguments);

  	            return operation;
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.Operation} operation
  	         * @return  {void}
  	         */

  	        diffDatasets: function(operation) {
  	            var self                = this,
  	                persistantStartIds  = [],
  	                persistantNewIds    = [],
  	                insertedTargets     = [],
  	                data                = null,
  	                target              = null,
  	                el                  = null,
  	                frag                = null,
  	                nextEl              = null,
  	                uids                = {},
  	                id                  = '',
  	                i                   = -1;

  	            self.callActions('beforeDiffDatasets', arguments);

  	            for (i = 0; data = operation.newDataset[i]; i++) {
  	                if (typeof (id = data[self.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
  	                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
  	                        uidKey: self.config.data.uidKey
  	                    }));
  	                }

  	                if (!uids[id]) {
  	                    uids[id] = true;
  	                } else {
  	                    throw new Error(mixitup.messages.errorDatasetDuplicateUid({
  	                        uid: id
  	                    }));
  	                }

  	                if ((target = self.cache[id]) instanceof mixitup.Target) {
  	                    // Already in cache

  	                    if (self.config.data.dirtyCheck && !h.deepEquals(data, target.data)) {
  	                        // change detected

  	                        el = target.render(data);

  	                        target.data = data;

  	                        if (el !== target.dom.el) {
  	                            // Update target element reference

  	                            if (target.isInDom) {
  	                                target.unbindEvents();

  	                                self.dom.parent.replaceChild(el, target.dom.el);
  	                            }

  	                            if (!target.isShown) {
  	                                el.style.display = 'none';
  	                            }

  	                            target.dom.el = el;

  	                            if (target.isInDom) {
  	                                target.bindEvents();
  	                            }
  	                        }
  	                    }

  	                    el = target.dom.el;
  	                } else {
  	                    // New target

  	                    target = new mixitup.Target();

  	                    target.init(null, self, data);

  	                    target.hide();
  	                }

  	                if (!target.isInDom) {
  	                    // Adding to DOM

  	                    if (!frag) {
  	                        // Open frag

  	                        frag = self.dom.document.createDocumentFragment();
  	                    }

  	                    if (frag.lastElementChild) {
  	                        frag.appendChild(self.dom.document.createTextNode(' '));
  	                    }

  	                    frag.appendChild(target.dom.el);

  	                    target.isInDom = true;

  	                    target.unbindEvents();
  	                    target.bindEvents();
  	                    target.hide();

  	                    operation.toShow.push(target);

  	                    insertedTargets.push(target);
  	                } else {
  	                    // Already in DOM

  	                    nextEl = target.dom.el.nextElementSibling;

  	                    persistantNewIds.push(id);

  	                    if (frag) {
  	                        // Close and insert previously opened frag

  	                        if (frag.lastElementChild) {
  	                            frag.appendChild(self.dom.document.createTextNode(' '));
  	                        }

  	                        self.insertDatasetFrag(frag, target.dom.el, insertedTargets);

  	                        frag = null;
  	                    }
  	                }

  	                operation.show.push(target);
  	            }

  	            if (frag) {
  	                // Unclosed frag remaining

  	                nextEl = nextEl || self.config.layout.siblingAfter;

  	                if (nextEl) {
  	                    frag.appendChild(self.dom.document.createTextNode(' '));
  	                }

  	                self.insertDatasetFrag(frag, nextEl, insertedTargets);
  	            }

  	            for (i = 0; data = operation.startDataset[i]; i++) {
  	                id = data[self.config.data.uidKey];

  	                target = self.cache[id];

  	                if (operation.show.indexOf(target) < 0) {
  	                    // Previously shown but now absent

  	                    operation.hide.push(target);
  	                    operation.toHide.push(target);
  	                    operation.toRemove.push(target);
  	                } else {
  	                    persistantStartIds.push(id);
  	                }
  	            }

  	            if (!h.isEqualArray(persistantStartIds, persistantNewIds)) {
  	                operation.willSort = true;
  	            }

  	            self.callActions('afterDiffDatasets', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.1.5
  	         * @param   {DocumentFragment}          frag
  	         * @param   {(HTMLElement|null)}        nextEl
  	         * @param   {Array.<mixitup.Target>}    targets
  	         * @return  {void}
  	         */

  	        insertDatasetFrag: function(frag, nextEl, targets) {
  	            var self = this;
  	            var insertAt = nextEl ? h.arrayFromList(self.dom.parent.children).indexOf(nextEl) : self.targets.length;

  	            self.dom.parent.insertBefore(frag, nextEl);

  	            while (targets.length) {
  	                self.targets.splice(insertAt, 0, targets.shift());

  	                insertAt++;
  	            }
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.CommandSort} sortCommandA
  	         * @param   {mixitup.CommandSort} sortCommandB
  	         * @return  {boolean}
  	         */

  	        willSort: function(sortCommandA, sortCommandB) {
  	            var self    = this,
  	                result  = false;

  	            if (
  	                self.config.behavior.liveSort ||
  	                sortCommandA.order       === 'random' ||
  	                sortCommandA.attribute   !== sortCommandB.attribute ||
  	                sortCommandA.order       !== sortCommandB.order ||
  	                sortCommandA.collection  !== sortCommandB.collection ||
  	                (sortCommandA.next === null && sortCommandB.next) ||
  	                (sortCommandA.next && sortCommandB.next === null)
  	            ) {
  	                result = true;
  	            } else if (sortCommandA.next && sortCommandB.next) {
  	                result = self.willSort(sortCommandA.next, sortCommandB.next);
  	            } else {
  	                result = false;
  	            }

  	            return self.callFilters('resultWillSort', result, arguments);
  	        },

  	        /**
  	         * A shorthand method for `.filter('all')`. Shows all targets in the container.
  	         *
  	         * @example
  	         *
  	         * .show()
  	         *
  	         * @example <caption>Example: Showing all targets</caption>
  	         *
  	         * mixer.show()
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === state.totalTargets); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @return      {Promise.<mixitup.State>}
  	         */

  	        show: function() {
  	            var self = this;

  	            return self.filter('all');
  	        },

  	        /**
  	         * A shorthand method for `.filter('none')`. Hides all targets in the container.
  	         *
  	         * @example
  	         *
  	         * .hide()
  	         *
  	         * @example <caption>Example: Hiding all targets</caption>
  	         *
  	         * mixer.hide()
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 0); // true
  	         *         console.log(state.totalHide === state.totalTargets); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @return      {Promise.<mixitup.State>}
  	         */

  	        hide: function() {
  	            var self = this;

  	            return self.filter('none');
  	        },

  	        /**
  	         * Returns a boolean indicating whether or not a MixItUp operation is
  	         * currently in progress.
  	         *
  	         * @example
  	         *
  	         * .isMixing()
  	         *
  	         * @example <caption>Example: Checking the status of a mixer</caption>
  	         *
  	         * mixer.sort('random', function() {
  	         *     console.log(mixer.isMixing()) // false
  	         * });
  	         *
  	         * console.log(mixer.isMixing()) // true
  	         *
  	         * @public
  	         * @instance
  	         * @since   2.0.0
  	         * @return  {boolean}
  	         */

  	        isMixing: function() {
  	            var self = this;

  	            return self.isBusy;
  	        },

  	        /**
  	         * Filters all targets in the container by a provided selector string, or the values `'all'`
  	         * or `'none'`. Only targets matching the selector will be shown.
  	         *
  	         * @example
  	         *
  	         * .filter(selector [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Filtering targets by a class selector</caption>
  	         *
  	         * mixer.filter('.category-a')
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a').length); // true
  	         *     });
  	         *
  	         * @example <caption>Example 2: Filtering targets by an attribute selector</caption>
  	         *
  	         * mixer.filter('[data-category~="a"]')
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === containerEl.querySelectorAll('[data-category~="a"]').length); // true
  	         *     });
  	         *
  	         * @example <caption>Example 3: Filtering targets by a compound selector</caption>
  	         *
  	         * // Show only those targets with the classes 'category-a' AND 'category-b'
  	         *
  	         * mixer.filter('.category-a.category-c')
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a.category-c').length); // true
  	         *     });
  	         *
  	         * @example <caption>Example 4: Filtering via an element collection</caption>
  	         *
  	         * var collection = Array.from(container.querySelectorAll('.mix'));
  	         *
  	         * console.log(collection.length); // 34
  	         *
  	         * // Filter the collection manually using Array.prototype.filter
  	         *
  	         * var filtered = collection.filter(function(target) {
  	         *    return parseInt(target.getAttribute('data-price')) > 10;
  	         * });
  	         *
  	         * console.log(filtered.length); // 22
  	         *
  	         * // Pass the filtered collection to MixItUp
  	         *
  	         * mixer.filter(filtered)
  	         *    .then(function(state) {
  	         *        console.log(state.activeFilter.collection.length === 22); // true
  	         *    });
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {(string|HTMLElement|Array.<HTMLElement>)} selector
  	         *      Any valid CSS selector (i.e. `'.category-a'`), or the values `'all'` or `'none'`. The filter method also accepts a reference to single target element or a collection of target elements to show.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        filter: function() {
  	            var self        = this,
  	                instruction = self.parseFilterArgs(arguments);

  	            return self.multimix({
  	                filter: instruction.command
  	            }, instruction.animate, instruction.callback);
  	        },

  	        /**
  	         * Adds an additional selector to the currently active filter selector, concatenating
  	         * as per the logic defined in `controls.toggleLogic`.
  	         *
  	         * @example
  	         *
  	         * .toggleOn(selector [, animate] [, callback])
  	         *
  	         * @example <caption>Example: Toggling on a filter selector</caption>
  	         *
  	         * console.log(mixer.getState().activeFilter.selector); // '.category-a'
  	         *
  	         * mixer.toggleOn('.category-b')
  	         *     .then(function(state) {
  	         *         console.log(state.activeFilter.selector); // '.category-a, .category-b'
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {string}    selector
  	         *      Any valid CSS selector (i.e. `'.category-a'`)
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        toggleOn: function() {
  	            var self            = this,
  	                instruction     = self.parseFilterArgs(arguments),
  	                selector        = instruction.command.selector,
  	                toggleSelector  = '';

  	            self.isToggling = true;

  	            if (self.toggleArray.indexOf(selector) < 0) {
  	                self.toggleArray.push(selector);
  	            }

  	            toggleSelector = self.getToggleSelector();

  	            return self.multimix({
  	                filter: toggleSelector
  	            }, instruction.animate, instruction.callback);
  	        },

  	        /**
  	         * Removes a selector from the active filter selector.
  	         *
  	         * @example
  	         *
  	         * .toggleOff(selector [, animate] [, callback])
  	         *
  	         * @example <caption>Example: Toggling off a filter selector</caption>
  	         *
  	         * console.log(mixer.getState().activeFilter.selector); // '.category-a, .category-b'
  	         *
  	         * mixer.toggleOff('.category-b')
  	         *     .then(function(state) {
  	         *         console.log(state.activeFilter.selector); // '.category-a'
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {string}    selector
  	         *      Any valid CSS selector (i.e. `'.category-a'`)
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        toggleOff: function() {
  	            var self            = this,
  	                instruction     = self.parseFilterArgs(arguments),
  	                selector        = instruction.command.selector,
  	                selectorIndex   = self.toggleArray.indexOf(selector),
  	                toggleSelector  = '';

  	            self.isToggling = true;

  	            if (selectorIndex > -1) {
  	                self.toggleArray.splice(selectorIndex, 1);
  	            }

  	            toggleSelector = self.getToggleSelector();

  	            return self.multimix({
  	                filter: toggleSelector
  	            }, instruction.animate, instruction.callback);
  	        },

  	        /**
  	         * Sorts all targets in the container according to a provided sort string.
  	         *
  	         * @example
  	         *
  	         * .sort(sortString [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Sorting by the default DOM order</caption>
  	         *
  	         * // Reverse the default order of the targets
  	         *
  	         * mixer.sort('default:desc')
  	         *     .then(function(state) {
  	         *         console.log(state.activeSort.attribute === 'default'); // true
  	         *         console.log(state.activeSort.order === 'desc'); // true
  	         *     });
  	         *
  	         * @example <caption>Example 2: Sorting by a custom data-attribute</caption>
  	         *
  	         * // Sort the targets by the value of a `data-published-date` attribute
  	         *
  	         * mixer.sort('published-date:asc')
  	         *     .then(function(state) {
  	         *         console.log(state.activeSort.attribute === 'published-date'); // true
  	         *         console.log(state.activeSort.order === 'asc'); // true
  	         *     });
  	         *
  	         * @example <caption>Example 3: Sorting by multiple attributes</caption>
  	         *
  	         * // Sort the targets by the value of a `data-published-date` attribute, then by `data-title`
  	         *
  	         * mixer.sort('published-date:desc data-title:asc')
  	         *     .then(function(state) {
  	         *         console.log(state.activeSort.attribute === 'published-date'); // true
  	         *         console.log(state.activeSort.order === 'desc'); // true
  	         *
  	         *         console.log(state.activeSort.next.attribute === 'title'); // true
  	         *         console.log(state.activeSort.next.order === 'asc'); // true
  	         *     });
  	         *
  	         * @example <caption>Example 4: Sorting by random</caption>
  	         *
  	         * mixer.sort('random')
  	         *     .then(function(state) {
  	         *         console.log(state.activeSort.order === 'random') // true
  	         *     });
  	         *
  	         * @example <caption>Example 5: Sorting via an element collection</caption>
  	         *
  	         * var collection = Array.from(container.querySelectorAll('.mix'));
  	         *
  	         * // Swap the position of two elements in the collection:
  	         *
  	         * var temp = collection[1];
  	         *
  	         * collection[1] = collection[0];
  	         * collection[0] = temp;
  	         *
  	         * // Pass the sorted collection to MixItUp
  	         *
  	         * mixer.sort(collection)
  	         *     .then(function(state) {
  	         *         console.log(state.targets[0] === collection[0]); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {(string|Array.<HTMLElement>)}    sortString
  	         *      A valid sort string (e.g. `'default'`, `'published-date:asc'`, or `'random'`). The sort method also accepts an array of all target elements in a user-defined order.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        sort: function() {
  	            var self        = this,
  	                instruction = self.parseSortArgs(arguments);

  	            return self.multimix({
  	                sort: instruction.command
  	            }, instruction.animate, instruction.callback);
  	        },

  	        /**
  	         * Changes the layout of the container by adding, removing or updating a
  	         * layout-specific class name. If `animation.animateResizetargets` is
  	         * enabled, MixItUp will attempt to gracefully animate the width, height,
  	         * and position of targets between layout states.
  	         *
  	         * @example
  	         *
  	         * .changeLayout(containerClassName [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Adding a new class name to the container</caption>
  	         *
  	         * mixer.changeLayout('container-list')
  	         *      .then(function(state) {
  	         *          console.log(state.activeContainerClass === 'container-list'); // true
  	         *      });
  	         *
  	         * @example <caption>Example 2: Removing a previously added class name from the container</caption>
  	         *
  	         * mixer.changeLayout('')
  	         *      .then(function(state) {
  	         *          console.log(state.activeContainerClass === ''); // true
  	         *      });
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {string}    containerClassName
  	         *      A layout-specific class name to add to the container.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        changeLayout: function() {
  	            var self        = this,
  	                instruction = self.parseChangeLayoutArgs(arguments);

  	            return self.multimix({
  	                changeLayout: instruction.command
  	            }, instruction.animate, instruction.callback);
  	        },

  	        /**
  	         * Updates the contents and order of the container to reflect the provided dataset,
  	         * if the dataset API is in use.
  	         *
  	         * The dataset API is designed for use in API-driven JavaScript applications, and
  	         * can be used instead of DOM-based methods such as `.filter()`, `.sort()`,
  	         * `.insert()`, etc. When used, insertion, removal, sorting and pagination can be
  	         * achieved purely via changes to your data model, without the uglyness of having
  	         * to interact with or query the DOM directly.
  	         *
  	         * @example
  	         *
  	         * .dataset(dataset [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Rendering a dataset</caption>
  	         *
  	         * var myDataset = [
  	         *     {id: 1, ...},
  	         *     {id: 2, ...},
  	         *     {id: 3, ...}
  	         * ];
  	         *
  	         * mixer.dataset(myDataset)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 3); // true
  	         *     });
  	         *
  	         * @example <caption>Example 2: Sorting a dataset</caption>
  	         *
  	         * // Create a new dataset in reverse order
  	         *
  	         * var newDataset = myDataset.slice().reverse();
  	         *
  	         * mixer.dataset(newDataset)
  	         *     .then(function(state) {
  	         *         console.log(state.activeDataset[0] === myDataset[2]); // true
  	         *     });
  	         *
  	         * @example <caption>Example 3: Removing an item from the dataset</caption>
  	         *
  	         * console.log(myDataset.length); // 3
  	         *
  	         * // Create a new dataset with the last item removed.
  	         *
  	         * var newDataset = myDataset.slice().pop();
  	         *
  	         * mixer.dataset(newDataset)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 2); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {Array.<object>}    dataset
  	         *      An array of objects, each one representing the underlying data model of a target to be rendered.
  	         * @param       {boolean}           [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}          [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        dataset: function() {
  	            var self        = this,
  	                instruction = self.parseDatasetArgs(arguments),
  	                operation   = null,
  	                queueItem   = null,
  	                animate     = false;

  	            self.callActions('beforeDataset', arguments);

  	            if (!self.isBusy) {
  	                if (instruction.callback) self.userCallback = instruction.callback;

  	                animate = (instruction.animate ^ self.config.animation.enable) ? instruction.animate : self.config.animation.enable;

  	                operation = self.getDataOperation(instruction.command.dataset);

  	                return self.goMix(animate, operation);
  	            } else {
  	                queueItem = new mixitup.QueueItem();

  	                queueItem.args          = arguments;
  	                queueItem.instruction   = instruction;

  	                return self.queueMix(queueItem);
  	            }
  	        },

  	        /**
  	         * Performs simultaneous `filter`, `sort`, `insert`, `remove` and `changeLayout`
  	         * operations as requested.
  	         *
  	         * @example
  	         *
  	         * .multimix(multimixCommand [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Performing simultaneous filtering and sorting</caption>
  	         *
  	         * mixer.multimix({
  	         *     filter: '.category-b',
  	         *     sort: 'published-date:desc'
  	         * })
  	         *     .then(function(state) {
  	         *         console.log(state.activeFilter.selector === '.category-b'); // true
  	         *         console.log(state.activeSort.attribute === 'published-date'); // true
  	         *     });
  	         *
  	         * @example <caption>Example 2: Performing simultaneous sorting, insertion, and removal</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 6
  	         *
  	         * // NB: When inserting via `multimix()`, an object should be provided as the value
  	         * // for the `insert` portion of the command, allowing for a collection of elements
  	         * // and an insertion index to be specified.
  	         *
  	         * mixer.multimix({
  	         *     sort: 'published-date:desc', // Sort the container, including any new elements
  	         *     insert: {
  	         *         collection: [newElementReferenceA, newElementReferenceB], // Add 2 new elements at index 5
  	         *         index: 5
  	         *     },
  	         *     remove: existingElementReference // Remove 1 existing element
  	         * })
  	         *     .then(function(state) {
  	         *         console.log(state.activeSort.attribute === 'published-date'); // true
  	         *         console.log(state.totalShow === 7); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {object}    multimixCommand
  	         *      An object containing one or more things to do
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        multimix: function() {
  	            var self        = this,
  	                operation   = null,
  	                animate     = false,
  	                queueItem   = null,
  	                instruction = self.parseMultimixArgs(arguments);

  	            self.callActions('beforeMultimix', arguments);

  	            if (!self.isBusy) {
  	                operation = self.getOperation(instruction.command);

  	                if (self.config.controls.enable) {
  	                    // Update controls for API calls

  	                    if (instruction.command.filter && !self.isToggling) {
  	                        // As we are not toggling, reset the toggle array
  	                        // so new filter overrides existing toggles

  	                        self.toggleArray.length = 0;
  	                        self.buildToggleArray(operation.command);
  	                    }

  	                    if (self.queue.length < 1) {
  	                        self.updateControls(operation.command);
  	                    }
  	                }

  	                if (instruction.callback) self.userCallback = instruction.callback;

  	                // Always allow the instruction to override the instance setting

  	                animate = (instruction.animate ^ self.config.animation.enable) ?
  	                    instruction.animate :
  	                    self.config.animation.enable;

  	                self.callFilters('operationMultimix', operation, arguments);

  	                return self.goMix(animate, operation);
  	            } else {
  	                queueItem = new mixitup.QueueItem();

  	                queueItem.args           = arguments;
  	                queueItem.instruction    = instruction;
  	                queueItem.triggerElement = self.lastClicked;
  	                queueItem.isToggling     = self.isToggling;

  	                return self.queueMix(queueItem);
  	            }
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {object}            multimixCommand
  	         * @param   {boolean}           [isPreFetch]
  	         *      An optional boolean indicating that the operation is being pre-fetched for execution at a later time.
  	         * @return  {Operation|null}
  	         */

  	        getOperation: function(multimixCommand) {
  	            var self                = this,
  	                sortCommand         = multimixCommand.sort,
  	                filterCommand       = multimixCommand.filter,
  	                changeLayoutCommand = multimixCommand.changeLayout,
  	                removeCommand       = multimixCommand.remove,
  	                insertCommand       = multimixCommand.insert,
  	                operation           = new mixitup.Operation();

  	            operation = self.callFilters('operationUnmappedGetOperation', operation, arguments);

  	            operation.id                = h.randomHex();
  	            operation.command           = multimixCommand;
  	            operation.startState        = self.state;
  	            operation.triggerElement    = self.lastClicked;

  	            if (self.isBusy) {
  	                if (self.config.debug.showWarnings) {
  	                    console.warn(mixitup.messages.warningGetOperationInstanceBusy());
  	                }

  	                return null;
  	            }

  	            if (insertCommand) {
  	                self.insertTargets(insertCommand, operation);
  	            }

  	            if (removeCommand) {
  	                operation.toRemove = removeCommand.targets;
  	            }

  	            operation.startSort = operation.newSort = operation.startState.activeSort;
  	            operation.startOrder = operation.newOrder = self.targets;

  	            if (sortCommand) {
  	                operation.startSort = operation.startState.activeSort;
  	                operation.newSort   = sortCommand;

  	                operation.willSort = self.willSort(sortCommand, operation.startState.activeSort);

  	                if (operation.willSort) {
  	                    self.sortOperation(operation);
  	                }
  	            }

  	            operation.startFilter = operation.startState.activeFilter;

  	            if (filterCommand) {
  	                operation.newFilter = filterCommand;
  	            } else {
  	                operation.newFilter = h.extend(new mixitup.CommandFilter(), operation.startFilter);
  	            }

  	            if (operation.newFilter.selector === 'all') {
  	                operation.newFilter.selector = self.config.selectors.target;
  	            } else if (operation.newFilter.selector === 'none') {
  	                operation.newFilter.selector = '';
  	            }

  	            self.filterOperation(operation);

  	            operation.startContainerClassName = operation.startState.activeContainerClassName;

  	            if (changeLayoutCommand) {
  	                operation.newContainerClassName = changeLayoutCommand.containerClassName;

  	                if (operation.newContainerClassName !== operation.startContainerClassName) {
  	                    operation.willChangeLayout = true;
  	                }
  	            } else {
  	                operation.newContainerClassName = operation.startContainerClassName;
  	            }

  	            if (self.config.animation.enable) {
  	                // Populate the operation's position data

  	                self.getStartMixData(operation);
  	                self.setInter(operation);

  	                operation.docState = h.getDocumentState(self.dom.document);

  	                self.getInterMixData(operation);
  	                self.setFinal(operation);
  	                self.getFinalMixData(operation);

  	                self.parseEffects();

  	                operation.hasEffect = self.hasEffect();

  	                self.getTweenData(operation);
  	            }

  	            if (operation.willSort) {
  	                self.targets = operation.newOrder;
  	            }

  	            operation.newState = self.buildState(operation);

  	            return self.callFilters('operationMappedGetOperation', operation, arguments);
  	        },

  	        /**
  	         * Renders a previously created operation at a specific point in its path, as
  	         * determined by a multiplier between 0 and 1.
  	         *
  	         * @example
  	         * .tween(operation, multiplier)
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.Operation}     operation
  	         *      An operation object created via the `getOperation` method
  	         *
  	         * @param   {Float}                 multiplier
  	         *      Any number between 0 and 1 representing the percentage complete of the operation
  	         * @return  {void}
  	         */

  	        tween: function(operation, multiplier) {
  	            var target          = null,
  	                posData         = null,
  	                toHideIndex     = -1,
  	                i               = -1;

  	            multiplier = Math.min(multiplier, 1);
  	            multiplier = Math.max(multiplier, 0);

  	            for (i = 0; target = operation.show[i]; i++) {
  	                posData = operation.showPosData[i];

  	                target.applyTween(posData, multiplier);
  	            }

  	            for (i = 0; target = operation.hide[i]; i++) {
  	                if (target.isShown) {
  	                    target.hide();
  	                }

  	                if ((toHideIndex = operation.toHide.indexOf(target)) > -1) {
  	                    posData = operation.toHidePosData[toHideIndex];

  	                    if (!target.isShown) {
  	                        target.show();
  	                    }

  	                    target.applyTween(posData, multiplier);
  	                }
  	            }
  	        },

  	        /**
  	         * Inserts one or more new target elements into the container at a specified
  	         * index.
  	         *
  	         * To be indexed as targets, new elements must match the `selectors.target`
  	         * selector (`'.mix'` by default).
  	         *
  	         * @example
  	         *
  	         * .insert(newElements [, index] [, animate], [, callback])
  	         *
  	         * @example <caption>Example 1: Inserting a single element via reference</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 0
  	         *
  	         * // Create a new element
  	         *
  	         * var newElement = document.createElement('div');
  	         * newElement.classList.add('mix');
  	         *
  	         * mixer.insert(newElement)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 1); // true
  	         *     });
  	         *
  	         * @example <caption>Example 2: Inserting a single element via HTML string</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 1
  	         *
  	         * // Create a new element via reference
  	         *
  	         * var newElementHtml = '&lt;div class="mix"&gt;&lt;/div&gt;';
  	         *
  	         * // Create and insert the new element at index 1
  	         *
  	         * mixer.insert(newElementHtml, 1)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 2); // true
  	         *         console.log(state.show[1].outerHTML === newElementHtml); // true
  	         *     });
  	         *
  	         * @example <caption>Example 3: Inserting multiple elements via reference</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 2
  	         *
  	         * // Create an array of new elements to insert.
  	         *
  	         * var newElement1 = document.createElement('div');
  	         * var newElement2 = document.createElement('div');
  	         *
  	         * newElement1.classList.add('mix');
  	         * newElement2.classList.add('mix');
  	         *
  	         * var newElementsCollection = [newElement1, newElement2];
  	         *
  	         * // Insert the new elements starting at index 1
  	         *
  	         * mixer.insert(newElementsCollection, 1)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 4); // true
  	         *         console.log(state.show[1] === newElement1); // true
  	         *         console.log(state.show[2] === newElement2); // true
  	         *     });
  	         *
  	         * @example <caption>Example 4: Inserting a jQuery collection object containing one or more elements</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 4
  	         *
  	         * var $newElement = $('&lt;div class="mix"&gt;&lt;/div&gt;');
  	         *
  	         * // Insert the new elements starting at index 3
  	         *
  	         * mixer.insert($newElement, 3)
  	         *     .then(function(state) {
  	         *         console.log(state.totalShow === 5); // true
  	         *         console.log(state.show[3] === $newElement[0]); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
  	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
  	         * @param       {number}    index=0
  	         *      The index at which to insert the new element(s). `0` by default.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        insert: function() {
  	            var self = this,
  	                args = self.parseInsertArgs(arguments);

  	            return self.multimix({
  	                insert: args.command
  	            }, args.animate, args.callback);
  	        },

  	        /**
  	         * Inserts one or more new elements before a provided reference element.
  	         *
  	         * @example
  	         *
  	         * .insertBefore(newElements, referenceElement [, animate] [, callback])
  	         *
  	         * @example <caption>Example: Inserting a new element before a reference element</caption>
  	         *
  	         * // An existing reference element is chosen at index 2
  	         *
  	         * var referenceElement = mixer.getState().show[2];
  	         *
  	         * // Create a new element
  	         *
  	         * var newElement = document.createElement('div');
  	         * newElement.classList.add('mix');
  	         *
  	         * mixer.insertBefore(newElement, referenceElement)
  	         *     .then(function(state) {
  	         *         // The new element is inserted into the container at index 2, before the reference element
  	         *
  	         *         console.log(state.show[2] === newElement); // true
  	         *
  	         *         // The reference element is now at index 3
  	         *
  	         *         console.log(state.show[3] === referenceElement); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
  	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
  	         * @param       {HTMLElement}    referenceElement
  	         *      A reference to an existing element in the container to insert new elements before.
  	         *@param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        insertBefore: function() {
  	            var self = this,
  	                args = self.parseInsertArgs(arguments);

  	            return self.insert(args.command.collection, 'before', args.command.sibling, args.animate, args.callback);
  	        },

  	        /**
  	         * Inserts one or more new elements after a provided reference element.
  	         *
  	         * @example
  	         *
  	         * .insertAfter(newElements, referenceElement [, animate] [, callback])
  	         *
  	         * @example <caption>Example: Inserting a new element after a reference element</caption>
  	         *
  	         * // An existing reference element is chosen at index 2
  	         *
  	         * var referenceElement = mixer.getState().show[2];
  	         *
  	         * // Create a new element
  	         *
  	         * var newElement = document.createElement('div');
  	         * newElement.classList.add('mix');
  	         *
  	         * mixer.insertAfter(newElement, referenceElement)
  	         *     .then(function(state) {
  	         *         // The new element is inserted into the container at index 3, after the reference element
  	         *
  	         *         console.log(state.show[3] === newElement); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
  	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
  	         * @param       {HTMLElement}    referenceElement
  	         *      A reference to an existing element in the container to insert new elements after.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        insertAfter: function() {
  	            var self = this,
  	                args = self.parseInsertArgs(arguments);

  	            return self.insert(args.command.collection, 'after', args.command.sibling, args.animate, args.callback);
  	        },

  	        /**
  	         * Inserts one or more new elements into the container before all existing targets.
  	         *
  	         * @example
  	         *
  	         * .prepend(newElements [,animate] [,callback])
  	         *
  	         * @example <caption>Example: Prepending a new element</caption>
  	         *
  	         * // Create a new element
  	         *
  	         * var newElement = document.createElement('div');
  	         * newElement.classList.add('mix');
  	         *
  	         * // Insert the element into the container
  	         *
  	         * mixer.prepend(newElement)
  	         *     .then(function(state) {
  	         *         console.log(state.show[0] === newElement); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
  	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        prepend: function() {
  	            var self = this,
  	                args = self.parseInsertArgs(arguments);

  	            return self.insert(0, args.command.collection, args.animate, args.callback);
  	        },

  	        /**
  	         * Inserts one or more new elements into the container after all existing targets.
  	         *
  	         * @example
  	         *
  	         * .append(newElements [,animate] [,callback])
  	         *
  	         * @example <caption>Example: Appending a new element</caption>
  	         *
  	         * // Create a new element
  	         *
  	         * var newElement = document.createElement('div');
  	         * newElement.classList.add('mix');
  	         *
  	         * // Insert the element into the container
  	         *
  	         * mixer.append(newElement)
  	         *     .then(function(state) {
  	         *         console.log(state.show[state.show.length - 1] === newElement); // true
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
  	         *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        append: function() {
  	            var self = this,
  	                args = self.parseInsertArgs(arguments);

  	            return self.insert(self.state.totalTargets, args.command.collection, args.animate, args.callback);
  	        },

  	        /**
  	         * Removes one or more existing target elements from the container.
  	         *
  	         * @example
  	         *
  	         * .remove(elements [, animate] [, callback])
  	         *
  	         * @example <caption>Example 1: Removing an element by reference</caption>
  	         *
  	         * var elementToRemove = containerEl.firstElementChild;
  	         *
  	         * mixer.remove(elementToRemove)
  	         *      .then(function(state) {
  	         *          console.log(state.targets.indexOf(elementToRemove) === -1); // true
  	         *      });
  	         *
  	         * @example <caption>Example 2: Removing a collection of elements by reference</caption>
  	         *
  	         * var elementsToRemove = containerEl.querySelectorAll('.category-a');
  	         *
  	         * console.log(elementsToRemove.length) // 3
  	         *
  	         * mixer.remove(elementsToRemove)
  	         *      .then(function() {
  	         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
  	         *      });
  	         *
  	         * @example <caption>Example 3: Removing one or more elements by selector</caption>
  	         *
  	         * mixer.remove('.category-a')
  	         *      .then(function() {
  	         *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
  	         *      });
  	         *
  	         * @example <caption>Example 4: Removing an element by index</caption>
  	         *
  	         * console.log(mixer.getState.totalShow); // 4
  	         *
  	         * // Remove the element at index 3
  	         *
  	         * mixer.remove(3)
  	         *      .then(function(state) {
  	         *          console.log(state.totalShow); // 3
  	         *          console.log(state.show[3]); // undefined
  	         *      });
  	         *
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {(HTMLElement|Array.<HTMLElement>|string|number)}    elements
  	         *      A reference to a single element to remove, an array-like collection of elements, a selector string, or the index of an element to remove.
  	         * @param       {boolean}   [animate=true]
  	         *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
  	         * @param       {function}  [callback=null]
  	         *      An optional callback function to be invoked after the operation has completed.
  	         * @return      {Promise.<mixitup.State>}
  	         *      A promise resolving with the current state object.
  	         */

  	        remove: function() {
  	            var self = this,
  	                args = self.parseRemoveArgs(arguments);

  	            return self.multimix({
  	                remove: args.command
  	            }, args.animate, args.callback);
  	        },

  	        /**
  	         * Retrieves the the value of any property or sub-object within the current
  	         * mixitup configuration, or the whole configuration object.
  	         *
  	         * @example
  	         *
  	         * .getConfig([stringKey])
  	         *
  	         * @example <caption>Example 1: retrieve the entire configuration object</caption>
  	         *
  	         * var config = mixer.getConfig(); // Config { ... }
  	         *
  	         * @example <caption>Example 2: retrieve a named sub-object of configuration object</caption>
  	         *
  	         * var animation = mixer.getConfig('animation'); // ConfigAnimation { ... }
  	         *
  	         * @example <caption>Example 3: retrieve a value of configuration object via a dot-notation string key</caption>
  	         *
  	         * var effects = mixer.getConfig('animation.effects'); // 'fade scale'
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @param       {string}    [stringKey]    A "dot-notation" string key
  	         * @return      {*}
  	         */

  	        getConfig: function(stringKey) {
  	            var self    = this,
  	                value   = null;

  	            if (!stringKey) {
  	                value = self.config;
  	            } else {
  	                value = h.getProperty(self.config, stringKey);
  	            }

  	            return self.callFilters('valueGetConfig', value, arguments);
  	        },

  	        /**
  	         * Updates the configuration of the mixer, after it has been instantiated.
  	         *
  	         * See the Configuration Object documentation for a full list of avilable
  	         * configuration options.
  	         *
  	         * @example
  	         *
  	         * .configure(config)
  	         *
  	         * @example <caption>Example 1: Updating animation options</caption>
  	         *
  	         * mixer.configure({
  	         *     animation: {
  	         *         effects: 'fade translateX(-100%)',
  	         *         duration: 300
  	         *     }
  	         * });
  	         *
  	         * @example <caption>Example 2: Removing a callback after it has been set</caption>
  	         *
  	         * var mixer;
  	         *
  	         * function handleMixEndOnce() {
  	         *     // Do something ..
  	         *
  	         *     // Then nullify the callback
  	         *
  	         *     mixer.configure({
  	         *         callbacks: {
  	         *             onMixEnd: null
  	         *         }
  	         *     });
  	         * };
  	         *
  	         * // Instantiate a mixer with a callback defined
  	         *
  	         * mixer = mixitup(containerEl, {
  	         *     callbacks: {
  	         *         onMixEnd: handleMixEndOnce
  	         *     }
  	         * });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {object}    config
  	         *      An object containing one of more configuration options.
  	         * @return      {void}
  	         */

  	        configure: function(config) {
  	            var self = this;

  	            self.callActions('beforeConfigure', arguments);

  	            h.extend(self.config, config, true, true);

  	            self.callActions('afterConfigure', arguments);
  	        },

  	        /**
  	         * Returns an object containing information about the current state of the
  	         * mixer. See the State Object documentation for more information.
  	         *
  	         * NB: State objects are immutable and should therefore be regenerated
  	         * after any operation.
  	         *
  	         * @example
  	         *
  	         * .getState();
  	         *
  	         * @example <caption>Example: Retrieving a state object</caption>
  	         *
  	         * var state = mixer.getState();
  	         *
  	         * console.log(state.totalShow + 'targets are currently shown');
  	         *
  	         * @public
  	         * @instance
  	         * @since       2.0.0
  	         * @return      {mixitup.State} An object reflecting the current state of the mixer.
  	         */

  	        getState: function() {
  	            var self    = this,
  	                state   = null;

  	            state = new mixitup.State();

  	            h.extend(state, self.state);

  	            h.freeze(state);

  	            return self.callFilters('stateGetState', state, arguments);
  	        },

  	        /**
  	         * Forces the re-indexing all targets within the container.
  	         *
  	         * This should only be used if some other piece of code in your application
  	         * has manipulated the contents of your container, which should be avoided.
  	         *
  	         * If you need to add or remove target elements from the container, use
  	         * the built-in `.insert()` or `.remove()` methods, and MixItUp will keep
  	         * itself up to date.
  	         *
  	         * @example
  	         *
  	         * .forceRefresh()
  	         *
  	         * @example <caption>Example: Force refreshing the mixer after external DOM manipulation</caption>
  	         *
  	         * console.log(mixer.getState().totalShow); // 3
  	         *
  	         * // An element is removed from the container via some external DOM manipulation code:
  	         *
  	         * containerEl.removeChild(containerEl.firstElementChild);
  	         *
  	         * // The mixer does not know that the number of targets has changed:
  	         *
  	         * console.log(mixer.getState().totalShow); // 3
  	         *
  	         * mixer.forceRefresh();
  	         *
  	         * // After forceRefresh, the mixer is in sync again:
  	         *
  	         * console.log(mixer.getState().totalShow); // 2
  	         *
  	         * @public
  	         * @instance
  	         * @since 2.1.2
  	         * @return {void}
  	         */

  	        forceRefresh: function() {
  	            var self = this;

  	            self.indexTargets();
  	        },

  	        /**
  	         * Forces the re-rendering of all targets when using the Dataset API.
  	         *
  	         * By default, targets are only re-rendered when `data.dirtyCheck` is
  	         * enabled, and an item's data has changed when `dataset()` is called.
  	         *
  	         * The `forceRender()` method allows for the re-rendering of all targets
  	         * in response to some arbitrary event, such as the changing of the target
  	         * render function.
  	         *
  	         * Targets are rendered against their existing data.
  	         *
  	         * @example
  	         *
  	         * .forceRender()
  	         *
  	         * @example <caption>Example: Force render targets after changing the target render function</caption>
  	         *
  	         * console.log(container.innerHTML); // ... &lt;span class="mix"&gt;Foo&lt;/span&gt; ...
  	         *
  	         * mixer.configure({
  	         *     render: {
  	         *         target: (item) => `&lt;a href="/${item.slug}/" class="mix"&gt;${item.title}&lt;/a&gt;`
  	         *     }
  	         * });
  	         *
  	         * mixer.forceRender();
  	         *
  	         * console.log(container.innerHTML); // ... &lt;a href="/foo/" class="mix"&gt;Foo&lt;/a&gt; ...
  	         *
  	         * @public
  	         * @instance
  	         * @since 3.2.1
  	         * @return {void}
  	         */

  	        forceRender: function() {
  	            var self    = this,
  	                target  = null,
  	                el      = null,
  	                id      = '';

  	            for (id in self.cache) {
  	                target = self.cache[id];

  	                el = target.render(target.data);

  	                if (el !== target.dom.el) {
  	                    // Update target element reference

  	                    if (target.isInDom) {
  	                        target.unbindEvents();

  	                        self.dom.parent.replaceChild(el, target.dom.el);
  	                    }

  	                    if (!target.isShown) {
  	                        el.style.display = 'none';
  	                    }

  	                    target.dom.el = el;

  	                    if (target.isInDom) {
  	                        target.bindEvents();
  	                    }
  	                }
  	            }

  	            self.state = self.buildState(self.lastOperation);
  	        },

  	        /**
  	         * Removes mixitup functionality from the container, unbinds all control
  	         * event handlers, and deletes the mixer instance from MixItUp's internal
  	         * cache.
  	         *
  	         * This should be performed whenever a mixer's container is removed from
  	         * the DOM, such as during a page change in a single page application,
  	         * or React's `componentWillUnmount()`.
  	         *
  	         * @example
  	         *
  	         * .destroy([cleanUp])
  	         *
  	         * @example <caption>Example: Destroying the mixer before removing its container element</caption>
  	         *
  	         * mixer.destroy();
  	         *
  	         * containerEl.parentElement.removeChild(containerEl);
  	         *
  	         * @public
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {boolean}   [cleanUp=false]
  	         *     An optional boolean dictating whether or not to clean up any inline `display: none;` styling applied to hidden targets.
  	         * @return  {void}
  	         */

  	        destroy: function(cleanUp) {
  	            var self    = this,
  	                control = null,
  	                target  = null,
  	                i       = 0;

  	            self.callActions('beforeDestroy', arguments);

  	            for (i = 0; control = self.controls[i]; i++) {
  	                control.removeBinding(self);
  	            }

  	            for (i = 0; target = self.targets[i]; i++) {
  	                if (cleanUp) {
  	                    target.show();
  	                }

  	                target.unbindEvents();
  	            }

  	            if (self.dom.container.id.match(/^MixItUp/)) {
  	                self.dom.container.removeAttribute('id');
  	            }

  	            delete mixitup.instances[self.id];

  	            self.callActions('afterDestroy', arguments);
  	        }
  	    });

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.IMoveData = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.posIn          = null;
  	        this.posOut         = null;
  	        this.operation      = null;
  	        this.callback       = null;
  	        this.statusChange   = '';
  	        this.duration       = -1;
  	        this.staggerIndex   = -1;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.IMoveData);

  	    mixitup.IMoveData.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.IMoveData.prototype.constructor = mixitup.IMoveData;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.TargetDom = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.el = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.TargetDom);

  	    mixitup.TargetDom.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.TargetDom.prototype.constructor = mixitup.TargetDom;

  	    /**
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Target = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.id         = '';
  	        this.sortString = '';
  	        this.mixer      = null;
  	        this.callback   = null;
  	        this.isShown    = false;
  	        this.isBound    = false;
  	        this.isExcluded = false;
  	        this.isInDom    = false;
  	        this.handler    = null;
  	        this.operation  = null;
  	        this.data       = null;
  	        this.dom        = new mixitup.TargetDom();

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Target);

  	    mixitup.Target.prototype = Object.create(mixitup.Base.prototype);

  	    h.extend(mixitup.Target.prototype, {
  	        constructor: mixitup.Target,

  	        /**
  	         * Initialises a newly instantiated Target.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {(Element|null)}    el
  	         * @param   {object}            mixer
  	         * @param   {object}            [data]
  	         * @return  {void}
  	         */

  	        init: function(el, mixer, data) {
  	            var self = this,
  	                id   = '';

  	            self.callActions('beforeInit', arguments);

  	            self.mixer = mixer;

  	            if (!el) {
  	                // If no element is provided, render it

  	                el = self.render(data);
  	            }

  	            self.cacheDom(el);

  	            self.bindEvents();

  	            if (self.dom.el.style.display !== 'none') {
  	                self.isShown = true;
  	            }

  	            if (data && mixer.config.data.uidKey) {
  	                if (typeof (id = data[mixer.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
  	                    throw new TypeError(mixitup.messages.errorDatasetInvalidUidKey({
  	                        uidKey: mixer.config.data.uidKey
  	                    }));
  	                }

  	                self.id     = id;
  	                self.data   = data;

  	                mixer.cache[id] = self;
  	            }

  	            self.callActions('afterInit', arguments);
  	        },

  	        /**
  	         * Renders the target element using a user-defined renderer function.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.1.4
  	         * @param   {object} data
  	         * @return  {void}
  	         */

  	        render: function(data) {
  	            var self    = this,
  	                render  = null,
  	                el      = null,
  	                temp    = null,
  	                output  = '';

  	            self.callActions('beforeRender', arguments);

  	            render = self.callFilters('renderRender', self.mixer.config.render.target, arguments);

  	            if (typeof render !== 'function') {
  	                throw new TypeError(mixitup.messages.errorDatasetRendererNotSet());
  	            }

  	            output = render(data);

  	            if (output && typeof output === 'object' && h.isElement(output)) {
  	                el = output;
  	            } else if (typeof output === 'string') {
  	                temp = document.createElement('div');
  	                temp.innerHTML = output;

  	                el = temp.firstElementChild;
  	            }

  	            return self.callFilters('elRender', el, arguments);
  	        },

  	        /**
  	         * Caches references of DOM elements neccessary for the target's functionality.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Element} el
  	         * @return  {void}
  	         */

  	        cacheDom: function(el) {
  	            var self = this;

  	            self.callActions('beforeCacheDom', arguments);

  	            self.dom.el = el;

  	            self.callActions('afterCacheDom', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string}    attributeName
  	         * @return  {void}
  	         */

  	        getSortString: function(attributeName) {
  	            var self    = this,
  	                value   = self.dom.el.getAttribute('data-' + attributeName) || '';

  	            self.callActions('beforeGetSortString', arguments);

  	            value = isNaN(value * 1) ?
  	                value.toLowerCase() :
  	                value * 1;

  	            self.sortString = value;

  	            self.callActions('afterGetSortString', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {void}
  	         */

  	        show: function() {
  	            var self = this;

  	            self.callActions('beforeShow', arguments);

  	            if (!self.isShown) {
  	                self.dom.el.style.display = '';

  	                self.isShown = true;
  	            }

  	            self.callActions('afterShow', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {void}
  	         */

  	        hide: function() {
  	            var self = this;

  	            self.callActions('beforeHide', arguments);

  	            if (self.isShown) {
  	                self.dom.el.style.display = 'none';

  	                self.isShown = false;
  	            }

  	            self.callActions('afterHide', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {mixitup.IMoveData} moveData
  	         * @return  {void}
  	         */

  	        move: function(moveData) {
  	            var self = this;

  	            self.callActions('beforeMove', arguments);

  	            if (!self.isExcluded) {
  	                self.mixer.targetsMoved++;
  	            }

  	            self.applyStylesIn(moveData);

  	            requestAnimationFrame(function() {
  	                self.applyStylesOut(moveData);
  	            });

  	            self.callActions('afterMove', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {object}    posData
  	         * @param   {number}    multiplier
  	         * @return  {void}
  	         */

  	        applyTween: function(posData, multiplier) {
  	            var self                    = this,
  	                propertyName            = '',
  	                tweenData               = null,
  	                posIn                   = posData.posIn,
  	                currentTransformValues  = [],
  	                currentValues           = new mixitup.StyleData(),
  	                i                       = -1;

  	            self.callActions('beforeApplyTween', arguments);

  	            currentValues.x     = posIn.x;
  	            currentValues.y     = posIn.y;

  	            if (multiplier === 0) {
  	                self.hide();
  	            } else if (!self.isShown) {
  	                self.show();
  	            }

  	            for (i = 0; propertyName = mixitup.features.TWEENABLE[i]; i++) {
  	                tweenData = posData.tweenData[propertyName];

  	                if (propertyName === 'x') {
  	                    if (!tweenData) continue;

  	                    currentValues.x = posIn.x + (tweenData * multiplier);
  	                } else if (propertyName === 'y') {
  	                    if (!tweenData) continue;

  	                    currentValues.y = posIn.y + (tweenData * multiplier);
  	                } else if (tweenData instanceof mixitup.TransformData) {
  	                    if (!tweenData.value) continue;

  	                    currentValues[propertyName].value =
  	                        posIn[propertyName].value + (tweenData.value * multiplier);

  	                    currentValues[propertyName].unit  = tweenData.unit;

  	                    currentTransformValues.push(
  	                        propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')'
  	                    );
  	                } else {
  	                    if (!tweenData) continue;

  	                    currentValues[propertyName] = posIn[propertyName] + (tweenData * multiplier);

  	                    self.dom.el.style[propertyName] = currentValues[propertyName];
  	                }
  	            }

  	            if (currentValues.x || currentValues.y) {
  	                currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
  	            }

  	            if (currentTransformValues.length) {
  	                self.dom.el.style[mixitup.features.transformProp] = currentTransformValues.join(' ');
  	            }

  	            self.callActions('afterApplyTween', arguments);
  	        },

  	        /**
  	         * Applies the initial styling to a target element before any transition
  	         * is applied.
  	         *
  	         * @private
  	         * @instance
  	         * @param   {mixitup.IMoveData} moveData
  	         * @return  {void}
  	         */

  	        applyStylesIn: function(moveData) {
  	            var self            = this,
  	                posIn           = moveData.posIn,
  	                isFading        = self.mixer.effectsIn.opacity !== 1,
  	                transformValues = [];

  	            self.callActions('beforeApplyStylesIn', arguments);

  	            transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

  	            if (self.mixer.config.animation.animateResizeTargets) {
  	                if (moveData.statusChange !== 'show') {
  	                    // Don't apply posIn width or height or showing, as will be 0

  	                    self.dom.el.style.width  = posIn.width + 'px';
  	                    self.dom.el.style.height = posIn.height + 'px';
  	                }

  	                self.dom.el.style.marginRight  = posIn.marginRight + 'px';
  	                self.dom.el.style.marginBottom = posIn.marginBottom + 'px';
  	            }

  	            isFading && (self.dom.el.style.opacity = posIn.opacity);

  	            if (moveData.statusChange === 'show') {
  	                transformValues = transformValues.concat(self.mixer.transformIn);
  	            }

  	            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

  	            self.callActions('afterApplyStylesIn', arguments);
  	        },

  	        /**
  	         * Applies a transition followed by the final styles for the element to
  	         * transition towards.
  	         *
  	         * @private
  	         * @instance
  	         * @param   {mixitup.IMoveData} moveData
  	         * @return  {void}
  	         */

  	        applyStylesOut: function(moveData) {
  	            var self            = this,
  	                transitionRules = [],
  	                transformValues = [],
  	                isResizing      = self.mixer.config.animation.animateResizeTargets,
  	                isFading        = typeof self.mixer.effectsIn.opacity !== 'undefined';

  	            self.callActions('beforeApplyStylesOut', arguments);

  	            // Build the transition rules

  	            transitionRules.push(self.writeTransitionRule(
  	                mixitup.features.transformRule,
  	                moveData.staggerIndex
  	            ));

  	            if (moveData.statusChange !== 'none') {
  	                transitionRules.push(self.writeTransitionRule(
  	                    'opacity',
  	                    moveData.staggerIndex,
  	                    moveData.duration
  	                ));
  	            }

  	            if (isResizing) {
  	                transitionRules.push(self.writeTransitionRule(
  	                    'width',
  	                    moveData.staggerIndex,
  	                    moveData.duration
  	                ));

  	                transitionRules.push(self.writeTransitionRule(
  	                    'height',
  	                    moveData.staggerIndex,
  	                    moveData.duration
  	                ));

  	                transitionRules.push(self.writeTransitionRule(
  	                    'margin',
  	                    moveData.staggerIndex,
  	                    moveData.duration
  	                ));
  	            }

  	            // If no callback was provided, the element will
  	            // not transition in any way so tag it as "immovable"

  	            if (!moveData.callback) {
  	                self.mixer.targetsImmovable++;

  	                if (self.mixer.targetsMoved === self.mixer.targetsImmovable) {
  	                    // If the total targets moved is equal to the
  	                    // number of immovable targets, the operation
  	                    // should be considered finished

  	                    self.mixer.cleanUp(moveData.operation);
  	                }

  	                return;
  	            }

  	            // If the target will transition in some fasion,
  	            // assign a callback function

  	            self.operation = moveData.operation;
  	            self.callback = moveData.callback;

  	            // As long as the target is not excluded, increment
  	            // the total number of targets bound

  	            !self.isExcluded && self.mixer.targetsBound++;

  	            // Tag the target as bound to differentiate from transitionEnd
  	            // events that may come from stylesheet driven effects

  	            self.isBound = true;

  	            // Apply the transition

  	            self.applyTransition(transitionRules);

  	            // Apply width, height and margin negation

  	            if (isResizing && moveData.posOut.width > 0 && moveData.posOut.height > 0) {
  	                self.dom.el.style.width        = moveData.posOut.width + 'px';
  	                self.dom.el.style.height       = moveData.posOut.height + 'px';
  	                self.dom.el.style.marginRight  = moveData.posOut.marginRight + 'px';
  	                self.dom.el.style.marginBottom = moveData.posOut.marginBottom + 'px';
  	            }

  	            if (!self.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
  	                // If we're not nudging, the translation should be
  	                // applied before any other transforms to prevent
  	                // lateral movement

  	                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
  	            }

  	            // Apply fade

  	            switch (moveData.statusChange) {
  	                case 'hide':
  	                    isFading && (self.dom.el.style.opacity = self.mixer.effectsOut.opacity);

  	                    transformValues = transformValues.concat(self.mixer.transformOut);

  	                    break;
  	                case 'show':
  	                    isFading && (self.dom.el.style.opacity = 1);
  	            }

  	            if (
  	                self.mixer.config.animation.nudge ||
  	                (!self.mixer.config.animation.nudge && moveData.statusChange !== 'hide')
  	            ) {
  	                // Opposite of above - apply translate after
  	                // other transform

  	                transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
  	            }

  	            // Apply transforms

  	            self.dom.el.style[mixitup.features.transformProp] = transformValues.join(' ');

  	            self.callActions('afterApplyStylesOut', arguments);
  	        },

  	        /**
  	         * Combines the name of a CSS property with the appropriate duration and delay
  	         * values to created a valid transition rule.
  	         *
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string}    property
  	         * @param   {number}    staggerIndex
  	         * @param   {number}    duration
  	         * @return  {string}
  	         */

  	        writeTransitionRule: function(property, staggerIndex, duration) {
  	            var self  = this,
  	                delay = self.getDelay(staggerIndex),
  	                rule  = '';

  	            rule = property + ' ' +
  	                (duration > 0 ? duration : self.mixer.config.animation.duration) + 'ms ' +
  	                delay + 'ms ' +
  	                (property === 'opacity' ? 'linear' : self.mixer.config.animation.easing);

  	            return self.callFilters('ruleWriteTransitionRule', rule, arguments);
  	        },

  	        /**
  	         * Calculates the transition delay for each target element based on its index, if
  	         * staggering is applied. If defined, A custom `animation.staggerSeqeuence`
  	         * function can be used to manipulate the order of indices to produce custom
  	         * stagger effects (e.g. for use in a grid with irregular row lengths).
  	         *
  	         * @private
  	         * @instance
  	         * @since   2.0.0
  	         * @param   {number}    index
  	         * @return  {number}
  	         */

  	        getDelay: function(index) {
  	            var self    = this,
  	                delay   = -1;

  	            if (typeof self.mixer.config.animation.staggerSequence === 'function') {
  	                index = self.mixer.config.animation.staggerSequence.call(self, index, self.state);
  	            }

  	            delay = !!self.mixer.staggerDuration ? index * self.mixer.staggerDuration : 0;

  	            return self.callFilters('delayGetDelay', delay, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {string[]}  rules
  	         * @return  {void}
  	         */

  	        applyTransition: function(rules) {
  	            var self                = this,
  	                transitionString    = rules.join(', ');

  	            self.callActions('beforeApplyTransition', arguments);

  	            self.dom.el.style[mixitup.features.transitionProp] = transitionString;

  	            self.callActions('afterApplyTransition', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Event} e
  	         * @return  {void}
  	         */

  	        handleTransitionEnd: function(e) {
  	            var self        = this,
  	                propName    = e.propertyName,
  	                canResize   = self.mixer.config.animation.animateResizeTargets;

  	            self.callActions('beforeHandleTransitionEnd', arguments);

  	            if (
  	                self.isBound &&
  	                e.target.matches(self.mixer.config.selectors.target) &&
  	                (
  	                    propName.indexOf('transform') > -1 ||
  	                    propName.indexOf('opacity') > -1 ||
  	                    canResize && propName.indexOf('height') > -1 ||
  	                    canResize && propName.indexOf('width') > -1 ||
  	                    canResize && propName.indexOf('margin') > -1
  	                )
  	            ) {
  	                self.callback.call(self, self.operation);

  	                self.isBound = false;
  	                self.callback = null;
  	                self.operation = null;
  	            }

  	            self.callActions('afterHandleTransitionEnd', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {Event}     e
  	         * @return  {void}
  	         */

  	        eventBus: function(e) {
  	            var self = this;

  	            self.callActions('beforeEventBus', arguments);

  	            switch (e.type) {
  	                case 'webkitTransitionEnd':
  	                case 'transitionend':
  	                    self.handleTransitionEnd(e);
  	            }

  	            self.callActions('afterEventBus', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {void}
  	         */

  	        unbindEvents: function() {
  	            var self = this;

  	            self.callActions('beforeUnbindEvents', arguments);

  	            h.off(self.dom.el, 'webkitTransitionEnd', self.handler);
  	            h.off(self.dom.el, 'transitionend', self.handler);

  	            self.callActions('afterUnbindEvents', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @return  {void}
  	         */

  	        bindEvents: function() {
  	            var self                = this,
  	                transitionEndEvent  = '';

  	            self.callActions('beforeBindEvents', arguments);

  	            transitionEndEvent = mixitup.features.transitionPrefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend';

  	            self.handler = function(e) {
  	                return self.eventBus(e);
  	            };

  	            h.on(self.dom.el, transitionEndEvent, self.handler);

  	            self.callActions('afterBindEvents', arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since   3.0.0
  	         * @param   {boolean}   [getBox]
  	         * @return  {PosData}
  	         */

  	        getPosData: function(getBox) {
  	            var self    = this,
  	                styles  = {},
  	                rect    = null,
  	                posData = new mixitup.StyleData();

  	            self.callActions('beforeGetPosData', arguments);

  	            posData.x = self.dom.el.offsetLeft;
  	            posData.y = self.dom.el.offsetTop;

  	            if (self.mixer.config.animation.animateResizeTargets || getBox) {
  	                rect = self.dom.el.getBoundingClientRect();

  	                posData.top     = rect.top;
  	                posData.right   = rect.right;
  	                posData.bottom  = rect.bottom;
  	                posData.left    = rect.left;

  	                posData.width  = rect.width;
  	                posData.height = rect.height;
  	            }

  	            if (self.mixer.config.animation.animateResizeTargets) {
  	                styles = window.getComputedStyle(self.dom.el);

  	                posData.marginBottom = parseFloat(styles.marginBottom);
  	                posData.marginRight  = parseFloat(styles.marginRight);
  	            }

  	            return self.callFilters('posDataGetPosData', posData, arguments);
  	        },

  	        /**
  	         * @private
  	         * @instance
  	         * @since       3.0.0
  	         * @return      {void}
  	         */

  	        cleanUp: function() {
  	            var self = this;

  	            self.callActions('beforeCleanUp', arguments);

  	            self.dom.el.style[mixitup.features.transformProp]  = '';
  	            self.dom.el.style[mixitup.features.transitionProp] = '';
  	            self.dom.el.style.opacity                          = '';

  	            if (self.mixer.config.animation.animateResizeTargets) {
  	                self.dom.el.style.width        = '';
  	                self.dom.el.style.height       = '';
  	                self.dom.el.style.marginRight  = '';
  	                self.dom.el.style.marginBottom = '';
  	            }

  	            self.callActions('afterCleanUp', arguments);
  	        }
  	    });

  	    /**
  	     * A jQuery-collection-like wrapper around one or more `mixitup.Mixer` instances
  	     * allowing simultaneous control of said instances similar to the MixItUp 2 API.
  	     *
  	     * @example
  	     * new mixitup.Collection(instances)
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     * @param       {mixitup.Mixer[]}   instances
  	     */

  	    mixitup.Collection = function(instances) {
  	        var instance    = null,
  	            i           = -1;

  	        this.callActions('beforeConstruct');

  	        for (i = 0; instance = instances[i]; i++) {
  	            this[i] = instance;
  	        }

  	        this.length = instances.length;

  	        this.callActions('afterConstruct');

  	        h.freeze(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Collection);

  	    mixitup.Collection.prototype = Object.create(mixitup.Base.prototype);

  	    h.extend(mixitup.Collection.prototype,
  	    /** @lends mixitup.Collection */
  	    {
  	        constructor: mixitup.Collection,

  	        /**
  	         * Calls a method on all instances in the collection by passing the method
  	         * name as a string followed by any applicable parameters to be curried into
  	         * to the method.
  	         *
  	         * @example
  	         * .mixitup(methodName[,arg1][,arg2..]);
  	         *
  	         * @example
  	         * var collection = new Collection([mixer1, mixer2]);
  	         *
  	         * return collection.mixitup('filter', '.category-a')
  	         *     .then(function(states) {
  	         *         state.forEach(function(state) {
  	         *             console.log(state.activeFilter.selector); // .category-a
  	         *         });
  	         *     });
  	         *
  	         * @public
  	         * @instance
  	         * @since       3.0.0
  	         * @param       {string}  methodName
  	         * @return      {Promise<Array<mixitup.State>>}
  	         */

  	        mixitup: function(methodName) {
  	            var self        = this,
  	                instance    = null,
  	                args        = Array.prototype.slice.call(arguments),
  	                tasks       = [],
  	                i           = -1;

  	            this.callActions('beforeMixitup');

  	            args.shift();

  	            for (i = 0; instance = self[i]; i++) {
  	                tasks.push(instance[methodName].apply(instance, args));
  	            }

  	            return self.callFilters('promiseMixitup', h.all(tasks, mixitup.libraries), arguments);
  	        }
  	    });

  	    /**
  	     * `mixitup.Operation` objects contain all data neccessary to describe the full
  	     * lifecycle of any MixItUp operation. They can be used to compute and store an
  	     * operation for use at a later time (e.g. programmatic tweening).
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Operation = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.id                      = '';

  	        this.args                    = [];
  	        this.command                 = null;
  	        this.showPosData             = [];
  	        this.toHidePosData           = [];

  	        this.startState              = null;
  	        this.newState                = null;
  	        this.docState                = null;

  	        this.willSort                = false;
  	        this.willChangeLayout        = false;
  	        this.hasEffect               = false;
  	        this.hasFailed               = false;

  	        this.triggerElement          = null;

  	        this.show                    = [];
  	        this.hide                    = [];
  	        this.matching                = [];
  	        this.toShow                  = [];
  	        this.toHide                  = [];
  	        this.toMove                  = [];
  	        this.toRemove                = [];
  	        this.startOrder              = [];
  	        this.newOrder                = [];
  	        this.startSort               = null;
  	        this.newSort                 = null;
  	        this.startFilter             = null;
  	        this.newFilter               = null;
  	        this.startDataset            = null;
  	        this.newDataset              = null;
  	        this.viewportDeltaX          = 0;
  	        this.viewportDeltaY          = 0;
  	        this.startX                  = 0;
  	        this.startY                  = 0;
  	        this.startHeight             = 0;
  	        this.startWidth              = 0;
  	        this.newX                    = 0;
  	        this.newY                    = 0;
  	        this.newHeight               = 0;
  	        this.newWidth                = 0;
  	        this.startContainerClassName = '';
  	        this.startDisplay            = '';
  	        this.newContainerClassName   = '';
  	        this.newDisplay              = '';

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Operation);

  	    mixitup.Operation.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.Operation.prototype.constructor = mixitup.Operation;

  	    /**
  	     * `mixitup.State` objects expose various pieces of data detailing the state of
  	     * a MixItUp instance. They are provided at the start and end of any operation via
  	     * callbacks and events, with the most recent state stored between operations
  	     * for retrieval at any time via the API.
  	     *
  	     * @constructor
  	     * @namespace
  	     * @memberof    mixitup
  	     * @public
  	     * @since       3.0.0
  	     */

  	    mixitup.State = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /**
  	         * The ID of the mixer instance.
  	         *
  	         * @name        id
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.id = '';

  	        /**
  	         * The currently active filter command as set by a control click or API call.
  	         *
  	         * @name        activeFilter
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {mixitup.CommandFilter}
  	         * @default     null
  	         */

  	        this.activeFilter = null;

  	        /**
  	         * The currently active sort command as set by a control click or API call.
  	         *
  	         * @name        activeSort
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {mixitup.CommandSort}
  	         * @default     null
  	         */

  	        this.activeSort = null;

  	        /**
  	         * The current layout-specific container class name, if applied.
  	         *
  	         * @name        activeContainerClassName
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {string}
  	         * @default     ''
  	         */

  	        this.activeContainerClassName = '';

  	        /**
  	         * A reference to the container element that the mixer is instantiated on.
  	         *
  	         * @name        container
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Element}
  	         * @default     null
  	         */

  	        this.container = null;

  	        /**
  	         * An array of all target elements indexed by the mixer.
  	         *
  	         * @name        targets
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Array.<Element>}
  	         * @default     []
  	         */

  	        this.targets = [];

  	        /**
  	         * An array of all target elements not matching the current filter.
  	         *
  	         * @name        hide
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Array.<Element>}
  	         * @default     []
  	         */

  	        this.hide = [];

  	        /**
  	         * An array of all target elements matching the current filter and any additional
  	         * limits applied such as pagination.
  	         *
  	         * @name        show
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Array.<Element>}
  	         * @default     []
  	         */

  	        this.show = [];

  	        /**
  	         * An array of all target elements matching the current filter irrespective of
  	         * any additional limits applied such as pagination.
  	         *
  	         * @name        matching
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Array.<Element>}
  	         * @default     []
  	         */

  	        this.matching = [];

  	        /**
  	         * An integer representing the total number of target elements indexed by the
  	         * mixer. Equivalent to `state.targets.length`.
  	         *
  	         * @name        totalTargets
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {number}
  	         * @default     -1
  	         */

  	        this.totalTargets = -1;

  	        /**
  	         * An integer representing the total number of target elements matching the
  	         * current filter and any additional limits applied such as pagination.
  	         * Equivalent to `state.show.length`.
  	         *
  	         * @name        totalShow
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {number}
  	         * @default     -1
  	         */

  	        this.totalShow = -1;

  	        /**
  	         * An integer representing the total number of target elements not matching
  	         * the current filter. Equivalent to `state.hide.length`.
  	         *
  	         * @name        totalHide
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {number}
  	         * @default     -1
  	         */

  	        this.totalHide = -1;

  	        /**
  	         * An integer representing the total number of target elements matching the
  	         * current filter irrespective of any other limits applied such as pagination.
  	         * Equivalent to `state.matching.length`.
  	         *
  	         * @name        totalMatching
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {number}
  	         * @default     -1
  	         */

  	        this.totalMatching = -1;

  	        /**
  	         * A boolean indicating whether the last operation "failed", i.e. no targets
  	         * could be found matching the filter.
  	         *
  	         * @name        hasFailed
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {boolean}
  	         * @default     false
  	         */

  	        this.hasFailed = false;

  	        /**
  	         * The DOM element that was clicked if the last operation was triggered by the
  	         * clicking of a control and not an API call.
  	         *
  	         * @name        triggerElement
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Element|null}
  	         * @default     null
  	         */

  	        this.triggerElement = null;

  	        /**
  	         * The currently active dataset underlying the rendered targets, if the
  	         * dataset API is in use.
  	         *
  	         * @name        activeDataset
  	         * @memberof    mixitup.State
  	         * @instance
  	         * @type        {Array.<object>}
  	         * @default     null
  	         */

  	        this.activeDataset = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.State);

  	    mixitup.State.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.State.prototype.constructor = mixitup.State;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.UserInstruction = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        this.command    = {};
  	        this.animate    = false;
  	        this.callback   = null;

  	        this.callActions('afterConstruct');

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.UserInstruction);

  	    mixitup.UserInstruction.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.UserInstruction.prototype.constructor = mixitup.UserInstruction;

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     */

  	    mixitup.Messages = function() {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct');

  	        /* Errors
  	        ----------------------------------------------------------------------------- */

  	        this.ERROR_FACTORY_INVALID_CONTAINER =
  	            '[MixItUp] An invalid selector or element reference was passed to the mixitup factory function';

  	        this.ERROR_FACTORY_CONTAINER_NOT_FOUND =
  	            '[MixItUp] The provided selector yielded no container element';

  	        this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS =
  	            '[MixItUp] Invalid value for `animation.effects`';

  	        this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE =
  	            '[MixItUp] Invalid value for `controls.scope`';

  	        this.ERROR_CONFIG_INVALID_PROPERTY =
  	            '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}';

  	        this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION =
  	            '. Did you mean "${probableMatch}"?';

  	        this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET =
  	            '[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`';

  	        this.ERROR_DATASET_INVALID_UID_KEY =
  	            '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items';

  	        this.ERROR_DATASET_DUPLICATE_UID =
  	            '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.';

  	        this.ERROR_INSERT_INVALID_ARGUMENTS =
  	            '[MixItUp] Please provider either an index or a sibling and position to insert, not both';

  	        this.ERROR_INSERT_PREEXISTING_ELEMENT =
  	            '[MixItUp] An element to be inserted already exists in the container';

  	        this.ERROR_FILTER_INVALID_ARGUMENTS =
  	            '[MixItUp] Please provide either a selector or collection `.filter()`, not both';

  	        this.ERROR_DATASET_NOT_SET =
  	            '[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`';

  	        this.ERROR_DATASET_PRERENDERED_MISMATCH =
  	            '[MixItUp] `load.dataset` does not match pre-rendered targets';

  	        this.ERROR_DATASET_RENDERER_NOT_SET =
  	            '[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`';

  	        this.ERROR_SORT_NON_EXISTENT_ELEMENT =
  	            '[MixItUp] An element to be sorted does not already exist in the container';

  	        /* Warnings
  	        ----------------------------------------------------------------------------- */

  	        this.WARNING_FACTORY_PREEXISTING_INSTANCE =
  	            '[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored.' +
  	            ' If you wish to perform additional methods on this instance, please create a reference.';

  	        this.WARNING_INSERT_NO_ELEMENTS =
  	            '[MixItUp] WARNING: No valid elements were passed to `.insert()`';

  	        this.WARNING_REMOVE_NO_ELEMENTS =
  	            '[MixItUp] WARNING: No valid elements were passed to `.remove()`';

  	        this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL =
  	            '[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the ' +
  	            'queue is full or queuing is disabled.';

  	        this.WARNING_GET_OPERATION_INSTANCE_BUSY =
  	            '[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.';

  	        this.WARNING_NO_PROMISE_IMPLEMENTATION =
  	            '[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install' +
  	            ' an ES6 Promise polyfill.';

  	        this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES =
  	            '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements' +
  	            ' which may product unexpected sort output';

  	        this.callActions('afterConstruct');

  	        this.compileTemplates();

  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Messages);

  	    mixitup.Messages.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.Messages.prototype.constructor = mixitup.Messages;

  	    /**
  	     * @return {void}
  	     */

  	    mixitup.Messages.prototype.compileTemplates = function() {
  	        var errorKey        = '';
  	        var errorMessage    = '';

  	        for (errorKey in this) {
  	            if (typeof (errorMessage = this[errorKey]) !== 'string') continue;

  	            this[h.camelCase(errorKey)] = h.template(errorMessage);
  	        }
  	    };

  	    mixitup.messages = new mixitup.Messages();

  	    /**
  	     * @constructor
  	     * @memberof    mixitup
  	     * @private
  	     * @since       3.0.0
  	     * @param       {mixitup.Mixer} mixer
  	     */

  	    mixitup.Facade = function Mixer(mixer) {
  	        mixitup.Base.call(this);

  	        this.callActions('beforeConstruct', arguments);

  	        this.configure          = mixer.configure.bind(mixer);
  	        this.show               = mixer.show.bind(mixer);
  	        this.hide               = mixer.hide.bind(mixer);
  	        this.filter             = mixer.filter.bind(mixer);
  	        this.toggleOn           = mixer.toggleOn.bind(mixer);
  	        this.toggleOff          = mixer.toggleOff.bind(mixer);
  	        this.sort               = mixer.sort.bind(mixer);
  	        this.changeLayout       = mixer.changeLayout.bind(mixer);
  	        this.multimix           = mixer.multimix.bind(mixer);
  	        this.dataset            = mixer.dataset.bind(mixer);
  	        this.tween              = mixer.tween.bind(mixer);
  	        this.insert             = mixer.insert.bind(mixer);
  	        this.insertBefore       = mixer.insertBefore.bind(mixer);
  	        this.insertAfter        = mixer.insertAfter.bind(mixer);
  	        this.prepend            = mixer.prepend.bind(mixer);
  	        this.append             = mixer.append.bind(mixer);
  	        this.remove             = mixer.remove.bind(mixer);
  	        this.destroy            = mixer.destroy.bind(mixer);
  	        this.forceRefresh       = mixer.forceRefresh.bind(mixer);
  	        this.forceRender        = mixer.forceRender.bind(mixer);
  	        this.isMixing           = mixer.isMixing.bind(mixer);
  	        this.getOperation       = mixer.getOperation.bind(mixer);
  	        this.getConfig          = mixer.getConfig.bind(mixer);
  	        this.getState           = mixer.getState.bind(mixer);

  	        this.callActions('afterConstruct', arguments);

  	        h.freeze(this);
  	        h.seal(this);
  	    };

  	    mixitup.BaseStatic.call(mixitup.Facade);

  	    mixitup.Facade.prototype = Object.create(mixitup.Base.prototype);

  	    mixitup.Facade.prototype.constructor = mixitup.Facade;

  	    {
  	        module.exports = mixitup;
  	    }
  	    mixitup.BaseStatic.call(mixitup.constructor);

  	    mixitup.NAME = 'mixitup';
  	    mixitup.CORE_VERSION = '3.3.1';
  	})(window);
  } (mixitup$1));

  var mixitup = mixitup$1.exports;

  const container = document.querySelector(".finder__promo");

  const filterPromo = () => {
    mixitup( container, {
      controls: {
        enable: true,
      },
      animation: {
        enable: false,
      },
    });

    var carouselMenuPromo = new Splide(".filter__promo .splide", {
      pagination: false,
      arrows: false,
      perPage: 3,
      padding: { left: 0, right: 30 },
      perMove: 1,
      gap: 5,
    });
    carouselMenuPromo.mount();
  };

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  /*!
   * GSAP 3.10.4
   * https://greensock.com
   *
   * @license Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  /* eslint-disable */
  var _config = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
      lineHeight: ""
    }
  },
      _defaults = {
    duration: .5,
    overwrite: false,
    delay: 0
  },
      _suppressOverwrites,
      _bigNum$1 = 1e8,
      _tinyNum = 1 / _bigNum$1,
      _2PI = Math.PI * 2,
      _HALF_PI = _2PI / 4,
      _gsID = 0,
      _sqrt = Math.sqrt,
      _cos = Math.cos,
      _sin = Math.sin,
      _isString = function _isString(value) {
    return typeof value === "string";
  },
      _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
      _isNumber = function _isNumber(value) {
    return typeof value === "number";
  },
      _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
      _isObject = function _isObject(value) {
    return typeof value === "object";
  },
      _isNotFalse = function _isNotFalse(value) {
    return value !== false;
  },
      _windowExists$1 = function _windowExists() {
    return typeof window !== "undefined";
  },
      _isFuncOrString = function _isFuncOrString(value) {
    return _isFunction(value) || _isString(value);
  },
      _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
      // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
  _isArray = Array.isArray,
      _strictNumExp = /(?:-?\.?\d|\.)+/gi,
      //only numbers (including negatives and decimals) but NOT relative values.
  _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
  _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
  _relExp = /[+-]=-?[.\d]+/,
      _delimitedValueExp = /[^,'"\[\]\s]+/gi,
      // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
  _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      _globalTimeline,
      _win$1,
      _coreInitted,
      _doc$1,
      _globals = {},
      _installScope = {},
      _coreReady,
      _install = function _install(scope) {
    return (_installScope = _merge(scope, _globals)) && gsap;
  },
      _missingPlugin = function _missingPlugin(property, value) {
    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
  },
      _warn = function _warn(message, suppress) {
    return !suppress && console.warn(message);
  },
      _addGlobal = function _addGlobal(name, obj) {
    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
  },
      _emptyFunc = function _emptyFunc() {
    return 0;
  },
      _reservedProps = {},
      _lazyTweens = [],
      _lazyLookup = {},
      _lastRenderedFrame,
      _plugins = {},
      _effects = {},
      _nextGCFrame = 30,
      _harnessPlugins = [],
      _callbackNames = "",
      _harness = function _harness(targets) {
    var target = targets[0],
        harnessPlugin,
        i;
    _isObject(target) || _isFunction(target) || (targets = [targets]);

    if (!(harnessPlugin = (target._gsap || {}).harness)) {
      // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
      i = _harnessPlugins.length;

      while (i-- && !_harnessPlugins[i].targetTest(target)) {}

      harnessPlugin = _harnessPlugins[i];
    }

    i = targets.length;

    while (i--) {
      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
    }

    return targets;
  },
      _getCache = function _getCache(target) {
    return target._gsap || _harness(toArray(target))[0]._gsap;
  },
      _getProperty = function _getProperty(target, property, v) {
    return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
  },
      _forEachName = function _forEachName(names, func) {
    return (names = names.split(",")).forEach(func) || names;
  },
      //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
  _round = function _round(value) {
    return Math.round(value * 100000) / 100000 || 0;
  },
      _roundPrecise = function _roundPrecise(value) {
    return Math.round(value * 10000000) / 10000000 || 0;
  },
      // increased precision mostly for timing values.
  _parseRelative = function _parseRelative(start, value) {
    var operator = value.charAt(0),
        end = parseFloat(value.substr(2));
    start = parseFloat(start);
    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
  },
      _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
    var l = toFind.length,
        i = 0;

    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

    return i < l;
  },
      _lazyRender = function _lazyRender() {
    var l = _lazyTweens.length,
        a = _lazyTweens.slice(0),
        i,
        tween;

    _lazyLookup = {};
    _lazyTweens.length = 0;

    for (i = 0; i < l; i++) {
      tween = a[i];
      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
    }
  },
      _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
    _lazyTweens.length && _lazyRender();
    animation.render(time, suppressEvents, force);
    _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
  },
      _numericIfPossible = function _numericIfPossible(value) {
    var n = parseFloat(value);
    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
  },
      _passThrough = function _passThrough(p) {
    return p;
  },
      _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      p in obj || (obj[p] = defaults[p]);
    }

    return obj;
  },
      _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
    return function (obj, defaults) {
      for (var p in defaults) {
        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
      }
    };
  },
      _merge = function _merge(base, toMerge) {
    for (var p in toMerge) {
      base[p] = toMerge[p];
    }

    return base;
  },
      _mergeDeep = function _mergeDeep(base, toMerge) {
    for (var p in toMerge) {
      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
    }

    return base;
  },
      _copyExcluding = function _copyExcluding(obj, excluding) {
    var copy = {},
        p;

    for (p in obj) {
      p in excluding || (copy[p] = obj[p]);
    }

    return copy;
  },
      _inheritDefaults = function _inheritDefaults(vars) {
    var parent = vars.parent || _globalTimeline,
        func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

    if (_isNotFalse(vars.inherit)) {
      while (parent) {
        func(vars, parent.vars.defaults);
        parent = parent.parent || parent._dp;
      }
    }

    return vars;
  },
      _arraysMatch = function _arraysMatch(a1, a2) {
    var i = a1.length,
        match = i === a2.length;

    while (match && i-- && a1[i] === a2[i]) {}

    return i < 0;
  },
      _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = parent[lastProp],
        t;

    if (sortBy) {
      t = child[sortBy];

      while (prev && prev[sortBy] > t) {
        prev = prev._prev;
      }
    }

    if (prev) {
      child._next = prev._next;
      prev._next = child;
    } else {
      child._next = parent[firstProp];
      parent[firstProp] = child;
    }

    if (child._next) {
      child._next._prev = child;
    } else {
      parent[lastProp] = child;
    }

    child._prev = prev;
    child.parent = child._dp = parent;
    return child;
  },
      _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
    if (firstProp === void 0) {
      firstProp = "_first";
    }

    if (lastProp === void 0) {
      lastProp = "_last";
    }

    var prev = child._prev,
        next = child._next;

    if (prev) {
      prev._next = next;
    } else if (parent[firstProp] === child) {
      parent[firstProp] = next;
    }

    if (next) {
      next._prev = prev;
    } else if (parent[lastProp] === child) {
      parent[lastProp] = prev;
    }

    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
  },
      _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
    child._act = 0;
  },
      _uncache = function _uncache(animation, child) {
    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
      // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
      var a = animation;

      while (a) {
        a._dirty = 1;
        a = a.parent;
      }
    }

    return animation;
  },
      _recacheAncestors = function _recacheAncestors(animation) {
    var parent = animation.parent;

    while (parent && parent.parent) {
      //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
      parent._dirty = 1;
      parent.totalDuration();
      parent = parent.parent;
    }

    return animation;
  },
      _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
  },
      _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
  },
      // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
  _animationCycle = function _animationCycle(tTime, cycleDuration) {
    var whole = Math.floor(tTime /= cycleDuration);
    return tTime && whole === tTime ? whole - 1 : whole;
  },
      _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
  },
      _setEnd = function _setEnd(animation) {
    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
  },
      _alignPlayhead = function _alignPlayhead(animation, totalTime) {
    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
    var parent = animation._dp;

    if (parent && parent.smoothChildTiming && animation._ts) {
      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

      _setEnd(animation);

      parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
    }

    return animation;
  },

  /*
  _totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
  	let cycleDuration = duration + repeatDelay,
  		time = _round(clampedTotalTime % cycleDuration);
  	if (time > duration) {
  		time = duration;
  	}
  	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
  },
  */
  _postAddChecks = function _postAddChecks(timeline, child) {
    var t;

    if (child._time || child._initted && !child._dur) {
      //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
      t = _parentToChildTotalTime(timeline.rawTime(), child);

      if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
        child.render(t, true);
      }
    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
      //in case any of the ancestors had completed but should now be enabled...
      if (timeline._dur < timeline.duration()) {
        t = timeline;

        while (t._dp) {
          t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

          t = t._dp;
        }
      }

      timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
    }
  },
      _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
    child.parent && _removeFromParent(child);
    child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

    _isFromOrFromStart(child) || (timeline._recent = child);
    skipChecks || _postAddChecks(timeline, child);
    return timeline;
  },
      _scrollTrigger = function _scrollTrigger(animation, trigger) {
    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
  },
      _attemptInitTween = function _attemptInitTween(tween, totalTime, force, suppressEvents) {
    _initTween(tween, totalTime);

    if (!tween._initted) {
      return 1;
    }

    if (!force && tween._pt && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
      _lazyTweens.push(tween);

      tween._lazy = [totalTime, suppressEvents];
      return 1;
    }
  },
      _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
    var parent = _ref.parent;
    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
  },
      // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
  _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
    var data = _ref2.data;
    return data === "isFromStart" || data === "isStart";
  },
      _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
    var prevRatio = tween.ratio,
        ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
        // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
    repeatDelay = tween._rDelay,
        tTime = 0,
        pt,
        iteration,
        prevIteration;

    if (repeatDelay && tween._repeat) {
      // in case there's a zero-duration tween that has a repeat with a repeatDelay
      tTime = _clamp(0, tween._tDur, totalTime);
      iteration = _animationCycle(tTime, repeatDelay);
      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
        // if iteration changed
        prevRatio = 1 - ratio;
        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
      }
    }

    if (ratio !== prevRatio || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents)) {
        // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
        return;
      }

      prevIteration = tween._zTime;
      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

      suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

      tween.ratio = ratio;
      tween._from && (ratio = 1 - ratio);
      tween._time = 0;
      tween._tTime = tTime;
      pt = tween._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      tween._startAt && totalTime < 0 && tween._startAt.render(totalTime, true, true);
      tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
      tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
        ratio && _removeFromParent(tween, 1);

        if (!suppressEvents) {
          _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

          tween._prom && tween._prom();
        }
      }
    } else if (!tween._zTime) {
      tween._zTime = totalTime;
    }
  },
      _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
    var child;

    if (time > prevTime) {
      child = animation._first;

      while (child && child._start <= time) {
        if (child.data === "isPause" && child._start > prevTime) {
          return child;
        }

        child = child._next;
      }
    } else {
      child = animation._last;

      while (child && child._start >= time) {
        if (child.data === "isPause" && child._start < prevTime) {
          return child;
        }

        child = child._prev;
      }
    }
  },
      _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
    var repeat = animation._repeat,
        dur = _roundPrecise(duration) || 0,
        totalProgress = animation._tTime / animation._tDur;
    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
    animation._dur = dur;
    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
    totalProgress > 0 && !leavePlayhead ? _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress) : animation.parent && _setEnd(animation);
    skipUncache || _uncache(animation.parent, animation);
    return animation;
  },
      _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
  },
      _zeroPosition = {
    _start: 0,
    endTime: _emptyFunc,
    totalDuration: _emptyFunc
  },
      _parsePosition = function _parsePosition(animation, position, percentAnimation) {
    var labels = animation.labels,
        recent = animation._recent || _zeroPosition,
        clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur,
        //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
    i,
        offset,
        isPercent;

    if (_isString(position) && (isNaN(position) || position in labels)) {
      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
      offset = position.charAt(0);
      isPercent = position.substr(-1) === "%";
      i = position.indexOf("=");

      if (offset === "<" || offset === ">") {
        i >= 0 && (position = position.replace(/=/, ""));
        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
      }

      if (i < 0) {
        position in labels || (labels[position] = clippedDuration);
        return labels[position];
      }

      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

      if (isPercent && percentAnimation) {
        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
      }

      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
    }

    return position == null ? clippedDuration : +position;
  },
      _createTweenType = function _createTweenType(type, params, timeline) {
    var isLegacy = _isNumber(params[1]),
        varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
        vars = params[varsIndex],
        irVars,
        parent;

    isLegacy && (vars.duration = params[1]);
    vars.parent = timeline;

    if (type) {
      irVars = vars;
      parent = timeline;

      while (parent && !("immediateRender" in irVars)) {
        // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
        irVars = parent.vars.defaults || {};
        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
      }

      vars.immediateRender = _isNotFalse(irVars.immediateRender);
      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
    }

    return new Tween(params[0], vars, params[varsIndex + 1]);
  },
      _conditionalReturn = function _conditionalReturn(value, func) {
    return value || value === 0 ? func(value) : func;
  },
      _clamp = function _clamp(min, max, value) {
    return value < min ? min : value > max ? max : value;
  },
      getUnit = function getUnit(value, v) {
    return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
  },
      // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
  clamp = function clamp(min, max, value) {
    return _conditionalReturn(value, function (v) {
      return _clamp(min, max, v);
    });
  },
      _slice = [].slice,
      _isArrayLike = function _isArrayLike(value, nonEmpty) {
    return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win$1;
  },
      _flatten = function _flatten(ar, leaveStrings, accumulator) {
    if (accumulator === void 0) {
      accumulator = [];
    }

    return ar.forEach(function (value) {
      var _accumulator;

      return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
    }) || accumulator;
  },
      //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  toArray = function toArray(value, scope, leaveStrings) {
    return _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc$1).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
  },
      selector = function selector(value) {
    value = toArray(value)[0] || _warn("Invalid scope") || {};
    return function (v) {
      var el = value.current || value.nativeElement || value;
      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$1.createElement("div") : value);
    };
  },
      shuffle = function shuffle(a) {
    return a.sort(function () {
      return .5 - Math.random();
    });
  },
      // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
  //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
  distribute = function distribute(v) {
    if (_isFunction(v)) {
      return v;
    }

    var vars = _isObject(v) ? v : {
      each: v
    },
        //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
    ease = _parseEase(vars.ease),
        from = vars.from || 0,
        base = parseFloat(vars.base) || 0,
        cache = {},
        isDecimal = from > 0 && from < 1,
        ratios = isNaN(from) || isDecimal,
        axis = vars.axis,
        ratioX = from,
        ratioY = from;

    if (_isString(from)) {
      ratioX = ratioY = {
        center: .5,
        edges: .5,
        end: 1
      }[from] || 0;
    } else if (!isDecimal && ratios) {
      ratioX = from[0];
      ratioY = from[1];
    }

    return function (i, target, a) {
      var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrapAt;

      if (!distances) {
        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];

        if (!wrapAt) {
          max = -_bigNum$1;

          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

          wrapAt--;
        }

        distances = cache[l] = [];
        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
        originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
        max = 0;
        min = _bigNum$1;

        for (j = 0; j < l; j++) {
          x = j % wrapAt - originX;
          y = originY - (j / wrapAt | 0);
          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
          d > max && (max = d);
          d < min && (min = d);
        }

        from === "random" && shuffle(distances);
        distances.max = max - min;
        distances.min = min;
        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
        distances.b = l < 0 ? base - l : base;
        distances.u = getUnit(vars.amount || vars.each) || 0; //unit

        ease = ease && l < 0 ? _invertEase(ease) : ease;
      }

      l = (distances[i] - distances.min) / distances.max || 0;
      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
    };
  },
      _roundModifier = function _roundModifier(v) {
    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

    return function (raw) {
      var n = Math.round(parseFloat(raw) / v) * v * p;
      return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
    };
  },
      snap = function snap(snapTo, value) {
    var isArray = _isArray(snapTo),
        radius,
        is2D;

    if (!isArray && _isObject(snapTo)) {
      radius = isArray = snapTo.radius || _bigNum$1;

      if (snapTo.values) {
        snapTo = toArray(snapTo.values);

        if (is2D = !_isNumber(snapTo[0])) {
          radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
        }
      } else {
        snapTo = _roundModifier(snapTo.increment);
      }
    }

    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
      is2D = snapTo(raw);
      return Math.abs(is2D - raw) <= radius ? is2D : raw;
    } : function (raw) {
      var x = parseFloat(is2D ? raw.x : raw),
          y = parseFloat(is2D ? raw.y : 0),
          min = _bigNum$1,
          closest = 0,
          i = snapTo.length,
          dx,
          dy;

      while (i--) {
        if (is2D) {
          dx = snapTo[i].x - x;
          dy = snapTo[i].y - y;
          dx = dx * dx + dy * dy;
        } else {
          dx = Math.abs(snapTo[i] - x);
        }

        if (dx < min) {
          min = dx;
          closest = i;
        }
      }

      closest = !radius || min <= radius ? snapTo[closest] : raw;
      return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
    });
  },
      random = function random(min, max, roundingIncrement, returnFunction) {
    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
    });
  },
      pipe = function pipe() {
    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
      functions[_key] = arguments[_key];
    }

    return function (value) {
      return functions.reduce(function (v, f) {
        return f(v);
      }, value);
    };
  },
      unitize = function unitize(func, unit) {
    return function (value) {
      return func(parseFloat(value)) + (unit || getUnit(value));
    };
  },
      normalize = function normalize(min, max, value) {
    return mapRange(min, max, 0, 1, value);
  },
      _wrapArray = function _wrapArray(a, wrapper, value) {
    return _conditionalReturn(value, function (index) {
      return a[~~wrapper(index)];
    });
  },
      wrap = function wrap(min, max, value) {
    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
    var range = max - min;
    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
      return (range + (value - min) % range) % range + min;
    });
  },
      wrapYoyo = function wrapYoyo(min, max, value) {
    var range = max - min,
        total = range * 2;
    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
      value = (total + (value - min) % total) % total || 0;
      return min + (value > range ? total - value : value);
    });
  },
      _replaceRandom = function _replaceRandom(value) {
    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
    var prev = 0,
        s = "",
        i,
        nums,
        end,
        isArray;

    while (~(i = value.indexOf("random(", prev))) {
      end = value.indexOf(")", i);
      isArray = value.charAt(i + 7) === "[";
      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
      prev = end + 1;
    }

    return s + value.substr(prev, value.length - prev);
  },
      mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
    var inRange = inMax - inMin,
        outRange = outMax - outMin;
    return _conditionalReturn(value, function (value) {
      return outMin + ((value - inMin) / inRange * outRange || 0);
    });
  },
      interpolate = function interpolate(start, end, progress, mutate) {
    var func = isNaN(start + end) ? 0 : function (p) {
      return (1 - p) * start + p * end;
    };

    if (!func) {
      var isString = _isString(start),
          master = {},
          p,
          i,
          interpolators,
          l,
          il;

      progress === true && (mutate = 1) && (progress = null);

      if (isString) {
        start = {
          p: start
        };
        end = {
          p: end
        };
      } else if (_isArray(start) && !_isArray(end)) {
        interpolators = [];
        l = start.length;
        il = l - 2;

        for (i = 1; i < l; i++) {
          interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
        }

        l--;

        func = function func(p) {
          p *= l;
          var i = Math.min(il, ~~p);
          return interpolators[i](p - i);
        };

        progress = end;
      } else if (!mutate) {
        start = _merge(_isArray(start) ? [] : {}, start);
      }

      if (!interpolators) {
        for (p in end) {
          _addPropTween.call(master, start, p, "get", end[p]);
        }

        func = function func(p) {
          return _renderPropTweens(p, master) || (isString ? start.p : start);
        };
      }
    }

    return _conditionalReturn(progress, func);
  },
      _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
    //used for nextLabel() and previousLabel()
    var labels = timeline.labels,
        min = _bigNum$1,
        p,
        distance,
        label;

    for (p in labels) {
      distance = labels[p] - fromTime;

      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
        label = p;
        min = distance;
      }
    }

    return label;
  },
      _callback = function _callback(animation, type, executeLazyFirst) {
    var v = animation.vars,
        callback = v[type],
        params,
        scope;

    if (!callback) {
      return;
    }

    params = v[type + "Params"];
    scope = v.callbackScope || animation;
    executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

    return params ? callback.apply(scope, params) : callback.call(scope);
  },
      _interrupt = function _interrupt(animation) {
    _removeFromParent(animation);

    animation.scrollTrigger && animation.scrollTrigger.kill(false);
    animation.progress() < 1 && _callback(animation, "onInterrupt");
    return animation;
  },
      _quickTween,
      _createPlugin = function _createPlugin(config) {
    config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

    var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
      this._props = [];
    } : config,
        //in case someone passes in an object that's not a plugin, like CustomEase
    instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    },
        statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };

    _wake();

    if (config !== Plugin) {
      if (_plugins[name]) {
        return;
      }

      _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


      _plugins[Plugin.prop = name] = Plugin;

      if (config.targetTest) {
        _harnessPlugins.push(Plugin);

        _reservedProps[name] = 1;
      }

      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
    }

    _addGlobal(name, Plugin);

    config.register && config.register(gsap, Plugin, PropTween);
  },

  /*
   * --------------------------------------------------------------------------------------
   * COLORS
   * --------------------------------------------------------------------------------------
   */
  _255 = 255,
      _colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
  },
      // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
  // let ctx = _doc.createElement("canvas").getContext("2d");
  // _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
  _hue = function _hue(h, m1, m2) {
    h += h < 0 ? 1 : h > 1 ? -1 : 0;
    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
  },
      splitColor = function splitColor(v, toHSL, forceAlpha) {
    var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
        r,
        g,
        b,
        h,
        s,
        l,
        max,
        min,
        d,
        wasHSL;

    if (!a) {
      if (v.substr(-1) === ",") {
        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
        v = v.substr(0, v.length - 1);
      }

      if (_colorLookup[v]) {
        a = _colorLookup[v];
      } else if (v.charAt(0) === "#") {
        if (v.length < 6) {
          //for shorthand like #9F0 or #9F0F (could have alpha)
          r = v.charAt(1);
          g = v.charAt(2);
          b = v.charAt(3);
          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
        }

        if (v.length === 9) {
          // hex with alpha, like #fd5e53ff
          a = parseInt(v.substr(1, 6), 16);
          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
        }

        v = parseInt(v.substr(1), 16);
        a = [v >> 16, v >> 8 & _255, v & _255];
      } else if (v.substr(0, 3) === "hsl") {
        a = wasHSL = v.match(_strictNumExp);

        if (!toHSL) {
          h = +a[0] % 360 / 360;
          s = +a[1] / 100;
          l = +a[2] / 100;
          g = l <= .5 ? l * (s + 1) : l + s - l * s;
          r = l * 2 - g;
          a.length > 3 && (a[3] *= 1); //cast as number

          a[0] = _hue(h + 1 / 3, r, g);
          a[1] = _hue(h, r, g);
          a[2] = _hue(h - 1 / 3, r, g);
        } else if (~v.indexOf("=")) {
          //if relative values are found, just return the raw strings with the relative prefixes in place.
          a = v.match(_numExp);
          forceAlpha && a.length < 4 && (a[3] = 1);
          return a;
        }
      } else {
        a = v.match(_strictNumExp) || _colorLookup.transparent;
      }

      a = a.map(Number);
    }

    if (toHSL && !wasHSL) {
      r = a[0] / _255;
      g = a[1] / _255;
      b = a[2] / _255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h *= 60;
      }

      a[0] = ~~(h + .5);
      a[1] = ~~(s * 100 + .5);
      a[2] = ~~(l * 100 + .5);
    }

    forceAlpha && a.length < 4 && (a[3] = 1);
    return a;
  },
      _colorOrderData = function _colorOrderData(v) {
    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
    var values = [],
        c = [],
        i = -1;
    v.split(_colorExp).forEach(function (v) {
      var a = v.match(_numWithUnitExp) || [];
      values.push.apply(values, a);
      c.push(i += a.length + 1);
    });
    values.c = c;
    return values;
  },
      _formatColors = function _formatColors(s, toHSL, orderMatchData) {
    var result = "",
        colors = (s + result).match(_colorExp),
        type = toHSL ? "hsla(" : "rgba(",
        i = 0,
        c,
        shell,
        d,
        l;

    if (!colors) {
      return s;
    }

    colors = colors.map(function (color) {
      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
    });

    if (orderMatchData) {
      d = _colorOrderData(s);
      c = orderMatchData.c;

      if (c.join(result) !== d.c.join(result)) {
        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
        l = shell.length - 1;

        for (; i < l; i++) {
          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
        }
      }
    }

    if (!shell) {
      shell = s.split(_colorExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + colors[i];
      }
    }

    return result + shell[l];
  },
      _colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
    p;

    for (p in _colorLookup) {
      s += "|" + p + "\\b";
    }

    return new RegExp(s + ")", "gi");
  }(),
      _hslExp = /hsl[a]?\(/,
      _colorStringFilter = function _colorStringFilter(a) {
    var combined = a.join(" "),
        toHSL;
    _colorExp.lastIndex = 0;

    if (_colorExp.test(combined)) {
      toHSL = _hslExp.test(combined);
      a[1] = _formatColors(a[1], toHSL);
      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

      return true;
    }
  },

  /*
   * --------------------------------------------------------------------------------------
   * TICKER
   * --------------------------------------------------------------------------------------
   */
  _tickerActive,
      _ticker = function () {
    var _getTime = Date.now,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _startTime = _getTime(),
        _lastUpdate = _startTime,
        _gap = 1000 / 240,
        _nextTime = _gap,
        _listeners = [],
        _id,
        _req,
        _raf,
        _self,
        _delta,
        _i,
        _tick = function _tick(v) {
      var elapsed = _getTime() - _lastUpdate,
          manual = v === true,
          overlap,
          dispatch,
          time,
          frame;

      elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
      _lastUpdate += elapsed;
      time = _lastUpdate - _startTime;
      overlap = time - _nextTime;

      if (overlap > 0 || manual) {
        frame = ++_self.frame;
        _delta = time - _self.time * 1000;
        _self.time = time = time / 1000;
        _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
        dispatch = 1;
      }

      manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

      if (dispatch) {
        for (_i = 0; _i < _listeners.length; _i++) {
          // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
          _listeners[_i](time, _delta, frame, v);
        }
      }
    };

    _self = {
      time: 0,
      frame: 0,
      tick: function tick() {
        _tick(true);
      },
      deltaRatio: function deltaRatio(fps) {
        return _delta / (1000 / (fps || 60));
      },
      wake: function wake() {
        if (_coreReady) {
          if (!_coreInitted && _windowExists$1()) {
            _win$1 = _coreInitted = window;
            _doc$1 = _win$1.document || {};
            _globals.gsap = gsap;
            (_win$1.gsapVersions || (_win$1.gsapVersions = [])).push(gsap.version);

            _install(_installScope || _win$1.GreenSockGlobals || !_win$1.gsap && _win$1 || {});

            _raf = _win$1.requestAnimationFrame;
          }

          _id && _self.sleep();

          _req = _raf || function (f) {
            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
          };

          _tickerActive = 1;

          _tick(2);
        }
      },
      sleep: function sleep() {
        (_raf ? _win$1.cancelAnimationFrame : clearTimeout)(_id);
        _tickerActive = 0;
        _req = _emptyFunc;
      },
      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
        _lagThreshold = threshold || 1 / _tinyNum; //zero should be interpreted as basically unlimited

        _adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
      },
      fps: function fps(_fps) {
        _gap = 1000 / (_fps || 240);
        _nextTime = _self.time * 1000 + _gap;
      },
      add: function add(callback, once, prioritize) {
        var func = once ? function (t, d, f, v) {
          callback(t, d, f, v);

          _self.remove(func);
        } : callback;

        _self.remove(callback);

        _listeners[prioritize ? "unshift" : "push"](func);

        _wake();

        return func;
      },
      remove: function remove(callback, i) {
        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
      },
      _listeners: _listeners
    };
    return _self;
  }(),
      _wake = function _wake() {
    return !_tickerActive && _ticker.wake();
  },
      //also ensures the core classes are initialized.

  /*
  * -------------------------------------------------
  * EASING
  * -------------------------------------------------
  */
  _easeMap = {},
      _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
      _quotesExp = /["']/g,
      _parseObjectInString = function _parseObjectInString(value) {
    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
    var obj = {},
        split = value.substr(1, value.length - 3).split(":"),
        key = split[0],
        i = 1,
        l = split.length,
        index,
        val,
        parsedVal;

    for (; i < l; i++) {
      val = split[i];
      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
      parsedVal = val.substr(0, index);
      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
      key = val.substr(index + 1).trim();
    }

    return obj;
  },
      _valueInParentheses = function _valueInParentheses(value) {
    var open = value.indexOf("(") + 1,
        close = value.indexOf(")"),
        nested = value.indexOf("(", open);
    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
  },
      _configEaseFromString = function _configEaseFromString(name) {
    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
    var split = (name + "").split("("),
        ease = _easeMap[split[0]];
    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
  },
      _invertEase = function _invertEase(ease) {
    return function (p) {
      return 1 - ease(1 - p);
    };
  },
      // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
  _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
    var child = timeline._first,
        ease;

    while (child) {
      if (child instanceof Timeline) {
        _propagateYoyoEase(child, isYoyo);
      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
        if (child.timeline) {
          _propagateYoyoEase(child.timeline, isYoyo);
        } else {
          ease = child._ease;
          child._ease = child._yEase;
          child._yEase = ease;
          child._yoyo = isYoyo;
        }
      }

      child = child._next;
    }
  },
      _parseEase = function _parseEase(ease, defaultEase) {
    return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
  },
      _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
    if (easeOut === void 0) {
      easeOut = function easeOut(p) {
        return 1 - easeIn(1 - p);
      };
    }

    if (easeInOut === void 0) {
      easeInOut = function easeInOut(p) {
        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
      };
    }

    var ease = {
      easeIn: easeIn,
      easeOut: easeOut,
      easeInOut: easeInOut
    },
        lowercaseName;

    _forEachName(names, function (name) {
      _easeMap[name] = _globals[name] = ease;
      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

      for (var p in ease) {
        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
      }
    });

    return ease;
  },
      _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
    return function (p) {
      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
    };
  },
      _configElastic = function _configElastic(type, amplitude, period) {
    var p1 = amplitude >= 1 ? amplitude : 1,
        //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
    p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = function easeOut(p) {
      return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    p2 = _2PI / p2; //precalculate to optimize

    ease.config = function (amplitude, period) {
      return _configElastic(type, amplitude, period);
    };

    return ease;
  },
      _configBack = function _configBack(type, overshoot) {
    if (overshoot === void 0) {
      overshoot = 1.70158;
    }

    var easeOut = function easeOut(p) {
      return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
    },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
      return 1 - easeOut(1 - p);
    } : _easeInOutFromOut(easeOut);

    ease.config = function (overshoot) {
      return _configBack(type, overshoot);
    };

    return ease;
  }; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
  // _weightedEase = ratio => {
  // 	let y = 0.5 + ratio / 2;
  // 	return p => (2 * (1 - p) * p * y + p * p);
  // },
  // a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
  // _weightedEaseStrong = ratio => {
  // 	ratio = .5 + ratio / 2;
  // 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
  // 		b = ratio - o,
  // 		c = ratio + o;
  // 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
  // };


  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
    var power = i < 5 ? i + 1 : i;

    _insertEase(name + ",Power" + (power - 1), i ? function (p) {
      return Math.pow(p, power);
    } : function (p) {
      return p;
    }, function (p) {
      return 1 - Math.pow(1 - p, power);
    }, function (p) {
      return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });

  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

  (function (n, c) {
    var n1 = 1 / c,
        n2 = 2 * n1,
        n3 = 2.5 * n1,
        easeOut = function easeOut(p) {
      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
    };

    _insertEase("Bounce", function (p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);

  _insertEase("Expo", function (p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });

  _insertEase("Circ", function (p) {
    return -(_sqrt(1 - p * p) - 1);
  });

  _insertEase("Sine", function (p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });

  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }

      var p1 = 1 / steps,
          p2 = steps + (immediateStart ? 0 : 1),
          p3 = immediateStart ? 1 : 0,
          max = 1 - _tinyNum;
      return function (p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];

  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  /*
   * --------------------------------------------------------------------------------------
   * CACHE
   * --------------------------------------------------------------------------------------
   */


  var GSCache = function GSCache(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  /*
   * --------------------------------------------------------------------------------------
   * ANIMATION
   * --------------------------------------------------------------------------------------
   */

  var Animation = /*#__PURE__*/function () {
    function Animation(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;

      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }

      this._ts = 1;

      _setDuration(this, +vars.duration, 1, 1);

      this.data = vars.data;
      _tickerActive || _ticker.wake();
    }

    var _proto = Animation.prototype;

    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }

      return this._delay;
    };

    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };

    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }

      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };

    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();

      if (!arguments.length) {
        return this._tTime;
      }

      var parent = this._dp;

      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);

        !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
        //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }

          parent = parent.parent;
        }

        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }

      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
        this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
        //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
        //   this._lock = 1;

        _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
        //}

      }

      return this;
    };

    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
    };

    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };

    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };

    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;

      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    } // potential future addition:
    // isPlayingBackwards() {
    // 	let animation = this,
    // 		orientation = 1; // 1 = forward, -1 = backward
    // 	while (animation) {
    // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
    // 		animation = animation.parent;
    // 	}
    // 	return orientation < 0;
    // }
    ;

    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
      }

      if (this._rts === value) {
        return this;
      }

      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
      // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
      //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
      // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

      this.totalTime(_clamp(-this._delay, this._tDur, tTime), true);

      _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


      return _recacheAncestors(this);
    };

    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }

      if (this._ps !== value) {
        this._ps = value;

        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

          this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
        } else {
          _wake();

          this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
        }
      }

      return this;
    };

    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }

      return this._start;
    };

    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };

    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp; // _dp = detached parent

      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };

    _proto.globalTime = function globalTime(rawTime) {
      var animation = this,
          time = arguments.length ? rawTime : animation.rawTime();

      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }

      return time;
    };

    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }

      return this._repeat === -2 ? Infinity : this._repeat;
    };

    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;

        _onUpdateTotalDuration(this);

        return time ? this.time(time) : this;
      }

      return this._rDelay;
    };

    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }

      return this._yoyo;
    };

    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };

    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };

    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };

    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };

    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };

    _proto.resume = function resume() {
      return this.paused(false);
    };

    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

        return this;
      }

      return this._rts < 0;
    };

    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };

    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp,
          start = this._start,
          rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };

    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;

      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }

        return this;
      }

      return vars[type];
    };

    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function (resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
            _resolve = function _resolve() {
          var _then = self.then;
          self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

          _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
          resolve(f);
          self.then = _then;
        };

        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };

    _proto.kill = function kill() {
      _interrupt(this);
    };

    return Animation;
  }();

  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  /*
   * -------------------------------------------------
   * TIMELINE
   * -------------------------------------------------
   */


  var Timeline = /*#__PURE__*/function (_Animation) {
    _inheritsLoose(Timeline, _Animation);

    function Timeline(vars, position) {
      var _this;

      if (vars === void 0) {
        vars = {};
      }

      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }

    var _proto2 = Timeline.prototype;

    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);

      return this;
    };

    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);

      return this;
    };

    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);

      return this;
    };

    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };

    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    } //ONLY for backward compatibility! Maybe delete?
    ;

    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };

    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };

    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._dirty ? this.totalDuration() : this._tDur,
          dur = this._dur,
          tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
          // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
      crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
          time,
          child,
          next,
          iteration,
          cycleDuration,
          prevPaused,
          pauseTween,
          timeScale,
          prevStart,
          prevIteration,
          yoyo,
          isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }

        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;

        if (crossingStart) {
          dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }

        if (this._repeat) {
          //adjust the time for repeats and yoyos
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;

          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }

          time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

          if (tTime === tDur) {
            // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005

          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          /*
          make sure children at the end/beginning of the timeline are rendered properly. If, for example,
          a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
          would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
          could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
          we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
          ensure that zero-duration tweens at the very beginning or end of the Timeline work.
          */


          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1,
                doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
              return this;
            }

            dur = this._dur; // in case the duration changed in the onRepeat

            tDur = this._tDur;

            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -0.0001;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }

            this._lock = 0;

            if (!this._ts && !prevPaused) {
              return this;
            } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


            _propagateYoyoEase(this, isYoyo);
          }
        }

        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }

        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
        }

        if (!prevTime && time && !suppressEvents) {
          _callback(this, "onStart");

          if (this._tTime !== tTime) {
            // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
            return this;
          }
        }

        if (time >= prevTime && totalTime >= 0) {
          child = this._first;

          while (child) {
            next = child._next;

            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

                break;
              }
            }

            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

          while (child) {
            next = child._prev;

            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
                return this.render(totalTime, suppressEvents, force);
              }

              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force);

              if (time !== this._time || !this._ts && !prevPaused) {
                //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

                break;
              }
            }

            child = next;
          }
        }

        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

          if (this._ts) {
            //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
            this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

            _setEnd(this);

            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
          // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
          (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
            _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto2.add = function add(child, position) {
      var _this2 = this;

      _isNumber(position) || (position = _parsePosition(this, position, child));

      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function (obj) {
            return _this2.add(obj, position);
          });
          return this;
        }

        if (_isString(child)) {
          return this.addLabel(child, position);
        }

        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }

      return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
    };

    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }

      if (tweens === void 0) {
        tweens = true;
      }

      if (timelines === void 0) {
        timelines = true;
      }

      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum$1;
      }

      var a = [],
          child = this._first;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }

        child = child._next;
      }

      return a;
    };

    _proto2.getById = function getById(id) {
      var animations = this.getChildren(1, 1, 1),
          i = animations.length;

      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };

    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }

      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }

      _removeLinkedListItem(this, child);

      if (child === this._recent) {
        this._recent = this._last;
      }

      return _uncache(this);
    };

    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }

      this._forcing = 1;

      if (!this._dp && this._ts) {
        //special case for the global timeline (or any other that has no parent or detached parent).
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }

      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

      this._forcing = 0;
      return this;
    };

    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };

    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };

    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };

    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);

      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }

        child = child._next;
      }
    };

    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive),
          i = tweens.length;

      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }

      return this;
    };

    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
      var a = [],
          parsedTargets = toArray(targets),
          child = this._first,
          isGlobalTime = _isNumber(onlyActive),
          // a number is interpreted as a global time. If the animation spans
      children;

      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }

        child = child._next;
      }

      return a;
    } // potential future feature - targets() on timelines
    // targets() {
    // 	let result = [];
    // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
    // 	return result.filter((v, i) => result.indexOf(v) === i);
    // }
    ;

    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};

      var tl = this,
          endTime = _parsePosition(tl, position),
          _vars = vars,
          startAt = _vars.startAt,
          _onStart = _vars.onStart,
          onStartParams = _vars.onStartParams,
          immediateRender = _vars.immediateRender,
          initted,
          tween = Tween.to(tl, _setDefaults({
        ease: vars.ease || "none",
        lazy: false,
        immediateRender: false,
        time: endTime,
        overwrite: "auto",
        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
        onStart: function onStart() {
          tl.pause();

          if (!initted) {
            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
            initted = 1;
          }

          _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
        }
      }, vars));

      return immediateRender ? tween.render(0) : tween;
    };

    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };

    _proto2.recent = function recent() {
      return this._recent;
    };

    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };

    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }

      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };

    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };

    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }

      var child = this._first,
          labels = this.labels,
          p;

      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }

        child = child._next;
      }

      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }

      return _uncache(this);
    };

    _proto2.invalidate = function invalidate() {
      var child = this._first;
      this._lock = 0;

      while (child) {
        child.invalidate();
        child = child._next;
      }

      return _Animation.prototype.invalidate.call(this);
    };

    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }

      var child = this._first,
          next;

      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }

      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };

    _proto2.totalDuration = function totalDuration(value) {
      var max = 0,
          self = this,
          child = self._last,
          prevStart = _bigNum$1,
          prev,
          start,
          parent;

      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }

      if (self._dirty) {
        parent = self.parent;

        while (child) {
          prev = child._prev; //record it here in case the tween changes position in the sequence...

          child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

          start = child._start;

          if (start > prevStart && self._sort && child._ts && !self._lock) {
            //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
            self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }

          if (start < 0 && child._ts) {
            //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
            max -= start;

            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }

            self.shiftChildren(-start, false, -1e999);
            prevStart = 0;
          }

          child._end > max && child._ts && (max = child._end);
          child = prev;
        }

        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

        self._dirty = 0;
      }

      return self._tDur;
    };

    Timeline.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

        _lastRenderedFrame = _ticker.frame;
      }

      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }

          child || _ticker.sleep();
        }
      }
    };

    return Timeline;
  }(Animation);

  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });

  var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
        index = 0,
        matchIndex = 0,
        result,
        startNums,
        color,
        endNum,
        chunk,
        startNum,
        hasRandom,
        a;
    pt.b = start;
    pt.e = end;
    start += ""; //ensure values are strings

    end += "";

    if (hasRandom = ~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (stringFilter) {
      a = [start, end];
      stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

      start = a[0];
      end = a[1];
    }

    startNums = start.match(_complexStringNumExp) || [];

    while (result = _complexStringNumExp.exec(end)) {
      endNum = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(") {
        color = 1;
      }

      if (endNum !== startNums[matchIndex++]) {
        startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
          m: color && color < 4 ? Math.round : 0
        };
        index = _complexStringNumExp.lastIndex;
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

    pt.fp = funcParam;

    if (_relExp.test(end) || hasRandom) {
      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
    }

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

    return pt;
  },
      _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam) {
    _isFunction(end) && (end = end(index || 0, target, targets));
    var currentValue = target[prop],
        parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
        setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
        pt;

    if (_isString(end)) {
      if (~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }

      if (end.charAt(1) === "=") {
        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

        if (pt || pt === 0) {
          // to avoid isNaN, like if someone passes in a value like "!= whatever"
          end = pt;
        }
      }
    }

    if (parsedStart !== end || _forceAllPropTweens) {
      if (!isNaN(parsedStart * end) && end !== "") {
        // fun fact: any number multiplied by "" is evaluated as the number 0!
        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
        funcParam && (pt.fp = funcParam);
        modifier && pt.modifier(modifier, this, target);
        return this._pt = pt;
      }

      !currentValue && !(prop in target) && _missingPlugin(prop, end);
      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
    }
  },
      //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
  _processVars = function _processVars(vars, index, target, targets, tween) {
    _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

    if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
      return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
    }

    var copy = {},
        p;

    for (p in vars) {
      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
    }

    return copy;
  },
      _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
    var plugin, pt, ptLookup, i;

    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

      if (tween !== _quickTween) {
        ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

        i = plugin._props.length;

        while (i--) {
          ptLookup[plugin._props[i]] = pt;
        }
      }
    }

    return plugin;
  },
      _overwritingTween,
      //store a reference temporarily so we can avoid overwriting itself.
  _forceAllPropTweens,
      _initTween = function _initTween(tween, time) {
    var vars = tween.vars,
        ease = vars.ease,
        startAt = vars.startAt,
        immediateRender = vars.immediateRender,
        lazy = vars.lazy,
        onUpdate = vars.onUpdate,
        onUpdateParams = vars.onUpdateParams,
        callbackScope = vars.callbackScope,
        runBackwards = vars.runBackwards,
        yoyoEase = vars.yoyoEase,
        keyframes = vars.keyframes,
        autoRevert = vars.autoRevert,
        dur = tween._dur,
        prevStartAt = tween._startAt,
        targets = tween._targets,
        parent = tween.parent,
        fullTargets = parent && parent.data === "nested" ? parent.parent._targets : targets,
        autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
        tl = tween.timeline,
        cleanVars,
        i,
        p,
        pt,
        target,
        hasPriority,
        gsData,
        harness,
        plugin,
        ptLookup,
        index,
        harnessVars,
        overwritten;
    tl && (!keyframes || !ease) && (ease = "none");
    tween._ease = _parseEase(ease, _defaults.ease);
    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

    if (yoyoEase && tween._yoyo && !tween._repeat) {
      //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
      yoyoEase = tween._yEase;
      tween._yEase = tween._ease;
      tween._ease = yoyoEase;
    }

    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

    if (!tl || keyframes && !vars.stagger) {
      //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
      harness = targets[0] ? _getCache(targets[0]).harness : 0;
      harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

      cleanVars = _copyExcluding(vars, _reservedProps);

      if (prevStartAt) {
        _removeFromParent(prevStartAt.render(-1, true));

        prevStartAt._lazy = 0;
      }

      if (startAt) {
        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
          data: "isStart",
          overwrite: false,
          parent: parent,
          immediateRender: true,
          lazy: _isNotFalse(lazy),
          startAt: null,
          delay: 0,
          onUpdate: onUpdate,
          onUpdateParams: onUpdateParams,
          callbackScope: callbackScope,
          stagger: 0
        }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


        time < 0 && !immediateRender && !autoRevert && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

        if (immediateRender) {
          time > 0 && !autoRevert && (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.

          if (dur && time <= 0) {
            time && (tween._zTime = time);
            return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
          } // if (time > 0) {
          // 	autoRevert || (tween._startAt = 0); //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in Timeline instances where immediateRender was false or when autoRevert is explicitly set to true.
          // } else if (dur && !(time < 0 && prevStartAt)) {
          // 	time && (tween._zTime = time);
          // 	return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
          // }

        } else if (autoRevert === false) {
          tween._startAt = 0;
        }
      } else if (runBackwards && dur) {
        //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
        if (prevStartAt) {
          !autoRevert && (tween._startAt = 0);
        } else {
          time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

          p = _setDefaults({
            overwrite: false,
            data: "isFromStart",
            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
            lazy: immediateRender && _isNotFalse(lazy),
            immediateRender: immediateRender,
            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
            stagger: 0,
            parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

          }, cleanVars);
          harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

          _removeFromParent(tween._startAt = Tween.set(targets, p));

          time < 0 && tween._startAt.render(-1, true); // rare edge case, like if a render is forced in the negative direction of a non-initted from() tween.

          tween._zTime = time;

          if (!immediateRender) {
            _initTween(tween._startAt, _tinyNum); //ensures that the initial values are recorded

          } else if (!time) {
            return;
          }
        }
      }

      tween._pt = tween._ptCache = 0;
      lazy = dur && _isNotFalse(lazy) || lazy && !dur;

      for (i = 0; i < targets.length; i++) {
        target = targets[i];
        gsData = target._gsap || _harness(targets)[i]._gsap;
        tween._ptLookup[i] = ptLookup = {};
        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

        index = fullTargets === targets ? i : fullTargets.indexOf(target);

        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

          plugin._props.forEach(function (name) {
            ptLookup[name] = pt;
          });

          plugin.priority && (hasPriority = 1);
        }

        if (!harness || harnessVars) {
          for (p in cleanVars) {
            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
              plugin.priority && (hasPriority = 1);
            } else {
              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
            }
          }
        }

        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

        if (autoOverwrite && tween._pt) {
          _overwritingTween = tween;

          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


          overwritten = !tween.parent;
          _overwritingTween = 0;
        }

        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
      }

      hasPriority && _sortPropTweensByPriority(tween);
      tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
    }

    tween._onUpdate = onUpdate;
    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

    keyframes && time <= 0 && tl.render(_bigNum$1, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
  },
      _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
        pt,
        lookup,
        i;

    if (!ptCache) {
      ptCache = tween._ptCache[property] = [];
      lookup = tween._ptLookup;
      i = tween._targets.length;

      while (i--) {
        pt = lookup[i][property];

        if (pt && pt.d && pt.d._pt) {
          // it's a plugin, so find the nested PropTween
          pt = pt.d._pt;

          while (pt && pt.p !== property) {
            pt = pt._next;
          }
        }

        if (!pt) {
          // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
          // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
          _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

          tween.vars[property] = "+=0";

          _initTween(tween, time);

          _forceAllPropTweens = 0;
          return 1;
        }

        ptCache.push(pt);
      }
    }

    i = ptCache.length;

    while (i--) {
      pt = ptCache[i];
      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
      pt.c = value - pt.s;
      pt.e && (pt.e = _round(value) + getUnit(pt.e)); // mainly for CSSPlugin (end value)

      pt.b && (pt.b = pt.s + getUnit(pt.b)); // (beginning value)
    }
  },
      _addAliasesToVars = function _addAliasesToVars(targets, vars) {
    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
        propertyAliases = harness && harness.aliases,
        copy,
        p,
        i,
        aliases;

    if (!propertyAliases) {
      return vars;
    }

    copy = _merge({}, vars);

    for (p in propertyAliases) {
      if (p in copy) {
        aliases = propertyAliases[p].split(",");
        i = aliases.length;

        while (i--) {
          copy[aliases[i]] = copy[p];
        }
      }
    }

    return copy;
  },
      // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
  _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
    var ease = obj.ease || easeEach || "power1.inOut",
        p,
        a;

    if (_isArray(obj)) {
      a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

      obj.forEach(function (value, i) {
        return a.push({
          t: i / (obj.length - 1) * 100,
          v: value,
          e: ease
        });
      });
    } else {
      for (p in obj) {
        a = allProps[p] || (allProps[p] = []);
        p === "ease" || a.push({
          t: parseFloat(prop),
          v: obj[p],
          e: ease
        });
      }
    }
  },
      _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
    return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
  },
      _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
      _staggerPropsToSkip = {};

  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
    return _staggerPropsToSkip[name] = 1;
  });
  /*
   * --------------------------------------------------------------------------------------
   * TWEEN
   * --------------------------------------------------------------------------------------
   */


  var Tween = /*#__PURE__*/function (_Animation2) {
    _inheritsLoose(Tween, _Animation2);

    function Tween(targets, vars, position, skipInherit) {
      var _this3;

      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }

      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars,
          duration = _this3$vars.duration,
          delay = _this3$vars.delay,
          immediateRender = _this3$vars.immediateRender,
          stagger = _this3$vars.stagger,
          overwrite = _this3$vars.overwrite,
          keyframes = _this3$vars.keyframes,
          defaults = _this3$vars.defaults,
          scrollTrigger = _this3$vars.scrollTrigger,
          yoyoEase = _this3$vars.yoyoEase,
          parent = vars.parent || _globalTimeline,
          parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
          tl,
          i,
          copy,
          l,
          p,
          curTarget,
          staggerFunc,
          staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

      _this3._overwrite = overwrite;

      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults || {}
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;

        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);

          if (_isObject(stagger)) {
            //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }

          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

            if (!stagger && l === 1 && copy.delay) {
              // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }

            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }

          tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));

          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0,
              a,
              kf,
              v;

          if (_isArray(keyframes)) {
            keyframes.forEach(function (frame) {
              return tl.to(parsedTargets, frame, ">");
            });
          } else {
            copy = {};

            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }

            for (p in copy) {
              a = copy[p].sort(function (a, b) {
                return a.t - b.t;
              });
              time = 0;

              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }

            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            }); // in case keyframes didn't go to 100%
          }
        }

        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
      }

      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);

        _globalTimeline.killTweensOf(parsedTargets);

        _overwritingTween = 0;
      }

      _addToTimeline(parent, _assertThisInitialized(_this3), position);

      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);

      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

        _this3.render(Math.max(0, -delay)); //in case delay is negative

      }

      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }

    var _proto3 = Tween.prototype;

    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
          tDur = this._tDur,
          dur = this._dur,
          tTime = totalTime > tDur - _tinyNum && totalTime >= 0 ? tDur : totalTime < _tinyNum ? 0 : totalTime,
          time,
          pt,
          iteration,
          cycleDuration,
          prevIteration,
          isYoyo,
          ratio,
          timeline,
          yoyoEase;

      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== totalTime < 0) {
        //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
        time = tTime;
        timeline = this.timeline;

        if (this._repeat) {
          //adjust the time for repeats and yoyos
          cycleDuration = dur + this._rDelay;

          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }

          time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

          if (tTime === tDur) {
            // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);

            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }

            time > dur && (time = dur);
          }

          isYoyo = this._yoyo && iteration & 1;

          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }

          prevIteration = _animationCycle(this._tTime, cycleDuration);

          if (time === prevTime && !force && this._initted) {
            //could be during the repeatDelay part. No need to render and fire callbacks.
            this._tTime = tTime;
            return this;
          }

          if (iteration !== prevIteration) {
            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }

        if (!this._initted) {
          if (_attemptInitTween(this, totalTime < 0 ? totalTime : time, force, suppressEvents)) {
            this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

            return this;
          }

          if (prevTime !== this._time) {
            // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
            return this;
          }

          if (dur !== this._dur) {
            // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
            return this.render(totalTime, suppressEvents, force);
          }
        }

        this._tTime = tTime;
        this._time = time;

        if (!this._act && this._ts) {
          this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

          this._lazy = 0;
        }

        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }

        if (time && !prevTime && !suppressEvents) {
          _callback(this, "onStart");

          if (this._tTime !== tTime) {
            // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
            return this;
          }
        }

        pt = this._pt;

        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }

        timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

        if (this._onUpdate && !suppressEvents) {
          totalTime < 0 && this._startAt && this._startAt.render(totalTime, true, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

          _callback(this, "onUpdate");
        }

        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          totalTime < 0 && this._startAt && !this._onUpdate && this._startAt.render(totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime)) {
            // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }

      return this;
    };

    _proto3.targets = function targets() {
      return this._targets;
    };

    _proto3.invalidate = function invalidate() {
      this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate();
      return _Animation2.prototype.invalidate.call(this);
    };

    _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
          ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
      // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
      // if (_isObject(property)) { // performance optimization
      // 	for (p in property) {
      // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
      // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
      // 		}
      // 	}
      // } else {

      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
        return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
      } //}


      _alignPlayhead(this, 0);

      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };

    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }

      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }

      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

        return this;
      }

      var parsedTargets = this._targets,
          killingTargets = targets ? toArray(targets) : parsedTargets,
          propTweenLookup = this._ptLookup,
          firstPT = this._pt,
          overwrittenProps,
          curLookup,
          curOverwriteProps,
          props,
          p,
          pt,
          i;

      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }

      overwrittenProps = this._op = this._op || [];

      if (vars !== "all") {
        //so people can pass in a comma-delimited list of property names
        if (_isString(vars)) {
          p = {};

          _forEachName(vars, function (name) {
            return p[name] = 1;
          });

          vars = p;
        }

        vars = _addAliasesToVars(parsedTargets, vars);
      }

      i = parsedTargets.length;

      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];

          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }

          for (p in props) {
            pt = curLookup && curLookup[p];

            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }

              delete curLookup[p];
            }

            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }

      this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

      return this;
    };

    Tween.to = function to(targets, vars) {
      return new Tween(targets, vars, arguments[2]);
    };

    Tween.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };

    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay: delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };

    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };

    Tween.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween(targets, vars);
    };

    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };

    return Tween;
  }(Animation);

  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  }); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
  // _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
  // 	Tween.prototype[name] = function() {
  // 		let tl = new Timeline();
  // 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
  // 	}
  // });
  //for backward compatibility. Leverage the timeline calls.


  _forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
    Tween[name] = function () {
      var tl = new Timeline(),
          params = _slice.call(arguments, 0);

      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  /*
   * --------------------------------------------------------------------------------------
   * PROPTWEEN
   * --------------------------------------------------------------------------------------
   */


  var _setterPlain = function _setterPlain(target, property, value) {
    return target[property] = value;
  },
      _setterFunc = function _setterFunc(target, property, value) {
    return target[property](value);
  },
      _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
    return target[property](data.fp, value);
  },
      _setterAttribute = function _setterAttribute(target, property, value) {
    return target.setAttribute(property, value);
  },
      _getSetter = function _getSetter(target, property) {
    return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
  },
      _renderPlain = function _renderPlain(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
  },
      _renderBoolean = function _renderBoolean(ratio, data) {
    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
  },
      _renderComplexString = function _renderComplexString(ratio, data) {
    var pt = data._pt,
        s = "";

    if (!ratio && data.b) {
      //b = beginning string
      s = data.b;
    } else if (ratio === 1 && data.e) {
      //e = ending string
      s = data.e;
    } else {
      while (pt) {
        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

        pt = pt._next;
      }

      s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
    }

    data.set(data.t, data.p, s, data);
  },
      _renderPropTweens = function _renderPropTweens(ratio, data) {
    var pt = data._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
  },
      _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
    var pt = this._pt,
        next;

    while (pt) {
      next = pt._next;
      pt.p === property && pt.modifier(modifier, tween, target);
      pt = next;
    }
  },
      _killPropTweensOf = function _killPropTweensOf(property) {
    var pt = this._pt,
        hasNonDependentRemaining,
        next;

    while (pt) {
      next = pt._next;

      if (pt.p === property && !pt.op || pt.op === property) {
        _removeLinkedListItem(this, pt, "_pt");
      } else if (!pt.dep) {
        hasNonDependentRemaining = 1;
      }

      pt = next;
    }

    return !hasNonDependentRemaining;
  },
      _setterWithModifier = function _setterWithModifier(target, property, value, data) {
    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
  },
      _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
    var pt = parent._pt,
        next,
        pt2,
        first,
        last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

    while (pt) {
      next = pt._next;
      pt2 = first;

      while (pt2 && pt2.pr > pt.pr) {
        pt2 = pt2._next;
      }

      if (pt._prev = pt2 ? pt2._prev : last) {
        pt._prev._next = pt;
      } else {
        first = pt;
      }

      if (pt._next = pt2) {
        pt2._prev = pt;
      } else {
        last = pt;
      }

      pt = next;
    }

    parent._pt = first;
  }; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


  var PropTween = /*#__PURE__*/function () {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;

      if (next) {
        next._prev = this;
      }
    }

    var _proto4 = PropTween.prototype;

    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target; //modifier target

      this.tween = tween;
    };

    return PropTween;
  }(); //Initialization tasks

  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
    return _reservedProps[name] = 1;
  });

  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  /*
   * --------------------------------------------------------------------------------------
   * GSAP
   * --------------------------------------------------------------------------------------
   */

  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(function (config) {
        return _createPlugin(config);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

      var getter = _getCache(target || {}).get,
          format = unit ? _passThrough : _numericIfPossible;

      unit === "native" && (unit = "");
      return !target ? target : !property ? function (property, unit, uncache) {
        return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);

      if (target.length > 1) {
        var setters = target.map(function (t) {
          return gsap.quickSetter(t, property, unit);
        }),
            l = setters.length;
        return function (value) {
          var i = l;

          while (i--) {
            setters[i](value);
          }
        };
      }

      target = target[0] || {};

      var Plugin = _plugins[property],
          cache = _getCache(target),
          p = cache.harness && (cache.harness.aliases || {})[property] || property,
          // in case it's an alias, like "rotate" for "rotation".
      setter = Plugin ? function (value) {
        var p = new Plugin();
        _quickTween._pt = 0;
        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
        p.render(1, p);
        _quickTween._pt && _renderPropTweens(1, _quickTween);
      } : cache.set(target, p);

      return Plugin ? setter : function (value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _merge2;

      var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
          func = function func(value, start, startIsRelative) {
        return tween.resetTo(property, value, start, startIsRelative);
      };

      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name,
          effect = _ref3.effect,
          plugins = _ref3.plugins,
          defaults = _ref3.defaults,
          extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function (pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });

      _effects[name] = function (targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
      };

      if (extendTimeline) {
        Timeline.prototype[name] = function (targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }

      var tl = new Timeline(vars),
          child,
          next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

      _globalTimeline.remove(tl);

      tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;

      while (child) {
        next = child._next;

        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }

        child = next;
      }

      _addToTimeline(_globalTimeline, tl, 0);

      return tl;
    },
    utils: {
      wrap: wrap,
      wrapYoyo: wrapYoyo,
      distribute: distribute,
      random: random,
      snap: snap,
      normalize: normalize,
      getUnit: getUnit,
      clamp: clamp,
      splitColor: splitColor,
      toArray: toArray,
      selector: selector,
      mapRange: mapRange,
      pipe: pipe,
      unitize: unitize,
      interpolate: interpolate,
      shuffle: shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween: PropTween,
      globals: _addGlobal,
      Tween: Tween,
      Timeline: Timeline,
      Animation: Animation,
      getCache: _getCache,
      _removeLinkedListItem: _removeLinkedListItem,
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };

  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
    return _gsap[name] = Tween[name];
  });

  _ticker.add(Timeline.updateRoot);

  _quickTween = _gsap.to({}, {
    duration: 0
  }); // ---- EXTRA PLUGINS --------------------------------------------------------

  var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
    var pt = plugin._pt;

    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
      pt = pt._next;
    }

    return pt;
  },
      _addModifiers = function _addModifiers(tween, modifiers) {
    var targets = tween._targets,
        p,
        i,
        pt;

    for (p in modifiers) {
      i = targets.length;

      while (i--) {
        pt = tween._ptLookup[i][p];

        if (pt && (pt = pt.d)) {
          if (pt._pt) {
            // is a plugin
            pt = _getPluginPropTween(pt, p);
          }

          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
        }
      }
    }
  },
      _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
    return {
      name: name,
      rawVars: 1,
      //don't pre-process function-based values or "random()" strings.
      init: function init(target, vars, tween) {
        tween._onInit = function (tween) {
          var temp, p;

          if (_isString(vars)) {
            temp = {};

            _forEachName(vars, function (name) {
              return temp[name] = 1;
            }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


            vars = temp;
          }

          if (modifier) {
            temp = {};

            for (p in vars) {
              temp[p] = modifier(vars[p]);
            }

            vars = temp;
          }

          _addModifiers(tween, vars);
        };
      }
    };
  }; //register core plugins


  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt;

      for (p in vars) {
        pt = this.add(target, "setAttribute", (target.getAttribute(p) || 0) + "", vars[p], index, targets, 0, 0, p);
        pt && (pt.op = p);

        this._props.push(p);
      }
    }
  }, {
    name: "endArray",
    init: function init(target, value) {
      var i = value.length;

      while (i--) {
        this.add(target, i, target[i] || 0, value[i]);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

  Tween.version = Timeline.version = gsap.version = "3.10.4";
  _coreReady = 1;
  _windowExists$1() && _wake();
  _easeMap.Power0;
      _easeMap.Power1;
      _easeMap.Power2;
      _easeMap.Power3;
      _easeMap.Power4;
      _easeMap.Linear;
      _easeMap.Quad;
      _easeMap.Cubic;
      _easeMap.Quart;
      _easeMap.Quint;
      _easeMap.Strong;
      _easeMap.Elastic;
      _easeMap.Back;
      _easeMap.SteppedEase;
      _easeMap.Bounce;
      _easeMap.Sine;
      _easeMap.Expo;
      _easeMap.Circ;

  /*!
   * CSSPlugin 3.10.4
   * https://greensock.com
   *
   * Copyright 2008-2022, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */

  var _win,
      _doc,
      _docElement,
      _pluginInitted,
      _tempDiv,
      _recentSetterPlugin,
      _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
      _transformProps = {},
      _RAD2DEG = 180 / Math.PI,
      _DEG2RAD = Math.PI / 180,
      _atan2 = Math.atan2,
      _bigNum = 1e8,
      _capsExp = /([A-Z])/g,
      _horizontalExp = /(left|right|width|margin|padding|x)/i,
      _complexExp = /[\s,\(]\S/,
      _propertyAliases = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
  },
      _renderCSSProp = function _renderCSSProp(ratio, data) {
    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
  },
      _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
  },
      //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
  _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
    var value = data.s + data.c * ratio;
    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
  },
      _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
  },
      _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
  },
      _setterCSSStyle = function _setterCSSStyle(target, property, value) {
    return target.style[property] = value;
  },
      _setterCSSProp = function _setterCSSProp(target, property, value) {
    return target.style.setProperty(property, value);
  },
      _setterTransform = function _setterTransform(target, property, value) {
    return target._gsap[property] = value;
  },
      _setterScale = function _setterScale(target, property, value) {
    return target._gsap.scaleX = target._gsap.scaleY = value;
  },
      _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache.scaleX = cache.scaleY = value;
    cache.renderTransform(ratio, cache);
  },
      _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
    var cache = target._gsap;
    cache[property] = value;
    cache.renderTransform(ratio, cache);
  },
      _transformProp = "transform",
      _transformOriginProp = _transformProp + "Origin",
      _supports3D,
      _createElement = function _createElement(type, ns) {
    var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

    return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
      _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
    var cs = getComputedStyle(target);
    return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
  },
      _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
      _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
    var e = element || _tempDiv,
        s = e.style,
        i = 5;

    if (property in s && !preferPrefix) {
      return property;
    }

    property = property.charAt(0).toUpperCase() + property.substr(1);

    while (i-- && !(_prefixes[i] + property in s)) {}

    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
  },
      _initCore = function _initCore() {
    if (_windowExists() && window.document) {
      _win = window;
      _doc = _win.document;
      _docElement = _doc.documentElement;
      _tempDiv = _createElement("div") || {
        style: {}
      };
      _createElement("div");
      _transformProp = _checkPropPrefix(_transformProp);
      _transformOriginProp = _transformProp + "Origin";
      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

      _supports3D = !!_checkPropPrefix("perspective");
      _pluginInitted = 1;
    }
  },
      _getBBoxHack = function _getBBoxHack(swapIfPossible) {
    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
    var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;

    _docElement.appendChild(svg);

    svg.appendChild(this);
    this.style.display = "block";

    if (swapIfPossible) {
      try {
        bbox = this.getBBox();
        this._gsapBBox = this.getBBox; //store the original

        this.getBBox = _getBBoxHack;
      } catch (e) {}
    } else if (this._gsapBBox) {
      bbox = this._gsapBBox();
    }

    if (oldParent) {
      if (oldSibling) {
        oldParent.insertBefore(this, oldSibling);
      } else {
        oldParent.appendChild(this);
      }
    }

    _docElement.removeChild(svg);

    this.style.cssText = oldCSS;
    return bbox;
  },
      _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
    var i = attributesArray.length;

    while (i--) {
      if (target.hasAttribute(attributesArray[i])) {
        return target.getAttribute(attributesArray[i]);
      }
    }
  },
      _getBBox = function _getBBox(target) {
    var bounds;

    try {
      bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
    } catch (error) {
      bounds = _getBBoxHack.call(target, true);
    }

    bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
      width: 0,
      height: 0
    } : bounds;
  },
      _isSVG = function _isSVG(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
  },
      //reports if the element is an SVG on which getBBox() actually works
  _removeProperty = function _removeProperty(target, property) {
    if (property) {
      var style = target.style;

      if (property in _transformProps && property !== _transformOriginProp) {
        property = _transformProp;
      }

      if (style.removeProperty) {
        if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
          property = "-" + property;
        }

        style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
      } else {
        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
        style.removeAttribute(property);
      }
    }
  },
      _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
    plugin._pt = pt;
    pt.b = beginning;
    pt.e = end;

    plugin._props.push(property);

    return pt;
  },
      _nonConvertibleUnits = {
    deg: 1,
    rad: 1,
    turn: 1
  },
      //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
  _convertToUnit = function _convertToUnit(target, property, value, unit) {
    var curValue = parseFloat(value) || 0,
        curUnit = (value + "").trim().substr((curValue + "").length) || "px",
        // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
    style = _tempDiv.style,
        horizontal = _horizontalExp.test(property),
        isRootSVG = target.tagName.toLowerCase() === "svg",
        measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
        amount = 100,
        toPixels = unit === "px",
        toPercent = unit === "%",
        px,
        parent,
        cache,
        isSVG;

    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
      return curValue;
    }

    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
    isSVG = target.getCTM && _isSVG(target);

    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
      return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
    }

    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
    parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

    if (isSVG) {
      parent = (target.ownerSVGElement || {}).parentNode;
    }

    if (!parent || parent === _doc || !parent.appendChild) {
      parent = _doc.body;
    }

    cache = parent._gsap;

    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time) {
      return _round(curValue / cache.width * amount);
    } else {
      (toPercent || curUnit === "%") && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";

      if (horizontal && toPercent) {
        cache = _getCache(parent);
        cache.time = _ticker.time;
        cache.width = parent[measureProperty];
      }
    }

    return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
  },
      _get = function _get(target, property, unit, uncache) {
    var value;
    _pluginInitted || _initCore();

    if (property in _propertyAliases && property !== "transform") {
      property = _propertyAliases[property];

      if (~property.indexOf(",")) {
        property = property.split(",")[0];
      }
    }

    if (_transformProps[property] && property !== "transform") {
      value = _parseTransform(target, uncache);
      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
    } else {
      value = target.style[property];

      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
      }
    }

    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
  },
      _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
    // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
    if (!start || start === "none") {
      // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
      var p = _checkPropPrefix(prop, target, 1),
          s = p && _getComputedProperty(target, p, 1);

      if (s && s !== start) {
        prop = p;
        start = s;
      } else if (prop === "borderColor") {
        start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
      }
    }

    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
        index = 0,
        matchIndex = 0,
        a,
        result,
        startValues,
        startNum,
        color,
        startValue,
        endValue,
        endNum,
        chunk,
        endUnit,
        startUnit,
        endValues;
    pt.b = start;
    pt.e = end;
    start += ""; // ensure values are strings

    end += "";

    if (end === "auto") {
      target.style[prop] = end;
      end = _getComputedProperty(target, prop) || end;
      target.style[prop] = start;
    }

    a = [start, end];

    _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


    start = a[0];
    end = a[1];
    startValues = start.match(_numWithUnitExp) || [];
    endValues = end.match(_numWithUnitExp) || [];

    if (endValues.length) {
      while (result = _numWithUnitExp.exec(end)) {
        endValue = result[0];
        chunk = end.substring(index, result.index);

        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
          color = 1;
        }

        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
          startNum = parseFloat(startValue) || 0;
          startUnit = startValue.substr((startNum + "").length);
          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
          endNum = parseFloat(endValue);
          endUnit = endValue.substr((endNum + "").length);
          index = _numWithUnitExp.lastIndex - endUnit.length;

          if (!endUnit) {
            //if something like "perspective:300" is passed in and we must add a unit to the end
            endUnit = endUnit || _config.units[prop] || startUnit;

            if (index === end.length) {
              end += endUnit;
              pt.e += endUnit;
            }
          }

          if (startUnit !== endUnit) {
            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
          } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
            s: startNum,
            c: endNum - startNum,
            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
          };
        }
      }

      pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
    } else {
      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
    }

    _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

    return pt;
  },
      _keywordToPercent = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
  },
      _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
    var split = value.split(" "),
        x = split[0],
        y = split[1] || "50%";

    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
      //the user provided them in the wrong order, so flip them
      value = x;
      x = y;
      y = value;
    }

    split[0] = _keywordToPercent[x] || x;
    split[1] = _keywordToPercent[y] || y;
    return split.join(" ");
  },
      _renderClearProps = function _renderClearProps(ratio, data) {
    if (data.tween && data.tween._time === data.tween._dur) {
      var target = data.t,
          style = target.style,
          props = data.u,
          cache = target._gsap,
          prop,
          clearTransforms,
          i;

      if (props === "all" || props === true) {
        style.cssText = "";
        clearTransforms = 1;
      } else {
        props = props.split(",");
        i = props.length;

        while (--i > -1) {
          prop = props[i];

          if (_transformProps[prop]) {
            clearTransforms = 1;
            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
          }

          _removeProperty(target, prop);
        }
      }

      if (clearTransforms) {
        _removeProperty(target, _transformProp);

        if (cache) {
          cache.svg && target.removeAttribute("transform");

          _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


          cache.uncache = 1;
        }
      }
    }
  },
      // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
  _specialProps = {
    clearProps: function clearProps(plugin, target, property, endValue, tween) {
      if (tween.data !== "isFromStart") {
        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
        pt.u = endValue;
        pt.pr = -10;
        pt.tween = tween;

        plugin._props.push(property);

        return 1;
      }
    }
    /* className feature (about 0.4kb gzipped).
    , className(plugin, target, property, endValue, tween) {
    	let _renderClassName = (ratio, data) => {
    			data.css.render(ratio, data.css);
    			if (!ratio || ratio === 1) {
    				let inline = data.rmv,
    					target = data.t,
    					p;
    				target.setAttribute("class", ratio ? data.e : data.b);
    				for (p in inline) {
    					_removeProperty(target, p);
    				}
    			}
    		},
    		_getAllStyles = (target) => {
    			let styles = {},
    				computed = getComputedStyle(target),
    				p;
    			for (p in computed) {
    				if (isNaN(p) && p !== "cssText" && p !== "length") {
    					styles[p] = computed[p];
    				}
    			}
    			_setDefaults(styles, _parseTransform(target, 1));
    			return styles;
    		},
    		startClassList = target.getAttribute("class"),
    		style = target.style,
    		cssText = style.cssText,
    		cache = target._gsap,
    		classPT = cache.classPT,
    		inlineToRemoveAtEnd = {},
    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
    		changingVars = {},
    		startVars = _getAllStyles(target),
    		transformRelated = /(transform|perspective)/i,
    		endVars, p;
    	if (classPT) {
    		classPT.r(1, classPT.d);
    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
    	}
    	target.setAttribute("class", data.e);
    	endVars = _getAllStyles(target, true);
    	target.setAttribute("class", startClassList);
    	for (p in endVars) {
    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
    			changingVars[p] = endVars[p];
    			if (!style[p] && style[p] !== "0") {
    				inlineToRemoveAtEnd[p] = 1;
    			}
    		}
    	}
    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
    	}
    	_parseTransform(target, true); //to clear the caching of transforms
    	data.css = new gsap.plugins.css();
    	data.css.init(target, changingVars, tween);
    	plugin._props.push(...data.css._props);
    	return 1;
    }
    */

  },

  /*
   * --------------------------------------------------------------------------------------
   * TRANSFORMS
   * --------------------------------------------------------------------------------------
   */
  _identity2DMatrix = [1, 0, 0, 1, 0, 0],
      _rotationalProperties = {},
      _isNullTransform = function _isNullTransform(value) {
    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
  },
      _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
    var matrixString = _getComputedProperty(target, _transformProp);

    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
  },
      _getMatrix = function _getMatrix(target, force2D) {
    var cache = target._gsap || _getCache(target),
        style = target.style,
        matrix = _getComputedTransformMatrixAsArray(target),
        parent,
        nextSibling,
        temp,
        addedToDOM;

    if (cache.svg && target.getAttribute("transform")) {
      temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
      temp = style.display;
      style.display = "block";
      parent = target.parentNode;

      if (!parent || !target.offsetParent) {
        // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
        addedToDOM = 1; //flag

        nextSibling = target.nextSibling;

        _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

      }

      matrix = _getComputedTransformMatrixAsArray(target);
      temp ? style.display = temp : _removeProperty(target, "display");

      if (addedToDOM) {
        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
      }
    }

    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
  },
      _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
    var cache = target._gsap,
        matrix = matrixArray || _getMatrix(target, true),
        xOriginOld = cache.xOrigin || 0,
        yOriginOld = cache.yOrigin || 0,
        xOffsetOld = cache.xOffset || 0,
        yOffsetOld = cache.yOffset || 0,
        a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        tx = matrix[4],
        ty = matrix[5],
        originSplit = origin.split(" "),
        xOrigin = parseFloat(originSplit[0]) || 0,
        yOrigin = parseFloat(originSplit[1]) || 0,
        bounds,
        determinant,
        x,
        y;

    if (!originIsAbsolute) {
      bounds = _getBBox(target);
      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
      //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
      xOrigin = x;
      yOrigin = y;
    }

    if (smooth || smooth !== false && cache.smooth) {
      tx = xOrigin - xOriginOld;
      ty = yOrigin - yOriginOld;
      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
    } else {
      cache.xOffset = cache.yOffset = 0;
    }

    cache.xOrigin = xOrigin;
    cache.yOrigin = yOrigin;
    cache.smooth = !!smooth;
    cache.origin = origin;
    cache.originIsAbsolute = !!originIsAbsolute;
    target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

    if (pluginToAddPropTweensTo) {
      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
    }

    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
  },
      _parseTransform = function _parseTransform(target, uncache) {
    var cache = target._gsap || new GSCache(target);

    if ("x" in cache && !uncache && !cache.uncache) {
      return cache;
    }

    var style = target.style,
        invertedScaleX = cache.scaleX < 0,
        px = "px",
        deg = "deg",
        origin = _getComputedProperty(target, _transformOriginProp) || "0",
        x,
        y,
        z,
        scaleX,
        scaleY,
        rotation,
        rotationX,
        rotationY,
        skewX,
        skewY,
        perspective,
        xOrigin,
        yOrigin,
        matrix,
        angle,
        cos,
        sin,
        a,
        b,
        c,
        d,
        a12,
        a22,
        t1,
        t2,
        t3,
        a13,
        a23,
        a33,
        a42,
        a43,
        a32;
    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
    scaleX = scaleY = 1;
    cache.svg = !!(target.getCTM && _isSVG(target));
    matrix = _getMatrix(target, cache.svg);

    if (cache.svg) {
      t1 = (!cache.uncache || origin === "0px 0px") && !uncache && target.getAttribute("data-svg-origin"); // if origin is 0,0 and cache.uncache is true, let the recorded data-svg-origin stay. Otherwise, whenever we set cache.uncache to true, we'd need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.

      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
    }

    xOrigin = cache.xOrigin || 0;
    yOrigin = cache.yOrigin || 0;

    if (matrix !== _identity2DMatrix) {
      a = matrix[0]; //a11

      b = matrix[1]; //a21

      c = matrix[2]; //a31

      d = matrix[3]; //a41

      x = a12 = matrix[4];
      y = a22 = matrix[5]; //2D matrix

      if (matrix.length === 6) {
        scaleX = Math.sqrt(a * a + b * b);
        scaleY = Math.sqrt(d * d + c * c);
        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

        if (cache.svg) {
          x -= xOrigin - (xOrigin * a + yOrigin * c);
          y -= yOrigin - (xOrigin * b + yOrigin * d);
        } //3D matrix

      } else {
        a32 = matrix[6];
        a42 = matrix[7];
        a13 = matrix[8];
        a23 = matrix[9];
        a33 = matrix[10];
        a43 = matrix[11];
        x = matrix[12];
        y = matrix[13];
        z = matrix[14];
        angle = _atan2(a32, a33);
        rotationX = angle * _RAD2DEG; //rotationX

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a12 * cos + a13 * sin;
          t2 = a22 * cos + a23 * sin;
          t3 = a32 * cos + a33 * sin;
          a13 = a12 * -sin + a13 * cos;
          a23 = a22 * -sin + a23 * cos;
          a33 = a32 * -sin + a33 * cos;
          a43 = a42 * -sin + a43 * cos;
          a12 = t1;
          a22 = t2;
          a32 = t3;
        } //rotationY


        angle = _atan2(-c, a33);
        rotationY = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(-angle);
          sin = Math.sin(-angle);
          t1 = a * cos - a13 * sin;
          t2 = b * cos - a23 * sin;
          t3 = c * cos - a33 * sin;
          a43 = d * sin + a43 * cos;
          a = t1;
          b = t2;
          c = t3;
        } //rotationZ


        angle = _atan2(b, a);
        rotation = angle * _RAD2DEG;

        if (angle) {
          cos = Math.cos(angle);
          sin = Math.sin(angle);
          t1 = a * cos + b * sin;
          t2 = a12 * cos + a22 * sin;
          b = b * cos - a * sin;
          a22 = a22 * cos - a12 * sin;
          a = t1;
          a12 = t2;
        }

        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
          rotationX = rotation = 0;
          rotationY = 180 - rotationY;
        }

        scaleX = _round(Math.sqrt(a * a + b * b + c * c));
        scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
        angle = _atan2(a12, a22);
        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
      }

      if (cache.svg) {
        //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
        t1 = target.getAttribute("transform");
        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
        t1 && target.setAttribute("transform", t1);
      }
    }

    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
      if (invertedScaleX) {
        scaleX *= -1;
        skewX += rotation <= 0 ? 180 : -180;
        rotation += rotation <= 0 ? 180 : -180;
      } else {
        scaleY *= -1;
        skewX += skewX <= 0 ? 180 : -180;
      }
    }

    uncache = uncache || cache.uncache;
    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
    cache.z = z + px;
    cache.scaleX = _round(scaleX);
    cache.scaleY = _round(scaleY);
    cache.rotation = _round(rotation) + deg;
    cache.rotationX = _round(rotationX) + deg;
    cache.rotationY = _round(rotationY) + deg;
    cache.skewX = skewX + deg;
    cache.skewY = skewY + deg;
    cache.transformPerspective = perspective + px;

    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
      style[_transformOriginProp] = _firstTwoOnly(origin);
    }

    cache.xOffset = cache.yOffset = 0;
    cache.force3D = _config.force3D;
    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
    cache.uncache = 0;
    return cache;
  },
      _firstTwoOnly = function _firstTwoOnly(value) {
    return (value = value.split(" "))[0] + " " + value[1];
  },
      //for handling transformOrigin values, stripping out the 3rd dimension
  _addPxTranslate = function _addPxTranslate(target, start, value) {
    var unit = getUnit(start);
    return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
  },
      _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
    cache.z = "0px";
    cache.rotationY = cache.rotationX = "0deg";
    cache.force3D = 0;

    _renderCSSTransforms(ratio, cache);
  },
      _zeroDeg = "0deg",
      _zeroPx = "0px",
      _endParenthesis = ") ",
      _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
    var _ref = cache || this,
        xPercent = _ref.xPercent,
        yPercent = _ref.yPercent,
        x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        rotation = _ref.rotation,
        rotationY = _ref.rotationY,
        rotationX = _ref.rotationX,
        skewX = _ref.skewX,
        skewY = _ref.skewY,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        transformPerspective = _ref.transformPerspective,
        force3D = _ref.force3D,
        target = _ref.target,
        zOrigin = _ref.zOrigin,
        transforms = "",
        use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
      var angle = parseFloat(rotationY) * _DEG2RAD,
          a13 = Math.sin(angle),
          a33 = Math.cos(angle),
          cos;

      angle = parseFloat(rotationX) * _DEG2RAD;
      cos = Math.cos(angle);
      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
    }

    if (transformPerspective !== _zeroPx) {
      transforms += "perspective(" + transformPerspective + _endParenthesis;
    }

    if (xPercent || yPercent) {
      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
    }

    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
    }

    if (rotation !== _zeroDeg) {
      transforms += "rotate(" + rotation + _endParenthesis;
    }

    if (rotationY !== _zeroDeg) {
      transforms += "rotateY(" + rotationY + _endParenthesis;
    }

    if (rotationX !== _zeroDeg) {
      transforms += "rotateX(" + rotationX + _endParenthesis;
    }

    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
    }

    if (scaleX !== 1 || scaleY !== 1) {
      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
    }

    target.style[_transformProp] = transforms || "translate(0, 0)";
  },
      _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
    var _ref2 = cache || this,
        xPercent = _ref2.xPercent,
        yPercent = _ref2.yPercent,
        x = _ref2.x,
        y = _ref2.y,
        rotation = _ref2.rotation,
        skewX = _ref2.skewX,
        skewY = _ref2.skewY,
        scaleX = _ref2.scaleX,
        scaleY = _ref2.scaleY,
        target = _ref2.target,
        xOrigin = _ref2.xOrigin,
        yOrigin = _ref2.yOrigin,
        xOffset = _ref2.xOffset,
        yOffset = _ref2.yOffset,
        forceCSS = _ref2.forceCSS,
        tx = parseFloat(x),
        ty = parseFloat(y),
        a11,
        a21,
        a12,
        a22,
        temp;

    rotation = parseFloat(rotation);
    skewX = parseFloat(skewX);
    skewY = parseFloat(skewY);

    if (skewY) {
      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
      skewY = parseFloat(skewY);
      skewX += skewY;
      rotation += skewY;
    }

    if (rotation || skewX) {
      rotation *= _DEG2RAD;
      skewX *= _DEG2RAD;
      a11 = Math.cos(rotation) * scaleX;
      a21 = Math.sin(rotation) * scaleX;
      a12 = Math.sin(rotation - skewX) * -scaleY;
      a22 = Math.cos(rotation - skewX) * scaleY;

      if (skewX) {
        skewY *= _DEG2RAD;
        temp = Math.tan(skewX - skewY);
        temp = Math.sqrt(1 + temp * temp);
        a12 *= temp;
        a22 *= temp;

        if (skewY) {
          temp = Math.tan(skewY);
          temp = Math.sqrt(1 + temp * temp);
          a11 *= temp;
          a21 *= temp;
        }
      }

      a11 = _round(a11);
      a21 = _round(a21);
      a12 = _round(a12);
      a22 = _round(a22);
    } else {
      a11 = scaleX;
      a22 = scaleY;
      a21 = a12 = 0;
    }

    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
      tx = _convertToUnit(target, "x", x, "px");
      ty = _convertToUnit(target, "y", y, "px");
    }

    if (xOrigin || yOrigin || xOffset || yOffset) {
      tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
      ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
    }

    if (xPercent || yPercent) {
      //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
      temp = target.getBBox();
      tx = _round(tx + xPercent / 100 * temp.width);
      ty = _round(ty + yPercent / 100 * temp.height);
    }

    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
    target.setAttribute("transform", temp);
    forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the  transform attribute changes!)
  },
      _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
    var cap = 360,
        isString = _isString(endValue),
        endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
        change = endNum - startNum,
        finalValue = startNum + change + "deg",
        direction,
        pt;

    if (isString) {
      direction = endValue.split("_")[1];

      if (direction === "short") {
        change %= cap;

        if (change !== change % (cap / 2)) {
          change += change < 0 ? cap : -cap;
        }
      }

      if (direction === "cw" && change < 0) {
        change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
      } else if (direction === "ccw" && change > 0) {
        change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
      }
    }

    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
    pt.e = finalValue;
    pt.u = "deg";

    plugin._props.push(property);

    return pt;
  },
      _assign = function _assign(target, source) {
    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
    for (var p in source) {
      target[p] = source[p];
    }

    return target;
  },
      _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
    var startCache = _assign({}, target._gsap),
        exclude = "perspective,force3D,transformOrigin,svgOrigin",
        style = target.style,
        endCache,
        p,
        startValue,
        endValue,
        startNum,
        endNum,
        startUnit,
        endUnit;

    if (startCache.svg) {
      startValue = target.getAttribute("transform");
      target.setAttribute("transform", "");
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);

      _removeProperty(target, _transformProp);

      target.setAttribute("transform", startValue);
    } else {
      startValue = getComputedStyle(target)[_transformProp];
      style[_transformProp] = transforms;
      endCache = _parseTransform(target, 1);
      style[_transformProp] = startValue;
    }

    for (p in _transformProps) {
      startValue = startCache[p];
      endValue = endCache[p];

      if (startValue !== endValue && exclude.indexOf(p) < 0) {
        //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
        startUnit = getUnit(startValue);
        endUnit = getUnit(endValue);
        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
        endNum = parseFloat(endValue);
        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
        plugin._pt.u = endUnit || 0;

        plugin._props.push(p);
      }
    }

    _assign(endCache, startCache);
  }; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


  _forEachName("padding,margin,Width,Radius", function (name, index) {
    var t = "Top",
        r = "Right",
        b = "Bottom",
        l = "Left",
        props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
      return index < 2 ? name + side : "border" + side + name;
    });

    _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
      var a, vars;

      if (arguments.length < 4) {
        // getter, passed target, property, and unit (from _get())
        a = props.map(function (prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }

      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function (prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });

  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
      var props = this._props,
          style = target.style,
          startAt = tween.vars.startAt,
          startValue,
          endValue,
          endNum,
          startNum,
          type,
          specialProp,
          p,
          startUnit,
          endUnit,
          relative,
          isTransformRelated,
          transformPropTween,
          cache,
          smooth,
          hasPriority;
      _pluginInitted || _initCore();

      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }

        endValue = vars[p];

        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          // plugins
          continue;
        }

        type = typeof endValue;
        specialProp = _specialProps[p];

        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = typeof endValue;
        }

        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }

        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          //CSS variable
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;

          if (!_colorExp.test(startValue)) {
            // colors don't have units
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }

          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
          } else {
            startValue = _get(target, p);
          }

          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);

          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
                startNum = 0;
              }

              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }

            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }

          isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

          if (isTransformRelated) {
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

              transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
            }

            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0);
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }

              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);

              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);

              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);

              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }

          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0); // protect against NaN

            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;

            if (startUnit !== endUnit && endUnit !== "%") {
              //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else {
              _missingPlugin(p, endValue);

              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }

          props.push(p);
        }
      }

      hasPriority && _sortPropTweensByPriority(this);
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty: _removeProperty,
      _getMatrix: _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;

  (function (positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
      _transformProps[name] = 1;
    });

    _forEachName(rotation, function (name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });

    _propertyAliases[all[13]] = positionAndScale + "," + rotation;

    _forEachName(aliases, function (name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
    _config.units[name] = "px";
  });

  gsap.registerPlugin(CSSPlugin);

  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
      // to protect from tree shaking
  gsapWithCSS.core.Tween;

  function popUpSaldo() {
    const popUpCloseBtn = document.querySelector(".popUpBalance__closeBtn");
    const popUpOpenBtns = document.querySelectorAll(".popUpBalance__openBtn");
    const popUpMenu = document.querySelector(".popUpBalance");
    const header = document.querySelector(".header");

    if (popUpOpenBtns.length === 0) return;

    popUpMenu.style.marginTop = `${header.offsetHeight}px`;

    popUpOpenBtns.forEach((btn) => {
      if (window.innerWidth < 1280) {
        btn.addEventListener("click", () => {
          gsapWithCSS
            .timeline()
            .to(popUpMenu, { display: "block", duration: 0 })
            .to(popUpMenu, {
              opacity: 1,
              transform: "translateY(0)",
              duration: 0.4,
            });
        });
      } else {
        btn.addEventListener("click", () => {
          gsapWithCSS
            .timeline()
            .to(popUpMenu, { display: "block", duration: 0 })
            .to(popUpMenu, { opacity: 1, duration: 0.4 });
        });
      }
    });

    popUpCloseBtn.addEventListener("click", () => {
      if (window.innerWidth < 1280) {
        gsapWithCSS
          .timeline()
          .to(popUpMenu, {
            opacity: 0,
            transform: "translateY(100%)",
            duration: 0.3,
          })
          .to(popUpMenu, { display: "none", duration: 0 });
      } else {
        gsapWithCSS
          .timeline()
          .to(popUpMenu, { opacity: 0, duration: 0.2 })
          .to(popUpMenu, { display: "none", duration: 0 });
      }
    });
  }

  function marginHeader() {
    const header = document.querySelector(".header");
    const headerMobile = document.querySelector(".header__mobile--top");
    const contentBlocks = document.querySelectorAll(".has-header");
    const userMenus = document.querySelectorAll(".userMenu");

    if (window.innerWidth < 1280) {
      contentBlocks.forEach((block) => {
        block.style.marginTop = `${headerMobile.offsetHeight}px`;

        window.addEventListener("resize", () => {
          block.style.marginTop = `${headerMobile.offsetHeight}px`;
        });
      });
    } else {
      contentBlocks.forEach((block) => {
        block.style.marginTop = `${header.offsetHeight}px`;

        window.addEventListener("resize", () => {
          block.style.marginTop = `${header.offsetHeight}px`;
        });
      });

      userMenus.forEach((menu) => {
        menu.style.top = `${header.offsetHeight}px`;
        menu.style.height = `calc(100vh - ${header.offsetHeight}px)`;
      });
    }
  }

  function carouselPromociones() {
      var carouselPromo = new Splide(".carouselPromo__slider", {
          arrows: true,
          pagination: false,
          perPage: 3,
          perMove: 1,
          breakpoints: {
            1280: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            }
          }
        });
        carouselPromo.mount();
  }

  function depositSteps() {
    const depositScreen = document.querySelector(".depositScreen");
    const pageContainer = document.querySelector(".pageContainer");
    const depositBlocks = document.querySelectorAll(".deposit__block");
    const depositCloseBtn = document.querySelector(".deposit__btn-close");
    const depositOpenBtns = document.querySelectorAll(".deposit__openBtn");
    const depositStep1 = document.querySelector(".deposit__step1");
    const depositMethodsBtn = document.querySelectorAll(".deposit__item");
    const depositMethods = document.querySelectorAll(".deposit__step2-method");
    const depositStep2 = document.querySelector(".deposit__step2");
    const depositStep3 = document.querySelector(".deposit__step3");
    const step2BackBtn = document.querySelectorAll(".depositStep2__backBtn");
    const step3Btn = document.querySelectorAll(".depositStep3__Btn");
    
    if(!depositScreen) return;
    
    depositOpenBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        depositBlocks.forEach((block) => {
          block.classList.remove("active");
        });
        depositStep1.classList.add("active");
        gsapWithCSS
          .timeline()
          .to(pageContainer, { display: "none", duration: 0 })
          .to(depositScreen, { display: "block", duration: 0 })
          .to(depositScreen, { opacity: 1, duration: 0.4 });
      });
    });


    depositCloseBtn.addEventListener("click", () => {
      gsapWithCSS
        .timeline()
        .to(pageContainer, { display: "block", duration: 0 })
        .to(depositScreen, { opacity: 0, duration: 0.2 })
        .to(depositScreen, { display: "none", duration: 0 });
    });

    depositMethodsBtn.forEach((methodBtn) => {
      methodBtn.addEventListener("click", (e) => {
        depositBlocks.forEach((block) => {
          block.classList.remove("active");
        });
        depositStep2.classList.add("active");

        depositMethods.forEach((method) => {
          method.classList.remove("active");
        });
        const target = document.querySelector(
          `.${e.currentTarget.dataset.method}`
        );
        target.classList.add("active");
      });
    });

    step2BackBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        depositMethods.forEach((method) => {
          method.classList.remove("active");
        });
        depositBlocks.forEach((block) => {
          block.classList.remove("active");
        });
        depositStep1.classList.add("active");
        return false;
      });
    });

    step3Btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        depositMethods.forEach((method) => {
          method.classList.remove("active");
        });
        depositBlocks.forEach((block) => {
          block.classList.remove("active");
        });
        depositStep3.classList.add("active");
        return false;
      });
    });
  }

  function depositAmmount() {
    const btnsArr20 = document.querySelectorAll(".btnAmmount__20");
    const btnsArr50 = document.querySelectorAll(".btnAmmount__50");
    const btnsArr100 = document.querySelectorAll(".btnAmmount__100");
    const inputAmmount = document.querySelector(".depositDetail__ammount");


    btnsArr20.forEach((btn20) => {
      btn20.addEventListener("click", () => {
          inputAmmount.value = 20;
        });
    });
    btnsArr50.forEach((btn50) => {
      btn50.addEventListener("click", () => {
          inputAmmount.value = 50;
        });
    });
    btnsArr100.forEach((btn100) => {
      btn100.addEventListener("click", () => {
          inputAmmount.value = 100;
        });
    });

  }

  function depositCopy() {
    const iban = document.querySelector("#iban");
    const copyBtn = document.querySelector(".depositTransfer__table-copy");
    
    if(!copyBtn) return;

    copyBtn.addEventListener("click", () => {
      gsapWithCSS
        .timeline()
        .to(copyBtn, { scale: 0.9, duration: 0.2 })
        .to(copyBtn, { scale: 1, duration: 0.2 });

      navigator.clipboard.writeText(iban.innerText);
    });
  }

  const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
  const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
  const menuHeader = document.querySelector(".menuHeader");

  function menuHeaderMobile() {
    menuHeaderOpenBtn.addEventListener("click", () => {
      menuHeader.style.display = "flex";
      gsapWithCSS.to(menuHeader, { left: "0", opacity: 1, duration: 0.7 });
    });

    menuHeaderCloseBtn.addEventListener("click", () => {
      gsapWithCSS
        .to(menuHeader, { left: "-90vw", opacity: 0, duration: 0.3 })
        .to(menuHeader, { display: "none", duration: 0 });
    });
  }

  function userMenuMobile() {
    const userMenuMobileOpen = document.querySelector(".userMenuMobile__open");
    const userMenuMobileClose = document.querySelector(
      ".userMenuMobile__collapse"
    );
    const userMenuMobile = document.querySelector(".userMenuMobile");

    if(!userMenuMobile) return;

    userMenuMobileOpen.addEventListener("click", e => {
      e.preventDefault();
      userMenuMobile.style.display = "flex";
      gsapWithCSS.to(userMenuMobile, { right: "0", opacity: 1, duration: 0.7 });
    });

    userMenuMobileClose.addEventListener("click", () => {
      gsapWithCSS
        .to(userMenuMobile, { right: "-90vw", opacity: 0, duration: 0.3 })
        .to(userMenuMobile, { display: "none", duration: 0 });
    });
  }

  window.addEventListener('load', () => {
    popUpSaldo();
    marginHeader();
    depositSteps();
    depositAmmount();
    depositCopy();
    filterPromo();
    carouselPromociones();
    menuHeaderMobile();
    userMenuMobile();
  });

})();
