---
layout: page
title: TechFest is Coming
tagline: June 9, 2012 @ La Roche College
---
{% include JB/setup %}

## What is PghTechFest?

In the Fall of 2011, the organizers of Pittsburgh Code Camp decided to see if the other User Groups in the
Pittsburgh area would be interested in having an event where developers interested in all sorts of technologies
could gather together and learn from each other. Everyone agreed that it was a good idea and Pittsburgh TechFest
was born.

We are currently accepting submissions for presentations. Anything related to software development is fair game.
Java, Ruby, PHP, Perl, Python, SQL (any dialect), NoSQL, C#, VB, doesn't matter. "Soft" skills like project management,
agile, career management, presentation skills, winning friends and influencing people - all good topics. Click on
the "Speakers" tab above to submit your talk.

We are also accepting sponsors. Click on the "Sponsors" link above for more information.

If you would like to stay up to date on the latest happenings, join our mailing list on
 [Google Groups](https://groups.google.com/forum/#!forum/pghtechfest).

[La Roche College](http://www.laroche.edu/about-LRC/directions.asp) is located in the North Hills suburbs of Pittsburgh.
    
#### Recent News

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>


