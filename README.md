# vanila_news

![데모](/images/demo.gif)
![스크린샷](/images/1.png)

## Project start

### install

```zsh
npm install -g parcel
```

```zsh
parcel index.html
```

## View Component

> render template code to html ui
> make abstract view class

- [x] updateView : change Dom Element's innerHtml to template ui
- [x] addHtml, getHtml : push html string to html array & get html string from html array

## Service

> ajax, hacker news API

- [x] ajax class : convert async function to use easily xmlHttpReqeust
- [x] hacker api : convert api to use easily

## Router

> to make this project to SPA

- [x] addRouterPath : add router path to route Table
- [x] setDefaultPage : set default route path
- [x] route : change page to matched page

## Store(observable)

> to manage safe global state

- [x] observe, observable : when update and set global state, to notify observe instance
