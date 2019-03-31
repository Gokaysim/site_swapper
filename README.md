# site_swapper
This codebase can be used to serve to 2 website on same domain via AWS CloudFront and lambda@edge function.

In my case I needed to serve a ReactJS and wordpress site in same domain for SEO purposes. I explain setup based on my use case and technology stack. But other technologies or even more than 2 sites can be served under one domain

<hr style="margin-top:20;margin-bottom:20"/>
<h3>Setup</h3>

<h4>Blog Site</h4>
<ul>
  <li>WordPress site is deployed to AWS EC2.</li>
  <li>A load balancer is deployed in front of EC2</li>
  <li>EC2 inbound rules are modified in order to restrict access.</li>
  <li>robots.txt with disallow is placed under root directory. In order to prevent google from indexing load balancer as another site</li>
</ul> 

<h4>React Site</h4>
<ul>
  <li>A ReactJs site is uploaded to S3.</li>
  <li>Static website property of S3 is enabled.</li>
</ul>
 

<h4>CloudFront</h4
<ul>
  <li>A cloud front setup with 2 origin and 2(or more) behaviours is configured.</li>
  <li>First(precedence 0) behaviour should catch /blog* and should forward to WordPress site.</li>
  <li>Second(precedence 1) behaviour should catch all * (default). And it should forward it to S3.</li>
</ul>
 
<h4>Lambda@edge</h4>
<ul>
  <li>The code is uploaded to a lambda function with 128mb memory, 5 seconds timeout and without any env or layers</li>
  <li>
    Trigger of lambda function should be set as CloudFront as below configuration:
    <ul>
      <li>EventType: origin-request</li>
      <li>Include Body: checked</li>
      <li>Path Patern: blog*</li>
    </ul>
  </li>
</ul
