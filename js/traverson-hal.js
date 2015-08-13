!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.TraversonJsonHalAdapter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var halfred = _dereq_('halfred');

function JsonHalAdapter(log) {
  this.log = log;
}

JsonHalAdapter.mediaType = 'application/hal+json';

// TODO Pass the traversal state into the adapter... and possibly also only
// modify it, do not return anything.
JsonHalAdapter.prototype.findNextStep = function(doc, key, preferEmbedded) {
  this.log.debug('parsing hal');
  var halResource = halfred.parse(doc);

  var parsedKey = parseKey(key);
  resolveCurie(halResource, parsedKey);

  // _links first
  var linkStep = findLink(halResource, parsedKey, this.log);

  // check for _embedded
  var embeddedStep = findEmbedded(halResource, doc, parsedKey, this.log);

  var step;
  if (preferEmbedded) {
    step = embeddedStep || linkStep;
  } else {
    step = linkStep || embeddedStep;
  }

  if (step) {
    return step;
  }

  throw new Error('Could not find a link nor an embedded object for ' +
      JSON.stringify(parsedKey) + ' in document:\n' + JSON.stringify(doc));
};

function parseKey(key) {
  var match = key.match(/(.*)\[(.*):(.*)\]/);
  // ea:admin[title:Kate] => access by secondary attribute
  if (match) {
    return {
      key: match[1],
      secondaryKey: match[2],
      secondaryValue: match[3],
      index: null,
      all: false,
    };
  }
  // ea:order[3] => index access into embedded array
  match = key.match(/(.*)\[(\d+)\]/);
  if (match) {
    return {
      key: match[1],
      secondaryKey: null,
      secondaryValue: null,
      index: match[2],
      all: false,
    };
  }
  // ea:order[$all] => meta-key, return full array
  match = key.match(/(.*)\[\$all\]/);
  if (match) {
    return {
      key: match[1],
      secondaryKey: null,
      secondaryValue: null,
      index: null,
      all: true,
    };
  }
  // ea:order => simple link relation
  return {
    key: key,
    secondaryKey: null,
    secondaryValue: null,
    index: null,
    all: false,
  };
}

function resolveCurie(halResource, parsedKey) {
  if (halResource.hasCuries()) {
    parsedKey.curie = halResource.reverseResolveCurie(parsedKey.key);
  }
}

function findLink(halResource, parsedKey, log) {
  var linkArray = halResource.linkArray(parsedKey.key);
  if (!linkArray) {
    linkArray = halResource.linkArray(parsedKey.curie);
  }
  if (!linkArray || linkArray.length === 0) {
    return null;
  }

  var step = findLinkBySecondaryKey(linkArray, parsedKey, log);
  if (!step) {
    step = findLinkByIndex(linkArray, parsedKey, log);
  }
  if (!step) {
    step = findLinkWithoutIndex(linkArray, parsedKey, log);
  }
  return step;
}

function findLinkBySecondaryKey(linkArray, parsedKey, log) {
  if (parsedKey.secondaryKey &&
      parsedKey.secondaryValue) {

    // client selected a specific link by an explicit secondary key like 'name',
    // so use it or fail
    var i = 0;
    for (; i < linkArray.length; i++) {
      var val = linkArray[i][parsedKey.secondaryKey];
      /* jshint -W116 */
      if (val != null && val == parsedKey.secondaryValue) {
        if (!linkArray[i].href) {
          throw new Error(parsedKey.key + '[' + parsedKey.secondaryKey + ':' +
              parsedKey.secondaryValue +
              '] requested, but this link had no href attribute.');
        }
        log.debug('found hal link: ' + linkArray[i].href);
        return { url: linkArray[i].href };
      }
      /* jshint +W116 */
    }
    throw new Error(parsedKey.key + '[' + parsedKey.secondaryKey + ':' +
        parsedKey.secondaryValue +
       '] requested, but there is no such link.');
  }
  return null;
}

function findLinkByIndex(linkArray, parsedKey, log) {
  if (typeof parsedKey.index !== 'undefined' && parsedKey.index !== null) {
    // client specified an explicit array index for this link, so use it or fail
    if (!linkArray[parsedKey.index]) {
      throw new Error(parsedKey.key + '[' + parsedKey.index +
          '] requested, but link array ' + parsedKey.key +
          ' had no element at index ' + parsedKey.index);
    }
    if (!linkArray[parsedKey.index].href) {
      throw new Error(parsedKey.key + '[' + parsedKey.index +
          '] requested, but this link had no href attribute.');
    }
    log.debug('found hal link: ' + linkArray[parsedKey.index].href);
    return { url: linkArray[parsedKey.index].href };
  }
  return null;
}

