import * as _ from 'lodash';

export const Helper = {
  /**
   * @param {Event} event
   * @param {String} elementID
   *
   * @link http://stackoverflow.com/a/5932203/844771
   * @author Ryan Artecona
   * @public
   */
  getCanvasCoordinates(event, elementID) {
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let canvasX = 0;
    let canvasY = 0;
    let element = Helper.getElement(elementID);

    const initialEl = element;

    do {
      totalOffsetX += element.offsetLeft - element.scrollLeft;
      totalOffsetY += element.offsetTop - element.scrollTop;

      element = element.offsetParent;
    }
    while (element);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    if ((initialEl) && (initialEl.clientWidth) && (initialEl.clientHeight) && (initialEl.width) && (initialEl.height)) {
      canvasX *= (initialEl.width / initialEl.clientWidth);
      canvasY *= (initialEl.height / initialEl.clientHeight);
    }

    return { x: canvasX, y: canvasY };
  },


  /**
   * @param {String} elementType Type of element
   * @param {String} [elementID] Element ID
   * @returns {Element}
   * @public
   */
  createElement(elementType, elementID) {
    const element = document.createElement(elementType);

    if (elementID) {
      element.setAttribute('id', elementID);
    }

    return element;
  },


  /**
   * @param {Element} element
   * @public
   */
  removeElement(element) {
    element.parentNode.removeChild(element);
  },


  /**
   * @param {String} elementID Element ID
   * @public
   */
  getElement(elementID) {
    return document.getElementById(elementID);
  },


  /**
   * @param {Object} object
   * @returns {Object}
   * @public
   */
  extend(object) {
    return _.merge({}, object);
  },


  /**
   * Load data from URL
   * @param {String} url
   * @param {Function} successFunction
   * @param {Function} [errorFunction]
   * @public
   */
  load(url, successFunction, errorFunction) {
    const xhr = new XMLHttpRequest();

    xhr.open('get', url);

    xhr.onload = () => successFunction(xhr.response, xhr.statusText, xhr);
    xhr.onerror = () => errorFunction(xhr.statusText, xhr);

    xhr.send();
  },


  /**
   * Create an empty two dimensional array
   *
   * @param {int} sizeA
   * @param {int} sizeB
   * @returns {Array}
   * @public
   */
  create2DArray(sizeA, sizeB) {
    const a = new Array(sizeA);

    for (let i = 0; i < sizeA; i++) {
      a[i] = new Array(sizeB);
    }

    return a;
  }
};
