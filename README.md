# ProcessWire Page Hit Counter
![alt text](https://github.com/FlipZoomMedia/RepoAssets/blob/master/PageHitCounter/pagehitcounter-example.png)
## Simple Page View Tracking

The Page Hit Counter module for ProcessWire implements a simple page view counter in backend. Page views of visitors are automatically tracked on defined templates, with monitoring of multiple page views.

This gives you a quick overview of how many visitors have read a news or a blog post, for example, without first having to open complex tools such as Google Analytics. This module quickly provides simple information, e.g. for editors. Or, for example, to sort certain news by most page views. For example for "Trending Topics".

Works with `ProCache` and `AdBlockers`. With a lightweight tracking code of only ~320 bytes (gzipped). And no code changes necessary! In addition GDPR compliant, since no personal data or IP addresses are stored. Only session cookies are stored without information.

In addition, there are some options, for example filtering IP addresses (for CronJobs) and filtering bots, spiders and crawlers. You can also configure the lifetime of the session cookies. Repeated page views are not counted during this period. It is also possible to exclude certain roles from tracking. For example, logged in editors who work on a page are not counted as page views.

![alt text](https://github.com/FlipZoomMedia/RepoAssets/blob/master/PageHitCounter/pagehitcounter-config-example.png)

## Sort by hits and access page views (hit value)
Each trackable template has an additional field called `phits`. For example, you want to output all news sorted by the number of page views.
```php
// It is assumed that the template, e.g. with the name "news", has been configured for tracking.
$news = $pages->find("template=news, sort=-phits");
```
To output the page views of a tracked page, use:
```php
echo $page->phits;
```
## Example: Reset counter per API
```php
$modules->get("PageHitCounter")->resetPageViews("template=whatever", false);
```

## Example: Tracking a page hit via API and jQuery
If you want to track a template that does not represent a full page to automatically inject a tracking script, you can define allowed API templates in the module that you can track.

Below is an example of how you can track a click on news tag using jQuery. This will allow you to find out which keywords are clicked the most. For example, you can sort and display a tag cloud by the number of hits.

Suppose your keywords have the template "news_tag". The template "news_tag" was also configured in the Page Hit Counter Module as a trackable API template.

**PHP output of keywords / tags**
```php
// Required: the data attribute "data-pid" with the ID of the template to be tracked.
echo $pages->find("template=news_tag, sort=-phits")->each("<a href='{url}' class='news_tag' data-pid='{id}'>{title}</a>");
```
**Example Tracking Script with jQuery**
```javascript
/**
 * Required: Data attribute "data-pid" with the ID of the news tag template
 * Required: Send the POST request to the URL "location.pathname.replace(/\/?$/, '/') + 'phcv1'"
 * Required: The POST parameter "pid" with the ID of the template
 */
$(function(){
    if($('a.news_tag').length > 0) {
        $('a.news_tag').each(function(){
            var tPID = $(this).data("pid");
            if(tPID) {
                $(this).on("click", function(){
                    $.post(location.pathname.replace(/\/?$/, '/') + 'phcv1', {pid: tPID});
                });
            }
        });
    }
});
```
So simply every click on a tag is counted. Including all checks as for automatic tracking. Like Bot Filtering, Session Lifetime, etc.

## Notice: Tracking with URL segments
If the option "Allow URL Segments" is activated on a template, the hits are only counted if the base URL of the page is called. If you want the hit to be counted even when a segment is requested, you MUST configure the segments in the template configuration. How to do this [can be found here](https://processwire.com/docs/admin/setup/templates/#which-url-segments-do-you-want-to-allow). If you use dynamic segments, configure them as RegEx. There is currently no other option. The problem is that the Page Hit Counter hooked into the PageNotFound process. If URL segments are allowed but not defined, a 404 is never triggered. This means that the Page Hit Counter cannot be called.

## New since 2.0.0: Ignore URL segments
If a template has URL segments configured, each hit on a different segment is counted as a new hit. Enable "Ignore URL segments" so that dynamic segments are not counted individually on the base template / page.

## New since 2.0.0: Use cookieless tracking (Experimentell)
Enable this option to not use individual cookies for tracking or if you have many different pages you want to track. The limit for cookies is 50 per domain for all cookies on the page. If the option is enabled, PHP session storage is used. Downside: you can't set the lifetime higher than configured in your PHP.ini and the session will be terminated as soon as the browser is closed.

## Upgrade note for 2.0.0 from previous versions!
Version 2.0.0 requires an update in the database schema, so that additionally the date of the last access / hit on the page can be displayed (`$page->lastPageHit`). To make this possible, you have to do the update via the upgrade module, upload the ZIP itself and do an update directly via the backend or do a module refresh directly after the upload. If you do not do this, you will get an error that a column is missing in the database table.

### Pros
- Automatic Page View Tracking
- Lightweight tracking code, only ~320 bytes (gzipped)
- No code or frontend changes necessary
- Works with ProCache! Even if no PHP is executed on the cached page, the tracking works
- Works with browser AdBlockers
- No cache triggers (for example, ProCache) are triggered. The cache remains persistent
- GDPR compliant, session-based cookie only, no personal information
- Filtering of IPs and bots possible
- Exclude certain roles from tracking
- Ability to reset Page Views
- Works with all admin themes
- Counter database is created as write-optimized InnoDB
- API to track events for templates that are not viewable
- No dependencies on libraries, pure VanillaJS (Automatic tracking script)
- Works in all modern browsers
- Pages are sortable by hits

### Cons
- Only for ProcessWire version 3.0.80 or higher (Requires wireCount())
- Only for PHP version 5.6.x or higher
- No support for Internet Explorer <= version 9 (Because of XMLHttpRequest())
- No historical data, just simple summation (Because of GDPR)
- Segment URLs can only be counted if the segments are defined

### Planned Features / ToDos
- [x] ~~API access to hit values~~ `Since version 1.2.1`
- [x] ~~Possibility to sort the pages by hits~~ (Request by Zeka) `Since version 1.2.0`
- [x] ~~Don't track logged in users with certain roles~~ (Request by wbmnfktr) `Since version 1.1.0`
- [x] ~~Possibility to reset the counter for certain pages or templates~~ (Request by wbmnfktr) `Since version 1.1.0`
- [x] ~~Better bot filter~~ `Since version 1.1.0`
- [x] ~~Disable session lifetime, don't store cookies to track every page view~~ (Request by matjazp) `Since version 1.2.1`
- [x] ~~Option to hide the counter in the page tree~~ (Request by matjazp) `Since version 1.2.1`
- [x] ~~Option to hide the counter in the page tree on certain templates~~ `Since version 1.2.1`
- [X] ~~API to track events for templates that are not viewable~~ `Since version 1.2.2`
- [X] ~~Cookieless tracking~~ `Since version 2.0.0`
- [X] ~~Show last hit~~ `Since version 2.0.0`
- [x] ~~Ignore URL segments~~ (Request by bernhard) `Since version 2.0.0`
- [x] ~~Add hookable method after pageview was tracked~~ (Request by bernhard) `Since version 2.0.0`

### Changelog
2.0.0
- Feature request: Add hookable method after pageview was tracked (`___pageViewTracked($pageID)`) ([Requested by bernhard](https://processwire.com/talk/profile/2137-bernhard/))
- Feature request: Ignore URL segments option ([Requested by bernhard](https://processwire.com/talk/profile/2137-bernhard/))
- New: Cookieless tracking
- New: Show date of last hit
- Update: Botlist
- Enhancement: Documentation improvement

1.2.7
- Feature request: make `buildPageListHitCounter`-Function `public` ([Requested by bernhard](https://processwire.com/talk/topic/20668-page-hit-counter-%E2%80%93-simple-page-view-tracking/page/3/?tab=comments#comment-208327))

1.2.6
- Bug-Fix: Set the counter of a cloned page to 0
- Enhancement: The function for resetting counters is now available in the module as a public function to reset counters via own scripts on the API side (Request by VeiJari)
- Enhancement: Documentation improvement API reset

1.2.5
- Bug-Fix: When counting 404 hits, cookies are no longer set. The session lifetime is deactivated for the 404 page
- Enhancement: Documentation improvement regarding URL segments

1.2.4
- Bug-Fix: Resetting the counters on system pages (e.g. 404) does not work ([Reported by wbmnfktr](https://processwire.com/talk/topic/20668-page-hit-counter-%E2%80%93-simple-page-view-tracking/page/2/?tab=comments#comment-182214))
- Bug-Fix: Tracking endpoint is logged as 404 if module "[Jumplinks](http://modules.processwire.com/modules/process-jumplinks/)" is installed ([Reported by wbmnfktr](https://processwire.com/talk/topic/20668-page-hit-counter-%E2%80%93-simple-page-view-tracking/page/2/?tab=comments#comment-182213))
- Enhancement: Corrected few typos (Merged from Sergio [#6](https://github.com/FlipZoomMedia/PageHitCounter/pull/6) – THX!)

1.2.3
- Bug-Fix: Tracking script triggers 404 if pages are configured without slash ([#3](https://github.com/FlipZoomMedia/PageHitCounter/issues/3))
- Enhancement: Reduction of the tracking script size if it's gzipped (~320 bytes)
- Enhancement: Documentation improvement
- Enhancement: Corrected few typos

1.2.2
- New feature: API to track events for templates that are not viewable
- Enhancement: Documentation improvement

1.2.1
- API access to hit values `Use $page->phits`
- Bug-Fix: No tracking on welcomepage (Reported by wbmnfktr; Thx to matjazp)
- Bug-Fix: Tracking script path on subfolders (Reported by matjazp)
- Bug-Fix: Tracking on pages with status "hidden"
- Enhancement: Change database engine to InnoDB for phits field
- Enhancement: Option to disable session lifetime `set session lifetime to 0, no cookies`
- Enhancement: Better installation check
- Enhancement: AJAX Request asyncron
- Enhancement: Reduction of the tracking script size by ~20%
- Enhancement: Option to hide the counter in the page tree `You can output the counter with the field name "phits"`
- Enhancement: Option to hide the counter in the page tree on certain templates
- Enhancement: Option for activate general IP validation
- Enhancement: Reduction of tracking overhead up to ~30ms
- Enhancement: Better bot list for detection

1.2.0
- New feature: Sort pages by hits – New field `phits`
- Migrate old counter data to new field

1.1.0
- New feature: Exclude tracking of certain roles
- New feature: Reset Page Views
- Better bot filter and detection

1.0.0
- Initial release

#### Notes
*By default, the page views are stored as `INT` in the database. This allows a maximum counter value of 4.2 billion views (4,294,967,295) per page. If you need more, change the type to `BIGINT` directly in the database. But I recommend to use Google Analytics or similar tools if you have such a large number of users.*
