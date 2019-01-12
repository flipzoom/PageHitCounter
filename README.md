# Processwire Page Hit Counter
## Simple Page View Tracking

The Page Hit Counter module for processwire implements a simple page view counter in backend. Page views of visitors are automatically tracked on defined templates, with monitoring of multiple page views.

This gives you a quick overview of how many visitors have read a news or a blog post, for example, without first having to open complex tools such as Google Analytics. This module quickly provides simple information, e.g. for editors.

Works with *ProCache* and *AdBockers*. With a lightweight tracking code of only 490 bytes (gzipped). 

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
- No dependencies on Librarys, pure VanillaJS

### Cons
- Only for Processwire version 3.x or higher
- No historical data, just simple summation (Because of GDPR)

### Planned Features
- API access for formatted frontend output
- Permissions for backend (Who is allowed to see the counter)
