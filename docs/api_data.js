define({ "api": [  {    "type": "post",    "url": "/movies/:movieId/comments",    "title": "Add Comment",    "description": "<p>Add a new comment</p>",    "version": "1.0.0",    "name": "CreateComment",    "group": "Comment",    "permission": [      {        "name": "public"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "movie_id",            "description": "<p>Comment's movie_id</p>"          },          {            "group": "Parameter",            "type": "String",            "size": "6..500",            "optional": false,            "field": "comment",            "description": "<p>Comment's comment</p>"          }        ]      }    },    "error": {      "fields": {        "Bad Request 400": [          {            "group": "Bad Request 400",            "optional": false,            "field": "ValidationError",            "description": "<p>Some parameters may contain invalid values</p>"          }        ]      }    },    "filename": "routes/index.js",    "groupTitle": "Comment"  },  {    "type": "get",    "url": "/movies/:movieId/characters",    "title": "List Movie Characters",    "description": "<p>Get a list of movie characters</p>",    "version": "1.0.0",    "name": "ListMoviesCharacters",    "group": "Comment",    "permission": [      {        "name": "public"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "size": "asc|desc",            "optional": true,            "field": "sortBy",            "defaultValue": "name|gender|height",            "description": "<p>Sortby properties</p>"          },          {            "group": "Parameter",            "type": "String",            "size": "1..10",            "optional": true,            "field": "sortDirection",            "defaultValue": "asc|desc",            "description": "<p>Sort direction</p>"          },          {            "group": "Parameter",            "type": "String",            "size": "1..10",            "optional": true,            "field": "gender",            "defaultValue": "female|male|unknown",            "description": "<p>Filter by gender</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "response",            "description": "<p>response object.</p>"          },          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "response.results",            "description": "<p>List of characters.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "response.meta",            "description": "<p>metadata of characters matching criteria.</p>"          }        ]      }    },    "error": {      "fields": {        "BadRequest 400": [          {            "group": "BadRequest 400",            "optional": false,            "field": "BadRequest",            "description": "<p>Invalid call to endpoint</p>"          }        ]      }    },    "filename": "routes/index.js",    "groupTitle": "Comment"  },  {    "type": "get",    "url": "/movies/:movieId/comments",    "title": "List Movie Comments",    "description": "<p>Get a list of movie comments</p>",    "version": "1.0.0",    "name": "ListMoviesComments",    "group": "Comment",    "permission": [      {        "name": "public"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "movies",            "description": "<p>List of movie comments.</p>"          }        ]      }    },    "error": {      "fields": {        "BadRequest 400": [          {            "group": "BadRequest 400",            "optional": false,            "field": "BadRequest",            "description": "<p>Invalid call to endpoint</p>"          }        ]      }    },    "filename": "routes/index.js",    "groupTitle": "Comment"  },  {    "type": "get",    "url": "/movies",    "title": "List Movies",    "description": "<p>Get a list of movies</p>",    "version": "1.0.0",    "name": "ListMovies",    "group": "Movie",    "permission": [      {        "name": "public"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object[]",            "optional": false,            "field": "movies",            "description": "<p>List of movies.</p>"          }        ]      }    },    "error": {      "fields": {        "BadRequest 400": [          {            "group": "BadRequest 400",            "optional": false,            "field": "BadRequest",            "description": "<p>Invalid call to endpoint</p>"          }        ]      }    },    "filename": "routes/index.js",    "groupTitle": "Movie"  }] });