function findLinkWithoutIndex(linkArray, parsedKey, log) {
  // client did not specify an array index for this link, arbitrarily choose
  // the first that has a href attribute
  var link;
  for (var index = 0; index < linkArray.length; index++) {
    if (linkArray[index].href) {
      link = linkArray[index];
      break;
    }
  }
  if (link) {
    if (linkArray.length > 1) {
      log.warn('Found HAL link array with more than one element for ' +
          'key ' + parsedKey.key + ', arbitrarily choosing index ' + index +
          ', because it was the first that had a href attribute.');
    }
    log.debug('found hal link: ' + link.href);
    return { url: link.href };
  }
  return null;
}


function findEmbedded(halResource, doc, parsedKey, log) {
  log.debug('checking for embedded: ' + parsedKey.key +
      (parsedKey.index ? parsedKey.index : ''));

  var resourceArray = halResource.embeddedArray(parsedKey.key);
  if (!resourceArray || resourceArray.length === 0) {
    return null;
  }
  log.debug('Found an array of embedded resource for: ' + parsedKey.key);

  var step =
    findeEmbeddedByIndexOrAll(resourceArray, parsedKey, halResource, log);
  if (!step) {
    step = findEmbeddedSimple(resourceArray, parsedKey, log);
  }
  return step;
}

function findeEmbeddedByIndexOrAll(resourceArray, parsedKey, parentResource,
    log) {
  if (parsedKey.all) {
    return { doc: parentResource.original()._embedded[parsedKey.key] };
  } else if (parsedKey.index) {
    // client specified an explicit array index, so use it or fail
    if (!resourceArray[parsedKey.index]) {
      throw new Error(parsedKey.key + '[' + parsedKey.index +
          '] requested, but there is no such link. However, there is an ' +
          'embedded resource array named ' + parsedKey.key +
          ' but it does not have an element at index ' + parsedKey.index);
    }
    log.debug('Found an embedded resource for: ' + parsedKey.key + '[' +
        parsedKey.index + ']');
    return { doc: resourceArray[parsedKey.index].original() };
  }
  return null;
}

function findEmbeddedSimple(resourceArray, parsedKey, log) {
  // client did not specify an array index, arbitrarily choose first
  if (resourceArray.length > 1) {
    log.warn('Found HAL embedded resource array with more than one element ' +
        ' for key ' + parsedKey.key + ', arbitrarily choosing first element.');
  }
  return { doc: resourceArray[0].original() };
}

