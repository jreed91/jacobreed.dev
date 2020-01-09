---
templateKey: blog-post
title: Create a simple pager utilizing AngularJS dir-paginate and ASP.NET 5 API
syndicate: false
date: 2016-01-17T17:06:34.192Z
description: >-
  The Coffee Taster’s Flavor Wheel, the official resource used by coffee
  tasters, has been revised for the first time this year.
featuredpost: false
featuredimage: /img/1-guedpz-wj5fdffg75bnuiq.png
tags:
  - angularjs
  - angular
  - technology
  - tutorial
---
Today I’m going to walk you through how to build a simple server-side pager utilizing AngularJS, C#, and ASP.NET 5 on OS X.

View the finished code [here](https://github.com/jreed91/AngularJS-ASP.NET5-Pagination).

#### Getting Set Up

I built this application utilizing the new cross-platform ASP.NET 5 on OS X. To get started we will need to set up your development environment on OS X.

1. Follow the set up instructions for OS X [here](https://docs.asp.net/en/latest/getting-started/installing-on-mac.html).
2. Once you have everything installed we’re going to start scaffolding our project. Navigate to the folder you want the files to live and [follow these instructions](https://docs.asp.net/en/latest/client-side/yeoman.html) on how to set up yeoman.

#### Download Our Dependencies

You should now have a simple ASP.NET website structure set up. Now we need to get Angular.JS set up and other dependencies installed.

Make sure you have bower installed:

npm install -g bower

In my template I was missing a .bowerrc file, add this to the root of your directory and type:

{\
  	"directory": "wwwroot/lib"\
}

This will help make sure that all your bower dependencies are loading into the lib folder.

Now we can start adding our dependencies to the bower file.

Add this to our bower.json:

{\
    "name": "ASP.NET",\
    "private": true,\
    "dependencies": {\
	    "angular": "1.4.8",\
	    "bootstrap": "3.3.5",\
	    "jquery": "2.1.4",\
	    "jquery-validation": "1.14.0",\
	    "jquery-validation-unobtrusive": "3.2.4",\
	    "angularUtils-pagination": "*"\
	}\
}

After saving, open up terminal in your directory and type:

bower update

You now see all of our dependencies loaded into the lib folder.

#### Create Our API

We can now start building our API. First start let’s build our Model. In the Models folder create a new class named Item.cs. Add the attributes you want to track, for simplicity here is mine:

namespace angularjs_aspnet_paginate.Models\
{\
    public class Item\
    {\
        public int Id { get; set; }  

```
    public string Name { get; set; }  
}  
```

}

We also need to create a model for the data we will return. Call this class PagedCollection.cs and add the following:

using System.Linq; using System.Collections.Generic;

namespace angularjs_aspnet_paginate.Models\
{\
    public class PagedCollection<T>\
    {\
        public int Page { get; set; }  

```
    public int Count  
    {  
        get  
        {  
            return (null != this.Items) ? this.Items.Count() : 0;  
        }  
    }  

    public int TotalPages { get; set; }  
    public int TotalCount { get; set; }  

    public IEnumerable<T> Items { get; set; }  
}  
```

}

This is the data we will return from our API to our client. It includes the pagee number, a count of number of items, a count of total pages, total count of items overall, and the items.

Now that we have our models we can build our API. Create a new Controller: ItemsController.cs. Here is the relevant code for returning Items:

// GET: api/paginate\
\[HttpGet]\
public PagedCollection<Item> Get(int? page, int? pageSize)\
{\
    var currPage = page.GetValueOrDefault(0);\
    currPage = currPage - 1;\
    var currPageSize = pageSize.GetValueOrDefault(10);  

```
var paged = \_items.Skip(currPage \* currPageSize)  
                    .Take(currPageSize)  
                    .ToArray();  

var totalCount = \_items.Count();  

return new PagedCollection<Item>()  
{  
    Page = currPage,  
    TotalCount = totalCount,  
    TotalPages = (int)Math.Ceiling((decimal)totalCount / currPageSize),  
    Items = paged  
};  
```

}

This api takes a GET request with the current page and the page size (i.e. how many items should be displayed). We then use a linq query to get the data from _items based on the current page number and page size:

static ItemsController() {\
	_items = Enumerable.Range(1, 100)\
    	.Select(i => new Item()\
        {\
            Id = i,\
            Name = "Item " + i.ToString()\
        }).ToArray();\
}

We get our total count of items and return the PagedCollection model. After building out this structure open up terminal and type:

dnx web

If you go to <http://localhost:5000/api/items?page=1&pageSize=1,> you should now be able to see the data being returned.

#### Start Building the Front-End

Now that we have our API built we can start building our front-end code.

1. Create a new folder names Views
2. Add two files _ViewStart.cshtml and _ViewImports.cshtml

See the following code for these files:

_ViewStart.cshtml: @{ Layout = “_Layout”; }

_ViewImports.cshtml: @using angularjs_aspnet_paginate @using angularjs_aspnet_paginate.Models

1. Add another folder with Views called Shared
2. Add a file named _Layout.cshtml

This is the file that will load all of your client side html after _ViewStart.cshtml is called. I grabbed most of the code from Microsoft’s example [here](https://github.com/aspnet/Docs/blob/master/aspnet/client-side/angular/sample/AngularSample/src/AngularSample/Views/Shared/_Layout.cshtml).

1. Add another folder names Home inside Views
2. Add a file named Index.cshtml. This is the file that will load once RenderBody() is called.
3. In order for all of this to work we need to add a HomeController to our ASP.NET code. Add HomeController.cs under the Controllers folder:
4. using Microsoft.AspNet.Mvc;
5. namespace angularjs_aspnet_paginate.Controllers { public class HomeController : Controller {

* public IActionResult Index() { return View(); } } }

This is ust saying when I hit the home controller load my initial Index view. We also need to add the following code to our Startup.cs Configure method:

app.UseMvc(routes =>\
    {\
        routes.MapRoute(\
            name: "default",\
            template: "{controller=Home}/{action=Index}/{id?}");\
    });

You can now test the application to see the intial view load.

#### Build our AngularJS code.

Now open up Views/Home/Index.cshtml and build our boilerplate code.

@{\
    ViewData\["Title"] = "Home Page";\
}  

<div ng-app="paginationApp">  
    <div ng-controller="ItemsCtrl">    
        <li dir-paginate="item in items | itemsPerPage: itemsPerPage" total-items="totalItems" current-page="pagination.current">  
              
        </li>  
        <dir-pagination-controls on-page-change="pageChanged(newPageNumber)" template-url="lib/angularUtils-pagination/dirPagination.tpl.html"></dir-pagination-controls>  
    </div>  
</div>

There’s a lot in this so let me go explain:

1. The ViewData is a ASP.NET snippet that just sets the TItle of the page
2. We then bootstrap our AngularJS app with an ng-app. I will show the code for this a bit.
3. We then define the AngularJS controller for this page. This will control all the user actions
4. Then utilizing the [dir-paginate module](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination#installation), we create something similar to an ng-repeat. For each item print our the item.Name.
5. We then add our dir-pagination controls.

Now we can add the app.js that wires all this up. Add an app folder insides the wwwroot folder. I just referenced what was created at the dir-paginate modules github page.

1. Bootstrap our AngularJS app: var paginationApp = angular.module(“paginationApp”, \[“angularUtils.directives.dirPagination”]);
2. Define our controller, injecting in $scope and $http: paginationApp.controller(‘ItemsCtrl’, function($scope, $http) {}
3. Set up some initial variables: $scope.items = \[]; $scope.totalItems = 0; $scope.itemsPerPage = 10;// this should match however many results your API puts on one page getResultsPage(1);
4. Define our functions for handling the user interactions: $scope.pagination = { current: 1 };
5. $scope.pageChanged = function(newPage) { getResultsPage(newPage); };
6. function getResultsPage(pageNumber) { // this is just an example, in reality this stuff should be in a service $http.get(‘api/items?page=’ + pageNumber + ‘&pageSize=’ + $scope.itemsPerPage) .then(function(result) { console.log(result); $scope.items = result.data.Items; $scope.totalItems = result.data.TotalCount }); }

You should now have a working AngularJS server-side pagination with an ASP.NET API.

#### References:

* [https://github.com/mizrael/AngularJs-Pagination/tree/master/DemoAngularPagination](mizrael/AngularJs-Pagination)
* [ASP.NET Docs](https://docs.asp.net/en/latest/)
* [Dir-Paginate Module](https://github.com/mizrael/AngularJs-Pagination)

*This article was originally posted* *[on my own site](http://jacobreed.me//2016/01/12/Create-a-simple-pager-utilizing-AngularJS-dir-paginate-and-ASP.NET-5-API.html).*

\#Tech
