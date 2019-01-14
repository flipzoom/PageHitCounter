# Processwire Page Hit Counter
![alt text](https://github.com/FlipZoomMedia/RepoAssets/blob/master/pagehitcounter-example.png)
## Simple Page View Tracking

The Page Hit Counter module for processwire implements a simple page view counter in backend. Page views of visitors are automatically tracked on defined templates, with monitoring of multiple page views.

This gives you a quick overview of how many visitors have read a news or a blog post, for example, without first having to open complex tools such as Google Analytics. This module quickly provides simple information, e.g. for editors.

Works with *ProCache* and *AdBockers*. With a lightweight tracking code of only 490 bytes (gzipped). And no code changes necessary!

In addition GDPR compliant, since no personal data or IP addresses are stored. Only session cookies are stored without information.

In addition, there are some options, for example filtering IP addresses (for CronJobs) and filtering bots, spiders and crawlers. You can also configure the lifetime of the session cookies. Repeated page views are not counted during this period.

### Pros
- Automatic PageView Tracking
- Lightweight tracking code, only 490 bytes (gzipped)
- No code or frontend changes necessary
- Works with ProCache! Even if no PHP is executed on the cached page, the tracking works
- Works with browser AdBlockers
- GDPR compliant, session-based cookie only, no personal information
- Filtering of IPs and bots possible
- Works with all admin themes
- When the module is uninstalled, the counter data is preserved
- Counter database is created as write-optimized InnoDB
- No dependencies on Librarys, pure VanillaJS
- Works in all modern browsers

### Cons
- Only for Processwire version 3.0.80 or higher (Requires wireCount())
- Only for PHP version 5.6.x or higher
- No support for Internet Explorer version 6-9
- No historical data, just simple summation (Because of GDPR)

### Planned Features
- API access for formatted frontend output
- Permissions for backend (Who is allowed to see the counter)

### Changelog
1.0.0
- Initial release