module.exports = JsonHalAdapter;

},{"halfred":2}],2:[function(_dereq_,module,exports){
var Parser = _dereq_('./lib/parser')
  , validationFlag = false;

module.exports = {

  parse: function(unparsed) {
    return new Parser().parse(unparsed, validationFlag);
  },

  enableValidation: function(flag) {
    validationFlag = (flag != null) ? flag : true;
  },

  disableValidation: function() {
    validationFlag = false;
  }
};

},{"./lib/parser":4}],3:[function(_dereq_,module,exports){
'use strict';

/*
 * A very naive copy-on-write immutable stack. Since the size of the stack
 * is equal to the depth of the embedded resources for one HAL resource, the bad
 * performance for the copy-on-write approach is probably not a problem at all.
 * Might be replaced by a smarter solution later. Or not. Whatever.
 */
function ImmutableStack() {
  if (arguments.length >= 1) {
    this._array = arguments[0];
  } else {
    this._array = [];
  }
}

ImmutableStack.prototype.array = function() {
  return this._array;
};

ImmutableStack.prototype.isEmpty = function(array) {
  return this._array.length === 0;
};

ImmutableStack.prototype.push = function(element) {
  var array = this._array.slice(0);
  array.push(element);
  return new ImmutableStack(array);
};

ImmutableStack.prototype.pop = function() {
  var array = this._array.slice(0, this._array.length - 1);
  return new ImmutableStack(array);
};

ImmutableStack.prototype.peek = function() {
  if (this.isEmpty()) {
    throw new Error('can\'t peek on empty stack');
  }
  return this._array[this._array.length - 1];
};

module.exports = ImmutableStack;

},{}],4:[function(_dereq_,module,exports){
'use strict';

var Resource = _dereq_('./resource')
  , Stack = _dereq_('./immutable_stack');

var linkSpec = {
  href: { required: true, defaultValue: null },
  templated: { required: false, defaultValue: false },
  type: { required: false, defaultValue: null },
  deprecation: { required: false, defaultValue: null },
  name: { required: false, defaultValue: null },
  profile: { required: false, defaultValue: null },
  title: { required: false, defaultValue: null },
  hreflang: { required: false, defaultValue: null }
};

function Parser() {
}

Parser.prototype.parse = function parse(unparsed, validationFlag) {
  var validation = validationFlag ? [] : null;
  return _parse(unparsed, validation, new Stack());
};

function _parse(unparsed, validation, path) {
  if (unparsed == null) {
    return unparsed;
  }
  var allLinkArrays = parseLinks(unparsed._links, validation,
      path.push('_links'));
  var curies = parseCuries(allLinkArrays);
  var allEmbeddedArrays = parseEmbeddedResourcess(unparsed._embedded,
      validation, path.push('_embedded'));
  var resource = new Resource(allLinkArrays, curies, allEmbeddedArrays,
      validation);
  copyNonHalProperties(unparsed, resource);
  resource._original = unparsed;
  return resource;
}

function parseLinks(links, validation, path) {
  links = parseHalProperty(links, parseLink, validation, path);
  if (links == null || links.self == null) {
    // No links at all? Then it implictly misses the self link which it SHOULD
    // have according to spec
    reportValidationIssue('Resource does not have a self link', validation,
        path);
  }
  return links;
}

function parseCuries(linkArrays) {
  if (linkArrays) {
    return linkArrays.curies;
  } else {
    return [];
  }
}

function parseEmbeddedResourcess(original, parentValidation, path) {
  var embedded = parseHalProperty(original, identity, parentValidation, path);
  if (embedded == null) {
    return embedded;
  }
  Object.keys(embedded).forEach(function(key) {
    embedded[key] = embedded[key].map(function(embeddedElement) {
      var childValidation = parentValidation != null ? [] : null;
      var embeddedResource = _parse(embeddedElement, childValidation,
          path.push(key));
      embeddedResource._original = embeddedElement;
      return embeddedResource;
    });
  });
  return embedded;
}

/*
 * Copy over non-hal properties (everything that is not _links or _embedded)
 * to the parsed resource.
 */
function copyNonHalProperties(unparsed, resource) {
  Object.keys(unparsed).forEach(function(key) {
    if (key !== '_links' && key !== '_embedded') {
      resource[key] = unparsed[key];
    }
  });
}

/*
 * Processes one of the two main hal properties, that is _links or _embedded.
 * Each sub-property is turned into a single element array if it isn't already
 * an array. processingFunction is applied to each array element.
 */
function parseHalProperty(property, processingFunction, validation, path) {
  if (property == null) {
    return property;
  }

  // create a shallow copy of the _links/_embedded object
  var copy = {};

  // normalize each link/each embedded object and put it into our copy
  Object.keys(property).forEach(function(key) {
    copy[key] = arrayfy(key, property[key], processingFunction,
        validation, path);
  });
  return copy;
}

function arrayfy(key, object, fn, validation, path) {
  if (isArray(object)) {
    return object.map(function(element) {
      return fn(key, element, validation, path);
    });
  } else {
    return [fn(key, object, validation, path)];
  }
}


function parseLink(linkKey, link, validation, path) {
  if (!isObject(link)) {
    throw new Error('Link object is not an actual object: ' + link +
      ' [' + typeof link + ']');
  }

  // create a shallow copy of the link object
  var copy = shallowCopy(link);

  // add missing properties mandated by spec and do generic validation
  Object.keys(linkSpec).forEach(function(key) {
    if (copy[key] == null) {
      if (linkSpec[key].required) {
        reportValidationIssue('Link misses required property ' + key + '.',
            validation, path.push(linkKey));
      }
      if (linkSpec[key].defaultValue != null) {
        copy[key] = linkSpec[key].defaultValue;
      }
    }
  });

  // check more inter-property relations mandated by spec
  if (copy.deprecation) {
    log('Warning: Link ' + pathToString(path.push(linkKey)) +
        ' is deprecated, see ' + copy.deprecation);
  }
  if (copy.templated !== true && copy.templated !== false) {
    copy.templated = false;
  }

  if (!validation) {
    return copy;
  }
  if (copy.href && copy.href.indexOf('{') >= 0 && !copy.templated) {
    reportValidationIssue('Link seems to be an URI template ' +
        'but its "templated" property is not set to true.', validation,
        path.push(linkKey));
  }
  return copy;
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

function isObject(o) {
  return typeof o === 'object';
}

function identity(key, object) {
  return object;
}

function reportValidationIssue(message, validation, path) {
  if (validation) {
    validation.push({
      path: pathToString(path),
      message: message
    });
  }
}

// TODO fix this ad hoc mess - does ie support console.log as of ie9?
function log(message) {
  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    console.log(message);
  }
}

function shallowCopy(source) {
  var copy = {};
  Object.keys(source).forEach(function(key) {
    copy[key] = source[key];
  });
  return copy;
}

function pathToString(path) {
  var s = '$.';
  for (var i = 0; i < path.array().length; i++) {
    s += path.array()[i] + '.';
  }
  s = s.substring(0, s.length - 1);
  return s;
}

module.exports = Parser;

},{"./immutable_stack":3,"./resource":5}],5:[function(_dereq_,module,exports){
'use strict';

function Resource(links, curies, embedded, validationIssues) {
  var self = this;
  this._links = links || {};
  this._initCuries(curies);
  this._embedded = embedded || {};
  this._validation = validationIssues || [];
}

Resource.prototype._initCuries = function(curies) {
  this._curiesMap = {};
  if (!curies) {
    this._curies = [];
  } else {
    this._curies = curies;
    for (var i = 0; i < this._curies.length; i++) {
      var curie = this._curies[i];
      this._curiesMap[curie.name] = curie;
    }
  }
  this._preResolveCuries();
};

Resource.prototype._preResolveCuries = function() {
  this._resolvedCuriesMap = {};
  for (var i = 0; i < this._curies.length; i++) {
    var curie = this._curies[i];
    if (!curie.name) {
      continue;
    }
    for (var rel in this._links) {
      if (rel !== 'curies') {
        this._preResolveCurie(curie, rel);
      }
    }
  }
};

Resource.prototype._preResolveCurie = function(curie, rel) {
  var link = this._links[rel];
  var prefixAndReference = rel.split(/:(.+)/);
  var candidate = prefixAndReference[0];
  if (curie.name === candidate) {
    if (curie.templated && prefixAndReference.length >= 1) {
      // TODO resolving templated CURIES should use a small uri template
      // lib, not coded here ad hoc
      var href = curie.href.replace(/(.*){(.*)}(.*)/, '$1' +
          prefixAndReference[1] + '$3');
      this._resolvedCuriesMap[href] = rel;
    } else {
      this._resolvedCuriesMap[curie.href] = rel;
    }
  }
};

Resource.prototype.allLinkArrays = function() {
  return this._links;
};

Resource.prototype.linkArray = function(key) {
  return propertyArray(this._links, key);
};

Resource.prototype.link = function(key, index) {
  return elementOfPropertyArray(this._links, key, index);
};

Resource.prototype.hasCuries = function(key) {
  return this._curies.length > 0;
};

Resource.prototype.curieArray = function(key) {
  return this._curies;
};

Resource.prototype.curie = function(name) {
  return this._curiesMap[name];
};

Resource.prototype.reverseResolveCurie = function(fullUrl) {
  return this._resolvedCuriesMap[fullUrl];
};

Resource.prototype.allEmbeddedResourceArrays = function () {
  return this._embedded;
};

Resource.prototype.embeddedResourceArray = function(key) {
  return propertyArray(this._embedded, key);
};

Resource.prototype.embeddedResource = function(key, index) {
  return elementOfPropertyArray(this._embedded, key, index);
};

Resource.prototype.original = function() {
  return this._original;
};

function propertyArray(object, key) {
  return object != null ? object[key] : null;
}

function elementOfPropertyArray(object, key, index) {
  index = index || 0;
  var array = propertyArray(object, key);
  if (array != null && array.length >= 1) {
    return array[index];
  }
  return null;
}

Resource.prototype.validationIssues = function() {
  return this._validation;
};

// alias definitions
Resource.prototype.allLinks = Resource.prototype.allLinkArrays;
Resource.prototype.allEmbeddedArrays =
    Resource.prototype.allEmbeddedResources =
    Resource.prototype.allEmbeddedResourceArrays;
Resource.prototype.embeddedArray = Resource.prototype.embeddedResourceArray;
Resource.prototype.embedded = Resource.prototype.embeddedResource;
Resource.prototype.validation = Resource.prototype.validationIssues;

module.exports = Resource;

},{}]},{},[1])
(1)
});