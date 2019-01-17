# Processwire Page Hit Counter
![alt text](https://github.com/FlipZoomMedia/RepoAssets/blob/master/pagehitcounter-example.png)
## Simple Page View Tracking

The Page Hit Counter module for processwire implements a simple page view counter in backend. Page views of visitors are automatically tracked on defined templates, with monitoring of multiple page views.

This gives you a quick overview of how many visitors have read a news or a blog post, for example, without first having to open complex tools such as Google Analytics. This module quickly provides simple information, e.g. for editors.

Works with `ProCache` and `AdBockers`. With a lightweight tracking code of only ~ 400 bytes (gzipped). And no code changes necessary! In addition GDPR compliant, since no personal data or IP addresses are stored. Only session cookies are stored without information.

In addition, there are some options, for example filtering IP addresses (for CronJobs) and filtering bots, spiders and crawlers. You can also configure the lifetime of the session cookies. Repeated page views are not counted during this period. It is also possible to exclude certain roles from tracking. For example, logged in editors who work on a page are not counted as page views.

![alt text](https://github.com/FlipZoomMedia/RepoAssets/blob/master/pagehitcounter-config.png)

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

### Pros
- Automatic PageView Tracking
- Lightweight tracking code, only ~ 400 bytes (gzipped)
- No code or frontend changes necessary
- Works with ProCache! Even if no PHP is executed on the cached page, the tracking works
- Works with browser AdBlockers
- GDPR compliant, session-based cookie only, no personal information
- Filtering of IPs and bots possible
- Exclude certain roles from tracking
- Ability to reset Page Views
- Works with all admin themes
- Counter database is created as write-optimized InnoDB
- No dependencies on Librarys, pure VanillaJS
- Works in all modern browsers
- Pages are sortable by hits

### Cons
- Only for Processwire version 3.0.80 or higher (Requires wireCount())
- Only for PHP version 5.6.x or higher
- No support for Internet Explorer version 6-9
- No historical data, just simple summation (Because of GDPR)

### Planned Features / ToDos
- ~~API access to hit values~~ `Since version 1.2.1`
- ~~Possibility to sort the pages by hits~~ (Request by Zeka) `Since version 1.2.0`
- ~~Don't track logged in users with certain roles~~ (Request by wbmnfktr) `Since version 1.1.0`
- ~~Possibility to reset the counter for certain pages or templates~~ (Request by wbmnfktr) `Since version 1.1.0`
- ~~Better bot filter~~ `Since version 1.1.0`
- ~~Disable session lifetime, don't store cookies to track every page view~~ (Request by matjazp) `Since version 1.2.1`
- ~~Option to hide the counter in the page tree~~ (Request by matjazp) `Since version 1.2.1`

### Changelog
1.2.1
- API access to hit values `Use $page->phits`
- Bug-Fix: No tracking on welcomepage (Reported by wbmnfktr; Thx to matjazp)
- Bug-Fix: Tracking script path on subfolders (Reported by matjazp)
- Enhancement: Change database engine to InnoDB for phits field
- Enhancement: Option to disable session lifetime `set session lifetime to 0, no cookies`
- Enhancement: Better installation check
- Enhancement: AJAX Request ansyncron
- Enhancement: Reduction of the tracking script size by ~20%
- Enhancement: Option to hide the counter in the page tree `You can also output the counter yourself with the field name "phits"`
- Enhancement: Option for activate general IP validation

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
