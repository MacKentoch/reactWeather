Simple Weather app Powered by ReactJS+NodeJS+ExpressJS+Elasticsearch (ES6)
==========

Give you the weather in London for 4 days until now.

Using this service: http://wxdata.weather.com/wxdata/weather/local/UKXX0085?cc=*&unit=m&dayf=4.


## build chain

 - webpack (*with `hot reload` for smoother developement*)
 - babel 6+ (*client and server entirely written in ES6/ES2015*)

## front-end

 - ReactJS (ES6)
 - react-router (*Single Page Application*)
 - bootstrap
 - sass style

*source files in `src/` folder.*
## back-end

 - `NodeJS` (ES6)
 - `elasticsearch` (*my first time use*)

*source files in `server/` folder*

## setup and launch

**1. Be sure to have previously installed on your machine:**
 - NodeJS  (*node 4.2.x, should be ok with node 0.10.x but I don't have it*)
 - elastic search  (*I used v2.3.0*)


**2. Then, just install all packages by:**

 ```bash
npm install
 ```

**3.a launch database**

```bash
bin/elasticsearch
```

**3.b launch application server:**

```bash
npm run serve
```

**4. Then in your browser go:**
 - `http://localhost:3000/`


![preview](https://raw.githubusercontent.com/MacKentoch/reactWeather/master/app-previous.gif)

_INFO : elasticsearch server is connected to :_
- `http://localhost:9200/`

## Build

- DEV build
```bash
npm run dev
```
- DEV hot-reload
```bash
npm run hot-reload
```
*Note : will need to mock server API requests*

- Production buid (*ReactJS will be optimized: NODE_ENV=production*)
```bash
npm run prod
```

**API to play with Postman:**
- `http://localhost:3000/api/weatherdata/:day`
 - retrieve 1 day weather data — `day` parameter is a number 1 to 4 (*1 is today, 2 is tomorrow etc...*)
- `http://localhost:3000/api/weatherdata`
 - retrieve all current month (*32 days = today + 4 next days + 28 days before today*) weather data

 ## Note about : IDE

After balancing between SublimeText and VSCode I better use Atom.

When developing in ReactJS (*not only ReactJS by the way*) even without installing Facebook Nuclide I feel like I have all tools I need.

The most amazing package that makes the difference is `terminal plus` = integrated terminal in Atom.
