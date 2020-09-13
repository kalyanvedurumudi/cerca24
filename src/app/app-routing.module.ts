import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'signin', pathMatch: 'full'
  },
  /*{
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },

  /* {
     path: 'signin',
     loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
   }, */
  { path: 'myorders', loadChildren: './my-orders/myorders.module#MyordersPageModule' },
  { path: 'task-assgined', loadChildren: './task-assgined/task-assgined.module#TaskAssginedPageModule' },
  { path: 'my-profile', loadChildren: './my-profile/my-profile.module#MyProfilePageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'delivery-completed', loadChildren: './delivery-completed/delivery-completed.module#DeliveryCompletedPageModule' },
  { path: 'terms-conditions', loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsPageModule' },
  { path: 'order-history-info', loadChildren: './order-history-info/order-history-info.module#OrderHistoryInfoPageModule' },
  { path: 'select-language', loadChildren: './select-language/select-language.module#SelectLanguagePageModule' },
  { path: 'support', loadChildren: './support/support.module#SupportPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },

  /*{
    path: 'delivery-completed',
    loadChildren: () => import('./delivery-completed/delivery-completed.module').then(m => m.DeliveryCompletedPageModule)
  },*/

  /* {
     path: 'account',
     loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
   },*/
  /*{
    path: 'task-assgined',
    loadChildren: () => import('./task-assgined/task-assgined.module').then( m => m.TaskAssginedPageModule)
  },*/

  /*{
    path: 'myorders',
    loadChildren: () => import('./my-orders/myorders.module').then( m => m.MyordersPageModule)
  },*/
  /*{
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },*/
  /* {
     path: 'signup',
     loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
   },*/
  /*{
    path: 'verificaion',
    loadChildren: () => import('./verificaion/verificaion.module').then(m => m.VerificaionPageModule)
  },*/
  /*{
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'order-accepted',
    loadChildren: () => import('./order-accepted/order-accepted.module').then(m => m.OrderAcceptedPageModule)
  },
  {
    path: 'order-pickedup',
    loadChildren: () => import('./order-pickedup/order-pickedup.module').then(m => m.OrderPickedupPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
   {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule)
  },

  {
    path: 'order-history-info',
    loadChildren: () => import('./order-history-info/order-history-info.module').then(m => m.OrderHistoryInfoPageModule)
  },
  {
    path: 'send-to-bank',
    loadChildren: () => import('./send-to-bank/send-to-bank.module').then(m => m.SendToBankPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: 'select-language',
    loadChildren: () => import('./select-language/select-language.module').then(m => m.SelectLanguagePageModule)
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
