import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NormalDashboardComponent } from './pages/normal/normal-dashboard/normal-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingupComponent } from './pages/singup/singup.component';
import { AdminGuard } from './services/guard/admin.guard';
import { NormalGuard } from './services/guard/normal.guard';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/normal/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/normal/instructions/instructions.component';
import { StartQuizComponent } from './pages/normal/start-quiz/start-quiz.component';
import { ViewresulComponent } from './pages/normal/viewresul/viewresul.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
   }
  , 
  {
    path:'signup',
    component:SingupComponent,
    pathMatch:'full',
   },
   {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
   },
   {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent

      },
      {
        path:'profile',
        component:ProfileComponent

      },
      {
        path:'categories',
        component:ViewCategoriesComponent

      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'update-category/:cid/:title',
        component:UpdateCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quiz',
        component:AddQuizComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent
      },
      {
        path:'update-question/:quesId',
        component:UpdateQuestionComponent
      }
    ]
   },
   {
    path:'user-dashboard',
    component:NormalDashboardComponent,
    canActivate:[NormalGuard],
    children:[
      {
        path:'',
        component:ProfileComponent
      },
      {
        path:':cid',
        component:LoadQuizComponent
      },
      {
        path:'instruction/:qid',
        component:InstructionsComponent
      },
      
      
      
      
    ]

   },
   {
    path:'start-quiz/:qid',
    component:StartQuizComponent,
    canActivate:[NormalGuard]
   },
   {
    path:'view-result',
    component:ViewresulComponent,
    canActivate:[NormalGuard]
  }
   
   
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
