import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', component: DashBoardComponent },
  { path: 'user', component: UserComponent },
  { path: 'post', component: PostComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
