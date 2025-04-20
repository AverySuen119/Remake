// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/list',  // 确保重定向指向 tabs 页面
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'list',
        loadComponent: () => import('./pages/list/list.page').then(m => m.ListPage)
      },
      
      {
        path: 'update',
        loadComponent: () => import('./pages/update/update.page').then(m => m.UpdatePage)
      },
      {
        path: 'add',
        loadComponent: () => import('./pages/add/add.page').then(m => m.AddPage)
      },
      {
        path: 'privacy',
        loadComponent: () => import('./pages/privacy/privacy.page').then(m => m.PrivacyPage)
      },
      {
        path: '',
        redirectTo: 'list',  // 默认跳转到列表页
        pathMatch: 'full',
      }
    ]
  },
  // fallback route - optional, 可以用来捕获任何未匹配的路由
  {
    path: '**',
    redirectTo: '/tabs/list'
  }
];
