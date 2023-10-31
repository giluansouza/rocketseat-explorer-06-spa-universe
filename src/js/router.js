export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event.preventDefault()
    
    window.history.pushState({}, '', event.target.href)

    this.handle()
  }

  toggleBackground(pathname) {
    const body = document.querySelector('body')
    const linkHome = document.getElementById('linkHome')
    const linkUniverse = document.getElementById('linkUniverse')
    const linkExploration = document.getElementById('linkExploration')

    // linkHome.classList.remove('active')
    // linkUniverse.classList.remove('active')
    // linkExploration.classList.remove('active')

    if (pathname === '/') {
      linkHome.classList.add('active')
      body.classList.add('home')
    } else if (pathname === '/universe') {
      linkUniverse.classList.add('active')
      body.classList.add('universe')
    } else if (pathname === '/exploration') {
      linkExploration.classList.add('active')
      body.classList.add('exploration')
    }
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(response => response.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
      this.toggleBackground(pathname)
    })
  }
}