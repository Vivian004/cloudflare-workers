addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
const links = [
  { name: 'Linkedin', url: 'https://www.linkedin.com/in/jingxian-du/' },
  {
    name: 'Github Repo',
    url: 'https://github.com/Vivian004/cloudflare-workers',
  },
  {
    name: 'Email Me',
    url: 'mailto:dujingxian@outlook.com?Subject=Hello%20Jingxian',
  },
]

const icons = [
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  '<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Microsoft Outlook icon</title><path d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V10.85l1.24.72h.01q.1.07.18.18.07.12.07.25zm-6-8.25v3h3v-3zm0 4.5v3h3v-3zm0 4.5v1.83l3.05-1.83zm-5.25-9v3h3.75v-3zm0 4.5v3h3.75v-3zm0 4.5v2.03l2.41 1.5 1.34-.8v-2.73zM9 3.75V6h2l.13.01.12.04v-2.3zM5.98 15.98q.9 0 1.6-.3.7-.32 1.19-.86.48-.55.73-1.28.25-.74.25-1.61 0-.83-.25-1.55-.24-.71-.71-1.24t-1.15-.83q-.68-.3-1.55-.3-.92 0-1.64.3-.71.3-1.2.85-.5.54-.75 1.3-.25.74-.25 1.63 0 .85.26 1.56.26.72.74 1.23.48.52 1.17.81.69.3 1.56.3zM7.5 21h12.39L12 16.08V17q0 .41-.3.7-.29.3-.7.3H7.5zm15-.13v-7.24l-5.9 3.54Z"/></svg>',
]

const myInfo = {
  username: 'Jingxian Du',
  src: 'https://s.gravatar.com/avatar/775a6f4ab2d06bace13a737201abaadc?s=80',
}

/**
 * Respond with links
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)

  switch (url.pathname) {
    case '/links':
      var json = JSON.stringify(links, null, 2)
      return new Response(json, {
        headers: { 'content-type': 'application/json;charset=UTF-8' },
        status: 200,
      })
      break
    default:
      const res = await fetch(
        'https://static-links-page.signalnerve.workers.dev',
      )

      return new HTMLRewriter()
        .on('div#links', new LinksTransformer(links))
        .on('div#profile', new ProfileTransformer())
        .on('img#avatar', new AvatarTransformer(myInfo))
        .on('h1#name', new NameTransformer(myInfo))
        .on('div#social', new SocialLinksTransformer(links, icons))
        .on('title', new titleTransformer(myInfo.username))
        .on('body', new backgroundTransformer('bg-teal-200'))
        .transform(res)
  }
}

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  async element(element) {
    this.links.forEach((link) => {
      var anchor = `<a href="${link.url}">${link.name}</a>\n`
      element.append(anchor, {
        html: true,
      })
    })
  }
}

class ProfileTransformer {
  async element(element) {
    element.removeAttribute('style')
  }
}

class AvatarTransformer {
  constructor({ src }) {
    this.src = src
  }
  async element(element) {
    element.setAttribute('src', this.src)
  }
}

class NameTransformer {
  constructor({ username }) {
    this.username = username
  }
  async element(element) {
    element.setInnerContent(this.username)
  }
}

class SocialLinksTransformer {
  constructor(links, icons) {
    this.links = links
    this.icons = icons
  }
  async element(element) {
    element.removeAttribute('style')
    for (var i = 0; i < this.links.length; i++) {
      var link = this.links[i]
      var icon = this.icons[i]
      var anchor = `<a href="${link.url}">${icon}</a>\n`
      element.append(anchor, {
        html: true,
      })
    }
  }
  async text(text) {
    console.log(`Incoming text: ${text.text}`)
  }
}

class titleTransformer {
  constructor(title) {
    this.title = title
  }
  async element(element) {
    element.setInnerContent(this.title)
  }
}

class backgroundTransformer {
  constructor(color) {
    this.color = color
  }
  async element(element) {
    element.setAttribute('class', this.color)
  }
}
