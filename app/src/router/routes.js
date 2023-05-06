
const routes = [
  {
    path: '/legacy',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: 'search', component: () => import('src/pages/SearchPage.vue') },
      { path: 'main', component: () => import('src/pages/MainPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
