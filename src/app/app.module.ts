import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotImplementedModule } from './lib/ui-kit/not-implemented/not-implemented.module';
import { DocumentPanelComponent } from './lib/panels/document-panel/document-panel.component';
import { DocumentPanelModule } from './lib/panels/document-panel/document-panel.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotImplementedModule,
    DocumentPanelModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
