const jsonServer = require('json-server');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const queryString = require('query-string');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middleware = jsonServer.defaults();

server.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, './pages'));

server.use(middleware);

server.use(jsonServer.bodyParser);

server.use(compression({ level: 6 }));

server.use('/static', express.static(path.join(__dirname, 'static')));
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().getTime();
    req.body.updatedAt = new Date().getTime();
  }
  next();
});

router.render = (req, res) => {
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);
    const _CurrentPage = Number.parseInt(queryParams._page) || 1;
    const _limit = Number.parseInt(queryParams._limit) || 10;
    const _totalRows = Number.parseInt(totalCountHeader);
    const _totalPage = Math.ceil(_totalRows / _limit);
    const _nextPage = _CurrentPage < _totalPage ? _CurrentPage + 1 : _totalPage ;
    const _prevPage = _CurrentPage === 1 ? null : _CurrentPage - 1;
    return res.jsonp({
      data: res.locals.data,
      pagination: { _prevPage, _CurrentPage, _nextPage, _limit, _totalRows, _totalPage },
    });
  }

  res.jsonp({ data: res.locals.data });
};

server.use('/api', router);

server.listen(8000, () => {
  console.log('JSON Server is running');
});
