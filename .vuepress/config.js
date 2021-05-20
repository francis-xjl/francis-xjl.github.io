module.exports = {
    title: 'francis个人博客',
    description: 'francis个人博客',
    head: [
      ['link', {rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico`}]
    ],
    host: 'localhost',
    port: 8080,
    dest: '.vuepress/dist',
    plugins: [
      ['vuepress-plugin-container',
        {
          type: 'right',
          defaultTitle: ''
        }
      ],
      ['vuepress-plugin-container',
        {
          type: 'center',
          defaultTitle: ''
        }
      ],
      ['vuepress-plugin-container',
        {
          type: 'quote',
          before: info => `<div class="quote"><p class="title">${info}</p>`,
          after: '</div>'
        },
      ],
      ['vuepress-plugin-container',
        {
          type: 'not-print',
          defaultTitle: ''
        },
      ],
    //   [
    //     '@vuepress/google-analytics',
    //     {
    //       'ga': 'UA-162170924-1'
    //     }
    //   ],
    //   [
    //     'vuepress-plugin-comment',
    //     {
    //       choosen: 'gitalk',
    //       options: {
    //         clientID: 'acf59fc06b2cf691903d',
    //         clientSecret: '4cbf25bbf327f1164627d2ab43263b07b14c54fe',
    //         repo: 'awesome-fenix',
    //         owner: 'fenixsoft',
    //         admin: ['fenixsoft'],
    //         labels: ["Gitalk", "Comment"],
    //         id: '<%- ("icyfenix.cn" + (frontmatter.to.path || window.location.pathname)).slice(-50) %>',
    //         title: '「Comment」<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
    //         body: '<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>',
    //         distractionFreeMode: false,
    //         pagerDirection: 'last'
    //       }
    //     }
    //   ],
      ['@vuepress/back-to-top'],
      require('./plugins/read-time'),
      require('./plugins/export')
    ],
    markdown: {
      anchor: {permalink: false},
      toc: {includeLevel: [2, 3]},
      extendMarkdown: md => {
        md.use(require('markdown-it-mermaid').default);
        md.use(require('markdown-it-sub'));
        md.use(require('markdown-it-sup'));
        md.use(require('markdown-it-abbr'));
        md.use(require('markdown-it-ins'));
        md.use(require('markdown-it-figure'));
        md.use(require('markdown-it-smartarrows'));
        md.use(require('markdown-it-fontawesome'));
      }
    },
    themeConfig: {
      logo: '/images/logo-color.png',
      lastUpdated: '最后更新',
      smoothScroll: true,
      // repo: 'fenixsoft/awesome-fenix',
      editLinks: true,
      editLinkText: '在GitHub中编辑',
      // 添加导航栏
      nav: [
        {text: '首页', link: '/'}, {
          text: '代码',
          // 这里是下拉列表展现形式。
          items: [
            {
              text: '测试链接',
              link: 'https://github.com/francis-xjl/francis-xjl.github.io'
            }
            // {
            //   text: '文档工程 Awesome-Fenix',
            //   link: 'https://github.com/fenixsoft/awesome-fenix'
            // }, {
            //   text: '前端工程 Fenix\'s Bookstore',
            //   link: 'https://github.com/fenixsoft/fenix-bookstore-frontend'
            // }
          ]
        },
        {text: '讨论区', link: '/board/', target: "_self"}
      ],
      sidebar: [
        {
          title: '目录',
          collapsable: false,
          path: '/SUMMARY.md'
        }, {
          title: '自我介绍',
          collapsable: false,
          path: '/introduction/about-me'
        }
      ]
    }
  };
