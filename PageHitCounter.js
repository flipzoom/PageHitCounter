/**
 * @author  FlipZoom Media Inc. - David Karich
 * @contact David Karich <david.karich@flipzoom.de>
 * @website www.flipzoom.de
 * @create  2019-01-11
 * @style   Tab size: 4 / Soft tabs: YES
 * ----------------------------------------------------------------------------------
 * @licence
 * Copyright (c) 2019 FlipZoom Media Inc. - David Karich
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished 
 * to do so, subject to the following conditions: The above copyright notice and 
 * this permission notice shall be included in all copies or substantial portions 
 * of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ----------------------------------------------------------------------------------
 */

"use strict";

/**
 * ------------------------------------------------------------------------
 * Define the namespace of the Editor object.
 * Self-Executing Anonymous Function: Public & Private.
 * Nice article: http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1/
 * ------------------------------------------------------------------------
 * @type {Object}
 */
(function(PHC) {

    /**
     * ------------------------------------------------------------------------
     * Track current page view
     * ------------------------------------------------------------------------
     */
    PHC.track = function() {

        // ------------------------------------------------------------------------
        // Init and get current page ID
        // ------------------------------------------------------------------------
        var pageID  = this.getPageID();

        // ------------------------------------------------------------------------
        // Send AJAX request
        // ------------------------------------------------------------------------
        if(pageID !== false) {
            this.sendHit(pageID);
        
        } else {
            console.warn('Page Hit Counter: The page view was not counted.');
        }
    }

    /**
     * ------------------------------------------------------------------------
     * Get current page ID for tracking
     * ------------------------------------------------------------------------
     * @return {int}
     */
    PHC.getPageID = function() {
        try {
            var body    = document.getElementsByTagName("BODY")[0], 
                pageID  = body.getAttribute('data-phc');
            return parseInt(pageID);

        } catch(e) {
            console.warn('Page Hit Counter: No Page ID found.');
            return false;
        }
    }

    /**
     * ------------------------------------------------------------------------
     * Send pure AJAX call to track page view
     * ------------------------------------------------------------------------ 
     * @param {int} pageID
     */
    PHC.sendHit = function(pageID) {
        if(!isNaN(pageID)) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/phcv1");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.onload = function() {
                if(xhr.status !== 200) {
                    console.error('Page Hit Counter: Request failed. Returned status of ' + xhr.status);
                } else {
                    console.info('Page Hit Counter: View was counted. ' + xhr.responseText);
                }
            };
            xhr.send(encodeURI('pageID=' + pageID));
        }
    }
    
/**
 * ------------------------------------------------------------------------
 * Self-initialization of the Object
 * ------------------------------------------------------------------------
 * @type {object}
 */
}(window.PHC = window.PHC || {}));

/**
 * ------------------------------------------------------------------------
 * Track page hit
 * ------------------------------------------------------------------------
 */
PHC.track();