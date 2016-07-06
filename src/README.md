## FEND-P06 Website Performance Optimization Portfolio

###Objective:
The goal of this assignment is to optimize a poorly performing website, identify the issues that are preventing it from performing as expected, and taking the necessary steps to make the website functional and responsive.

The website must pass two key tests in order to be considered optimized.  It must be able to get a [Google PageSpeed](https://developers.google.com/speed/pagespeed/) score of 90 or higher.  It must also maintain a sustained rate of 60 frames per second during any user session on the page "pizza.html".


### Initial Website Design and Code Review:
Initial review of the potential issues required running the website  and navigating from page to page.  This allowed me to identify the most obvious areas that would be noticeable by a visitor to the website.  I noted these areas in order to focus on the code that correspondedto said areas.

To have an understanding of the current condition and also to have a benchmark for comparison afterwards, I used PageSpeed and documented the results.

[Initial PageSpeed Desktop results:](http://)
[Initial PageSpeed Mobile results:](http://)


According to the score, the performance was substandard, and since I loaded the website on several physical systems, all of which  had the same exact issue in the same exact places, it could not be attributed to hardware.  This was a software issue and would require further analysis. If the same person that designed the "Pizza" page also coded the rest of the  website, I would probably suggest scrapping this code and giving him a copy of "Wordpress for Dummies". 

#Optimization for PageSpeed
###The Setup
The initial landing page rated ***28/100*** on PageSpeed.  Analysis of the source code proved several key issues.
1. The HTML was incomplete, missing key metadata and the code for HTML and CSS were apparently maintained over time, or perhaps by different individuals because there was a lack of organization and no adherence to guidelines or for current HTML5 standards.
2. There were several JavaScript files linked in the HEAD of several pages, which caused delay in page rendering while the browser processed each one completely.
3. The website did not use any consistent framework throughout.  There was only one page using "Bootstrap" and then only the "Grids".  This increases the challenge because each page can be coded in an entirely different way.
4. None of the code or assets where minified, compressed or otherwise processed to improve performance.

In order to assess the exact issues throughly, I needed a subjective pair of "eyes". I copied the code to my development environment and setup a workflow with my friend "Gulp".  As part of any development process, Grunt or Gulp can provide key information for debugging purposes. Although this is not a development exercise from inception, it can be of great benefit to use an automation tool with linters and testers, in this case to be used to pinpoint issues in problematic code within minutes whereas it could take one person several hours, days or longer to do the same.  It also prepares your environment for the switch from troubleshooting to fixing and eventually producing the fixed version of the code slong with documentation of your workflow. Gulp ran the workflow as I had designed and once again reminded me that I am human, so several revisions later, I had an acceptable workflow for building the new code from the old code and assets.

###Optimization
After running the workflow to Lint the HTML, CSS and JavaScript, I saw the screen spew forth the expected barrage of issues. HTML elements not closed, CSS was a bit messy and redundant, JS was not too bad...maybe the guys was a developer who was tasked with designing a web page for the first time? I should tell him to try Udacity!  I manually fixed the issues that were found in the error log I had compiled but I concentrated solely on "index.html" because it would serve as a model or baseline for what I would probably find in the other pages.  You can review the Gulp output for the linting process here: [Error.log](http://)

To allow PageSpeed access to the webpage, I tried the combination of SimpleHTTPServer and NGROK, but from experience I knew that this would not be sufficient...I could get a bit more help with the optimization process if I setup a VM with NGINX and exposed that through my firewall in a DMZ.  One of the features NGINX has is the ability to compress files on the fly, according to rules that I provide, so that the code and assets are delivered quicker than without.  I took a couple of hours to configure and secure, and monitor, and secure, and iterated this for a while until the web server logs were normal (there are a lot of bored people out there apparently).

After reviewing the code through Chrome Developer Tools, I found that the Javacript files were definitely blocking the DOM, so I moved them down in the code, right before "</body>".  That made a huge difference.

I created a Gulp configuration with the usual minimizers, compressors and various other workflow steps.  This required several hours of iterations as I had to adjust the workflow when I found new things to address in the code.  The untouched, original code was kept in the folder named "SRC" and the new version would be written out to "DIST".  Once I had the Gulp workflow solid and saw the initial results were favorable, I deployed the build to NGINX and ran PageSpeed.  This time the score was 75/100, however I was not satisfied with the equivilent of a "C-" and got back to work!

Frustration began to form as I reviewed the code and could not make sense of the CSS structure.  I reorganized the CSS and ran it again.  Slight improvement, 80/100, but what was I missing.  I followed all of the rules and kept everything seperate, HTML, CSS and JS.  Then I remembered that small JS or CSS can be inlined to increase performance if not used by other pages.  The call to Gogle Analytics was definitely reused, so I made a separate file for it, and then decided to check for any updated versions of their API calls.  Absolutely, not only was there a newer version, but there was a specific version that was meant to prevent blocking!  The Gods have smiled on me for once.



[Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>


####Prepared and submitted by Ray Lugo, Jr.