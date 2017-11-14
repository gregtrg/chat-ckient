import {Component} from '@angular/core';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <!--<jhi-page-ribbon></jhi-page-ribbon>-->
    <div>
      <router-outlet name="navbar"></router-outlet>
    </div>
    <div class="container-fluid">
        <router-outlet></router-outlet>
      <!--<jhi-footer></jhi-footer>-->
    </div>
  `
})
export class AppComponent {
}
