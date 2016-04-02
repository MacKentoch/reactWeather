Simple Weather app Powered by ReactJS (ES6)
==========

## build chain

 - webpack (*with `hot reload` for smoother developement*)
 - babel 6+ (*client and server entirely written in ES6/ES2015*)

## front-end

 - ReactJS (ES6)
 - react-router (*Single Page Application*)
 - bootstrap
 - sass style

## back-end

 - `NodeJS`
 - `elasticsearch` (*my first time use*)

## setup

**Be sure to have previously installed on your machine:**
 - NodeJS  (*node 4.2.x, should be ok with node 0.10.x but didn't test it*)
 - elastic search  (*I used v2.3.0*)

**launch server:**

```bash
npm run serve
```

The application launches at :
 - `http://localhost:3000/`


_INFO : elasticsearch server is connected to :_
- `http://localhost:9200/`


**API to play with Postman:**
- `http://localhost:3000/api/weatherdata/:day`
 - retrieve 1 day weather data — `day` parameter is a number 1 to 4 (*1 is today, 2 is tomorrow etc...*)
- `http://localhost:3000/api/weatherdata`
 - retrieve all month (*32 days = today + 4 forward and 28 days before today*) weather data

 ## Note : IDE

  - atom (*with `terminal plus` = that is just awesome*)
