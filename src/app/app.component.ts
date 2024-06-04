import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule],
  selector: 'frozen-fantasy-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'frozen-fantasy';
}
