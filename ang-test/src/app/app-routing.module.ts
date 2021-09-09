import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { OutformComponent } from "./outform/outform.component";

const routes: Routes = [
    {path: 'formvalid', component: AppComponent},
    {path: 'formvalue', component: OutformComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}