import {
  Component,
  EventEmitter,
  input,
  Input,
  InputSignal,
  output,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  standalone: true,
  imports: [FloatLabel, InputText, FormsModule],
})
export class CustomInputComponent {
  @Input() customNgModel: WritableSignal<string> = signal('');
  customLabel = input('');
  enterTriggered = output();
}
